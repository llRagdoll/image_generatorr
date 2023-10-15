<template>
    <div>
        <div style="align-items: center;justify-content: center;text-align: center;">
            <p style="font-size: 48px;font-weight: bolder;color: rgb(15, 62, 144);">Lines</p>
            <p style="margin-top:-20px;color: rgba(15, 62, 144, 0.706);">Get what you like of any given title right now</p>
        </div>
        <el-row style="margin-bottom:40px;margin-top: 50px;">
            <el-col :span="8" class="cardcol">
                <el-card class="moviecard">
                    <el-image :src="topThreeImage_1" style="width: 300px;height:300px"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;">{{ topThreeMovies_1 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);">{{ topThreeType_1 }}
                        <span>·{{ topThreeYear_1 }}</span>
                    </p>
                    <el-button text bg @click="getLines(1)" type="primary" style="margin-top: 15px;">Get lines&nbsp;-></el-button>
                </el-card>
            </el-col>
            <el-col :span="8" class="cardcol">
                <el-card class="moviecard">
                    <el-image :src="topThreeImage_2" style="width: 300px;height:300px"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;">{{ topThreeMovies_2 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);">{{ topThreeType_2 }}
                        <span>·{{ topThreeYear_2 }}</span>
                    </p>
                    <el-button text bg @click="getLines(2)" type="primary" style="margin-top: 15px;">Get lines&nbsp;-></el-button>
                </el-card>
            </el-col>
            <el-col :span="8" class="cardcol">
                <el-card class="moviecard">
                    <el-image :src="topThreeImage_3" style="width: 300px;height:300px"> 
                        <template #placeholder>
                        <div class="image-slot">Loading<span class="dot">...</span></div>
                        </template>
                    </el-image>
                    <p style="font-size: 22px;font-weight: bolder;">{{ topThreeMovies_3 }}</p>
                    <p style="font-size: 15px;font-weight: 300;color: rgb(103, 103, 103);">{{ topThreeType_3 }}
                        <span>·{{ topThreeYear_3 }}</span>
                    </p>
                    <el-button text bg @click="getLines(3)" type="primary" style="margin-top: 15px;">Get lines&nbsp;-></el-button>
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
.moviecard:hover{
    transform: scale(1.02);
}
.moviecard{
    width:400px;
    height:500px;
    
}
</style>


<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


const router = useRouter();

const queryString=ref('')
// const topThreeMovies=ref([])
const topThreeMovies_1=ref('')
const topThreeMovies_2=ref('')
const topThreeMovies_3=ref('')
const topThreeType_1=ref('')
const topThreeType_2=ref('')
const topThreeType_3=ref('')
const topThreeYear_1=ref('')
const topThreeYear_2=ref('')
const topThreeYear_3=ref('')
const topThreeImage_1=ref('')
const topThreeImage_2=ref('')
const topThreeImage_3=ref('')
const topThreeId_1=ref('')
const topThreeId_2=ref('')
const topThreeId_3=ref('')


const getLines = (index) => {
  switch (index) {
    case 1:
      router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_1.value }});
      break;
    case 2:
      router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_2.value }});
      break;
    case 3:
      router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_3.value }});
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
    url: 'https://imdb8.p.rapidapi.com/title/find',
    params: {q: queryString.value},
    headers: {
        'X-RapidAPI-Key': 'e5b6cf43b5msh082c9a6af43d8c7p10b48cjsn744f05e11812',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

    try {
        const response = await axios.request(options);
        console.log(response.data);

        const movie_title1=response.data.results[0].title
        topThreeMovies_1.value=movie_title1
        const movie_type1=response.data.results[0].titleType
        topThreeType_1.value=movie_type1
        const movie_image1=response.data.results[0].image.url
        topThreeImage_1.value=movie_image1
        const movie_year1=response.data.results[0].year
        topThreeYear_1.value=movie_year1
        const parts1 = response.data.results[0].id.split('/');
        const extractedId1 = parts1.find(part => part.includes('tt'));
        topThreeId_1.value=extractedId1

        const movie_title2=response.data.results[1].title
        topThreeMovies_2.value=movie_title2
        const movie_type2=response.data.results[1].titleType
        topThreeType_2.value=movie_type2
        const movie_image2=response.data.results[1].image.url
        topThreeImage_2.value=movie_image2
        const movie_year2=response.data.results[1].year
        topThreeYear_2.value=movie_year2
        const parts2 = response.data.results[1].id.split('/');
        const extractedId2 = parts2.find(part => part.includes('tt'));
        topThreeId_2.value=extractedId2

        const movie_title3=response.data.results[2].title
        topThreeMovies_3.value=movie_title3
        const movie_type3=response.data.results[2].titleType
        topThreeType_3.value=movie_type3
        const movie_image3=response.data.results[2].image.url
        topThreeImage_3.value=movie_image3
        const movie_year3=response.data.results[2].year
        topThreeYear_3.value=movie_year3
        const parts3 = response.data.results[2].id.split('/');
        const extractedId3 = parts3.find(part => part.includes('tt'));
        topThreeId_3.value=extractedId3

        console.log( topThreeId_1.value) 
        console.log( topThreeId_2.value)
         console.log( topThreeId_3.value)

       
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