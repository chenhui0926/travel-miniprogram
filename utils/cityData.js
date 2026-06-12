const OUTDOOR_TYPES = ['景点', '自然'];

const cityData = {
  上海: {
    spots: [
      { name: "外滩", type: "景点", desc: "万国建筑群，夜景绝美", time: "07:00", duration: 60, tags: ["景点","夜生活"], lat: 31.2304, lng: 121.4900 },
      { name: "南京路步行街", type: "购物", desc: "中华商业第一街", time: "08:30", duration: 90, tags: ["购物","美食"], lat: 31.2335, lng: 121.4737 },
      { name: "豫园 & 城隍庙", type: "文化", desc: "明代园林，小笼包发源地", time: "10:30", duration: 120, tags: ["文化","美食"], lat: 31.2273, lng: 121.4920 },
      { name: "新天地", type: "美食", desc: "石库门里的时尚街区", time: "13:00", duration: 90, tags: ["美食","购物"], lat: 31.2214, lng: 121.4747 },
      { name: "田子坊", type: "文化", desc: "弄堂里的创意园区", time: "15:00", duration: 90, tags: ["文化","购物"], lat: 31.2115, lng: 121.4668 },
      { name: "陆家嘴三件套", type: "景点", desc: "东方明珠/环球金融中心", time: "17:00", duration: 120, tags: ["景点"], lat: 31.2397, lng: 121.4998 },
      { name: "黄浦江游船", type: "景点", desc: "两岸夜景尽收眼底", time: "19:30", duration: 60, tags: ["景点","夜生活"], lat: 31.2350, lng: 121.4850 },
      { name: "武康路", type: "文化", desc: "网红马路，梧桐洋房", time: "07:30", duration: 90, tags: ["文化","景点"], lat: 31.2100, lng: 121.4370 },
      { name: "上海博物馆", type: "文化", desc: "中国古代艺术宝库", time: "09:30", duration: 120, tags: ["文化"], lat: 31.2283, lng: 121.4453 },
      { name: "淮海中路", type: "购物", desc: "潮流品牌聚集地", time: "12:00", duration: 90, tags: ["购物","美食"], lat: 31.2180, lng: 121.4600 },
      { name: "思南公馆", type: "美食", desc: "花园洋房下午茶", time: "14:00", duration: 90, tags: ["美食","文化"], lat: 31.2150, lng: 121.4650 },
      { name: "1933老场坊", type: "景点", desc: "屠宰场改造的创意空间", time: "16:00", duration: 60, tags: ["景点","文化"], lat: 31.2550, lng: 121.4850 },
      { name: "徐家汇天主堂", type: "文化", desc: "哥特式建筑地标", time: "17:30", duration: 45, tags: ["文化"], lat: 31.1930, lng: 121.4370 },
      { name: "安福路", type: "美食", desc: "文艺咖啡一条街", time: "19:00", duration: 90, tags: ["美食","夜生活"], lat: 31.2150, lng: 121.4450 },
    ]
  },
  北京: {
    spots: [
      { name: "天安门广场", type: "景点", desc: "看升旗仪式", time: "05:00", duration: 60, tags: ["景点"], lat: 39.9055, lng: 116.3976 },
      { name: "故宫博物院", type: "文化", desc: "紫禁城，提前抢票", time: "08:30", duration: 180, tags: ["文化","景点"], lat: 39.9163, lng: 116.3972 },
      { name: "景山公园", type: "景点", desc: "俯瞰故宫全景", time: "12:00", duration: 60, tags: ["景点","自然"], lat: 39.9244, lng: 116.3971 },
      { name: "南锣鼓巷", type: "美食", desc: "老北京胡同小吃", time: "13:30", duration: 90, tags: ["美食","文化"], lat: 39.9372, lng: 116.4033 },
      { name: "什刹海", type: "景点", desc: "胡同+酒吧+荷花", time: "15:30", duration: 120, tags: ["景点","夜生活"], lat: 39.9375, lng: 116.3850 },
      { name: "王府井", type: "购物", desc: "老牌商业街", time: "18:00", duration: 90, tags: ["购物","美食"], lat: 39.9110, lng: 116.4110 },
      { name: "三里屯", type: "夜生活", desc: "潮人夜生活聚集地", time: "20:00", duration: 120, tags: ["夜生活","美食"], lat: 39.9350, lng: 116.4550 },
      { name: "八达岭长城", type: "景点", desc: "不到长城非好汉", time: "07:00", duration: 240, tags: ["景点","自然"], lat: 40.3595, lng: 116.0199 },
      { name: "颐和园", type: "景点", desc: "皇家园林，昆明湖", time: "14:00", duration: 150, tags: ["景点","自然"], lat: 39.9999, lng: 116.2755 },
      { name: "圆明园", type: "文化", desc: "遗址公园，勿忘历史", time: "17:00", duration: 90, tags: ["文化","景点"], lat: 40.0080, lng: 116.2980 },
      { name: "鸟巢 & 水立方", type: "景点", desc: "奥运地标，夜景更佳", time: "19:30", duration: 90, tags: ["景点","夜生活"], lat: 39.9929, lng: 116.3966 },
    ]
  },
  杭州: {
    spots: [
      { name: "西湖断桥", type: "景点", desc: "白娘子传说起点", time: "06:30", duration: 60, tags: ["景点","自然"], lat: 30.2596, lng: 120.1440 },
      { name: "白堤", type: "自然", desc: "桃红柳绿，漫步首选", time: "07:30", duration: 60, tags: ["自然","景点"], lat: 30.2650, lng: 120.1500 },
      { name: "孤山 & 西泠印社", type: "文化", desc: "文人雅士聚集地", time: "09:00", duration: 90, tags: ["文化"], lat: 30.2580, lng: 120.1400 },
      { name: "楼外楼", type: "美食", desc: "西湖醋鱼，百年老店", time: "11:00", duration: 90, tags: ["美食"], lat: 30.2590, lng: 120.1410 },
      { name: "雷峰塔", type: "景点", desc: "登高望西湖", time: "13:00", duration: 60, tags: ["景点"], lat: 30.2310, lng: 120.1490 },
      { name: "三潭印月", type: "景点", desc: "一元纸币背景", time: "14:30", duration: 90, tags: ["景点","自然"], lat: 30.2390, lng: 120.1440 },
      { name: "苏堤春晓", type: "自然", desc: "西湖十景之首", time: "16:30", duration: 60, tags: ["自然","景点"], lat: 30.2350, lng: 120.1300 },
      { name: "河坊街", type: "美食", desc: "南宋御街，小吃天堂", time: "18:00", duration: 120, tags: ["美食","购物"], lat: 30.2430, lng: 120.1680 },
      { name: "灵隐寺", type: "文化", desc: "千年古刹，飞来峰", time: "07:00", duration: 150, tags: ["文化","景点"], lat: 30.2400, lng: 120.1000 },
      { name: "龙井村", type: "自然", desc: "品茶买茶，茶园风光", time: "10:00", duration: 120, tags: ["自然","美食"], lat: 30.2200, lng: 120.1100 },
      { name: "九溪烟树", type: "自然", desc: "溪水竹林，避暑胜地", time: "13:00", duration: 120, tags: ["自然"], lat: 30.2000, lng: 120.1200 },
      { name: "宋城", type: "文化", desc: "宋城千古情演出", time: "16:00", duration: 180, tags: ["文化","景点"], lat: 30.1800, lng: 120.1000 },
    ]
  },
  成都: {
    spots: [
      { name: "大熊猫基地", type: "景点", desc: "看花花，要早起", time: "07:30", duration: 180, tags: ["景点","自然"], lat: 30.7344, lng: 104.1481 },
      { name: "宽窄巷子", type: "美食", desc: "老成都生活样本", time: "11:00", duration: 90, tags: ["美食","文化"], lat: 30.6634, lng: 104.0555 },
      { name: "人民公园", type: "文化", desc: "鹤鸣茶社，掏耳朵", time: "13:00", duration: 90, tags: ["文化","美食"], lat: 30.6570, lng: 104.0550 },
      { name: "锦里", type: "美食", desc: "三国主题美食街", time: "15:00", duration: 90, tags: ["美食","文化"], lat: 30.6450, lng: 104.0450 },
      { name: "武侯祠", type: "文化", desc: "三国圣地", time: "17:00", duration: 60, tags: ["文化"], lat: 30.6420, lng: 104.0440 },
      { name: "春熙路 & IFS", type: "购物", desc: "爬墙熊猫打卡", time: "18:30", duration: 90, tags: ["购物","景点"], lat: 30.6550, lng: 104.0820 },
      { name: "九眼桥", type: "夜生活", desc: "酒吧一条街", time: "20:30", duration: 120, tags: ["夜生活","美食"], lat: 30.6350, lng: 104.0880 },
      { name: "都江堰", type: "景点", desc: "两千年的水利工程", time: "07:00", duration: 180, tags: ["景点","文化"], lat: 30.9980, lng: 103.6180 },
      { name: "青城山", type: "自然", desc: "道教名山，清幽避暑", time: "11:00", duration: 240, tags: ["自然","文化"], lat: 30.9080, lng: 103.5620 },
      { name: "建设路", type: "美食", desc: "成都最火美食街", time: "18:00", duration: 120, tags: ["美食"], lat: 30.6750, lng: 104.0980 },
    ]
  },
  西安: {
    spots: [
      { name: "兵马俑", type: "景点", desc: "世界第八大奇迹", time: "08:00", duration: 180, tags: ["景点","文化"], lat: 34.3841, lng: 109.2785 },
      { name: "华清宫", type: "文化", desc: "杨贵妃沐浴之地", time: "11:30", duration: 120, tags: ["文化","景点"], lat: 34.3640, lng: 109.2120 },
      { name: "回民街", type: "美食", desc: "肉夹馍、羊肉泡馍", time: "14:00", duration: 90, tags: ["美食"], lat: 34.2620, lng: 108.9420 },
      { name: "钟楼 & 鼓楼", type: "景点", desc: "西安地标，夜景超美", time: "16:00", duration: 90, tags: ["景点"], lat: 34.2610, lng: 108.9420 },
      { name: "城墙", type: "景点", desc: "骑车环城墙一周", time: "18:00", duration: 90, tags: ["景点","自然"], lat: 34.2560, lng: 108.9500 },
      { name: "大唐不夜城", type: "夜生活", desc: "梦回大唐", time: "20:00", duration: 120, tags: ["夜生活","文化","景点"], lat: 34.2150, lng: 108.9600 },
      { name: "陕西历史博物馆", type: "文化", desc: "国宝级文物", time: "08:30", duration: 180, tags: ["文化"], lat: 34.2250, lng: 108.9500 },
      { name: "大雁塔", type: "景点", desc: "玄奘取经归来", time: "12:00", duration: 60, tags: ["景点","文化"], lat: 34.2200, lng: 108.9650 },
      { name: "大唐芙蓉园", type: "景点", desc: "盛唐皇家园林", time: "13:30", duration: 120, tags: ["景点","文化"], lat: 34.2150, lng: 108.9700 },
      { name: "永兴坊", type: "美食", desc: "非遗美食街区", time: "16:00", duration: 90, tags: ["美食","文化"], lat: 34.2650, lng: 108.9480 },
      { name: "赛格国际", type: "购物", desc: "室内瀑布+超长扶梯", time: "18:00", duration: 90, tags: ["购物"], lat: 34.2280, lng: 108.9400 },
    ]
  },
  重庆: {
    spots: [
      { name: "解放碑", type: "景点", desc: "抗战胜利纪念碑", time: "08:00", duration: 60, tags: ["景点","购物"], lat: 29.5630, lng: 106.5750 },
      { name: "八一好吃街", type: "美食", desc: "酸辣粉、山城小汤圆", time: "09:30", duration: 60, tags: ["美食"], lat: 29.5620, lng: 106.5760 },
      { name: "长江索道", type: "景点", desc: "空中看两江", time: "11:00", duration: 45, tags: ["景点"], lat: 29.5550, lng: 106.5850 },
      { name: "洪崖洞", type: "景点", desc: "千与千寻现实版", time: "12:00", duration: 90, tags: ["景点","美食"], lat: 29.5650, lng: 106.5800 },
      { name: "李子坝", type: "景点", desc: "轻轨穿楼", time: "14:00", duration: 30, tags: ["景点"], lat: 29.5550, lng: 106.5300 },
      { name: "鹅岭二厂", type: "文化", desc: "《从你的全世界路过》", time: "15:00", duration: 90, tags: ["文化","景点"], lat: 29.5530, lng: 106.5400 },
      { name: "南山一棵树", type: "景点", desc: "俯瞰重庆夜景", time: "17:00", duration: 90, tags: ["景点","夜生活"], lat: 29.5450, lng: 106.5900 },
      { name: "磁器口古镇", type: "文化", desc: "千年古镇，陈麻花", time: "08:30", duration: 120, tags: ["文化","美食"], lat: 29.5800, lng: 106.4500 },
      { name: "白公馆 & 渣滓洞", type: "文化", desc: "红色教育基地", time: "11:00", duration: 120, tags: ["文化"], lat: 29.5750, lng: 106.4300 },
      { name: "三峡博物馆", type: "文化", desc: "了解巴渝文化", time: "14:00", duration: 90, tags: ["文化"], lat: 29.5630, lng: 106.5500 },
      { name: "观音桥", type: "购物", desc: "潮流商圈", time: "16:30", duration: 90, tags: ["购物","美食"], lat: 29.5750, lng: 106.5350 },
      { name: "九街", type: "夜生活", desc: "重庆夜生活天花板", time: "19:30", duration: 120, tags: ["夜生活","美食"], lat: 29.5800, lng: 106.5300 },
    ]
  },
  厦门: {
    spots: [
      { name: "鼓浪屿", type: "景点", desc: "万国建筑，钢琴之岛", time: "08:00", duration: 240, tags: ["景点","文化","自然"], lat: 24.4450, lng: 118.0820 },
      { name: "厦门大学", type: "文化", desc: "中国最美大学", time: "13:00", duration: 90, tags: ["文化","景点"], lat: 24.4390, lng: 118.0980 },
      { name: "南普陀寺", type: "文化", desc: "闽南佛教圣地", time: "15:00", duration: 60, tags: ["文化"], lat: 24.4410, lng: 118.1000 },
      { name: "沙坡尾", type: "美食", desc: "文艺渔村，网红打卡", time: "16:30", duration: 90, tags: ["美食","文化"], lat: 24.4450, lng: 118.1030 },
      { name: "环岛路", type: "自然", desc: "最美马拉松赛道", time: "18:00", duration: 90, tags: ["自然","景点"], lat: 24.4500, lng: 118.1100 },
      { name: "曾厝垵", type: "美食", desc: "最文艺渔村", time: "20:00", duration: 90, tags: ["美食","夜生活"], lat: 24.4350, lng: 118.1250 },
      { name: "集美学村", type: "文化", desc: "嘉庚建筑，海上地铁", time: "08:00", duration: 180, tags: ["文化","景点"], lat: 24.5750, lng: 118.0980 },
      { name: "中山路步行街", type: "购物", desc: "骑楼建筑，南洋风情", time: "12:00", duration: 120, tags: ["购物","美食"], lat: 24.4600, lng: 118.0800 },
      { name: "园林植物园", type: "自然", desc: "雨林喷雾，多肉植物", time: "15:00", duration: 120, tags: ["自然","景点"], lat: 24.4450, lng: 118.1150 },
      { name: "白城沙滩", type: "自然", desc: "看日落", time: "17:30", duration: 90, tags: ["自然"], lat: 24.4350, lng: 118.1050 },
    ]
  },
  南京: {
    spots: [
      { name: "中山陵", type: "景点", desc: "392级台阶", time: "08:00", duration: 120, tags: ["景点","文化"], lat: 32.0550, lng: 118.8500 },
      { name: "明孝陵", type: "景点", desc: "石象路最美600米", time: "10:30", duration: 90, tags: ["景点","文化"], lat: 32.0580, lng: 118.8450 },
      { name: "美龄宫", type: "文化", desc: "远东第一别墅", time: "12:00", duration: 60, tags: ["文化","景点"], lat: 32.0550, lng: 118.8480 },
      { name: "夫子庙", type: "美食", desc: "秦淮河畔，鸭血粉丝", time: "13:30", duration: 120, tags: ["美食","文化","夜生活"], lat: 32.0230, lng: 118.7950 },
      { name: "老门东", type: "美食", desc: "南京小吃聚集地", time: "16:00", duration: 90, tags: ["美食","文化"], lat: 32.0150, lng: 118.7900 },
      { name: "秦淮河游船", type: "景点", desc: "夜泊秦淮近酒家", time: "18:00", duration: 60, tags: ["景点","夜生活"], lat: 32.0200, lng: 118.7950 },
      { name: "总统府", type: "文化", desc: "近代史遗址博物馆", time: "08:30", duration: 120, tags: ["文化","景点"], lat: 32.0430, lng: 118.7980 },
      { name: "南京博物院", type: "文化", desc: "中国三大博物馆之一", time: "11:00", duration: 180, tags: ["文化"], lat: 32.0420, lng: 118.8200 },
      { name: "鸡鸣寺", type: "文化", desc: "南朝第一寺", time: "14:00", duration: 60, tags: ["文化","景点"], lat: 32.0580, lng: 118.7450 },
      { name: "玄武湖", type: "自然", desc: "金陵明珠", time: "15:30", duration: 90, tags: ["自然","景点"], lat: 32.0600, lng: 118.7850 },
      { name: "新街口", type: "购物", desc: "中华第一商圈", time: "17:30", duration: 90, tags: ["购物","美食"], lat: 32.0430, lng: 118.7850 },
    ]
  }
};

