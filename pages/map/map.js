const app = getApp();
const mapUtil = require('../../utils/map.js');

Page({
  data: {
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    markers: [],
    scale: 15
  },

  onLoad(options) {
    const { name, lat, lng } = options;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    this.setData({
      name: decodeURIComponent(name),
      address: decodeURIComponent(name),
      latitude,
      longitude,
      markers: [{
        id: 1,
        latitude,
        longitude,
        title: decodeURIComponent(name),
        iconPath: '',
        width: 30,
        height: 30
      }]
    });
  },

  // 放大地图
  zoomIn() {
    const scale = Math.min(this.data.scale + 2, 20);
    this.setData({ scale });
  },

  // 缩小地图
  zoomOut() {
    const scale = Math.max(this.data.scale - 2, 3);
    this.setData({ scale });
  },

  // 回到当前位置
  moveToLocation() {
    const mapCtx = wx.createMapContext('spotMap');
    mapCtx.moveToLocation();
  },

  // 开始导航 - 先规划路线再确认
  async startNavigate() {
    const { name, latitude, longitude } = this.data;

    wx.showLoading({ title: '规划中...' });
    try {
      const current = await mapUtil.getCurrentLocation();
      const route = await mapUtil.planRoute(
        { latitude: current.latitude, longitude: current.longitude },
        { latitude, longitude }
      );
      wx.hideLoading();

      wx.showModal({
        title: `前往 ${name}`,
        content: `距离 ${mapUtil.formatDistance(route.distance)}，预计 ${mapUtil.formatDuration(route.duration)}`,
        confirmText: '开始导航',
        success: (res) => {
          if (res.confirm) {
            // 使用 wx.openLocation 唤起地图（真机上导航可用）
            wx.openLocation({
              latitude,
              longitude,
              name,
              address: name,
              scale: 16
            });
          }
        }
      });
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '导航提示',
        content: `前往「${name}」\n坐标：${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        confirmText: '打开地图',
        success: (res) => {
          if (res.confirm) {
            wx.openLocation({ latitude, longitude, name, address: name, scale: 16 });
          }
        }
      });
    }
  },

  // 分享给同行人
  onShareAppMessage() {
    const { name, latitude, longitude } = this.data;
    return {
      title: `📍 ${name} - 在这里等你！`,
      path: `/pages/map/map?name=${encodeURIComponent(name)}&lat=${latitude}&lng=${longitude}`
    };
  }
});
