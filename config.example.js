# ============================================================
# 特种兵旅游助手 - 配置文件模板
# ============================================================
# 使用方法：
# 1. 复制本文件：cp config.example.js config.js
# 2. 替换下方的 Key 为你自己申请的
# 3. 在 app.js 顶部引入 config.js（已自动处理）
# ============================================================

module.exports = {
  // 腾讯位置服务 Key（用于地图、路线规划、导航）
  // 申请地址：https://lbs.qq.com/dev/console/application/mine
  TENCENT_MAP_KEY: 'YOUR_TENCENT_MAP_KEY',

  // 和风天气 Key（用于实时天气 + 3天预报）
  // 申请地址：https://dev.qweather.com/
  QWEATHER_KEY: 'YOUR_QWEATHER_KEY'
}
