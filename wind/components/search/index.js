// components/search/index.js
import { KeyWordModel } from '../../models/keywords.js'
import { BookModel } from '../../models/book.js'
const keyWordModel = new KeyWordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    q:''
  },
  attached(){
    //获取搜索历史、热门搜索
    const historyWords = keyWordModel.getHistory()
    keyWordModel.getHot().then(res=>{
      let hotArr = []
      for (let i = 0; i < res.data.data.length;i++){
        hotArr.push(res.data.data[i].word) 
      }
      this.setData({
        hotWords: hotArr,
        historyWords,
      })
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(e){
      this.setData({
        searching:true
      })
      const q = e.detail.value || e.detail.text
      bookModel.search(0,q)
      .then(res=>{
        // console.log(res.data.data[0])
        let dataArr = []
        if (res.data.data.length === 1){
          dataArr.push(res.data.data[0])
        }else{
          dataArr = res.data.data
        }
        this.setData({
          dataArray: dataArr,
          q
        })
        keyWordModel.addToHistory(q)
      })
    },
    onDelete(){
      this.setData({
        searching: false
      })
    }
  }
})
