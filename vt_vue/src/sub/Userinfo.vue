<template>
    <div class="main">
        <ul class="list-unstyled">
            <li>
                <h3><span>昵称:</span>{{userInfo.uname}}</h3>
            </li>
            <li>
                <h3>
                    <span>会员:</span>
                    普通会员
                    <!-- <router-link to="/userTopUp">成为VIP</router-link> -->
                </h3>     
            </li>
            <li>
                <h3>
                    <span>书币:</span>
                    {{userInfo.balance?userInfo.balance:0}}
                    <!-- <router-link to="/userTopUp">充值</router-link> -->
                </h3>
            </li>            
            <li>
                <h3>
                    <span>绑定手机:</span>{{userInfo.phone}}
                </h3>
            </li>            
            <li>
                <h3>
                    <span>绑定邮箱:</span>{{userInfo.email}}
                </h3>
            </li>            
        </ul>
        <img :src="`${baseUrl}/img/user/bg/userinfo.png`">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            baseUrl:process.env.VUE_APP_IMGURL,
            email:'',
            phone:''
        }
    },
    computed:{
        ...mapGetters({
            userInfo:'optUserInfo'
        })
    },
    methods: {
    },
}
</script>

<style scoped>
    div.main{
        position: relative;
        padding: 10px;
    }
   ul>li{
       display: flex;
       padding: 20px 10px;
   }
   ul>li>h3{
       margin: 0 10px;
   } 
   ul>li>h3>span{
       font-weight: normal;
       margin-right: 10px;
   }
   ul>li>h3>a{
       color: #0083ec;
   }
   div.main>img{
       position: absolute;
       top:0px;
       right: 0px;
   }
</style>