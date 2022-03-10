<template>
  <div class="index">
    <div class="tit1">个人信息</div>
    <div @click="toJump('20-1','Zhanghuxinxi')" :class="{'tit2':true,'active':asideIndex == '20-1'}">账户信息</div>
    <div @click="toJump('20-2','Shiliziliao')" :class="{'tit2':true,'active':asideIndex == '20-2'}">视力资料</div>
    <div @click="toJump('20-3','Wodedizhi')" :class="{'tit2':true,'active':asideIndex == '20-3'}">地址</div>
    <div class="tit1">我的订单</div>
    <div @click="toJump('20-4','Wodedingdan')" :class="{'tit2':true,'active':asideIndex == '20-4'}">我的订单</div>
    <div @click="toJump('20-5','Wodepinglun')" :class="{'tit2':true,'active':asideIndex == '20-5'}">我的评论</div>
    <!-- <div @click="toJump('20-6','Shouhou')" :class="{'tit2':true,'active':asideIndex == '20-6'}">售后</div> -->
    <div class="tit1">我的钱包</div>
    <div @click="toJump('20-7','Youhuiquan')" :class="{'tit2':true,'active':asideIndex == '20-7'}">优惠券</div>
    <div @click="toJump('20-8','Jifen')" :class="{'tit2':true,'active':asideIndex == '20-8'}">积分</div>
    <div class="tit1">Zing</div>
    <div @click="toJump('20-9','HuiyuanZing')" :class="{'tit2':true,'active':asideIndex == '20-9'}">会员</div>
    <div @click="toJump('20-10','Tuiguang')" :class="{'tit2':true,'active':asideIndex == '20-10'}">推广</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["asideVal",'asideIndex'])
  },
  data(){
    return{
    }
  },
  created() {
    console.log(this.asideVal);
  },
  methods: {
    toApi() {
      this.$router.push({ name: "Fenzhanyuapi" });
    },
    toJump(i,url){
      this.$store.commit("isLogin", 'true');
      this.$router.push({name:url})
    },
  }
};
</script>

<style lang="scss" scoped>
.index {
  // width: 400px;
  background: #ffffff;
  padding-left: 24px;
  padding-bottom: 30px;
}
.tit1 {
  margin-bottom: 16px;
  font-size: 24px;
  color: #000000;
  padding-top: 22px;
  margin-left: 22px;
}
// .tit1.active{
//   color: #000000;
// }
.tit2{
  cursor: pointer;
  width: 376px;
  box-sizing: border-box;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  color:#969699;
  line-height: 48px;
  padding-left: 22px;
}
.tit2.active {
  background: #000000;
  color: #ffffff;
}
</style>