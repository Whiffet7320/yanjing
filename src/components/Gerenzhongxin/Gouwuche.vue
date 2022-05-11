<template>
  <div class="index">
    <div class="tit1">购物车</div>
    <div class="box">
      <el-row :gutter="36">
        <el-col :span="14">
          <div class="b-left">
            <div class="titt1">
              <div class="tt1-l">运费</div>
              <div class="tt1-r">69.00美元以上免运费（美国/加拿大/英国/法国/德国/荷兰/西班牙/西班牙/新加坡/澳大利亚/新西兰/中国/瑞典/菲律宾）</div>
            </div>
            <!-- <el-checkbox v-model="isAll">批量删除</el-checkbox> -->
            <div class="tittItems">
              <div class="item" v-for="item in shopList" :key="item.id">
                <div class="i-txt1">
                  <span @click="delGwc(item.id)">删除</span>
                  <!-- <span>编辑</span>
                  <span class="sp">删除</span>-->
                </div>
                <div class="i-txt2">
                  <img
                    :src="item.product.product_detail_imgs[0]"
                    alt
                    class="pic1"
                  />
                  <div class="i2-r">
                    <div class="i2r-tit1" style="margin-bottom:10px;font-weight:700">
                      <div class="i2r-txt1">{{item.product.product_name}}</div>
                      <div class="i2r-txt1">￥{{item.product.product_price}}</div>
                    </div>
                    <div class="i2r-tit1" style="margin-bottom:10px">
                      <div class="i2r-txt1">类型：{{item.type.type_name}}</div>
                      <div class="i2r-txt1">￥{{item.type.type_price}}</div>
                    </div>
                    <div class="i2r-tit1">
                      <div class="i2r-tit2">颜色：金色</div>
                      <div class="i2r-txt1">￥{{item.color.color_price}}</div>
                    </div>
                    <div class="i2r-tit2">数量x{{item.num}}</div>
                    <div class="i2r-tit1" style="margin-top:10px">
                      <div class="i2r-txt1">折射率：{{item.basicindex.basic_index}}</div>
                      <div class="i2r-txt1">￥{{item.basicindex.price}}</div>
                    </div>
                    <div class="i2r-tit1" style="margin-top:10px">
                      <div class="i2r-txt1">涂层：{{item.coatings.coating_name}}</div>
                      <div class="i2r-txt1">￥{{item.coatings.coating_price}}</div>
                    </div>
                    <!-- <div class="i2r-tit1" style="margin-top:10px">
                      <div class="i2r-txt1">镜片：平光</div>
                      <div class="i2r-txt1">￥36.9</div>
                    </div>-->
                    <div class="heng"></div>
                    <div class="i2r-tit1" style="margin-top:16px">
                      <div class="i2r-txt1">小计</div>
                      <div class="i2r-txt1 red">￥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="b-right">
            <div class="titt1">
              <div class="txtt1">折扣</div>
              <div class="txtt2">购买一个眼镜，获得其他50%的折扣</div>
              <div class="txtt3">选择其他 >></div>
            </div>
            <div class="titt2">
              <!-- <div class="txtt1">优惠码：</div>
              <div class="txtt2">
                <el-input v-model="youhuiCode" placeholder="输入或选择代码/优惠券"></el-input>
                <div class="btn">申请</div>
              </div>-->
              <div class="txtt3" @click="chooseYHQ">
                <div class="t3-l">优惠券</div>
                <div class="t3-r">
                  <el-select size="small" v-model="coupon_id" placeholder="请选择">
                    <el-option
                      v-for="item in yhqList"
                      :key="item.id"
                      :label="`满${item.use_min_price} - ${item.coupon_price}`"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <!-- -￥179.11 -->
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <!-- <div class="txtt4">
                <div class="t3-l">小计</div>
                <div class="t3-r">￥179.11</div>
              </div>
              <div class="txtt4">
                <div class="t3-l">赠送积分</div>
                <div class="t3-r">30点</div>
              </div>
              <div class="txtt5">
                <div class="ll">
                  <el-checkbox v-model="isJifen">积分抵扣</el-checkbox>
                  <div class="xx">（共20点；可用20点）</div>
                </div>
                <div class="rr">-￥12.00</div>
              </div>-->
              <!-- <div class="heng"></div>
              <div class="txtt4">
                <div class="t3-l">累计</div>
                <div class="t3-r red">￥179.11</div>
              </div> -->
              <div
                class="txtt6"
              >购满￥35，符合免费标准送货的条件。（美国/加拿大/英国/ FR / DE / NL / ES / IE / SG /澳大利亚/新西兰/ CH / SE / FI）</div>
              <div @click="toNext" class="btnn">进行结算</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAll: false,
      youhuiCode: "",
      isJifen: false,
      shopList: [],
      yhqList: [],
      coupon_id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.cart_list({
        limit: 100,
        page: 1
      });
      this.shopList = res.data.data;
      this.shopList.forEach(ele => {
        ele.price =
          Number(ele.basicindex.price) +
          Number(ele.coatings.coating_price) +
          Number(ele.color.color_price) +
          Number(ele.product.product_price) +
          Number(ele.type.type_price);
      });
      const res2 = await this.$api.user_coupon_list({
        limit: 1000,
        page: 1
      });
      this.yhqList = res2.data.data;
    },
    async delGwc(id) {
      const res = await this.$api.delcart({ cart_arr_id: [id] });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.message);
      }
    },
    chooseYHQ() {},
    toXiangqin() {
      this.$router.push({ name: "Shangpinxiangqin" });
    },
    seeMore() {
      this.iii += 5;
    },
    changeCommand(e) {
      console.log(e);
      this.commandVal = e;
    },
    toNext() {
      var arr = [];
      this.shopList.forEach(ele => {
        arr.push(ele.id);
      });
      this.$router.push({ name: "GouwucheNext", params: { cart_arr_id: arr,coupon_id:this.coupon_id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #fafafa;
}
/deep/ .el-select {
  width: 180px;
}
.tit1 {
  padding-top: 20px;
  margin: 0px 0 44px 106px;
  font-size: 28px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  color: #1e1f33;
}
.box {
  margin: 0 100px;
}
.b-left {
  .titt1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tt1-l {
      width: 159px;
      height: 52px;
      border: 1px solid #2626ff;
      border-radius: 26px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      line-height: 52px;
      color: #2626ff;
    }
    .tt1-r {
      width: 80%;
      font-size: 20px;
      color: #333334;
      line-height: 22px;
      font-weight: 300;
    }
  }
  .tittItems {
    margin: 22px 0;
    .item {
      background: #ffffff;
      padding: 20px 32px;
      margin-bottom: 20px;
      .i-txt1 {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 800;
        cursor: pointer;
        .sp {
          margin-left: 20px;
        }
      }
      .i-txt2 {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .pic1 {
          width: 200px;
          height: 200px;
          margin-right: 60px;
        }
        .i2-r {
          width: 70%;
          .i2r-tit1 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .i2r-txt1 {
              font-size: 18px;
              color: #1e1f33;
              // font-weight: 300;
            }
            .i2r-txt1.red {
              font-size: 24px;
              font-family: PingFang SC, PingFang SC-Heavy;
              font-weight: 800;
              color: #e61717;
            }
          }
          .i2r-tit2 {
            font-weight: 300;
            font-size: 18px;
            color: #969699;
            margin: 4px 0;
          }
          .heng {
            margin-top: 18px;
            height: 1px;
            background: #e1e1e6;
          }
        }
      }
    }
  }
}
.b-right {
  .titt1 {
    display: flex;
    align-items: center;
    .txtt1 {
      width: 159px;
      height: 52px;
      border: 1px solid #ffb300;
      border-radius: 26px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      line-height: 52px;
      color: #ffb300;
    }
    .txtt2 {
      font-size: 18px;
      color: #333334;
      font-weight: 300;
      margin-left: 20px;
    }
    .txtt3 {
      cursor: pointer;
      font-weight: 800;
      font-size: 18px;
      color: #333334;
      margin-left: 20px;
    }
  }
  .titt2 {
    margin-top: 22px;
    padding: 20px 40px;
    background: #ffffff;
    .txtt1 {
      font-size: 18px;
      color: #1e1f33;
    }
    .txtt2 {
      margin-top: 22px;
      display: flex;
      align-items: center;
      .btn {
        cursor: pointer;
        margin-left: 16px;
        width: 169px;
        height: 40px;
        background: #000000;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 40px;
      }
    }
    .txtt3 {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t3-l {
        width: 77px;
        height: 30px;
        background: #ffb300;
        border-radius: 3px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 30px;
      }
      .t3-r {
        cursor: pointer;
        font-size: 18px;
        color: #ffc234;
        .el-icon-arrow-right {
          color: #1e1f33;
          font-weight: 800;
        }
      }
    }
    .txtt4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 26px;
      .t3-l {
        font-size: 16px;
        color: #1e1f33;
      }
      .t3-r {
        font-size: 16px;
        color: #1e1f33;
      }
      .t3-r.red {
        font-size: 30px;
        color: #e61717;
      }
    }
    .txtt5 {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .ll {
        display: flex;
        align-items: center;
        .xx {
          margin-left: 20px;
          font-size: 14px;
          color: #4b4b4d;
        }
      }
      .rr {
        font-size: 16px;
        color: #1e1f33;
      }
    }
    .heng {
      height: 1px;
      background: #969699;
      margin-top: 24px;
    }
    .txtt6 {
      width: 80%;
      line-height: 16px;
      margin-top: 40px;
      font-size: 14px;
      color: #333334;
    }
    .btnn {
      cursor: pointer;
      margin-top: 30px;
      margin-bottom: 20px;
      height: 70px;
      background: #000000;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 70px;
    }
  }
}
</style>