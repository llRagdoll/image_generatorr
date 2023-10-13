<template>
  <el-container class="main-container" style="margin:0px 0px 0px 0px">
    <el-header style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px">
      <!-- <myNav></myNav> -->
      <myNavTwo></myNavTwo>
    </el-header>
    <el-main style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px">
      <!-- <firstPage></firstPage> -->
      <!-- <firstPageTwo></firstPageTwo> -->
      <router-view></router-view>
    </el-main>
    <el-footer style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px">
    </el-footer>
  </el-container>
</template>


<script>
// import myNav from './components/myNav.vue'
// import firstPage from './components/firstPage.vue'
import myNavTwo from './components/myNavTwo.vue'
//import firstPageTwo from './components/firstPageTwo.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter();
export default {
  name: 'App',
  components: {
    //  myNav,
    //  firstPage,
     myNavTwo,
     //firstPageTwo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0px 0px 0px 0px;
  padding:0px 0px 0px 0px
}

.main-container{
  margin:0px 0px 0px 0px;
  padding:0px,0px,0px,0px
}

.el-header ::v-deep{
  padding:0px 0px 0px 0px !important;
  padding-left:0px !important
}
.el-footer{
  background-color: #0d1e72;
}

body, html {
  margin: 0;
  padding: 0;
}

</style>
