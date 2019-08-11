import {config} from "../config.js" 
const tips = {
  1:"抱歉，出现错误",
  1005:"",
  3000:""
}
class HTTP{
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    
    wx.request({
      url: config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      success:(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success&&params.success(res)
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        
        let error_code = res.data.error_code
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