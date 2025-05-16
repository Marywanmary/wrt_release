自用版本，ZqinKing原有插件予以修改增减。

原插件：  
~~luci-app-adguardhome~~  
~~luci-app-alist~~  
~~luci-app-aria2~~  
luci-app-autoreboot  
~~luci-app-diskman~~  
luci-app-easytier  
luci-app-firewall  
luci-app-homeproxy  
luci-app-istorex  
luci-app-lucky  
~~luci-app-mosdns~~  
luci-app-nikki  
~~luci-app-oaf~~  
luci-app-package-manager  
luci-app-passwall  
luci-app-quickstart  
~~luci-app-samba4~~  
~~luci-app-serverchan~~  
~~luci-app-smartdns~~  
~~luci-app-sqm~~  
luci-app-store  
luci-app-ttyd  
luci-app-upnp  
~~luci-app-vlmcsd~~  
~~luci-app-wol~~  
  
Add:  
luci-app-tailscale  
luci-app-openclash  
luci-app-passwall  


https://openwrt.mpdn.fun/?dir=插件列表

# OpenWrt 插件列表（中英文对照）

## 网络与路由
- **网络向导**：`luci-app-quickstart`  
- **iStore**：`luci-app-store`  
- **实时监控**：`luci-app-netdata`  
- **释放内存**：`luci-app-ramfree`  
- **WireGuard 状态**：`luci-app-wireguard`  
- **ACME 证书**：`luci-app-acme`  
- **自定义命令**：`luci-app-commands`  
- **Web 管理**：`luci-app-webadmin`  
- **TTYD 终端**：`luci-app-ttyd`  
- **磁盘管理**：`luci-app-diskman`  
- **分区扩容**：`luci-app-partexp`  
- **ACL 设置**：`luci-app-acl`  
- **高级设置**：`luci-app-advanced`  
- **定时重启**：`luci-app-autoreboot`  
- **Argon 主题设置**：`luci-app-argon-config`  
- **Design 主题设置**：`luci-app-design-config`  

## 文件与存储
- **文件传输**：`luci-app-filetransfer`  
- **关机管理**：`luci-app-poweroff`  
- **腾讯云 DDNS**：`luci-app-tencentddns`  
- **Docker CE 容器**：`luci-app-docker`  
- **Docker (Dockerman)**：`luci-app-dockerman`  
- **文件管理**：`luci-app-filemanager`  
- **阿里云盘 WebDAV**：`luci-app-aliyundrive-webdav`  
- **Go 阿里云盘 WebDAV**：`luci-app-go-aliyundrive-webdav`  
- **浮动网关**：`luci-app-floatip`  

## 加速与优化
- **ShadowSocksR Plus+**：`luci-app-ssr-plus`  
- **PassWall**：`luci-app-passwall`  
- **PassWall2**：`luci-app-passwall2`  
- **Bypass**：`luci-app-bypass`  
- **HomeProxy**：`luci-app-homeproxy`  
- **Nikki (MihomoTProxy)**：`luci-app-nikki`  
- **Clash (Frainzy1477)**：`luci-app-clash`  
- **OpenClash**：`luci-app-openclash`  
- **Turbo ACC 网络加速**：`luci-app-turboacc`  

## 安全与隐私
- **AdGuard Home**：`luci-app-adguardhome`  
- **广告屏蔽大师 Plus+**：`luci-app-adbyby-plus`  
- **iKoolProxy 滤广告**：`luci-app-ikoolproxy`  
- **UA2F 防检测**：`luci-app-ua2f`  
- **MentoHUST**：`luci-app-mentohust`  
- **MinieAP**：`luci-app-minieap`  

## 多媒体与娱乐
- **AirPlay 2 音频接收器**：`luci-app-airplay2`  
- **音乐遥控中心**：`luci-app-music-remote-center`  
- **可道云**：`luci-app-kodexplorer`  
- **Alist 文件列表**：`luci-app-alist`  
- **CloudDrive2**：`luci-app-clouddrive2`  
- **Cloudreve**：`luci-app-cloudreve`  

## 工具与实用程序
- **蒲公英智能组网**：`luci-app-pgyvpn`  
- **花生壳内网穿透**：`luci-app-phtunnel`  
- **京东签到服务**：`luci-app-jd-dailybonus`  
- **微信推送**：`luci-app-serverchan`  
- **全能推送**：`luci-app-pushbot`  
- **上网时间控制**：`luci-app-accesscontrol`  
- **LXC 容器**：`luci-app-lxc`  
- **NPS 内网穿透**：`luci-app-nps`  
- **ZeroTier**：`luci-app-zerotier`  

## 系统与高级功能
- **Argon 主题**：`luci-theme-argon`  
- **Design 主题**：`luci-theme-design`  
- **Edge 主题**：`luci-theme-edge`  
- **Material 主题**：`luci-theme-material`  
- **动态 DNS (阿里/腾讯)**：`luci-app-ddns`  
- **DNS 过滤器**：`luci-app-dnsfilter`  
- **MQTT 代理**：`luci-app-mosquitto`  
- **IP 限速**：`luci-app-eqos`  
- **应用过滤**：`luci-app-oaf`  

## 其他插件
- **浮窗时钟**：`luci-app-ntpc`  
- **LED 控制**：`luci-app-ledcontrol`  
- **硬件监控**：`luci-app-hwinfo`  
- **SSH 服务**：`luci-app-dropbear`  
- **Telnet 服务**：`luci-app-telnet`  



*************************************************************
首先安装 Linux 系统，推荐 Ubuntu LTS  

安装编译依赖  
sudo apt -y update  
sudo apt -y full-upgrade  
sudo apt install -y dos2unix libfuse-dev  
sudo bash -c 'bash <(curl -sL https://build-scripts.immortalwrt.org/init_build_environment.sh)'  

使用步骤：  
git clone https://github.com/ZqinKing/wrt_release.git  
cd wrt_relese  
  
编译京东云雅典娜(02)、亚瑟(01)、太乙(07)、AX5(JDC版):  
./build.sh jdcloud_ipq60xx_immwrt  
./build.sh jdcloud_ipq60xx_libwrt  
  
编译京东云百里:  
./build.sh jdcloud_ax6000_immwrt  
  
编译阿里云AP8220:  
./build.sh aliyun_ap8220_immwrt  
  
编译红米AX5:  
./build.sh redmi_ax5_immwrt  
  
编译红米AX6:  
./build.sh redmi_ax6_immwrt  
  
编译红米AX6000:  
./build.sh redmi_ax6000_immwrt21  
  
编译CMCC RAX3000M:  
./build.sh cmcc_rax3000m_immwrt  
  
编译N1:  
./build.sh n1_immwrt  
  
编译X64:  
./build.sh x64_immwrt  
  
编译兆能M2:  
./build.sh zn_m2_immwrt  
./build.sh zn_m2_libwrt  
  
三方插件源自：https://github.com/kenzok8/small-package.git  
  
使用OAF（应用过滤）功能前，需先完成以下操作：  
1. 打开系统设置 → 启动项 → 定位到「appfilter」  
2. 将「appfilter」当前状态**从已禁用更改为已启用**  
3. 完成配置后，点击**启动**按钮激活服务  
