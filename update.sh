#!/usr/bin/env bash
# 这行代码告诉计算机：这是一个bash脚本，需要用bash程序来执行
# 就像在文件开头标注"这是说明书"一样

set -e
# 设置"严格模式"：如果后面的任何命令执行失败，整个脚本就会立即停止
# 这就像做菜时，如果发现一个步骤出错了（比如打碎鸡蛋），就不再继续做下去了

set -o errexit
# 与上面的set -e作用相同，确保任何命令失败时脚本立即退出
# 这是双重保险，确保脚本不会在出错后继续执行

set -o errtrace
# 设置错误追踪：当脚本出错时，会显示完整的错误调用链
# 就像出错时不仅告诉你哪里错了，还会告诉你"是因为这个步骤导致的那个步骤出错"

# 定义错误处理函数
error_handler() {
    echo "Error occurred in script at line: ${BASH_LINENO[0]}, command: '${BASH_COMMAND}'"
}
# 这个函数会在出错时被调用
# 它会显示错误发生的行号和具体的命令内容
# 就像告诉厨师："在第5步，'打鸡蛋'这个操作出错了"

# 设置trap捕获ERR信号
trap 'error_handler' ERR
# 设置一个"陷阱"：当任何命令执行失败时（产生ERR信号），自动调用error_handler函数
# 就像在厨房安装了警报器，一旦有步骤出错就会立即响铃并显示错误信息

BASE_PATH=$(cd $(dirname $0) && pwd)
# 获取脚本文件所在的文件夹路径
# $(dirname $0) 获取脚本文件所在的目录名
# cd 进入那个目录，pwd 获取当前目录的完整路径
# 这样无论在哪里运行这个脚本，都能正确找到相关文件

# 从命令行参数获取配置信息
REPO_URL=$1      # 代码仓库地址（比如GitHub仓库链接）
REPO_BRANCH=$2   # 代码仓库分支（比如main或master）
BUILD_DIR=$3     # 构建目录（存放源代码和编译产物的地方）
COMMIT_HASH=$4   # 特定的代码提交版本号（可选）

# 定义一些固定的配置项
FEEDS_CONF="feeds.conf.default"    # 软件源配置文件名
GOLANG_REPO="https://github.com/sbwml/packages_lang_golang"  # Go语言包的仓库地址
GOLANG_BRANCH="25.x"              # Go语言包的分支版本
THEME_SET="argon"                  # 默认网页主题名称
LAN_ADDR="192.168.111.1"           # 路由器默认管理地址

# 克隆代码仓库的函数
clone_repo() {
    if [[ ! -d $BUILD_DIR ]]; then
        # 如果构建目录不存在
        echo "克隆仓库: $REPO_URL 分支: $REPO_BRANCH"
        # 显示正在克隆哪个仓库的哪个分支
        if ! git clone --depth 1 -b $REPO_BRANCH $REPO_URL $BUILD_DIR; then
            # 尝试克隆仓库：
            # --depth 1 表示只下载最新版本（不下载历史记录），节省时间
            # -b 指定要下载的分支
            # $REPO_URL 是仓库地址
            # $BUILD_DIR 是存放位置
            echo "错误：克隆仓库 $REPO_URL 失败" >&2
            # 如果克隆失败，显示错误信息（>&2表示输出到错误通道）
            exit 1
            # 退出脚本，返回错误代码1
        fi
    fi
}

