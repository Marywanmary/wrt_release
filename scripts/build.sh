#!/usr/bin/env bash
# 设置脚本遇到错误时立即退出
set -e

# 获取当前脚本所在目录的绝对路径
# BASE_PATH=$(cd "$(dirname "$0")/.." && pwd)
BASE_PATH="$(dirname "$(dirname "$(readlink -f "$0")")")"

# 使用统一的构建目录
BUILD_DIR="$BASE_PATH/action_build"
# 创建构建目录 if it doesn't exist
mkdir -p "$BUILD_DIR"

# 获取第一个参数作为设备型号（如 ipq60xx_immwrt_Pro）
Dev=$1

# 获取第二个参数作为构建模式（如 debug）
Build_Mod=$2

# 定义配置文件路径（根据设备型号确定）
CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"

# 定义 INI 配置文件路径（用于获取仓库信息等）
INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"

# 检查配置文件是否存在，如果不存在则报错并退出
if [[ ! -f $CONFIG_FILE ]]; then
    echo "配置文件未找到: $CONFIG_FILE"
    exit 1
fi

# 检查 INI 配置文件是否存在，如果不存在则报错并退出
if [[ ! -f $INI_FILE ]]; then
    echo "INI 文件未找到: $INI_FILE"
    exit 1
fi

# 定义一个函数：从 INI 文件中读取指定键的值
read_ini_by_key() {
    local key=$1  # 接收要查找的键名
    # 使用 awk 命令读取 INI 文件，匹配键名并输出对应的值
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
}

# 定义一个函数：移除 uhttpd 依赖
# 当启用 luci-app-quickfile 插件时，表示启动 nginx，所以移除 luci 对 uhttpd(luci-light) 的依赖
remove_uhttpd_dependency() {
    # 获取构建目录下的 .config 配置文件路径
    local config_path="$BUILD_DIR/.config"
    # 获取 luci 项目的 Makefile 路径
    local luci_makefile_path="$BUILD_DIR/feeds/luci/collections/luci/Makefile"
    
    # 检查 .config 文件中是否启用了 luci-app-quickfile 插件
    if grep -q "CONFIG_PACKAGE_luci-app-quickfile=y" "$config_path"; then
        # 如果 Makefile 存在，则删除其中包含 luci-light 的行
        if [ -f "$luci_makefile_path" ]; then
            sed -i '/luci-light/d' "$luci_makefile_path"
            echo "已移除 uhttpd (luci-light) 依赖，因为启用了 luci-app-quickfile (nginx)。"
        fi
    fi
}

# 应用配置文件：复制配置文件到构建目录
\cp -f "$CONFIG_FILE" "$BUILD_DIR/.config"

# 从 INI 文件中读取仓库 URL
REPO_URL=$(read_ini_by_key "REPO_URL")

# 从 INI 文件中读取仓库分支名
REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")

# 如果没有指定分支名，默认使用 main 分支
REPO_BRANCH=${REPO_BRANCH:-main}

# 从 INI 文件中读取构建目录名
# BUILD_DIR=$(read_ini_by_key "BUILD_DIR")

# 从 INI 文件中读取提交哈希值
COMMIT_HASH=$(read_ini_by_key "COMMIT_HASH")

# 调用 update.sh 脚本更新源码仓库
$BASE_PATH/scripts/update.sh "$REPO_URL" "$REPO_BRANCH" "$BUILD_DIR" "$COMMIT_HASH"

# 调用 remove_uhttpd_dependency 函数移除依赖
remove_uhttpd_dependency

# 进入构建目录
# cd "$BASE_PATH/$BUILD_DIR"
cd "$BUILD_DIR"

# Install Feeds(安装feeds)
./scripts/feeds update -a
./scripts/feeds install -a
./scripts/feeds update -p package/feeds/packages/boost-system
        
# 执行默认配置
make defconfig

# 检查配置文件中是否包含 x86_64 架构
if grep -qE "^CONFIG_TARGET_x86_64=y" "$CONFIG_FILE"; then
    # 定义 distfeeds 配置文件路径
    DISTFEEDS_PATH="$BASE_PATH/$BUILD_DIR/package/emortal/default-settings/files/99-distfeeds.conf"
    # 如果配置文件存在，则替换其中的架构信息
    if [ -d "${DISTFEEDS_PATH%/*}" ] && [ -f "$DISTFEEDS_PATH" ]; then
        sed -i 's/aarch64_cortex-a53/x86_64/g' "$DISTFEEDS_PATH"
    fi
fi

# 如果构建模式是 debug，则只执行到这里，不进行实际构建
if [[ $Build_Mod == "debug" ]]; then
    exit 0
fi

# 定义目标目录路径
TARGET_DIR="$BASE_PATH/$BUILD_DIR/bin/targets"

# 如果目标目录存在，则清空其中的固件文件
if [[ -d $TARGET_DIR ]]; then
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec rm -f {} +
fi

# 下载所需的软件包
make download -j$(($(nproc) * 2))

# 开始编译固件，使用多线程（线程数 = CPU核心数 + 1）
# 如果编译失败，则回退到单线程模式
make -j$(($(nproc) + 1)) || make -j1 V=s

# 创建设备型号特定的固件输出目录
FIRMWARE_DIR="$BASE_PATH/firmware_$Dev"
\rm -rf "$FIRMWARE_DIR"
mkdir -p "$FIRMWARE_DIR"

# 解析设备型号：芯片组_openwrt分支缩写_配置
CHIPSET=$(echo "$Dev" | cut -d'_' -f1)
BRANCH=$(echo "$Dev" | cut -d'_' -f2)
CONFIG=$(echo "$Dev" | cut -d'_' -f3)

# 生成设备前缀（用于配置文件重命名）
DEVICE_PREFIX="${CHIPSET}-${BRANCH}-${CONFIG}"

# 查找并复制所有固件相关文件到输出目录，并重命名
find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) | while read -r file; do
    filename=$(basename "$file")
    extension="${filename##*.}"
    
    # 只对.bin文件应用重命名规则
    if [[ "$extension" == "bin" ]]; then
        # 提取固件类型（factory/sysupgrade等）
        firmware_type=$(echo "$filename" | grep -oE "(factory|sysupgrade|initramfs)" | head -1)
        
        # 提取设备型号部分（如 jdcloud_re-cs-02 或 jdcloud_re-ss-01）
        device_model=$(echo "$filename" | sed -E "s/.*$CHIPSET-([^-]+)-[^-]+-$firmware_type\.bin/\1/")
        
        # 构建新文件名：分支-设备型号-固件类型-配置.bin
        new_filename="${BRANCH}-${device_model}-${firmware_type}-${CONFIG}.bin"
    else
        # 非.bin文件保持原名
        new_filename="$filename"
    fi
    
    # 复制文件到输出目录（使用新文件名）
    cp -f "$file" "$FIRMWARE_DIR/$new_filename"
done

# 复制并重命名配置文件
for config_file in ".config" "config.buildinfo" "manifest" "Packages.manifest"; do
    src_path="$BASE_PATH/$BUILD_DIR/$config_file"
    if [[ -f "$src_path" ]]; then
        # 生成新文件名：设备前缀.原文件名
        new_filename="${DEVICE_PREFIX}.${config_file}"
        cp -f "$src_path" "$FIRMWARE_DIR/$new_filename"
    fi
done

# 如果是定时触发（批量编译），不清理构建目录，以便共享缓存
if [[ "$GITHUB_EVENT_NAME" != "schedule" ]]; then
    make clean
fi
