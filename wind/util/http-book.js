import {config} from "../config.js" 
const tips = {
  1:"抱歉，出现错误",
  1005:"",
  3000:""
}
class HTTP{
  request(url,data={},method="GET"){
    return new Promise((resolve, reject)=>{
      this._request(url, resolve, reject, data , method )
    })
  }
  _request(url,resolve,reject, data = {}, method = "GET"){
   
    wx.request({
      url: config.api_base_url + url,
      method:method,
      data:data,
      success:(res)=>{
        const code = res.statusCode.toString()
        if(code.startsWith('2')){
          resolve(res)
        }else{
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        reject()
        const error_code = res.data.error_code
        this._show_error(error_code)
      },

    })
  }

  //前面加上下划线，假装是私有方法
  _show_error(error_code){
    if (!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',//小图标
      duration: ''//错误出现时间.，默认1500
    })
  }
}

export { HTTP }