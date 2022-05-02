<template>
  <div>
    <Header></Header>
    <router-view v-if='isRouterAlive' :bid="bid" :readed="readed"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import '@/assets/common.css'
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  props:["bid","readed"],
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  },
}
</script>
