<template>
  <div class="manage-container">
    <div class="manage-container-top">
      <div @click="search" class="manage-container-btn">添 加</div>
      <div @click="search" class="manage-container-btn">排 序</div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>          
      </el-table-column>
      <el-table-column prop="title" label="书籍名称" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center"> </el-table-column>
      <el-table-column prop="price" label="价格(书币)" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
              <div @click="setClick(scope.row,'0')" class="manage-container-btn table-btn danger">移除</div>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCarousel } from "../api/index";
import { setBook } from "../api/manage";
export default {
  data() {
    return {
        list:[],
    };
  },
  created(){
      this.getList();
  },
  methods: {
      getList(){
          getCarousel({}).then(data=>{
              if(data.data.code==1){
                this.list=data.data.output;
              }
          })
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
  },
};
</script>

<style scoped></style>
