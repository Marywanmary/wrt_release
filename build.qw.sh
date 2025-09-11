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
# --- 修改部分开始 ---
# 如果存在 action_build 目录，优先使用它
if [[ -d $BASE_PATH/action_build ]]; then
    BUILD_DIR="action_build"
    # 这确保了 BUILD_DIR 总是指向 action_build
fi
# --- 修改部分结束 ---

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

# --- 新增的固件重命名和配置文件复制逻辑 ---
# 1. 提取芯片、分支缩写和配置信息
# 从 .config 文件中提取 CONFIG_TARGET_BOARD (例如: ipq60xx_immwrt_Pro)
BOARD_LINE=$(grep "^CONFIG_TARGET_BOARD=" "$BASE_PATH/$BUILD_DIR/.config")
# 从 .config 文件中提取 CONFIG_TARGET_PROFILE (例如: jdcloud_re-cs-02)
PROFILE_LINE=$(grep "^CONFIG_TARGET_PROFILE=" "$BASE_PATH/$BUILD_DIR/.config")

# 2. 解析芯片、分支缩写、配置 (假设格式为 chip_branch_config)
if [[ $BOARD_LINE =~ ^CONFIG_TARGET_BOARD=\"(.*)\"$ ]]; then
    BOARD_VALUE="${BASH_REMATCH[1]}"
    # echo "Board Value: $BOARD_VALUE" # Debug
    # 分割字符串
    IFS='_' read -r CHIP BRANCH_CONFIG CONFIG <<< "$BOARD_VALUE"
    # echo "Chip: $CHIP, Branch_Config: $BRANCH_CONFIG, Config: $CONFIG" # Debug
else
    echo "Could not extract valid CONFIG_TARGET_BOARD from .config"
    exit 1
fi

# 3. 检查是否符合三段式结构 (芯片_分支缩写_配置)
if [[ -z "$CHIP" ]] || [[ -z "$BRANCH_CONFIG" ]] || [[ -z "$CONFIG" ]]; then
    echo "Board name does not match expected format (chip_branch_config). Skipping renaming and copying config files."
    # 如果不符合格式，则跳过重命名和复制步骤
    # 直接复制文件
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec cp -f {} "$FIRMWARE_DIR/" \;
    # 复制 .config, config.buildinfo, Packages.manifest 到输出目录
    # 注意：这里假设 .config 和 config.buildinfo 在 BUILD_DIR 根目录下，Packages.manifest 在 TARGET_DIR 下
    # 如果路径不同，请调整下面的路径
    if [ -f "$BASE_PATH/$BUILD_DIR/.config" ]; then
       cp -f "$BASE_PATH/$BUILD_DIR/.config" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.config"
    fi
    if [ -f "$BASE_PATH/$BUILD_DIR/config.buildinfo" ]; then
       cp -f "$BASE_PATH/$BUILD_DIR/config.buildinfo" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.config.buildinfo"
    fi
    # Packages.manifest 通常在 TARGET_DIR 下，但可能不在 BUILD_DIR 下，需要确认位置
    # 假设它在 TARGET_DIR 的某个子目录下，或者在 BUILD_DIR 下
    # 如果在 BUILD_DIR 下
    if [ -f "$BASE_PATH/$BUILD_DIR/Packages.manifest" ]; then
        cp -f "$BASE_PATH/$BUILD_DIR/Packages.manifest" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.Packages.manifest"
    fi
    # 如果在 TARGET_DIR 下 (常见情况)
    # 查找可能的 Packages.manifest 文件
    # 例如: TARGET_DIR/targets/<target>/<subtarget>/Packages.manifest
    PACKAGES_MANIFEST_PATH=$(find "$TARGET_DIR" -name "Packages.manifest" -type f | head -n 1)
    if [ -n "$PACKAGES_MANIFEST_PATH" ]; then
        cp -f "$PACKAGES_MANIFEST_PATH" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.Packages.manifest"
    fi

    # 复制所有 manifest 文件 (如果存在)
    find "$TARGET_DIR" -type f -name "*.manifest" -exec cp -f {} "$FIRMWARE_DIR/" \; 2>/dev/null || true # 忽略错误

    exit 0 # 结束脚本
fi

# 4. 提取固件型号 (从 PROFILE_LINE)
# 从 PROFILE_LINE 中提取 profile 名称
if [[ $PROFILE_LINE =~ ^CONFIG_TARGET_PROFILE=\"(.*)\"$ ]]; then
    PROFILE_VALUE="${BASH_REMATCH[1]}"
    # echo "Profile Value: $PROFILE_VALUE" # Debug
    # 假设 PROFILE_VALUE 是 "jdcloud_re-cs-02"，我们需要的是 "re-cs-02"
    # 我们需要从中提取 "re-cs-02" 部分
    # 一种方法是先去掉 "jdcloud_" 前缀
    # 另一种更通用的方法是直接提取最后一个连字符后的部分
    # 但根据例子，看起来是 "jdcloud_re-cs-02" -> "re-cs-02"
    # 也许更简单，直接用 awk 提取
    # 但这里我们假设 PROFILE_VALUE 就是 "jdcloud_re-cs-02"
    # 所以我们直接使用 PROFILE_VALUE
    # 如果需要更复杂的解析，可以使用以下方式:
    # PROFILE_MODEL=$(echo "$PROFILE_VALUE" | sed 's/^.*_//') # 但这会得到 "re-cs-02"
    # 更稳妥的方式是直接使用 PROFILE_VALUE 本身，因为它已经是固件型号的一部分
    # 但我们可能需要处理 "jdcloud_" 前缀
    # 假设 PROFILE_VALUE 是 "jdcloud_re-cs-02"，那么 "re-cs-02" 是我们需要的部分
    # 我们先尝试去掉 "jdcloud_" 前缀
    PROFILE_MODEL="${PROFILE_VALUE#jdcloud_}"
    # echo "Profile Model: $PROFILE_MODEL" # Debug
    # 确保 PROFILE_MODEL 不为空
    if [[ -z "$PROFILE_MODEL" ]]; then
        echo "Failed to extract profile model from CONFIG_TARGET_PROFILE"
        exit 1
    fi
else
    echo "Could not extract valid CONFIG_TARGET_PROFILE from .config"
    exit 1
fi

# 5. 创建固件输出目录
FIRMWARE_DIR="$BASE_PATH/firmware"
\rm -rf "$FIRMWARE_DIR"
# 删除旧的固件目录及其中的所有内容
mkdir -p "$FIRMWARE_DIR"
# 创建新的固件目录

# 6. 重命名固件文件
# 重命名规则: immwrt-<profile_model>-<firmware_mode>-<config>.bin
# 先找出所有 .bin 文件
for bin_file in "$TARGET_DIR"/*.bin; do
    if [ -f "$bin_file" ]; then
        # 获取原始文件名
        base_name=$(basename "$bin_file")
        # echo "Processing bin file: $base_name" # Debug

        # 提取固件模式 (factory 或 sysupgrade)
        if [[ $base_name == *"factory"* ]]; then
            FIRMWARE_MODE="factory"
        elif [[ $base_name == *"sysupgrade"* ]]; then
            FIRMWARE_MODE="sysupgrade"
        else
            echo "Warning: Could not determine firmware mode from $base_name. Skipping rename."
            continue # 跳过此文件
        fi

        # 构造新文件名
        NEW_NAME="immwrt-${PROFILE_MODEL}-${FIRMWARE_MODE}-${CONFIG}.bin"

        # 重命名文件
        mv "$bin_file" "$FIRMWARE_DIR/$NEW_NAME"
        echo "Renamed $base_name to $NEW_NAME"
    fi
done

# 7. 复制并重命名配置文件 (包括 manifest)
# 复制 .config
if [ -f "$BASE_PATH/$BUILD_DIR/.config" ]; then
   cp -f "$BASE_PATH/$BUILD_DIR/.config" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.config"
fi

# 复制 config.buildinfo
if [ -f "$BASE_PATH/$BUILD_DIR/config.buildinfo" ]; then
   cp -f "$BASE_PATH/$BUILD_DIR/config.buildinfo" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.config.buildinfo"
fi

# 复制 Packages.manifest (通常在 TARGET_DIR)
# 通常在 TARGET_DIR/<target>/<subtarget>/ 目录下
# 找到一个 Packages.manifest 文件
PACKAGES_MANIFEST_PATH=$(find "$TARGET_DIR" -name "Packages.manifest" -type f | head -n 1)
if [ -n "$PACKAGES_MANIFEST_PATH" ]; then
    cp -f "$PACKAGES_MANIFEST_PATH" "$FIRMWARE_DIR/$CHIP-$BRANCH_CONFIG-$CONFIG.Packages.manifest"
fi

# 复制所有 manifest 文件 (可能有多个)
find "$TARGET_DIR" -type f -name "*.manifest" -exec cp -f {} "$FIRMWARE_DIR/" \; 2>/dev/null || true # 忽略错误

# --- 结束新增逻辑 ---

# 8. 清理动作 (如果存在 action_build)
if [[ -d $BASE_PATH/action_build ]]; then
    # 检查是否存在action_build目录
    make clean
    # 如果存在，就执行清理命令
    # make clean 会删除编译过程中产生的临时文件，释放磁盘空间
fi

# --- 保持原有的清理逻辑 ---
# 删除之前复制的旧文件
\rm -f "$BASE_PATH/firmware/Packages.manifest" 2>/dev/null || true
# 这行可能有问题，因为它试图删除之前复制的文件，但在新逻辑中，我们已经复制了它。
# 如果你想保留所有文件，可以注释掉或删除这行。
# 如果你想删除由 make checksum 生成的不必要的文件，那需要看清楚它生成的文件类型。
