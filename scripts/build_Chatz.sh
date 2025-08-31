#!/usr/bin/env bash

set -e

BASE_PATH=$(cd $(dirname $0)/.. && pwd)

Dev=$1
Build_Mod=$2

CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"
INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"

if [[ ! -f $CONFIG_FILE ]]; then
    echo "Config not found: $CONFIG_FILE"
    exit 1
fi

if [[ ! -f $INI_FILE ]]; then
    echo "INI file not found: $INI_FILE"
    exit 1
fi

read_ini_by_key() {
    local key=$1
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
}

# 移除 uhttpd 依赖
# 当启用luci-app-quickfile插件时，表示启动nginx，所以移除luci对uhttp(luci-light)的依赖
remove_uhttpd_dependency() {
    local config_path="$BASE_PATH/$BUILD_DIR/.config"
    local luci_makefile_path="$BASE_PATH/$BUILD_DIR/feeds/luci/collections/luci/Makefile"

    if grep -q "CONFIG_PACKAGE_luci-app-quickfile=y" "$config_path"; then
        if [ -f "$luci_makefile_path" ]; then
            sed -i '/luci-light/d' "$luci_makefile_path"
            echo "Removed uhttpd (luci-light) dependency as luci-app-quickfile (nginx) is enabled."
        fi
    fi
}

# 应用配置文件
apply_config() {
    # 复制基础配置文件
    \cp -f "$CONFIG_FILE" "$BASE_PATH/$BUILD_DIR/.config"
    
    # 暂时屏蔽追加NSS配置
    # if grep -qE "(ipq60xx|ipq807x)" "$BASE_PATH/$BUILD_DIR/.config"; then
    #     cat "$BASE_PATH/deconfig/nss.config" >> "$BASE_PATH/$BUILD_DIR/.config"
    # fi

    # 暂时屏蔽追加代理配置
    # cat "$BASE_PATH/deconfig/proxy.config" >> "$BASE_PATH/$BUILD_DIR/.config"
}

# 预克隆仓库（原pre_clone_action.sh功能）
pre_clone_repo() {
    REPO_URL=$(read_ini_by_key "REPO_URL")
    REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
    REPO_BRANCH=${REPO_BRANCH:-main}
    BUILD_DIR="$BASE_PATH/action_build"

    echo $REPO_URL $REPO_BRANCH
    echo "$REPO_URL/$REPO_BRANCH" >"$BASE_PATH/repo_flag"
    
    # 清理之前的构建目录
    if [[ -d "$BUILD_DIR" ]]; then
        rm -rf "$BUILD_DIR"
    fi
    
    git clone --depth 1 -b $REPO_BRANCH $REPO_URL $BUILD_DIR

    # GitHub Action 移除国内下载源
    PROJECT_MIRRORS_FILE="$BUILD_DIR/scripts/projectsmirrors.json"

    if [ -f "$PROJECT_MIRRORS_FILE" ]; then
        sed -i '/.cn\//d; /tencent/d; /aliyun/d' "$PROJECT_MIRRORS_FILE"
    fi
}

