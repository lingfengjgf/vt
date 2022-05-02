import axios from 'axios';
import qs from 'qs';

export function login(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/login',postData)
}

export function logout() {
  return axios.get('/api/login/logout')
}