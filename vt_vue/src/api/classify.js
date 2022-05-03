import service from '../utils/request';

export function classifyInfo(data) {
  return service({
    url:'/classify',
    method:'post',
    data
  })
}

export function classifySearch(data) {
  return service({
    url:'/classify/search',
    method:'post',
    data
  })
}