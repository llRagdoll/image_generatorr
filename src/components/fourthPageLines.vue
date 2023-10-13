<template>
    <div class="split-div">
     <el-card :body-style="{ padding: '0px' }" class="piccard">
         <img
           src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
           class="image"
         />
         <div style="padding: 14px">
           <span>Yummy hamburger</span>
           <div class="bottom">
           
           </div>
         </div>
       </el-card>
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
     margin-top:7vh
 }
 
 </style>