#!/usr/bin/env bash
set -e
BASE_PATH=$(cd $(dirname $0)../ && pwd)
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

log "Starting pre_clone_action for model: $Dev"

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
$BASE_PATH/update.sh "$REPO_URL" "$REPO_BRANCH" "$BASE_PATH/$BUILD_DIR" "$COMMIT_HASH"

# --- 应用配置 ---
log "Applying configuration..."
apply_config
remove_uhttpd_dependency

# --- 切换目录并执行 defconfig ---
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

# --- 注意：不在此处执行 make，因为 build.sh 会负责编译 ---
log "Preparation complete. Compilation will be handled by build.sh."
