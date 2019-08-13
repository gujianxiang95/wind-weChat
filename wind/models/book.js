import {
  HTTP
} from '../util/http-book.js'

export class BookModel extends HTTP{
  //增加短评
  postComment(bid,comment){
    return this.request(
      "/book/add/short_comment",
      {
        book_id:bid,
        content:comment
      },
      "POST",
    )
  }
  //
  search(start,q){
    return this.request(
      '/book/search',
      {
        q:q,
        start:start
      }
    )
  }

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