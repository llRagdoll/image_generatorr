<template>
    <div style="align-items: center;text-align: center;justify-content: center;">
    <el-image :src="imgpath" class="my-image"/> 
        <div style="width:350px;display:flex;align-items: center;text-align: center;justify-content: center;margin-left: 35vw;">
            <el-input
            v-model="input"
            class="my-input"
            placeholder="Please Input"
            :prefix-icon="Search"
            :size="small"
            :width="20"
            style="border-radius: 20px;"
            />
            <el-button circle class="my-button-round" :icon="Check" @click="searchLyrics" ></el-button>
        </div>
    </div>
    <div style="height:700px">
        <el-row>
            <el-col :span="10">
                <div class="introduction">
                    <p style="font-size:30px;font-weight: bold;color:rgb(63, 63, 63)">Introduction</p>
                </div>
            </el-col>
            <el-col :span="14">
                <div style="margin-top:40px">
                    <span style="font-size: 30px;font-weight: bold;margin-top: 100px;">Recommended</span>
                </div>
                
                <el-row :gutter="20" style="margin-top:60px">
                    <el-col :span="12">
                        <el-card class="firstcard">
                            <template #header>
                            <div class="card-header">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                    <Headset style="width:14px;margin-right: 10px;color:rgba(7, 35, 135, 0.749)"/>
                                    <span style="font-size: 18px;font-weight: bold;color:rgba(7, 35, 135, 0.749)">Lyrics</span>
                                </div>
                            </div>
                            </template>
                            <div style="margin-top: 10px;">
                                <el-row v-for="(item, index) in listLyrics" :key="index" style="margin-top:15px">
                                    <el-col :span="2">
                                        <span style="font-size: 14px;color: rgb(6, 91, 170);">{{ index + 1 }}</span>
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
                                    <Film style="width:14px;margin-right: 10px;color:rgba(7, 35, 135, 0.749)"/>
                                    <span style="font-size: 18px;font-weight: bold;color: rgba(7, 35, 135, 0.749)">Lines</span>
                                </div>
                                
                            </div>
                            </template>
                            <div style="margin-top: 10px;">
                                <el-row v-for="(item, index) in listLyrics" :key="index" style="margin-top:15px">
                                    <el-col :span="2">
                                        <span style="font-size: 14px;color: rgb(6, 91, 170);">{{ index + 1 }}</span>
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
   
</template>

<script setup>
import { ref,watch } from 'vue';
import { Search, Check,Headset,Film } from '@element-plus/icons-vue';
 import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store=useStore()
 const router = useRouter();
const imgpaths = ['music.jpg', 'movie5.jpg'];
const input = ref('');
const imgpath = ref(imgpaths[0]);
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

watch(() => store.getters.getChoice, (newChoice) => {
    if(newChoice!='About'){
        imgpath.value = newChoice === 'Lyrics' ? imgpaths[0] : imgpaths[1];
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

</script>

<style>
.my-image{
    height:85vh;
    width:100vw;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .2);
    margin-top: 0px;
}

.my-input{
    margin-top:-380px;
    width:300px;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.my-button-round{
    margin-top:-380px;
    margin-left:30px;
    text-align: center;
    align-items: center;
    justify-content: center;

    background-color: white;
}

.introduction{
    text-align: center;
    align-items: center;
    justify-content: center;
}

.firstcard:hover{
    transform: scale(1.02); 
}
.firstcard{
    width:25vw;
    margin-left: 0px;
}
</style>