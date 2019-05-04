Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      {name:"zhangsan",age:"1"},
      {name:"wangwu",age:"2"},
      { name: "zhangsang", age: "3" },
      { name: "wangwun", age: "4" },
      { name: "zhansan", age: "5" },
    ],
    viewId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  load: function() {
    //获取data里的array
    var array = this.data.array
    var items = [
      { name: "wanwu", age: "6" },
      { name: "zhasan", age: "7" },
      { name: "wanwun", age: "8" },
      { name: "zasa", age: "9" },
      { name: "wawu", age: "10" }
    ]
    // 向array添加元素
    for(var i = 0;i<5;i++){
      array.push(items[i])
    }
    // 将修改过的array赋值回去，并且改变锚点的位置，达到翻页的效果
    this.setData({
      array: array,
      viewId: "wanwu"
    })
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