# 重命名固件和配置文件
rename_firmware_and_configs() {
    local firmware_dir="$1"
    local device_model="$2"
    
    # 解析设备model，获取芯片、分支和配置级别
    CHIP=$(echo "$device_model" | cut -d'_' -f1)
    BRANCH=$(echo "$device_model" | cut -d'_' -f2)
    LEVEL=$(echo "$device_model" | cut -d'_' -f3)
    
    # 进入固件目录
    cd "$firmware_dir"
    
    # 为固件文件重命名（只处理包含_re-或-re-的文件）
    for file in *.bin; do
        if [[ -f "$file" ]]; then
            # 检查文件名是否包含_re-或-re-
            if [[ "$file" =~ _re- ]] || [[ "$file" =~ -re- ]]; then
                # 提取设备型号和固件类型
                if [[ "$file" =~ immortalwrt-qualcommax-ipq60xx-(.*)-squashfs-(.*)\.bin ]]; then
                    device_submodel=${BASH_REMATCH[1]}
                    firmware_type=${BASH_REMATCH[2]}
                    
                    # 根据分支缩写确定新前缀
                    case "$BRANCH" in
                        "immwrt") prefix="immwrt" ;;
                        "libwrt") prefix="libwrt" ;;
                        "openwrt") prefix="openwrt" ;;
                        *) prefix="$BRANCH" ;;
                    esac
                    
                    # 构建新文件名
                    new_filename="${prefix}-${device_submodel}-${firmware_type}-${LEVEL}.bin"
                    
                    # 重命名文件
                    mv "$file" "$new_filename"
                    echo "Renamed: $file -> $new_filename"
                fi
            else
                echo "Skipping rename for $file (does not contain _re- or -re-)"
            fi
        fi
    done
    
    # 复制并重命名配置文件
    CONFIG_DIR="$BASE_PATH/$BUILD_DIR"
    if [[ -f "$CONFIG_DIR/.config" ]]; then
        cp "$CONFIG_DIR/.config" "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.config"
    fi
    
    if [[ -f "$CONFIG_DIR/.config.buildinfo" ]]; then
        cp "$CONFIG_DIR/.config.buildinfo" "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.config.buildinfo"
    fi
    
    if [[ -f "$CONFIG_DIR/feeds.buildinfo" ]]; then
        cp "$CONFIG_DIR/feeds.buildinfo" "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.feeds.buildinfo"
    fi
    
    if [[ -f "$CONFIG_DIR/version.buildinfo" ]]; then
        cp "$CONFIG_DIR/version.buildinfo" "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.version.buildinfo"
    fi
    
    # 复制manifest文件
    manifest_files=$(find "$TARGET_DIR" -name "manifest" -type f)
    if [[ -n "$manifest_files" ]]; then
        cp $manifest_files "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.manifest"
    fi
    
    packages_manifest_files=$(find "$TARGET_DIR" -name "Packages.manifest" -type f)
    if [[ -n "$packages_manifest_files" ]]; then
        cp $packages_manifest_files "$firmware_dir/${CHIP}-${BRANCH}-${LEVEL}.Packages.manifest"
    fi
    
    # 为其他特定文件重命名
    if [[ -f "manifest" ]]; then
        mv "manifest" "${CHIP}-${BRANCH}-${LEVEL}.manifest"
    fi
    
    if [[ -f "Packages.manifest" ]]; then
        mv "Packages.manifest" "${CHIP}-${BRANCH}-${LEVEL}.Packages.manifest"
    fi
    
    # 处理 .img.gz 文件
    for file in *.img.gz; do
        if [[ -f "$file" ]]; then
            # 获取文件名和扩展名
            filename="${file%.*}"
            base_filename="${filename%.*}"
            extension="${file##*.}"
            base_extension="${filename##*.}"
            
            # 构建新文件名
            new_filename="${CHIP}-${BRANCH}-${LEVEL}.${base_extension}.${extension}"
            
            # 重命名文件
            mv "$file" "$new_filename"
        fi
    done
    
    # 处理其他类型的文件（如 .itb, .fip, .ubi, .tar.gz）
    for extension in itb fip ubi tar.gz; do
        for file in *.$extension; do
            if [[ -f "$file" ]]; then
                # 构建新文件名
                new_filename="${CHIP}-${BRANCH}-${LEVEL}.${extension}"
                
                # 重命名文件
                mv "$file" "$new_filename"
            fi
        done
    done
    
    # 如果是全部设备编译，则复制到合并目录
    if [[ "$Dev" == "ALL_DEVICES" ]]; then
        MERGE_DIR="$BASE_PATH/merged_firmware"
        mkdir -p "$MERGE_DIR"
        cp -r "$firmware_dir"/* "$MERGE_DIR/"
    fi
}

# 执行预克隆仓库操作
pre_clone_repo

REPO_URL=$(read_ini_by_key "REPO_URL")
REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
REPO_BRANCH=${REPO_BRANCH:-main}
BUILD_DIR=$(read_ini_by_key "BUILD_DIR")
COMMIT_HASH=$(read_ini_by_key "COMMIT_HASH")
COMMIT_HASH=${COMMIT_HASH:-none}

if [[ -d $BASE_PATH/action_build ]]; then
    BUILD_DIR="action_build"
fi

$BASE_PATH/scripts/update.sh "$REPO_URL" "$REPO_BRANCH" "$BASE_PATH/$BUILD_DIR" "$COMMIT_HASH"

apply_config
remove_uhttpd_dependency

cd "$BASE_PATH/$BUILD_DIR"
make defconfig

if grep -qE "^CONFIG_TARGET_x86_64=y" "$CONFIG_FILE"; then
    DISTFEEDS_PATH="$BASE_PATH/$BUILD_DIR/package/emortal/default-settings/files/99-distfeeds.conf"
    if [ -d "${DISTFEEDS_PATH%/*}" ] && [ -f "$DISTFEEDS_PATH" ]; then
        sed -i 's/aarch64_cortex-a53/x86_64/g' "$DISTFEEDS_PATH"
    fi
fi

if [[ $Build_Mod == "debug" ]]; then
    exit 0
fi

TARGET_DIR="$BASE_PATH/$BUILD_DIR/bin/targets"
if [[ -d $TARGET_DIR ]]; then
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec rm -f {} +
fi

make download -j$(($(nproc) * 2))
make -j$(($(nproc) + 1)) || make -j1 V=s

FIRMWARE_DIR="$BASE_PATH/firmware"
\rm -rf "$FIRMWARE_DIR"
mkdir -p "$FIRMWARE_DIR"
find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec cp -f {} "$FIRMWARE_DIR/" \;
\rm -f "$BASE_PATH/firmware/Packages.manifest" 2>/dev/null

# 重命名固件和配置文件
rename_firmware_and_configs "$FIRMWARE_DIR" "$Dev"

# 如果是全部设备编译，创建合并发布说明
if [[ "$Dev" == "ALL_DEVICES" ]]; then
    MERGE_DIR="$BASE_PATH/merged_firmware"
    cat > "$BASE_PATH/merged_release_body.txt" <<EOF
## 统一发布

此发布包含所有设备的固件文件。

构建时间: $(date +"%Y-%m-%d %H:%M:%S")

设备列表:
$(ls "$BASE_PATH/deconfig"/*.config | xargs -n 1 basename | sed 's/\.config$//')
EOF
fi

if [[ -d $BASE_PATH/action_build ]]; then
    make clean
fi
