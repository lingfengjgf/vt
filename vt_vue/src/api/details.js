import axios from 'axios'
import qs from 'qs';

export function detailsInfo(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/details',postData)
}

export function addBook(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/details/addBook',postData)
}

export function commentInfo(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/details/comment',postData)
}

export function addCom(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/details/addCom',postData)
}