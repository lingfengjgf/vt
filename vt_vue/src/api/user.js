import service from '../utils/request';

export function getUserInfo() {
  return service({
    url:'/userinfo',
    method:'get',
    params:{}
  })
}

export function setUserInfo(data) {
  return service({
    url:'/userinfo/set',
    method:'post',
    data
  })
}

export function readed(data) {
  return service({
    url:'/userinfo/readed',
    method:'post',
    data
  })
}

export function pageSet(data) {
  return service({
    url:'/userinfo/pageSet',
    method:'post',
    data
  })
}

export function topup() {
  return service({
    url:'/topup',
    method:'get',
    params:{}
  })
}
