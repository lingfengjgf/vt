import service from '../utils/request';

export function detailsInfo(data) {
  return service({
    url:'/details',
    method:'post',
    data
  })
}

export function addBook(data) {
  return service({
    url:'/details/addBook',
    method:'post',
    data
  })
}

export function commentInfo(data) {
  return service({
    url:'/details/comment',
    method:'post',
    data
  })
}

export function addCom(data) {
  return service({
    url:'/details/addCom',
    method:'post',
    data
  })
}
