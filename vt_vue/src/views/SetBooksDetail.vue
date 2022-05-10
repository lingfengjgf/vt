<template>
  <div class="manage-container SetBooksDetail">
    <div class="manage-container-top">
      <h3 class="SetBooksDetail-title">书籍信息</h3>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">书名:</div>
      <div class="SetBooksDetail-box-right">{{info.title}}</div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">作者:</div>
      <div class="SetBooksDetail-box-right">{{info.author}}</div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">频道:</div>
      <div class="SetBooksDetail-box-right">
        <el-select style="width:120px" v-model="currentChannel">
          <el-option
            v-for="item in channel"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">类型:</div>
      <div class="SetBooksDetail-box-right">
        <el-select style="width:120px" v-model="currentGenre">
          <el-option
            v-for="item in genre"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">其他:</div>
      <div class="SetBooksDetail-box-right">
        <el-select style="width:120px" v-model="currentOther">
          <el-option
            v-for="item in others"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">价格(书币):</div>
      <div class="SetBooksDetail-box-right">
        <el-input v-model="currentPrice" style="width:120px" @input="priceChange"  placeholder="请输入价格"></el-input>
      </div>
    </div>
    <div class="SetBooksDetail-box">
      <div class="SetBooksDetail-box-left">是否上架:</div>
      <div class="SetBooksDetail-box-right">
        <el-radio v-model="currentSale" :label="1">上架</el-radio>
        <el-radio v-model="currentSale" :label="0">下架</el-radio>        
      </div>
    </div>
    <img
      class="SetBooksDetail-img"
      v-if="info.pic"
      :src="`${baseUrl}${info.pic}`"
    />
    <div class="SetBooksDetail-bot">
      <div @click="backClick" class="manage-container-btn plain">返 回</div>
      <div @click="setClick" class="manage-container-btn">确 定</div>
    </div>
  </div>
</template>

<script>
import { setBook } from "../api/manage";
import { classifyInfo } from "../api/classify";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_IMGURL,
      info: {},
      total: 0,
      channel: [],
      genre: [],
      others: [],
      currentChannel:'',
      currentGenre:'',
      currentOther:'',
      currentPrice:'',
      currentSale:'',
      params: {
        kwords: "",
        pno: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.info = this.$route.params;
    console.log(this.info);
    let [c,g,o]=this.info.label.split('@');
    this.currentChannel=c;
    this.currentGenre=g;
    this.currentOther=o;
    this.currentPrice=this.info.price;
    this.currentSale=this.info.isSale;
    this.getLabel();
  },
  methods: {
    priceChange(){
      let reg=/^\d*$/;
      if(!reg.test(this.currentPrice)){
        this.currentPrice='';
      }
      this.currentPrice/=1;
    },
    backClick() {
      history.back();
    },
    getLabel() {
      classifyInfo({pno:0}).then((res) => {
        console.log("classifyInfo", res);
        this.channel=res.data.channel;
        this.genre=res.data.genre;
        this.others=res.data.others;
      });
    },
    setClick() {
      if(!this.currentPrice){
        this.$message.error('价格不能为空！');
        return ;
      }
      let label=[this.currentChannel,this.currentGenre,this.currentOther].join('@');
      let params = {
        bid: this.info.bid,
        label,
        price: this.currentPrice,
        isSale:this.currentSale,
      };
      setBook(params).then((data) => {
        if (data.data.code == 1) {
          this.$message.success(data.data.msg);
        } else {
          this.$message.error(data.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.manage-container.SetBooksDetail {
  width: 1000px;
  position: relative;
}
.manage-container .manage-container-top {
  width: 100%;
}
.SetBooksDetail-title {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}
.SetBooksDetail-box {
  margin-left: 510px;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 30px;
}
.SetBooksDetail-box-left {
  width: 100px;
  color: #666;
  margin-right: 20px;
  text-align: right;
}
.SetBooksDetail-box-right {
  color: #333;
}
.SetBooksDetail-img {
  position: absolute;
  top: 155px;
  left: 200px;
  width: 240px;
  height: 320px;
  box-shadow: 5px 5px 10px 5px #ddd;
}
.SetBooksDetail-bot {
  margin-top: 80px;
}
.manage-container-btn{
  margin-right: 50px;
}

</style>
