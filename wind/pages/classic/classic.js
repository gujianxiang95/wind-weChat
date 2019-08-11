// pages/classic/classic.js
import  { HTTP }  from  "../../util/http.js"
import { ClassicModel } from "../../models/classic.js"
import { LikeModel } from "../../models/like.js"
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    first: false,
    latest: true,
    likeCount:0,
    likeStatus:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //点赞/取消点赞
  onLike(e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  onLoad: function (options) {
    //数据更新，Storage
    classicModel.getLateList(res=>{
      this.setData({
        classicData:res.data.data[0],
      })
      this._getLikeStatus(res.data.data[0].id)
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //向左向右getClassic
  _updateClassic(nextOrpre){
    let index = this.properties.classicData.index
    classicModel.getClassic(index, nextOrpre, res => {
      this._getLikeStatus(res.data.data[0].id)
      this.setData({
        classicData: res.data.data[0],
        latest: classicModel.isLatest(res.data.data[0].index),
        first: classicModel.isFirst(res.data.data[0].index)
      })
    })
  },
  onNext(){
    this._updateClassic('next')
  },
  onPre(){
    this._updateClassic('previous')
  },
  _getLikeStatus(aetID){
    let category ='category'
    likeModel.getCLassicLikeStatus(aetID,category,res=>{
      this.setData({
        likeCount: res.data.data[0].fav_nums,
        likeStatus: res.data.data[0].like_status,
      })
    })
  },

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
 
})