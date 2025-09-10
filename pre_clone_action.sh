#!/usr/bin/env bash
# 这行代码告诉计算机：这是一个bash脚本，需要用bash程序来执行
# 就像在文件开头标注"这是说明书"一样

set -e
# 设置"严格模式"：如果后面的任何命令执行失败，整个脚本就会立即停止
# 这就像做菜时，如果发现一个步骤出错了（比如打碎鸡蛋），就不再继续做下去了

BASE_PATH=$(cd $(dirname $0) && pwd)
# 获取脚本文件所在的文件夹路径
# $(dirname $0) 获取脚本文件所在的目录名（比如脚本在/home/user/build/，就得到/home/user/build）
# cd 进入那个目录，pwd 获取当前目录的完整路径
# 这样无论在哪里运行这个脚本，都能正确找到相关文件

Dev=$1
# 获取运行脚本时传入的第一个参数，代表设备名称
# 比如运行命令：./build.sh xiaomi 这里的Dev就是"xiaomi"
# 就像给厨师指定要做"小米牌"的设备

CONFIG_FILE="$BASE_PATH/deconfig/$Dev.config"
# 定义配置文件的完整路径
# 比如设备是xiaomi，路径就是：脚本所在目录/deconfig/xiaomi.config
# 这就像为特定设备准备专属的"配方文件"

INI_FILE="$BASE_PATH/compilecfg/$Dev.ini"
# 定义INI配置文件的完整路径
# 比如设备是xiaomi，路径就是：脚本所在目录/compilecfg/xiaomi.ini
# 这是另一种格式的"配方文件"，包含更多细节设置

if [[ ! -f $CONFIG_FILE ]]; then
    # 检查配置文件是否存在
    # ! -f 表示"文件不存在"
    # 就像做菜前检查有没有食谱
    echo "Config not found: $CONFIG_FILE"
    # 如果文件不存在，就显示错误信息
    # 就像告诉厨师："找不到小米的配方文件！"
    exit 1
    # 退出脚本，返回错误代码1（表示出错）
    # 就像放弃做这道菜，因为缺少必要的配方
fi

if [[ ! -f $INI_FILE ]]; then
    # 检查INI文件是否存在
    echo "INI file not found: $INI_FILE"
    # 如果文件不存在，就显示错误信息
    # 就像告诉厨师："找不到小米的详细设置文件！"
    exit 1
    # 退出脚本，返回错误代码1（表示出错）
fi

read_ini_by_key() {
    # 定义一个函数，用于从INI文件中读取指定键的值
    # INI文件是一种配置文件格式，格式如：键=值（就像"温度=180度"）
    local key=$1
    # 获取传入的参数（键名），存储在key变量中
    # 比如传入"温度"，key就是"温度"
    awk -F"=" -v key="$key" '$1 == key {print $2}' "$INI_FILE"
    # 使用awk工具解析INI文件：
    # -F"=" 表示用等号作为分隔符（把"温度=180度"分成两部分）
    # -v key="$key" 将shell变量key传递给awk
    # '$1 == key {print $2}' 如果第一列（键名）匹配，就打印第二列（值）
    # 就像在食谱中查找"温度"这一行，然后读出后面的"180度"
}

REPO_URL=$(read_ini_by_key "REPO_URL")
# 从INI文件中读取REPO_URL（代码仓库地址）的值
# 代码仓库就像存放所有菜谱的图书馆
# 调用之前定义的read_ini_by_key函数，查找"REPO_URL="后面的地址

REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
# 从INI文件中读取REPO_BRANCH（代码仓库分支）的值
# 分支就像图书馆里不同版本的菜谱（比如"春季版"、"夏季版"）

REPO_BRANCH=${REPO_BRANCH:-main}
# 如果REPO_BRANCH为空，就设置为默认值"main"
# :- 是bash的默认值语法，就像"如果没有指定版本，就用最新版"

BUILD_DIR="$BASE_PATH/action_build"
# 定义构建目录的路径
# 构建目录就像准备食材和工具的厨房工作台
# 这里固定使用"action_build"作为目录名

echo $REPO_URL $REPO_BRANCH
# 显示代码仓库地址和分支名称
# 就像告诉厨师："我们要用图书馆里的这个地址，春季版菜谱"

echo "$REPO_URL/$REPO_BRANCH" >"$BASE_PATH/repo_flag"
# 将仓库地址和分支信息写入一个标记文件
# > 表示覆盖写入文件内容
# 这就像在厨房门口贴个便签："今天使用春季版菜谱"

git clone --depth 1 -b $REPO_BRANCH $REPO_URL $BUILD_DIR
# 使用git命令克隆代码仓库
# git是版本控制工具，就像从图书馆复印菜谱
# --depth 1 表示只复制最新版本（不复制历史记录），节省时间和空间
# -b $REPO_BRANCH 指定要复制的分支（版本）
# $REPO_URL 是菜谱的地址
# $BUILD_DIR 是复制到哪个目录（厨房工作台）
# 就像从图书馆复印"春季版菜谱"的最新版，放到厨房工作台上

# GitHub Action 移除国内下载源
PROJECT_MIRRORS_FILE="$BUILD_DIR/scripts/projectsmirrors.json"
# 定义项目镜像源配置文件的路径
# 镜像源就像菜谱中推荐的食材供应商列表
# 这里指定了供应商列表文件的位置

if [ -f "$PROJECT_MIRRORS_FILE" ]; then
    # 检查镜像源配置文件是否存在
    # 就像检查有没有供应商列表
    sed -i '/.cn\//d; /tencent/d; /aliyun/d' "$PROJECT_MIRRORS_FILE"
    # 使用sed工具删除文件中的特定行
    # sed是文本编辑工具，就像用笔划掉供应商列表中的某些项
    # '/.cn\//d' 删除包含".cn/"的行（国内镜像源）
    # '/tencent/d' 删除包含"tencent"的行（腾讯源）
    # '/aliyun/d' 删除包含"aliyun"的行（阿里源）
    # -i 表示直接修改文件
    # 这就像划掉供应商列表中的"中国供应商"、"腾讯供应商"、"阿里供应商"
    # 因为在GitHub Action环境中，这些国内源可能无法访问或速度慢
fi
