<template>
    <div>
        <section>
            <router-link class="logo" to="/"><img src="../assets/img/icon/logo.png" ></router-link>
            <div class="reg">
                <h2>用户注册</h2>
                <p :class='{red:unameErr,green:unameSuc}'>
                    <img src="../assets/img/icon/user.png">
                    <input type="text" placeholder="昵称" @focus='fHint' v-model='uname' @blur='bHint' data-i='1'>
                    <span>{{unameSpan}}</span>
                </p>
                <p :class='{red:upwdErr,green:upwdSuc}'>
                    <img src="../assets/img/icon/upwd.png">
                    <input type="password" placeholder="密码" @focus='fHint' v-model='upwd' @blur='bHint' data-i='2'>
                    <span>{{upwdSpan}}</span>
                </p>
                <p :class='{red:emailErr,green:emailSuc}'>
                    <img src="../assets/img/icon/email.png">
                    <input type="text" placeholder="邮箱" @focus='fHint' v-model='email' @blur='bHint' data-i='3'>
                    <span>{{emailSpan}}</span>
                </p>
                <p :class='{red:phoneErr,green:phoneSuc}'>
                    <img src="../assets/img/icon/phone.png">
                    <input type="text" placeholder="手机号码" @focus='fHint' v-model='phone' @blur='bHint' data-i='4'>
                    <span>{{phoneSpan}}</span>
                </p>
                <a class="goReg" @click='reg' href="javascript:;">立 即 注 册</a>
                <router-link class="goLog" to="/login">已有账号,去登录>></router-link>
            </div>
            <img src="../assets/img/icon/bookGirl1.png">
        </section>
        <div @click='close' class="dialog" v-show='showMask'>
            <div class='mask'>
                <p>请完善注册信息！</p>
                <a @click='close' href="javascript:;">确认</a>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='jump'>
            <div class='maskJump'>
                <p>注册成功！{{sec}}秒后自动进入</p>
                <a @click='goPage' href="javascript:;">直接进入>></a>
            </div>
        </div>
    </div>
</template>

