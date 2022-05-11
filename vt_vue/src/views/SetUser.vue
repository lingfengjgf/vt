<template>
  <div class="manage-container">
    <div class="manage-container-top">
      <el-select style="width: 120px" v-model="currentKey">
        <el-option
          v-for="item in keyList"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="params.value"
        class="manage-container-input"
        :placeholder="placeholder"
        @keyup.enter.native="search"
      ></el-input>
      <div @click="search" class="manage-container-btn">搜 索</div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="uname" label="昵称" align="center" >
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <img :src="`${baseUrl}${scope.row.avatar}`" class="table-avatar">
        </template>        
      </el-table-column>
      <el-table-column prop="isVIP" label="VIP" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isVIP==1?"是":"否"}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.state==1?"正常":"黑名单"}}</span>
        </template> 
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <div
            @click="setClick(scope.row, '0')"
            v-if="scope.row.state == 1"
            class="manage-container-btn table-btn danger"
          >
            加入黑名单
          </div>
          <div
            @click="setClick(scope.row, '1')"
            v-else
            class="manage-container-btn table-btn"
          >
            解除黑名单
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="manage-container-bot">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserList,setUser } from "../api/manage";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_IMGURL,
      list: [],
      total: 0,
      currentKey:'uname',
      placeholder:'',
      keyList:[
        {key:'uname',label:'昵称'},
        {key:'phone',label:'手机号'},
        {key:'email',label:'邮箱'},
      ],
      params: {
        value: "",
        key: "",
        pno: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  watch:{
    currentKey(val){
      this.placeholder='请输入'+ (val=='uname'?'昵称':val=='phone'?'手机号':'邮箱');
      this.params.value='';
    }
  },
  methods: {
    getList() {
      getUserList(this.params).then((data) => {
        if(data.data.code==1){
          this.list = data.data.list;
          this.total = data.data.count;
        }else{
          this.$message.error(data.data.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.params.pno = val - 1;
      this.getList();
    },
    search() {
      this.params.key=this.params.value?this.currentKey:'';
      this.params.pno = 0;
      this.getList();
    },
    setClick(item, state) {
      console.log(item, state);
      let params = {
        uid: item.uid,
        state
      };
      setUser(params).then((data) => {
        if (data.data.code == 1) {
          this.$message.success(data.data.msg);
          this.getList();
        } else {
          this.$message.error(data.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.table-avatar{
  width: 40px;
  height: 40px;
}
</style>
