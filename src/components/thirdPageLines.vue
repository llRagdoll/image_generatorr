<template>
    <el-row style="background-color: aliceblue;height:50vh">
        <el-col :span="8">
            <el-image class="headerimg" :src="movieImage" style="margin-top:60px;margin-bottom:10px;height:300px;width:250px;box-shadow: 2px 2px 2px 2px rgb(0,0,0,0.3);border-radius: 15px;">
                <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
            </el-image>
        </el-col>
        <el-col :span="16" >
            <div style="text-align: left;margin-left: -50px;">
                <p style="margin-top:60px;font-weight:bold;">{{ movieType }}</p>
                <p style="color:rgba(12, 38, 121, 0.863);font-size: 56px;font-weight:bolder;margin-bottom: -5px;margin-top:10px">{{movieTitle}}</p>
                <!-- <div style="text-align: center;justify-content: center;margin-left:-700px;align-items: center;">  -->
                 <p style="color:rgba(17, 63, 138, 0.755);font-size: 18px;font-weight:bold;margin-top:30px;">Genre:
                    <span style="color: rgb(84, 83, 83);font-size: 15px;font-weight: 400;">{{ movieGenre }}</span>
                </p>
                 <p style="color:rgba(17, 63, 138, 0.755);font-size: 18px;font-weight:bold;margin-top:30px;">Date:
                    <span style="color: rgb(84, 83, 83);font-size: 15px;font-weight: 400;">{{ movieDate }}</span>
                </p>
                <p style="color:rgba(17, 63, 138, 0.755);font-size: 18px;font-weight:bold;margin-top:30px;">About:
                    <span style="color: rgb(84, 83, 83);font-size: 15px;font-weight: 400;">{{ moviePlot }}</span>
                </p>
                <!-- </div> -->
            </div>
               
           
        </el-col>
    </el-row>
    <el-divider style="margin-top:0px"/>
    <el-row style="margin-bottom: 100px;">
        <el-col :span="10">
            <p style="font-size: 26px;font-weight: bold;color: rgba(72, 72, 72, 0.881);">Lines</p>
            <template v-if="quotes.length > 0">
                <p v-for="(quote, index) in quotes" :key="index" style="font-weihgt:800;">{{ quote }}</p>
            </template>
            <template v-else>
                <p>None</p>
            </template>
        </el-col>
        <el-col :span="14" style="text-align: center;align-items: center;justify-content: center;">
            <div style="text-align: center;align-items: center;justify-content: center;">
                <p style="font-size: 26px;font-weight: bold;color: rgba(72, 72, 72, 0.881);">Selected</p>
                <div style="width: 560px;text-align: center;align-items: center;justify-content: center;margin-left:140px">
                    <el-input
                    v-model="selectedLines"
                    :rows="10"
                    type="textarea"
                    placeholder="Paste your wanted lines here!"        
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
import OpenAI from "openai"
import { ElMessage,ElLoading } from 'element-plus'


const router = useRouter();
const selectedLines=ref('')
const queryString=ref('')
const movieTitle=ref('')
const movieType=ref('')
const movieImage=ref('')
const movieDate=ref()
// const movieActor1=ref('')
// const movieActor2=ref('')
const moviePlot=ref('')
const movieGenre=ref('')
const quotes = ref([]);
const resultPrompts=ref('')
const resultUid=ref('')
const resultUrl=ref('')
const printedResultPrompts=ref('')
const finalQueryString=ref('')



const getResults=async()=>{
    console.log(queryString)
    const axios = require('axios');

    const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {
        tconst: queryString.value,
        currentCountry: 'US'
    },
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const movie_title=response.data.title.title
        movieTitle.value=movie_title
        const movie_type=response.data.title.titleType
        movieType.value=movie_type
        const movie_image=response.data.title.image.url
        movieImage.value=movie_image
        const movie_date=response.data.releaseDate
        movieDate.value=movie_date
        const movie_genre=response.data.genres[0]
        movieGenre.value=movie_genre
        const movie_plot=response.data.plotOutline.text
        moviePlot.value=movie_plot
       
     
    } catch (error) {
        console.error(error);
    }

    const options2 = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-quotes',
    params: {
        tconst: queryString.value
    },
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
    };

    try {
        const response2 = await axios.request(options2);
        console.log(response2.data);
     
        const quotesArray = response2.data.quotes.slice(0, 10).map(item => item.lines[0].text)
    
        // 清空数组
        quotes.value = [];

        quotesArray.forEach(quote => {
        if (quote!== "") {
            console.log(quote)
            quotes.value.push(quote);
        }
        });
        
    } catch (error) {
        console.error(error);
        quotes.value = [];
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


selectedLines.value = "I will give you some sentences, and you just give me 10 key words for all sentences in total.Don't give me anything else,just 10 key words." + selectedLines.value;

    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
        "role": "user",
        "content": selectedLines.value
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


        router.push({ path: '/fourthPageLines', query: { finalQueryString: finalQueryString.value }})
    },10000)
}






onMounted(() => {
  // 从路由的 query 参数中获取
  queryString.value = router.currentRoute.value.query.queryString;
  getResults();

  
});



</script>

<style>
.headerimage:hover{
    transform: scale(1.02); 
}
</style>