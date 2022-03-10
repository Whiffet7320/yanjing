<template>
  <div class="index">
    <div class="tit1">优惠券</div>

    <div class="nav1">
      <img src="../../assets/img/mcz21.png" alt class="pic" />
      <div class="txtt">超级优惠券等你领</div>
      <div class="btn">马上领取更多</div>
    </div>
    <div class="nav2">
      <div class="txtt">
        <div @click="changeStatus('1')" :class="{'sp':true,'active':status == '1'}">可用（1）</div>
        <div
          @click="changeStatus('2')"
          :class="{'sp':true,'active':status == '2'}"
          style="margin-left: 40px;"
        >已过期（1）</div>
      </div>
      <div v-if="status == '1'" class="items">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="i-txt1">优惠券</div>
          <div class="i-txt2">全店通用</div>
          <div class="i-txt3">
            {{item.coupon_price}}
            <span class="sp">元</span>
          </div>
          <div class="i-txt4">实付满{{item.use_min_price}}元使用</div>
        </div>
      </div>
      <div v-if="status == '2' && loading" class="items">
        <div class="item status2" v-for="item in list" :key="item.id">
          <div class="i-txt1">优惠券</div>
          <div class="i-txt2">全店通用</div>
          <div class="i-txt3">
            {{item.coupon_price}}
            <span class="sp">元</span>
          </div>
          <div class="i-txt4">实付满{{item.use_min_price}}元使用</div>
        </div>
      </div>
      <el-pagination
        background
        class="fenye"
        @current-change="this.handleCurrentChange"
        :current-page="this.jishiShougouPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage"])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    }
  },
  data() {
    return {
      status: "1",
      total: 0,
      list: [],
      loading: false,
    };
  },
  created() {
    this.$store.commit("jishiShougouPage", 1);
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.user_coupon_list({
        page: this.jishiShougouPage,
        limit: 12,
        is_fail:this.status == '1' ? 0 : 1 
      });
      this.list = res.data.data;
      this.total = res.data.total;
      loading.close();
      this.loading = false;
    },
    changeStatus(val) {
      this.status = val;
      this.getData()
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.fenye {
  margin-bottom: 20px;
}
.index {
}
.tit1 {
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: left;
  color: #1e1f33;
}

.nav1 {
  margin-top: 20px;
  margin-right: 60px;
  height: 100px;
  background: #ffffff;
  position: relative;
  .pic {
    position: absolute;
    bottom: 0;
    left: 120px;
    width: 179px;
    height: 85px;
  }
  .txtt {
    font-size: 30px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: center;
    line-height: 100px;
    color: #1e1f33;
    letter-spacing: 0.36px;
  }
  .btn {
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 40px;
    background: #000000;
    border-radius: 24px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
  }
}
.nav2 {
  margin-right: 60px;
  margin-top: 20px;
  padding: 20px 30px;
  background: #ffffff;
  .txtt {
    display: flex;
    align-items: center;
    .sp {
      height: 36px;
      cursor: pointer;
      font-size: 20px;
      color: #1e1f33;
      line-height: 36px;
    }
    .sp.active {
      border-bottom: 2px solid;
    }
  }
  .items {
    padding: 40px 60px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item.status2 {
      background-image: url("../../assets/img/zu199.png");
      .i-txt1 {
        color: #1e1f33;
      }
      .i-txt3 {
        color: #1e1f33;
        .sp {
          color: #1e1f33;
        }
      }
    }
    .item {
      margin-right: 60px;
      margin-bottom: 20px;
      width: 352px;
      height: 98px;
      background-image: url("../../assets/img/yhq198.png");
      background-size: 100% 100%;
      position: relative;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .i-txt1 {
        top: 12px;
        left: 22px;
        position: absolute;
        font-size: 34px;
        color: #ffb300;
        letter-spacing: 1.75px;
      }
      .i-txt2 {
        top: 60px;
        left: 40px;
        position: absolute;
        font-size: 18px;
        color: #000000;
        letter-spacing: 0.2px;
      }
      .i-txt3 {
        top: 16px;
        left: 216px;
        position: absolute;
        font-size: 36px;
        color: #f1291d;
        letter-spacing: -0.9px;
        .sp {
          font-size: 16px;
          color: #f1291d;
          letter-spacing: 1.7px;
        }
      }
      .i-txt4 {
        top: 60px;
        left: 200px;
        position: absolute;
        font-size: 12px;
        color: #2c2c2c;
        letter-spacing: 0.72px;
      }
    }
  }
}
</style>