function isOutdoorSpot(spot) {
  return OUTDOOR_TYPES.includes(spot.type) || spot.tags.some(t => OUTDOOR_TYPES.includes(t));
}

function timeToMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minToTime(m) {
  const h = Math.floor(m / 60), mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function addMinutes(t, mins) {
  return minToTime(timeToMin(t) + mins);
}

function generateItinerary(city, days, styles, pace, customSpotsData) {
  let allSpots = [];
  if (customSpotsData && customSpotsData.length > 0) {
    allSpots = customSpotsData;
  } else if (cityData[city]) {
    allSpots = cityData[city].spots;
  } else {
    return [];
  }

  const scored = allSpots.map(s => {
    const match = s.tags.filter(t => styles.includes(t)).length;
    return { ...s, score: match };
  }).sort((a, b) => b.score - a.score);

  const spotsPerDay = pace === 'relaxed' ? 4 : pace === 'normal' ? 5 : 7;
  const itinerary = [];
  const used = new Set();

  for (let d = 0; d < days; d++) {
    const daySpots = [];
    const remaining = scored.filter(s => !used.has(s.name));
    let currentTime = '08:00';
    if (d === 0 && remaining.some(s => timeToMin(s.time) < timeToMin('08:00'))) {
      currentTime = '07:00';
    }

    for (const spot of remaining) {
      if (daySpots.length >= spotsPerDay) break;
      if (used.has(spot.name)) continue;
      const spotMin = timeToMin(spot.time);
      const curMin = timeToMin(currentTime);
      if (spotMin >= curMin - 60 && spotMin <= curMin + 180) {
        daySpots.push({ ...spot, scheduledTime: spot.time });
        used.add(spot.name);
        currentTime = addMinutes(spot.time, spot.duration + 30);
      }
    }

    if (daySpots.length < 3) {
      for (const spot of remaining) {
        if (daySpots.length >= spotsPerDay) break;
        if (used.has(spot.name)) continue;
        daySpots.push({ ...spot, scheduledTime: currentTime });
        used.add(spot.name);
        currentTime = addMinutes(currentTime, spot.duration + 30);
      }
    }

    daySpots.sort((a, b) => timeToMin(a.scheduledTime) - timeToMin(b.scheduledTime));
    itinerary.push(daySpots);
  }

  return itinerary;
}

function adjustForWeather(itinerary, isRainy) {
  if (!isRainy) return itinerary;

  // On rainy days, swap outdoor spots with indoor ones when possible
  const adjusted = itinerary.map(day => {
    const newDay = [...day];
    for (let i = 0; i < newDay.length; i++) {
      if (isOutdoorSpot(newDay[i])) {
        // Find an indoor spot later in the day to swap with
        for (let j = i + 1; j < newDay.length; j++) {
          if (!isOutdoorSpot(newDay[j])) {
            const temp = newDay[i];
            newDay[i] = { ...newDay[j], scheduledTime: temp.scheduledTime };
            newDay[j] = { ...temp, scheduledTime: newDay[j].scheduledTime };
            newDay[i].weatherNote = '🌧️ 因雨天提前调整至此';
            newDay[j].weatherNote = '🌧️ 原室外景点推迟';
            break;
          }
        }
      }
    }
    return newDay;
  });

  return adjusted;
}

module.exports = {
  cityData,
  OUTDOOR_TYPES,
  isOutdoorSpot,
  generateItinerary,
  adjustForWeather,
  timeToMin,
  minToTime,
  addMinutes
};
