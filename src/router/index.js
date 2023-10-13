import { createRouter,createWebHistory } from 'vue-router';

import firstPageTwo from '@/components/firstPageTwo.vue'
import secondPage from '@/components/secondPage.vue'
import thirdPage from '@/components/thirdPage.vue'
import secondPageLines from '@/components/secondPageLines.vue'
import thirdPageLines from '@/components/thirdPageLines.vue'
const routes=[
{path:'/',component:firstPageTwo},
{path:'/secondPage',component:secondPage},
{path:'/thirdPage',component:thirdPage},
{path:'/secondPageLines',component:secondPageLines},
{path:'/thirdPageLines',component:thirdPageLines},
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;