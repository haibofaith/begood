// pages/imgshow/imgshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateStr: null,
    imglist: [],
    imgStrs:[],
    uuid: null, 
    friendOpenid:null
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    // var pos = that.data.imglist.indexOf(current);
    // var realCurrent = that.data.imglist[pos].imgUrl();
    // console.log(current);
    console.log(this.data.imgStrs);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgStrs // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.setData({
      dateStr: options.dateStr,
      friendOpenid: options.openid
    })
    console.log(this.data.dateStr)
    console.log(this.data.friendOpenid)
    wx.getStorage({
      key: 'uuid',
      success(res) {
        that.setData({
          uuid: res.data
        })
        console.log(that.data.uuid)
        wx.request({
          url: 'https://haibofaith.xyz/futureTwo/b/friendPicUrlList/' + that.data.dateStr, // 仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            uuid: that.data.uuid,
            friendOpenid: that.data.friendOpenid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res)
            that.setData({
              imglist: res.data.body
            })
            for(var i=0;i<that.data.imglist.length;i++){
              that.data.imgStrs[i] = that.data.imglist[i].imgUrl;
            }
            console.log(that.data.imgStrs);
          }
        })
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