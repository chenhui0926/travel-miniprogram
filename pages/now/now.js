const app = getApp();
const mapUtil = require('../../utils/map.js');

Page({
  data: {
    hasPlan: false,
    city: '',
    days: 2,
    done: [],
    total: 0,
    doneCount: 0,
    percent: 0,
    progressMsg: '',
    currentSpot: null,
    nextSpots: [],
    itinerary: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const g = app.globalData;
    if (!g.city || !g.itinerary) {
      this.setData({ hasPlan: false });
      return;
    }

    let total = 0, doneCount = 0;
    for (let d = 0; d < g.itinerary.length; d++) {
      for (const spot of g.itinerary[d]) {
        total++;
        if ((g.done || []).includes(`${d}-${spot.name}`)) doneCount++;
      }
    }

    const percent = total ? Math.round(doneCount / total * 100) : 0;
    const messages = [
      '还没开始，特种兵要行动起来了！',
      '起步了，继续冲！',
      '完成一半了，加油！',
      '大部分完成了，最后冲刺！',
      '全部打卡！你是真正的特种兵！'
    ];

    // 找到当前位置
    let currentDay = -1, currentSpot = null, currentIdx = -1;
    for (let d = 0; d < g.itinerary.length; d++) {
      for (let i = 0; i < g.itinerary[d].length; i++) {
        if ((g.done || []).includes(`${d}-${g.itinerary[d][i].name}`)) {
          currentDay = d;
          currentSpot = g.itinerary[d][i];
          currentIdx = i;
        }
      }
    }

    // 下一步建议
    const nextSpots = [];
    if (currentDay >= 0) {
      for (let i = currentIdx + 1; i < g.itinerary[currentDay].length; i++) {
        const s = g.itinerary[currentDay][i];
        if (!(g.done || []).includes(`${currentDay}-${s.name}`)) {
          nextSpots.push({ ...s, day: currentDay, idx: i, reason: '今日行程下一个点' });
          break;
        }
      }
    } else if (g.itinerary[0] && g.itinerary[0][0]) {
      nextSpots.push({ ...g.itinerary[0][0], day: 0, idx: 0, reason: '建议从这里开始' });
    }

    if (currentDay >= 0 && nextSpots.length === 0 && currentDay + 1 < g.days) {
      const nextDay = g.itinerary[currentDay + 1];
      if (nextDay && nextDay[0]) {
        nextSpots.push({ ...nextDay[0], day: currentDay + 1, idx: 0, reason: `第${currentDay + 2}天第一站` });
      }
    }

    for (let d = 0; d < g.itinerary.length && nextSpots.length < 2; d++) {
      for (let i = 0; i < g.itinerary[d].length; i++) {
        const s = g.itinerary[d][i];
        if (!(g.done || []).includes(`${d}-${s.name}`) && !nextSpots.some(ns => ns.name === s.name)) {
          nextSpots.push({ ...s, day: d, idx: i, reason: '推荐打卡' });
          break;
        }
      }
    }

    this.setData({
      hasPlan: true,
      city: g.city,
      days: g.days,
      done: g.done || [],
      total,
      doneCount,
      percent,
      progressMsg: messages[Math.min(Math.floor(percent / 25), 4)],
      currentSpot: currentSpot ? { ...currentSpot, day: currentDay, idx: currentIdx } : null,
      nextSpots,
      itinerary: g.itinerary
    });
  },

  quickCheckIn(e) {
    const { day, name } = e.currentTarget.dataset;
    const key = `${day}-${name}`;
    const done = [...this.data.done];
    if (!done.includes(key)) {
      done.push(key);
      app.globalData.done = done;
      wx.setStorageSync('travel_state', app.globalData);
      this.setData({ done });
      wx.showToast({ title: `已打卡：${name}`, icon: 'success' });
      this.loadData();
    }
  },

  goToPlan() {
    wx.switchTab({ url: '/pages/plan/plan' });
  },

  openMap(e) {
    const { lat, lng, name } = e.currentTarget.dataset;
    if (!lat || !lng) {
      wx.showToast({ title: '暂无位置信息', icon: 'none' });
      return;
    }
    mapUtil.openNavigation(name, parseFloat(lat), parseFloat(lng));
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
      mapUtil.openNavigation(name, parseFloat(lat), parseFloat(lng));
    }
  },

  resetPlan() {
    wx.showModal({
      title: '重置行程？',
      content: '这会清空当前所有打卡进度',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('travel_state');
          app.globalData.city = null;
          app.globalData.itinerary = [];
          app.globalData.done = [];
          this.setData({ hasPlan: false });
          wx.showToast({ title: '已重置', icon: 'success' });
        }
      }
    });
  }
});
