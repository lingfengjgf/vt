import service from '../utils/request';

export function getReadBg(data) {
  return service({
    url:'/read/bg',
    method:'post',
    data
  })
}

export function getReadFamily(data) {
  return service({
    url:'/read/family',
    method:'post',
    data
  })
}

export function getReadSize(data) {
  return service({
    url:'/read/size',
    method:'post',
    data
  })
}

export function getReadBook(data) {
  return service({
    url:'/read/book',
    method:'post',
    data
  })
}

export function getReadSet() {
  return service({
    url:'/read/getReadSet',
    method:'get',
    params:{}
  })
}
