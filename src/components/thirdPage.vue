<template>
    <el-row style="margin-bottom:20px;">
        <el-col :span="8">
            <img class="headerimagesong" :src="albumImage" style="margin-top:60px;margin-bottom:10px;height:250px;width:250px;box-shadow: 2px 2px 2px 2px rgb(0,0,0,0.3);border-radius: 15px;">

        </el-col>
        <el-col :span="16" >
            <div >
                <p style="color:rgba(12, 38, 121, 0.863);font-size: 56px;font-weight:bolder ;margin-top:60px;margin-left:-800px;margin-bottom: -5px;">{{songTitle}}</p>
                <div style="display: flex;text-align: center;justify-content: center;margin-left:-800px;align-items: center;">
                    <el-avatar :src="singerImage" :size="40" />
                    <p style="color:rgba(17, 63, 138, 0.755);font-size: 18px;font-weight:bold;margin-left:14px">{{artistName}}</p>
                </div>

                <p style="color:rgb(109, 109, 109);font-size: 16px;font-weight:lighter ;margin-left:-800px;">{{albumTitle}}·<span>{{ releaseDate }}</span></p>
            </div>
           
        </el-col>
    </el-row>
    <el-divider />
    <el-row style="margin-bottom: 100px;">
        <el-col :span="10">
            <p style="font-size: 26px;font-weight: bold;color: rgba(72, 72, 72, 0.881);">Lyrics</p>
            <div class="full-lyrics" v-html="fullLyrics"></div>>
        </el-col>
        <el-col :span="14" style="text-align: center;align-items: center;justify-content: center;">
            <div style="text-align: center;align-items: center;justify-content: center;">
                <p style="font-size: 26px;font-weight: bold;color: rgba(72, 72, 72, 0.881);">Selected</p>
                <div style="width: 560px;text-align: center;align-items: center;justify-content: center;margin-left:140px">
                    <el-input
                    v-model="selectedLyrics"
                    :rows="10"
                    type="textarea"
                    placeholder="Paste your wanted lyrics here!"
                
                />
                </div>
            <el-button type="warning" plain :icon="Upload" style="margin-top:20px" @click="generateImage">Generate</el-button>
            </div>
           
        </el-col>
    </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';
import { Upload } from '@element-plus/icons-vue'


const router = useRouter();
const selectedLyrics=ref('')
const queryString=ref('')

const songTitle=ref('')
const artistName = ref('')
const albumTitle  =ref('')
const releaseDate = ref('')
const albumImage  =ref('')
const singerImage  =ref('')

const fullLyrics=ref()

const getSongDetail=async()=>{
    const axios = require('axios');

    const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com/song/details/',
    params: {id: queryString.value},
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        songTitle.value=response.data.song.title;
        albumTitle.value=response.data.song.album.name;
        artistName.value=response.data.song.primary_artist.name;
        releaseDate.value=response.data.song.release_date_for_display;
        albumImage.value=response.data.song.album.cover_art_url;
        singerImage.value=response.data.song.primary_artist.image_url;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

const getSongLyrics=async()=>{
    const axios = require('axios');

    const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
    params: {id: queryString.value},
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        fullLyrics.value=response.data.lyrics.lyrics.body.html
    } catch (error) {
        console.error(error);
    }
}

const generateImage=()=>{
    router.push('/fourthPage')
}


onMounted(() => {
  // 从路由的 query 参数中获取
  queryString.value = router.currentRoute.value.query.queryString;
  getSongDetail();
  getSongLyrics();
  
});




</script>


<style>
.a{
    text-decoration: none;
}

.full-lyrics{
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 300;
    color: #000;
    ::v-deep * {
      line-height: 16.5px;
      margin-bottom: 20px;
    }
   ::v-deep p {
      text-indent: 2em;
    }

}

.full-lyrics ::v-deep a {
  text-decoration: none !important;
  color: #000 !important;
}

.headerimagesong{
    transform: scale(1.02); 
}

</style>