// pages/page2-chooseD/chooseD.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '成都',  //出发城市
    end: '北京',    //目的城市
    currentSelectTripType: 'moren',
    currentSelectSortType: 'SortMoren',
    testArray1:[
      { id: 1, time1: '07:20', time2: '10:20', prize: 1300, img:'../../icons/火车.png',spend_time:'3小时'},
      { id: 2, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 3, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 4, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 5, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 6, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      ]
  },
  toTripDetail: function(e){
    wx.navigateTo({
      url: '/pages/tripDetail/tripDetail',
    })
  },
  //设置交通工具按钮选中状态+点击按钮重新选择列表------------
  selectedMoren: function (e) {
    var array = this.data.testArray1
    var testArray2 = [
      { id: 1, time1: '06:20', time2: '10:20', prize: 1300, img: '../../icons/火车.png', spend_time: '4小时' },
      { id: 2, time1: '07:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '3小时' },
      { id: 3, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 4, time1: '09:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '1小时' },
      { id: 5, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 6, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
    ]
    for (var i = 0; i <= 5; i++) {
      array[i] = testArray2[i]
    }
    this.setData({
      testArray1: array,
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selectedFeiJi: function (e) {
    var array = this.data.testArray1
    var testArray2 = [
      { id: 1, time1: '06:20', time2: '10:20', prize: 1300, img: '../../icons/飞机.png', spend_time: '4小时' },
      { id: 2, time1: '07:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '3小时' },
      { id: 3, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 4, time1: '09:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '1小时' },
      { id: 5, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
      { id: 6, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/飞机.png', spend_time: '2小时' },
    ]
    for (var i = 0; i <= 5; i++) {
      array[i] = testArray2[i]
    }
    this.setData({
      testArray1: array,
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selectedHuoChe: function (e) {
    var array = this.data.testArray1
    var testArray2 = [
      { id: 1, time1: '06:20', time2: '10:20', prize: 1300, img: '../../icons/火车.png', spend_time: '4小时' },
      { id: 2, time1: '07:20', time2: '10:20', prize: 1500, img: '../../icons/火车.png', spend_time: '3小时' },
      { id: 3, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/火车.png', spend_time: '2小时' },
      { id: 4, time1: '09:20', time2: '10:20', prize: 1500, img: '../../icons/火车.png', spend_time: '1小时' },
      { id: 5, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/火车.png', spend_time: '2小时' },
      { id: 6, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/火车.png', spend_time: '2小时' },
    ]
    for (var i = 0; i <= 5; i++) {
      array[i] = testArray2[i]
    }
    this.setData({
      testArray1: array,
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selectedQiChe: function (e) {
    var array = this.data.testArray1
    var testArray2 = [
      { id: 1, time1: '06:20', time2: '10:20', prize: 1300, img: '../../icons/巴士.png', spend_time: '4小时' },
      { id: 2, time1: '07:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '3小时' },
      { id: 3, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '2小时' },
      { id: 4, time1: '09:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '1小时' },
      { id: 5, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '2小时' },
      { id: 6, time1: '08:20', time2: '10:20', prize: 1500, img: '../../icons/巴士.png', spend_time: '2小时' },
    ]
    for (var i = 0; i <= 5; i++) {
      array[i] = testArray2[i]
    }
    this.setData({
      testArray1: array,
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  //-----------------------设置交通工具按钮选中状态+点击按钮重新选择列表结束-----------------------

  //设置排序按钮选中状态+点击按钮重新选择列表------------
  selectedSortMoren:function(e){
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortPrice: function (e) {
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortDuration: function (e) {
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortTime: function (e) {
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  selectedSortHot: function (e) {
    this.setData({
      currentSelectSortType: e.currentTarget.dataset.id
    })
  },
  //----------------------设置排序按钮选中状态+点击按钮重新选择列表结束--------------------------
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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