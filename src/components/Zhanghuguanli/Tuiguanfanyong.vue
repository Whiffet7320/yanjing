<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav2">
        <div class="tit1">
          <img style="width: 24px;height: 24px;margin-right: 12px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1">升级VIP</div>
        </div>
        <div class="tit2">
          <div class="nav1">
            <div class="txt1">方法一：</div>
            <div class="txt2">
              推荐 <span>{{ dataObj.ff1 }}</span
              >人注册，立即成为<span>尊贵vip（升级直接扣费）！</span>
            </div>
          </div>
          <div class="nav1">
            <div class="txt1">方法二：</div>
            <div class="txt2">
              推荐 <span>{{ dataObj.ff2 }}</span
              >人注册，立即成为<span>至尊vip（升级直接扣费）！</span>
            </div>
          </div>
          <div class="nav2-2">
            <div class="nav2-3">
              <div id="copyVal" class="txt3">
                我发现一个好用礼品代发网站，你也看看，注册网址是
                <a class="color">{{
                  yqm
                }}</a>
              </div>
            </div>
            <!-- <div @click="copy" class="txt4">复制</div> -->
          </div>
        </div>
      </div>
      <div class="nav3">
        <img class="pic1" src="../../assets/newImg/mcz31.png" alt="" />
        <div class="left">
          <div class="txt1">
            <div class="dian"></div>
            您已成功邀请<span class="color">{{ dataObj.invited }}</span
            >人
          </div>
        </div>
        <div class="right">
          <div class="txt1">邀请好友永久提成奖励</div>
          <div class="txt1">
            推荐收益计算方式 = 被邀请人支付订单包裹数 * 0.01/单
          </div>
        </div>
      </div>
      <div class="nav4">
        <div class="tit1">
          <img style="width: 24px;height: 24px;margin-right: 12px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1">我推荐的商家</div>
        </div>
        <div class="myTable">
          <vxe-table align="center" :data="tableData">
            <vxe-table-column
              field="username"
              title="手机号码"
            ></vxe-table-column>
            <vxe-table-column field="ctime" title="注册时间"></vxe-table-column>
            <vxe-table-column
              field="renshu"
              title="下级人数"
            ></vxe-table-column>
          </vxe-table>
          <el-pagination
            class="fenye"
            @current-change="this.handleCurrentChange"
            :current-page="this.wotuijiandeshangjiaPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="this.total"
          >
          </el-pagination>
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
    Aside,
  },
  computed: {
    ...mapState(["wotuijiandeshangjiaPage"]),
  },
  watch: {
    wotuijiandeshangjiaPage: function (page) {
      this.$store.commit("wotuijiandeshangjiaPage", page);
      //   this.getData();
    },
  },
  data() {
    return {
      yqm: "",
      tableData: [],
      total: 0,
      dataObj: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.inviteReward({
        token: sessionStorage.getItem("token"),
      });
      if (res.code == 200) {
        console.log(res.data);
        this.dataObj = res.data;
        this.tableData = res.data.xiaxian;
        this.yqm = res.data.code;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
         setTimeout(() => {
          sessionStorage.setItem("isLogin", "123");
          this.$router.go(0);
        }, 3000);
      }
    },
    copy() {},
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("wotuijiandeshangjiaPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.hyindex {
  display: flex;
}
.right {
  width: 100%;
  .nav2 {
    background-image: url("../../assets/newImg/kk2.png");
    background-size: 100% 100%;
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    margin-top: 18px;
    width: 100%;
    height: 280px;
    // background: #ffffff;
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
      margin-left: 70px;
      padding-top: 10px;
      .nav1 {
        margin-top: 26px;
        display: flex;
        align-items: center;
        .txt1 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          color: #000000;
        }
        .txt2 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          color: #000000;
          span {
            color: #ea8e11;
          }
        }
      }
      .nav2-2 {
        display: flex;
        align-items: center;
        .nav2-3 {
          margin-top: 30px;
          width: 715px;
          height: 50px;
          border-radius: 4px;
          opacity: 1;
          background-color: #ffffff;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          .txt3 {
            height: 100%;
            margin-left: 20px;
            opacity: 1;
            font-size: 14px;
            font-family: zw;;
            font-weight: 400;
            line-height: 50px;
            color: #707071;
            .color {
              color: #ea8e11;
              text-decoration: underline;
            }
          }
        }
        .txt4 {
          cursor: pointer;
          margin-top: 30px;
          margin-left: 20px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
          line-height: 50px;
        }
      }
    }
  }
  .nav3 {
    margin: 14px ;
    position: relative;
    width: 100%;
    height: 131px;
    opacity: 1;
    display: flex;
    align-items: center;
    .pic1 {
      position: absolute;
      left: 0;
      top: 0;
      height: 131px;
      opacity: 1;
    }
    .left {
      width: 261px;
      height: 100%;
      opacity: 1;
      background: #fcfdff;
      border-radius: 10px 0px 0px 10px;
      box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
      .txt1 {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        font-size: 19px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #000000;
        .dian {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #000000;
          margin-right: 16px;
        }
        .color {
          color: #ea8e11;
          line-height: 131px;
        }
      }
    }
    .right {
      margin-left: 30px;
      .txt1 {
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: left;
        color: #5c5c5c;
        line-height: 27px;
        margin-bottom: 10px;
      }
    }
  }
  .nav4 {
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    background-image: url("../../assets/newImg/kk2.png");
    background-size: 100% 100%;
    margin-top: 18px;
    width: 100%;
    // background: #ffffff;
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
      margin-left: 70px;
      padding-top: 10px;
      .nav1 {
        margin-top: 26px;
        display: flex;
        align-items: center;
        .txt1 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          color: #000000;
        }
        .txt2 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          color: #000000;
          span {
            color: #ea8e11;
          }
        }
      }
      .nav2-2 {
        display: flex;
        align-items: center;
        .nav2-3 {
          margin-top: 30px;
          width: 665px;
          height: 50px;
          border-radius: 4px;
          opacity: 1;
          background-color: #ffffff;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          .txt3 {
            height: 100%;
            margin-left: 20px;
            opacity: 1;
            font-size: 14px;
            font-family: zw;;
            font-weight: 400;
            line-height: 50px;
            color: #707071;
            .color {
              color: #ea8e11;
              text-decoration: underline;
            }
          }
        }
        .txt4 {
          cursor: pointer;
          margin-top: 30px;
          margin-left: 20px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
          line-height: 50px;
        }
      }
    }
    .myTable {
      margin: 20px auto;
      width: 90%;
    }
    .fenye {
      margin-top: 10px;
      padding-bottom: 30px;
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
</style>