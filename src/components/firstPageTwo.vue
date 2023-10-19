<template>
    <div style="align-items: center;text-align: center;justify-content: center;">
        <el-image :src="imgpath" class="my-image"/> 
        <div style="width:350px;margin-left: 36vw;margin-top:-20vh;z-index:0">
            <el-input
            v-model="input"
            class="my-input"
            :placeholder="myplaceholder"
            :prefix-icon="Search"
            :size="small"
            :width="20"
            style="border-radius: 20px;z-index=1"
            />
            <el-button :icon=Check @click="searchLyrics" style="z-index=3;margin-top:20px" type="warning">Search</el-button>
        </div>
    </div>
    <div style="height:75vh;margin-top:12vh">
        <el-row>
            <el-col class="leftcol" :span="10">
                <div class="introduction">
    
                    <p style="font-size:42px;font-weight: bold;color:rgb(48, 83, 162);margin-top:50px;margin-bottom:0px">Introduction</p>
                    <p style="margin-top:10px;">
                        Have you ever imagined those <span style="font-weight: bold;color:rgb(80, 109, 195)">
                            soul-stirring lyrics and lines
                        </span> being presented in a unique and artistic way? 
                     </p>  
                     <p>
                        Here, notes don't just stay on the sheet music, and lines don't merely linger on the screen; 
                        they 
                        <span style="font-weight: bold;color:rgb(80, 109, 195)">
                            dance within images
                        </span>, narrating stories as if speaking from behind the scenes. 
                     </p>   
                      
                    
                    <p>Unleash your
                        <span style="font-weight: bold;color:rgb(80, 109, 195)">
                             boundless creativity
                        </span> for music and dialogue, transforming them into visual poetry.
                    </p> 
                </div>
            </el-col>
            <el-col  class="rightcol" :span="14">
                <div style="margin-top:40px">
                    <!-- <span style="font-size: 30px;font-weight: bold;margin-top: 100px;">Recommended</span> -->
                </div>
                
                <el-row :gutter="20" style="margin-top:60px">
                    <el-col :span="12">
                        <el-card class="firstcard">
                            <template #header>
                            <div class="card-header">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                    <Headset style="width:20px;margin-right: 10px;color:rgba(92, 58, 156, 0.881)"/>
                                    <span style="font-size: 26px;font-weight: bold;color:rgba(92, 58, 156, 0.881)">Music</span>
                                </div>
                            </div>
                            </template>
                            <div style="margin-top: 10px;">
                                <el-row v-for="(item, index) in listLyrics" :key="index" style="margin-top:15px">
                                    <el-col :span="2">
                                        <span style="font-size: 14px;color: rgb(80, 80, 80);">{{ index + 1 }}</span>
                                    </el-col>
                                    <el-col :span="11">
                                        <span style="font-weight: 500;">{{ item.title }}</span>
                                    </el-col>
                                    <el-col :span="11">
                                        <span style="color: rgb(94, 94, 94);font-size: 14px;">{{ item.artist }}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="firstcard">
                            <template #header>
                            <div class="card-header">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                    <Film style="width:20px;margin-right: 10px;color:rgba(92, 58, 156, 0.881)"/>
                                    <span style="font-size: 26px;font-weight: bold;color: rgba(92, 58, 156, 0.881)">Media</span>
                                </div>
                                
                            </div>
                            </template>
                            <div style="margin-top: 10px;">
                                <el-row v-for="(item, index) in listLines" :key="index" style="margin-top:15px">
                                    <el-col :span="2">
                                        <span style="font-size: 14px;color: rgb(93, 93, 93);">{{ index + 1 }}</span>
                                    </el-col>
                                    <el-col :span="11">
                                        <span style="font-weight: 500;">{{ item.title }}</span>
                                    </el-col>
                                    <el-col :span="11">
                                        <span style="color: rgb(94, 94, 94);font-size: 14px;">{{ item.artist }}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                
            </el-col>
        </el-row>
        
    </div>
    <div class="bigone">
        <div class="left">
            <img src="example2.png" class="example-img" style="width:450px;height:300px;justify-content: center;border-radius: 5px;box-shadow: 2px 2px 2px 2px rgba(180, 180, 180, 0.241);margin-left:10vw">
        </div>
        <div class="right">
            <div style="display:block;margin-left:50px;margin-top:-10%">
                <p style="font-size:58px;color:rgb(37, 82, 149);font-weight: bolder;margin-bottom:20px"> 
                AIGC
                </p>
                <p style="width:350px;font-size: 17px">
                    Embark on a journey to explore the formidable power of AI, where you'll witness its unparalleled strength in action,
                     reshaping the boundaries of what's possible and unlocking new realms of innovation and discovery.
                </p>
                <el-button  style="font-size:19px;background-color:rgba(235, 171, 118, 0.881);font-weight: bold;margin-top:20px ;color:white;padding:25px" @click="scrollToTop">Get Started!</el-button>
            </div>
            
        </div>
    </div>
   
