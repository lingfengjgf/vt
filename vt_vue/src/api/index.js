import service from '../utils/request';

export function getCarousel() {
  return service({
    url:'/index/carousel',
    method:'get',
    params:{}
  })
}

export function publishTop() {
  return service({
    url:'/index/publishTop',
    method:'get',
    params:{}
  })
}

export function publishBooks() {
  return service({
    url:'/index/publishBooks',
    method:'get',
    params:{}
  })
}

export function publishBest() {
  return service({
    url:'/index/publishBest',
    method:'get',
    params:{}
  })
}