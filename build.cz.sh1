#!/usr/bin/env bash
# 这行代码告诉计算机：这是一个bash脚本，需要用bash程序来执行

set -e
# 设置"严格模式"：如果后面的任何命令执行失败，整个脚本就会立即停止
# 这就像做菜时，如果发现一个步骤出错了，就不再继续做下去了

BASE_PATH=$(cd $(dirname $0) && pwd)
# 获取脚本文件所在的文件夹路径
# $(dirname $0) 获取脚本文件所在的目录名
# cd 进入那个目录，pwd 获取当前目录的完整路径
# 这样无论在哪里运行这个脚本，都能正确找到相关文件

Dev=$1
# 获取运行脚本时传入的第一个参数，代表设备名称
# 比如运行命令：./build.sh xiaomi 这里的Dev就是"xiaomi"

Build_Mod=$2
# 获取运行脚本时传入的第二个参数，代表构建模式
# 比如运行命令：./build.sh xiaomi debug 这里的Build_Mod就是"debug"

CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"
# 定义配置文件的完整路径
# 比如设备是xiaomi，路径就是：脚本所在目录/deconfig/xiaomi.config

INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"
# 定义INI配置文件的完整路径
# 比如设备是xiaomi，路径就是：脚本所在目录/compilecfg/xiaomi.ini

if [[ ! -f $CONFIG_FILE ]]; then
    # 检查配置文件是否存在
    # ! -f 表示"文件不存在"
    echo "Config not found: $CONFIG_FILE"
    # 如果文件不存在，就显示错误信息
    exit 1
    # 退出脚本，返回错误代码1（表示出错）
fi

if [[ ! -f $INI_FILE ]]; then
    # 检查INI文件是否存在
    echo "INI file not found: $INI_FILE"
    # 如果文件不存在，就显示错误信息
    exit 1
    # 退出脚本，返回错误代码1（表示出错）
fi

read_ini_by_key() {
    # 定义一个函数，用于从INI文件中读取指定键的值
    # INI文件是一种配置文件格式，格式如：键=值
    local key=$1
    # 获取传入的参数（键名），存储在key变量中
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
    # 使用awk工具解析INI文件：
    # -F"=" 表示用等号作为分隔符
    # -v key="$key" 将shell变量key传递给awk
    # '$1 == key {print $2}' 如果第一列（键名）匹配，就打印第二列（值）
}

# 移除 uhttpd 依赖
# 当启用luci-app-quickfile插件时，表示启动nginx，所以移除luci对uhttp(luci-light)的依赖
remove_uhttpd_dependency() {
    # 定义一个函数，用于移除uhttpd依赖
    # uhttpd是一个轻量级网页服务器，nginx是另一个网页服务器
    # 当使用nginx时，就不需要uhttpd了，所以要移除相关依赖
    local config_path="$BASE_PATH/$BUILD_DIR/.config"
    # 定义配置文件的路径
    local luci_makefile_path="$BASE_PATH/$BUILD_DIR/feeds/luci/collections/luci/Makefile"
    # 定义luci的Makefile路径（luci是OpenWrt的网页管理界面）
    if grep -q "CONFIG_PACKAGE_luci-app-quickfile=y" "$config_path"; then
        # 检查配置文件中是否启用了quickfile插件
        # grep -q 表示安静模式，只查找不输出结果
        if [ -f "$luci_makefile_path" ]; then
            # 检查luci的Makefile文件是否存在
            sed -i '/luci-light/d' "$luci_makefile_path"
            # 使用sed工具删除包含"luci-light"的行
            # sed是流编辑器，用于文本处理
            # -i 表示直接修改文件
            # '/luci-light/d' 表示删除包含luci-light的行
            echo "Removed uhttpd (luci-light) dependency as luci-app-quickfile (nginx) is enabled."
            # 显示提示信息，说明已经移除了uhttpd依赖
        fi
    fi
}

