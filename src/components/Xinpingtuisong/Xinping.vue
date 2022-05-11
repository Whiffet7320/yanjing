<template>
  <div class="index">
    <el-row>
      <el-col :span="24">
        <!-- <img
          class="pic1"
          src="https://img2.baidu.com/it/u=1208920319,2762754731&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500"
          alt
        /> -->
        <img
          class="pic1"
          src="../../assets/img/wx11.png"
          alt
        />
      </el-col>
    </el-row>
    <div class="nav1">
      <!-- <el-row>
        <el-col :span="20">
          <div class="n1-txt1">1175结果：选择一个条件缩小你选择的范围</div>
          <div class="n1-tit1">
            <div class="n1t-txt1">筛选：</div>
            <div class="item" v-for="item in 6" :key="item">
              <div class="n1t-shu"></div>
              <el-dropdown @command="changeCommand">
                <span class="el-dropdown-link">
                  <span class="n1-sp1">{{commandVal}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>双皮奶</el-dropdown-item>
                  <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>-->
    </div>
    <div class="nav2">
      <div class="items">
        <el-row :gutter="60" style="width:100%">
          <el-col :span="8" v-for="item in tableData" :key="item.id">
            <div class="item" @click="toXiangqin(item.storehouse_id)">
              <div class="n2-tit1">
                <div class="left"></div>
                <div class="right">
                  <i :class="{'el-icon-star-on':true,'active':true}"></i>
                  <div class="txt">{{item.collect_num}}</div>
                </div>
              </div>
              <img class="n2-img" :src="item.product_img" alt />
              <div class="n2-txt1">{{item.status == 0 ? '下架' : '在售'}}</div>
              <div class="n2-txt2">￥{{item.product_price}}</div>
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
      if(this.jishiShougouPage == 1){
        return
      }
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    },
    jishiShougouPageSize: function(pageSize) {
       if(this.jishiShougouPage == 1){
        return
      }
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
    this.getData();
    console.log(this.$route.params);
  },
  methods: {
    async getData() {
      const res = await this.$api.products({
        limit: 9,
        page: this.jishiShougouPage,
        category_id: this.$route.params.category_id,
        shangxin: this.$route.params.status == "shangxin" ? 1 : 0,
        rexiao: this.$route.params.status == "rexiao" ? 1 : 0,
        jingxuan: this.$route.params.status == "jingxuan" ? 1 : 0
      });
      this.tableData = this.tableData.concat(res.data.data);
      if(this.jishiShougouPage > res.data.last_page){
        this.$message('没有更多了');
      }
    },
    toXiangqin(id) {
      this.$store.commit("shopId", id);
      this.$router.push({ name: "Shangpinxiangqin" });
    },
    seeMore() {
      // this.iii += 5;
      this.$store.commit("jishiShougouPage", this.jishiShougouPage + 1);
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
.pic1 {
  width: 100%;
  height: 555px;
}
.nav1 {
  margin: 0 106px;
  padding: 34px 0;
  .n1-txt1 {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #969699;
    line-height: 40px;
  }
  .n1-tit1 {
    display: flex;
    align-items: center;
    .n1t-txt1 {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Semibold;
      font-weight: 600;
      color: #4b4b4d;
      line-height: 40px;
    }
    .item {
      display: flex;
      align-items: center;
      .n1t-shu {
        width: 2px;
        height: 24px;
        background: #969699;
        margin: 0 26px 0 20px;
      }
      .n1-sp1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        color: #000000;
        margin-right: 6px;
      }
      .el-icon-arrow-down {
        font-size: 18px;
        font-weight: 600;
        color: #ffc234;
      }
    }
  }
}
.nav2 {
  margin: 0 106px;
  .items {
    width: 100% !important;
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
      align-items: center;
      margin-bottom: 26px;
      // margin-right: 30px;
      .n2-tit1 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: 162px;
          height: 62px;
          // background: #ffc234;
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
        // margin-top: 98px;
        width: 70%;
        // height: 147px;
        object-fit: cover;
      }
      .n2-txt1 {
        position: absolute;
        top: 360px;
        font-size: 28px;
        color: #2626ff;
      }
      .n2-txt2 {
        margin-top: 60px;
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