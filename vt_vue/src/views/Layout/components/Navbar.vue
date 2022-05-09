<template>
  <div class="navbar">
    <img class="avatar" :src="`${baseUrl}${$store.getters.optUserAva}`">
    <div class="nav-btn" @click='logoutClick' :class="{hide:$store.getters.optIsLogin==0}" href="javascript:;">注销</div>
    <div class="nav-btn" @click='manageClick' :class="{hide:$store.getters.optIsLogin==0}" href="javascript:;">返回书城</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      baseUrl:process.env.VUE_APP_IMGURL,
    }
  },  
  methods: {
    logoutClick(){

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
  }
  .nav-btn:hover{
    color: #fff !important;
    background: #0083ec;
  }
</style>
