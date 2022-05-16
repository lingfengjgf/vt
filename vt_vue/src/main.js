import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { 
  Menu,
  Submenu,
  MenuItem,
  Row,
  Col,
  Table,
  TableColumn,
  Input,
  Pagination,
  Message,
  Select,
  Option,
  Radio,
  Dialog,
 } from 'element-ui';

Vue.config.productionTip = false

axios.defaults.withCredentials=true;
//让axios在发送请求时携带cookie
// Vue.prototype.axios=axios;

//引入第三方库qs,解决axios post请求问题
// import qs from 'qs';
// Vue.prototype.qs=qs;

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Dialog);

//自定义截取字符串
Vue.prototype.cutIntro=function(arr,num){
  for(var elem of arr){
    if(elem.intro.length>=num){
        var str=elem.intro.substr(0,num);
        for(var i=0;i<str.length;i++){           
          var s=str.substr(str.length-1);
          var reg=/[\w\u4e00-\u9fa5]/;
          if(reg.test(s))
              break;
          else
              str=str.substr(0,str.length-2);
      }
      elem.intro=str+'···';       
    }
  }
}

Vue.prototype.cutTit=function(arr,num){
  for(var elem of arr){
    if(elem.title.length>num){
        elem.title=elem.title.substr(0,num)+'···';       
    }
  }
}

//切割标签
Vue.prototype.spLabel=function(arr,i){
  for(var elem of arr){
    if(elem.label.length>0){
        var labs=elem.label.split('@');
        elem.label=labs[i];       
    }else{
      elem.label='';
    }
  }
}

//加载页面返回顶部
Vue.prototype.loadBackTop=function(){
  document.documentElement.scrollTop=0;
}

//message
Vue.prototype.$message={
  success:(message)=>{
    return Message({
      showClose: true,
      message,
      type: 'success',
      duration: 2500
    })
  },
  error:(message)=>{
    return Message({
      showClose: true,
      message,
      type: 'error',
      duration: 2500
    })
  },
}

//创建全局日期格式过滤器
//2018-12-12 15:12:00
Vue.filter('datetimeFilter',function(val){
  //val 当前日期对象
  //创建新的日期对象
  var date=new Date(val);
  //获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  //拼接字符串
  m<10&&(m='0'+m);
  d<10&&(d='0'+d);
  h<10&&(h='0'+h);
  mi<10&&(mi='0'+mi);
  s<10&&(s='0'+s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

Vue.filter('wordsFormat',function(val){
  if(!val){
    return 0;
  }
  if(val<=1000){
    return val;
  }
  return (val/1000).toFixed(2)/1+'k';
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