# 清理构建环境的函数
clean_up() {
    cd $BUILD_DIR
    # 进入构建目录
    
    # 删除旧的配置文件
    if [[ -f $BUILD_DIR/.config ]]; then
        \rm -f $BUILD_DIR/.config
        # \rm 使用rm命令，\防止使用别名
        # -f 表示强制删除，不提示确认
    fi
    
    # 删除临时目录
    if [[ -d $BUILD_DIR/tmp ]]; then
        \rm -rf $BUILD_DIR/tmp
        # -r 表示递归删除目录及其所有内容
        # -f 表示强制删除
    fi
    
    # 清空日志目录
    if [[ -d $BUILD_DIR/logs ]]; then
        \rm -rf $BUILD_DIR/logs/*
        # 删除logs目录下的所有文件，但保留目录本身
    fi
    
    # 创建新的临时目录
    mkdir -p $BUILD_DIR/tmp
    # mkdir 是创建目录的命令
    # -p 表示如果父目录不存在也一并创建
    
    # 创建构建标记文件
    echo "1" >$BUILD_DIR/tmp/.build
    # 在临时目录中创建一个标记文件，表示构建环境已准备好
}

# 重置代码仓库状态的函数
reset_feeds_conf() {
    git reset --hard origin/$REPO_BRANCH
    # 将代码重置到远程分支的最新状态
    # --hard 表示彻底重置，丢弃所有本地修改
    
    git clean -f -d
    # 清理所有未被跟踪的文件和目录
    # -f 表示强制清理
    # -d 表示也清理目录
    
    git pull
    # 从远程仓库拉取最新代码
    
    if [[ $COMMIT_HASH != "none" ]]; then
        # 如果指定了特定的提交版本
        git checkout $COMMIT_HASH
        # 切换到那个特定的版本
    fi
}

# 更新软件源的函数
update_feeds() {
    # 删除配置文件中的注释行
    sed -i '/^#/d' "$BUILD_DIR/$FEEDS_CONF"
    # sed是文本编辑工具
    # -i 表示直接修改文件
    # '/^#/d' 表示删除所有以#开头的行（注释行）
    
    # 检查并添加 small-package 源
    if ! grep -q "small-package" "$BUILD_DIR/$FEEDS_CONF"; then
        # 如果配置文件中没有small-package源
        # 确保文件以换行符结尾
        [ -z "$(tail -c 1 "$BUILD_DIR/$FEEDS_CONF")" ] || echo "" >>"$BUILD_DIR/$FEEDS_CONF"
        # 添加新的软件源
        echo "src-git small8 https://github.com/kenzok8/small-package" >>"$BUILD_DIR/$FEEDS_CONF"

        # 添加其它的软件源
        echo "git clone --depth=1 tailscale https://github.com/tailscale/tailscale" >>"$BUILD_DIR/$FEEDS_CONF"
        echo "git clone --depth=1 taskplan https://github.com/sirpdboy/luci-app-taskplan" >>"$BUILD_DIR/$FEEDS_CONF"
        echo "git clone --depth=1 lucky https://github.com/gdy666/luci-app-lucky" >>"$BUILD_DIR/$FEEDS_CONF"
        #echo "src-git small8 https://github.com/kenzok8/small-package" >>"$BUILD_DIR/$FEEDS_CONF"
    fi
    
    # 添加bpf.mk文件解决更新报错
    if [ ! -f "$BUILD_DIR/include/bpf.mk" ]; then
        touch "$BUILD_DIR/include/bpf.mk"
        # 如果文件不存在，创建一个空文件
        # touch 是创建空文件的命令
    fi
    
    # 更新所有软件源
    ./scripts/feeds clean
    # 清理旧的软件源缓存
    
    ./scripts/feeds update -a
    # 更新所有软件源（-a表示all）
    # 这就像更新手机应用商店的应用列表
}

# 移除不需要的软件包的函数
remove_unwanted_packages() {
    # 定义要移除的LuCI应用列表（网页管理界面插件）
    local luci_packages=(
        "luci-app-passwall" "luci-app-ddns-go" "luci-app-rclone" "luci-app-ssr-plus"
        "luci-app-vssr" "luci-app-daed" "luci-app-dae" "luci-app-alist" "luci-app-homeproxy"
        "luci-app-haproxy-tcp" "luci-app-openclash" "luci-app-mihomo" "luci-app-appfilter"
        "luci-app-msd_lite"
    )
    
    # 定义要移除的网络工具包列表
    local packages_net=(
        "haproxy" "xray-core" "xray-plugin" "dns2socks" "alist" "hysteria"
        "mosdns" "adguardhome" "ddns-go" "naiveproxy" "shadowsocks-rust"
        "sing-box" "v2ray-core" "v2ray-geodata" "v2ray-plugin" "tuic-client"
        "chinadns-ng" "ipt2socks" "tcping" "trojan-plus" "simple-obfs" "shadowsocksr-libev" 
        "dae" "daed" "mihomo" "geoview" "tailscale" "open-app-filter" "msd_lite"
    )
    
    # 定义要移除的工具包列表
    local packages_utils=(
        "cups"
    )
    
    # 定义要移除的small8源软件包列表
    local small8_packages=(
        "ppp" "firewall" "dae" "daed" "daed-next" "libnftnl" "nftables" "dnsmasq" "luci-app-alist"
        "alist" "opkg" "smartdns" "luci-app-smartdns"
    )
    
    # 遍历并删除LuCI应用
    for pkg in "${luci_packages[@]}"; do
        if [[ -d ./feeds/luci/applications/$pkg ]]; then
            \rm -rf ./feeds/luci/applications/$pkg
            # 如果目录存在，递归删除整个目录
        fi
        if [[ -d ./feeds/luci/themes/$pkg ]]; then
            \rm -rf ./feeds/luci/themes/$pkg
            # 检查并删除主题目录
        fi
    done
    
    # 遍历并删除网络工具包
    for pkg in "${packages_net[@]}"; do
        if [[ -d ./feeds/packages/net/$pkg ]]; then
            \rm -rf ./feeds/packages/net/$pkg
        fi
    done
    
    # 遍历并删除工具包
    for pkg in "${packages_utils[@]}"; do
        if [[ -d ./feeds/packages/utils/$pkg ]]; then
            \rm -rf ./feeds/packages/utils/$pkg
        fi
    done
    
    # 遍历并删除small8源软件包
    for pkg in "${small8_packages[@]}"; do
        if [[ -d ./feeds/small8/$pkg ]]; then
            \rm -rf ./feeds/small8/$pkg
        fi
    done
    
    # 删除istore软件源
    if [[ -d ./package/istore ]]; then
        \rm -rf ./package/istore
    fi
    
    # 清理特定平台的初始化脚本
    if [ -d "$BUILD_DIR/target/linux/qualcommax/base-files/etc/uci-defaults" ]; then
        find "$BUILD_DIR/target/linux/qualcommax/base-files/etc/uci-defaults/" -type f -name "99*.sh" -exec rm -f {} +
        # 查找并删除所有以99开头的.sh文件
        # find是查找文件的命令
        # -type f 表示只查找文件
        # -name "99*.sh" 表示文件名匹配模式
        # -exec rm -f {} + 表示对找到的每个文件执行删除命令
    fi
}

# 更新Go语言支持包的函数
update_golang() {
    if [[ -d ./feeds/packages/lang/golang ]]; then
        # 如果Go语言包目录存在
        echo "正在更新 golang 软件包..."
        # 显示提示信息
        \rm -rf ./feeds/packages/lang/golang
        # 删除旧的Go语言包目录
        
        # 克隆新的Go语言包
        if ! git clone --depth 1 -b $GOLANG_BRANCH $GOLANG_REPO ./feeds/packages/lang/golang; then
            echo "错误：克隆 golang 仓库 $GOLANG_REPO 失败" >&2
            exit 1
        fi
    fi
}

# 安装small8源软件包的函数
install_small8() {
    ./scripts/feeds install -p small8 -f xray-core xray-plugin dns2tcp dns2socks haproxy hysteria \
        naiveproxy shadowsocks-rust sing-box v2ray-core v2ray-geodata v2ray-geoview v2ray-plugin \
        tuic-client chinadns-ng ipt2socks tcping trojan-plus simple-obfs shadowsocksr-libev \
        luci-app-passwall v2dat mosdns luci-app-mosdns adguardhome luci-app-adguardhome ddns-go \
        luci-app-ddns-go taskd luci-lib-xterm luci-lib-taskd luci-app-store quickstart \
        luci-app-quickstart luci-app-istorex luci-app-cloudflarespeedtest netdata luci-app-netdata \
        lucky luci-app-lucky luci-app-openclash luci-app-homeproxy luci-app-amlogic nikki luci-app-nikki \
        tailscale luci-app-tailscale oaf open-app-filter luci-app-oaf easytier luci-app-easytier \
        msd_lite luci-app-msd_lite cups luci-app-cupsd
    # 使用feeds命令安装一系列软件包
    # -p small8 表示从small8源安装
    # -f 表示强制重新安装
    # 后面跟着一长串要安装的软件包名称
    # 这些主要是网络工具、代理工具和系统管理工具
}

# 安装FullCone NAT支持包的函数
install_fullconenat() {
    if [ ! -d $BUILD_DIR/package/network/utils/fullconenat-nft ]; then
        # 如果fullconenat-nft包不存在
        ./scripts/feeds install -p small8 -f fullconenat-nft
        # 安装fullconenat-nft包
    fi
    if [ ! -d $BUILD_DIR/package/network/utils/fullconenat ]; then
        # 如果fullconenat包不存在
        ./scripts/feeds install -p small8 -f fullconenat
        # 安装fullconenat包
    fi
    # FullCone NAT是一种网络地址转换技术，用于提高P2P应用的网络穿透能力
}

# 安装所有软件源的函数
install_feeds() {
    ./scripts/feeds update -i
    # 更新软件源索引
    
    # 遍历所有软件源目录
    for dir in $BUILD_DIR/feeds/*; do
        # 检查是否为目录并且不以 .tmp 结尾，并且不是软链接
        if [ -d "$dir" ] && [[ ! "$dir" == *.tmp ]] && [ ! -L "$dir" ]; then
            if [[ $(basename "$dir") == "small8" ]]; then
                # 如果是small8源
                install_small8
                # 调用安装small8包的函数
                install_fullconenat
                # 调用安装FullCone NAT的函数
            else
                # 对于其他软件源
                ./scripts/feeds install -f -ap $(basename "$dir")
                # 安装该源下的所有软件包
                # -f 表示强制重新安装
                # -a 表示安装所有包
                # -p 表示指定源名称
            fi
        fi
    done
}

# 修复默认设置的函数
fix_default_set() {
    # 修改默认主题
    if [ -d "$BUILD_DIR/feeds/luci/collections/" ]; then
        find "$BUILD_DIR/feeds/luci/collections/" -type f -name "Makefile" -exec sed -i "s/luci-theme-bootstrap/luci-theme-$THEME_SET/g" {} \;
        # 查找所有Makefile文件，并将默认主题从bootstrap改为argon
        # sed是文本替换工具
        # "s/旧字符串/新字符串/g" 表示全局替换
    fi
    
    # 安装自定义设置脚本
    install -Dm755 "$BASE_PATH/patches/990_set_argon_primary" "$BUILD_DIR/package/base-files/files/etc/uci-defaults/990_set_argon_primary"
    # install是复制文件的命令，可以设置权限
    # -D 表示创建目标目录（如果不存在）
    # -m755 设置文件权限为755（所有者可读写执行，其他用户可读执行）
    # 复制自定义脚本到系统初始化目录
    
    install -Dm755 "$BASE_PATH/patches/991_custom_settings" "$BUILD_DIR/package/base-files/files/etc/uci-defaults/991_custom_settings"
    # 复制另一个自定义设置脚本
    
    # 修复温度显示脚本
    if [ -f "$BUILD_DIR/package/emortal/autocore/files/tempinfo" ]; then
        if [ -f "$BASE_PATH/patches/tempinfo" ]; then
            \cp -f "$BASE_PATH/patches/tempinfo" "$BUILD_DIR/package/emortal/autocore/files/tempinfo"
            # 如果补丁文件存在，覆盖原文件
        fi
    fi
}

# 修复miniupnpd软件包的函数
fix_miniupnpd() {
    local miniupnpd_dir="$BUILD_DIR/feeds/packages/net/miniupnpd"
    local patch_file="999-chanage-default-leaseduration.patch"
    
    if [ -d "$miniupnpd_dir" ] && [ -f "$BASE_PATH/patches/$patch_file" ]; then
        # 如果miniupnpd目录和补丁文件都存在
        install -Dm644 "$BASE_PATH/patches/$patch_file" "$miniupnpd_dir/patches/$patch_file"
        # 复制补丁文件到miniupnpd的补丁目录
        # -m644 设置文件权限为644（所有者可读写，其他用户只读）
    fi
}

# 将dnsmasq替换为dnsmasq-full的函数
change_dnsmasq2full() {
    if ! grep -q "dnsmasq-full" $BUILD_DIR/include/target.mk; then
        # 如果target.mk文件中没有dnsmasq-full
        sed -i 's/dnsmasq/dnsmasq-full/g' ./include/target.mk
        # 将所有dnsmasq替换为dnsmasq-full
        # dnsmasq-full是功能更完整的版本，支持更多DNS功能
    fi
}

# 修复依赖关系的函数
fix_mk_def_depends() {
    sed -i 's/libustream-mbedtls/libustream-openssl/g' $BUILD_DIR/include/target.mk 2>/dev/null
    # 将加密库从mbedtls改为openssl
    # 2>/dev/null 表示忽略错误信息（如果替换失败也不显示错误）
    
    if [ -f $BUILD_DIR/target/linux/qualcommax/Makefile ]; then
        sed -i 's/wpad-openssl/wpad-mesh-openssl/g' $BUILD_DIR/target/linux/qualcommax/Makefile
        # 将WiFi认证包从wpad-openssl改为wpad-mesh-openssl
        # 后者支持网状网络（Mesh）功能
    fi
}

# 添加WiFi默认设置的函数
add_wifi_default_set() {
    local qualcommax_uci_dir="$BUILD_DIR/target/linux/qualcommax/base-files/etc/uci-defaults"
    local filogic_uci_dir="$BUILD_DIR/target/linux/mediatek/filogic/base-files/etc/uci-defaults"
    
    # 为qualcommax平台添加WiFi设置脚本
    if [ -d "$qualcommax_uci_dir" ]; then
        install -Dm755 "$BASE_PATH/patches/992_set-wifi-uci.sh" "$qualcommax_uci_dir/992_set-wifi-uci.sh"
    fi
    
    # 为filogic平台添加WiFi设置脚本
    if [ -d "$filogic_uci_dir" ]; then
        install -Dm755 "$BASE_PATH/patches/992_set-wifi-uci.sh" "$filogic_uci_dir/992_set-wifi-uci.sh"
    fi
}

# 更新默认LAN地址的函数
update_default_lan_addr() {
    local CFG_PATH="$BUILD_DIR/package/base-files/files/bin/config_generate"
    if [ -f $CFG_PATH ]; then
        sed -i 's/192\.168\.[0-9]*\.[0-9]*/'$LAN_ADDR'/g' $CFG_PATH
        # 将配置生成脚本中的默认LAN地址改为192.168.111.1
        # \. 表示匹配点号（.在正则表达式中有特殊含义）
        # [0-9]* 表示匹配任意数字
    fi
}