</template>

<script setup>
import { onMounted, ref,watch } from 'vue';
import {Check,Search,Headset,Film } from '@element-plus/icons-vue';
 import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store=useStore()
 const router = useRouter();
const imgpaths = ['music.jpg', 'movie5.jpg'];
const input = ref('');
const imgpath = ref(imgpaths[0]);
const myplaceholder=ref('Please input a song/singer...')
const listLyrics= [
        { title: 'See You Again', artist: 'Chalie Puth' },
        { title: 'Love In The Dark', artist: 'Adele' },
        { title: 'Stitches', artist: 'Shawn Mendes' },
        { title: 'I DO', artist: '(G)I-DLE' },
        { title: '8 Letters', artist: 'Why Don\'t We' },
        { title: 'Permission', artist: 'New Hope Club' },
        { title: 'Little Things', artist: 'One Direction' },
        { title: 'Everglow', artist: 'Coldplay' },
        { title: 'There For You', artist: 'Troye Siven' },
        { title: 'Love Story', artist: 'Taylor Swift' },
      ]

const listLines= [
{ title: 'Game of Thr', artist: 'tvSeries' },
{ title: 'Friends', artist: 'tvSeries' },
{ title: 'TBBT', artist: 'tvSeries' },
{ title: 'Avengers', artist: 'movie' },
{ title: 'Stranger Things', artist: 'tvSeries' },
{ title: 'Downton Abbey', artist: 'tvSeires' },
{ title: '2 Broke Girls', artist: 'tvSeries' },
{ title: 'Titanic', artist: 'movie' },
{ title: 'Flipped', artist: 'movie' },
{ title: 'Love Actually', artist: 'movie' },
]

watch(() => store.getters.getChoice, (newChoice) => {
    console.log(imgpath.value)
    if(newChoice!='About'){
        imgpath.value = newChoice === 'Music' ? imgpaths[0] : imgpaths[1];
        myplaceholder.value= newChoice==='Music' ? 'Please input a song/singer...' : 'Please input a movie/series...';
    }
});

const searchLyrics= () => {
    console.log(input.value)
if(imgpath.value===imgpaths[0]){
  router.push({ path: '/secondPage', query: { queryString: input.value }});
}
else{
    router.push({ path: '/secondPageLines', query: { queryString: input.value }});
}

};

onMounted(() => {
    imgpath.value = store.getters.getChoice === 'Music' ? imgpaths[0] : imgpaths[1];
    myplaceholder.value=store.getters.getChoice==='Music' ? 'Please input a song/singer...' : 'Please input a movie/tvShow...';
});


function scrollToTop() {
        document.documentElement.scrollTop = 0;
    }

</script>

<style>
.my-image{
    height:87vh;
    width:100vw;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .2);
    margin-top: 0px;
    z-index:0
}

.my-input{
   
    width:300px;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.my-button-round{
    
    margin-left:30px;
}

.introduction{
    text-align: center;
    align-items: center;
    justify-content: center;
    padding:60px;
    font-size:17px
}

.introduction p{
    letter-spacing: 0.8px;
    line-height: 1.6;
}

.firstcard:hover{
    transform: scale(1.02); 
}
.firstcard{
    width:25vw;
    margin-left: 0px;
}

.bigone{
    height:95vh;
    width:100vw;
    display:flex;
}
.left{
    height:95vh;
    width:50vw;
    background-color: rgba(222, 240, 255, 0.514);
    text-align: center;
    align-items: center;
    justify-content: center;
    display:flex
}


.right{
    height:95vh;
    width:50vw;
    background-color:rgba(240, 248, 255, 0.605);
    text-align: left;
    align-items: center;
    /* justify-content: center;  */
    display:flex
}

/* .leftcol{
    background-color: rgba(222, 240, 255, 0.671);
}

.rightcol{
    background-color: aliceblue;
} */

.example-img:hover{
    transform: scale(1.02); 
}
</style>