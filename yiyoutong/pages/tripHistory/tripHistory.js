const app = getApp()
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    journeyIds: [],
    history:[
      { day: "15", month: "2", src: "成都双流机场", srcTime: "13:00", dst: "北京国安机场", dstTime: "16:00", isOver: true, isDirect: false }, 
      { day: "16", month: "2", src: "成都", srcTime: "13:00", dst: "北京", dstTime: "16:00", isOver: true, isDirect: false },
      { day: "17", month: "2", src: "成都", srcTime: "13:00", dst: "北京", dstTime: "16:00", isOver:false, isDirect: false}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(year)
    console.log(month)
    console.log(day)
    var that = this
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: app.globalData.url + '/getJourneyList',
          data: {
            userId: userId
          },
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) { 
            console.log(res)
            var journeys = res.data.result
            var history = []
            for(var i = 0;i<journeys.length;i++){
              var journeyItem = journeys[i]
              var historyItem = { 
                journeyId: journeyItem.journeyId,
                day: journeyItem.travelDate.split(' ')[0].split('-')[2], 
                month: journeyItem.travelDate.split(' ')[0].split('-')[1], 
                year: journeyItem.travelDate.split(' ')[0].split('-')[0],
                src: journeyItem.startCity, 
                dst: journeyItem.endCity, 
                transportation: JSON.parse(journeyItem.transportation)
              }
              switch(historyItem.month){
                case '01':
                  historyItem.month = '一'
                  break;
                case '02':
                  historyItem.month = '二'
                  break;
                case '03':
                  historyItem.month = '三'
                  break;
                case '04':
                  historyItem.month = '四'
                  break;
                case '05':
                  historyItem.month = '五'
                  break;
                case '06':
                  historyItem.month = '六'
                  break;
                case '07':
                  historyItem.month = '七'
                  break;
                case '08':
                  historyItem.month = '八'
                  break;
                case '09':
                  historyItem.month = '九'
                  break;
                case '10':
                  historyItem.month = '十'
                  break;
                case '11':
                  historyItem.month = '十一'
                  break;
                case '12':
                  historyItem.month = '十二'
                  break;
              }

              if(historyItem.year < year){
                historyItem.isOver = true
              }else if(historyItem.year == year){
                if(historyItem.month < month){
                  historyItem.isOver = true
                }else if(historyItem.month == month){
                  if(historyItem.day < day){
                    historyItem.isOver = true
                  }else{
                    historyItem.isOver = false
                  }
                }else{
                  historyItem.isOver = false
                }
              }else{
                historyItem.isOver = false
              }

              if (historyItem.transportation != undefined) {
                historyItem.isDirect = historyItem.transportation.isDirect
                if (historyItem.isDirect) {
                  historyItem.srcTime = historyItem.transportation.beginTime
                  historyItem.dstTime = historyItem.transportation.endTime
                } else if (!historyItem.isDirect) {
                  historyItem.srcTime = historyItem.transportation.firstTrip.beginTime
                  historyItem.dstTime = historyItem.transportation.secondTrip.endTime
                }
                history.push(historyItem)
              }

            }
            that.setData({
              history: history
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function(res) {
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

  },

  toTripDetail: function(e){
    var index = e.currentTarget.dataset.index
    var historyItem = this.data.history[index]
    var time = historyItem.year + '-' + historyItem.month + '-' + historyItem.day
    var item = historyItem.transportation
    var journeyId = historyItem.journeyId
    var isDirect = historyItem.isDirect
    if(isDirect){
      wx.navigateTo({
        url: '/pages/tripDetail/tripDetail' + '?item=' + JSON.stringify(item) + '&time=' + time + '&journeyId=' + journeyId
      })
    }else{
      wx.navigateTo({
        url: '/pages/tripDetailTwo/tripDetailTwo' + '?item=' + JSON.stringify(item) + '&time=' + time + '&journeyId=' + journeyId
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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