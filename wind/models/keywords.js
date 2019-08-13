import { HTTP } from '../util/http-book.js'

 class KeyWordModel extends HTTP{
  //获取历史搜素
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  //热门搜索
  getHot(){
    return this.request('/book/hot_keyword')
  }
  //写入搜索记录
  addToHistory(keyword){
    let words = this.getHistory()
    if (!words.includes(keyword)){
      if (words.length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }

}

export { KeyWordModel }