#!/usr/bin/env bash
set -e
BASE_PATH=$(cd $(dirname $0) && pwd)
Dev=$1
Build_Mod=$2
CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"
INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"

# --- 新增：日志函数 ---
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [INFO] $*"
}
warn() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [WARN] $*" >&2
}
error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR] $*" >&2
    exit 1
}

log "Starting build for model: $Dev"

if [[ ! -f $CONFIG_FILE ]]; then
    error "Config not found: $CONFIG_FILE"
fi
if [[ ! -f $INI_FILE ]]; then
    error "INI file not found: $INI_FILE"
fi

# --- 保留原有的 read_ini_by_key 函数 ---
read_ini_by_key() {
    local key=$1
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
}

# --- 保留原有的 remove_uhttpd_dependency 和 apply_config 函数 ---
remove_uhttpd_dependency() {
    local config_path="$BASE_PATH/$BUILD_DIR/.config"
    local luci_makefile_path="$BASE_PATH/$BUILD_DIR/feeds/luci/collections/luci/Makefile"
    if grep -q "CONFIG_PACKAGE_luci-app-quickfile=y" "$config_path"; then
        if [ -f "$luci_makefile_path" ]; then
            sed -i '/luci-light/d' "$luci_makefile_path"
            log "Removed uhttpd (luci-light) dependency as luci-app-quickfile (nginx) is enabled."
        fi
    fi
}
apply_config() {
    # 复制基础配置文件
    \cp -f "$CONFIG_FILE" "$BASE_PATH/$BUILD_DIR/.config"
    # --- 暂时屏蔽 ---
    # if grep -qE "(ipq60xx|ipq807x)" "$BASE_PATH/$BUILD_DIR/.config"; then
    #     cat "$BASE_PATH/deconfig/nss.config" >> "$BASE_PATH/$BUILD_DIR/.config"
    # fi
    # cat "$BASE_PATH/deconfig/proxy.config" >> "$BASE_PATH/$BUILD_DIR/.config"
    log "Applied config file: $CONFIG_FILE"
}

# --- 获取变量 ---
REPO_URL=$(read_ini_by_key "REPO_URL")
REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
REPO_BRANCH=${REPO_BRANCH:-main}
BUILD_DIR=$(read_ini_by_key "BUILD_DIR")
COMMIT_HASH=$(read_ini_by_key "COMMIT_HASH")
COMMIT_HASH=${COMMIT_HASH:-none}

if [[ -d $BASE_PATH/action_build ]]; then
    BUILD_DIR="action_build"
fi

# --- 调用 update.sh ---
log "Calling update.sh..."
$BASE_PATH/scripts/update.sh "$REPO_URL" "$REPO_BRANCH" "$BASE_PATH/$BUILD_DIR" "$COMMIT_HASH"

# --- 应用配置 ---
log "Applying configuration..."
apply_config
remove_uhttpd_dependency

# --- 切换目录并执行构建 ---
cd "$BASE_PATH/$BUILD_DIR"
log "Running make defconfig..."
make defconfig

# --- 特殊处理 x86_64 ---
if grep -qE "^CONFIG_TARGET_x86_64=y" "$CONFIG_FILE"; then
    DISTFEEDS_PATH="$BASE_PATH/$BUILD_DIR/package/emortal/default-settings/files/99-distfeeds.conf"
    if [ -d "${DISTFEEDS_PATH%/*}" ] && [ -f "$DISTFEEDS_PATH" ]; then
        sed -i 's/aarch64_cortex-a53/x86_64/g' "$DISTFEEDS_PATH"
        log "Updated distfeeds.conf for x86_64."
    fi
fi

# --- Debug 模式 ---
if [[ $Build_Mod == "debug" ]]; then
    log "Debug mode enabled. Exiting."
    exit 0
fi

# --- 清理旧的构建产物 ---
TARGET_DIR="$BASE_PATH/$BUILD_DIR/bin/targets"
if [[ -d $TARGET_DIR ]]; then
    log "Cleaning old binaries in $TARGET_DIR..."
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec rm -f {} +
fi

# --- 下载依赖 ---
log "Downloading dependencies..."
make download -j$(($(nproc) * 2))

# --- 开始编译 ---
log "Starting compilation..."
make -j$(($(nproc) + 1)) || make -j1 V=s

# --- 创建固件输出目录 ---
FIRMWARE_DIR="$BASE_PATH/firmware"
log "Creating firmware output directory: $FIRMWARE_DIR"
\rm -rf "$FIRMWARE_DIR"
mkdir -p "$FIRMWARE_DIR"

# --- 复制原始文件到固件目录 ---
log "Copying raw build artifacts to $FIRMWARE_DIR..."
find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec cp -f {} "$FIRMWARE_DIR/" \;

# --- 删除可能残留的 Packages.manifest ---
\rm -f "$BASE_PATH/firmware/Packages.manifest" 2>/dev/null

# --- 新增：生成 Changelog ---
log "Generating changelog..."
{
    echo "# Build Changelog for $Dev"
    echo "## Build Date: $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    echo "### Build Details:"
    echo "- Model: $Dev"
    echo "- Source: $REPO_URL"
    echo "- Branch: $REPO_BRANCH"
    echo "- Commit Hash: $COMMIT_HASH"
    echo "- Kernel Version: $(find ./action_build/dl -maxdepth 1 -name "linux-[4-6]\.*" | sort -r | head -n 1 | grep -oE "[4-6]\.[0-9]{1,3}\.[0-9]{1,3}")"
    echo ""
    echo "### Built Firmware Files:"
    ls -la "$FIRMWARE_DIR" | grep -E '\.(bin|manifest|config|buildinfo)$' | awk '{print "- `" $9 "`"}'
    echo ""
    echo "### Built Packages (from manifest):"
    if [ -f "$FIRMWARE_DIR/$Dev.manifest" ]; then
        grep -oP "luci-app(-[a-zA-Z0-9]{1,}){1,}" "$FIRMWARE_DIR/$Dev.manifest" | sort -u | awk '{print "- `" $0 "`"}'
    else
        echo "No manifest found."
    fi
} > "$FIRMWARE_DIR/changelog_$Dev.md"

