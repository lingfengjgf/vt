<template>
  <div class="app-main">
    <el-menu
      :default-active="$route.path"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#0083ec">
      <template v-for="item in menu">
        <el-menu-item v-if="!item.children" :index="item.path"  :key="item.path">
          <i class="iconfont mr-10" :class="[item.icon?item.icon:'iconcaidan']"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title">
            <i class="iconfont mr-10" :class="[item.icon?item.icon:'iconcaidan']"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">{{subItem.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data(){
    return {
      menu:[]
    }
  },
  created(){
    var routes=sessionStorage.getItem('manageRoutes');
    if(routes){
      this.menu=JSON.parse(routes);
      console.log("manageRoutes:",this.menu);
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
