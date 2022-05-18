import service from '../utils/request';

export function bookshelfList() {
  return service({
    url:'/bookshelf',
    method:'get',
    params:{}
  })
}

export function delBook(data) {
  return service({
    url:'/bookshelf/delBook',
    method:'post',
    data
  })
}
