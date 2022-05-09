<template>
  <div class="manage-container">
    <div class="manage-container-top">
      <div @click="backClick" class="manage-container-btn">返 回</div>
    </div>    
  </div>
</template>

<script>
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
    console.log(this.$route);
  },
  methods: {
      backClick(){
        history.back();
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
      }
  },
};
</script>

<style scoped></style>
