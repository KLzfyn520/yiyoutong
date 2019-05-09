const app = getApp()
//var amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    journeyId: 0,
    paths: [
    ],
    transit: {},
    city:'',
    src: '',
    dst: '',

    time: "49分钟",
    distance: "13公里",
    note: "红绿灯32个",
    cost: "6元",

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

    top:"470",
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
    var transit = JSON.parse(options.transit)
    var src = options.src
    var dst = options.dst
    var journeyId = options.journeyId
    var city = options.city
    var that = this;
    
    // var myAmapFun = new amapFile.AMapWX({
    //   key: 'a1a661e70a8349ccdc6af4a9b519aadc'
    // });
    // myAmapFun.getPoiAround({
    //   success: function(data) {
    //     //成功回调
    //     var markers = data.markers
    //     var longitude = markers[0].longitude
    //     var latitude = markers[0].latitude
    //     that.setData({
    //       markers: data.markers,
    //       longitude: longitude,
    //       latitude: latitude
    //     })
    //     console.log(data)
    //   },
    //   fail: function(info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // })

    wx.getSystemInfo({
      success: function(res) {

        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
    var cost = transit.cost + '元'
    var time = transit.duration > 3600 ? Math.floor(transit.duration / 3600) + '时' + Math.floor(transit.duration % 3600 / 60) + '分' : Math.floor(transit.duration / 60) + '分钟'
    var distance = (transit.distance / 1000).toFixed(2) + '公里'
    var walkingDistance = (transit.walking_distance / 1000).toFixed(2) + '公里'
    var countSta = 0
    var segments = transit.segments
    var pathList = []
    var originName = options.src
    var destinationName = options.dst
    for(var i = 0;i<segments.length-1;i++){
      var segmentItem =segments[i]
      var walkingItem = {
        isWalking: true,
        origin: segmentItem.walking.origin,
        destination: segmentItem.walking.destination,
        originName: originName,
        destinationName: segmentItem.bus.buslines[0].departure_stop.name,
        distance: segmentItem.walking.distance,
        duration: Math.floor(segmentItem.walking.duration / 60)
      }
      var busItem = {
        isWalking: false,
        origin: segmentItem.bus.buslines[0].departure_stop.location,
        destination: segmentItem.bus.buslines[0].arrival_stop.location,
        originName: segmentItem.bus.buslines[0].departure_stop.name,
        destinationName: segmentItem.bus.buslines[0].arrival_stop.name,
        distance: segmentItem.bus.buslines[0].distance,
        duration: Math.floor(segmentItem.bus.buslines[0].duration / 60),
        name: segmentItem.bus.buslines[0].name.split('(')[0],
        num: segmentItem.bus.buslines[0].via_num
      }
      countSta += segmentItem.bus.buslines[0].via_num
      originName = segmentItem.bus.buslines[0].arrival_stop.name
      pathList.push(walkingItem)
      pathList.push(busItem)
    }
    var segmentItem = segments[segments.length-1]
    var walkingItem = {
      isWalking: true,
      origin: segmentItem.walking.origin,
      destination: segmentItem.walking.destination,
      originName: originName,
      destinationName: destinationName,
      distance: segmentItem.walking.distance,
      duration: segmentItem.walking.duration
    }
    pathList.push(walkingItem)

    //标记地图上的点

    var beginLong = pathList[0].origin.split(',')[0]
    var beginLat = pathList[0].origin.split(',')[1]
    var endLong = pathList[pathList.length-1].destination.split(',')[0]
    var endLat = pathList[pathList.length-1].destination.split(',')[1]
    var markers = []
    var polyline = []
    markers.push({
      iconPath: '/images/位置.png',
      title: '起点',
      id: 0,
      latitude: beginLat,
      longitude: beginLong,
      width: 40,
      height: 40
    })
    for(var i = 0;i<pathList.length;i++){
      var pathItem = pathList[i]
      var originLat = pathItem.origin.split(',')[1]
      var originLong = pathItem.origin.split(',')[0]
      var desLat = pathItem.destination.split(',')[1]
      var desLong = pathItem.destination.split(',')[0]

      var originPoint = { latitude: originLat, longitude: originLong }
      var desPoint = { latitude: desLat, longitude: desLong }
      if(i != 0){
        var markerItem = {
          iconPath: '/images/位置.png',
          id: i,
          latitude: originLat,
          longitude: originLong,
          width: 30,
          height: 30
        }
        markers.push(markerItem)
      }

      var points = []
      points.push(originPoint)
      points.push(desPoint)
      if(pathItem.isWalking){
        var polyItem = {
          points: points,
          color: '#8E8E93DD',
          width: 2,
          dottedLine: true
        }
      }else if(!pathItem.isWalking){
        var polyItem = {
          points: points,
          color: '#0000FFDD',
          width: 2,
          dottedLine: true
        }
      }
      polyline.push(polyItem)
    }
    markers.push({
      iconPath: '/images/位置.png',
      title: '终点',
      id: pathList.length-1,
      latitude: endLat,
      longitude: endLong,
      width: 40,
      height: 40
    })
    console.log(markers)
    console.log(polyline)
    that.setData({
      src: src,
      dst: dst,
      journeyId: journeyId,
      city: city,
      paths: pathList,
      time: time,
      distance: distance,
      note: "步行" + walkingDistance + " " + "共" + countSta + "站",
      longitude: beginLong,
      latitude: beginLat,
      markers: markers,
      polyline: polyline,
    })
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
          top: 470,
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
          top: 470,
          halfScreen: false
        })
      }else{
        if(top > 280){
          this.setData({
            top: 470,
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
            top:470
          })
        }
      }
    }
  },
  submit: function(e){
    var that = this
    wx.request({
      url: app.globalData.url + '/chooseRoute',
      data: {
        jsonObject: JSON.stringify(that.data.transit),
        journeyId: that.data.journeyId,
        city: that.data.city,
        startPoint: that.data.src,
        endPoint: that.data.dst,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.navigateBack({
      delta: 2
    })
  },
  showDetail: function(e){
    if(this.data.fullScreen){
      this.setData({
        top: 470,
        fullScreen: false
      })
    }else if(this.data.halfScreen){
      this.setData({
        top: 470,
        halfScreen: false
      })
    }else{
      this.setData({
        top: 0,
        fullScreen: true
      })
    }
  },
  regionchange(e) {
    //console.log(e.type)
  },
  markertap(e) {
    //console.log(e.markerId)
  },
  controltap(e) {
    //console.log(e.controlId)
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