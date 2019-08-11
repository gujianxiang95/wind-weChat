import { HTTP } from '../util/http.js'
import { config } from '../config.js'
class LikeModel extends HTTP{
  like(behavior,artID,category){
    let url = behavior==='like'?'/like/like':'/like/cancel'
    
    this.request({
      url: url,
      method:'POST',
      data:{
        artID:artID,
        type:category,
        behavior: behavior
      }
    })
  }

  getCLassicLikeStatus(artID,category,sCallback){
    this.request({
      url: `/classic/${category}/${artID}/favor`,
      success:res=>{
        sCallback(res)
      },
    })
  }
}

export { LikeModel }