import axios from 'axios'
import qs from 'qs';

export function catalogList(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/catalog',postData)
}

export function readCheck(postData) {
  postData=qs.stringify(postData);
  return axios.post('/api/catalog/vip',postData)
}