# 移除NSS相关内核模块的函数
remove_something_nss_kmod() {
    local ipq_mk_path="$BUILD_DIR/target/linux/qualcommax/Makefile"
    local target_mks=("$BUILD_DIR/target/linux/qualcommax/ipq60xx/target.mk" "$BUILD_DIR/target/linux/qualcommax/ipq807x/target.mk")
    
    # 处理特定平台的Makefile
    for target_mk in "${target_mks[@]}"; do
        if [ -f "$target_mk" ]; then
            sed -i 's/kmod-qca-nss-crypto//g' "$target_mk"
            # 移除加密模块
        fi
    done
    
    # 处理主Makefile
    if [ -f "$ipq_mk_path" ]; then
        # 移除一系列NSS驱动模块
        sed -i '/kmod-qca-nss-drv-eogremgr/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-gre/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-map-t/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-match/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-mirror/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-tun6rd/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-tunipip6/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-vxlanmgr/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-drv-wifi-meshmgr/d' "$ipq_mk_path"
        sed -i '/kmod-qca-nss-macsec/d' "$ipq_mk_path"
        
        # 移除一些特性
        sed -i 's/automount //g' "$ipq_mk_path"
        sed -i 's/cpufreq //g' "$ipq_mk_path"
    fi
}

# 更新CPU亲和性脚本的函数
update_affinity_script() {
    local affinity_script_dir="$BUILD_DIR/target/linux/qualcommax"
    
    if [ -d "$affinity_script_dir" ]; then
        # 删除旧的脚本
        find "$affinity_script_dir" -name "set-irq-affinity" -exec rm -f {} \;
        find "$affinity_script_dir" -name "smp_affinity" -exec rm -f {} \;
        
        # 安装新的脚本
        install -Dm755 "$BASE_PATH/patches/smp_affinity" "$affinity_script_dir/base-files/etc/init.d/smp_affinity"
        # CPU亲和性脚本用于优化CPU核心与中断的绑定，提高网络性能
    fi
}

# 修正软件包哈希值的通用函数
fix_hash_value() {
    local makefile_path="$1"    # Makefile文件路径
    local old_hash="$2"        # 旧的哈希值
    local new_hash="$3"        # 新的哈希值
    local package_name="$4"    # 软件包名称
    
    if [ -f "$makefile_path" ]; then
        sed -i "s/$old_hash/$new_hash/g" "$makefile_path"
        # 在Makefile中替换哈希值
        echo "已修正 $package_name 的哈希值。"
    fi
}

# 应用所有哈希值修正的函数
apply_hash_fixes() {
    # 修正smartdns软件包的哈希值
    fix_hash_value \
        "$BUILD_DIR/package/feeds/packages/smartdns/Makefile" \
        "a7edb052fea61418c91c7a052f7eb1478fe6d844aec5e3eda0f2fcf82de29a10" \
        "b11e175970e08115fe3b0d7a543fa8d3a6239d3c24eeecfd8cfd2fef3f52c6c9" \
        "smartdns"
    
    # 再次修正smartdns的另一个哈希值
    fix_hash_value \
        "$BUILD_DIR/package/feeds/packages/smartdns/Makefile" \
        "a1c084dcc4fb7f87641d706b70168fc3c159f60f37d4b7eac6089ae68f0a18a1" \
        "ab7d303a538871ae4a70ead2e90d35e24fcc36bc20f5b6c5d963a3e283ea43b1" \
        "smartdns"    
}

# 更新ath11k固件的函数
update_ath11k_fw() {
    local makefile="$BUILD_DIR/package/firmware/ath11k-firmware/Makefile"
    local new_mk="$BASE_PATH/patches/ath11k_fw.mk"
    local url="https://raw.githubusercontent.com/VIKINGYFY/immortalwrt/refs/heads/main/package/firmware/ath11k-firmware/Makefile"
    
    if [ -d "$(dirname "$makefile")" ]; then
        echo "正在更新 ath11k-firmware Makefile..."
        # 使用curl下载新的Makefile
        if ! curl -fsSL -o "$new_mk" "$url"; then
            echo "错误：从 $url 下载 ath11k-firmware Makefile 失败" >&2
            exit 1
        fi
        if [ ! -s "$new_mk" ]; then
            # 检查下载的文件是否为空
            echo "错误：下载的 ath11k-firmware Makefile 为空文件" >&2
            exit 1
        fi
        mv -f "$new_mk" "$makefile"
        # 替换原来的Makefile
    fi
}