<script>
    import {register,checkUname,checkEmail,checkPhone} from '../api/register'
    export default{
        data(){
            return{
                uname:'',
                upwd:'',
                phone:'',
                email:'',
                upwdSpan:'',
                unameSpan:'',
                emailSpan:'',
                phoneSpan:'',
                upwdErr:false,
                unameErr:false,
                emailErr:false,
                phoneErr:false,
                upwdSuc:false,
                unameSuc:false,
                emailSuc:false,
                phoneSuc:false,
                showMask:false,
                jump:false,
                sec:3,
                t:""
            }
        },
        methods: {
            reg(){
                if(this.unameSuc&&this.upwdSuc&&this.emailSuc&&this.phoneSuc){
                    var postData={
                        uname:this.uname,
                        upwd:this.upwd,
                        email:this.email,
                        phone:this.phone
                    };
                    register(postData).then(res=>{
                        //console.log(res);
                        if(res.data.code==1){
                            this.$store.commit("changeLogin",1);
                            this.jump=true;
                            this.jumpSec();
                        }
                    })
                }else{
                    this.showMask=true;
                }
            },
            checkU(){
                var postData={uname:this.uname};
                checkUname(postData).then(res=>{
                    if(res.data.code==1){
                        this.unameSuc=true;
                        this.unameErr=false;
                        this.count++;
                    }else{
                        this.unameErr=true;
                        this.unameSuc=false;
                    }
                    this.unameSpan=res.data.msg;
                })                
            },
            checkE(){
                var postData={email:this.email};
                checkEmail(postData).then(res=>{
                    if(res.data.code==1){
                        this.emailSuc=true;
                        this.emailErr=false;
                        this.count++;
                    }else{
                        this.emailErr=true;
                        this.emailSuc=false;
                    }
                    this.emailSpan=res.data.msg;
                })                
            },
            checkP(){
                var postData={phone:this.phone};
                checkPhone(postData).then(res=>{
                    if(res.data.code==1){
                        this.phoneSuc=true;
                        this.phoneErr=false;
                        this.count++;
                    }else{
                        this.phoneErr=true;
                        this.phoneSuc=false;
                    }
                    this.phoneSpan=res.data.msg;
                })                
            },
            fHint(e){
                var i=e.target.dataset.i;
                //console.log(i);
                switch(i){
                    case '1':
                        this.unameErr=false;
                        this.unameSuc=false;
                        this.unameSpan='用户昵称在3~9位之间';
                        break;
                    case '2':
                        this.upwdErr=false;
                        this.upwdSuc=false;
                        this.upwdSpan='密码在6~12位之间'; 
                        break; 
                    case '3':
                        this.emailErr=false;
                        this.emailSuc=false;
                        this.emailSpan='';
                        break; 
                    case '4':
                        this.phoneErr=false;
                        this.phoneSuc=false;
                        this.phoneSpan='';
                        break; 
                }
            },
            bHint(e){
                var i=e.target.dataset.i;
                var reg=/\s/;
                switch(i){
                    case '1':
                        var l=this.uname.length;
                        if(!this.uname){
                            this.unameSpan='用户昵称不能为空';
                            this.unameErr=true;
                        }else if(l<3||l>9){
                            this.unameSpan='昵称长度超出范围';
                            this.unameErr=true;
                        }else if(reg.test(this.uname)){
                            this.unameSpan='昵称不能包含非法字符';
                            this.unameErr=true;
                        }else{
                            //console.log(this.uname);
                            this.checkU();
                        }
                        break;
                    case '2':
                        var l=this.upwd.length;
                        if(!this.upwd){
                            this.upwdSpan='密码不能为空';
                            this.upwdErr=true;
                        }else if(l<6||l>12){
                            this.upwdSpan='密码长度超出范围';
                            this.upwdErr=true;
                        }else if(reg.test(this.upwd)){
                            this.upwdSpan='密码不能包含非法字符';
                            this.upwdErr=true;
                        }else{
                            this.upwdErr=false;
                            this.upwdSuc=true;
                            this.upwdSpan='密码可用';
                            this.count++;
                        } 
                        break; 
                    case '3':
                        var reg1=/\w+@[0-9a-zA-Z-]+/;
                        if(!this.email){
                            this.emailSpan='邮箱不能为空';
                            this.emailErr=true;
                        }else if(!reg1.test(this.email)){
                            this.emailSpan='邮箱格式不正确';
                            this.emailErr=true;
                        }else{
                            this.checkE();
                        }
                        break; 
                    case '4':
                        var reg1=/^1[3-9]\d{9}$/;
                        if(!this.phone){
                            this.phoneSpan='手机号码不能为空';
                            this.phoneErr=true;
                        }else if(!reg1.test(this.phone)){
                            this.phoneSpan='手机号码格式不正确';
                            this.phoneErr=true;
                        }else{
                            this.checkP();
                        }
                        break; 
                }
                
            },
            close(){
                this.showMask=false;
                this.jump=false;
            },
            goPage(){
                this.$router.push(this.$store.getters.optBackPath);
                clearInterval(this.t);
            },
            jumpSec(){
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
    section{
        display: flex;
        position:relative;
    }
    section>a.logo{
        position: absolute;
        top: 0px;
        left: -125px;
    }
    section>img{
        position:absolute;
        top: 110px;
        right: 0px;
    }
    div.reg{
        width: 400px;
        margin-left: 50px;
        margin-top: 80px;
    }
    div.reg>h2{
        color: #0083ec;
        font: 60px '华文行楷','kaiti','Simsun','heiti';
        margin-bottom: 20px;
    }
    div.reg>p{
        font-size: 24px;
        color: #000;
    }
    div.reg>p>img{
        width: 40px;
        position: relative;
        top: 14px;
        left: -15px;
    }
    div.reg>p>input{
        height: 40px;
        width: 240px;
        line-height: 40px;
        outline-style: none;
        border: 1px solid #d2d2d2;
        border-radius: 2px;
        color: #888;
        font-size: 18px;
        padding-left: 10px;
    }
    div.reg>p.red>input{
        border-color: red;
    }
    div.reg>p.red>span{
        color: red;
    }
    div.reg>p.green>input{
        border-color: #d2d2d2;
    }
    div.reg>p.green>span{
        color: green;
    }
    div.reg>p>span{
        display: block;
        width: 250px;
        height: 30px;
        text-align: left;
        margin-left: 100px;
        line-height: 30px;
        font-size: 14px;
        color: #888;
    }
    div.reg>a.goReg{
        display: block;
        width: 250px;
        height: 45px;
        background: #0083ec;
        color: #fff;
        line-height: 45px;
        text-align: center;
        border-radius: 4px;
        font-size: 24px;
        margin:10px 0 10px 96px;
    }
    div.reg>a.goLog{
        color: #0083ec;
        margin-left: 45px;
    }
    div.reg>a.goReg:hover,div>div.dialog>div.mask>a:hover{
        background: #0366ee;
        color: #fff !important;
    }
    div>div.dialog{
        position: fixed;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    div>div.dialog>div.mask,div>div.dialog>div.maskJump{
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
    div>div.dialog>div.mask>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    div>div.dialog>div.mask>a{
        background: #0083ec;
        color: #fff;
        border-radius: 2px;
        display: block;
        width: 60px;
        height: 30px;
        font-size: 20px;
        line-height: 30px;
        margin: 0 auto;
    }
    div>div.dialog>div.maskJump>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    div>div.dialog>div.maskJump>a{
        color: #0083ec;
    }
</style>
 