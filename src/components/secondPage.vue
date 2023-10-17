<template>
    <div>
       
        <div style="align-items: center;justify-content: center;text-align: center;">
            <p style="font-size: 48px;font-weight: bolder;color: rgb(15, 62, 144);">Music</p>
            <p style="margin-top:-20px;color: rgba(15, 62, 144, 0.706);">Get what you like of any given track right now</p>
        </div>
        <el-row style="margin-bottom:40px;margin-top: 50px;">
            <el-col :span="8" class="cardcol">
                <el-card class="songcard">
                    <el-image :src="topThreeImage_1" style="width: 300px;height:300px;margin-top:20px"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;height:70px">{{ topThreeSongs_1 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);height:50px">{{ topThreeSinger_1 }}</p>
                    <el-button text bg @click="getLyrics(1)" type="primary" style="margin-top:0px">Get lyrics&nbsp;-></el-button>
                </el-card>
            </el-col>
            <el-col :span="8" class="cardcol">
                <el-card class="songcard">
                    <el-image :src="topThreeImage_2" style="width: 300px;height:300px;margin-top: 20px;"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;height:70px">{{ topThreeSongs_2 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);height:50px">{{ topThreeSinger_2 }}</p>
                    <el-button text bg @click="getLyrics(2)" type="primary" style="margin-top:0px">Get lyrics&nbsp;-></el-button>
                </el-card>
            </el-col>
            <el-col :span="8" class="cardcol">
                <el-card class="songcard">
                    <el-image :src="topThreeImage_3" style="width: 300px;height:300px;margin-top: 20px;"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;height:70px">{{ topThreeSongs_3 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);height:50px">{{ topThreeSinger_3 }}</p>
                    <el-button text bg @click="getLyrics(3)" type="primary" style="margin-top:0px">Get lyrics&nbsp;-></el-button>
                </el-card>
            </el-col>
        </el-row>
        
    </div>
</template>

<style>
.cardcol{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.songcard:hover{
    transform: scale(1.02);
}
.songcard{
    width:400px;
    height:600px;
    
}
</style>


<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


const router = useRouter();

const queryString=ref('')
// const topThreeSongs=ref([])
const topThreeSongs_1=ref('')
const topThreeSongs_2=ref('')
const topThreeSongs_3=ref('')
const topThreeSinger_1=ref('')
const topThreeSinger_2=ref('')
const topThreeSinger_3=ref('')
const topThreeImage_1=ref('')
const topThreeImage_2=ref('')
const topThreeImage_3=ref('')
const topThreeId_1=ref('')
const topThreeId_2=ref('')
const topThreeId_3=ref('')


const getLyrics = (index) => {
  switch (index) {
    case 1:
      router.push({ path: '/thirdPage', query: { queryString: topThreeId_1.value }});
      break;
    case 2:
      router.push({ path: '/thirdPage', query: { queryString: topThreeId_2.value }});
      break;
    case 3:
      router.push({ path: '/thirdPage', query: { queryString: topThreeId_3.value }});
      break;
    default:
      break;
  }
};

const getResults=async()=>{
    console.log(queryString)
    const axios = require('axios');

    const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
    params: {
        q: queryString.value,
        per_page: '10',
        page: '1'
    },
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const topThreeSongs2 = response.data.hits.slice(0, 3).map(item => {
        return {
            title: item.result.title,
            artist: item.result.primary_artist.name,
            albumImage: item.result.song_art_image_url,
            id:item.result.id
        };
        });
        console.log(topThreeSongs2)
        // topThreeSongs.value=JSON.parse(JSON.stringify(topThreeSongs2))
        topThreeSongs_1.value=topThreeSongs2[0].title
        topThreeSongs_2.value=topThreeSongs2[1].title
        topThreeSongs_3.value=topThreeSongs2[2].title
        topThreeSinger_1.value=topThreeSongs2[0].artist
        topThreeSinger_2.value=topThreeSongs2[1].artist
        topThreeSinger_3.value=topThreeSongs2[2].artist
        topThreeImage_1.value=topThreeSongs2[0].albumImage
        topThreeImage_2.value=topThreeSongs2[1].albumImage
        topThreeImage_3.value=topThreeSongs2[2].albumImage
        topThreeId_1.value=topThreeSongs2[0].id
        topThreeId_2.value=topThreeSongs2[1].id
        topThreeId_3.value=topThreeSongs2[2].id
        console.log(topThreeSongs_1.value)
        console.log(topThreeSongs_2.value)
        console.log(topThreeSongs_3.value)
        console.log(topThreeSinger_1.value)
        console.log(topThreeSinger_2.value)
        console.log(topThreeSinger_3.value)
        console.log(topThreeImage_1.value)
        console.log(topThreeImage_2.value)
        console.log(topThreeImage_3.value)
       
    } catch (error) {
        console.error(error);
    }

}




onMounted(() => {
  // 从路由的 query 参数中获取
  queryString.value = router.currentRoute.value.query.queryString;
  getResults();
  
});




</script>