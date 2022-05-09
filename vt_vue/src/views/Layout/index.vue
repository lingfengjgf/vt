<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div >
        <navbar />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .main-container {
    width: calc(100% - 180px);
    margin-left: 180px;
  }
  
  .sidebar-container {
    width: 180px!important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;    
  }

</style>
