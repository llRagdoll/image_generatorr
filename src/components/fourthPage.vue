<template>
    <div class="split-div">
     <el-card :body-style="{ padding: '0px' }" class="piccard">
         <img :src="resultUrl" class="final-image"/>
         <div style="text-align: left;">
            <p style="margin-left:20px;font-size: 28px;font-weight: bolder;color:rgba(6, 36, 146, 0.75);margin-top:10px">Prompts:</p>    
         
         <p style="margin-left:20px;margin-top:-10px;font-size: 17px;font-weight: 500;color:rgb(80, 80, 80)">{{ printedResultPrompts }}</p>
         </div>
          

       </el-card>
       <el-button style="margin-top:40px;margin-bottom:40px;box-shadow: 3px 3px 3px 3px rgba(201, 201, 201, 0.2);" round type="primary" @click="router.push('/')" size="large">Get Another!</el-button>
    </div>
 
 </template>
 
 <style>
 .split-div{
     position: relative;
     height: 100vh;
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
 const finalQueryString=ref('')
 const printedResultPrompts=ref('')
 onMounted(() => {
   // 从路由的 query 参数中获取
   finalQueryString.value = router.currentRoute.value.query.finalQueryString;
   console.log(finalQueryString.value)
   const parts=finalQueryString.value.split('+')
   resultUrl.value=parts[0]
   printedResultPrompts.value=parts[1]
   console.log(resultUrl.value)
   console.log(printedResultPrompts.value)
 });
 </script>