# 修复软件包格式问题的函数
fix_mkpkg_format_invalid() {
    if [[ $BUILD_DIR =~ "imm-nss" ]]; then
        # 如果构建目录包含"imm-nss"
        
        # 修复v2ray-geodata的Makefile
        if [ -f $BUILD_DIR/feeds/small8/v2ray-geodata/Makefile ]; then
            sed -i 's/VER)-\$(PKG_RELEASE)/VER)-r\$(PKG_RELEASE)/g' $BUILD_DIR/feeds/small8/v2ray-geodata/Makefile
        fi
        
        # 修复luci-lib-taskd的Makefile
        if [ -f $BUILD_DIR/feeds/small8/luci-lib-taskd/Makefile ]; then
            sed -i 's/>=1\.0\.3-1/>=1\.0\.3-r1/g' $BUILD_DIR/feeds/small8/luci-lib-taskd/Makefile
        fi
        
        # 修复luci-app-openclash的Makefile
        if [ -f $BUILD_DIR/feeds/small8/luci-app-openclash/Makefile ]; then
            sed -i 's/PKG_RELEASE:=beta/PKG_RELEASE:=1/g' $BUILD_DIR/feeds/small8/luci-app-openclash/Makefile
        fi
        
        # 修复luci-app-quickstart的Makefile
        if [ -f $BUILD_DIR/feeds/small8/luci-app-quickstart/Makefile ]; then
            sed -i 's/PKG_VERSION:=0\.8\.16-1/PKG_VERSION:=0\.8\.16/g' $BUILD_DIR/feeds/small8/luci-app-quickstart/Makefile
            sed -i 's/PKG_RELEASE:=$/PKG_RELEASE:=1/g' $BUILD_DIR/feeds/small8/luci-app-quickstart/Makefile
        fi
        
        # 修复luci-app-store的Makefile
        if [ -f $BUILD_DIR/feeds/small8/luci-app-store/Makefile ]; then
            sed -i 's/PKG_VERSION:=0\.1\.27-1/PKG_VERSION:=0\.1\.27/g' $BUILD_DIR/feeds/small8/luci-app-store/Makefile
            sed -i 's/PKG_RELEASE:=$/PKG_RELEASE:=1/g' $BUILD_DIR/feeds/small8/luci-app-store/Makefile
        fi
    fi
}

# 添加AX6600 LED控制应用的函数
add_ax6600_led() {
    local athena_led_dir="$BUILD_DIR/package/emortal/luci-app-athena-led"
    local repo_url="https://github.com/NONGFAH/luci-app-athena-led.git"
    
    echo "正在添加 luci-app-athena-led..."
    rm -rf "$athena_led_dir" 2>/dev/null
    # 删除旧目录（如果存在）
    
    # 克隆新的仓库
    if ! git clone --depth=1 "$repo_url" "$athena_led_dir"; then
        echo "错误：从 $repo_url 克隆 luci-app-athena-led 仓库失败" >&2
        exit 1
    fi
    
    # 设置文件权限
    if [ -d "$athena_led_dir" ]; then
        chmod +x "$athena_led_dir/root/usr/sbin/athena-led"
        chmod +x "$athena_led_dir/root/etc/init.d/athena_led"
        # chmod +x 表示添加可执行权限
    else
        echo "错误：克隆操作后未找到目录 $athena_led_dir" >&2
        exit 1
    fi
}

# 修改CPU使用率显示方式的函数
change_cpuusage() {
    local luci_rpc_path="$BUILD_DIR/feeds/luci/modules/luci-base/root/usr/share/rpcd/ucode/luci"
    local qualcommax_sbin_dir="$BUILD_DIR/target/linux/qualcommax/base-files/sbin"
    local filogic_sbin_dir="$BUILD_DIR/target/linux/mediatek/filogic/base-files/sbin"
    
    # 修改LuCI RPC脚本以使用自定义的cpuusage脚本
    if [ -f "$luci_rpc_path" ]; then
        sed -i "s#const fd = popen('top -n1 | awk \\\'/^CPU/ {printf(\"%d%\", 100 - \$8)}\\\'')#const cpuUsageCommand = access('/sbin/cpuusage') ? '/sbin/cpuusage' : 'top -n1 | awk \\\'/^CPU/ {printf(\"%d%\", 100 - \$8)}\\\''#g" "$luci_rpc_path"
        sed -i '/cpuUsageCommand/a \\t\t\tconst fd = popen(cpuUsageCommand);' "$luci_rpc_path"
        # 修改CPU使用率的获取方式，优先使用自定义脚本
    fi
    
    # 删除旧脚本（如果存在）
    local old_script_path="$BUILD_DIR/package/base-files/files/sbin/cpuusage"
    if [ -f "$old_script_path" ]; then
        rm -f "$old_script_path"
    fi
    
    # 安装平台特定的cpuusage脚本
    install -Dm755 "$BASE_PATH/patches/cpuusage" "$qualcommax_sbin_dir/cpuusage"
    install -Dm755 "$BASE_PATH/patches/hnatusage" "$filogic_sbin_dir/cpuusage"
    # 为不同平台安装不同的CPU使用率计算脚本
}

# 更新tcping工具的函数
update_tcping() {
    local tcping_path="$BUILD_DIR/feeds/small8/tcping/Makefile"
    local url="https://raw.githubusercontent.com/xiaorouji/openwrt-passwall-packages/refs/heads/main/tcping/Makefile"
    
    if [ -d "$(dirname "$tcping_path")" ]; then
        echo "正在更新 tcping Makefile..."
        # 下载新的Makefile
        if ! curl -fsSL -o "$tcping_path" "$url"; then
            echo "错误：从 $url 下载 tcping Makefile 失败" >&2
            exit 1
        fi
    fi
}

# 设置自定义任务的函数
set_custom_task() {
    local sh_dir="$BUILD_DIR/package/base-files/files/etc/init.d"
    # 创建自定义任务脚本
    cat <<'EOF' >"$sh_dir/custom_task"
#!/bin/sh /etc/rc.common
# 设置启动优先级
START=99

boot() {
    # 重新添加缓存清理定时任务
    sed -i '/drop_caches/d' /etc/crontabs/root
    echo "15 3 * * * sync && echo 3 > /proc/sys/vm/drop_caches" >>/etc/crontabs/root
    # 每天凌晨3:15清理系统缓存
    
    # 删除现有的 wireguard_watchdog 任务
    sed -i '/wireguard_watchdog/d' /etc/crontabs/root
    
    # 获取 WireGuard 接口名称
    # local wg_ifname=$(wg show | awk '/interface/ {print $2}')
    
    # if [ -n "$wg_ifname" ]; then
    #     # 如果有WireGuard接口，添加看门狗任务
    #     echo "*/15 * * * * /usr/bin/wireguard_watchdog" >>/etc/crontabs/root
    #     # 每15分钟检查一次WireGuard连接状态
    #     uci set system.@system[0].cronloglevel='9'
    #     uci commit system
    #     /etc/init.d/cron restart
    fi
    
    # 应用新的 crontab 配置
    crontab /etc/crontabs/root
}
EOF
    chmod +x "$sh_dir/custom_task"
    # 设置脚本为可执行
}

# 应用Passwall相关调整的函数
apply_passwall_tweaks() {
    # 清理 Passwall 的 chnlist 规则文件
    local chnlist_path="$BUILD_DIR/feeds/small8/luci-app-passwall/root/usr/share/passwall/rules/chnlist"
    if [ -f "$chnlist_path" ]; then
        > "$chnlist_path"
        # 清空文件内容
    fi
    
    # 调整 Xray 最大 RTT 和 保留记录数量
    local xray_util_path="$BUILD_DIR/feeds/small8/luci-app-passwall/luasrc/passwall/util_xray.lua"
    if [ -f "$xray_util_path" ]; then
        sed -i 's/maxRTT = "1s"/maxRTT = "2s"/g' "$xray_util_path"
        sed -i 's/sampling = 3/sampling = 5/g' "$xray_util_path"
        # 调整Xray代理的参数，提高连接稳定性
    fi
}

