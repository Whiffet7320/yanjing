<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：售后服务 > 单底申请</div>
      <div class="nav2">
        <div class="tit1">
          <img
            style="width: 24px;height: 24px;margin-right: 12px;"
            src="../../assets/newImg/tubiao301.png"
            alt
          />
          <div class="txt1">单底申请</div>
        </div>
        <div class="tit2">
          <div class="myForm">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="快递单号">
                    <el-input
                      placeholder="快递单号，多个请换行输入"
                      class="kddh"
                      type="textarea"
                      v-model="form.val1"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Email">
                    <el-input placeholder="请输入email" class="email" v-model="form.val2"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="myTxt">(tips:提供被降权的订单)</div>
              <div @click="onSubmit" class="btn">提交</div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="nav3">
        <div class="myTable">
          <vxe-table align="center" :data="tableData">
            <vxe-table-column width="80" field="delivery_id" title="编号"></vxe-table-column>
            <vxe-table-column field="logi_no" title="快递单号"></vxe-table-column>
            <vxe-table-column field="mail" title="接收邮件"></vxe-table-column>
            <vxe-table-column field="myStatus" title="申请状态"></vxe-table-column>
            <vxe-table-column field="ctime" title="申请时间"></vxe-table-column>
            <template #empty>
              <div class="tabEmpty">
                <img class="pic" src="../../assets/newImg/zu261.png" />
                <p class="txt">没有相关内容</p>
              </div>
            </template>
          </vxe-table>
          <el-pagination
            class="fenye"
            @current-change="this.handleCurrentChange"
            :current-page="this.didanshenqinPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside";
import { mapState } from "vuex";
export default {
  components: {
    Aside
  },
  computed: {
    ...mapState(["didanshenqinPage"])
  },
  watch: {
    didanshenqinPage: function(page) {
      this.$store.commit("didanshenqinPage", page);
      //   this.getData();
    }
  },
  data() {
    return {
      form: {
        val1: "",
        val2: ""
      },
      tableData: [],
      total: 0
    };
  },
  created() {
    if (sessionStorage.getItem("token") == "null") {
      setTimeout(() => {
        sessionStorage.setItem("isLogin", "123");
        this.$router.go(0);
      }, 3000);
    }
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.AftermarketGetData({
        token: sessionStorage.getItem("token")
      });
      if (res.code == 200) {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(ele => {
          if (ele.status == 1) {
            ele.myStatus = "已申请";
          } else if (ele.status == 2) {
            ele.myStatus = "已处理";
          }
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    async onSubmit() {
      // console.log(this.form);
      const res = await this.$api.AftermarketAddData({
        token: sessionStorage.getItem("token"),
        kd_order: this.form.val1,
        mail: this.form.val2
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.form.val1 = "";
        this.form.val2 = "";
      } else {
        this.$message.error(res.msg);
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("didanshenqinPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.hyindex {
  display: flex;
}
.right {
  width: 100%;
  .nav1 {
    margin-left: 16px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #868686;
  }
  .nav2 {
    margin-top: 18px;
    width: 100%;
    height: 610px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk10.png");
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 40px;
    .tit1 {
      width: 94%;
      display: flex;
      align-items: center;
      margin-left: 50px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
      .shu {
        width: 5px;
        height: 25px;
        opacity: 1;
        background: #ea8e11;
        margin-right: 16px;
      }
      .txt1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
    }
    .tit2 {
      margin: 30px auto;
      width: 90%;
      .myForm {
        position: relative;
        /deep/ .el-form-item {
          display: flex;
          flex-direction: column;
        }
        /deep/ .el-form-item__label {
          margin-left: 10px;
          font-weight: 700;
          text-align: left;
        }
        /deep/ .el-form-item__content {
          margin-left: 10px !important;
        }
        .kddh {
          /deep/ .el-textarea__inner {
            height: 260px;
            box-shadow: inset 0px 0 16px 2px #dddddd !important;
          }
        }
        .email {
          /deep/ .el-input__inner {
            height: 52px;
            box-shadow: inset 0px 0 16px 2px #dddddd !important;
          }
        }
        .myTxt {
          position: absolute;
          left: 190px;
          top: 334px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: left;
          color: #e64950;
        }
        .imgBox {
          border-radius: 10px;
          cursor: pointer;
          width: 189px;
          height: 188px;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          display: flex;
          justify-content: center;
          align-items: center;
          .img1 {
            width: 26px;
            height: 21px;
            opacity: 1;
          }
          .img2 {
            width: 189px;
            height: 188px;
          }
        }
        .btn {
          margin-top: 10px;
          cursor: pointer;
          margin-left: 10px;
          width: 189px;
          height: 49px;
          opacity: 1;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          border-radius: 4px;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          line-height: 49px;
          text-align: center;
          color: #5c5c5c;
        }
      }
    }
  }
  .nav3 {
    margin: 18px 16px 16px 16px;
    background: #ffffff;
    padding: 10px;
    border-radius: 10px;
    .fenye {
      margin-top: 10px;
    }
    /deep/ .el-pager {
      .active {
        color: #ea8e11;
      }
      .number:hover {
        color: #ea8e11;
      }
    }
  }
}
.tabEmpty {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  .pic {
    width: 108px;
    height: 80px;
    margin-bottom: 10px;
  }
  .txt {
    font-size: 14px;
    font-family: zw;
    font-weight: 400;
    text-align: center;
    color: #5c5c5c;
  }
}
</style>