// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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

  },
  nameInput:function(e){
    var name = e.detail.value;
    if(name!=''){
      this.username = name;
    }
    // console.log("用户名" + this.username);
  },
  pwdInput: function (e) {
    var pwd = e.detail.value;
    if (pwd != '') {
      this.password = pwd;
    }
    // console.log("密码" + this.password);
  },
  login:function(e){
    console.log("用户名" + this.username+" "+"密码" + this.password);
    wx.request({
      url: 'https://haibofaith.xyz/futureTwo/c/login',
      data:{
        username:this.username,
        password:this.password,
      },
      method:'post',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log("调用API成功");
        console.log(res);
        if (res.data.retcode === 0) {
          wx.navigateTo({
            url: '/pages/funclist/list'
          })
        } else {
          
        }
      },
      fail: function (res) {
        console.log("调用API失败");
        // wx.navigateTo({
        //   url: '/pages/list/login'
        // })
      }
    })
  }

})