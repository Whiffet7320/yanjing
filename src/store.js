import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jishiShougouPage:1,
    jishiShougouPageSize:10,
    asideIndex:"20-1",
    isLogin:'sy',
    isShouye:true,
    aliPay:true,
    isPay:false,
    routerParams:null,
    // 礼品商城
    lipingshangchengPage: 1,
    lipingshangchengPageSize: 10,
    ljgmlipingshangchengPage: 1,
    // 分站与API
    asideVal: null,
    // 账户管理-推广返佣
    wotuijiandeshangjiaPage: 1,
    // 售后服务-底单申请
    didanshenqinPage: 1,
    // 财务中心-资金明细
    zijinmingxiPage: 1,
    // 财务中心-邀请奖励
    yaoqingjiangliPage: 1,
    // 订单管理-包裹列表
    dingdanliebiaoPage: 1,
     // 订单管理-订单列表
     baoguoliebiaoPage: 1,
    // 立即发货-添加/编辑商品
    tianjiabianjiPage: 1,
    // 分站与api-帮助中心
    bangzhuzhongxinPage: 1,
    shopObj:null,
    myactiveName:null,
    isYueTixian:null,
    isYongjinTixian:null,
    commission:null,
    lpscKdId:null,
    cangchu:null,
    shopId:null,
  },
  mutations: {
    shopId(state, str) {
      state.shopId = str;
    },
    jishiShougouPage(state, str) {
      state.jishiShougouPage = str;
    },
    jishiShougouPageSize(state, str) {
      state.jishiShougouPageSize = str;
    },
    asideIndex(state, str) {
      state.asideIndex = str;
    },
    isLogin(state, str) {
      state.isLogin = str;
    },
    isShouye(state, str) {
      state.isShouye = str;
    },
    cangchu(state, str) {
      state.cangchu = str;
    },
    lpscKdId(state, str) {
      state.lpscKdId = str;
    },
    dingdanliebiaoPage(state, str) {
      state.dingdanliebiaoPage = str;
    },
    aliPay(state, str) {
      state.aliPay = str;
    },
    isPay(state, str) {
      state.isPay = str;
    },
    routerParams(state, str) {
      state.routerParams = str;
    },
    lipingshangchengPage(state, str) {
      state.lipingshangchengPage = str;
    },
    lipingshangchengPageSize(state, str) {
      state.lipingshangchengPageSize = str;
    },
    ljgmlipingshangchengPage(state, str) {
      state.ljgmlipingshangchengPage = str;
    },
    asideVal(state, str) {
      state.asideVal = str;
    },
    wotuijiandeshangjiaPage(state, str) {
      state.wotuijiandeshangjiaPage = str;
    },
    didanshenqinPage(state, str) {
      state.didanshenqinPage = str;
    },
    zijinmingxiPage(state, str) {
      state.zijinmingxiPage = str;
    },
    yaoqingjiangliPage(state, str) {
      state.yaoqingjiangliPage = str;
    },
    baoguoliebiaoPage(state, str) {
      state.baoguoliebiaoPage = str;
    },
    tianjiabianjiPage(state, str) {
      state.tianjiabianjiPage = str;
    },
    bangzhuzhongxinPage(state, str) {
      state.bangzhuzhongxinPage = str;
    },
    shopObj(state, str) {
      state.shopObj = str;
    },
    myactiveName(state, str) {
      state.myactiveName = str;
    },
    isYueTixian(state, str) {
      state.isYueTixian = str;
    },
    isYongjinTixian(state, str) {
      state.isYongjinTixian = str;
    },
    commission(state, str) {
      state.commission = str;
    },
  },
  actions: {

  },
});