import {
  HTTP
} from '../util/http-book.js'

export class BookModel extends HTTP{
  getHotList(){
    return this.request('/classic/hot_list')
  }
}