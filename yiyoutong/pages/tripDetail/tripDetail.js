var amapFile = require('../../libs/amap-wx.js');
const app = getApp()

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
    srcList: [],
    dstList: [

    ],
    nowPlace: '出发地',
    type: '飞机',
    journeyId: 0,
    arrayItem: {},
    activeIndex: '',
    activeArray: '',
    activeType: '',
    scrollId: "",
    tabs: ["出行行程", "目的行程"],
    activeIndex: 0,
    inputShowed: false,
    inputVal: "",
    searchResult: [
    ],
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)

    var item = JSON.parse(options.item)
    var src = item.beginPlace
    var dst = item.endPlace
    var srcTime = item.beginTime
    var dstTime = item.endTime
    var srcCity = item.beginCity
    var dstCity = item.endCity
    var key = item.number
    var type = item.type

    var time = options.time
    var journeyId = options.journeyId

    var that = this;
    that.setData({
      src: src,
      dst: dst,
      srcTime: srcTime,
      dstTime: dstTime,
      srcCity: srcCity,
      dstCity: dstCity,
      key: key,
      type: type,
      time: time,
      journeyId: journeyId,
      arrayItem: item
    })

    var times = time.split('-')
    var date_time = ''
    for (var i = 0; i < times.length - 1; i++) {
      date_time = date_time + times[i] + '/'
    }
    date_time = date_time + times[times.length - 1]
    if(that.data.journeyId == undefined){
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          var userId = res.data
          console.log(that.data.srcCity)
          console.log(that.data.dstCity)
          console.log(date_time)
          console.log(res.data)
          that.setData({
            userId: userId
          })
          wx.request({
            url: app.globalData.url + '/initJourney',
            data: {
              originCity: that.data.srcCity,
              destCity: that.data.dstCity,
              date: date_time,
              userid: userId
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              var journeyId = res.data.result.journeyid
              console.log(res)
              console.log("成功初始化城市间交通")
              that.setData({
                journeyId: journeyId
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) {
          console.log("failed")
          wx.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求
                console.log(res.code)
                var js_code = res.code
                wx.request({
                  url: app.globalData.url + '/login',
                  data: {
                    js_code: js_code
                  },
                  header: {
                  },
                  method: 'GET',
                  dataType: 'json',
                  responseType: 'text',
                  success: function (res) {
                    console.log(res)
                    wx.setStorage({
                      key: 'userId',
                      data: res.data.result
                    })
                  },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }
      })
    }
    
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude //维度
        var longitude = res.longitude //经度
        var myAmapFun = new amapFile.AMapWX({
          key: 'a1a661e70a8349ccdc6af4a9b519aadc'
        });
        myAmapFun.getRegeo({
          location: '' + longitude + ',' + latitude + '', //location的格式为'经度,纬度'
          success: function(data) {
            console.log(data)
            that.setData({
              nowPlace: data[0].desc
            })
          },
          fail: function(info) {}
        });
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
  submit: function(e) {
    var that = this
    var journeyId = this.data.journeyId
    wx.request({
      url: app.globalData.url + '/chooseTransportation',
      data: {
        transportation: JSON.stringify(that.data.arrayItem),
        journeyId: journeyId,
        userId: this.data.userId
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        console.log("成功选择城市间交通")
      },
      fail: function (res) { },
      complete: function (res) { },
    })
   
    // wx.checkSession({
    //   success: function () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //     console.log("session is valid")
    //     var id = app.globalData.userId
    //   },
    //   fail: function () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     console.log("session is not valid")
       
    //   }
    // })

  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  toTransport: function(e) {
    var journeyId = this.data.journeyId
    var src = ''
    var dst = ''
    var city = ''
    var index = e.currentTarget.dataset.index
    if(e.currentTarget.dataset.array == 'src'){
      src = this.data.srcList[index].src
      dst = this.data.srcList[index].dst
      city = this.data.srcCity
    }else if(e.currentTarget.dataset.array == 'dst'){
      src = this.data.srcList[index].src
      dst = this.data.dstList[index].dst
      city = this.data.dstCity
    }
    wx.navigateTo({
      url: "/pages/transportDetail/transportDetail" + '?src=' + src + '&dst=' + dst + '&city=' + city + '&journeyId=' + journeyId
    })
  },
  chooseCity: function(e) {
    var name = e.currentTarget.dataset.name
    this.setData({

    })
    this.hideModal()
  },
  chooseAlpha: function(e) {
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
        src: that.data.nowPlace,
        dst: that.data.src
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
        src: that.data.dst,
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
    wx.showModal({
      title: '提醒',
      content: '是否要删除该项行程',
      success(res){
        if (res.confirm) {
          console.log('用户点击确定')
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
            } else if (srcList.length > index + 1 && index == 0) {

            }
            srcList.splice(index, 1)
          }
          that.setData({
            srcList: srcList
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteDstTrip: function(e) {
    var that = this
    wx.showModal({
      title: '提醒',
      content: '是否要删除该项行程',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var dstList = that.data.dstList
          var index = e.currentTarget.index
          if (dstList.length != 0) {
            dstList.pop();
          }
          that.setData({
            dstList: dstList
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showModal: function(e) {
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    var array = e.currentTarget.dataset.array
    var that = this;
    that.setData({
      activeIndex: index,
      activeArray: array,
      activeType: type,
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
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    var that = this
    this.setData({
      inputVal: e.detail.value
    });
    console.log(e.detail.value)
    var city = ''
    if(this.data.activeArray == 'src'){
      city = this.data.srcCity
    }else if(this.data.activeArray == 'dst'){
      city = this.data.dstCity
    }
    console.log(city)
    wx.request({
      url: app.globalData.url + '/getPOI',
      data: {
        keywords: e.detail.value,
        city: city
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        var pois = res.data.result.pois
        var resultList = []
        for(var i = 0;i<pois.length;i++){
          var poiItem = pois[i]
          var resultItem = {
            cityName: poiItem.cityname,
            pName: poiItem.pname,
            name:poiItem.name,
            type: poiItem.type.replace(';/g',' · ')
          }
          resultList.push(resultItem)
        }
        that.setData({
          searchResult: resultList
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  searchResultClick: function(e){
    var value = e.currentTarget.dataset.value
    if(this.data.activeArray == 'src'){
      var list = this.data.srcList
      if(this.data.activeType = 'src'){
        list[this.data.activeIndex].src = value
      }else{
        list[this.data.activeIndex].dst = value 
      }
      this.setData({
        srcList: list
      })
    }else if(this.data.activeArray = 'dst'){
      var list = this.data.dstList
      if (this.data.activeType = 'src') {
        list[this.data.activeIndex].src = value
      } else {
        list[this.data.activeIndex].dst = value
      }
      this.setData({
        dstList: list
      })
    }
    this.hideModal()
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