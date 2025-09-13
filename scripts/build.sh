#!/usr/bin/env bash
set -e

# 获取脚本所在目录
SCRIPT_DIR=$(cd $(dirname $0) && pwd)
# 获取仓库根目录（脚本目录的上一级）
BASE_PATH=$(cd "$SCRIPT_DIR/.." && pwd)

# 获取运行脚本时传入的第一个参数（设备名称）
Dev=$1
# 获取运行脚本时传入的第二个参数（构建模式）
Build_Mod=$2

# 定义配置文件的完整路径
CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"
# 定义INI配置文件的完整路径
INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"

# 检查配置文件是否存在
if [[ ! -f $CONFIG_FILE ]]; then
    echo "Config not found: $CONFIG_FILE"
    exit 1
fi

# 检查INI文件是否存在
if [[ ! -f $INI_FILE ]]; then
    echo "INI file not found: $INI_FILE"
    exit 1
fi

# 定义从INI文件中读取指定键值的函数
read_ini_by_key() {
    local key=$1
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
}

# 定义移除uhttpd依赖的函数
remove_uhttpd_dependency() {
    local config_path="$BASE_PATH/$BUILD_DIR/.config"
    local luci_makefile_path="$BASE_PATH/$BUILD_DIR/feeds/luci/collections/luci/Makefile"
    # 检查是否启用了quickfile插件
    if grep -q "CONFIG_PACKAGE_luci-app-quickfile=y" "$config_path"; then
        if [ -f "$luci_makefile_path" ]; then
            # 删除包含luci-light的行
            sed -i '/luci-light/d' "$luci_makefile_path"
            echo "Removed uhttpd (luci-light) dependency as luci-app-quickfile (nginx) is enabled."
        fi
    fi
}

# 定义应用配置文件的函数
apply_config() {
    # 复制配置文件到构建目录
    \cp -f "$CONFIG_FILE" "$BASE_PATH/$BUILD_DIR/.config"
}

# 从INI文件中读取仓库地址
REPO_URL=$(read_ini_by_key "REPO_URL")
# 从INI文件中读取仓库分支
REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
# 如果分支为空则设置为默认值main
REPO_BRANCH=${REPO_BRANCH:-main}
# 从INI文件中读取构建目录
BUILD_DIR=$(read_ini_by_key "BUILD_DIR")
# 从INI文件中读取提交哈希值
COMMIT_HASH=$(read_ini_by_key "COMMIT_HASH")
# 如果哈希值为空则设置为默认值none
COMMIT_HASH=${COMMIT_HASH:-none}

# 检查是否存在action_build目录，存在则强制使用该目录作为构建目录
if [[ -d $BASE_PATH/action_build ]]; then
    BUILD_DIR="action_build"
fi

# 执行更新脚本，传入仓库地址、分支、构建目录和提交哈希值
"$SCRIPT_DIR/update.sh" "$REPO_URL" "$REPO_BRANCH" "$BASE_PATH/$BUILD_DIR" "$COMMIT_HASH"

# 应用配置文件
apply_config
# 移除uhttpd依赖
remove_uhttpd_dependency

# 切换到构建目录
cd "$BASE_PATH/$BUILD_DIR"
# 执行make defconfig命令生成默认配置
make defconfig

# 检查是否是x86_64平台
if grep -qE "^CONFIG_TARGET_x86_64=y" "$CONFIG_FILE"; then
    # 定义软件源配置文件路径
    DISTFEEDS_PATH="$BASE_PATH/$BUILD_DIR/package/emortal/default-settings/files/99-distfeeds.conf"
    # 检查软件源配置文件是否存在
    if [ -d "${DISTFEEDS_PATH%/*}" ] && [ -f "$DISTFEEDS_PATH" ]; then
        # 替换架构名称从ARM到x86_64
        sed -i 's/aarch64_cortex-a53/x86_64/g' "$DISTFEEDS_PATH"
    fi
fi

# 如果是调试模式则直接退出
if [[ $Build_Mod == "debug" ]]; then
    exit 0
fi

# 定义目标文件目录路径
TARGET_DIR="$BASE_PATH/$BUILD_DIR/bin/targets"

# 如果目标目录存在，则删除旧的编译产物
if [[ -d $TARGET_DIR ]]; then
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" -o -name ".config" -o -name "config.buildinfo" -o -name "Packages.manifest" \) -exec rm -f {} +
fi

# 下载编译所需的源代码包
make download -j$(($(nproc) * 2))
# 开始编译固件
make -j$(($(nproc) + 1)) || make -j1 V=s

# 创建临时目录用于存放所有产出物
TEMP_DIR="$BASE_PATH/temp_firmware"
\rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 创建总的ipk和apk目录
mkdir -p "$TEMP_DIR/ipk"
mkdir -p "$TEMP_DIR/apk"

