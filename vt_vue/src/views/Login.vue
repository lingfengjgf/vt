<template>
    <div class="log">
        <div>
            <h2>欢迎登录观品</h2>
            <p>
                <img src="http://localhost:3000/img/login/user.png"> 
                <input @keyup.13='goLogin()' v-model='uname' type="text" name='uname' placeholder="用户名/手机">
            </p>        
            <p>
                <img src="http://localhost:3000/img/login/upwd.png">
                <input @keyup.13='goLogin()' v-model='upwd' type="password" name='upwd' placeholder="密码">
                <span class="hint err">{{hint}}</span>
            </p>
            <div>        
                <a href="javascript:;" class="forget">忘记密码？</a>
                <a @click='goLogin' href="javascript:;" class="login">登 录</a>
            </div>
            <div class='goReg'>
                <p>还没有账号? <router-link to="/register">马上注册</router-link></p>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='showMask'>
            <div class='mask'>
                <p>登录成功！{{sec}}秒后自动进入</p>
                <a @click='goPage' href="javascript:;" >直接进入>></a>
            </div>
        </div>
    </div> 
</template>

<script>
import {login} from '../api/login'
    export default {
        data() {
            return {
                uname:'',
                upwd:'',
                hint:'',
                showMask:false,
                sec:3,
                t:""
            }
        },
        methods: {
            goLogin(){
                var uname=this.uname;
                var upwd=this.upwd;
                if(!uname){
                    this.hint='用户名不能为空!';
                    return;
                }
                if(!upwd){
                    this.hint='密码不能为空!';
                    return;
                }
                var postData={uname,upwd}; 
                login(postData).then(res=>{
                    if(res.data.code==1){
                        this.hint='';
                        this.showMask=true;
                        var a=res.data.data.avatar;
                        var u=res.data.data.uname;
                        var b=res.data.data.bg;
                        this.$store.commit("changeLogin",1);
                        this.$store.commit("changeUserAva",a);
                        this.$store.commit("changeUserBg",b);
                        this.$store.commit("changeUname",u);
                        this.jump();
                    }else{
                        this.hint=res.data.msg;
                    }
                    //console.log(res.data);
                })
            },
            close(){
                this.showMask=false;
            },
            goPage(){
                //console.log(this.$store.getters.optBackPath);
                this.$router.push(this.$store.getters.optBackPath);
                clearInterval(this.t);
            },
            jump(){
                this.t=setInterval(()=>{
                    this.sec--;
                    if(this.sec<=0){
                        clearInterval(this.t);
                        this.$router.push(this.$store.getters.optBackPath);
                    }
                },1000);
            }
        },
    }
</script>

<style scoped>
  div.log{
    width: 100vw;
    min-width:1200px;
    height: 100vh;
    background: url(http://localhost:3000/img/login/bg_login.jpg) center ;
    background-size:cover;
    padding: 6rem 10rem 17rem;
    box-sizing: border-box;
  }
  div.log>div{
      width: 400px;
      padding: 20px;
      background: rgba(0,0,0,0.2);
  }
  div.log>div>h2{
      color: #0083ec;
      font: italic 60px '华文行楷','kaiti','Simsun','heiti';
      margin-bottom: 20px;
  }
  div.log>div>p{
      font-size: 24px;
      color: #000;
      margin-bottom: 10px;
      position: relative;
  }
  div.log>div>p>img{
    width: 40px;
    position: relative;
    top: 14px;
    left: -15px;
  }
  div.log>div>p>input{
      height: 40px;
      width: 240px;
      line-height: 40px;
      outline-style: none;
      border: 1px solid #d2d2d2;
      border-radius: 2px;
      color: #000;
      font-size: 18px;
      padding-left: 10px;
  }
  div.log>div>p>span.hint{
      display: block;
      color: green;
      width: 200px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 18px;
      padding-left: 100px;
  }
  div.log>div>p>span.hint.err{
      color: red;
  }
  div.log>div>div>a.forget{
    text-decoration: underline;
    margin-left: 35px; 
    font-size: 18px;
    color: #666;
  }
  div.log>div>div>a.login{
      display: block;
      width: 100px;
      height: 30px;
      margin-right:55px;
      background: #0083ec;
      color: #fff;
      line-height: 30px;
      text-align: center;
      border-radius: 2px;
      float: right;
      font-size: 18px;
  }
  div.log>div>div>a.login:hover{
      background: #0366ee;
      color: #fff !important;
  }
  div.log>div>div.goReg{
      margin-top: 20px;
  }
  div.log>div>div.goReg>p{
      color: #000;
  }
  div.log>div>div.goReg>p>a{
      color: #0083ec;
  }
  div.log>div.dialog{
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    div.log>div.dialog>div.mask{
        width: 400px;
        height: 150px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        text-align: center;
        font-size: 18px;
        color: #000;
    }
    div.log>div.dialog>div.mask>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    div.log>div.dialog>div.mask>a{
        color: #0083ec;
    }
</style>