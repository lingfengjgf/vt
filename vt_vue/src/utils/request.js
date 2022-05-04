import axios from 'axios'
import qs from 'qs'

const service = axios.create({
    baseURL: process.env.VUE_APP_URL, // api的base_url
    timeout: 60000, // 请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", //post请求以form data方式传递
    },
})
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let canRequest=1;
let removePending = (config) => {
    let time=(new Date()).getTime();
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method + JSON.stringify(config.data)) { //当当前请求在数组中存在时执行函数体
            if(time-pending[p].t<1000){ //当两次相同的请求时间小于1000ms时，取消本次请求
                canRequest=0;
            }else{
                //pending[p].f(); //执行取消操作
                pending.splice(p, 1); //把这条记录从数组中移除
                canRequest=1;
            }
            return;
        }else{
            canRequest=1
        }
    }
}
// request拦截器
service.interceptors.request.use(config => {
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
        if(canRequest==0){ //取消请求操作
            console.log("重复请求")
            c();
            return;
        }
        pending.push({ u: config.url + '&' + config.method + JSON.stringify(config.data), f: c, t:(new Date()).getTime() });
    });
    if(config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    // console.log("request config",config);
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
    return response
        // const res = response.data
        // if (res.code && res.code != 1) {
        //     return Promise.reject(response)
        // } else {
        //     return response
        // }
    },
    error => {
        console.log('err' + error) // for debug
        if (error != 'Cancel') {
            return Promise.reject(error)
        }else{
            return Promise.reject('重复点击请求关闭',error)
        }
    }
)

export default service