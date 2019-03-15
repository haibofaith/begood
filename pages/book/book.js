// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    pageNo: 1,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'https://haibofaith.xyz/futureTwo/book/directory', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
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
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    const that = this;
    that.setData({
      pageNo: 1
    })
    wx.request({
      url: 'https://haibofaith.xyz/futureTwo/book/directory', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        // wx.hideLoading();
        console.log(res)
        that.setData({
          array: res.data.body
        })
        that.stopPullDownRefresh()
      }
      ,
      fail: function (res) {
        that.stopPullDownRefresh()
        // wx.hideLoading();
        // wx.navigateTo({
        //   url: '/pages/list/login'
        // })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    const that = this;
    that.setData({
      pageNo:that.data.pageNo+1
    })
    wx.request({
      url: 'https://haibofaith.xyz/futureTwo/book/directory', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        // wx.hideLoading();
        console.log(res)
        that.setData({
          array: that.data.array.concat(res.data.body)
        })
        that.stopPullDownRefresh()
      }
      ,
      fail: function (res) {
        that.stopPullDownRefresh();
        // wx.hideLoading();
        // wx.navigateTo({
        //   url: '/pages/list/login'
        // })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  stopPullDownRefresh:function() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  }
})