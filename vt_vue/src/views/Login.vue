<template>
    <div class="log">
        <div class="log-box">
            <h2>欢迎登录观品</h2>
            <p>
                <i class="iconfont">&#xe633;</i>
                <input @keyup.13='goLogin()' v-model='uname' type="text" name='uname' placeholder="用户名/手机">
            </p>        
            <p>
                <i class="iconfont">&#xe669;</i>
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
                <div class="dialog-text" @click='goPage'>直接进入>></div>
            </div>
        </div>
    </div> 
</template>

<script>
    import {login} from '../api/login'
    import {getUserInfo} from '../api/user'
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
                this.hint='';
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
                        this.userInfo();
                        this.jump();
                    }else{
                        if(res.data.code==-10){
                            this.$message.error(res.data.msg);
                        }else{
                            this.hint=res.data.msg;
                        }
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
            },
            userInfo(){
                getUserInfo().then(data=>{
                    if(data.data.code==1){
                        this.$store.commit("changeUserInfo",data.data.userInfo);
                    }
                })
            }
        },
    }
</script>

<style scoped>
  div.log{
    width: 100vw;
    min-width:1200px;
    height: 100vh;
    background: url('../assets/img/icon/bg_login.jpg') center ;
    background-size:cover;
    padding: 6rem 10rem 17rem;
    box-sizing: border-box;
  }
  div.log>.log-box{
      width: 400px;
      padding: 20px;
      background: rgba(0,0,0,0.2);
  }
  div.log>.log-box>h2{
      color: #0083ec;
      font: italic 60px '华文行楷','kaiti','Simsun','heiti';
      margin-bottom: 20px;
  }
  div.log>.log-box>p{
      font-size: 24px;
      color: #000;
      margin-bottom: 10px;
      position: relative;
  }
  div.log>.log-box>p>.iconfont{
    position: relative;
    top: 5px;
    left: -15px;
    font-size: 30px;         
  }
  div.log>.log-box>p>input{
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
  div.log>.log-box>p>span.hint{
      display: block;
      color: green;
      width: 200px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 18px;
      padding-left: 100px;
  }
  div.log>.log-box>p>span.hint.err{
      color: red;
  }
  div.log>.log-box>div>a.forget{
    text-decoration: underline;
    margin-left: 35px; 
    font-size: 18px;
    color: #666;
  }
  div.log>.log-box>div>a.login{
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
  div.log>.log-box>div>a.login:hover{
      background: #0366ee;
      color: #fff !important;
  }
  div.log>.log-box>div.goReg{
      margin-top: 20px;
  }
  div.log>.log-box>div.goReg>p{
      color: #000;
  }
  div.log>.log-box>div.goReg>p>a{
      color: #0083ec;
  }
</style>