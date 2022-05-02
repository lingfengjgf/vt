<template>
    <div class="main">
        <ul class="list-unstyled">
            <li>
                <h3><span>昵称:</span>{{$store.getters.optUname}}</h3>
            </li>
            <li>
                <h3>
                    <span>会员:</span>
                    普通会员
                    <router-link to="/userTopUp">成为VIP</router-link>
                </h3>     
            </li>
            <li>
                <h3>
                    <span>书币:</span>
                    0
                    <router-link to="/userTopUp">充值</router-link>
                </h3>
            </li>            
            <li>
                <h3>
                    <span>绑定手机:</span>{{phone}}
                </h3>
            </li>            
            <li>
                <h3>
                    <span>绑定邮箱:</span>{{email}}
                </h3>
            </li>            
        </ul>
        <img src="http://localhost:3000/img/user/bg/userinfo.png">
    </div>
</template>

<script>
import {getUserInfo} from '../api/user'
export default {
    data() {
        return {
            email:'',
            phone:''
        }
    },
    created() {
        this.loadPage();
    },
    methods: {
        loadPage(){
            getUserInfo().then(res=>{
                if(res.data.code=1){
                    var p=res.data.data[0].phone;
                    var e=res.data.data[0].email;
                    p=p.slice(0,3)+"****"+p.slice(7);
                    var i=e.lastIndexOf("@"); 
                    e=e.slice(0,1)+"****"+e.slice(i);
                    this.phone=p;
                    this.email=e;
                }
            })
        }
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