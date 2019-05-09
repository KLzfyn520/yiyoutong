// pages/page2-chooseD/chooseD.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: '',
    winHeight: '',
    type: 0,
    begin: '成都', //出发城市
    end: '北京', //目的城市
    currentSelectTripType: 'moren',
    currentSelectSortType: '4',
    array: [],
    morenArray: [],
    feijiArray: [],
    huocheArray: [],
    zhongzhuanArray: [],
    hideToast: true,
    activeIndex: 0,
  },
  toTripDetail: function(e) {
    var index = e.currentTarget.dataset.index
    var arrayItem = this.data.array[index]
    wx.navigateTo({
      url: '/pages/tripDetail/tripDetail' + '?item=' + JSON.stringify(arrayItem) + '&time=' + this.data.time
    })
  },
  toTripDetailT: function(e) {
    var index = e.currentTarget.dataset.index
    var arrayItem = this.data.array[index]
    wx.navigateTo({
      url: '/pages/tripDetailTwo/tripDetailTwo' + '?item=' + JSON.stringify(arrayItem) + '&time=' + this.data.time
    })
  },
  //请求函数
  requestAll: function(order){
    var that = this
    wx.request({
      url: app.globalData.url + '/getComprehensiveList' + '?from=' + that.data.begin + '&to=' + that.data.end + '&order=' + order + '&type=' + that.data.type,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        var data = res.data
        var array = []
        for (var i = 0; i < 30; i++) {
          var resItem = data[i]
          var item = {}
          if (resItem.flight != undefined) {
            item = {
              id: i,
              isDirect: true,
              beginTime: resItem.flight.depDate.split(' ')[1].slice(0, 5),
              endTime: resItem.flight.arrDate.split(' ')[1].slice(0, 5),
              price: resItem.totalPrice,
              beginPlace: resItem.flight.depAirportName,
              endPlace: resItem.flight.arrAirportName,
              beginCity: resItem.flight.depCityName,
              endCity: resItem.flight.arrCityName,
              spend_time: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              type: '飞机',
              number: resItem.flight.flightNumber
            }
          } else if (resItem.oneway != undefined) {
            item = {
              id: i,
              isDirect: true,
              beginTime: resItem.oneway.depTime,
              endTime: resItem.oneway.arrTime,
              price: resItem.totalPrice,
              beginPlace: resItem.oneway.fromStation.tsZh,
              endPlace: resItem.oneway.toStation.tsZh,
              beginCity: resItem.oneway.fromStation.cityName,
              endCity: resItem.oneway.toStation.cityName,
              spend_time: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              type: '火车',
              number: resItem.oneway.trainNo
            }
          } else if (resItem.doubleFight != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '飞机转飞机',
              firstTrip: {
                beginTime: resItem.doubleFight.firstTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.doubleFight.firstTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.doubleFight.firstTrip.depAirportName,
                endPlace: resItem.doubleFight.firstTrip.arrAirportName,
                beginCity: resItem.doubleFight.firstTrip.depCityName,
                endCity: resItem.doubleFight.firstTrip.arrCityName,
                price: resItem.doubleFight.firstTrip.price,
                spend_time: Math.floor(resItem.doubleFight.firstTrip.durations / 60) + '时' + resItem.doubleFight.firstTrip.durations % 60 + '分',
                number: resItem.doubleFight.firstTrip.flightNumber
              },
              secondTrip: {
                beginTime: resItem.doubleFight.secondTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.doubleFight.secondTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.doubleFight.secondTrip.depAirportName,
                endPlace: resItem.doubleFight.secondTrip.arrAirportName,
                beginCity: resItem.doubleFight.secondTrip.depCityName,
                endCity: resItem.doubleFight.secondTrip.arrCityName,
                price: resItem.doubleFight.secondTrip.price,
                spend_time: Math.floor(resItem.doubleFight.secondTrip.durations / 60) + '时' + resItem.doubleFight.secondTrip.durations % 60 + '分',
                number: resItem.doubleFight.secondTrip.flightNumber
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.doubleWay != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '火车转火车',
              firstTrip: {
                beginTime: resItem.doubleWay.firstTrip.depTime,
                endTime: resItem.doubleWay.firstTrip.arrTime,
                beginPlace: resItem.doubleWay.firstTrip.fromStation.tsZh,
                endPlace: resItem.doubleWay.firstTrip.toStation.tsZh,
                beginCity: resItem.doubleWay.firstTrip.fromStation.cityName,
                endCity: resItem.doubleWay.firstTrip.toStation.cityName,
                price: resItem.doubleWay.firstTrip.price,
                spend_time: Math.floor(resItem.doubleWay.firstTrip.durations / 60) + '时' + resItem.doubleWay.firstTrip.durations % 60 + '分',
                number: resItem.doubleWay.firstTrip.trainNo
              },
              secondTrip: {
                beginTime: resItem.doubleWay.secondTrip.depTime,
                endTime: resItem.doubleWay.secondTrip.arrTime,
                beginPlace: resItem.doubleWay.secondTrip.fromStation.tsZh,
                endPlace: resItem.doubleWay.secondTrip.toStation.tsZh,
                beginCity: resItem.doubleWay.secondTrip.fromStation.cityName,
                endCity: resItem.doubleWay.secondTrip.toStation.cityName,
                price: resItem.doubleWay.secondTrip.price,
                spend_time: Math.floor(resItem.doubleWay.secondTrip.durations / 60) + '时' + resItem.doubleWay.secondTrip.durations % 60 + '分',
                number: resItem.doubleWay.secondTrip.trainNo
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.trainToFlight != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '火车转飞机',
              firstTrip: {
                beginTime: resItem.trainToFlight.firstTrip.depTime,
                endTime: resItem.trainToFlight.firstTrip.arrTime,
                beginPlace: resItem.trainToFlight.firstTrip.fromStation.tsZh,
                endPlace: resItem.trainToFlight.firstTrip.toStation.tsZh,
                beginCity: resItem.trainToFlight.firstTrip.fromStation.cityName,
                endCity: resItem.trainToFlight.firstTrip.toStation.cityName,
                price: resItem.trainToFlight.firstTrip.price,
                spend_time: Math.floor(resItem.trainToFlight.firstTrip.durations / 60) + '时' + resItem.trainToFlight.firstTrip.durations % 60 + '分',
                number: resItem.trainToFlight.firstTrip.trainNo
              },
              secondTrip: {
                beginTime: resItem.trainToFlight.secondTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.trainToFlight.secondTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.trainToFlight.secondTrip.depAirportName,
                endPlace: resItem.trainToFlight.secondTrip.arrAirportName,
                beginCity: resItem.trainToFlight.secondTrip.depCityName,
                endCity: resItem.trainToFlight.secondTrip.arrCityName,
                price: resItem.trainToFlight.secondTrip.price,
                spend_time: Math.floor(resItem.trainToFlight.secondTrip.durations / 60) + '时' + resItem.trainToFlight.secondTrip.durations % 60 + '分',
                number: resItem.trainToFlight.secondTrip.flightNumber
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.flightToTrain != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '飞机转火车',
              firstTrip: {
                beginTime: resItem.flightToTrain.firstTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.flightToTrain.firstTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.flightToTrain.firstTrip.depAirportName,
                endPlace: resItem.flightToTrain.firstTrip.arrAirportName,
                beginCity: resItem.flightToTrain.firstTrip.depCityName,
                endCity: resItem.flightToTrain.firstTrip.arrCityName,
                price: resItem.flightToTrain.firstTrip.price,
                spend_time: Math.floor(resItem.flightToTrain.firstTrip.durations / 60) + '时' + resItem.flightToTrain.firstTrip.durations % 60 + '分',
                number: resItem.flightToTrain.firstTrip.flightNumber
              },
              secondTrip: {
                beginTime: resItem.flightToTrain.secondTrip.depTime,
                endTime: resItem.flightToTrain.secondTrip.arrTime,
                beginPlace: resItem.flightToTrain.secondTrip.fromStation.tsZh,
                endPlace: resItem.flightToTrain.secondTrip.toStation.tsZh,
                beginCity: resItem.flightToTrain.secondTrip.fromStation.cityName,
                endCity: resItem.flightToTrain.secondTrip.toStation.cityName,
                price: resItem.flightToTrain.secondTrip.price,
                spend_time: Math.floor(resItem.flightToTrain.secondTrip.durations / 60) + '时' + resItem.flightToTrain.secondTrip.durations % 60 + '分',
                number: resItem.flightToTrain.secondTrip.trainNo
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          }
          array.push(item)
        }
        that.setData({
          array: array,
          morenArray: array,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  requestFlight: function(order){
    var that = this
    wx.request({
      url: app.globalData.url + '/getDirectFlight' + '?from=' + that.data.begin + '&to=' + that.data.end + '&order=' + order,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var array = []
        for (var i = 0; i < 30; i++) {
          var resItem = res.data[i]
          var item = {}
          item = {
            id: i,
            isDirect: true,
            beginTime: resItem.depDate.split(' ')[1].slice(0, 5),
            endTime: resItem.arrDate.split(' ')[1].slice(0, 5),
            price: resItem.price,
            beginPlace: resItem.depAirportName,
            endPlace: resItem.arrAirportName,
            beginCity: resItem.depCityName,
            endCity: resItem.arrCityName,
            spend_time: Math.floor(resItem.durations / 60) + '时' + resItem.durations % 60 + '分',
            type: '飞机',
            number: resItem.flightNumber
          }
          array.push(item)
        }
        that.setData({
          array: array,
          feijiArray: array
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  requestTrain: function(order){
    var that = this
    wx.request({
      url: app.globalData.url + '/getDirectTrain' + '?from=' + that.data.begin + '&to=' + that.data.end + '&order=' + order,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        var array = []
        for (var i = 0; i < res.data.length; i++) {
          var resItem = res.data[i]
          var item = {}
          item = {
            id: i,
            isDirect: true,
            beginTime: resItem.depTime,
            endTime: resItem.arrTime,
            price: resItem.price,
            beginPlace: resItem.fromStation.tsZh,
            endPlace: resItem.toStation.tsZh,
            beginCity: resItem.fromStation.cityName,
            endCity: resItem.toStation.cityName,
            spend_time: Math.floor(resItem.durations / 60) + '时' + resItem.durations % 60 + '分',
            type: '火车',
            number: resItem.trainNo
          }
          array.push(item)
        }
        that.setData({
          array: array,
          huocheArray: array,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  requestTransit: function(order){
    var that = this
    wx.request({
      url: app.globalData.url + '/getTransfer' + '?from=' + that.data.begin + '&to=' + that.data.end + '&order=' + order,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var array = []
        for (var i = 0; i < 30; i++) {
          var resItem = res.data[i]
          var item = {}
          if (resItem.doubleFight != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '飞机转飞机',
              firstTrip: {
                beginTime: resItem.doubleFight.firstTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.doubleFight.firstTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.doubleFight.firstTrip.depAirportName,
                endPlace: resItem.doubleFight.firstTrip.arrAirportName,
                beginCity: resItem.doubleFight.firstTrip.depCityName,
                endCity: resItem.doubleFight.firstTrip.arrCityName,
                price: resItem.doubleFight.firstTrip.price,
                spend_time: Math.floor(resItem.doubleFight.firstTrip.durations / 60) + '时' + resItem.doubleFight.firstTrip.durations % 60 + '分',
                number: resItem.doubleFight.firstTrip.flightNumber
              },
              secondTrip: {
                beginTime: resItem.doubleFight.secondTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.doubleFight.secondTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.doubleFight.secondTrip.depAirportName,
                endPlace: resItem.doubleFight.secondTrip.arrAirportName,
                beginCity: resItem.doubleFight.secondTrip.depCityName,
                endCity: resItem.doubleFight.secondTrip.arrCityName,
                price: resItem.doubleFight.secondTrip.price,
                spend_time: Math.floor(resItem.doubleFight.secondTrip.durations / 60) + '时' + resItem.doubleFight.secondTrip.durations % 60 + '分',
                number: resItem.doubleFight.secondTrip.flightNumber
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.doubleWay != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '火车转火车',
              firstTrip: {
                beginTime: resItem.doubleWay.firstTrip.depTime,
                endTime: resItem.doubleWay.firstTrip.arrTime,
                beginPlace: resItem.doubleWay.firstTrip.fromStation.tsZh,
                endPlace: resItem.doubleWay.firstTrip.toStation.tsZh,
                beginCity: resItem.doubleWay.firstTrip.fromStation.cityName,
                endCity: resItem.doubleWay.firstTrip.toStation.cityName,
                price: resItem.doubleWay.firstTrip.price,
                spend_time: Math.floor(resItem.doubleWay.firstTrip.durations / 60) + '时' + resItem.doubleWay.firstTrip.durations % 60 + '分',
                number: resItem.doubleWay.firstTrip.trainNo
              },
              secondTrip: {
                beginTime: resItem.doubleWay.secondTrip.depTime,
                endTime: resItem.doubleWay.secondTrip.arrTime,
                beginPlace: resItem.doubleWay.secondTrip.fromStation.tsZh,
                endPlace: resItem.doubleWay.secondTrip.toStation.tsZh,
                beginCity: resItem.doubleWay.secondTrip.fromStation.cityName,
                endCity: resItem.doubleWay.secondTrip.toStation.cityName,
                price: resItem.doubleWay.secondTrip.price,
                spend_time: Math.floor(resItem.doubleWay.secondTrip.durations / 60) + '时' + resItem.doubleWay.secondTrip.durations % 60 + '分',
                number: resItem.doubleWay.secondTrip.trainNo
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.trainToFlight != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '火车转飞机',
              firstTrip: {
                beginTime: resItem.trainToFlight.firstTrip.depTime,
                endTime: resItem.trainToFlight.firstTrip.arrTime,
                beginPlace: resItem.trainToFlight.firstTrip.fromStation.tsZh,
                endPlace: resItem.trainToFlight.firstTrip.toStation.tsZh,
                beginCity: resItem.trainToFlight.firstTrip.fromStation.cityName,
                endCity: resItem.trainToFlight.firstTrip.toStation.cityName,
                price: resItem.trainToFlight.firstTrip.price,
                spend_time: Math.floor(resItem.trainToFlight.firstTrip.durations / 60) + '时' + resItem.trainToFlight.firstTrip.durations % 60 + '分',
                number: resItem.trainToFlight.firstTrip.trainNo
              },
              secondTrip: {
                beginTime: resItem.trainToFlight.secondTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.trainToFlight.secondTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.trainToFlight.secondTrip.depAirportName,
                endPlace: resItem.trainToFlight.secondTrip.arrAirportName,
                beginCity: resItem.trainToFlight.secondTrip.depCityName,
                endCity: resItem.trainToFlight.secondTrip.arrCityName,
                price: resItem.trainToFlight.secondTrip.price,
                spend_time: Math.floor(resItem.trainToFlight.secondTrip.durations / 60) + '时' + resItem.trainToFlight.secondTrip.durations % 60 + '分',
                number: resItem.trainToFlight.secondTrip.flightNumber
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          } else if (resItem.flightToTrain != undefined) {
            item = {
              id: i,
              hidden: true,
              isDirect: false,
              type: '飞机转火车',
              firstTrip: {
                beginTime: resItem.flightToTrain.firstTrip.depDate.split(' ')[1].slice(0, 5),
                endTime: resItem.flightToTrain.firstTrip.arrDate.split(' ')[1].slice(0, 5),
                beginPlace: resItem.flightToTrain.firstTrip.depAirportName,
                endPlace: resItem.flightToTrain.firstTrip.arrAirportName,
                beginCity: resItem.flightToTrain.firstTrip.depCityName,
                endCity: resItem.flightToTrain.firstTrip.arrCityName,
                price: resItem.flightToTrain.firstTrip.price,
                spend_time: Math.floor(resItem.flightToTrain.firstTrip.durations / 60) + '时' + resItem.flightToTrain.firstTrip.durations % 60 + '分',
                number: resItem.flightToTrain.firstTrip.flightNumber
              },
              secondTrip: {
                beginTime: resItem.flightToTrain.secondTrip.depTime,
                endTime: resItem.flightToTrain.secondTrip.arrTime,
                beginPlace: resItem.flightToTrain.secondTrip.fromStation.tsZh,
                endPlace: resItem.flightToTrain.secondTrip.toStation.tsZh,
                beginCity: resItem.flightToTrain.secondTrip.fromStation.cityName,
                endCity: resItem.flightToTrain.secondTrip.toStation.cityName,
                price: resItem.flightToTrain.secondTrip.price,
                spend_time: Math.floor(resItem.flightToTrain.secondTrip.durations / 60) + '时' + resItem.flightToTrain.secondTrip.durations % 60 + '分',
                number: resItem.flightToTrain.secondTrip.trainNo
              },
              total_spendTime: Math.floor(resItem.totalTime / 60) + '时' + resItem.totalTime % 60 + '分',
              totalPrice: resItem.totalPrice,
            }
          }
          array.push(item)
        }
        that.setData({
          array: array,
          zhongzhuanArray: array,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //设置交通工具按钮选中状态------------------
  selectedMoren: function(e) {
    if (this.data.currentSelectTripType != e.currentTarget.dataset.id) {
      var array = this.data.morenArray
      if (array.length != 0) {
        this.setData({
          array: array,
          currentSelectTripType: e.currentTarget.dataset.id
        })
      }
    }
  },
  selectedFeiJi: function(e) {
    if (this.data.currentSelectTripType != e.currentTarget.dataset.id) {
      var that = this
      var currentSelectSortType = that.data.currentSelectSortType
      that.requestFlight(currentSelectSortType)
      that.setData({
        currentSelectTripType: e.currentTarget.dataset.id
      })
    }
  },
  selectedHuoChe: function(e) {
    if (this.data.currentSelectTripType != e.currentTarget.dataset.id) {
      var that = this
      var currentSelectSortType = that.data.currentSelectSortType
      that.requestTrain(currentSelectSortType)
      that.setData({
        currentSelectTripType: e.currentTarget.dataset.id
      })
    }
  },
  selectedZhongZhuan: function(e) {
    if (this.data.currentSelectTripType != e.currentTarget.dataset.id) {
      var that = this
      var currentSelectSortType = that.data.currentSelectSortType
      that.requestTransit(currentSelectSortType)
      that.setData({
        currentSelectTripType: e.currentTarget.dataset.id
      })
    }
  },
  //-----------------------设置交通工具按钮选中状态结束-----------------------

  //设置排序按钮选中状态+点击按钮重新选择列表------------
  selectedSortMoren: function(e) {
    var that = this
    var currentSelectTripType = this.data.currentSelectTripType
    switch (currentSelectTripType) {
      case 'moren':
        that.requestAll(4)
        break
      case 'feiji':
        that.requestFlight(4)
        break;
      case 'huoche':
        that.requestTrain(4)
        break;
      case 'zhongzhuan':
        that.requestTransit(4)
        break;
    }
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortPrice: function(e) {
    var that = this
    var currentSelectTripType = this.data.currentSelectTripType
    switch (currentSelectTripType) {
      case 'moren':
        that.requestAll(2)
        break
      case 'feiji':
        that.requestFlight(2)
        break;
      case 'huoche':
        that.requestTrain(2)
        break;
      case 'zhongzhuan':
        that.requestTransit(2)
        break;
    }
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortDuration: function(e) {
    var that = this
    var currentSelectTripType = this.data.currentSelectTripType
    switch (currentSelectTripType) {
      case 'moren':
        that.requestAll(1)
        break
      case 'feiji':
        that.requestFlight(1)
        break;
      case 'huoche':
        that.requestTrain(1)
        break;
      case 'zhongzhuan':
        that.requestTransit(1)
        break;
    }
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortTime: function(e) {
    var that = this
    var currentSelectTripType = this.data.currentSelectTripType
    switch (currentSelectTripType) {
      case 'moren':
        that.requestAll(3)
        break
      case 'feiji':
        that.requestFlight(3)
        break;
      case 'huoche':
        that.requestTrain(3)
        break;
      case 'zhongzhuan':
        that.requestTransit(3)
        break;
    }
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortHot: function(e) {
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  //----------------------设置排序按钮选中状态+点击按钮重新选择列表结束--------------------------

  showToast: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      hideToast: false,
    })
  },
  hideToast: function() {
    this.setData({
      hideToast: true,
    })
  },
  chooseTrip: function(e) {
    var index = e.currentTarget.dataset.index
    var arrayItem = this.data.array[this.data.activeIndex]
    console.log(this.data.array.length)
    console.log(this.data.activeIndex)
    if (index == 1) {
      var begin = arrayItem.firstTrip.beginPlace
      var end = arrayItem.firstTrip.endPlace
      var bcity = arrayItem.firstTrip.beginCity
      var ecity = arrayItem.firstTrip.endCity
      var btime = arrayItem.firstTrip.beginTime
      var etime = arrayItem.firstTrip.endTime
      var type = arrayItem.type.split('转')[0]
      var number = arrayItem.firstTrip.number
    } else if (index == 2) {
      var begin = arrayItem.secondTrip.beginPlace
      var end = arrayItem.secondTrip.endPlace
      var bcity = arrayItem.secondTrip.beginCity
      var ecity = arrayItem.secondTrip.endCity
      var btime = arrayItem.secondTrip.beginTime
      var etime = arrayItem.secondTrip.endTime
      var type = arrayItem.type.split('转')[1]
      var number = arrayItem.secondTrip.number
    }
    wx.navigateTo({
      url: '/pages/tripDetail/tripDetail' + '?begin=' + begin + '&end=' + end + '&btime=' + btime + '&etime=' + etime + '&bcity=' + bcity + '&ecity=' + ecity + '&type=' + type + '&number=' + number + '&time=' + this.data.time,
    })
    this.hideToast()
  },

  showDetail: function(e) {

    var index = e.currentTarget.dataset.index
    var array = this.data.array
    array[index].hidden = !array[index].hidden
    this.setData({
      array: array
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
    var begin = options.begin
    var end = options.end
    var type = options.type
    //年-月-日 例如2019-9-5
    var time = options.time
    that.setData({
      begin: begin,
      end: end,
      type: type,
      time: time
    })
    that.requestAll(4)
    wx.getSystemInfo({
      success: function(res) {

        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
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