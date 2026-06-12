const app = getApp();

/**
 * 打开腾讯地图导航
 * @param {string} name - 目的地名称
 * @param {number} lat - 纬度
 * @param {number} lng - 经度
 */
function openNavigation(name, lat, lng) {
  wx.openLocation({
    latitude: lat,
    longitude: lng,
    name: name,
    address: name,
    scale: 15
  });
}

/**
 * 使用腾讯位置服务进行路线规划
 * 需要在小程序后台添加 request 域名：apis.map.qq.com
 * @param {Object} from - 起点 {latitude, longitude}
 * @param {Object} to - 终点 {latitude, longitude}
 */
function planRoute(from, to) {
  const key = app.globalData.TENCENT_MAP_KEY;
  if (!key || key === 'YOUR_TENCENT_MAP_KEY') {
    wx.showToast({ title: '请先配置地图Key', icon: 'none' });
    return Promise.reject(new Error('未配置腾讯地图Key'));
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/',
      data: {
        key: key,
        from: `${from.latitude},${from.longitude}`,
        to: `${to.latitude},${to.longitude}`,
        policy: 'LEAST_TIME' // 最快路线
      },
      success: (res) => {
        if (res.data.status === 0 && res.data.result.routes.length > 0) {
          const route = res.data.result.routes[0];
          resolve({
            distance: route.distance, // 米
            duration: route.duration, // 秒
            polyline: route.polyline
          });
        } else {
          reject(new Error(res.data.message || '路线规划失败'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '路线规划请求失败'));
      }
    });
  });
}

/**
 * 获取用户当前位置
 */
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: resolve,
      fail: (err) => {
        wx.showModal({
          title: '需要位置权限',
          content: '导航功能需要获取您的位置信息',
          showCancel: false
        });
        reject(err);
      }
    });
  });
}

/**
 * 在小程序地图组件上显示路线
 * @param {Object} route - planRoute 返回的路线数据
 */
function decodePolyline(polyline) {
  const points = [];
  let index = 0, lat = 0, lng = 0;

  while (index < polyline.length) {
    let shift = 0, result = 0;
    do {
      const byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (polyline.charCodeAt(index - 1) >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0; result = 0;
    do {
      const byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (polyline.charCodeAt(index - 1) >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({
      latitude: lat / 1e6,
      longitude: lng / 1e6
    });
  }
  return points;
}

/**
 * 距离格式化
 */
function formatDistance(meters) {
  if (meters < 1000) return `${meters}米`;
  return `${(meters / 1000).toFixed(1)}公里`;
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}秒`;
  if (seconds < 3600) return `${Math.ceil(seconds / 60)}分钟`;
  const h = Math.floor(seconds / 3600);
  const m = Math.ceil((seconds % 3600) / 60);
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
}

module.exports = {
  openNavigation,
  planRoute,
  getCurrentLocation,
  decodePolyline,
  formatDistance,
  formatDuration
};
