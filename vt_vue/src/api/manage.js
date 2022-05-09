import service from '../utils/request';

export function setBook(data) {
  return service({
    url:'/manage/setBook',
    method:'post',
    data
  })
}
