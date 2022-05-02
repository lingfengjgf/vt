<template>
    <div class="main">
        <div class='balance'>账户余额: <span>{{balance}}</span>书币</div>
        <div>选择充值金额:</div>
        <div class="money">
            <a href="javascript:;" :class="{show:i==showM}" v-for='(m,i) of money'>
                <p><b>{{m.pay}}</b> 元</p>
                <p>{{m.bookCoin}}书币</p>
                <p class="give" v-if='m.give!=0'>送<b>{{m.give}}</b>书币</p>
                <img src="http://localhost:3000/img/user/icon/ok.png" alt="">
                <div class='mask-none' @click='showBuy' :data-i='i' data-id='m'></div> 
            </a>
        </div>
        <div>选择支付方式:</div>
        <div class="pay">
            <a href="javascript:;" class="alipay show" @click='showPay'>
                <img src="http://localhost:3000/img/user/icon/ok.png" alt=""> 
            </a>
            <a href="javascript:;" class="wechat" @click='showPay'>
                <img src="http://localhost:3000/img/user/icon/ok.png" alt="">
            </a>
        </div>
        <div class="goPay">
            <a href="javascript:;">确认充值</a>
        </div>
        <div>VIP充值:</div>
        <div class="vip">
            <a href="javascript:;" :class="{show:i==showV}" v-for='(v,i) of vip'>
                <p><b>{{v.pay}}</b> 元 /{{v.buyTime}}</p>
                <p class="give" v-if='v.vipGive!=0'>送<b>{{v.vipGive}}</b>书币</p> 
                <img src="http://localhost:3000/img/user/icon/ok.png" alt="">
                <div class='mask-none' @click='showBuy' :data-i='i' data-id='v'></div> 
            </a>                      
        </div>
        <div class="goVip">
            <a href="javascript:;">确认支付</a>
        </div>
    </div>
</template> 

<script>
    import {topup} from '../api/user'
    export default{
        data() {
            return {
                showM:0,
                showV:0,
                balance:0,
                money:[],
                vip:[]
            }
        },
        created(){
            this.loadPage();
        },
        methods:{
            showPay(e){
                var i=e.target.className.includes('show');
                if(e.target.nodeName=='A'&&!i){
                    e.target.className+=' show';
                    var as=e.target.parentNode.childNodes;
                    for(var a of as){
                        if(a!=e.target&&a.nodeName=='A'){
                            var c=a.className.split(' show')[0];
                            a.className=c;
                        }                        
                    }
                }
            },
            showBuy(e){
                var i=e.target.dataset.i;
                var id=e.target.dataset.id;
                if(id=='m'){
                    this.showM=i;
                }else{
                    this.showV=i;
                }
                
            },
            loadPage(){
                topup().then(res=>{
                    this.balance=res.data.bal[0].balance;
                    this.money=res.data.money;
                    this.vip=res.data.vip;
                })
            }
        }
    }
</script>

<style scoped>
    div.main{
        text-align: left;
    }
    div.main>div{
        margin-bottom: 20px;
    }
    div.main>div.balance{
        font-size: 20px;
    }
    div.main>div.balance>span{
        font-size: 24px;
        color: #0083ec;
        margin:0 10px;
    }
    div.main>div.money,div.main>div.vip{
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
    }
    div.main>div.money>a,div.main>div.vip>a{
        display: block;
        width: 200px;
        height: 100px;
        margin: 10px;
        padding: 15px 0 10px;
        text-align: center;
        box-sizing: border-box;
        border: 2px solid #888;
        font-size: 16px;
        border-radius: 3px;
        position: relative;
    }
    div.main>div.money>a:hover,div.main>div.money>a.show,div.main>div.vip>a:hover,div.main>div.vip>a.show{
        border-color: #0083ec;
    }
    div.main>div.money>a>img,div.main>div.vip>a>img{
        display: none;
    }
    div.main>div.money>a.show>img,div.main>div.vip>a.show>img{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 20px;
        display: block;
    }
    div.main>div.money>a>p,div.main>div.money>a>p>b,div.main>div.vip>a>p,div.main>div.vip>a>p>b{
        color: #000;
    }
    div.main>div.money>a>p.give,div.main>div.money>a>p.give>b,div.main>div.vip>a>p.give,div.main>div.vip>a>p.give>b{
        color: rgb(248, 88, 88);
    }
    div.main>div.money>a>div.mask-none,div.main>div.vip>a>div.mask-none{
        width: 200px;
        height: 100px; 
        position: absolute;
        top: -2px;
        left: -2px;
        box-sizing: border-box;
        border: 2px solid transparent;
        border-radius: 3px;      
    }
    div.main>div.pay>a{
        width: 178px;
        height: 44px;
        border: 2px solid #ccc;
        border-radius: 2px;
        display: inline-block;
        margin-left: 43px;       
        background:url(http://localhost:3000/img/user/icon/pay.png) no-repeat 1px 0;
        position: relative;
    }
    div.main>div.pay>a.wechat{
        background-position: -180px 0;
    }
    div.main>div.pay>a.show,div.main>div.pay>a:hover{
        border: 2px solid #0083ec;
    }
    div.main>div.pay>a>img{
        display: none;
    }
    div.main>div.pay>a.show>img{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 15px;
        display: block;
    }
    div.main>div.goPay>a,div.main>div.goVip>a{
        display: block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        margin-left: 43px;
        font-size: 18px;
        text-align: center;
        border-radius: 2px;
        background: #0083ec;
        color: #fff;
    }
    div.main>div.goPay>a:hover,div.main>div.goVip>a:hover{
        color: #fff !important;
        background: #2468fa;
    }
    div.main>div.vip>a>p{
        margin-top:8px;
    }
</style>