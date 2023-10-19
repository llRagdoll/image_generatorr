<template>
    <el-row style="background-color: rgba(240, 248, 255, 0.791);height:45vh">
        <el-col :span="8">
            <el-image class="headerimagesong" :src="albumImage" style="margin-top:60px;margin-bottom:10px;height:250px;width:250px;box-shadow: 2px 2px 2px 2px rgb(0,0,0,0.3);border-radius: 15px;">
                <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
            </el-image>

        </el-col>
        <el-col :span="16" >
            <div style="text-align: left;margin-left: -50px;margin-top:15vh">
                <p style="color:rgba(12, 38, 121, 0.863);font-size: 54px;font-weight:bolder ;margin-top:60px;margin-bottom: -5px;">{{songTitle}}</p>
                <div style="display: flex;align-items: center;margin-top: 10px;">
                    <el-avatar :src="singerImage" :size="40" />
                    <p style="color:rgba(17, 63, 138, 0.755);font-size: 18px;font-weight:bold;margin-left:14px">{{artistName}}</p>
                </div>

                <p style="color:rgb(26, 26, 26);font-size: 16px;font-weight:lighter ;margin-top:10px">{{albumTitle}}·<span>{{ releaseDate }}</span></p>
            </div>
           
        </el-col>
    </el-row>
    <el-divider style="margin-top:0px"/>
    <el-row style="margin-bottom: 100px;">
        <el-col :span="10">
            <p style="font-size: 30px;font-weight: bold;color: rgba(92, 58, 156, 0.881);">Lyrics</p>
            <div class="full-lyrics" v-html="fullLyrics"></div>>
        </el-col>
        <el-col :span="14" style="text-align: center;align-items: center;justify-content: center;">
            <div style="text-align: center;align-items: center;justify-content: center;">
                <p style="font-size: 30px;font-weight: bold;color: rgba(92, 58, 156, 0.881);">Selected</p>
                <div style="width: 560px;text-align: center;align-items: center;justify-content: center;margin-left:140px">
                    <el-input
                    v-model="selectedLyrics"
                    :rows="12"
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
import { ElMessage,ElLoading } from 'element-plus'
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
const printedResultPrompts=ref('')
const finalQueryString=ref('')

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
   
    selectedLyrics.value = "I will give you some sentences, and you just give me 10 key words for all sentences in total.Don't give me anything else,just 10 key words." + selectedLyrics.value;

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
    printedResultPrompts.value=resultPrompts.value.replace('11.masterpiece', '');
    console.log(printedResultPrompts.value)
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

    const loading = ElLoading.service({
        lock: true,
        text: 'Painting',
        background: 'rgba(255, 255, 255, 0.5)',
    })
    setTimeout(() => {
        loading.close()
    }, 10000)
    

    //延迟10秒获取url
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

        finalQueryString.value=resultUrl.value+'+'+printedResultPrompts.value


        router.push({ path: '/fourthPage', query: { finalQueryString: finalQueryString.value }})
    },10000)
    
    

}


onMounted(() => {
  // 从路由的 query 参数中获取
  queryString.value = router.currentRoute.value.query.queryString;
  getSongDetail();
  getSongLyrics();
  
});




</script>


<style scoped>
.a{
    text-decoration: none;
}

.full-lyrics{
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 300;
    color: #5e5e5e;
    border: 1px solid #c0bfbf90;
    border-radius:10px;
    margin-left:40px;
    box-shadow: 2px 2px 3px 3px #d4d3d319;
}
.full-lyrics:hover{
    transform: scale(1.005);
}

:deep(.full-lyrics) a{
    text-decoration: none !important;
    color: #737373 !important;
}
:deep(.full-lyrics) a{
    text-indent: 2em;
}

:deep(.full-lyrics) *{
    line-height: 16.5px;
    margin-bottom: 20px;
}


.headerimagesong:hover{
    transform: scale(1.02); 
}

</style>