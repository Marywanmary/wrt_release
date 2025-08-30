#!/usr/bin/env bash

set -e
set -o errexit
set -o errtrace

# 定义错误处理函数
error_handler() {
    echo "Error occurred in script at line: ${BASH_LINENO[0]}, command: '${BASH_COMMAND}'"
}

# 设置trap捕获ERR信号
trap 'error_handler' ERR

BASE_PATH=$(cd $(dirname $0) && pwd)

REPO_URL=$1
REPO_BRANCH=$2
BUILD_DIR=$3
COMMIT_HASH=$4

FEEDS_CONF="feeds.conf.default"
GOLANG_REPO="https://github.com/sbwml/packages_lang_golang"
GOLANG_BRANCH="25.x"
THEME_SET="argon"
LAN_ADDR="192.168.111.1"

clone_repo() {
    if [[ ! -d $BUILD_DIR ]]; then
        echo "克隆仓库: $REPO_URL 分支: $REPO_BRANCH"
        if ! git clone --depth 1 -b $REPO_BRANCH $REPO_URL $BUILD_DIR; then
            echo "错误：克隆仓库 $REPO_URL 失败" >&2
            exit 1
        fi
    fi
}

clean_up() {
    cd $BUILD_DIR
    if [[ -f $BUILD_DIR/.config ]]; then
        \rm -f $BUILD_DIR/.config
    fi
    if [[ -d $BUILD_DIR/tmp ]]; then
        \rm -rf $BUILD_DIR/tmp
    fi
    if [[ -d $BUILD_DIR/logs ]]; then
        \rm -rf $BUILD_DIR/logs/*
    fi
    mkdir -p $BUILD_DIR/tmp
    echo "1" >$BUILD_DIR/tmp/.build
}

reset_feeds_conf() {
    git reset --hard origin/$REPO_BRANCH
    git clean -f -d
    git pull
    if [[ $COMMIT_HASH != "none" ]]; then
        git checkout $COMMIT_HASH
    fi
}

update_feeds() {
    # 删除注释行
    sed -i '/^#/d' "$BUILD_DIR/$FEEDS_CONF"

    # 检查并添加 small-package 源
    if ! grep -q "small-package" "$BUILD_DIR/$FEEDS_CONF"; then
        # 确保文件以换行符结尾
        [ -z "$(tail -c 1 "$BUILD_DIR/$FEEDS_CONF")" ] || echo "" >>"$BUILD_DIR/$FEEDS_CONF"
        echo "src-git small8 https://github.com/kenzok8/small-package" >>"$BUILD_DIR/$FEEDS_CONF"
    fi

    # 添加bpf.mk解决更新报错
    if [ ! -f "$BUILD_DIR/include/bpf.mk" ]; then
        touch "$BUILD_DIR/include/bpf.mk"
    fi

    # 更新 feeds
    ./scripts/feeds clean
    ./scripts/feeds update -a
}

# ... (保持其他函数不变)

main() {
    clone_repo
    clean_up
    reset_feeds_conf
    update_feeds
    remove_unwanted_packages
    remove_tweaked_packages
    update_homeproxy
    fix_default_set
    fix_miniupnpd
    update_golang
    change_dnsmasq2full
    fix_mk_def_depends
    add_wifi_default_set
    update_default_lan_addr
    remove_something_nss_kmod
    update_affinity_script
    update_ath11k_fw
    change_cpuusage
    update_tcping
    add_ax6600_led
    set_custom_task
    apply_passwall_tweaks
    install_opkg_distfeeds
    update_nss_pbuf_performance
    set_build_signature
    update_nss_diag
    update_menu_location
    fix_compile_coremark
    update_dnsmasq_conf
    add_backup_info_to_sysupgrade
    update_mosdns_deconfig
    fix_quickstart
    update_oaf_deconfig
    add_timecontrol
    add_gecoosac
    add_quickfile
    update_lucky
    fix_rust_compile_error
    update_smartdns
    update_diskman
    set_nginx_default_config
    update_uwsgi_limit_as
    update_argon
    install_feeds
    support_fw4_adg
    update_script_priority
    fix_easytier
    update_geoip
    update_package "runc" "releases" "v1.2.6"
    update_package "containerd" "releases" "v1.7.27"
    update_package "docker" "tags" "v28.2.2"
    update_package "dockerd" "releases" "v28.2.2"
    apply_hash_fixes # 调用哈希修正函数
}

main "$@"