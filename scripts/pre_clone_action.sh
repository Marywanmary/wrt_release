#!/usr/bin/env bash

set -e

# 获取当前脚本所在目录的绝对路径
# BASE_PATH=$(cd "$(dirname "$0")/.." && pwd)
BASE_PATH="$(dirname "$(dirname "$(readlink -f "$0")")")"

Dev=$1

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

REPO_URL=$(read_ini_by_key "REPO_URL")
REPO_BRANCH=$(read_ini_by_key "REPO_BRANCH")
REPO_BRANCH=${REPO_BRANCH:-main}

# 提取芯片系列（用于缓存共享）
CHIPSET=$(echo "$Dev" | cut -d'_' -f1)
BUILD_DIR="$BASE_PATH/action_build"

echo $REPO_URL $REPO_BRANCH
echo "$REPO_URL/$REPO_BRANCH" >"$BASE_PATH/repo_flag"
echo "$CHIPSET" >"$BASE_PATH/chipset_flag"

# 如果构建目录已存在，先删除它（确保每个任务都能从干净状态开始）
if [[ -d $BUILD_DIR ]]; then
    rm -rf $BUILD_DIR
fi

git clone --depth 1 -b $REPO_BRANCH $REPO_URL $BUILD_DIR

# GitHub Action 移除国内下载源
PROJECT_MIRRORS_FILE="$BUILD_DIR/scripts/projectsmirrors.json"

if [ -f "$PROJECT_MIRRORS_FILE" ]; then
    sed -i '/.cn\//d; /tencent/d; /aliyun/d' "$PROJECT_MIRRORS_FILE"
fi
