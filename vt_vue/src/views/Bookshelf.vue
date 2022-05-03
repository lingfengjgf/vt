<template>    
    <section>
        <div>
            <ul :class="{hide:show==1}">
                <li v-for='(b,i) of books' :key="i">
                    <img :src="`${baseUrl}${b.pic}`">
                    <div>
                        <h4>{{b.title}}</h4>
                        <p>{{b.author}}</p>
                        <p>{{b.label}}</p>
                    </div>
                    <div>
                        <router-link :to="`/read/${b.bid}/${b.readed}`" href="javascript:;">继续阅读</router-link>
                        <router-link :to="`/catalog/${b.bid}`">章节目录</router-link>
                        <a @click="delClick" :data-id="b.bid"  :data-i="i" href="javascript:;">移出书架</a>
                    </div>
                </li>

                <li>
                    <router-link to="/classify">+</router-link>
                </li>
            </ul>
            <div class="noBook" :class="{show:show==1}">
                <img :src="`${baseUrl}/img/bookshelf/bookshelf-empty.png`">
                <h3>书架都空啦</h3>
                <router-link to="/classify">去找书</router-link>
            </div>
        </div>
    </section>
      
</template>

<script>
    import {bookshelfList,delBook} from '../api/bookshelf';
    export default{
        data() {
            return {
                baseUrl:process.env.VUE_APP_IMGURL,
                books:[],
                show:0
            }
        },
        created() {
            this.loadPage();
        },
        methods: {
            loadPage(){
                bookshelfList().then(res=>{
                    if(res.data.code==1){
                        this.books=res.data.data;
                        this.spLabel(this.books,1);
                    }else{
                        this.books=[];
                        this.show=1;
                    }                    
                    console.log(res.data);
                })
            },
            delClick(e){
                var bid=e.target.dataset.id;
                var i=e.target.dataset.i;
                delBook({bid}).then(res=>{
                    if(res.data.code==1){
                        this.books.splice(i,1);
                    }
                    else
                        console.log("删除失败");
                })
            },
            goRead(){
                this.$router.push("/read/"+this.bid+"/0");
                //console.log(bid);
            }
        },
    }
</script>

<style scoped>
    section>div{
        background: #fff;
    }
    section>div>ul{
        list-style: none;
        padding: 20px 15px 10px;
        display: flex;
        flex-wrap: wrap;
    }
    section>div>ul>li{
        display: flex;
        padding: 15px;
        width: 370px;
        height: 145px;
        box-sizing: border-box;
    } 
    section>div>ul>li:hover{
        border: 1px solid #ddd;
        box-shadow: 2px 2px 10px #000;
    }
    section>div>ul>li>img{
        width: 90px;
        height: 120px;
    }
    section>div>ul>li>div{
        width: 115px;
        line-height: 30px;
    }
    section>div>ul>li>div>h4{
        font-size: 16px;
        margin: 15px 0 10px;
        padding-left: 10px;
        text-align: left;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    section>div>ul>li>div>p{
        margin-bottom: 0px;
        padding-left: 10px;
        text-align: left;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    section>div>ul>li>div>a,section>div>div.noBook>a{
        display: block;
        width: 100px;
        height: 30px;
        margin-bottom: 8px;
        text-align: center;
        border-radius: 2px;
        background: #ddd;
        color: #0083ec;
    }
    section>div>ul>li>div>a:first-child{
        margin-top: 6px;
    }
    section>div>ul>li>div>a:hover,section>div>div.noBook>a:hover{
        background: #0083ec;
        color: #fff !important;
    }
    section>div>ul>li>a{
        display: block;
        width: 40px;
        height: 40px;
        font-size: 36px;
        text-align: center;
        line-height: 36px;
        margin: 0 auto;
        margin-top: 40px;
        border: 1px solid #888;
        border-radius: 50%;
        transition: all .5s;
    }
    section>div>ul>li>a:hover{
        border-color: #0083ec;
        transform: rotate(360deg);
    }
    section>div>div.noBook{
        padding: 30px;
        display:none;
    }
    section>div>div.noBook.show{
        display:block;
    }
    section>div>div.noBook>img{
        width: 300px;
    }
    section>div>div.noBook>h3{
        margin: 20px 0;
    }
    section>div>div.noBook>a{
        margin: 0 auto;
        line-height: 30px;
    }
    .hide{
        display: none;
    }
</style>