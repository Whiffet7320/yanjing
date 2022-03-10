<template>
  <div class="index">
    <div class="tit1">我的订单</div>
    <div class="tit2">
      <div @click="changeFahuo('0')" :class="{'txt1':true,'active':nowIndex == '0'}">待发货</div>
      <div @click="changeFahuo('1')" :class="{'txt1':true,'active':nowIndex == '1'}">待收货</div>
      <div @click="changeFahuo('2')" :class="{'txt1':true,'active':nowIndex == '2'}">待评价</div>
      <div @click="changeFahuo('3')" :class="{'txt1':true,'active':nowIndex == '3'}">已完成</div>
    </div>
    <div class="nav1">
      <div class="items">
        <!-- 待发货 -->
        <template v-if="!loading">
          <div class="item" v-for="item in orderList" :key="item.id">
            <div class="i-tit1">
              <div class="i-txt1">订单编号：{{item.trade_no}}</div>
              <div
                class="i-txt2"
              >{{nowIndex == '0' ? '待发货' : nowIndex == '1' ? '待收货' : nowIndex == '2' ? '待评价' : "已完成"}}</div>
            </div>
            <div class="i-tit2" v-for="ele in item.orderinfo" :key="ele.id">
              <img :src="ele.product_img" alt class="i-pic1" />
              <div class="i-right">
                <div class="ir-txt1">{{ele.product_name}}</div>
                <div class="ir-txt2">{{ele.product_num}}</div>
                <div class="ir-txt3">￥{{ele.product_price}}</div>
              </div>
              <el-col :span="6" v-if="nowIndex == '2'">
                <div v-if="ele.is_comment == 0" @click="xiePingjia(ele)" class="i3-btn11 xpj">写评价</div>
                <div v-else class="i3-btn11 xpj">已评价</div>
                <!-- <div class="shouhou">售后</div> -->
              </el-col>
            </div>
            <div class="i-tit3">
              <el-row :gutter="26" style="display: flex;align-items: center;">
                <el-col :span="18">
                  <el-row>
                    <el-col :span="6">
                      <div class="i3-txt">收货人：</div>
                    </el-col>
                    <el-col :span="18">
                      <div
                        class="i3-txt"
                      >{{item.addressinfo.real_name_first}} {{item.addressinfo.real_name_second}}</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">电话：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">{{item.addressinfo.phone}}</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">地址：</div>
                    </el-col>
                    <el-col :span="18">
                      <div
                        class="i3-txt"
                      >{{item.addressinfo.province}} {{item.addressinfo.city}} {{item.addressinfo.district}} {{item.addressinfo.detail}}</div>
                    </el-col>
                  </el-row>
                </el-col>
                <!-- <el-col :span="6" v-if="nowIndex == '0'">
                  <div class="i3-btn1">取消订单</div>
                </el-col>-->
                <!-- <el-col :span="6" v-if="nowIndex == '2'">
                  <div @click="xiePingjia(item)" class="i3-btn1 xpj">写评价</div>
                  <div class="shouhou">售后</div>
                </el-col>-->
                <el-col :span="6" v-if="nowIndex == '3'">
                  <div class="i3-btn1">去售后</div>
                </el-col>
                <el-col :span="6" v-if="nowIndex == '1'">
                  <div @click="shouhuo(item)" class="i3-btn1 xpj">确认收货</div>
                  <div @click="seeWuliu(item)" class="shouhou">查看物流</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>

        <!-- 待评价 -->
        <template v-if="false">
          <div class="item" v-for="item in orderList" :key="item.id">
            <div class="i-tit1">
              <div class="i-txt1">订单编号：{{item.trade_no}}</div>
              <div class="i-txt2">待评价</div>
            </div>
            <div class="i-tit2">
              <img
                src="https://img1.baidu.com/it/u=1410082512,1043177061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
                alt
                class="i-pic1"
              />
              <div class="i-right">
                <div class="ir-txt1">办公室用严谨边框白镜黑框公室用严谨边框白镜黑框公室用严谨边框白镜黑框眼镜</div>
                <div class="ir-txt2">ZQX45646-02</div>
                <div class="ir-txt3">￥56.61</div>
              </div>
            </div>
            <div class="i-tit3">
              <el-row :gutter="26" style="display: flex;align-items: center;">
                <el-col :span="18">
                  <el-row>
                    <el-col :span="6">
                      <div class="i3-txt">收货人：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">六哥</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">电话：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">153645687978</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">地址：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">中国 浙江省 温州市 龙湾区 什么街道 什么什么区 2-630</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <div @click="pinlundialogVisible = true" class="i3-btn1 xpj">写评价</div>
                  <div class="shouhou">售后</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>

        <!-- 已完成 -->
        <template v-if="false">
          <div class="item" v-for="item in orderList" :key="item.id">
            <div class="i-tit1">
              <div class="i-txt1">订单编号：{{item.trade_no}}</div>
              <div class="i-txt2">已完成</div>
            </div>
            <div class="i-tit2">
              <img
                src="https://img1.baidu.com/it/u=1410082512,1043177061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
                alt
                class="i-pic1"
              />
              <div class="i-right">
                <div class="ir-txt1">办公室用严谨边框白镜黑框公室用严谨边框白镜黑框公室用严谨边框白镜黑框眼镜</div>
                <div class="ir-txt2">ZQX45646-02</div>
                <div class="ir-txt3">￥56.61</div>
              </div>
            </div>
            <div class="i-tit3">
              <el-row :gutter="26" style="display: flex;align-items: center;">
                <el-col :span="18">
                  <el-row>
                    <el-col :span="6">
                      <div class="i3-txt">收货人：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">六哥</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">电话：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">153645687978</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">地址：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">中国 浙江省 温州市 龙湾区 什么街道 什么什么区 2-630</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <div class="i3-btn1">去售后</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>

        <!-- 待收货 -->
        <template v-if="false">
          <div class="item" v-for="item in orderList" :key="item.id">
            <div class="i-tit1">
              <div class="i-txt1">订单编号：{{item.trade_no}}</div>
              <div class="i-txt2">待收货</div>
            </div>
            <div class="i-tit2">
              <img
                src="https://img1.baidu.com/it/u=1410082512,1043177061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
                alt
                class="i-pic1"
              />
              <div class="i-right">
                <div class="ir-txt1">办公室用严谨边框白镜黑框公室用严谨边框白镜黑框公室用严谨边框白镜黑框眼镜</div>
                <div class="ir-txt2">ZQX45646-02</div>
                <div class="ir-txt3">￥56.61</div>
              </div>
            </div>
            <div class="i-tit3">
              <el-row :gutter="26" style="display: flex;align-items: center;">
                <el-col :span="18">
                  <el-row>
                    <el-col :span="6">
                      <div class="i3-txt">收货人：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">六哥</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">电话：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">153645687978</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 18px;">
                    <el-col :span="6">
                      <div class="i3-txt">地址：</div>
                    </el-col>
                    <el-col :span="18">
                      <div class="i3-txt">中国 浙江省 温州市 龙湾区 什么街道 什么什么区 2-630</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <div class="i3-btn1 xpj">确认收货</div>
                  <div class="shouhou">查看物流</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>
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
      <!-- <el-row :gutter='20'>
        <el-col :span='12'></el-col>
        <el-col :span='12'></el-col>
      </el-row>-->
    </div>
    <!-- 物流信息 -->
    <el-dialog :visible.sync="wuliudialogVisible" width="500px" :before-close="wuliuhandleClose">
      <div class="wuliuDia">
        <div class="wuliuDia-tit1">顺风快递：65464564645</div>
        <div v-for="(item, index) in tracesData" :key="index">
          <trackNode
            :is-first="index===tracesData.length-1"
            :is-newest="index===0"
            :is-main-node="item.isMainNode"
            :node-data="item"
          ></trackNode>
        </div>
        <div class="wuliu-btn">确认收货</div>
      </div>
    </el-dialog>
    <!-- 写评论 -->
    <el-dialog :visible.sync="pinlundialogVisible" width="500px" :before-close="pinlunhandleClose">
      <div class="pinlunDia">
        <div class="pinlun-tit1">写评论</div>
        <div class="txx">
          <span class="sp">评分</span>
          <el-rate v-model="star"></el-rate>
        </div>
        <div class="imgs">
          <div v-for="(item,i) in imgs" :key="i" @click="companyList(i)">
            <el-image style="width: 100px; height: 100px" :src="item">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="pinlunVal"></el-input>
        <div @click="pinlunonSubmit" class="pinlun-btn">发表</div>
      </div>
    </el-dialog>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      style="display:none"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import trackNode from "../../components/trackNode.vue";