# 应用配置文件
apply_config() {
    # 定义一个函数，用于应用配置文件
    # 复制基础配置文件
    \cp -f "$CONFIG_FILE" "$BASE_PATH/$BUILD_DIR/.config"
    # 复制配置文件到构建目录
    # \cp 使用cp命令，\防止使用别名
    # -f 表示强制复制，如果目标文件存在就覆盖
    # 将设备特定的配置文件复制到构建目录的.config文件
    
    # 如果是 ipq60xx 或 ipq807x 平台，则追加 NSS 配置
    # if grep -qE "(ipq60xx|ipq807x)" "$BASE_PATH/$BUILD_DIR/.config"; then
        # 检查配置文件中是否包含ipq60xx或ipq807x
        # grep -E 表示使用扩展正则表达式
        # cat "$BASE_PATH/deconfig/nss.config" >> "$BASE_PATH/$BUILD_DIR/.config"
        # 如果是这些平台，就把NSS配置追加到主配置文件
        # cat 显示文件内容，>> 表示追加到文件末尾
        # NSS是网络加速引擎，需要额外配置
    # fi
    # 追加代理配置
    # cat "$BASE_PATH/deconfig/proxy.config" >> "$BASE_PATH/$BUILD_DIR/.config"
    # 将代理配置追加到主配置文件
    # 代理配置用于网络加速或访问控制
}

REPO_URL=$(read_ini_by_key "REPO_URL")
# 从INI文件中读取REPO_URL（代码仓库地址）的值
# 调用之前定义的read_ini_by_key函数

REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
# 从INI文件中读取REPO_BRANCH（代码仓库分支）的值

REPO_BRANCH=${REPO_BRANCH:-main}
# 如果REPO_BRANCH为空，就设置为默认值"main"
# :- 是bash的默认值语法

BUILD_DIR=$(read_ini_by_key "BUILD_DIR")
# 从INI文件中读取BUILD_DIR（构建目录）的值

COMMIT_HASH=$(read_ini_by_key "COMMIT_HASH")
# 从INI文件中读取COMMIT_HASH（代码提交哈希值）的值

COMMIT_HASH=${COMMIT_HASH:-none}
# 如果COMMIT_HASH为空，就设置为默认值"none"

if [[ -d $BASE_PATH/action_build ]]; then
    # 检查是否存在action_build目录
    # -d 表示检查目录是否存在
    BUILD_DIR="action_build"
    # 如果存在，就强制使用action_build作为构建目录
    # 这可能是为了兼容某些特定的构建环境
fi

$BASE_PATH/update.sh "$REPO_URL" "$REPO_BRANCH" "$BASE_PATH/$BUILD_DIR" "$COMMIT_HASH"
# 执行更新脚本，传入代码仓库地址、分支、构建目录和提交哈希值
# 这个脚本可能是用来下载或更新源代码的

apply_config
# 调用apply_config函数，应用配置文件

remove_uhttpd_dependency
# 调用remove_uhttpd_dependency函数，移除uhttpd依赖

cd "$BASE_PATH/$BUILD_DIR"
# 切换到构建目录
# cd 是change directory的缩写，用于切换当前工作目录

make defconfig
# 执行make defconfig命令
# 这是构建系统的命令，用于根据.config文件生成默认配置
# make是一个常用的构建工具

if grep -qE "^CONFIG_TARGET_x86_64=y" "$CONFIG_FILE"; then
    # 检查是否是x86_64平台（普通PC架构）
    # ^表示行首，确保匹配完整的配置项
    DISTFEEDS_PATH="$BASE_PATH/$BUILD_DIR/package/emortal/default-settings/files/99-distfeeds.conf"
    # 定义软件源配置文件的路径
    if [ -d "${DISTFEEDS_PATH%/*}" ] && [ -f "$DISTFEEDS_PATH" ]; then
        # 检查软件源配置文件所在的目录和文件本身是否存在
        # ${DISTFEEDS_PATH%/*} 获取文件所在目录路径
        sed -i 's/aarch64_cortex-a53/x86_64/g' "$DISTFEEDS_PATH"
        # 使用sed替换软件源配置中的架构名称
        # 将aarch64_cortex-a53（ARM架构）替换为x86_64（PC架构）
        # s/旧字符串/新字符串/g 表示全局替换
    fi
fi

if [[ $Build_Mod == "debug" ]]; then
    # 检查构建模式是否为debug（调试模式）
    exit 0
    # 如果是调试模式，就直接退出，不进行后续的编译步骤
    # 调试模式通常只用来检查配置是否正确
fi

TARGET_DIR="$BASE_PATH/$BUILD_DIR/bin/targets"
# 定义目标文件（编译产物）的目录路径

if [[ -d $TARGET_DIR ]]; then
    # 检查目标目录是否存在
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec rm -f {} +
    # 查找并删除旧的编译产物文件
    # find 是查找文件的命令
    # -type f 表示只查找文件（不查找目录）
    # \( ... \) 里面是查找条件，-o 表示"或"
    # 查找各种类型的固件文件：.bin（二进制文件）、.manifest（清单文件）、.img.gz（压缩镜像）、.itb（镜像树）、.fip（固件镜像包）、.ubi（UBI文件系统）、rootfs.tar.gz（根文件系统压缩包）
    # -exec rm -f {} + 表示对找到的每个文件执行删除命令
