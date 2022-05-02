<template>
    <div>
        <section>
            <div class="top" :style="`background-image: url(http://localhost:3000/img/user/bg/user_${$store.getters.optUserBg})`">            
                <router-link to="/userinfo" class="avatar">
                    <img :src="`http://localhost:3000${$store.getters.optUserAva}`">
                </router-link>
                <div>
                    <h2>{{$store.getters.optUname}}</h2>
                    <router-link to="/userset">修改个人信息</router-link>
                </div>            
            </div>
            <div class="content">
                <ul class="list-unstyled">
                    <li><router-link to="/userinfo" :class="{active:$store.getters.optUserShow==0}">基 本 信 息</router-link></li>
                    <li><router-link to="/userset" :class="{active:$store.getters.optUserShow==1}">修 改 资 料</router-link></li>
                    <li><router-link to="/userTopUp" :class="{active:$store.getters.optUserShow==2}">充 值 中 心</router-link></li>
                    <li><router-link to="/userHistory" :class="{active:$store.getters.optUserShow==3}">消 费 记 录</router-link></li>
                </ul>
                <div class="info">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default { 
    data() {
        return {

        }
    },
    methods:{

    }
}
</script>

<style scoped>
    section{
        margin-top: 30px;
    }
    section>div.top{
        width: 100%;
        height: 240px;
        background: url(http://localhost:3000/img/user/bg/user_bg.jpg) no-repeat;
        background-size: cover;
        text-align: left;
        padding: 60px 0px 0px 20px;
    }
    section>div.top{
        display: flex;
        box-sizing: border-box;
    }
    section>div.top>a.avatar{
        display: block;
        width: 100px;
        height: 100px;
        border: 5px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        /* background: url(http://localhost:3000/img/user/icon/0018.gif) no-repeat;
        background-position: -2px -2px;
        background-position: -8px -2px; */
    }
    section>div.top>a.avatar>img{
        width: 90px;
    }
    section>div.top>div>h2{
        color: #fff;
        margin:30px 10px 10px;
    }
    section>div.top>div>a{
        margin-left: 10px;
        padding-left: 20px;
        color: #fff;
        background: url(http://localhost:3000/img/user/icon/pen.png) no-repeat;
        background-position: 0px -4px;
    }
    section>div.top>div>a:hover{
        background: url(http://localhost:3000/img/user/icon/pen_blue.png) no-repeat;
        background-position: 0px -4px;
    }
    section>div.content{
        text-align: left; 
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    section>div.content>ul{
        width: 200px;
    }
    section>div.content>ul>li>a{
        display: block;
        width: 200px;
        height: 50px;
        background: #ddd;
        color: #0083ec;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        border-left:2px solid #ddd;
        box-sizing: border-box;
    }
    section>div.content>ul>li:first-child>a{
        border-radius: 3px 3px 0 0;
    }
    section>div.content>ul>li:last-child>a{
        border-radius: 0 0 3px 3px;
    }
    section>div.content>ul>li>a:hover{
        border-left:2px solid #0083ec;
        background: #bbb;
    }
    section>div.content>ul>li>a.active{
        background: #0083ec;
        color: #fff;
        border-left-color: #0083ec;
    }
    section>div.content>ul>li>a.active:hover{
        color: #fff !important;
    } 
    section>div.content>div.info{
        width: 920px;
        box-sizing: border-box;
        padding: 20px;
        background: #ddd;
        border-radius: 3px;
    }  
</style>