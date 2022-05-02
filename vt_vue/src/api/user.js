import axios from 'axios'
import qs from 'qs';

export function getUserInfo() {
  return axios.get('/api/userinfo')
}

export function setUserInfo(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/userinfo/set',postData)
}

export function readed(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/userinfo/readed',postData)
}

export function pageSet(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/read/pageSet',postData)
}

export function topup() {
  return axios.get('/api/topup')
}
