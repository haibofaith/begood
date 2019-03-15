// pages/newlogin/newlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:null,
    src: '../resources/weixin.png',
    header:'../resources/header.jpeg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       // 发起网络请求
    //       wx.request({
    //         url: 'https://haibofaith.xyz/futureTwo/c/onLogin',
    //         data: {
    //           code: res.code
    //         },
    //         success: function (res) {
    //           console.log("调用onLogin成功");
    //           console.log(res);
    //           if (res.data.retcode === 0) {
    //             wx.setStorage({
    //               key: 'uuid',
    //               data: res.data.body
    //             })
    //             wx.redirectTo({
    //             url: '/pages/funclist/list'
    //             })
    //           } else {

    //           }
    //         },
    //         fail: function (res) {
    //           console.log("调用onLogin失败");
    //           // wx.navigateTo({
    //           //   url: '/pages/list/login'
    //           // })
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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
  onGotUserInfo(e) {
    console.log(e.detail.userInfo)
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    if(e.detail.userInfo.nickName!=null){
      const that = this;
      // wx.getStorage({
      //   key: 'uuid',
      //   success(res) {
      //     that.setData({
      //       uuid: res.data
      //     })
      //     // console.log(that.data.openid)
      //   }
      // })
      // if (that.data.uuid != null) {
      //   wx.navigateTo({
      //     url: '/pages/funclist/list'
      //   })
      // } else {
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: 'https://haibofaith.xyz/futureTwo/c/onLogin',
                data: {
                  code: res.code,
                  nickName:e.detail.userInfo.nickName,
                  avatarUrl: e.detail.userInfo.avatarUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
                },
                method:'POST',
                success: function (res) {
                  wx.hideLoading();
                  console.log("调用onLogin成功");
                  console.log(res);
                  if (res.data.retcode == 0) {
                    wx.setStorage({
                      key: 'uuid',
                      data: res.data.body
                    })
                    wx.redirectTo({
                      url: '/pages/funclist/list'
                    })
                  } else {

                  }
                },
                fail: function (res) {
                  console.log("调用onLogin失败");
                  wx.hideLoading();
                  // wx.navigateTo({
                  //   url: '/pages/list/login'
                  // })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      // }
    }
  },
})