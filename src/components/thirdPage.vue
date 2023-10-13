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
import { ElMessage } from 'element-plus'
import OpenAI from "openai"


const router = useRouter();
const selectedLyrics=ref('')
const queryString=ref('')

const songTitle=ref('')
const artistName = ref('')
const albumTitle  =ref('')
const releaseDate = ref('')
const albumImage  =ref('')
const singerImage  =ref('')
const resultPrompts=ref('')
const resultUid=ref('')
const resultUrl=ref('')

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

const generateImage=async()=>{
    ElMessage({
    message: 'Please be patient,your image is being painted...',
    type: 'success',
  })
    
    const axios = require('axios');
    //获取prompt
    const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser:true
});

    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
        "role": "user",
        "content": selectedLyrics.value
        }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    });

    try {
        console.log(response.choices[0].message.content);
        resultPrompts.value=response.choices[0].message.content
    } catch (error) {
        console.error(error);
    }

    let resultpromptsValue = resultPrompts.value || '';
    resultpromptsValue+='11.masterpiece'
    resultPrompts.value=resultpromptsValue
    console.log(resultPrompts.value)

    //获取uid
const requestInfo = {
  method: "POST",
  url: "https://23329.o.apispace.com/aigc/txt2img",
  headers: {
    "X-APISpace-Token": "8qdtf7fect98p1dzkkath5hw5ju5ow1e",
    "Authorization-Type": "apikey",
    "Content-Type": "application/json",
  },
  data: {
    task: "txt2img.sd",
    params: {
      model: "anime",
      text:resultPrompts.value,
      w: 750,
      h: 512,
      guidance_scale: 14,
      negative_prompt: "cropped, blurred, mutated, error, lowres, blurry, low quality, username, signature, watermark, text, nsfw, missing limb, fused hand, missing hand, extra limbs, malformed limbs, bad hands, extra fingers, fused fingers, missing fingers, bad breasts, deformed, mutilated, morbid, bad anatomy",
      sampler: "k_euler",
      seed: 1072366942,
      num_steps: 25,
    },
    model: "anime",
    text:
      resultPrompts.value,
      w: 750,
      h: 512,
      guidance_scale: 14,
      negative_prompt: "cropped, blurred, mutated, error, lowres, blurry, low quality, username, signature, watermark, text, nsfw, missing limb, fused hand, missing hand, extra limbs, malformed limbs, bad hands, extra fingers, fused fingers, missing fingers, bad breasts, deformed, mutilated, morbid, bad anatomy",
      sampler: "k_euler",
      seed: 1072366942,
      num_steps: 25,
      notify_url: "",
    },
  }

  try {
        const response2 = await axios.request(requestInfo);
        console.log(response2)
        console.log(response2.data.data.uid);
        const resultuid=response2.data.data.uid
        resultUid.value=resultuid
    } catch (error) {
        console.error(error);
    }
    

    //延迟5秒获取url
    setTimeout(async()=>{
        const requestInfo2 = {
        method: "POST",
        url: "https://23329.o.apispace.com/aigc/query-image",
        headers: {
            "X-APISpace-Token": "8qdtf7fect98p1dzkkath5hw5ju5ow1e",
            "Authorization-Type": "apikey",
            "Content-Type": "application/json",
        },
        data: {
            uid: resultUid.value,
        },
        };
        try {
            const response3 = await axios.request(requestInfo2);
            console.log(response3)
            console.log(response3.data.data.cdn);
            const resulturl=response3.data.data.cdn
            resultUrl.value=resulturl
        } catch (error) {
            console.error(error);
        }

        router.push({ path: '/fourthPage', query: { resultUrl: resultUrl.value }})
    },8000)
    
    

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