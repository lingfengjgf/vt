import service from '../utils/request';

export function setBook(data) {
  return service({
    url:'/manage/setBook',
    method:'post',
    data
  })
}

export function getUserList(data) {
  return service({
    url:'/manage/userList',
    method:'post',
    data
  })
}

export function setUser(data) {
  return service({
    url:'/manage/setUser',
    method:'post',
    data
  })
}