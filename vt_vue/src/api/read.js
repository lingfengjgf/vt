import axios from 'axios';
import qs from 'qs';

export function getReadBg(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/read/bg',postData)
}

export function getReadFamily(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/read/family',postData)
}

export function getReadSize(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/read/size',postData)
}

export function getReadBook(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/read/book',postData)
}

export function getReadSet() {
  return axios.get('/api/read/getReadSet')
}