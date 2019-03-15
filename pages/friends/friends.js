// pages/friends/friends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: null,
    uuid: null,
    userlist:[],
    inputvalue:null
  },

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

  },
  bindKeyInput: function (e) {
    var inputstr = e.detail.value;
    if (inputstr != '') {
      this.data.nickName = inputstr;
    }
  },
  searchUser:function(e){
    const that = this;
    wx.request({
      url: 'https://haibofaith.xyz/futureTwo/c/searchUsersByNickName',
      data: {
        uuid: that.data.uuid,
        nickName: that.data.nickName
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res);
        if (res.data.retcode === 0) {
          that.setData({
            userlist: res.data.body
          })
        } else {

        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },
  selectUser:function(e){
    var current = e.target.dataset.nickname;
    const that = this;
    // var input = aLi.getElementById("input");
    that.setData({
      nickName: current,
      userlist:null,
      inputvalue:current
    });
    console.log(this.data.nickName);
  },
  certainShare: function (e) {
    if (this.nickName != null && this.nickName != '') {
      console.log("nickName=" + this.data.nickName);
    }
    const that = this
    wx.getStorage({
      key: 'uuid',
      success(res) {
        that.setData({
          uuid: res.data
        })
        wx.request({
          url: 'https://haibofaith.xyz/futureTwo/r/setRelation',
          data: {
            uuid: that.data.uuid,
            nickName: that.data.nickName
          },
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log("调用API成功");
            console.log(res);
            if (res.data.retcode === 0) {
              wx.showModal({
                title: '',
                content: '分享结果',
                showCancel: false,
                confirmText: '分享成功',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击主操作')
                  } else if (res.cancel) {
                    console.log('用户点击次要操作')
                  }
                }
              })
            } else {

            }
          },
          fail: function (res) {
            console.log("调用API失败");
          }
        })
      }
    })
  }
})