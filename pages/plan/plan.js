const app = getApp();
const mapUtil = require('../../utils/map.js');
const cityDataUtil = require('../../utils/cityData.js');

Page({
  data: {
    city: '',
    days: 2,
    pace: '',
    styles: [],
    itinerary: [],
    done: [],
    activeDay: 0,
    hasPlan: false,
    isRainy: false,
    weather: null
  },

  onShow() {
    this.loadPlan();
  },

  loadPlan() {
    const g = app.globalData;
    if (!g.city || !g.itinerary || g.itinerary.length === 0) {
      this.setData({ hasPlan: false });
      return;
    }

    const paceMap = { relaxed: '佛系漫游', normal: '标准特种兵', intense: '极限挑战' };
    this.setData({
      city: g.city,
      days: g.days,
      pace: paceMap[g.pace] || g.pace,
      styles: g.styles,
      itinerary: g.itinerary,
      done: g.done || [],
      activeDay: 0,
      hasPlan: true,
      isRainy: g.isRainy || false,
      weather: g.weather
    });
  },

  switchDay(e) {
    this.setData({ activeDay: parseInt(e.currentTarget.dataset.day) });
  },

  toggleDone(e) {
    const { day, name } = e.currentTarget.dataset;
    const key = `${day}-${name}`;
    const done = [...this.data.done];
    const idx = done.indexOf(key);

    if (idx > -1) {
      done.splice(idx, 1);
    } else {
      done.push(key);
    }

    this.setData({ done });
    app.globalData.done = done;
    wx.setStorageSync('travel_state', app.globalData);

    if (idx === -1) {
      wx.showToast({ title: `已打卡：${name}`, icon: 'success' });
    }
  },

  openMap(e) {
    const { lat, lng, name } = e.currentTarget.dataset;
    if (!lat || !lng) {
      wx.showToast({ title: '暂无位置信息', icon: 'none' });
      return;
    }
    // 跳转到自定义地图页面，避免 wx.openLocation 的"去这里"在模拟器报错
    wx.navigateTo({
      url: `/pages/map/map?name=${encodeURIComponent(name)}&lat=${lat}&lng=${lng}`
    });
  },

  async navigateToSpot(e) {
    const { lat, lng, name } = e.currentTarget.dataset;
    if (!lat || !lng) {
      wx.showToast({ title: '暂无位置信息', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '规划中...' });
    try {
      const current = await mapUtil.getCurrentLocation();
      const route = await mapUtil.planRoute(
        { latitude: current.latitude, longitude: current.longitude },
        { latitude: parseFloat(lat), longitude: parseFloat(lng) }
      );
      wx.hideLoading();

      wx.showModal({
        title: `前往 ${name}`,
        content: `距离 ${mapUtil.formatDistance(route.distance)}，预计 ${mapUtil.formatDuration(route.duration)}`,
        confirmText: '开始导航',
        success: (res) => {
          if (res.confirm) {
            mapUtil.openNavigation(name, parseFloat(lat), parseFloat(lng));
          }
        }
      });
    } catch (err) {
      wx.hideLoading();
      // 如果路线规划失败，直接打开地图
      mapUtil.openNavigation(name, parseFloat(lat), parseFloat(lng));
    }
  },

  goToSetup() {
    wx.navigateTo({ url: '/pages/index/index' });
  },

  onShareAppMessage() {
    return {
      title: `${this.data.city} ${this.data.days}天特种兵行程`,
      path: '/pages/plan/plan'
    };
  }
});
