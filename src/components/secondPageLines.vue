<template>
    <div>
        <div style="align-items: center;justify-content: center;text-align: center;">
            <p style="font-size: 48px;font-weight: bolder;color: rgb(15, 62, 144);">Media</p>
            <p style="margin-top:-20px;color: rgba(15, 62, 144, 0.706);">Get what you like of any given title right now</p>
        </div>
        <el-row style="margin-bottom: 40px; margin-top: 50px;">
            <el-col :span="8" class="cardcol" v-for="(movie, index) in ThreeMovieArray" :key="index">
                <el-card class="moviecard">
                <el-image :src="ThreeImageArray[index]" style="width: 300px; height: 300px; margin-top: 20px">
                    <template #placeholder>
                    <div class="image-slot">Loading<span class="dot">...</span></div>
                    </template>
                </el-image>
                <p style="font-size: 22px; font-weight: bolder; height: 50px">{{ ThreeMovieArray[index] }}</p>
                <p style="font-size: 15px; font-weight: 300; color: rgb(103, 103, 103); height: 20px">{{ ThreeTypeArray[index] }}<span>·{{ ThreeYearArray[index] }}</span></p>
                <el-button text bg @click="getLines(index + 1)" type="primary" style="margin-top: 35px;">Get lines&nbsp;-></el-button>
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
    height:600px;
    margin-top:30px
}
</style>


<script setup>
import { useRouter } from 'vue-router'
import { onMounted,ref} from 'vue';


const router = useRouter();


const queryString=ref('')
const ThreeMovieArray=ref([])
const ThreeTypeArray=ref([])
const ThreeYearArray=ref([])
const ThreeImageArray=ref([])
const ThreeIdArray=ref([])


const getLines = (index) => {
//   switch (index) {
//     case 1:
//       router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_1.value }});
//       break;
//     case 2:
//       router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_2.value }});
//       break;
//     case 3:
//       router.push({ path: '/thirdPageLines', query: { queryString: topThreeId_3.value }});
//       break;
//     default:
//       break;
//   }
  router.push({ path: '/thirdPageLines', query: { queryString: ThreeIdArray.value[index-1] }});
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
        console.log(response.data.results.length);
        const results = response.data.results.slice(0, 18);

      
        for (let i = 0; i < results.length; i++) {
            const movie_title = results[i].title;
            ThreeMovieArray.value.push(movie_title);

            const movie_type = results[i].titleType;
            ThreeTypeArray.value.push(movie_type);

            const movie_image = results[i].image.url;
            ThreeImageArray.value.push(movie_image);

            const movie_year = results[i].year;
            ThreeYearArray.value.push(movie_year);

            const parts = results[i].id.split('/');
            const extractedId = parts.find(part => part.includes('tt'));
            ThreeIdArray.value.push(extractedId);
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