fi

make download -j$(($(nproc) * 2))
# 下载编译所需的源代码包
# -j 指定并行下载的任务数
# $(nproc) 获取CPU的核心数
# $(($(nproc) * 2)) 使用CPU核心数的2倍作为并行数，加快下载速度

make -j$(($(nproc) + 1)) || make -j1 V=s
# 开始编译固件
# -j 指定并行编译的任务数，使用CPU核心数+1
# || 表示如果前面的命令失败，就执行后面的命令
# make -j1 V=s 表示如果并行编译失败，就使用单线程编译并显示详细错误信息
# V=s 表示显示详细的编译输出，便于调试错误

FIRMWARE_DIR="$BASE_PATH/firmware"
# 定义最终固件存放的目录路径

\rm -rf "$FIRMWARE_DIR"
# 删除旧的固件目录及其中的所有内容
# \rm 使用rm命令，\防止使用别名
# -r 表示递归删除目录
# -f 表示强制删除，不提示确认

mkdir -p "$FIRMWARE_DIR"
# 创建新的固件目录
# mkdir 是创建目录的命令
# -p 表示如果父目录不存在也一并创建

find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec cp -f {} "$FIRMWARE_DIR/" \;
# 查找所有编译产物文件并复制到固件目录
# 这个find命令和之前删除旧文件的类似，但是这次是复制而不是删除
# -exec cp -f {} "$FIRMWARE_DIR/" \; 表示将找到的每个文件复制到固件目录

\rm -f "$BASE_PATH/firmware/Packages.manifest" 2>/dev/null
# 删除固件目录中的Packages.manifest文件（如果存在）
# 2>/dev/null 表示将错误信息丢弃，不显示
# 这个文件可能是包管理器的清单文件，不需要包含在最终固件中

# === 新增部分：固件重命名和配置文件复制 ===
# 解析设备名称，检查是否符合三段式结构
if [[ $Dev =~ ^([^_]+)_([^_]+)_([^_]+)$ ]]; then
    CHIP="${BASH_REMATCH[1]}"      # 芯片部分 (如 ipq60xx)
    BRANCH_ABBR="${BASH_REMATCH[2]}" # 分支缩写 (如 immwrt)
    CONFIG="${BASH_REMATCH[3]}"     # 配置部分 (如 Pro)
    
    echo "Device name parsed: CHIP=$CHIP, BRANCH_ABBR=$BRANCH_ABBR, CONFIG=$CONFIG"
    
    # 重命名固件文件
    for firmware in "$FIRMWARE_DIR"/*.bin; do
        # 获取文件名（不含路径）
        filename=$(basename "$firmware")
        
        # 检查是否是目标固件文件
        if [[ $filename =~ immortalwrt-qualcommax-.*-jdcloud_(.+)-squashfs-(.+)\.bin ]]; then
            MODEL="${BASH_REMATCH[1]}"   # 固件型号 (如 re-cs-02)
            MODE="${BASH_REMATCH[2]}"    # 固件模式 (如 factory 或 sysupgrade)
            
            # 构建新文件名
            new_filename="immwrt-${MODEL}-${MODE}-${CONFIG}.bin"
            
            # 重命名文件
            mv "$firmware" "$FIRMWARE_DIR/$new_filename"
            echo "Renamed $filename to $new_filename"
        fi
    done
    
    # 复制并重命名配置文件
    config_files=(".config" ".config.buildinfo" "manifest" "Packages.manifest")
    for file in "${config_files[@]}"; do
        src_file="$BASE_PATH/$BUILD_DIR/$file"
        if [[ -f "$src_file" ]]; then
            # 构建新文件名
            new_file="${CHIP}-${BRANCH_ABBR}-${CONFIG}${file}"
            
            # 复制文件
            cp "$src_file" "$FIRMWARE_DIR/$new_file"
            echo "Copied $file to $FIRMWARE_DIR/$new_file"
        else
            echo "Warning: Config file not found: $src_file"
        fi
    done
else
    echo "Device name '$Dev' does not follow the three-part structure, skipping renaming."
fi
# === 新增部分结束 ===

if [[ -d $BASE_PATH/action_build ]]; then
    # 检查是否存在action_build目录
    make clean
    # 如果存在，就执行清理命令
    # make clean 会删除编译过程中产生的临时文件，释放磁盘空间
fi
