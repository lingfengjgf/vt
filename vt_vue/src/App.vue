<template>
  <div id="app">
    <router-view :bid="bid" :readed="readed"/>
  </div>
</template>

<script>
import {readed,pageSet} from './api/user';
import {getReadSet} from './api/read'
export default {
  data() {
    return {
      readed:0,
      bid:0
    }
  },
  watch: {
    $route(to,from){
      //console.log(to.path+":"+from.path);
      //console.log(this.$store.getters.optBackPath);
      this.backPage(to.path,from.path);
      this.headerShow(to.path); 
      this.userShow(to.path);
      this.readedChange(to.path,from.path);
      this.getFirstReaded(to.path);
      this.getReadSet(from.path);
    }
  },
  created(){
    this.readSet();
  },
  methods: {
    getReaded(){
      readed({bid:this.bid}).then(res=>{
        if(res.data.length>0){
          this.readed=res.data[0].readed;
        }else{
          this.readed=0;
        }
        //console.log(this.readed)
      })
    },
    getFirstReaded(to){
      var index=to.indexOf("/details/");
      if(index!=-1){
        this.bid=to.slice(9);
        this.getReaded();
      }
    },
    readedChange(to,from){
      var index1=to.indexOf("/read/");
      var index2=from.indexOf("/read/");
      if(index1!=-1){
        var i=to.lastIndexOf("/"); 
        this.readed=to.substr(i+1);
        this.bid=to.slice(index1+6,i);
      }else if(index1==-1&&index2!=-1){
        //console.log(this.bid,this.readed);
        //console.log(this.$store.getters.optIsLogin);
        if(this.$store.getters.optIsLogin==1){   
          pageSet({readed:this.readed,bid:this.bid}).then(res=>{
            this.getReaded();
          })
        }       
      }
    },
    backPage(to,from){
      if(to=="/login"){
        this.$store.commit("changePath",from);
        //console.log(this.$store.getters.optBackPath);
      }else if(to=="/register"&&from!="/login"){
        this.$store.commit("changePath",from);
      }
    },
    headerShow(path){
      var i=0;
      switch(path){
        case "/":
          i=0;
          break;
        case "/classify":
          i=1;
          break;
        case "/rank":
          i=2;
          break;
        case "/bookshelf":
          i=3;
          break;
        case "/userTopUp":
          i=4;
          break;
        default: i=-1;
      }
      this.$store.commit("changeHeaderI",i);
    },
    userShow(path){
      var i=0;
      switch(path){
        case "/user":
          i=0;
          break;
        case "/userinfo":
          i=0;
          break;
        case "/userset":
          i=1;
          break;
        case "/userTopUp":
          i=2;
          break;
        case "/userHistory":
          i=3;
          break;
      }
      this.$store.commit("changeUserShow",i);
      //console.log(this.$store.getters.optUserShow);
    },
    getReadSet(from){
      var index=from.indexOf("/read/"); 
      if(index=-1||(from=="/register"||from=="/login"&&this.$store.getters.optIsLogin==1)){
        this.readSet();
      }
    },
    readSet(){
      getReadSet().then(res=>{
        if(res.data.code!=-1){
          var bg=res.data[0].readBg;
          var fontF=res.data[0].readFontF;
          var fontS=res.data[0].readFontS;
          this.$store.commit("changeFontF",fontF);
          this.$store.commit("changeFontS",fontS);
          this.$store.commit("changeBg",bg);
        }
      })
    }
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
