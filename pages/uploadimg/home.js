const sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album']
]
const sizeType = [
  ['compressed'],
  ['original'],
  ['compressed', 'original']
]

Page({
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'page/API/pages/image/image'
    }
  },

  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    uuid: null,
    ok: true

  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'uuid',
      success(res) {
        that.setData({
          uuid: res.data
        })
        // console.log(that.data.openid)
      }
    })
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current: '',
      urls: this.data.imageList
    })
  },
  uploader(e) {
    var tempFilePaths = this.data.imageList;
    var j = 0;
    if (tempFilePaths.length == 0) {
      wx.showModal({
        title: '',
        content: '请选择图片',
        showCancel: false,
        confirmText: '我知道了',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击主操作')
          } else if (res.cancel) {
            console.log('用户点击次要操作')
          }
        }
      })
    } else {
      wx.showLoading({
        title: '上传图片中',
        mask: true
      })
      for (var i = 0; i < tempFilePaths.length; i++) {
        var that = this
        wx.uploadFile({
          url: 'https://haibofaith.xyz/futureTwo/b/doUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[i],
          name: 'file',
          formData: {
            'uuid': that.data.uuid
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            var data = res.data
            console.log("调用API成功" + that.data.uuid);
            console.log("调用API成功" + data);
            j++;

            //do something
            if (j == tempFilePaths.length) {
              wx.showModal({
                title: '',
                content: '图片全部上传成功',
                showCancel: false,
                confirmText: '我知道了',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击主操作')
                  } else if (res.cancel) {
                    console.log('用户点击次要操作')
                  }
                }
              })
              wx.hideLoading();
            }
          },
          fail: function (res) {
            console.log("调用API失败");
            wx.hideLoading();
          }
        })
      }
      if (j == tempFilePaths.length) {
        wx.showModal({
          title: '',
          content: '图片全部上传成功',
          showCancel: false,
          confirmText: '我知道了',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击主操作')
            } else if (res.cancel) {
              console.log('用户点击次要操作')
            }
          }
        })
      }
    }
  }
})