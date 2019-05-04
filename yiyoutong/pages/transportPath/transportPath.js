var amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    time: "49分钟",
    distance: "13公里",
    note: "红绿灯32个",
    longitude:"",
    latitude:"",
    markers: [{
      iconPath: '/images/位置.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [
        
      ],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
    top:"",
    timeStamp: "",
    speed:"",
    fullScreen: false,
    halfScreen: false,
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'a1a661e70a8349ccdc6af4a9b519aadc'
    });
    myAmapFun.getPoiAround({
      success: function(data) {
        //成功回调
        var markers = data.markers
        var longitude = markers[0].longitude
        var latitude = markers[0].latitude
        that.setData({
          markers: data.markers,
          longitude: longitude,
          latitude: latitude
        })
        console.log(data)
      },
      fail: function(info) {
        //失败回调
        console.log(info)
      }
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
  touchMove: function(e){
    console.log(e)
    console.log(e.changedTouches[0].clientY)
    var top = e.changedTouches[0].clientY
    var timeStamp = e.timeStamp
    var time = timeStamp - this.data.timeStamp
    console.log(time)
    var distance = top - this.data.top
    var speed = distance/time
    console.log(speed)
    this.setData({
      top: top,
      speed: speed,
      timeStamp: timeStamp
    })
  },
  touchEnd: function(e){
    console.log(e)
    var fullScreen = this.data.fullScreen
    var halfScreen = this.data.halfScreen
    var top = this.data.top
    var speed = this.data.speed
    if(fullScreen){
      if(speed > 0.5){
        this.setData({
          top: 500,
          fullScreen: false
        })
      }else{
        if(top > 50){
          this.setData({
            top: 255,
            fullScreen: false,
            haflScreen: true
          })
        }else{
          this.setData({
            top: 0
          })
        }
      }
    }else if(halfScreen){
      if(speed < -0.5){
        this.setData({
          top: 0,
          fullScreen: true,
          halfScreen: false
        })
      }else if(speed > 0.5){
        this.setData({
          top: 500,
          halfScreen: false
        })
      }else{
        if(top > 280){
          this.setData({
            top: 500,
            halfScreen: false
          })
        }else if(top < 230){
          this.setData({
            top: 0,
            fullScreen: true,
            halfScreen: false
          })
        }else{
          this.setData({
            top: 255
          })
        }
      }
    }else{
      if(speed < -0.5){
        this.setData({
          top: 0,
          fullScreen: true
        })
      }else{
        if(top < 480){
          this.setData({
            top: 255,
            halfScreen: true
          })
        }else{
          this.setData({
            top:500
          })
        }
      }
    }
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
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