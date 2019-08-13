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
    comments:[],//短评数据
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false,//控制显示真正的评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading',
    })
    //请求接口，获取初始化数据
    const id = options.bid
    const detail = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    //合并promise请求
    Promise.all([detail, comments, likeStatus]).then(res=>{
      console.log(res)
      this.setData({
        book:res[0].data.data[0],
        likeStatus: res[0].data.data[0].like_status,
        comments: res[1].data.data.comment,
        likeCount: res[2].data.data[0].fav_nums,

      })
      wx.hideLoading()
    })

    // detail.then(res => {
    //   this.setData({
    //     book:res.data.data[0]
    //   })
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.data.data.comment
    //   })
    // })
    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.data.data[0].like_status,
    //     likeCount: res.data.data[0].fav_nums,
    //   })
    // })

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
  //接收短评
  onPost(e){
    const comment = e.detail.text || e.detail.value
    // const commentInput = e.detail.value
    if (comment){
      return
    }
    if (comment.length>50){
      wx.showToast({
        title: '短评最多50个字',
        icon:'none'
      })
      return
    }
    const addComment = bookModel.postComment(this.data.book.id, comment)
    addComment.then((res)=>{
      wx.showToast({
        title: '+1',
        icon:'none'
      })
      //保证新增短评添加到数组首位
      this.data.comments.unshift({
        content:comment,
        nums:1
      })
      console.log(this.data.comments)
      //增加数据后更新显示数据,关闭蒙层
      this.setData({
        comments:this.data.comments,
        posting:false
      })
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