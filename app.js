// 尝试加载本地配置（config.js 在 .gitignore 里，不会提交到 Git）
let localConfig = {};
try {
  localConfig = require('./config.js');
} catch (e) {
  // config.js 不存在，使用占位符
}

App({
  globalData: {
    /* ==========================================================
       ⚠️  重要：请先申请以下两个 API Key，然后替换下方值！
       ========================================================== */

    // 1️⃣ 腾讯位置服务 Key（用于地图、路线规划、导航）
    //    申请教程见 /setup-guide.html 或 README.md
    //    申请地址：https://lbs.qq.com/dev/console/application/mine
    TENCENT_MAP_KEY: localConfig.TENCENT_MAP_KEY || 'YOUR_TENCENT_MAP_KEY',

    // 2️⃣ 和风天气 Key（用于实时天气 + 3天预报）
    //    申请教程见 /setup-guide.html 或 README.md
    //    申请地址：https://dev.qweather.com/
    QWEATHER_KEY: localConfig.QWEATHER_KEY || 'YOUR_QWEATHER_KEY',

    /* ==========================================================
       配置方法：
       1. 复制 config.example.js 为 config.js
       2. 在 config.js 中填入你的 Key
       3. config.js 不会提交到 Git（已在 .gitignore 中）
       ========================================================== */

    // 当前行程状态
    city: null,
    days: 2,
    styles: ['美食', '景点'],
    pace: 'normal',
    itinerary: [],
    done: [],
    isCustomCity: false,
    customCityName: '',
    weather: null,
    location: null
  },

  onLaunch() {
    // 检查位置权限
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            fail: () => {
              wx.showModal({
                title: '需要位置权限',
                content: '获取天气和导航需要您的位置信息',
                showCancel: false
              });
            }
          });
        }
      }
    });
  }
});
