// components/like/like.js
Component({
  /**
   * 组件的属性列表 可以在组件的外部访问
   */
  properties: {
    count:{
      type:Number,
      value:10
    },
    like: {
      type:Boolean,
      value:false,
      observer:function(){

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"/components/like/img/like.png",
    noSrc:"/components/like/img/dislike.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike(){
      let like = this.properties.like 
      let count = this.properties.count 
      like ? count-- :count++
      like = !like
      this.setData({
        count,
        like
      })
      //标志用户是否点赞
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