# --- 新增：重命名固件并复制配置文件 ---
log "Renaming firmware and copying config files..."

# --- 解析模型名以获取前缀 ---
# 示例: ipq60xx_immwrt_Pro -> prefix=immwrt-re, suffix=Pro
PREFIX=""
SUFFIX=""
MODEL_TYPE="" # immwrt or libwrt
case "$Dev" in
    *immwrt_Pro) PREFIX="immwrt-re"; SUFFIX="Pro" ;;
    *immwrt_Max) PREFIX="immwrt-re"; SUFFIX="Max" ;;
    *immwrt_Ultra) PREFIX="immwrt-re"; SUFFIX="Ultra" ;;
    *libwrt_Pro) PREFIX="libwrt-re"; SUFFIX="Pro" ;;
    *libwrt_Max) PREFIX="libwrt-re"; SUFFIX="Max" ;;
    *libwrt_Ultra) PREFIX="libwrt-re"; SUFFIX="Ultra" ;;
    *) PREFIX="$Dev" ; SUFFIX="Unknown" ;;
esac

# --- 处理固件文件 ---
for file in "$FIRMWARE_DIR"/*.bin; do
    if [ -f "$file" ]; then
        original_name=$(basename "$file")
        log "Processing firmware file: $original_name"
        # 检查文件名是否包含 _re- 或 -re- (确保结构匹配)
        if [[ "$original_name" == *_re-* ]] || [[ "$original_name" == *-re-* ]]; then
            # 从文件名中提取类似 "jdcloud_re-cs-02" 部分
            # 使用正则提取 _re- 或 -re- 后面的部分，直到遇到 . 或 - 为止
            # 例如: immortalwrt-qualcommax-ipq60xx-jdcloud_re-cs-02-squashfs-factory.bin
            # 提取 "cs-02"
            # 注意：这里的逻辑是先匹配 _re- 或 -re-，然后提取后面的内容
            # 为了避免错误匹配，先查找 _re- 或 -re- 的位置
            part=""
            if [[ "$original_name" =~ _re- ]]; then
                # 提取 _re- 后面的部分，直到下一个 . 或 -
                part=$(echo "$original_name" | sed -n 's/.*_re-\([^.-]*\)[.-].*/\1/p')
            elif [[ "$original_name" =~ -re- ]]; then
                # 提取 -re- 后面的部分，直到下一个 . 或 -
                part=$(echo "$original_name" | sed -n 's/.*-re-\([^.-]*\)[.-].*/\1/p')
            fi

            if [ -n "$part" ]; then
                # 判断是 factory 还是 sysupgrade
                if [[ "$original_name" == *"factory"* ]]; then
                    new_name="${PREFIX}-${part}-factory-${SUFFIX}.bin"
                    log "Renaming firmware: $original_name -> $new_name"
                    mv "$file" "$FIRMWARE_DIR/$new_name"
                elif [[ "$original_name" == *"sysupgrade"* ]]; then
                    new_name="${PREFIX}-${part}-sysupgrade-${SUFFIX}.bin"
                    log "Renaming firmware: $original_name -> $new_name"
                    mv "$file" "$FIRMWARE_DIR/$new_name"
                else
                    log "File $original_name doesn't contain 'factory' or 'sysupgrade', skipping rename."
                fi
            else
                warn "Could not extract part from $original_name for renaming. Keeping original."
            fi
        else
            log "Filename $original_name does not match expected pattern (_re- or -re-). Skipping rename."
        fi
    fi
done

# --- 复制配置文件 ---
# 检查是否有 .config 文件
if [ -f "$BASE_PATH/$BUILD_DIR/.config" ]; then
    log "Copying .config file as ${PREFIX}.${SUFFIX}.config"
    cp "$BASE_PATH/$BUILD_DIR/.config" "$FIRMWARE_DIR/${PREFIX}.${SUFFIX}.config"
fi

# 检查是否有 .buildinfo 文件
if [ -f "$BASE_PATH/$BUILD_DIR/.buildinfo" ]; then
    log "Copying .buildinfo file as ${PREFIX}.${SUFFIX}.buildinfo"
    cp "$BASE_PATH/$BUILD_DIR/.buildinfo" "$FIRMWARE_DIR/${PREFIX}.${SUFFIX}.buildinfo"
fi

# 检查是否有 manifest 文件
if [ -f "$FIRMWARE_DIR/$Dev.manifest" ]; then
    log "Copying manifest file as ${PREFIX}.${SUFFIX}.manifest"
    cp "$FIRMWARE_DIR/$Dev.manifest" "$FIRMWARE_DIR/${PREFIX}.${SUFFIX}.manifest"
fi

# 检查是否有 Packages.manifest 文件
if [ -f "$FIRMWARE_DIR/Packages.manifest" ]; then
    log "Copying Packages.manifest file as ${PREFIX}.${SUFFIX}.Packages.manifest"
    cp "$FIRMWARE_DIR/Packages.manifest" "$FIRMWARE_DIR/${PREFIX}.${SUFFIX}.Packages.manifest"
fi

# --- 清理临时文件 ---
if [[ -d $BASE_PATH/action_build ]]; then
    log "Cleaning up action_build..."
    make clean
fi

log "Build and rename process completed for model: $Dev"
