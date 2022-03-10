import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
        path: '/AliPay',
        name: 'Ali',
        component: () => import('./components/AliPay'),
        children: [{
            path: 'AliPay',
            name: 'AliPay',
            component: () => import('./components/AliPay/AliPay.vue'),
        }, ]
    },
    {
        path: '/Shouye',
        name: 'Sy',
        component: () => import('./components/Header/syMain'),
    },
    {
        path: '/Yanjing',
        name: 'Yanjing',
        component: () => import('./components/Yanjing'),
        children: [{
            path: 'YanjingPage',
            name: 'YanjingPage',
            component: () => import('./components/Yanjing/YanjingPage.vue'),
        }]
    }, {
        path: '/Huiyuan',
        name: 'Huiyuan',
        component: () => import('./components/Huiyuan'),
        children: [{
            path: 'HuiyuanZing',
            name: 'HuiyuanZing',
            component: () => import('./components/Huiyuan/HuiyuanZing.vue'),
        }, {
            path: 'Tuiguang',
            name: 'Tuiguang',
            component: () => import('./components/Huiyuan/Tuiguang.vue'),
        }]
    }, {
        path: '/Qianbao',
        name: 'Qianbao',
        component: () => import('./components/Qianbao'),
        children: [{
            path: 'Youhuiquan',
            name: 'Youhuiquan',
            component: () => import('./components/Qianbao/Youhuiquan.vue'),
        }, {
            path: 'Jifen',
            name: 'Jifen',
            component: () => import('./components/Qianbao/Jifen.vue'),
        }]
    }, {
        path: '/Dingdan',
        name: 'Dingdan',
        component: () => import('./components/Dingdan'),
        children: [{
            path: 'Wodedingdan',
            name: 'Wodedingdan',
            component: () => import('./components/Dingdan/Wodedingdan.vue'),
        }, {
            path: 'Shouhou',
            name: 'Shouhou',
            component: () => import('./components/Dingdan/Shouhou.vue'),
        }, {
            path: 'Shouhouwenti',
            name: 'Shouhouwenti',
            component: () => import('./components/Dingdan/Shouhouwenti.vue'),
        }, {
            path: 'Tousujianyi',
            name: 'Tousujianyi',
            component: () => import('./components/Dingdan/Tousujianyi.vue'),
        }, {
            path: 'Wodepinglun',
            name: 'Wodepinglun',
            component: () => import('./components/Dingdan/Wodepinglun.vue'),
        }]
    }, {
        path: '/Xinpingtuisong',
        name: 'Xinpingtuisong',
        component: () => import('./components/Xinpingtuisong'),
        children: [{
            path: 'Xinping',
            name: 'Xinping',
            component: () => import('./components/Xinpingtuisong/Xinping.vue'),
        }, {
            path: 'Shangpinxiangqin',
            name: 'Shangpinxiangqin',
            component: () => import('./components/Xinpingtuisong/Shangpinxiangqin.vue'),
        }]
    }, {
        path: '/Wenzhang',
        name: 'Wenzhang',
        component: () => import('./components/Wenzhang'),
        children: [{
            path: 'Tuihuotuikuan',
            name: 'Tuihuotuikuan',
            component: () => import('./components/Wenzhang/Tuihuotuikuan.vue'),
        }, {
            path: 'Weishenmexuanze',
            name: 'Weishenmexuanze',
            component: () => import('./components/Wenzhang/Weishenmexuanze.vue'),
        }, {
            path: 'Womendechengnuo',
            name: 'Womendechengnuo',
            component: () => import('./components/Wenzhang/Womendechengnuo.vue'),
        }, {
            path: 'Yunshushuoming',
            name: 'Yunshushuoming',
            component: () => import('./components/Wenzhang/Yunshushuoming.vue'),
        }, {
            path: 'Guanyuwomen',
            name: 'Guanyuwomen',
            component: () => import('./components/Wenzhang/Guanyuwomen.vue'),
        }, {
            path: 'Jiaruwomen',
            name: 'Jiaruwomen',
            component: () => import('./components/Wenzhang/Jiaruwomen.vue'),
        }]
    }, {
        path: '/Bangzhu',
        name: 'Bangzhu',
        component: () => import('./components/Bangzhu'),
        children: [{
            path: 'Bangzhuzhongxin',
            name: 'Bangzhuzhongxin',
            component: () => import('./components/Bangzhu/Bangzhuzhongxin.vue'),
        }, {
            path: 'Zhuizongdingdan',
            name: 'Zhuizongdingdan',
            component: () => import('./components/Bangzhu/Zhuizongdingdan.vue'),
        }, {
            path: 'Wenzhangxiangqin',
            name: 'Wenzhangxiangqin',
            component: () => import('./components/Bangzhu/Wenzhangxiangqin.vue'),
        }]
    },
    {
        path: '/Geren',
        name: 'Geren',
        component: () => import('./components/Gerenzhongxin'),
        children: [{
            path: 'Gerenzhongxin',
            name: 'Gerenzhongxin',
            component: () => import('./components/Gerenzhongxin/Gerenzhongxin.vue'),
        }, {
            path: 'Zhanghuxinxi',
            name: 'Zhanghuxinxi',
            component: () => import('./components/Gerenzhongxin/Zhanghuxinxi.vue'),
        }, {
            path: 'Shiliziliao',
            name: 'Shiliziliao',
            component: () => import('./components/Gerenzhongxin/Shiliziliao.vue'),
        }, {
            path: 'Wodedizhi',
            name: 'Wodedizhi',
            component: () => import('./components/Gerenzhongxin/Wodedizhi.vue'),
        }, {
            path: 'Wodeshoucang',
            name: 'Wodeshoucang',
            component: () => import('./components/Gerenzhongxin/Wodeshoucang.vue'),
        }, {
            path: 'Gouwuche',
            name: 'Gouwuche',
            component: () => import('./components/Gerenzhongxin/Gouwuche.vue'),
        }, {
            path: 'GouwucheNext',
            name: 'GouwucheNext',
            component: () => import('./components/Gerenzhongxin/GouwucheNext.vue'),
        }]
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router