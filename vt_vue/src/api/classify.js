import axios from 'axios'
import qs from 'qs';

export function classifyInfo(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/classify',postData)
}

export function classifySearch(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/classify/search',postData)
}