# 创建设备专属目录
DEVICE_TEMP_DIR="$TEMP_DIR/$Dev"
mkdir -p "$DEVICE_TEMP_DIR"

# 复制.config文件
if [[ -f "$BASE_PATH/$BUILD_DIR/.config" ]]; then
    \cp -f "$BASE_PATH/$BUILD_DIR/.config" "$DEVICE_TEMP_DIR/"
fi

# 复制编译产物文件
find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" -o -name ".config" -o -name "config.buildinfo" -o -name "Packages.manifest" \) -exec cp -f {} "$DEVICE_TEMP_DIR/" \;

# 复制ipk文件
IPK_DIR="$BASE_PATH/$BUILD_DIR/bin/packages"
if [[ -d "$IPK_DIR" ]]; then
    find "$IPK_DIR" -name "*.ipk" -type f -exec cp -f {} "$TEMP_DIR/ipk/" 2>/dev/null || true
    echo "Copied ipk files for $Dev"
fi

# 复制apk文件
APK_DIR="$BASE_PATH/$BUILD_DIR/bin/package"
if [[ -d "$APK_DIR" ]]; then
    find "$APK_DIR" -name "*.apk" -type f -exec cp -f {} "$TEMP_DIR/apk/" 2>/dev/null || true
    echo "Copied apk files for $Dev"
fi

# 固件重命名部分
# 解析设备名称，检查是否符合三段式结构
if [[ $Dev =~ ^([^_]+)_([^_]+)_([^_]+)$ ]]; then
    CHIP="${BASH_REMATCH[1]}"      # 芯片部分
    BRANCH_ABBR="${BASH_REMATCH[2]}" # 分支缩写
    CONFIG="${BASH_REMATCH[3]}"     # 配置部分
    
    echo "Device name parsed: CHIP=$CHIP, BRANCH_ABBR=$BRANCH_ABBR, CONFIG=$CONFIG"
    
    # 重命名固件文件
    for firmware in "$DEVICE_TEMP_DIR"/*.bin; do
        # 获取文件名（不含路径）
        filename=$(basename "$firmware")
        
        # 检查是否是目标固件文件
        if [[ $filename =~ .*${CHIP}-(.+)-squashfs-(factory|sysupgrade)\.bin ]]; then
            MODEL="${BASH_REMATCH[1]}"   # 固件型号
            MODE="${BASH_REMATCH[2]}"    # 固件模式
            
            # 根据分支缩写构建新文件名
            if [[ "$BRANCH_ABBR" == "immwrt" ]]; then
                new_filename="immwrt-${MODEL}-${MODE}-${CONFIG}.bin"
            elif [[ "$BRANCH_ABBR" == "libwrt" ]]; then
                new_filename="libwrt-${MODEL}-${MODE}-${CONFIG}.bin"
            else
                # 默认格式
                new_filename="${BRANCH_ABBR}-${MODEL}-${MODE}-${CONFIG}.bin"
            fi
            
            # 重命名文件
            mv "$firmware" "$DEVICE_TEMP_DIR/$new_filename"
            echo "Renamed $filename to $new_filename"
        else
            echo "Skipping $filename - does not match expected pattern"
        fi
    done
    
    # 重命名manifest文件
    for manifest_file in "$DEVICE_TEMP_DIR"/*.manifest; do
        if [[ -f "$manifest_file" ]]; then
            # 获取文件名（不含路径）
            filename=$(basename "$manifest_file")
            # 构建新文件名
            new_filename="${CHIP}-${BRANCH_ABBR}-${CONFIG}.manifest"
            # 重命名文件
            mv "$manifest_file" "$DEVICE_TEMP_DIR/$new_filename"
            echo "Renamed manifest file $filename to $new_filename"
        fi
    done
    
    # 重命名配置文件
    config_files=(".config" "config.buildinfo" "Packages.manifest")
    for file in "${config_files[@]}"; do
        if [[ -f "$DEVICE_TEMP_DIR/$file" ]]; then
            # 构建新文件名
            if [[ "$file" == .* ]]; then
                # 对于以点开头的文件，直接追加
                new_file="${CHIP}-${BRANCH_ABBR}-${CONFIG}${file}"
            else
                # 对于其他文件，添加点号
                new_file="${CHIP}-${BRANCH_ABBR}-${CONFIG}.${file}"
            fi
            
            # 重命名文件
            mv "$DEVICE_TEMP_DIR/$file" "$DEVICE_TEMP_DIR/$new_file"
            echo "Renamed $file to $new_file"
        else
            echo "Warning: Config file not found in device temp directory: $file"
        fi
    done
else
    echo "Device name '$Dev' does not follow the three-part structure, skipping renaming."
fi

# 如果存在action_build目录，则执行清理命令
if [[ -d $BASE_PATH/action_build ]]; then
    make clean
fi

echo "Build completed for $Dev. All artifacts are in $DEVICE_TEMP_DIR"
