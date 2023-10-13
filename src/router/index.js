import { createRouter,createWebHistory } from 'vue-router';

import firstPageTwo from '@/components/firstPageTwo.vue'
import secondPage from '@/components/secondPage.vue'
import thirdPage from '@/components/thirdPage.vue'
import secondPageLines from '@/components/secondPageLines.vue'
import thirdPageLines from '@/components/thirdPageLines.vue'
import fourthPageLines from '@/components/fourthPageLines.vue'
import fourthPage from '@/components/fourthPage.vue'
const routes=[
{path:'/',component:firstPageTwo},
{path:'/secondPage',component:secondPage},
{path:'/thirdPage',component:thirdPage},
{path:'/secondPageLines',component:secondPageLines},
{path:'/thirdPageLines',component:thirdPageLines},
{path:'/fourthPage',component:fourthPage},
{path:'/fourthPageLines',component:fourthPageLines},
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;