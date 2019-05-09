const app = getApp()
const date = new Date()
const month = date.getMonth()
const day = date.getDate()
const dates = []
const hours = []
const minutes = []
for (let i = 0; i < 23; i++) {
  hours.push(i)
}
for (let i = 0; i < 59; i++) {
  minutes.push(i)
}
for (let i = 0; i < 10; i++) {
  let curDay = day + i
  let curMonth = month
  if (curDay > 30) {
    curDay = curDay - 30
    curMonth = curMonth + 1
  }
  let str = curMonth + "月" + curDay + "日"
  dates.push(str)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    journeyId: 0,
    city: '',

    src: "东站",
    dst: "川大",
    means: [{
        type: "公交",
        time: "10分钟",
        money: "10元",
        note: "在长城路上车",
        image: "/images/公交.png",
        route: [{
            type: 0,
            detail: "816路",
            color: "white"
          },
          {
            type: 1,
            detail: "7号线",
            color: "#0A52BE"
          }
        ],
        isTransit: true,
        isFastest: true,
        isRecom: true
      },
      {
        type: "驾车",
        time: "20分钟",
        money: "",
        note: "红绿灯30个",
        image: "/images/小汽车.png",
        route: [],
        isTransit: false,
        isFastest: false,
        isRecom: false
      }
    ],
    methods: [
      "推荐路线", "时间短", "少换乘", "少步行", "地铁优先", "公交优先"
    ],
    methodIndex:"0",
    methodName:"推荐路线",
    hideTimeFilter: true,
    hideMethodFilter: true,
    animationData: {},
    value: [1, 1, 1],
    dates,
    hours,
    minutes,
    result: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var journeyId = options.journeyId
    var src = options.src
    var dst = options.dst
    var city = options.city
    var that = this;
    that.setData({
      src: src,
      dst: dst,
      journeyId:journeyId,
      city: city,
    })
    wx.request({
      url: app.globalData.url + '/getBusRoute',
      data: {
        origin:src,
        destination:dst,
        city: city
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        var means = []
        var result = res.data.result
        var route = result.route
        var transits = route.transits
        for(var i = 0;i<transits.length;i++){
          var transitItem = transits[i]
          var routes = []
          for(var j = 0;j<transitItem.segments[0].bus.buslines.length;j++){
            var lineItem = transitItem.segments[0].bus.buslines[j]
            if (lineItem.type == "普通公交线路"){
              var routeItem = {
                type: 0,
                detail: lineItem.name.split('(')[0],
                color: "white"
              }
            }else if(lineItem.type == "地铁线路"){
              var routeItem = {
                type: 1,
                detail: lineItem.name.split('(')[0],
                color: "#0A52BE"
              }
            }
            routes.push(routeItem)
          }
          var meanItem = {
            id: i,
            type: "公交",
            duration: transitItem.duration,
            time: transitItem.duration > 3600 ? Math.floor(transitItem.duration / 3600) + '时' + Math.floor(transitItem.duration % 3600 / 60) + '分' : Math.floor(transitItem.duration / 60) + '分钟',
            distance: transitItem.distance + '公里',
            money: transitItem.cost + '元',
            note: "无",
            image: "/images/公交.png",
            route: routes,
            isTransit: true,
            isFastest: false,
            isRecom: false
          }
          means.push(meanItem)
        }
        var fastestIndex = 0;
        var recIndex = 0
        for(var i = 0;i<means.length;i++){
          if(means[i].duration < means[fastestIndex].duration){
            fastestIndex = i
          }
        }
        means[fastestIndex].isFastest = true
        means[recIndex].isRecom = true
        that.setData({
          result: result,
          means: means
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
  },
  chooseMethod: function(e) {
    var index = e.currentTarget.dataset.index
    var methods = this.data.methods
    this.setData({
      methodIndex: index,
      methodName: methods[index]
    })
    this.hideMethodFilter()
  },
  toPathDetail: function(e) {
    var index = e.currentTarget.dataset.index
    var result = this.data.result
    var transit = result.route.transits[index]
    wx.navigateTo({
      url: '/pages/transportPath/transportPath' + '?transit=' + JSON.stringify(transit) + '&src=' + this.data.src + '&dst=' + this.data.dst + '&journeyId=' + this.data.journeyId + '&city=' + this.data.city,
    })
  },
  showMethodFilter: function() {
    console.log("showMethod")
    var that = this;
    if (!that.data.hideTimeFilter) {
      that.setData({
        hideTimeFilter: true,
        hideMethodFilter: false
      })
    } else {
      that.setData({
        hideMethodFilter: false
      })
      var animation = wx.createAnimation({
        duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function() {
        that.fadeIn(); //调用显示动画
      }, 200)
    }
  },

  // 隐藏遮罩层
  hideMethodFilter: function() {
    console.log("hideMethod")
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        hideMethodFilter: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },
  showTimeFilter: function() {
    console.log("showTime")
    var that = this;
    if (!that.data.hideMethodFilter) {
      that.setData({
        hideTimeFilter: false,
        hideMethodFilter: true
      })

    } else {
      that.setData({
        hideTimeFilter: false
      })
      var animation = wx.createAnimation({
        duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function() {
        that.fadeIn(); //调用显示动画
      }, 200)
    }
  },

  // 隐藏遮罩层
  hideTimeFilter: function() {
    console.log("hideTime")
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        hideTimeFilter: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },
  //动画集
  fadeIn: function() {
    this.animation.translateY(175).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function() {
    this.animation.translateY(-175).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})