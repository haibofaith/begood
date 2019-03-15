// This is our App Service.
// This is our data.
const helloData = {
  name: 'WeChat'
}

// Register a Page.
Page({
  data:{ 
    home_header: '../resources/home_header.jpg'
  },
  navigateToUpload() {
    wx.navigateTo({ url: '/pages/uploadimg/home'})
  },
  navigateToImg() {
    wx.navigateTo({ url: '/pages/imglist/imglist' })
  },
  navigateToShare(){
    wx.navigateTo({ url: '/pages/friends/friends' })
  },
  navigateToFriends(){
    wx.navigateTo({ url: '/pages/friendlist/friendlist' })
  }
  ,
  navigateToOther() {
    wx.navigateTo({ url: '/pages/other/other' })
  },
  navigateToReadBooks() {
    wx.navigateTo({ url: '/pages/book/book' })
  },
  navigateToAddQuestion(){
    wx.navigateTo({ url: '/pages/addQuestion/addQuestion' })
  },
  onPullDownRefresh() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  }
})