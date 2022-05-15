<template>
  <div class="manage-container">
    <div class="manage-container-top">
      <div v-show="!isSort" @click="showAddList" class="manage-container-btn">添 加</div>
      <div v-show="!isSort" @click="sortClick" class="manage-container-btn">排 序</div>
      <div v-show="isSort" @click="sortCancel" class="manage-container-btn plain">取 消</div>
      <div v-show="isSort" @click="sortConfirm" class="manage-container-btn">完 成</div>
    </div>
    <el-table :data="list" style="width: 100%" max-height="750" id="setCarouselTable">
      <el-table-column prop="sortId" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="title" label="书籍名称" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center"> </el-table-column>
      <el-table-column prop="price" label="价格(书币)" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
              <div v-show="!isSort" @click="setClick(scope.row.bookId,2)" class="manage-container-btn table-btn danger">移除</div>
              <i v-show="isSort" class="iconfont setCarouselTableSortIcon">&#xe629;</i>
          </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加首页出版书籍" :visible.sync="dialogTableVisible">
      <div class="manage-container-top">
        <el-input v-model="params.kwords" @keyup.enter.native="search" class="manage-container-input" placeholder="请输入书名/作者"></el-input>
        <div @click="search" class="manage-container-btn">搜 索</div>
      </div>
      <el-table :data="addList">
        <el-table-column property="title" label="书籍名称" align="center"></el-table-column>
        <el-table-column property="author" label="作者" align="center"></el-table-column>
        <el-table-column property="price" label="价格(书币)" width="120" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
                <div @click="setClick(scope.row.bid,1)" class="manage-container-btn table-btn">添加</div>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { publishBooks } from "../api/index";
import { setShowBooks, rankShowBooks } from "../api/manage";
import {classifySearch} from '../api/classify'
import Sortable from 'sortablejs'
export default {
  data() {
    return {
        list:[],
        addList:[],
        sortList:[],
        dialogTableVisible:false,
        params:{
          kwords:'',
          pageSize:50
        },
        sortableObj:{},
        isSort:false,
    };
  },
  created(){
      this.getList();
      this.isSort=false;
  },
  methods: {
      showAddList(){
        if(this.list.length>=16){
          this.$message.error('首页出版书籍最多可配置9本');
          return ;
        }
        this.addList=[];
        this.params.kwords='';
        this.dialogTableVisible=true;
      },
      getList(){
          publishBooks({}).then(data=>{
              if(data.data.code==1){
                let list=data.data.output;
                list.forEach((item,i)=>{
                  item.sortId=i+1;
                })
                this.sortList=JSON.parse(JSON.stringify(list));
                this.list=list;
              }
          })
      },
      getAddList(){
          classifySearch(this.params).then(data=>{
            this.addList=data.data.books;
          })
      },
      search(){
        if(!this.params.kwords){
          this.$message.error('请输入关键字查询！');
          return ;
        }
        this.getAddList();
      },
      setClick(bookId,type){
        if(type==2&&this.list.length<=6){
          this.$message.error('首页出版书籍不得少于6本');
          return ;          
        }
        setShowBooks({bookId,type,setType:1}).then(data=>{
          var key=data.data.code==1?'success':'error';
          this.$message[key](data.data.msg);
          if(data.data.code==1){
            this.getList();
          }
        })
      },
      sortClick(){
        this.isSort=true;
        var _self = this;
        var tbody = document.querySelector('#setCarouselTable .el-table__body-wrapper tbody');
        this.sortableObj = new Sortable(tbody, {
            handle: ".setCarouselTableSortIcon",
            onEnd({ newIndex, oldIndex }) {
              let list=JSON.parse(JSON.stringify(_self.sortList));
              let currRow = list.splice(oldIndex, 1)[0];
              list.splice(newIndex, 0, currRow);
              list.forEach((item,i)=>{
                item.sortId=i+1;
              })
              _self.sortList=list;
            }
        })
      },
      sortCancel(){
        if(this.sortableObj){
            this.sortableObj.destroy();
            this.sortableObj = {};
        }
        this.isSort=false;  
        let list=JSON.parse(JSON.stringify(this.list));
        this.list=[];
        this.$nextTick(()=>{
          this.list=list;
        })      
      },
      sortConfirm(){
        let list=this.sortList.map(item=>item.bookId);
        rankShowBooks({list,setType:1}).then(data=>{
          if(data.data.code==1){
            this.list=[];
            this.getList();
            this.isSort=false;
            if(this.sortableObj){
                this.sortableObj.destroy();
                this.sortableObj = {};
            }
            this.$message.success(data.data.msg);            
          }else{
            this.$message.error(data.data.msg);  
          }
        })
      }
  },
};
</script>

<style scoped>
  .setCarouselTableSortIcon{
    font-size: 24px;
    color: #0083ec;
    cursor: move;
  }
</style>
