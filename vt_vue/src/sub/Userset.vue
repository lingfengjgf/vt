<template>
    <div class="main">
        <p class="uname" :class='{red:unameErr,green:unameSuc}'>
            <b>修改昵称：</b>
            <input type="text" @focus='fHint' v-model='uname' @blur='bHint' data-i="1">
            <span>{{unameSpan}}</span>
        </p>
        <p class="avatar">
            <b>修改头像：</b>
            <a href="javascript:;" v-for="(ava,i) of avaBgInfo.avatar" :class="{show:avaShow==i}" :key="i"><img @click="changeAva" :data-i="i" :data-src="ava.pic" :src="`${baseUrl}${ava.pic}`"></a>
        </p>
        <p class="bg">
            <b>修改背景：</b>
            <a href="javascript:;" v-for="(b,i) of avaBgInfo.bg" :class="{show:bgShow==i}" :key="i"><img @click="changeBg" :data-i="i" :data-src="b.pic"  :src="`${baseUrl}/img/user/bg/${b.pic}`"></a>
        </p>
        <p class="email" :class='{red:emailErr,green:emailSuc}'>
            <b>修改邮箱：</b>
            <input type="text" @focus='fHint' v-model='email' @blur='bHint' data-i="2">
            <span>{{emailSpan}}</span>
        </p>
        <a @click="set" href="javascript:;">确定</a>
        <div @click='close' class="dialog" v-show='setSuc'>
            <div class='mask'>
                <p>修改成功！</p>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { setUserInfo,getUserInfo } from '../api/user'
import {checkUname,checkEmail} from '../api/register'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            baseUrl:process.env.VUE_APP_IMGURL,
            avatar:[],
            bg:[],
            avaSrc:'',
            oldAva:'',
            oldBg:'',
            bgSrc:'',
            avaShow:-1,
            bgShow:-1,
            uname:'',
            oldUname:'',
            email:'',
            oldEmail:'',
            unameSpan:'',
            emailSpan:'',
            unameErr:false,
            emailErr:false,
            unameSuc:false,
            emailSuc:false,
            setSuc:false,
        }
    },
    computed:{
        ...mapState({
            userInfo:state => state.userInfo,
            avaBgInfo:state => state.avaBgInfo,
        })
    },
    watch:{
        userInfo(val){
            console.log('watch userInfo:',val);
        }
    },
    created(){
        this.loadpage();
    },
    methods: {
        loadpage(){
            this.uname=this.userInfo.uname;
            this.email=this.userInfo.email;
            this.avatar=this.userInfo.avatar;
            this.bg=this.userInfo.bg;
            this.bgSrc=this.bg;
            this.oldUname=this.uname;
            this.oldEmail=this.email;
            this.oldBg=this.bg;
            this.oldAva=this.avatar;
            this.avaSrc=this.avatar;
        },
        set(){
            var u=this.uname;
            var e=this.email;
            var a=this.avaSrc;
            var b=this.bgSrc;           
            // if(a==this.oldAva){
            //     a="";
            // }
            // if(b==this.oldBg){
            //     b="";
            // }
            // if(u==this.oldUname){
            //     u="";               
            // }
            // if(e==this.oldEmail){
            //     e="";
            // }
            console.log(a,b,u,e);
            if(u||e||a||b){
                var postData={
                    uname:u,
                    email:e,
                    avatar:a,
                    bg:b
                };
                setUserInfo(postData).then(res=>{
                    if(res.data.code==1){
                        //console.log(res);
                        this.oldUname=u;
                        this.oldEmail=e;
                        this.oldAva=a;
                        this.oldBg=b;
                        this.setSuc=true;
                        this.$store.commit("changeUserAva",a);
                        this.$store.commit("changeUserBg",b);
                        this.$store.commit("changeUname",u);
                        this.$message.success('修改成功');
                        this.getInfo();
                    }
                })
            }else{
                console.log("没有修改");
            }
        },
        changeAva(e){
            var src=e.target.dataset.src;
            var i=e.target.dataset.i;
            this.avaSrc=src;
            this.avaShow=i;
        },
        changeBg(e){
            var src=e.target.dataset.src;
            var i=e.target.dataset.i;
            this.bgSrc=src;
            this.bgShow=i;
        },
        checkU(){
            var uname=this.uname;
            if(uname!=this.oldUname){
                var postData={uname};
                checkUname(postData).then(res=>{
                    if(res.data.code==1){
                        this.unameSec=true;
                        this.unameErr=false;
                        this.count++;
                    }else{
                        this.unameErr=true;
                        this.unameSec=false;
                    }
                    this.unameSpan=res.data.msg;
                })                
            }
        },
        checkE(){
            var email=this.email;
            if(email!=this.oldEmail){
                var postData={email};
                checkEmail(postData).then(res=>{
                    if(res.data.code==1){
                        this.emailSec=true;
                        this.emailErr=false;
                        this.count++;
                    }else{
                        this.emailErr=true;
                        this.emailSec=false;
                    }
                    this.emailSpan=res.data.msg;
                })                
            }
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
                    this.emailErr=false;
                    this.emailSuc=false;
                    this.emailSpan='';
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
            }
            
        }, 
        close(){
            this.setSuc=false;
        }, 
        getInfo(){
            getUserInfo().then(data=>{
                if(data.data.code==1){
                    this.$store.commit("changeUserInfo",data.data.userInfo);
                }
            })
        }      
    }
}
</script>

<style scpoed>
    div.main{
        padding: 10px;
    }
    div.main>p>b{
        color: #000;
        font-weight: normal;
    }
    div.main>p>span{
        color: #000;
        margin: 0 10px;
    }
    div.main>p>input{
        height: 40px;
        width: 240px;
        line-height: 40px;
        outline-style: none;
        border: 1px solid #d2d2d2;
        border-radius: 3px;
        color: #333;
        font-size: 18px;
        padding-left: 10px;
    }
    div.main>p>input:focus{
        border-color: #0083ec;
    }
    div.main>p.red>input{
        border-color: red;
    }
    div.main>p.red>span{
        color: red;
    }
    div.main>p.green>input{
        border-color: #d2d2d2;
    }
    div.main>p.green>span{
        color: green;
    }
    div.main>p{
        margin-bottom: 20px;
    }
    div.main>p.avatar,div.main>p.bg{
        display: flex;
    }
    div.main>p.avatar>a,div.main>p.bg>a{
        margin-right: 20px;
        display: block;
        width: 50px;
        height: 50px;
        border: 2px solid transparent;
    }
    div.main>p.avatar>a:hover,div.main>p.avatar>a.show,div.main>p.bg>a:hover,div.main>p.bg>a.show{
        border: 2px solid #0083ec;
    }
    div.main>p.avatar>a>img,div.main>p.bg>a>img{
        width: 50px;
    }
    div.main>a{
        display: block;
        width: 100px;
        height: 30px;
        margin-bottom: 8px;
        margin-left:100px;
        text-align: center;
        border-radius: 3px;
        line-height: 30px;
        background: #0083ec;
        color: #fff;
    }
    div.main>a:hover{
        color: #fff !important;
    }
</style>