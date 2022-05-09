<template>
  <div class="manage-container">
    <div class="manage-container-top">
      <el-input v-model="params.kwords" @keyup.enter.native="search" class="manage-container-input" placeholder="请输入书名/作者"></el-input>
      <div @click="search" class="manage-container-btn">搜 索</div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="书籍名称" align="center"> </el-table-column>
      <el-table-column prop="author" label="作者" align="center"> </el-table-column>
      <el-table-column prop="channel" label="频道" align="center" width="100"> </el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="100"> </el-table-column>
      <el-table-column prop="other" label="其他" align="center" width="100"> </el-table-column>
      <el-table-column prop="price" label="价格(书币)" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
              <div @click="goDetail(scope.row)" class="manage-container-btn table-btn">修改信息</div>
              <div @click="setClick(scope.row,'0')" v-if="scope.row.isSale==1" class="manage-container-btn table-btn danger">下架</div>
              <div @click="setClick(scope.row,'1')" v-else class="manage-container-btn table-btn">上架</div>
          </template>
      </el-table-column>
    </el-table>
    <div class="manage-container-bot">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { classifySearch } from "../api/classify";
import { setBook } from "../api/manage";
export default {
  data() {
    return {
        list:[],
        total:0,
        params:{
            kwords:"",
            pno:0,
            pageSize:10,
        }
    };
  },
  created(){
      this.getList();
  },
  methods: {
      getList(){
          classifySearch(this.params).then(data=>{
              this.list=data.data.books;
              this.total=data.data.count;
              this.list.forEach(item=>{
                  let [channel,type,other]=item.label.split('@');
                  item.channel=channel;
                  item.type=type;
                  item.other=other;
              })
          })
      },
      handleCurrentChange(val){
          this.params.pno=val-1;
          this.getList();
      },
      search(){
        this.params.pno=0;
        this.getList();
      },
      setClick(item,isSale){
        console.log(item,isSale);
        let params={
          bid:item.bid,
          label:item.label,
          price:item.price,
          bid:item.bid,
          isSale,
        }
        setBook(params).then(data=>{
          if(data.data.code==1){
            this.$message.success(data.data.msg);
            this.getList();
          }else{
            this.$message.error(data.data.msg);
          }
        })
      },
      goDetail(item){
        this.$router.push({
          name:'setBooksDetail',
          params:item
        })
      }
  },
};
</script>

<style scoped></style>
