<template>
   <div class="split-div">
    <el-card :body-style="{ padding: '0px' }" class="piccard">
        <img :src="resultUrl" class="final-image"/>
        <div style="padding: 14px">
          <span style="margin-left:10px;float:left;font-size: 24px;font-weight: bold;color:rgba(6, 36, 146, 0.75)">Prompts:</span>
          <div class="bottom">
          
          </div>
        </div>
      </el-card>
   </div>

</template>

<style>
.split-div{
    position: relative;
    height: 95vh;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.split-div::before,
.split-div::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    z-index: -1;
}
.split-div::before {
    top: 0;
}

.split-div::after {
    bottom: 0;
    background-color:aliceblue; /* 下半部分的背景颜色 */
}
.piccard{
    height:85vh;
    width:70vw;
    margin-left:15vw;
    margin-top:5vh
}

.final-image{
    height:70vh;
    width:70vw;
}

</style>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


const router = useRouter();


const resultUrl=ref('')
onMounted(() => {
  // 从路由的 query 参数中获取
  resultUrl.value = router.currentRoute.value.query.resultUrl;

  
});
</script>