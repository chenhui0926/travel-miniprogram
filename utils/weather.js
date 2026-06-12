const app = getApp();

// 和风天气 API（免费版）
// 需要在 https://dev.qweather.com/ 申请 Key
const QWEATHER_BASE = 'https://devapi.qweather.com/v7';

/**
 * 获取城市天气（实时 + 3天预报）
 * @param {string} cityName - 城市名称
 */
function getWeather(cityName) {
  return new Promise((resolve, reject) => {
    const key = app.globalData.QWEATHER_KEY;
    if (!key || key === 'YOUR_QWEATHER_KEY') {
      reject(new Error('请先配置和风天气 API Key'));
      return;
    }

    // Step 1: 通过城市名称获取 Location ID
    wx.request({
      url: `https://geoapi.qweather.com/v2/city/lookup`,
      data: {
        location: cityName,
        key: key,
        adm: 'CN'
      },
      success: (res) => {
        if (res.data.code !== '200' || !res.data.location || res.data.location.length === 0) {
          reject(new Error(`未找到城市: ${cityName}`));
          return;
        }

        const locationId = res.data.location[0].id;
        const locationName = res.data.location[0].name;

        // Step 2: 获取实时天气 + 3天预报（并行）
        Promise.all([
          fetchNowWeather(locationId, key),
          fetchForecast(locationId, key)
        ]).then(([now, forecast]) => {
          resolve({
            city: locationName,
            now: now,
            forecast: forecast,
            isRainy: checkIfRainy(now, forecast)
          });
        }).catch(reject);
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '请求失败'));
      }
    });
  });
}

function fetchNowWeather(locationId, key) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${QWEATHER_BASE}/weather/now`,
      data: { location: locationId, key: key },
      success: (res) => {
        if (res.data.code === '200') {
          resolve(res.data.now);
        } else {
          reject(new Error('获取实时天气失败'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '请求失败'));
      }
    });
  });
}

function fetchForecast(locationId, key) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${QWEATHER_BASE}/weather/3d`,
      data: { location: locationId, key: key },
      success: (res) => {
        if (res.data.code === '200') {
          resolve(res.data.daily);
        } else {
          reject(new Error('获取天气预报失败'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '请求失败'));
      }
    });
  });
}

/**
 * 判断是否为雨天（影响室外景点）
 * 雨天代码：300-399（阵雨/雷阵雨），400-499（雪），其他看具体
 */
function checkIfRainy(now, forecast) {
  const rainCodes = [
    '300','301','302','303','304','305','306','307','308','309',
    '310','311','312','313','314','315','316','317','318','319',
    '320','321','399'
  ];
  const nowCode = now.icon;
  if (rainCodes.includes(nowCode)) return true;

  // 如果未来3天有雨，也提示
  const hasRainInForecast = forecast.some(day => rainCodes.includes(day.iconDay));
  return hasRainInForecast;
}

/**
 * 获取天气图标和描述
 */
function getWeatherInfo(code) {
  const map = {
    '100': { icon: '☀️', desc: '晴' },
    '101': { icon: '⛅', desc: '多云' },
    '102': { icon: '⛅', desc: '少云' },
    '103': { icon: '☁️', desc: '晴间多云' },
    '104': { icon: '☁️', desc: '阴' },
    '150': { icon: '🌙', desc: '晴（夜）' },
    '151': { icon: '☁️', desc: '多云（夜）' },
    '300': { icon: '🌦️', desc: '阵雨' },
    '301': { icon: '⛈️', desc: '强阵雨' },
    '302': { icon: '⛈️', desc: '雷阵雨' },
    '305': { icon: '🌧️', desc: '小雨' },
    '306': { icon: '🌧️', desc: '中雨' },
    '307': { icon: '🌧️', desc: '大雨' },
    '310': { icon: '🌧️', desc: '暴雨' },
    '400': { icon: '🌨️', desc: '小雪' },
    '401': { icon: '🌨️', desc: '中雪' },
    '402': { icon: '❄️', desc: '大雪' },
    '500': { icon: '🌫️', desc: '雾' },
    '501': { icon: '🌫️', desc: '霾' },
    '502': { icon: '🌫️', desc: '浓雾' }
  };
  return map[code] || { icon: '☁️', desc: '多云' };
}

module.exports = {
  getWeather,
  checkIfRainy,
  getWeatherInfo
};
