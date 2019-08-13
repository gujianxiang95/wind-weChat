import { HTTP } from "../util/http.js"
class ClassicModel extends HTTP {

  //获取最新期刊
  getLateList(sCallback){
    this.request({
      url:'/classic/latest',
      success:res=>{
        sCallback(res)
        this._setLatestIndex(res.data.data[0].index)
      }
    })
  }
  //根据前进后退获取数据
  getClassic(index, nextOrPre, sCallback){
    //缓存中寻找 or API
    //缓存 对应的key
    let key = nextOrPre === 'next' ? this._getKey(index + 1) : this._getKey(index -1)
    console.log(key)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: `/classic/${index}/${nextOrPre}`,
        success: res => {
          wx.setStorageSync(key, res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }

    // this.request({
    //   url: `/classic/${index}/${nextOrPre}`,
    //   success: res => {
    //     wx.setStorageSync(this._getKey(index), res)
    //     sCallback(res)
    //   }
    // })
  }

  //是否为第一期，最新一期
  isFirst(index){
    return index === 1?true:false
  }

  isLatest(index){
    let lateIndex = this._getLatestIndex()
    return lateIndex===index?true:false
  }
  //设置、获取当前页数缓存，用来判断是否应当
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }
  //定义classicdata对应key
  _getKey(index){
    let key = 'classic_'+index
    return key
  }
}

export { ClassicModel }