<template>
  <div class="index">
    <div class="tit1">售后</div>

    <div class="nav1">
      <el-row :gutter="40" style="margin-right: 0px;">
        <el-col :span="11">
          <div class="item" @click="$router.push({name:'Shouhouwenti'})">
            <img src="../../assets/img/tu2041.png" class="pic1" alt />
            <div class="txt1">售后问题</div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="item" @click="$router.push({name:'Tousujianyi'})">
            <img src="../../assets/img/tu2042.png" class="pic1" alt />
            <div class="txt1">投诉/建议</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tit2">也许您想问我们？</div>
    <div class="nav2">
      <el-row :gutter="20" style="margin-right: 0px;">
        <el-col :span="6">
          <div class="titt1">退货问题</div>
        </el-col>
        <el-col :span="5">
          <div class="titt1">商品运输损坏</div>
        </el-col>
        <el-col :span="6">
          <div class="titt1">买到的眼镜不太合适</div>
        </el-col>
        <el-col :span="5">
          <div class="titt1">处方问题</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-right: 0px;">
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
      </el-row>
       <el-row :gutter="20" style="margin-right: 0px;">
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
      </el-row>
       <el-row :gutter="20" style="margin-right: 0px;">
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="6">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
        <el-col :span="5">
          <div class="titt2">没收到货怎么办？</div>
        </el-col>
      </el-row>
    </div>
    <!-- 物流信息 -->
    <el-dialog :visible.sync="wuliudialogVisible" width="500px" :before-close="wuliuhandleClose"></el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowIndex: "1",
      wuliudialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      total: 0
    };
  },
  created() {
    // console.log(this.asideVal);
  },
  methods: {
    changeFahuo(i) {
      this.nowIndex = i;
    },
    onSubmit() {
      console.log(this.form);
    },
    tongjuChange(e) {
      console.log(e);
      if (e == "1") {
        this.tongjuValLeft = "";
        this.tongjuValRight = "";
      } else if (e == "2") {
        this.tongjuVal = "";
      }
    },
    wuliuhandleClose() {
      this.wuliudialogVisible = false;
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
  margin-top: 60px;
  .item {
    cursor: pointer;
    padding: 100px 0 80px 0;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic1 {
      width: 96px;
      height: 97px;
    }
    .txt1 {
      margin-top: 46px;
      font-size: 30px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #1e1f33;
    }
  }
}
.tit2 {
  margin-top: 60px;
  font-size: 44px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  color: #1e1f33;
}
.nav2 {
  margin-bottom: 60px;
  margin-top: 40px;
  .titt1 {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #1e1f33;
    margin-bottom: 30px;
  }
  .titt2 {
    font-size: 16px;
    text-align: center;
    color: #969699;
    line-height: 20px;
    margin-bottom: 12px;
  }
}
/deep/ .vxe-body--column.col-active {
  background-color: #fafafa;
  font-weight: 700;
}
.wuliuDia {
  .wuliuDia-tit1 {
    font-size: 16px;
    color: #1e1f33;
  }
  .wuliu-btn {
    cursor: pointer;
    margin: 10px auto;
    width: 320px;
    height: 60px;
    background: #000000;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 60px;
  }
}
.dia {
  .txt1 {
    font-size: 32px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #1e1f33;
    margin-bottom: 30px;
  }
  .dia-form {
    padding: 0 20px;
  }
  .btns {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .b-btn1 {
    background: #e1e1e6;
    cursor: pointer;
    width: 300px;
    height: 70px;
    border-radius: 3px;
    line-height: 70px;
    font-size: 22px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
  }
  .b-btn {
    cursor: pointer;
    width: 300px;
    height: 70px;
    background: #000000;
    border-radius: 3px;
    line-height: 70px;
    font-size: 22px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
}
</style>