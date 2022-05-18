<template>
  <div class="navbar">
    {{dateType}}，{{$store.state.uname}}
    <img class="avatar" :src="`${baseUrl}${$store.getters.optUserAva}`">
    <div class="nav-btn" @click='logoutClick' :class="{hide:$store.getters.optIsLogin==0}" href="javascript:;">注销</div>
    <div class="nav-btn" @click='manageClick' :class="{hide:$store.getters.optIsLogin==0}" href="javascript:;">返回书城</div>
  </div>
</template>

<script>
import {logout} from '@/api/login'
export default {
  data(){
    return{
      baseUrl:process.env.VUE_APP_IMGURL,
      dateType:'早上好',
    }
  },
  created(){
    let h=new Date().getHours();
    if(h>=6&&h<11){
      this.dateType='上午好';
    }else if(h>=11&&h<14){
      this.dateType='中午好';
    }else if(h>=14&&h<18){
      this.dateType='下午好';
    }else{
      this.dateType='晚上好';
    }
  },  
  methods: {
    logoutClick(){
      this.$store.commit("changeLogin",0);
      this.$router.push('/');
      logout();      
    },
    manageClick(){
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>
  .navbar{
    height: 50px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .avatar{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    border-radius: 50%;
  }
  .nav-btn{
    display: block;
    padding: 0 10px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    margin-left: 20px;   
    cursor: pointer; 
  }
  .nav-btn:hover{
    color: #fff !important;
    background: #0083ec;
  }
</style>
