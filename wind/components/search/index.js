// components/search/index.js
import { KeyWordModel } from '../../models/keywords.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/behaviors.js'
const keyWordModel = new KeyWordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  

  /**
   * 组件的初始数据
   */
  behaviors: [paginationBev],
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loadingCenter:false,
    noneResult: false,
  },
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },
  attached(){
    console.log(this.data.more)
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
      this._hideNonoResule()
    },
    onConfirm(e){
      this.initialize()
      this._showResult()
      this._showLoadingCenter()
      const q = e.detail.value || e.detail.text
      bookModel.search(0,q)
      .then(res=>{
        // console.log(res.data.data[0])
        let dataArr = []
        console.log(res.data.data.length)
        if (res.data.data.length === 0){
          this._showNonoResule()
          console.log(this.data.noneResult)
        }else if (res.data.data.length === 1){
          dataArr.push(res.data.data[0])
          this._hideNonoResule()
        }else{
          this._hideNonoResule()
          dataArr = res.data.data
        }
        this.setData({
          dataArray: dataArr,
          q
        })
        keyWordModel.addToHistory(q)
        this._hideLoadingCenter()
      },err=>{
        this._hideLoadingCenter()
      })
    },
    onDelete(){
      this._closeResult()
      this._hideNonoResule()
    },
    //加载更多
    loadMore(){
      let dataArr = []
      if (!this.data.q){
        return 
      }
      if(this.isLocked()){
        return
      }
      // if(this.hasMore()){
      // }
      this.locked()
      bookModel.search(this.getCurrentStart(),this.data.q).then(res=>{
        if (res.data.data.length === 1) {
          dataArr.push(res.data.data[0])
        } else {
          dataArr = res.data.data
        }

        this.setMoreData(dataArr)
        this.unlocked()
      },err=>{
        this.unlocked()
      })
      console.log(123)
    },
    //封装私有，外部尽量不调用
    _showResult(){
      this.setData({
        searching:true
      })
    },
    _closeResult(){
      this.setData({
        searching:false
      })
    },
    //
    _isLocked(){
      return this.data.loading?true:false
    },
    //加锁
    _locked(){
      this.setData({
        loading: true
      })
    },
    //解锁
    _unlocked(){
      this.setData({
        loading: false
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },
    //noneResult:false,
    _showNonoResule(){
      this.setData({
        noneResult: true
      })
    },
    _hideNonoResule() {
      this.setData({
        noneResult: false
      })
    },
    
  }
})
