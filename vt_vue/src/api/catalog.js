import service from '../utils/request';

export function catalogList(data) {
  return service({
    url:'/catalog',
    method:'post',
    data
  })
}

export function readCheck(data) {
  return service({
    url:'/catalog/vip',
    method:'post',
    data
  })
}
