import Vue from 'vue'
import Vuex from 'vuex'

//注册Vuex组件
Vue.use(Vuex)

//创建store对象
export default new Vuex.Store({
  //共享数据容器
  state: {
    backPath:"/",
    headerI:sessionStorage.getItem('headerI')||0,
    isLogin:sessionStorage.getItem('isLogin')||0,
    userShow:0,
    userInfo:sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{},
    avaBgInfo:{
      avatar:[],
      bg:[],
    },
    userAva:sessionStorage.getItem('userAva')||'/img/user/icon/default.png',
    userBg:sessionStorage.getItem('userBg')||'bg.jpg',
    uname:sessionStorage.getItem('uname')||'',
    fontF:localStorage.getItem('fontF')||0,
    fontS:localStorage.getItem('fontS')||18,
    bg:localStorage.getItem('bg')||0
  },
  //操作共享数据方法
  mutations: {
    changePath(state,path){
      state.backPath=path;
    },
    changeHeaderI(state,i){
      state.headerI=i;
      sessionStorage.setItem('headerI',i);
    },
    changeLogin(state,i){
      state.isLogin=i;
      sessionStorage.setItem('isLogin',state.isLogin);
    },
    changeUserShow(state,i){
      state.userShow=i;
    },
    changeUserAva(state,src){
      state.userAva=src;
      sessionStorage.setItem('userAva',state.userAva);
    },
    changeUserBg(state,src){
      state.userBg=src;
      sessionStorage.setItem('userBg',state.userBg);
    },
    changeUname(state,u){
      state.uname=u;
      sessionStorage.setItem('uname',state.uname);
    },
    changeFontF(state,i){
      state.fontF=i;
      //sessionStorage.setItem('fontF',state.fontF);
      localStorage.setItem('fontF',state.fontF);
    },
    changeFontS(state,i){
      state.fontS=i;
      //sessionStorage.setItem('fontS',state.fontS);
      localStorage.setItem('fontS',state.fontS);
    },
    changeBg(state,i){
      state.bg=i;
      //sessionStorage.setItem('bg',state.bg);
      localStorage.setItem('bg',state.bg);
    },
    changeUserInfo(state,info){
      state.userInfo=info;
      sessionStorage.setItem('userInfo',JSON.stringify(info));
    },
    changeAvaBgInfo(state,info){
      state.avaBgInfo=info;
      sessionStorage.setItem('avaBgInfo',JSON.stringify(info));
    },
  },
  //获取共享数据方法
  getters:{
    optBackPath:function(state){
      return state.backPath;
    },
    optHeaderI:function(state){
      return state.headerI;
    },
    optIsLogin:function(state){
      return state.isLogin;
    },
    optUserShow:function(state){
      return state.userShow;
    },
    optUserAva:function(state){
      return state.userAva;
    },
    optUserBg:function(state){
      return state.userBg;
    },
    optUname:function(state){
      return state.uname;
    },
    optFontF:function(state){
      return state.fontF;
    },
    optFontS:function(state){
      return state.fontS;
    },
    optBg:function(state){
      return state.bg;
    },
    optUserInfo:function(state){
      let info=sessionStorage.getItem('userInfo');
      return info?JSON.parse(info):state.userInfo;
    },
    optAvaBgInfo:function(state){
      let info=sessionStorage.getItem('avaBgInfo');
      return info?JSON.parse(info):state.avaBgInfo;
    },
  },
  actions: {

  }
})
