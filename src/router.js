import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [
    {
        path: '/AliPay',
        name: 'Ali',
        component: () => import('./components/AliPay'),
        children: [{
                path: 'AliPay',
                name: 'AliPay',
                component: () => import('./components/AliPay/AliPay.vue'),
            },
        ]
    },
    {
        path: '/Shouye',
        name: 'Sy',
        component: () => import('./components/Shouye'),
        children: [{
            path: 'Shouye',
            name: 'Shouye',
            component: () => import('./components/Shouye/Shouye.vue'),
        }]
    },
    {
        path: '/Lipingshangcheng',
        name: 'Liping',
        component: () => import('./components/Lipingshangcheng'),
        children: [{
            path: 'Lipingshangcheng',
            name: 'Lipingshangcheng',
            component: () => import('./components/Lipingshangcheng/Lipingshangcheng.vue'),
        }, ]
    },
    {
        path: '/Fenzhanyuapi',
        name: 'Fenzhan',
        component: () => import('./components/Fenzhanyuapi'),
        children: [{
                path: 'Fenzhanyuapi',
                name: 'Fenzhanyuapi',
                component: () => import('./components/Fenzhanyuapi/Fenzhanyuapi.vue'),
            },
            {
                path: 'Bangzhuzhongxin',
                name: 'Bangzhuzhongxin',
                component: () => import('./components/Fenzhanyuapi/Bangzhuzhongxin.vue'),
            },
            {
                path: 'Bangzhuzhongxinxiangqin',
                name: 'Bangzhuzhongxinxiangqin',
                component: () => import('./components/Fenzhanyuapi/Bangzhuzhongxinxiangqin.vue'),
            }
        ]
    },
    {
        path: '/Zhanghuguanli',
        name: 'Zhanghuguanli',
        component: () => import('./components/Zhanghuguanli'),
        children: [{
            path: 'Huiyuanziliao',
            name: 'Huiyuanziliao',
            component: () => import('./components/Zhanghuguanli/Huiyuanziliao.vue'),
        }, {
            path: 'Tuiguanfanyong',
            name: 'Tuiguanfanyong',
            component: () => import('./components/Zhanghuguanli/Tuiguanfanyong.vue'),
        }, {
            path: 'Xiugaimima',
            name: 'Xiugaimima',
            component: () => import('./components/Zhanghuguanli/Xiugaimima.vue'),
        }, {
            path: 'ShengjiVIP',
            name: 'ShengjiVIP',
            component: () => import('./components/Zhanghuguanli/ShengjiVIP.vue'),
        }, ]
    },
    {
        path: '/Shouhoufuwu',
        name: 'Shouhoufuwu',
        component: () => import('./components/Shouhoufuwu'),
        children: [{
            path: 'Shouhouchajian',
            name: 'Shouhouchajian',
            component: () => import('./components/Shouhoufuwu/Shouhouchajian.vue'),
        }, {
            path: 'Didanshenqin',
            name: 'Didanshenqin',
            component: () => import('./components/Shouhoufuwu/Didanshenqin.vue'),
        }, ]
    },
    {
        path: '/Daifazhinan',
        name: 'Daifazhinan',
        component: () => import('./components/Daifazhinan'),
        children: [{
            path: 'Daifazhinan',
            name: 'Daifazhinan',
            component: () => import('./components/Daifazhinan/Daifazhinan.vue'),
        }]
    },
    {
        path: '/Huiyuanzhongxin',
        name: 'Huiyuanzhongxin',
        component: () => import('./components/Huiyuanzhongxin'),
        children: [{
            path: 'Huiyuanzhongxin',
            name: 'Huiyuanzhongxin',
            component: () => import('./components/Huiyuanzhongxin/Huiyuanzhongxin.vue'),
        }]
    },
    {
        path: '/Caiwuzhongxin',
        name: 'Caiwuzhongxin',
        component: () => import('./components/Caiwuzhongxin'),
        children: [{
            path: 'Woyaochongzhi',
            name: 'Woyaochongzhi',
            component: () => import('./components/Caiwuzhongxin/Woyaochongzhi.vue'),
        }, {
            path: 'Zijinmingxi',
            name: 'Zijinmingxi',
            component: () => import('./components/Caiwuzhongxin/Zijinmingxi.vue'),
        }, {
            path: 'Yaoqingjiangli',
            name: 'Yaoqingjiangli',
            component: () => import('./components/Caiwuzhongxin/Yaoqingjiangli.vue'),
        }]
    },
    {
        path: '/Dingdanguanli',
        name: 'Dingdanguanli',
        component: () => import('./components/Dingdanguanli'),
        children: [{
            path: 'Baoguoliebiao',
            name: 'Baoguoliebiao',
            component: () => import('./components/Dingdanguanli/Baoguoliebiao.vue'),
        }, {
            path: 'Dingdanliebiao',
            name: 'Dingdanliebiao',
            component: () => import('./components/Dingdanguanli/Dingdanliebiao.vue'),
        }, ]
    },
    {
        path: '/Lijifahuo',
        name: 'Lijifahuo',
        component: () => import('./components/Lijifahuo'),
        children: [{
            path: 'Lijifahuo',
            name: 'Lijifahuo',
            component: () => import('./components/Lijifahuo/Lijifahuo.vue'),
        }]
    },
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: () => import('./components/Home'),
    //     children: [{
    //             path: 'Lunbotuliebiao',
    //             name: 'Lunbotuliebiao',
    //             component: () => import('./components/Home/Lunbotuliebiao.vue'),
    //         },
    //         {
    //             path: 'Lunbotu',
    //             name: 'Lunbotu',
    //             component: () => import('./components/Home/Lunbotu.vue'),
    //         },
    //         {
    //             path: 'Fenleiliebiao',
    //             name: 'Fenleiliebiao',
    //             component: () => import('./components/Home/Fenleiliebiao.vue')
    //         },
    //         {
    //             path: 'Xinjianshangping',
    //             name: 'Xinjianshangping',
    //             component: () => import('./components/Home/Xinjianshangping.vue'),
    //         },
    //         {
    //             path: 'Shangpinliebiao',
    //             name: 'Shangpinliebiao',
    //             component: () => import('./components/Home/Shangpinliebiao.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/Yonghu',
    //     name: 'Yonghu',
    //     component: () => import('./components/Yonghu'),
    //     children: [{
    //             path: 'Quanbudingdan',
    //             name: 'Quanbudingdan',
    //             component: () => import('./components/Yonghu/Quanbudingdan.vue'),
    //         },
    //         {
    //             path: 'Pinglunguanli',
    //             name: 'Pinglunguanli',
    //             component: () => import('./components/Yonghu/Pinglunguanli.vue'),
    //         },
    //         {
    //             path: 'Ruzhuxingxi',
    //             name: 'Ruzhuxingxi',
    //             component: () => import('./components/Yonghu/Ruzhuxingxi.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/Wode',
    //     name: 'Wode',
    //     component: () => import('./components/Wode'),
    //     children: [{
    //             path: 'Quanbupingtaishuju',
    //             name: 'Quanbupingtaishuju',
    //             component: () => import('./components/Wode/Quanbupingtaishuju.vue'),
    //         },
    //         {
    //             path: 'Kefuxitong',
    //             name: 'Kefuxitong',
    //             component: () => import('./components/Wode/Kefuxitong.vue')
    //         },
    //         {
    //             path: 'Fenxiangshezhi',
    //             name: 'Fenxiangshezhi',
    //             component: () => import('./components/Wode/Fenxiangshezhi.vue')
    //         },
    //         {
    //             path: 'Youhuiquanguanli',
    //             name: 'Youhuiquanguanli',
    //             component: () => import('./components/Wode/Youhuiquanguanli.vue')
    //         },
    //         {
    //             path: 'Youhuiquanshezhi',
    //             name: 'Youhuiquanshezhi',
    //             component: () => import('./components/Wode/Youhuiquanshezhi.vue')
    //         },
    //         {
    //             path: 'Tianjiawenzhang',
    //             name: 'Tianjiawenzhang',
    //             component: () => import('./components/Wode/Tianjiawenzhang.vue')
    //         },
    //         {
    //             path: 'Wenzhangliebiao',
    //             name: 'Wenzhangliebiao',
    //             component: () => import('./components/Wode/Wenzhangliebiao.vue')
    //         },
    //         {
    //             path: 'Pingtaihonghuzhucebiao',
    //             name: 'Pingtaihonghuzhucebiao',
    //             component: () => import('./components/Wode/Pingtaihonghuzhucebiao.vue')
    //         },
    //         {
    //             path: 'Yonghutixianbiao',
    //             name: 'Yonghutixianbiao',
    //             component: () => import('./components/Wode/Yonghutixianbiao.vue')
    //         },
    //         {
    //             path: 'Shujutongjifenxi',
    //             name: 'Shujutongjifenxi',
    //             component: () => import('./components/Wode/Shujutongjifenxi.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/Fenxiao',
    //     name: 'Fenxiao',
    //     component: () => import('./components/Fenxiao'),
    //     children: [{
    //             path: 'Fenxiaofenrunzidingyi',
    //             name: 'Fenxiaofenrunzidingyi',
    //             component: () => import('./components/Fenxiao/Fenxiaofenrunzidingyi.vue'),
    //         },
    //         {
    //             path: 'Wodetuandui',
    //             name: 'Wodetuandui',
    //             component: () => import('./components/Fenxiao/Wodetuandui.vue'),
    //         },
    //     ]
    // },

    // // {
    // //     path: '/login',
    // //     name: 'login',
    // //     component: () => import('./components/Login')
    // // },
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router