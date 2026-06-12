const cityDataUtil = require('../../utils/cityData.js');
const weatherUtil = require('../../utils/weather.js');
const app = getApp();

const CITIES = [
  { name: '上海', emoji: '🏙️' },
  { name: '北京', emoji: '🏛️' },
  { name: '杭州', emoji: '🌿' },
  { name: '成都', emoji: '🐼' },
  { name: '西安', emoji: '🏯' },
  { name: '重庆', emoji: '🌶️' },
  { name: '厦门', emoji: '🏖️' },
  { name: '南京', emoji: '🌸' }
];

const STYLE_TAGS = [
  { val: '美食', label: '🍜 美食探店' },
  { val: '景点', label: '📸 打卡景点' },
  { val: '文化', label: '🎭 文化体验' },
  { val: '购物', label: '🛍️ 购物逛街' },
  { val: '自然', label: '🏔️ 自然风光' },
  { val: '夜生活', label: '🌙 夜生活' }
];

Page({
  data: {
    cities: CITIES,
    selectedCity: null,
    isCustomCity: false,
    customCityName: '',
    customSpots: [],
    days: 2,
    pace: 'normal',
    styles: ['美食', '景点'],
    styleTags: STYLE_TAGS,
    showCustomForm: false,
    generating: false
  },

  onLoad() {
    // 如果有缓存的行程，提示继续或新建
    const cached = wx.getStorageSync('travel_state');
    if (cached && cached.city) {
      wx.showModal({
        title: '已有行程',
        content: `检测到 ${cached.city} 的行程，是否继续？`,
        confirmText: '继续',
        cancelText: '新建',
        success: (res) => {
          if (res.confirm) {
            app.globalData = { ...app.globalData, ...cached };
            wx.switchTab({ url: '/pages/plan/plan' });
          } else {
            wx.removeStorageSync('travel_state');
          }
        }
      });
    }
  },

  selectCity(e) {
    const city = e.currentTarget.dataset.city;
    if (city === '__custom__') {
      this.setData({
        selectedCity: '__custom__',
        isCustomCity: true,
        showCustomForm: true
      });
      if (this.data.customSpots.length === 0) {
        this.addCustomSpot();
      }
    } else {
      this.setData({
        selectedCity: city,
        isCustomCity: false,
        showCustomForm: false
      });
    }
  },

  onDaysChange(e) {
    this.setData({ days: parseInt(e.detail.value) + 1 });
  },

  onPaceChange(e) {
    const paceMap = ['relaxed', 'normal', 'intense'];
    this.setData({ pace: paceMap[e.detail.value] });
  },

  toggleStyle(e) {
    const val = e.currentTarget.dataset.val;
    const styles = [...this.data.styles];
    const idx = styles.indexOf(val);
    if (idx > -1) {
      if (styles.length > 1) styles.splice(idx, 1);
    } else {
      styles.push(val);
    }
    this.setData({ styles });
  },

  onCustomCityInput(e) {
    this.setData({ customCityName: e.detail.value });
  },

  addCustomSpot() {
    const spots = [...this.data.customSpots];
    spots.push({ name: '', type: '景点', desc: '', time: '09:00', duration: 60 });
    this.setData({ customSpots: spots });
  },

  removeCustomSpot(e) {
    const idx = e.currentTarget.dataset.idx;
    const spots = [...this.data.customSpots];
    spots.splice(idx, 1);
    this.setData({ customSpots: spots });
  },

  onSpotInput(e) {
    const { idx, field } = e.currentTarget.dataset;
    const spots = [...this.data.customSpots];
    spots[idx][field] = e.detail.value;
    this.setData({ customSpots: spots });
  },

  onSpotTypeChange(e) {
    const idx = e.currentTarget.dataset.idx;
    const typeMap = ['景点', '美食', '文化', '购物', '自然', '夜生活'];
    const spots = [...this.data.customSpots];
    spots[idx].type = typeMap[e.detail.value];
    this.setData({ customSpots: spots });
  },

  async generatePlan() {
    const { selectedCity, isCustomCity, customCityName, customSpots, days, pace, styles } = this.data;

    if (!selectedCity) {
      wx.showToast({ title: '请选择目的地', icon: 'none' });
      return;
    }

    let city = selectedCity;
    let finalSpots = [];

    if (isCustomCity) {
      if (!customCityName.trim()) {
        wx.showToast({ title: '请输入城市名称', icon: 'none' });
        return;
      }
      finalSpots = customSpots.filter(s => s.name.trim()).map(s => ({
        ...s,
        tags: [s.type],
        duration: parseInt(s.duration) || 60
      }));
      if (finalSpots.length === 0) {
        wx.showToast({ title: '请至少添加一个打卡点', icon: 'none' });
        return;
      }
      city = customCityName.trim();
    }

    this.setData({ generating: true });

    try {
      // 1. 生成基础行程
      let itinerary = cityDataUtil.generateItinerary(
        isCustomCity ? null : city,
        days,
        styles,
        pace,
        isCustomCity ? finalSpots : null
      );

      // 2. 获取天气并调整行程
      let weather = null;
      let isRainy = false;
      try {
        weather = await weatherUtil.getWeather(city);
        isRainy = weather.isRainy;
        if (isRainy) {
          itinerary = cityDataUtil.adjustForWeather(itinerary, true);
        }
      } catch (err) {
        console.log('天气获取失败（未配置Key或网络问题），使用默认行程:', err.message || err);
      }

      // 3. 保存到全局和本地存储
      const state = {
        city,
        days,
        styles,
        pace,
        itinerary,
        done: [],
        isCustomCity,
        customCityName: isCustomCity ? customCityName : '',
        weather,
        isRainy
      };
      app.globalData = { ...app.globalData, ...state };
      wx.setStorageSync('travel_state', state);

      wx.showToast({ title: `已生成${city}行程`, icon: 'success' });
      setTimeout(() => {
        wx.switchTab({ url: '/pages/plan/plan' });
      }, 500);

    } catch (err) {
      wx.showToast({ title: err.message || '生成失败', icon: 'none' });
    } finally {
      this.setData({ generating: false });
    }
  }
});
