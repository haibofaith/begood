// pages/imglist/imglist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    uuid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '文件夹列表读取中',
      mask: true
    })
    const that = this
    wx.getStorage({
      key: 'uuid',
      success(res) {
        that.setData({
          uuid: res.data
        })
        wx.request({
          url: 'https://haibofaith.xyz/futureTwo/b/picParentPathList', // 仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            uuid: that.data.uuid
          },
          header: {
        'content-type':'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            wx.hideLoading();
            console.log(res)
            console.log(that.data.uuid)
            that.setData({
              array: res.data.body
            })
          }
          ,
          fail: function (res) {
            wx.hideLoading();
            // wx.navigateTo({
            //   url: '/pages/list/login'
            // })
          }
        })
        // console.log(that.data.openid)
      }
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