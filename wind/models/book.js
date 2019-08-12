import {
  HTTP
} from '../util/http-book.js'

export class BookModel extends HTTP{
  getHotList(){
    return this.request('/classic/hot_list')
  }
  getMyBookCount(){
    return this.request('/book/favor/count')
  }
  getDetail(bid){
    return this.request(`/book/${bid}/detail`)
  }

  getLikeStatus(bid) {
    return this.request(`/book/${bid}/favor`)
  }
  getComments(bid) {
    return this.request(`/book/${bid}/short_comment`)
  }
}