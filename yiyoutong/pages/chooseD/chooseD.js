const app = getApp()

const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月 获取当月的总天数
let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, day, _th) {
  let daysNum = getDays(year, month)
  let startDay = year === nowYear && month === nowMonth ? nowDay : 1
  let startMonth = year === nowYear ? nowMonth : 1
  let years = []
  let months = []
  let days = []
  let yearIdx = 9999
  let monthIdx = 0
  let dayIdx = 0

  // 重新设置年份列表
  for (let i = nowYear; i <= nowYear+3; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIdx = idx
    }
  })
  // 重新设置月份列表
  for (let i = startMonth; i <= 12; i++) {
    months.push(i)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIdx = idx
    }
  })
  // 重新设置日期列表
  for (let i = startDay; i <= daysNum; i++) {
    days.push(i)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIdx = idx
    }
  })

  _th.setData({
    years: years,//年份列表
    months: months,//月份列表
    days: days,//日期列表
    value: [yearIdx, monthIdx, dayIdx],
    year: year,
    month: month,
    day: day
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '成都',  //出发城市
    end: '上海',    //目的城市
    choose: '',
    years: [],
    months: [],
    days: [],
    year: nowYear,
    month: nowMonth,
    day: nowDay,
    value: [9999, 1, 1],
    items: [
      { id: '0', value: '出差' },
      { id: '1', value: '个人游' },
      { id: '2', value: '家庭游' },
    ],
    itemId: "0",

    alpha: [
      "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
    ],
    // alphaIndex:0,
    hotCities: [
      "上海", "北京", "广州", "成都", "深圳", "重庆", "杭州", "天津", "南京"
    ],
    hotCityIndex: 0,
    cities: [
      {
        alpha: "A", cities: [
          "阿尔山", "阿里", "安顺"
        ]
      },
      {
        alpha: "B", cities: [
          "北京", "巴中"
        ]
      },
      {
        alpha: "C", cities: [
          "长春", "长沙"
        ]
      }
    ],
    cityIndex: [0, 0],
    scrollId: "",
    inputShowed: false,
    inputVal: "",
    searchResult: [
      "1", "2", "3", "4"
    ],
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
  },

  radioChange: function(e){
    console.log(e)
    this.setData({
      itemId: e.detail.value
    })
  },
  toTripHistory: function(e){
    wx.navigateTo({
      url: '/pages/tripHistory/tripHistory',
    })
  },
  toChooseT: function (e) {
    wx.navigateTo({
      url: '/pages/chooseT/chooseT',
    })
  },
  
  chooseCity: function (e) {
    var name = e.currentTarget.dataset.name
    var hotCities = this.data.hotCities
    var cities = this.data.cities
    var choose = this.data.choose
    if(choose == "begin"){
      this.setData({
        begin: name
      })
    }else if(choose == "end"){
      this.setData({
        end: name
      })
    }
    this.hideModal()
    for(var i = 0;i < hotCities.length;i++){
      if (name == hotCities[i]){
        this.setData({
          hotCityIndex: i
        })
      }
    }
    for(var i = 0;i < cities.length;i++){
      var citiesItem = cities[i].cities
      var citiesLen = citiesItem.length
      for(var j = 0;j < citiesLen;j++){
        if(name == cityItem[j]){
          this.setData({
            cityIndex: [i, j]
          })
        }
      }
    }
  },
  chooseAlpha: function (e) {
    var alpha = e.currentTarget.dataset.alpha
    this.setData({
      scrollId: alpha
    })

  },
  showModal: function (e) {
    var that = this;
    var choose = e.currentTarget.dataset.choose;
    that.setData({
      hideModal: false,
      choose: choose
    })
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(1100).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setDate(this.data.year, this.data.month, this.data.day, this)
  },
  bindChange: function (e) {
    let val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.login({
      success: function (data) {
        console.log('获取登录 Code：' + data.code)
        var postData = {
          js_code: data.code
        };
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})