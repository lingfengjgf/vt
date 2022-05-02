import axios from 'axios';
import qs from 'qs';

export function register(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/register',postData)
}

export function checkUname(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/register/checkUname',postData)
}

export function checkEmail(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/register/checkEmail',postData)
}

export function checkPhone(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/register/checkPhone',postData)
}