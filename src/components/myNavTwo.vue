<template>
    <el-menu
      :default-active="activeIndex"
      v-model="selectedMenuIndex"
      class="el-menu-main"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="padding:0px 0px 0px;"
      text-color="#888888"
      active-text-color="#0b2a87"
    >
      <el-menu-item index="0">
        <div  style="text-align: center;justify-content: center;align-items: center;">
          <img src="../../public/picture.svg" style="margin-bttom:20px;height: 44px;width:44px;text-align: center;justify-content: center;"> 
          <span style="margin-left:20px;color: #0b2a87;font-weight: bold;font-size: 24px;">Image Generator</span>
          <span style="margin-left:40px;color:#001b6bbe;font-size: 16px;">Picture how you feel</span>
        </div>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="Lyrics">Lyrics</el-menu-item>
      <el-menu-item index="Lines">Lines</el-menu-item>
      <el-menu-item index="About">About</el-menu-item>
      <el-drawer v-model="drawerOn" title="About" :direction="direction" :before-close="handleClose">
          <div style="display:flex;flex-direction: column;text-align:left;"> 
            <p><span style="font-size:17px;font-weight: bold;color:#2d4aa3">author:</span>Charotte Yang</p>
            <p><span style="font-size:17px;font-weight: bold;color:#2d4aa3">github:</span>https://github.com/llRagdoll/image_generatorr</p>
            <p><span style="font-size:17px;font-weight: bold;color:#2d4aa3">e-mail:</span>charlottyanggg@qq.com  </p>
          </div>
      </el-drawer>
      <el-menu-item index="Avatar" >
        <el-avatar src="cat.jpg" :size="40" style="align-items: center;justify-content: center;text-align: center;margin-top:10px"/>
      </el-menu-item>
    </el-menu>
  </template>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const router=useRouter()
const store=useStore()
const activeIndex = ref('Lyrics');
// const selectedMenuIndex = ref('');
const drawerOn=ref(false)

const handleSelect = (index) => {
  const currentRoute = router.currentRoute.value;
    store.dispatch('updateChoice', index);
    console.log(store.getters.getChoice);
    if(index==='About'){
      drawerOn.value=true
    }

    if (currentRoute.path !== '/') {
      router.push('/');
    }

  };

// export default{
//   activeIndex,
//   selectedMenuIndex,
//   handleSelect
// };
</script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
 


  </style>