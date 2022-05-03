import service from '../utils/request';

export function register(data) {
  return service({
    url:'/register',
    method:'post',
    data
  })
}

export function checkUname(data) {
  return service({
    url:'/register/checkUname',
    method:'post',
    data
  })
}

export function checkEmail(data) {
  return service({
    url:'/register/checkEmail',
    method:'post',
    data
  })
}

export function checkPhone(data) {
  return service({
    url:'/register/checkPhone',
    method:'post',
    data
  })
}