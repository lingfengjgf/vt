import axios from 'axios'
import qs from 'qs';

export function bookshelfList() {
  return axios.get('/api/bookshelf')
}

export function delBook(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/delBook',postData)
}