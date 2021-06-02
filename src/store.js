import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileList: [],
    fileListImg: [],
    shangpinEditform: null,
    page: 1, //商品详情
    pageSize: 10,
    miandanjiluPage: 1, //免单记录
    miandanjiluPageSize: 10,
    eduPage: 1, //额度
    eduPageSize: 10,
    huowuzhuangtaiPage: 1, //货物状态
    huowuzhuangtaiPageSize: 10,
    shouhouliebiaoPage: 1, //售后列表
    shouhouliebiaoPageSize: 10,
  },
  mutations: {
    fileList(state, str) {
      state.fileList = str;
    },
    fileListImg(state, str) {
      state.fileListImg = str;
    },
    shangpinEditform(state, str) {
      state.shangpinEditform = str;
    },
    page(state, str) {
      state.page = str;
    },
    pageSize(state, str) {
      state.pageSize = str;
    },
    miandanjiluPage(state, str) {
      state.miandanjiluPage = str;
    },
    miandanjiluPageSize(state, str) {
      state.miandanjiluPageSize = str;
    },
    eduPage(state, str) {
      state.eduPage = str;
    },
    eduPageSize(state, str) {
      state.eduPageSize = str;
    },
    huowuzhuangtaiPage(state, str) {
      state.huowuzhuangtaiPage = str;
    },
    huowuzhuangtaiPageSize(state, str) {
      state.huowuzhuangtaiPageSize = str;
    },
    shouhouliebiaoPage(state, str) {
      state.shouhouliebiaoPage = str;
    },
    shouhouliebiaoPageSize(state, str) {
      state.shouhouliebiaoPageSize = str;
    },
  },
  actions: {

  },
});