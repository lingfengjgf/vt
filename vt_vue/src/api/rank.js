import service from '../utils/request';

export function getRankInfo() {
  return service({
    url:'/rank',
    method:'get',
    params:{}
  })
}