# 安装opkg软件源配置的函数
install_opkg_distfeeds() {
    local emortal_def_dir="$BUILD_DIR/package/emortal/default-settings"
    local distfeeds_conf="$emortal_def_dir/files/99-distfeeds.conf"
    
    if [ -d "$emortal_def_dir" ] && [ ! -f "$distfeeds_conf" ]; then
        # 如果目录存在但配置文件不存在
        # 创建软件源配置文件
        cat <<'EOF' >"$distfeeds_conf"
src/gz openwrt_base https://downloads.immortalwrt.org/releases/24.10-SNAPSHOT/packages/aarch64_cortex-a53/base/
src/gz openwrt_luci https://downloads.immortalwrt.org/releases/24.10-SNAPSHOT/packages/aarch64_cortex-a53/luci/
src/gz openwrt_packages https://downloads.immortalwrt.org/releases/24.10-SNAPSHOT/packages/aarch64_cortex-a53/packages/
src/gz openwrt_routing https://downloads.immortalwrt.org/releases/24.10-SNAPSHOT/packages/aarch64_cortex-a53/routing/
src/gz openwrt_telephony https://downloads.immortalwrt.org/releases/24.10-SNAPSHOT/packages/aarch64_cortex-a53/telephony/
EOF
        # 这些是软件包管理器的软件源地址
        
        # 修改Makefile以包含配置文件
        sed -i "/define Package\/default-settings\/install/a\\
\\t\$(INSTALL_DIR) \$(1)/etc\\n\
\t\$(INSTALL_DATA) ./files/99-distfeeds.conf \$(1)/etc/99-distfeeds.conf\n" $emortal_def_dir/Makefile
        
        # 修改默认设置脚本
        sed -i "/exit 0/i\\
[ -f \'/etc/99-distfeeds.conf\' ] && mv \'/etc/99-distfeeds.conf\' \'/etc/opkg/distfeeds.conf\'\n\
sed -ri \'/check_signature/s@^[^#]@#&@\' /etc/opkg.conf\n" $emortal_def_dir/files/99-default-settings
    fi
}

# 更新NSS pbuf性能设置的函数
update_nss_pbuf_performance() {
    local pbuf_path="$BUILD_DIR/package/kernel/mac80211/files/pbuf.uci"
    if [ -d "$(dirname "$pbuf_path")" ] && [ -f $pbuf_path ]; then
        sed -i "s/auto_scale '1'/auto_scale 'off'/g" $pbuf_path
        sed -i "s/scaling_governor 'performance'/scaling_governor 'schedutil'/g" $pbuf_path
        # 调整网络缓冲区的性能参数
    fi
}

# 设置构建签名的函数
set_build_signature() {
    local file="$BUILD_DIR/feeds/luci/modules/luci-mod-status/htdocs/luci-static/resources/view/status/include/10_system.js"
    if [ -d "$(dirname "$file")" ] && [ -f $file ]; then
        sed -i "s/(\(luciversion || ''\))/(\1) + (' \/ build by ZqinKing')/g" "$file"
        # 在系统状态页面添加构建者签名
    fi
}

# 更新NSS诊断脚本的函数
update_nss_diag() {
    local file="$BUILD_DIR/package/kernel/mac80211/files/nss_diag.sh"
    if [ -d "$(dirname "$file")" ] && [ -f "$file" ]; then
        \rm -f "$file"
        install -Dm755 "$BASE_PATH/patches/nss_diag.sh" "$file"
        # 替换为自定义的诊断脚本
    fi
}

# 更新菜单位置的函数
update_menu_location() {
    # 修改samba4的菜单位置
    local samba4_path="$BUILD_DIR/feeds/luci/applications/luci-app-samba4/root/usr/share/luci/menu.d/luci-app-samba4.json"
    if [ -d "$(dirname "$samba4_path")" ] && [ -f "$samba4_path" ]; then
        sed -i 's/nas/services/g' "$samba4_path"
        # 将菜单从"nas"移动到"services"下
    fi
    
    # 修改tailscale的菜单位置
    local tailscale_path="$BUILD_DIR/feeds/small8/luci-app-tailscale/root/usr/share/luci/menu.d/luci-app-tailscale.json"
    if [ -d "$(dirname "$tailscale_path")" ] && [ -f "$tailscale_path" ]; then
        sed -i 's/services/vpn/g' "$tailscale_path"
        # 将菜单从"services"移动到"vpn"下
    fi
}

# 修复coremark编译问题的函数
fix_compile_coremark() {
    local file="$BUILD_DIR/feeds/packages/utils/coremark/Makefile"
    if [ -d "$(dirname "$file")" ] && [ -f $file ]; then
        sed -i 's/mkdir \$/mkdir -p \$/g' "$file"
        # 确保创建目录时父目录不存在也能创建
    fi
}

# 更新homeproxy的函数
update_homeproxy() {
    local repo_url="https://github.com/immortalwrt/homeproxy.git"
    local target_dir="$BUILD_DIR/feeds/small8/luci-app-homeproxy"
    
    if [ -d "$target_dir" ]; then
        echo "正在更新 homeproxy..."
        rm -rf "$target_dir"
        # 删除旧目录
        
        # 克隆新版本
        if ! git clone --depth 1 "$repo_url" "$target_dir"; then
            echo "错误：从 $repo_url 克隆 homeproxy 仓库失败" >&2
            exit 1
        fi
    fi
}

# 更新dnsmasq配置的函数
update_dnsmasq_conf() {
    local file="$BUILD_DIR/package/network/services/dnsmasq/files/dhcp.conf"
    if [ -d "$(dirname "$file")" ] && [ -f $file ]; then
        sed -i '/dns_redirect/d' "$file"
        # 移除DNS重定向配置
    fi
}

# 更新软件包版本的通用函数
update_package() {
    local dir=$(find "$BUILD_DIR/package" \( -type d -o -type l \) -name "$1")
    # 查找指定软件包的目录
    
    if [ -z "$dir" ]; then
        return 0
        # 如果找不到目录，直接返回
    fi
    
    local branch="$2"
    if [ -z "$branch" ]; then
        branch="releases"
        # 默认使用releases分支
    fi
    
    local mk_path="$dir/Makefile"
    if [ -f "$mk_path" ]; then
        # 提取仓库信息
        local PKG_REPO=$(grep -oE "^PKG_GIT_URL.*github.com(/[-_a-zA-Z0-9]{1,}){2}" "$mk_path" | awk -F"/" '{print $(NF - 1) "/" $NF}')
        if [ -z "$PKG_REPO" ]; then
            PKG_REPO=$(grep -oE "^PKG_SOURCE_URL.*github.com(/[-_a-zA-Z0-9]{1,}){2}" "$mk_path" | awk -F"/" '{print $(NF - 1) "/" $NF}')
            if [ -z "$PKG_REPO" ]; then
                echo "错误：无法从 $mk_path 提取 PKG_REPO" >&2
                return 1
            fi
        fi
        
        # 获取版本信息
        local PKG_VER
        if ! PKG_VER=$(curl -fsSL "https://api.github.com/repos/$PKG_REPO/$branch" | jq -r '.[0] | .tag_name // .name'); then
            echo "错误：从 https://api.github.com/repos/$PKG_REPO/$branch 获取版本信息失败" >&2
            return 1
        fi
        
        if [ -n "$3" ]; then
            PKG_VER="$3"
            # 如果指定了版本，使用指定版本
        fi
        
        # 获取提交哈希
        local COMMIT_SHA
        if ! COMMIT_SHA=$(curl -fsSL "https://api.github.com/repos/$PKG_REPO/tags" | jq -r '.[] | select(.name=="'$PKG_VER'") | .commit.sha' | cut -c1-7); then
            echo "错误：从 https://api.github.com/repos/$PKG_REPO/tags 获取提交哈希失败" >&2
            return 1
        fi
        
        if [ -n "$COMMIT_SHA" ]; then
            sed -i 's/^PKG_GIT_SHORT_COMMIT:=.*/PKG_GIT_SHORT_COMMIT:='$COMMIT_SHA'/g' "$mk_path"
            # 更新提交哈希
        fi
        
        PKG_VER=$(echo "$PKG_VER" | grep -oE "[\.0-9]{1,}")
        # 提取版本号中的数字部分
        
        # 获取其他信息
        local PKG_NAME=$(awk -F"=" '/PKG_NAME:=/ {print $NF}' "$mk_path" | grep -oE "[-_:/\$\(\)\?\.a-zA-Z0-9]{1,}")
        local PKG_SOURCE=$(awk -F"=" '/PKG_SOURCE:=/ {print $NF}' "$mk_path" | grep -oE "[-_:/\$\(\)\?\.a-zA-Z0-9]{1,}")
        local PKG_SOURCE_URL=$(awk -F"=" '/PKG_SOURCE_URL:=/ {print $NF}' "$mk_path" | grep -oE "[-_:/\$\(\)\{\}\?\.a-zA-Z0-9]{1,}")
        local PKG_GIT_URL=$(awk -F"=" '/PKG_GIT_URL:=/ {print $NF}' "$mk_path")
        local PKG_GIT_REF=$(awk -F"=" '/PKG_GIT_REF:=/ {print $NF}' "$mk_path")
        
        # 替换变量
        PKG_SOURCE_URL=${PKG_SOURCE_URL//\$\(PKG_GIT_URL\)/$PKG_GIT_URL}
        PKG_SOURCE_URL=${PKG_SOURCE_URL//\$\(PKG_GIT_REF\)/$PKG_GIT_REF}
        PKG_SOURCE_URL=${PKG_SOURCE_URL//\$\(PKG_NAME\)/$PKG_NAME}
        PKG_SOURCE_URL=$(echo "$PKG_SOURCE_URL" | sed "s/\${PKG_VERSION}/$PKG_VER/g; s/\$(PKG_VERSION)/$PKG_VER/g")
        PKG_SOURCE=${PKG_SOURCE//\$\(PKG_NAME\)/$PKG_NAME}
        PKG_SOURCE=${PKG_SOURCE//\$\(PKG_VERSION\)/$PKG_VER}
        
        # 计算文件哈希
        local PKG_HASH
        if ! PKG_HASH=$(curl -fsSL "$PKG_SOURCE_URL""$PKG_SOURCE" | sha256sum | cut -b -64); then
            echo "错误：从 $PKG_SOURCE_URL$PKG_SOURCE 获取软件包哈希失败" >&2
            return 1
        fi
        
        # 更新Makefile
        sed -i 's/^PKG_VERSION:=.*/PKG_VERSION:='$PKG_VER'/g' "$mk_path"
        sed -i 's/^PKG_HASH:=.*/PKG_HASH:='$PKG_HASH'/g' "$mk_path"
        
        echo "更新软件包 $1 到 $PKG_VER $PKG_HASH"
    fi
}

# 添加系统升级时的备份信息的函数
function add_backup_info_to_sysupgrade() {
    local conf_path="$BUILD_DIR/package/base-files/files/etc/sysupgrade.conf"
    
    if [ -f "$conf_path" ]; then
        cat >"$conf_path" <<'EOF'
/etc/AdGuardHome.yaml
/etc/easytier
/etc/lucky/
EOF
        # 添加这些目录和文件到系统升级时的备份列表
    fi
}

# 更新启动顺序的函数
function update_script_priority() {
    # 更新qca-nss驱动的启动顺序
    local qca_drv_path="$BUILD_DIR/package/feeds/nss_packages/qca-nss-drv/files/qca-nss-drv.init"
    if [ -d "${qca_drv_path%/*}" ] && [ -f "$qca_drv_path" ]; then
        sed -i 's/START=.*/START=88/g' "$qca_drv_path"
        # 设置启动顺序为88
    fi
    
    # 更新pbuf服务的启动顺序
    local pbuf_path="$BUILD_DIR/package/kernel/mac80211/files/qca-nss-pbuf.init"
    if [ -d "${pbuf_path%/*}" ] && [ -f "$pbuf_path" ]; then
        sed -i 's/START=.*/START=89/g' "$pbuf_path"
        # 设置启动顺序为89
    fi
    
    # 更新mosdns服务的启动顺序
    local mosdns_path="$BUILD_DIR/package/feeds/small8/luci-app-mosdns/root/etc/init.d/mosdns"
    if [ -d "${mosdns_path%/*}" ] && [ -f "$mosdns_path" ]; then
        sed -i 's/START=.*/START=94/g' "$mosdns_path"
        # 设置启动顺序为94
    fi
}

# 更新mosdns默认配置的函数
update_mosdns_deconfig() {
    local mosdns_conf="$BUILD_DIR/feeds/small8/luci-app-mosdns/root/etc/config/mosdns"
    if [ -d "${mosdns_conf%/*}" ] && [ -f "$mosdns_conf" ]; then
        sed -i 's/8000/300/g' "$mosdns_conf"
        sed -i 's/5335/5336/g' "$mosdns_conf"
        # 修改默认端口
    fi
}

# 修复quickstart的函数
fix_quickstart() {
    local file_path="$BUILD_DIR/feeds/small8/luci-app-quickstart/luasrc/controller/istore_backend.lua"
    local url="https://gist.githubusercontent.com/puteulanus/1c180fae6bccd25e57eb6d30b7aa28aa/raw/istore_backend.lua"
    
    # 下载新的文件并覆盖
    if [ -f "$file_path" ]; then
        echo "正在修复 quickstart..."
        if ! curl -fsSL -o "$file_path" "$url"; then
            echo "错误：从 $url 下载 istore_backend.lua 失败" >&2
            exit 1
        fi
    fi
}

# 更新oaf配置的函数
update_oaf_deconfig() {
    local conf_path="$BUILD_DIR/feeds/small8/open-app-filter/files/appfilter.config"
    local uci_def="$BUILD_DIR/feeds/small8/luci-app-oaf/root/etc/uci-defaults/94_feature_3.0"
    local disable_path="$BUILD_DIR/feeds/small8/luci-app-oaf/root/etc/uci-defaults/99_disable_oaf"
    
    if [ -d "${conf_path%/*}" ] && [ -f "$conf_path" ]; then
        sed -i \
            -e "s/record_enable '1'/record_enable '0'/g" \
            -e "s/disable_hnat '1'/disable_hnat '0'/g" \
            -e "s/auto_load_engine '1'/auto_load_engine '0'/g" \
            "$conf_path"
        # 禁用一些功能
    fi
    
    if [ -d "${uci_def%/*}" ] && [ -f "$uci_def" ]; then
        sed -i '/\(disable_hnat\|auto_load_engine\)/d' "$uci_def"
        # 移除相关配置
        
        # 创建禁用脚本
        cat >"$disable_path" <<-EOF
#!/bin/sh
[ "\$(uci get appfilter.global.enable 2>/dev/null)" = "0" ] && {
    /etc/init.d/appfilter disable
    /etc/init.d/appfilter stop
}
EOF
        chmod +x "$disable_path"
    fi
}

# 支持防火墙4的AdGuardHome的函数
support_fw4_adg() {
    local src_path="$BASE_PATH/patches/AdGuardHome"
    local dst_path="$BUILD_DIR/package/feeds/small8/luci-app-adguardhome/root/etc/init.d/AdGuardHome"
    
    if [ -f "$src_path" ] && [ -d "${dst_path%/*}" ] && [ -f "$dst_path" ]; then
        install -Dm 755 "$src_path" "$dst_path"
        echo "已更新AdGuardHome启动脚本"
    fi
}

# 添加时间控制应用的函数
add_timecontrol() {
    local timecontrol_dir="$BUILD_DIR/package/luci-app-timecontrol"
    local repo_url="https://github.com/sirpdboy/luci-app-timecontrol.git"
    
    rm -rf "$timecontrol_dir" 2>/dev/null
    echo "正在添加 luci-app-timecontrol..."
    
    if ! git clone --depth 1 "$repo_url" "$timecontrol_dir"; then
        echo "错误：从 $repo_url 克隆 luci-app-timecontrol 仓库失败" >&2
        exit 1
    fi
}

# 添加gecoosac应用的函数
add_gecoosac() {
    local gecoosac_dir="$BUILD_DIR/package/openwrt-gecoosac"
    local repo_url="https://github.com/lwb1978/openwrt-gecoosac.git"
    
    rm -rf "$gecoosac_dir" 2>/dev/null
    echo "正在添加 openwrt-gecoosac..."
    
    if ! git clone --depth 1 "$repo_url" "$gecoosac_dir"; then
        echo "错误：从 $repo_url 克隆 openwrt-gecoosac 仓库失败" >&2
        exit 1
    fi
}

# 修复easytier的函数
fix_easytier() {
    local easytier_path="$BUILD_DIR/package/feeds/small8/luci-app-easytier/luasrc/model/cbi/easytier.lua"
    if [ -d "${easytier_path%/*}" ] && [ -f "$easytier_path" ]; then
        sed -i 's/util/xml/g' "$easytier_path"
        # 修复模块引用
    fi
}

# 更新geoip数据库的函数
update_geoip() {
    local geodata_path="$BUILD_DIR/package/feeds/small8/v2ray-geodata/Makefile"
    if [ -d "${geodata_path%/*}" ] && [ -f "$geodata_path" ]; then
        local GEOIP_VER=$(awk -F"=" '/GEOIP_VER:=/ {print $NF}' $geodata_path | grep -oE "[0-9]{1,}")
        if [ -n "$GEOIP_VER" ]; then
            local base_url="https://github.com/v2fly/geoip/releases/download/${GEOIP_VER}"
            # 下载校验和
            local old_SHA256
            if ! old_SHA256=$(wget -qO- "$base_url/geoip.dat.sha256sum" | awk '{print $1}'); then
                echo "错误：从 $base_url/geoip.dat.sha256sum 获取旧的 geoip.dat 校验和失败" >&2
                return 1
            fi
            local new_SHA256
            if ! new_SHA256=$(wget -qO- "$base_url/geoip-only-cn-private.dat.sha256sum" | awk '{print $1}'); then
                echo "错误：从 $base_url/geoip-only-cn-private.dat.sha256sum 获取新的 geoip-only-cn-private.dat 校验和失败" >&2
                return 1
            fi
            # 更新Makefile
            if [ -n "$old_SHA256" ] && [ -n "$new_SHA256" ]; then
                if grep -q "$old_SHA256" "$geodata_path"; then
                    sed -i "s|=geoip.dat|=geoip-only-cn-private.dat|g" "$geodata_path"
                    sed -i "s/$old_SHA256/$new_SHA256/g" "$geodata_path"
                fi
            fi
        fi
    fi
}

# 更新lucky工具的函数
update_lucky() {
    # 从补丁文件名中提取版本号
    local version
    version=$(find "$BASE_PATH/patches" -name "lucky_*.tar.gz" -printf "%f\n" | head -n 1 | sed -n 's/^lucky_\(.*\)_Linux.*$/\1/p')
    if [ -z "$version" ]; then
        echo "Warning: 未找到 lucky 补丁文件，跳过更新。" >&2
        return 1
    fi
    
    local makefile_path="$BUILD_DIR/feeds/small8/lucky/Makefile"
    if [ ! -f "$makefile_path" ]; then
        echo "Warning: lucky Makefile not found. Skipping." >&2
        return 1
    fi
    
    echo "正在更新 lucky Makefile..."
    # 使用本地补丁文件
    local patch_line="\\t[ -f \$(TOPDIR)/../patches/lucky_${version}_Linux_\$(LUCKY_ARCH)_wanji.tar.gz ] && install -Dm644 \$(TOPDIR)/../patches/lucky_${version}_Linux_\$(LUCKY_ARCH)_wanji.tar.gz \$(PKG_BUILD_DIR)/\$(PKG_NAME)_\$(PKG_VERSION)_Linux_\$(LUCKY_ARCH).tar.gz"
    
    if grep -q "Build/Prepare" "$makefile_path"; then
        sed -i "/Build\\/Prepare/a\\$patch_line" "$makefile_path"
        sed -i '/wget/d' "$makefile_path"
        echo "lucky Makefile 更新完成。"
    else
        echo "Warning: lucky Makefile 中未找到 'Build/Prepare'。跳过。" >&2
    fi
}

# 修复Rust编译错误的函数
fix_rust_compile_error() {
    if [ -f "$BUILD_DIR/feeds/packages/lang/rust/Makefile" ]; then
        sed -i 's/download-ci-llvm=true/download-ci-llvm=false/g' "$BUILD_DIR/feeds/packages/lang/rust/Makefile"
        # 禁用CI LLVM下载，避免编译错误
    fi
}

# 更新smartdns的函数
update_smartdns() {
    local SMARTDNS_REPO="https://github.com/pymumu/openwrt-smartdns.git"
    local SMARTDNS_DIR="$BUILD_DIR/feeds/packages/net/smartdns"
    local LUCI_APP_SMARTDNS_REPO="https://github.com/pymumu/luci-app-smartdns.git"
    local LUCI_APP_SMARTDNS_DIR="$BUILD_DIR/feeds/luci/applications/luci-app-smartdns"
    
    echo "正在更新 smartdns..."
    rm -rf "$SMARTDNS_DIR"
    if ! git clone --depth=1 "$SMARTDNS_REPO" "$SMARTDNS_DIR"; then
        echo "错误：从 $SMARTDNS_REPO 克隆 smartdns 仓库失败" >&2
        exit 1
    fi
    
    install -Dm644 "$BASE_PATH/patches/100-smartdns-optimize.patch" "$SMARTDNS_DIR/patches/100-smartdns-optimize.patch"
    sed -i '/define Build\/Compile\/smartdns-ui/,/endef/s/CC=\$(TARGET_CC)/CC="\$(TARGET_CC_NOCACHE)"/' "$SMARTDNS_DIR/Makefile"
    
    echo "正在更新 luci-app-smartdns..."
    rm -rf "$LUCI_APP_SMARTDNS_DIR"
    if ! git clone --depth=1 "$LUCI_APP_SMARTDNS_REPO" "$LUCI_APP_SMARTDNS_DIR"; then
        echo "错误：从 $LUCI_APP_SMARTDNS_REPO 克隆 luci-app-smartdns 仓库失败" >&2
        exit 1
    fi
}

# 更新diskman磁盘管理工具的函数
update_diskman() {
    local path="$BUILD_DIR/feeds/luci/applications/luci-app-diskman"
    local repo_url="https://github.com/lisaac/luci-app-diskman.git"
    if [ -d "$path" ]; then
        echo "正在更新 diskman..."
        cd "$BUILD_DIR/feeds/luci/applications" || return
        \rm -rf "luci-app-diskman"
        
        if ! git clone --filter=blob:none --no-checkout "$repo_url" diskman; then
            echo "错误：从 $repo_url 克隆 diskman 仓库失败" >&2
            exit 1
        fi
        cd diskman || return
        
        git sparse-checkout init --cone
        git sparse-checkout set applications/luci-app-diskman || return
        git checkout --quiet
        
        mv applications/luci-app-diskman ../luci-app-diskman || return
        cd .. || return
        \rm -rf diskman
        cd "$BUILD_DIR"
        
        sed -i 's/fs-ntfs /fs-ntfs3 /g' "$path/Makefile"
        sed -i '/ntfs-3g-utils /d' "$path/Makefile"
    fi
}

# 添加quickfile快速文件共享的函数
add_quickfile() {
    local repo_url="https://github.com/sbwml/luci-app-quickfile.git"
    local target_dir="$BUILD_DIR/package/emortal/quickfile"
    if [ -d "$target_dir" ]; then
        rm -rf "$target_dir"
    fi
    echo "正在添加 luci-app-quickfile..."
    if ! git clone --depth 1 "$repo_url" "$target_dir"; then
        echo "错误：从 $repo_url 克隆 luci-app-quickfile 仓库失败" >&2
        exit 1
    fi
    
    local makefile_path="$target_dir/quickfile/Makefile"
    if [ -f "$makefile_path" ]; then
        sed -i '/\t\$(INSTALL_BIN) \$(PKG_BUILD_DIR)\/quickfile-\$(ARCH_PACKAGES)/c\
\tif [ "\$(ARCH_PACKAGES)" = "x86_64" ]; then \\\
\t\t\$(INSTALL_BIN) \$(PKG_BUILD_DIR)\/quickfile-x86_64 \$(1)\/usr\/bin\/quickfile; \\\
\telse \\\
\t\t\$(INSTALL_BIN) \$(PKG_BUILD_DIR)\/quickfile-aarch64_generic \$(1)\/usr\/bin\/quickfile; \\\
\tfi' "$makefile_path"
    fi
}

# 设置Nginx默认配置的函数
set_nginx_default_config() {
    local nginx_config_path="$BUILD_DIR/feeds/packages/net/nginx-util/files/nginx.config"
    if [ -f "$nginx_config_path" ]; then
        cat > "$nginx_config_path" <<EOF
config main 'global'
        option uci_enable 'true'

config server '_lan'
        list listen '443 ssl default_server'
        list listen '[::]:443 ssl default_server'
        option server_name '_lan'
        list include 'restrict_locally'
        list include 'conf.d/*.locations'
        option uci_manage_ssl 'self-signed'
        option ssl_certificate '/etc/nginx/conf.d/_lan.crt'
        option ssl_certificate_key '/etc/nginx/conf.d/_lan.key'
        option ssl_session_cache 'shared:SSL:32k'
        option ssl_session_timeout '64m'
        option access_log 'off; # logd openwrt'

config server 'http_only'
        list listen '80'
        list listen '[::]:80'
        option server_name 'http_only'
        list include 'conf.d/*.locations'
        option access_log 'off; # logd openwrt'
EOF
    fi
    
    local nginx_template="$BUILD_DIR/feeds/packages/net/nginx-util/files/uci.conf.template"
    if [ -f "$nginx_template" ]; then
        if ! grep -q "client_body_in_file_only clean;" "$nginx_template"; then
            sed -i "/client_max_body_size 128M;/a\\
\tclient_body_in_file_only clean;\\
\tclient_body_temp_path /mnt/tmp;" "$nginx_template"
        fi
    fi
}

# 更新uwsgi内存限制的函数
update_uwsgi_limit_as() {
    local cgi_io_ini="$BUILD_DIR/feeds/packages/net/uwsgi/files-luci-support/luci-cgi_io.ini"
    local webui_ini="$BUILD_DIR/feeds/packages/net/uwsgi/files-luci-support/luci-webui.ini"
    
    if [ -f "$cgi_io_ini" ]; then
        sed -i 's/^limit-as = .*/limit-as = 8192/g' "$cgi_io_ini"
    fi
    
    if [ -f "$webui_ini" ]; then
        sed -i 's/^limit-as = .*/limit-as = 8192/g' "$webui_ini"
    fi
}

# 移除调整过的软件包的函数
remove_tweaked_packages() {
    local target_mk="$BUILD_DIR/include/target.mk"
    if [ -f "$target_mk" ]; then
        if grep -q "^DEFAULT_PACKAGES += \$(DEFAULT_PACKAGES.tweak)" "$target_mk"; then
            sed -i 's/DEFAULT_PACKAGES += $(DEFAULT_PACKAGES.tweak)/# DEFAULT_PACKAGES += $(DEFAULT_PACKAGES.tweak)/g' "$target_mk"
        fi
    fi
}

# 更新argon主题的函数
update_argon() {
    local repo_url="https://github.com/ZqinKing/luci-theme-argon.git"
    local dst_theme_path="$BUILD_DIR/feeds/luci/themes/luci-theme-argon"
    local tmp_dir
    tmp_dir=$(mktemp -d)
    
    echo "正在更新 argon 主题..."
    
    if ! git clone --depth 1 "$repo_url" "$tmp_dir"; then
        echo "错误：从 $repo_url 克隆 argon 主题仓库失败" >&2
        rm -rf "$tmp_dir"
        exit 1
    fi
    
    rm -rf "$dst_theme_path"
    rm -rf "$tmp_dir/.git"
    mv "$tmp_dir" "$dst_theme_path"
    
    echo "luci-theme-argon 更新完成"
}

# 主函数，执行所有构建前的准备工作
main() {
    clone_repo              # 克隆代码仓库
    clean_up                # 清理构建环境
    reset_feeds_conf        # 重置软件源配置
    update_feeds            # 更新软件源
    remove_unwanted_packages # 移除不需要的软件包
    remove_tweaked_packages # 移除调整过的软件包
    update_homeproxy        # 更新homeproxy代理工具
    fix_default_set         # 修复默认设置
    fix_miniupnpd           # 修复miniupnpd
    update_golang           # 更新Go语言支持
    change_dnsmasq2full     # 替换dnsmasq为full版本
    fix_mk_def_depends      # 修复依赖关系
    add_wifi_default_set    # 添加WiFi默认设置
    update_default_lan_addr # 更新默认LAN地址
    remove_something_nss_kmod # 移除NSS相关模块
    update_affinity_script  # 更新CPU亲和性脚本
    update_ath11k_fw       # 更新ath11k固件
    change_cpuusage         # 修改CPU使用率显示
    update_tcping           # 更新tcping工具
    add_ax6600_led          # 添加AX6600 LED控制
    set_custom_task         # 设置自定义任务
    apply_passwall_tweaks   # 应用Passwall调整
    install_opkg_distfeeds  # 安装软件源配置
    update_nss_pbuf_performance # 更新NSS性能设置
    set_build_signature     # 设置构建签名
    update_nss_diag         # 更新NSS诊断脚本
    update_menu_location    # 更新菜单位置
    fix_compile_coremark    # 修复coremark编译
    update_dnsmasq_conf     # 更新dnsmasq配置
    add_backup_info_to_sysupgrade # 添加备份信息
    update_mosdns_deconfig  # 更新mosdns配置
    fix_quickstart          # 修复quickstart
    update_oaf_deconfig     # 更新oaf配置
    add_timecontrol         # 添加时间控制
    add_gecoosac            # 添加gecoosac
    add_quickfile           # 添加quickfile
    update_lucky            # 更新lucky工具
    fix_rust_compile_error  # 修复Rust编译错误
    update_smartdns         # 更新smartdns
    update_diskman          # 更新diskman
    set_nginx_default_config # 设置Nginx默认配置
    update_uwsgi_limit_as   # 更新uwsgi内存限制
    update_argon            # 更新argon主题
    install_feeds           # 安装所有软件源
    support_fw4_adg         # 支持防火墙4的AdGuardHome
    update_script_priority  # 更新启动顺序
    fix_easytier            # 修复easytier
    update_geoip            # 更新geoip数据库
    update_package "runc" "releases" "v1.2.6"  # 更新runc容器工具
    update_package "containerd" "releases" "v1.7.27"  # 更新containerd
    update_package "docker" "tags" "v28.2.2"  # 更新docker
    update_package "dockerd" "releases" "v28.2.2"  # 更新dockerd
    apply_hash_fixes        # 应用哈希值修正
}

# 执行主函数
main "$@"
