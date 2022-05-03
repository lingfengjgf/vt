<template>
    <header id='header'>
        <div>
            <div class="logo">
                <router-link to="/"><img data-i="0" src="../assets/img/icon/logo.png" ></router-link>
            </div>
            <div class="nav">
                <ul class="list-unstyled">
                    <li :class="{active:$store.getters.optHeaderI==0}"><router-link  to="/">首页</router-link></li>
                    <li :class="{active:$store.getters.optHeaderI==1}"><router-link  to="/classify">分类</router-link></li>
                    <li :class="{active:$store.getters.optHeaderI==2}"><router-link  to="/rank">排行</router-link></li>
                    <li :class="{active:$store.getters.optHeaderI==3}"><a @click="goBookShelf" href="javascript:;">书架</a></li>
                    <li :class="{active:$store.getters.optHeaderI==4}"><a @click="goTopUp" href="javascript:;">充值</a></li>
                </ul>
            </div>
            <div class="login">
                <input type="text" v-model='kwords' @keyup.13='search()' placeholder="书名/作者"/>
                <a @click='search()' class='search' href="javascript:;">
                    <img src="../assets/img/icon/search.png">
                </a>
                <router-link :class="{hide:$store.getters.optIsLogin==1}" to="/login">登录</router-link>
                <router-link :class="{hide:$store.getters.optIsLogin==1}" to="/register">注册</router-link>
                <router-link  to="/user" :class="{hide:$store.getters.optIsLogin==0}" class="avatar">
                    <img :src="`${baseUrl}${$store.getters.optUserAva}`">
                </router-link>
                <a @click='logoutClick' :class="{hide:$store.getters.optIsLogin==0}" href="javascript:;">注销</a>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='isLogin'>
            <div class='mask'>
                <p>您还没有登录哦！</p>
                <router-link class="login" to="/login">立即登陆>></router-link>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </header>
</template>

<script>
    import {logout} from '../api/login'
    export default {
        data(){
            return{
                baseUrl:process.env.VUE_APP_IMGURL,
                kwords:'',
                isLogin:false
            }
        },
        watch: {
            $route(to,from){
                this.kwords=this.$route.query.kwords;
            }
        },
        methods:{
            search(){
                var k=this.kwords;
                if(k)
                    this.$router.push('/classify?kwords='+k);
                else
                    this.$router.push('/classify');
            },
            close(){
                this.isLogin=false;
            },
            logoutClick(){
                this.$store.commit("changeLogin",0);
                this.$router.push('/');
                logout();
            },
            goTopUp(){
                if(this.$store.getters.optIsLogin==0){
                    this.isLogin=true;
                }else{
                    this.$router.push('/userTopUp');
                }
            },
            goBookShelf(){
                if(this.$store.getters.optIsLogin==0){
                    this.isLogin=true;
                }else{
                    this.$router.push('/bookshelf');
                }
            },
        }
    }
</script>

<style scoped>
    header>div{
        width: 1140px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-top: 15px;
    }
    header>div>div.nav>ul{
        display: flex;
        margin:15px 0px 0px 100px;
        width: 360px;
    }
    header>div>div.nav>ul>li{
        margin-right: 20px;
        width: 40px;
        height: 30px;
        text-align: center;
    }
    header>div>div.nav>ul>li>a{
        font-size: 18px;
    }
    header>div>div.nav>ul>li.active>a{
        color: #0083ec;
    }
    header>div>div.nav>ul>li:hover,header>div>div.nav>ul>li.active{
        border-bottom: 2px solid #0083ec;
    }
    header>div>div.login{
        display: flex;
        margin-top: 15px;
        position: relative;
    }
    header>div>div.login>input{
        height: 32px;
        width: 200px;
        line-height: 32px;
        outline-style: none;
        border: 1px solid #d2d2d2;
        border-radius: 50px;
        color: #333;
        font-size: 14px;
        padding-left:20px; 
        padding-right: 30px;
        box-sizing: border-box;
    }
    header>div>div.login>input:hover,header>div>div.login>input:focus{
        border-color:#0083ec;
    }
    header>div>div.login>a{
        display: block;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #d2d2d2;
        border-radius: 3px;
        margin-left: 20px;
    }
    header>div>div.login>a:hover{
        color: #fff !important;
        background: #0083ec;
    }
    header>div>div.login>a.search{
        position: absolute;
        top:3px;
        left: 150px;
        border: none;
        width: 25px;
        height: 25px;
    }
    header>div>div.login>a.search:hover{
        background: transparent;
    }
    header>div>div.login>a.search>img{
        width: 25px;
    }
    header>div>div.login>a.avatar{
        display: block;
        width: 30px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
    }
    header>div>div.login>a.avatar:hover{
        background:transparent; 
    }
    header>div>div.login>a.avatar>img{
        width: 30px;
    }
    header>div.dialog{
        position: fixed;
        margin: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    header>div.dialog>div.mask{
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
    header>div.dialog>div.mask>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    header>div.dialog>div.mask>a.login{
        color: #0083ec;
    }
    header>div.dialog>div.mask>a.close{
        position: absolute;
        top: 10px;
        right:20px;
        display:block;
        width:20px;
        height:20px;
    }
    header>div.dialog>div.mask>a.close>span{
        font-size: 32px;
    }
    .hide{
        display: none !important;
    }
</style>