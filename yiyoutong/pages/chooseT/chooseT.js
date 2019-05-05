// pages/page2-chooseD/chooseD.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '成都',  //出发城市
    end: '北京',    //目的城市
    currentSelectSortType: 'SortMoren',
    testArray1:[
      { 
        id: 1, 
        isDirect: true, 
        beginTime: '07:20', 
        endTime: '10:30', 
        price: 1300, 
        beginPlace:'禄口国际机场',
        endPlace:'双流国际机场', 
        spend_time:'3时10分',
        type:'飞机',
      },
      { 
        id: 2, 
        isDirect:false,
        type:'飞机转飞机',
        "firstTrip":{
          'beginTime': '08:20',
          'endTime' : '10:20',
          'beginPlace': '禄口国际机场',
          'endPlace': '咸阳国际机场', 
          'beginCity':'南京',
          'endCity':'西安',
          'price': 680,
          'spend_time': '2时',
          },
        "secondTrip": {
          'beginTime': '10:32',
          'endTime': '15:25',
          'beginPlace': '咸阳国际机场',
          'endPlace': '双流国际机场',
          'beginCity': '西安',
          'endCity': '成都',
          'price': 500,
          'spend_time': '4时53分',
        }, 
        total_spendTime: '7时5分',
        totalPrice:1180,
        },
      ]
  },
  toTripDetail: function(e){
    wx.navigateTo({
      url: '/pages/tripDetail/tripDetail',
    })
  },

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
    console.log(options)
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