import service from '../utils/request';

export function getIndexInfo() {
  return service({
    url:'/index',
    method:'get',
    params:{}
  })
}