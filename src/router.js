import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('./components/Home'),
        children: [{
                path: 'Lunbotu',
                name: 'Lunbotu',
                component: () => import('./components/Home/Lunbotu.vue'),
            },
            {
                path: 'Fenleiliebiao',
                name: 'Fenleiliebiao',
                component: () => import('./components/Home/Fenleiliebiao.vue')
            },
            {
                path: 'Haowushangjia',
                name: 'Haowushangjia',
                component: () => import('./components/Home/Haowushangjia.vue'),
            },
            {
                path: 'Yaoqinhaoyou',
                name: 'Yaoqinhaoyou',
                component: () => import('./components/Home/Yaoqinhaoyou.vue')
            },
            {
                path: 'Shangpinliebiao',
                name: 'Shangpinliebiao',
                component: () => import('./components/Home/Shangpinliebiao.vue')
            },
            {
                path: 'Guanggaoliebiao',
                name: 'Guanggaoliebiao',
                component: () => import('./components/Home/Guanggaoliebiao.vue')
            },
        ]
    },
    {
        path: '/Miandan',
        name: 'Miandan',
        component: () => import('./components/Miandan'),
        children: [{
                path: 'Quanptmiandanjilu',
                name: 'Quanptmiandanjilu',
                component: () => import('./components/Miandan/Quanptmiandanjilu.vue'),
            },
            {
                path: 'Miandangouwu',
                name: 'Miandangouwu',
                component: () => import('./components/Miandan/Miandangouwu.vue'),
            },
            {
                path: 'Miandankaiguan',
                name: 'Miandankaiguan',
                component: () => import('./components/Miandan/Miandankaiguan.vue')
            },
        ]
    },
    {
        path: '/Wodehoutai',
        name: 'Wodehoutai',
        component: () => import('./components/Wodehoutai'),
        children: [{
                path: 'Edu',
                name: 'Edu',
                component: () => import('./components/Wodehoutai/Edu.vue'),
            },
            {
                path: 'Huowuzhuangtai',
                name: 'Huowuzhuangtai',
                component: () => import('./components/Wodehoutai/Huowuzhuangtai.vue'),
            },
            {
                path: 'Kefuxitong',
                name: 'Kefuxitong',
                component: () => import('./components/Wodehoutai/Kefuxitong.vue')
            },
            {
                path: 'Xinshouzhinan',
                name: 'Xinshouzhinan',
                component: () => import('./components/Wodehoutai/Xinshouzhinan.vue')
            },
            {
                path: 'Xiangqin',
                name: 'Xiangqin',
                component: () => import('./components/Wodehoutai/Xiangqin.vue')
            },
            {
                path: 'Houtaizhifupeizhi',
                name: 'Houtaizhifupeizhi',
                component: () => import('./components/Wodehoutai/Houtaizhifupeizhi.vue')
            },
            {
                path: 'Huowuxiangqing',
                name: 'Huowuxiangqing',
                component: () => import('./components/Wodehoutai/Huowuxiangqing.vue')
            },
            {
                path: 'Shouhouliebiao',
                name: 'Shouhouliebiao',
                component: () => import('./components/Wodehoutai/Shouhouliebiao.vue')
            },
        ]
    },

    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('./components/Login')
    // },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router