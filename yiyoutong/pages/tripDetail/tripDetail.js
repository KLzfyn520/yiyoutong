Page({
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    key: 'C3798',
    dstPort: '终点站',
    src: '成都',
    srcTime: '1:00',
    dst: '北京',
    dstTime: '2:00',
    srcList: [{
        src: '华西',
        dst: '火车站'
      },
      {
        src: '川大',
        dst: '华西'
      }
    ],
    dstList: [{
        src: '华西',
        dst: '火车站'
      }
    ],
    alpha:[
      "A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"
    ],
    // alphaIndex:0,
    hotCities:[
      "上海","北京","广州","成都","深圳","重庆","杭州","天津","南京"
    ],
    hotCityIndex:0,
    cities:[
      {alpha:"A", cities:[
        "阿尔山","阿里","安顺"
      ]},
      {alpha:"B", cities:[
        "北京","巴中"
      ]},
      {alpha:"C", cities:[
        "长春","长沙"
      ]}
    ],
    cityIndex:[0, 0],
    scrollId:"",
    tabs: ["出行行程", "目的行程"],
    activeIndex: 0,
    inputShowed: false,
    inputVal: "",
    searchResult:[
      "1","2","3","4"
    ],
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {

        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  toTransport: function() {
    wx.navigateTo({
      url: "/pages/transportDetail/transportDetail"
    })
  },
  chooseCity: function(e) {
    var name = e.currentTarget.dataset.name
    this.setData({

    })
    this.hideModal()
  },
  chooseAlpha: function(e){
    var alpha = e.currentTarget.dataset.alpha
    this.setData({
      scrollId: alpha
    })

  },
  addSrcTrip: function() {
    var that = this;
    var srcList = that.data.srcList;
    if (srcList.length == 0) {
      var newTrip = {
        src: "出发地",
        dst: "目的地"
      }
    } else {
      var lastTrip = srcList.pop();
      var newTrip = {
        src: lastTrip.dst,
        dst: "目的地"
      }
      srcList.push(lastTrip);
    }
    srcList.push(newTrip);
    that.setData({
      srcList: srcList,
    })
  },
  addDstTrip: function() {
    var that = this;
    var dstList = that.data.dstList;
    if (dstList.length == 0) {
      var newTrip = {
        src: "出发地",
        dst: "目的地"
      }
    } else {
      var lastTrip = dstList.pop();
      var newTrip = {
        src: lastTrip.dst,
        dst: "目的地"
      }
      dstList.push(lastTrip);
    }
    dstList.push(newTrip);
    that.setData({
      dstList: dstList,
    })
  },
  deleteSrcTrip: function(e) {
    var that = this
    var srcList = that.data.srcList
    var index = e.currentTarget.dataset.index
    console.log(index)
    if (srcList.length != 0) {
      if (srcList.length > index + 1 && index != 0) {
        var prevItem = srcList.slice(index - 1, index).pop()
        var nextItem = srcList.slice(index + 1, index + 2).pop()
        console.log(nextItem)
        nextItem.src = prevItem.dst
        srcList.splice(index + 1, 1, nextItem)
      }else if(srcList.length > index + 1 && index == 0){

      }
      srcList.splice(index, 1)
    }
    that.setData({
      srcList: srcList
    })
  },
  deleteDstTrip: function(e) {
    var that = this
    var dstList = that.data.dstList
    var index = e.currentTarget.index
    if (dstList.length != 0) {
      dstList.pop();
    }
    that.setData({
      dstList: dstList
    })
  },
  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function() {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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