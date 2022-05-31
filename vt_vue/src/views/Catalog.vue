<template>
    <div>
        <section>
            <div class="top">
                <h2>{{list.title}}</h2>
                <p>{{list.author}}</p>
                <div>
                    <h4>正文</h4>
                    <p>
                        <span>共{{list.catalogs.length}}章</span>
                        <span>{{list.words}}万字</span>
                    </p>
                </div>
            </div>
            <div class="content">
                <ul class="list-unstyled">
                    <li v-for="(l,i) of list.catalogs" :key="i">
                        <a @click="goRead" :data-p="i" href="javascript:;">{{l}}</a>
                        <span v-show="num<i">V I P</span>
                    </li>
                </ul>
            </div>
        </section>
        <div @click='close' class="dialog" v-show='isLogin'>
            <div class='mask'>
                <p>您还没有登录哦！</p>
                <router-link class="login" to="/login">立即登陆>></router-link>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
        <div @click='close' class="catalog-dialog" v-show='isVIP'>
            <div class='mask vip'>
                <p>该章节需要购买本书或成为VIP后才能阅读哦！</p>
                <!-- <router-link class="login" to="/userTopUp">立即购买</router-link>
                <router-link class="login" to="/userTopUp">成为VIP</router-link> -->
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {catalogList,readCheck} from '../api/catalog';
export default {
    props:['bid'],
    data() {
        return {
          list:{title:'',author:'',words:0,catalogs:[],label:''},
          isLogin:false,
          isVIP:false,
          num:0 
        }
    },
    created() {
        this.loadPage();
    },
    methods: {
        loadPage(){
            catalogList({bid:this.bid}).then(res=>{
                this.spLabel(res.data.data,2);
                this.list=res.data.data[0];
                var arr=this.list.catalogs.split("@");
                this.list.catalogs=arr;
                if(this.list.label=='免费'){
                    this.num=this.list.catalogs.length;
                }else{
                    this.num=4;
                }
                //console.log(this.list);
            })
        },
        goRead(e){
            var isLog=this.$store.getters.optIsLogin;
            var p=e.target.dataset.p;
            if(this.num==4&&isLog==0&&p>4){
                this.isLogin=true;
                return;
            }
            readCheck({bid:this.bid}).then(res=>{
                console.log(res.data);
                if(res.data.isVIP==0&&res.data.isBuy==0){
                    this.isVIP=true;
                }else{
                    var bid=this.bid;
                    this.$router.push("/read/"+this.bid+"/"+p);            
                }
            })
        },
        close(){
            this.isLogin=false;
            this.isVIP=false;
        },
    },
}
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }
    section>div.top>h2{
        margin-bottom: 10px;
    }
    section>div.top>div{
        display: flex;
        justify-content: space-between;
    }
    section>div.top>div>h4{
        color: #0083ec;
        font-size: 24px;
    }
    section>div.top>div>p>span{
        margin-left: 10px;
    }
    section>div.content{
        background: #fff;
    }
    section>div.content>ul{
        width: 100%;
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
    }
    section>div.content>ul>li{
        width: 350px;
        padding: 5px;
        margin:0 10px 10px; 
        border-bottom: 1px dashed #888;
        display: flex;
        justify-content: space-between;
    }
    section>div.content>ul>li>a{
        font-size: 18px;
        max-width: 340px;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    section>div.content>ul>li>span{
        display: block;
        background: #0083ec;
        color: #fff;
        border-radius: 5px;
        width: 40px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin-top: 5px;
    }
    div.catalog-dialog{
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
    div.catalog-dialog>div.mask{
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
    div.catalog-dialog>div.mask>p{
        margin-top: 66px;
        margin-bottom: 10px;
    }
    div.catalog-dialog>div.mask>a.login{
        color: #0083ec;
    }
    div.catalog-dialog>div.mask>a.close{
        position: absolute;
        top: 10px;
        right:20px;
        display:block;
        width:20px;
        height:20px;
    }
    div.catalog-dialog>div.mask>a.close>span{
        font-size: 32px;
    } 
    div.catalog-dialog>div.mask.vip{
        width: 450px;
    } 
    div.catalog-dialog>div.mask.vip>a+a{
        margin-left: 20px;
    } 
</style>