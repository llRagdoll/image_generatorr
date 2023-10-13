<template>
    <el-row style="margin-bottom:20px;">
        <el-col :span="8">
            <img class="headerimg" :src="movieImage" style="margin-top:60px;margin-bottom:10px;height:300px;width:250px;box-shadow: 2px 2px 2px 2px rgb(0,0,0,0.3);border-radius: 15px;">

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
    <el-divider />
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
            <el-button type="warning" plain :icon="Upload" style="margin-top:20px">Generate</el-button>
            </div>
           
        </el-col>
    </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


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
// const quote1=ref('')
// const quote2=ref('')
// const quote3=ref('')
// const quote4=ref('')
// const quote5=ref('')
const quotes = ref([]);



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
        // const movie_actor1=response.data.principals[0].name
        // movieActor1.value=movie_actor1
        // const movie_actor2=response.data.principals[1].name
        // movieActor2.value=movie_actor2
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
        // const quotee1=response2.data.quotes[0].lines[0].text
        // quote1.value=quotee1
        // const quotee2=response2.data.quotes[1].lines[0].text
        // quote2.value=quotee2
        // const quotee3=response2.data.quotes[2].lines[0].text
        // quote3.value=quotee3
        // const quotee4=response2.data.quotes[3].lines[0].text
        // quote4.value=quotee4
        // const quotee5=response2.data.quotes[4].lines[0].text
        // quote5.value=quotee5
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