<template>
    <div>
       
        <div style="align-items: center;justify-content: center;text-align: center;">
            <p style="font-size: 48px;font-weight: bolder;color: rgb(15, 62, 144);">Music</p>
            <p style="margin-top:-20px;color: rgba(15, 62, 144, 0.706);">Get what you like of any given track right now</p>
        </div>
        <el-row style="margin-bottom: 40px; margin-top: 50px;">
        <el-col v-for="(song, index) in topThreeSongsArray" :key="index" :span="8" class="cardcol">
            <el-card class="songcard">
            <el-image :src="topThreeImageArray[index]" style="width: 300px; height: 300px; margin-top: 20px">
                <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
                </template>
            </el-image>
            <p style="font-size: 22px; font-weight: bolder; height: 70px">{{ song }}</p>
            <p style="font-size: 15px; font-weight: 300; color: rgb(103, 103, 103); height: 50px">{{ topThreeSingerArray[index] }}</p>
            <el-button text bg @click="getLyrics(index + 1)" type="primary" style="margin-top: 0px">Get lyrics&nbsp;-></el-button>
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
    margin-top:30px
    
}
</style>


<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


const router = useRouter();

const queryString=ref('')


const topThreeSongsArray=ref([])
const topThreeSingerArray=ref([])
const topThreeImageArray=ref([])
const topThreeIdArray=ref([])


const getLyrics = (index) => {
//   switch (index) {
//     case 1:
//       router.push({ path: '/thirdPage', query: { queryString: topThreeIdArray.value[0] }});
//       break;
//     case 2:
//       router.push({ path: '/thirdPage', query: { queryString: topThreeIdArray.value[1] }});
//       break;
//     case 3:
//       router.push({ path: '/thirdPage', query: { queryString: topThreeIdArray.value[2] }});
//       break;
//     default:
//       break;
//   }
  router.push({ path: '/thirdPage', query: { queryString: topThreeIdArray.value[index-1] }});
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
        const topThreeSongs2 = response.data.hits.slice(0,9).map(item => {
        return {
            title: item.result.title,
            artist: item.result.primary_artist.name,
            albumImage: item.result.song_art_image_url,
            id:item.result.id
        };
        });
        console.log(topThreeSongs2)
        console.log(topThreeSongs2.length)

        for(let i=0;i<topThreeSongs2.length;i++){
            topThreeSongsArray.value.push(topThreeSongs2[i].title)
            topThreeSingerArray.value.push(topThreeSongs2[i].artist)
            topThreeImageArray.value.push(topThreeSongs2[i].albumImage)
            topThreeIdArray.value.push(topThreeSongs2[i].id)
        }

        for(let i=0;i<topThreeSongs2.length;i++){
            console.log(topThreeSongsArray.value[i])
            console.log(topThreeSingerArray.value[i])
            console.log(topThreeImageArray.value[i])
            console.log(topThreeIdArray.value[i])
        }
       
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