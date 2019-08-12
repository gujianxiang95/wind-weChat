// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false,//控制显示真正的评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求接口，获取初始化数据
    const id = options.bid
    const detail = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)

    detail.then(res => {
      this.setData({
        book:res.data.data[0]
      })
      console.log(res.data.data[0])
    })
    comments.then(res => {
      this.setData({
        comments: res.data.data.comment
      })
      console.log(res.data.data.comment)
    })

    likeStatus.then(res => {
      this.setData({
        likeStatus: res.data.data[0].like_status,
        likeCount: res.data.data[0].fav_nums,
      })
      console.log(res.data.data[0])
    })
  },
  onLike(e){
    const like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },
  //显示真正评论页面
  onFakePost(e){
    console.log(this.data.posting)
    this.setData({
      posting:true
    })
  },
  //取消评论
  oonCancel(){
    console.log(this.data.posting)
    this.setData({
      posting: false
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