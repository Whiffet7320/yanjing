<template>
  <div class="index">
    <div class="tit1">我的收藏</div>
    <div class="nav2">
      <div class="items">
        <el-row :gutter="60" style="width:100%">
          <el-col :span="8" v-for="item in tableData" :key="item.id">
            <div class="item" @click="toXiangqin(item.product_id,item.storehouse_id)">
              <div class="n2-tit1">
                <div class="left">50%OFF</div>
              </div>
              <img class="n2-img" :src="item.productinfo.product_img" alt />
              <div class="n2-tit2">
                <div class="txt1">{{item.productinfo.product_name}}</div>
                <i :class="{'el-icon-star-on':true,'active':true}"></i>
              </div>
              <div class="n2-tit3">ZQX45646-02</div>
              <div class="n2-tit4">
                <div class="left">￥{{item.productinfo.product_price}}</div>
                <div class="right">立即购买</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div @click="seeMore" class="seeMore">查看更多</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage", "jishiShougouPageSize"])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    },
    jishiShougouPageSize: function(pageSize) {
      this.$store.commit("jishiShougouPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      iii: 5,
      tableData: [],
      total: 0,
      commandVal: "验光"
    };
  },
  created() {
    this.$store.commit("jishiShougouPage", 1);
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$api.collect_list({
        limit:this.jishiShougouPageSize,
        page:this.jishiShougouPage
      })
      this.tableData = res.data.data
    },
    toXiangqin(id1,id2) {
      this.$store.commit('shopId',id2)
      this.$router.push({ name: "Shangpinxiangqin" ,params:{detailShopId:id1}});
    },
    seeMore() {
      this.iii += 5;
    },
    changeCommand(e) {
      console.log(e);
      this.commandVal = e;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishiShougouPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #ffffff;
}
.tit1 {
  margin: 20px 0 44px 106px;
  font-size: 28px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  color: #1e1f33;
}
.nav2 {
  margin: 0 106px;
  .items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // justify-content: space-between;
    .item {
      position: relative;
      width: 96%;
      height: 548px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      //   align-items: center;
      margin-bottom: 26px;
      // margin-right: 30px;
      padding: 26px 28px;
      .n2-tit1 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: 162px;
          height: 62px;
          background: #ffc234;
          font-size: 27px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 62px;
        }
        .right {
          display: flex;
          align-items: center;
          .el-icon-star-on {
            font-size: 32px;
          }
          .txt {
            margin-left: 10px;
            margin-right: 30px;
            font-size: 22px;
            color: #000000;
          }
        }
      }
      .n2-img {
        width: 76%;
        object-fit: cover;
        // height: 147px;
        margin:-40px auto 0 auto;
      }
      .n2-tit2 {
        // margin-top: 80px;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        .txt1 {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #1e1f33;
        }
        .el-icon-star-on {
            cursor: pointer;
          font-size: 32px;
        }
      }
      .n2-tit3 {
        margin-top: 20px;
        font-size: 16px;
        color: #1e1f33;
      }
      .n2-tit4 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 28px;
        .left {
          font-size: 26px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #e61717;
        }
        .right {
            cursor: pointer;
          width: 174px;
          height: 40px;
          background: #000000;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Semibold;
          font-weight: 600;
          text-align: center;
          color: #ffffff;
          line-height: 40px;
        }
      }
      .n2-txt1 {
        position: absolute;
        top: 374px;
        font-size: 28px;
        color: #2626ff;
      }
      .n2-txt2 {
        margin-top: 160px;
        font-size: 36px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #e61717;
      }
    }
  }
}
.seeMore {
  font-family: PingFang SC, PingFang SC-常规体;
  width: 222px;
  height: 68px;
  background: #ffffff;
  border: 1px solid #1e1f33;
  margin: 54px auto 70px auto;
  font-size: 16px;
  text-align: center;
  color: #1e1f33;
  line-height: 68px;
  cursor: pointer;
}
</style>