export default {
  components: {
    trackNode
  },
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
      id: "",
      imgs: ["", "", ""],
      star: 0,
      orderList: [],
      nowIndex: "0",
      wuliudialogVisible: false,
      pinlundialogVisible: false,
      tracesData: [
        {
          acceptStation: "包裹已被吴亦发同学签收", // 节点描述
          createTime: "2019-10-24 15: 27: 16",
          status: "COMPLETE", // 节点状态
          phone: "", // 电话
          statusName: "已签收", // 节点标题
          isMainNode: true // 是否主节点，主节点前方展示icon
        },
        {
          acceptStation: "由派送员蔡小坤同志配送，电话：",
          createTime: "2019-10-24 15: 26: 41",
          status: "DELIVERING",
          phone: "16677778888",
          statusName: "运输中",
          isMainNode: true
        },
        {
          acceptStation: "已到XXX小区快递点",
          createTime: "2019-10-24 15: 26: 41",
          status: "DELIVERING",
          phone: "",
          statusName: "运输中",
          isMainNode: false
        },
        {
          acceptStation: "已到海宁集散中心",
          createTime: "2019-10-24 15: 26: 18",
          status: "DELIVERING",
          phone: "",
          statusName: "运输中",
          isMainNode: false
        },
        {
          acceptStation: "已到杭州集散中心",
          createTime: "2019-10-24 15: 26: 07",
          status: "DELIVERING",
          phone: "",
          statusName: "运输中",
          isMainNode: false
        },
        {
          acceptStation: "包裹已到达余杭区集散中心",
          createTime: "2019-10-24 15: 25: 54",
          status: "DELIVERING",
          phone: "",
          statusName: "运输中",
          isMainNode: false
        },
        {
          acceptStation: "快递员已上门取件",
          createTime: "2019-10-24 15: 25: 17",
          status: "DELIVERING",
          phone: "",
          statusName: "已揽收",
          isMainNode: false
        },
        {
          acceptStation: "等待快递员上门揽件",
          createTime: "2019-10-24 15: 25: 00",
          status: "WATTING_DELIVER",
          phone: "",
          statusName: "已发货",
          isMainNode: true
        },
        {
          acceptStation: "您的包裹正在打包",
          createTime: "2019-10-24 15: 24: 00",
          status: "WATTING_DELIVER",
          phone: "",
          statusName: "待发货",
          isMainNode: false
        },
        {
          acceptStation: "订单支付成功，等待商家发货",
          createTime: "2019-10-24 15: 22: 30",
          status: "PAYED",
          statusName: "已支付",
          isMainNode: true
        },
        {
          acceptStation: "订单提交成功",
          createTime: "2019-10-24 15: 22: 00",
          status: "WATTING_PAY",
          statusName: "已下单",
          isMainNode: true
        }
      ],
      pinlunVal: "",
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
      total: 0,
      loading: false,
      imgIndex: ""
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
      const res = await this.$api.order_list({
        status: this.nowIndex,
        limit: 1000,
        page: 1
      });
      console.log(res);
      this.orderList = res.data.data;
      loading.close();
      this.loading = false;
    },
    async shouhuo(item) {
      const res = await this.$api.order_confirm({ order_id: item.id });
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
    async seeWuliu(item) {
      const res = await this.$api.order_express_detail({ order_id: item.id });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.wuliudialogVisible = true;
      } else {
        this.$message.error(res.message);
      }
    },
    xiePingjia(item) {
      this.pinlundialogVisible = true;
      this.id = item.id;
    },
    // 上传图片
    companyList(i) {
      this.imgIndex = i;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          this.imgFile.append("type", "comment");
          const res = await that.$api.upload_img(this.imgFile);
          console.log(`${this.$url}${res.data.path}`);
          this.$set(this.imgs, this.imgIndex, `${this.$url}${res.data.path}`);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    pinlunhandleClose() {
      this.pinlundialogVisible = false;
    },
    changeFahuo(i) {
      this.nowIndex = i;
      this.getData();
    },
    async pinlunonSubmit() {
      console.log(this.pinlunVal);
      const res = await this.$api.order_comment({
        orderinfo_id: this.id,
        imgs: this.imgs,
        content: this.pinlunVal,
        star: this.star
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.pinlundialogVisible = false;
        this.getData();
      } else {
        this.$message.error(res.message);
      }
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
.tit2 {
  display: flex;
  align-content: center;
  margin-top: 20px;
  .txt1 {
    cursor: pointer;
    margin-right: 40px;
    font-size: 20px;
    color: #969699;
    font-weight: 300;
  }
  .txt1.active {
    color: #1e1f33;
  }
}
.nav1 {
  .items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
    .item {
      &:nth-child(odd) {
        margin-right: 24px;
      }
      margin-top: 22px;
      background: #ffffff;
      width: 40%;
      padding: 22px 30px;
      .i-tit1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .i-txt1 {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #1e1f33;
        }
        .i-txt2 {
          font-size: 18px;
          font-weight: 300;
          color: #ffb300;
        }
      }
      .i-tit2 {
        position: relative;
        margin-top: 20px;
        display: flex;
        align-items: center;
        .i-pic1 {
          width: 120px;
          height: 120px;
        }
        .i-right {
          margin-left: 20px;
          .ir-txt1 {
            line-height: 22px;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #1e1f33;
          }
          .ir-txt2 {
            font-size: 16px;
            color: #1e1f33;
            margin-top: 20px;
          }
          .ir-txt3 {
            margin-top: 20px;
            font-size: 22px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #e61717;
          }
        }
      }
      .i3-btn11 {
        top: 16px;
        right: 10px;
        position: absolute;
        cursor: pointer;
        width: 100px;
        height: 40px;
        background: #969699;
        border-radius: 24px;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
      }
      .i3-btn11.xpj {
        background: #000000;
      }
      .shouhou {
        position: absolute;
        right: 46px;
        margin-top: 10px;
        cursor: pointer;
        text-align: center;
        // background: #000000;
        font-size: 14px;
        color: #1e1f33;
        line-height: 40px;
      }
      .i-tit3 {
        margin-top: 22px;
        .i3-txt {
          line-height: 20px;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #969699;
        }
        .i3-btn1 {
          cursor: pointer;
          width: 100%;
          height: 40px;
          background: #969699;
          border-radius: 24px;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          color: #ffffff;
        }
        .i3-btn1.xpj {
          background: #000000;
        }
        .shouhou {
          margin-top: 10px;
          cursor: pointer;
          text-align: center;
          // background: #000000;
          font-size: 14px;
          color: #1e1f33;
          line-height: 40px;
        }
      }
    }
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
.pinlunDia {
  .pinlun-tit1 {
    font-size: 18px;
    font-weight: 700;
    color: #1e1f33;
    text-align: center;
    margin-bottom: 20px;
  }
  .txx {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .sp {
      font-weight: 700;
      font-size: 14px;
      margin-right: 14px;
    }
  }
  .imgs {
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
    /deep/ .el-image {
      border: 1px solid #ccc;
      margin-right: 10px;
      cursor: pointer;
    }
    /deep/ .image-slot {
      margin-top: 40px;
      text-align: center;
    }
  }
  .pinlun-btn {
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