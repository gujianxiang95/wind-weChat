// pages/my/index.js
import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const classicModel = new ClassicModel()
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookcount:0,
    classics:null

  },
  //获取喜欢的数量
  getMyBookCount(){
    bookModel.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount: res.data.data[0].count
      })
    })
  },
  //获取用户信息
  getUserInfo(e){
    if(e.detail.errMsg){
    }
  },
  //判断用户是否授权
  userAuthorized() {
    const _this = this
    wx.getSetting({
      complete(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              _this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            },
          })
        }
      }
    })
  },
  //获取用户信息
  onGetUserInfo(e){
    const userInfo = e.detail.userInfo
    if (userInfo){
      this.setData({
        authorized: true,
        userInfo,
      })
    }
  },
  //跳转关于
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },
  //获取喜欢的书籍
  getMyfavor() {
    classicModel.getMyfavor(res => {
      this.setData({
        classics:res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyfavor()
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