<template>
  <el-container class="main-container" style="margin:0px 0px 0px 0px;padding:0px 0px 0px 0px">
    <el-header style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px;margin:0px 0px 0px 0px;">
      <!-- <myNav></myNav> -->
      <myNavTwo></myNavTwo>
    </el-header>
    <el-main style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px;margin:0px 0px 0px 0px;">
      <!-- <firstPage></firstPage> -->
      <!-- <firstPageTwo></firstPageTwo> -->
      <router-view></router-view>
    </el-main>
    <el-footer style="padding-left:0px;padding-right: 0px;padding-top:0px;padding-bottom: 0px;margin:0px 0px 0px 0px;height:150px">
      <el-row style="margin-top:20px">
        <el-col :span="11" style="display:flex;height:100px;align-items: center;justify-content: center;text-align: center">
          <img src="picture.svg" style="height:50px;width:50px;margin-left:30vw">
        </el-col>
        <el-col :span="13" style="color:white;text-align: left;font-size: 14px;">
          <p>
            <el-icon class="textmini"><phone/></el-icon>
            Phone:18981729781
          </p>
          <p>
            <el-icon class="textmini"><phone/></el-icon>
            E-mail:charlotteyanggg@qq.com
          </p>
          <p>
            <el-icon class="textmini"><phone/></el-icon>
            Address:4800 Cao'an Road, Jiading District, Shanghai, China
          </p>
        </el-col >
      </el-row>
    
    </el-footer>
  </el-container>
</template>


<script setup>
import myNavTwo from './components/myNavTwo.vue'
import {Phone} from '@element-plus/icons-vue';


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

.el-footer{
  background-color: #0d1e72;
}

body, html {
  margin: 0;
  padding: 0;
}

</style>
