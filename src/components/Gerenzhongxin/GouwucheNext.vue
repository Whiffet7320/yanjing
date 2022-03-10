<template>
  <div class="index">
    <div class="box">
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="b-left">
            <div class="tit1">1.收货地址</div>
            <div class="item">
              <div class="i-txt1">
                <div class="it-right">
                  <span @click="dialogVisible = true">更换</span>
                  <!-- <span @click="dialogVisible = true" class="sp">更换</span> -->
                </div>
              </div>
              <el-row style="margin-top:20px">
                <el-col :span="4">
                  <div class="txt1">收货人：</div>
                </el-col>
                <el-col :span="20">
                  <div class="txt2">{{nowAddress.real_name_first}} {{nowAddress.real_name_second}}</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px">
                <el-col :span="4">
                  <div class="txt1">地址：</div>
                </el-col>
                <el-col :span="20">
                  <div
                    class="txt2"
                  >中国 {{nowAddress.city}} {{nowAddress.district}} {{nowAddress.detail}}</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px">
                <el-col :span="4">
                  <div class="txt1">电话：</div>
                </el-col>
                <el-col :span="20">
                  <div class="txt2">{{nowAddress.phone}}</div>
                </el-col>
              </el-row>
            </div>
            <!-- <div class="dia-form">
              <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="姓">
                      <el-input v-model="form.xing"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="名">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="国家/地区">
                      <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="州/省">
                      <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="地址">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="邮编/邮政">
                      <el-input v-model="form.xing"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="城市">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="电话">
                      <el-input v-model="form.xing"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>-->
            <!-- <div class="tit2">
              2.运输方式
              <span class="sp">（交货时间包括镜片加工和运输时间）</span>
            </div>
            <div class="tit3">
              <div class="txt">
                <div class="t-l">
                  <el-radio v-model="Rad1" label="1">标准运输</el-radio>
                  <span class="sp">（14-21天）</span>
                </div>
                <div class="t-r">￥96.65</div>
              </div>
              <div class="txt" style="margin-top:40px">
                <div class="t-l">
                  <el-radio v-model="Rad1" label="2">提前发货</el-radio>
                  <span class="sp">（10-14天）</span>
                  <div class="bq">推荐</div>
                </div>
                <div class="t-r">￥96.65</div>
              </div>
              <div class="txt" style="margin-top:40px">
                <div class="t-l">
                  <el-radio v-model="Rad1" label="3">商务快递</el-radio>
                  <span class="sp">（14-21天）</span>
                </div>
                <div class="t-r">￥96.65</div>
              </div>
              <div class="txtt">请写下您的实际地址，因为眼镜无法成功运送到“邮政信箱”</div>
              <div class="t-box">
                <div class="top">
                  <div class="t-l">免费快运</div>
                  <div class="t-r">￥29.8/Year</div>
                </div>
                <div class="down">
                  <div class="d-l">
                    <div class="txt">成为会员！</div>
                    <div class="txt">获得1年免费的商务快递</div>
                  </div>
                  <div class="d-r">立刻购买</div>
                </div>
              </div>
            </div>-->
          </div>
        </el-col>
        <el-col :span="10">
          <div class="b-right" style="margin-bottom:20px">
            <div class="tit1">订单摘要</div>
            <div class="br-box">
              <div class="titt1">
                <div class="t-l">小计</div>
                <div class="t-r">￥{{payObj.total_price}}</div>
              </div>
              <div class="titt1">
                <div class="t-l">折扣</div>
                <div class="t-r">-￥{{payObj.coupon_price}}</div>
              </div>
              <div class="titt1">
                <div class="t-l">赠送积分</div>
                <div class="t-r">{{payObj.total_integral}}点</div>
              </div>
              <div class="titt1">
                <div class="t-l">邮费</div>
                <div class="t-r">￥{{payObj.total_postage}}</div>
              </div>
              <div class="heng"></div>
              <div class="titt2">
                <div class="t-l">累计</div>
                <div class="t-r">￥{{payObj.pay_price}}</div>
              </div>
              <div
                v-if="!isYHK"
                @click="choosePay('1')"
                :class="{'boxx':true,'active':payIndex == '1'}"
              >
                <img src="../../assets/img/Paypal.png" class="pic1" alt />
              </div>
              <div @click="pay" class="btn">支付</div>
              <!-- <div
                v-if="!isYHK"
                @click="choosePay('2')"
                :class="{'boxx':true,'active':payIndex == '2'}"
              >
                <img src="../../assets/img/sepa.png" class="pic2" alt />
              </div>
              <div
                v-if="!isYHK"
                @click="choosePay('3')"
                :class="{'boxx':true,'active':payIndex == '3'}"
              >
                <img src="../../assets/img/tu2048.png" class="pic3" alt />
              </div>
              <div
                v-if="!isYHK"
                @click="choosePay('4')"
                :class="{'boxx':true,'active':payIndex == '4'}"
              >
                <img src="../../assets/img/Sofort.png" class="pic4" alt />
              </div>-->
              <!-- <div @click="isYHK = !isYHK" class="box2">借记卡或信用卡</div>
              <div v-if="!isYHK" class="boxx3">
                <img src="../../assets/img/tu2050.png" class="pic4" alt />
              </div>
              <div v-if="isYHK" class="boxx4">
                <img src="../../assets/img/zu148.png" alt class="picc" />
                <div class="txt1">卡号</div>
                <el-input v-model="payform.kahao" placeholder="请输入卡号"></el-input>
                <el-row :gutter="12">
                  <el-col :span="12">
                    <div class="txt1">到期日</div>
                    <el-input v-model="payform.date" placeholder="MM/YY"></el-input>
                  </el-col>
                  <el-col :span="12">
                    <div class="txt1">CVC/CVVCVC/CVV</div>
                    <el-input v-model="payform.cvc" placeholder="3位数字"></el-input>
                  </el-col>
                </el-row>
                <div @click="pay" class="btn">支付</div>
              </div>-->
              <!-- <div class="checkBox">
                <el-checkbox v-model="isYSZCcheck">我同意条款和条件以及隐私政策</el-checkbox>
              </div>-->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 更换 -->
    <el-dialog :visible.sync="dialogVisible" width="740px" :before-close="handleClose">
      <div class="dia">
        <div class="items">
          <div class="item" v-for="item in dizhiList" :key="item.id">
            <div class="i-txt1">
              <div class="it-left">{{item.is_default == 1 ? '默认送货地址' : ''}}</div>
              <div class="it-right">
                <span @click="chooseAddress(item)">选择</span>
                <!-- <span @click="delAddress(item)" class="sp">删除</span> -->
              </div>
            </div>
            <el-row style="margin-top:20px">
              <el-col :span="4">
                <div class="txt1">收货人：</div>
              </el-col>
              <el-col :span="20">
                <div class="txt2">{{item.real_name_first}} {{item.real_name_second}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col :span="4">
                <div class="txt1">地址：</div>
              </el-col>
              <el-col :span="20">
                <div class="txt2">中国 {{item.city}} {{item.district}} {{item.detail}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col :span="4">
                <div class="txt1">电话：</div>
              </el-col>
              <el-col :span="20">
                <div class="txt2">{{item.phone}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_address_id: "",
      dialogVisible: false,
      cart_arr_id: "",
      nowAddress: {},
      dizhiList: [],
      payform: {
        kahao: ""
      },
      Rad1: "1",
      payIndex: "1",
      isYSZCcheck: false,
      isYHK: false,
      coupon_id: "",
      payObj: {}
    };
  },
  created() {
    this.cart_arr_id = this.$route.params.cart_arr_id;
    this.coupon_id = this.$route.params.coupon_id;
    this.getData();
  },
  methods: {
    async getData() {
      const res2 = await this.$api.address_list();
      this.dizhiList = res2.data.data;
      this.nowAddress = this.dizhiList.filter(ele => {
        return ele.is_default == 1;
      })[0];
      this.user_address_id = this.nowAddress.id;
      console.log(this.cart_arr_id);
      const res = await this.$api.order_calc({
        user_address_id: this.user_address_id,
        cart_arr_id: this.cart_arr_id,
        coupon_id: this.coupon_id
      });
      console.log(this.cart_arr_id);
      console.log(res);
      this.payObj = res.data;
    },
    async pay() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.order2pay({
        user_address_id: this.user_address_id,
        cart_arr_id: this.cart_arr_id
      });
      console.log(res.data);
      loading.close();
      window.open(res.data);
    },
    chooseAddress(item) {
      this.user_address_id = item.id;
      this.nowAddress = item;
      this.dialogVisible = false;
    },
    choosePay(i) {
      this.payIndex = i;
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #fafafa;
}
.box {
  padding-top: 40px;
  margin: 0 100px;
  .b-left {
    .tit1 {
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #000000;
    }
    .item {
      margin-top: 30px;
      margin-bottom: 20px;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      padding: 22px 32px;
      .i-txt1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        .it-left {
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #1e1f33;
        }
        .it-right {
          cursor: pointer;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #2626ff;
          .sp {
            margin-left: 30px;
            color: #1e1f33;
          }
        }
      }
      .txt1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #969699;
        line-height: 18px;
      }
      .txt2 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #1e1f33;
        line-height: 18px;
      }
    }
    .dia-form {
      background: #ffffff;
      padding: 30px 60px;
    }
    .tit2 {
      margin-top: 60px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #000000;
      .sp {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #1e1f33;
      }
    }
    .tit3 {
      margin-top: 40px;
      margin-bottom: 60px;
      background: #ffffff;
      padding: 30px 60px;
      .txt {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t-l {
          display: flex;
          align-items: center;
          .sp {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Light;
            font-weight: 300;
            color: #1e1f33;
            margin-left: 10px;
          }
          .bq {
            margin-left: 20px;
            width: 60px;
            height: 30px;
            background: #e61717;
            border-radius: 3px;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Light;
            font-weight: 300;
            text-align: center;
            color: #fafafa;
            line-height: 30px;
          }
          /deep/ .el-radio__label {
            font-size: 18px;
            font-weight: 300;
          }
        }
        .t-r {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
      }
      .txtt {
        margin-top: 16px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #969699;
      }
      .t-box {
        box-sizing: border-box;
        border-radius: 8px;
        margin-top: 20px;
        background-image: url("../../assets/img/zu146.png");
        background-size: 100% 100%;
        width: 496px;
        height: 119px;
        padding: 14px 18px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .t-l {
            font-size: 24px;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 800;
            color: #804c19;
          }
          .t-r {
            font-size: 24px;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 800;
            color: #804c19;
          }
        }
        .down {
          margin-top: 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .d-l {
            .txt {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Light;
              font-weight: 300;
              color: #804c19;
              line-height: 20px;
            }
          }
          .d-r {
            cursor: pointer;
            width: 120px;
            height: 40px;
            background: #804c19;
            border-radius: 21px;
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Light;
            font-weight: 300;
            text-align: center;
            color: #ffffff;
            line-height: 40px;
          }
        }
      }
    }
  }
  .b-right {
    .tit1 {
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #000000;
    }
    .br-box {
      margin-top: 30px;
      padding: 40px 44px;
      background: #ffffff;
      .titt1 {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 300;
        .t-l {
          font-size: 18px;
          color: #000000;
        }
        .t-r {
          font-size: 18px;
          color: #000000;
        }
      }
      .heng {
        margin-top: 24px;
        height: 1px;
        background: #969699;
      }
      .titt2 {
        margin-top: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 300;
        .t-l {
          font-size: 18px;
          color: #000000;
        }
        .t-r {
          font-weight: 800;
          font-size: 30px;
          color: #e61717;
        }
      }
      .boxx.active {
        background: #ffb300;
      }
      .boxx {
        cursor: pointer;
        margin-top: 28px;
        background: #f5f5f5;
        border-radius: 3px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        .pic1 {
          width: 129px;
          height: 31px;
        }
        .pic2 {
          width: 84px;
          height: 53px;
        }
        .pic3 {
          width: 92px;
          height: 41px;
        }
        .pic4 {
          width: 113px;
          height: 37px;
        }
      }
      .box2 {
        cursor: pointer;
        margin-top: 28px;
        background: #333334;
        border-radius: 3px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #ffffff;
      }
      .boxx3 {
        cursor: pointer;
        margin-top: 28px;
        background: #a7ffde;
        border-radius: 3px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        .pic4 {
          width: 237px;
          height: 46px;
        }
      }
      .checkBox {
        margin-top: 30px;
      }
      .boxx4 {
        margin-top: 30px;
        background: #fafafa;
        border: 1px solid #e1e2e6;
        border-radius: 8px;
        padding: 20px;
        .picc {
          width: 228px;
          height: 24px;
        }
        .txt1 {
          margin-top: 26px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #000000;
          font-weight: 800;
        }
        .btn {
          cursor: pointer;
          margin-top: 16px;
          height: 70px;
          background: #000000;
          font-size: 20px;
          text-align: center;
          color: #ffffff;
          line-height: 70px;
        }
      }
    }
  }
}
.btn {
  cursor: pointer;
  margin-top: 16px;
  height: 70px;
  background: #000000;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
  line-height: 70px;
}
.dia {
  .items {
    .item {
      border: 2px solid #ccc;
      margin-bottom: 20px;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      padding: 22px 32px;
      .i-txt1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        .it-left {
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #1e1f33;
        }
        .it-right {
          cursor: pointer;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #2626ff;
          .sp {
            margin-left: 30px;
            color: #1e1f33;
          }
        }
      }
      .txt1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #969699;
        line-height: 18px;
      }
      .txt2 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #1e1f33;
        line-height: 18px;
      }
    }
  }
}
</style>