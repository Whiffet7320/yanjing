<template>
  <div class="index">
    <!-- <div class="nav2">
      <div class="tit1">当前位置：首页-礼品商城</div>
    </div> -->
    <div class="nav3">
      <div class="tit1">当前位置：首页-礼品商城</div>
      <el-form class="form" ref="form" :model="form" label-width="120px">
        <el-form-item label="分类筛选：">
          <el-radio-group v-model="form.fenlei" size="small">
            <el-radio-button
              v-for="item in dataObj.goods_classify"
              :key="item.id"
              :label="item.name"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="仓储：">
          <el-radio-group
            @change="changeVal1"
            v-model="form.cangchu"
            size="small"
          >
            <el-radio-button
              v-for="item in dataObj.yun_cang"
              :key="item.id"
              :label="item.logi_name"
              :value="item.id"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面单：">
          <el-radio-group v-model="form.miandan" size="small">
            <el-radio-button
              v-for="item in dataObj.kd_data"
              :key="item.id"
              :label="item.name"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序：">
          <div class="btnItem">
            <div class="bt1" @click="jiagezuidi">
              <div :class="{ txt: true, active: form.jiage == 1 }">
                价格最低
              </div>
            </div>
            <div class="bt1" @click="fabu">
              <div :class="{ txt: true, active: form.fabu == 1 }">最新发布</div>
            </div>
            <div class="bt1" @click="paixu">
              <div :class="{ txt: true, active: form.morenpaixu == 1 }">
                默认排序
              </div>
            </div>
            <div class="bt1" @click="xiaoliang">
              <div :class="{ txt: true, active: form.xiaoliang == 1 }">
                销量最高
              </div>
            </div>
            <div class="bt1" @click="zhongliang">
              <div :class="{ txt: true, active: form.zhongliang == 1 }">
                重量最重
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="items">
      <div class="item" v-for="item in tableData1" :key="item.id">
        <img class="pic1" :src="item.image_id" alt="" />
        <div class="tit1">{{ item.name }}</div>
        <div class="tit2">
          <div class="tit2-1">¥{{ item.price }}</div>
          <div class="tit2-2">{{ item.weight }}kg/{{ item.unit }}</div>
        </div>
        <!-- <div class="tit3">库存：{{ item.stock }}件</div> -->
        <div class="tit4" @click="goumai(item)">
          <!-- <img class="pic" src="../../assets/newImg/lujin136.png" alt="" /> -->
          <div class="txt">立即购买</div>
        </div>
      </div>
    </div>
    <div class="nav4">
      <div class="tit">相符商品共{{ total }}件</div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="this.lipingshangchengPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </div>
    <!-- 立即购买 -->
    <el-dialog
      title="立即购买"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="1200px"
    >
      <div class="flex">
        <div class="left">
          <div class="nav1">
            <div class="search">
              <el-input
                placeholder="请输入内容"
                v-model="searchVal"
                class="input-with-select"
              >
                <el-button
                  @click="mySearchData"
                  slot="append"
                  class="searchBtn"
                  icon="el-icon-search"
                  >搜索</el-button
                >
              </el-input>
            </div>
            <div class="search2">商城产品</div>
          </div>
          <div class="nav33">
            <el-form class="form" ref="form" :model="form" label-width="120px">
              <el-form-item label="分类筛选：">
                <el-radio-group v-model="form.fenlei" size="small">
                  <el-radio-button
                    v-for="item in dataObj.goods_classify"
                    :key="item.id"
                    :label="item.name"
                  ></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="仓储：">
                <el-radio-group
                  @change="changeVal1"
                  v-model="form.cangchu"
                  size="small"
                >
                  <el-radio-button
                    v-for="item in dataObj.yun_cang"
                    :key="item.id"
                    :label="item.logi_name"
                  ></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="面单：">
                <el-radio-group
                  @change="changeVal2"
                  v-model="form.miandan"
                  size="small"
                >
                  <el-radio-button
                    v-for="item in dataObj.kd_data"
                    :key="item.id"
                    :label="item.name"
                  ></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="排序：">
                <div class="btnItem">
                  <div class="bt1" @click="jiagezuidi">
                    <div :class="{ txt: true, active: form.jiage == 1 }">
                      价格最低
                    </div>
                  </div>
                  <div class="bt1" @click="fabu">
                    <div :class="{ txt: true, active: form.fabu == 1 }">
                      最新发布
                    </div>
                  </div>
                  <div class="bt1" @click="paixu">
                    <div :class="{ txt: true, active: form.morenpaixu == 1 }">
                      默认排序
                    </div>
                  </div>
                  <div class="bt1" @click="xiaoliang">
                    <div :class="{ txt: true, active: form.xiaoliang == 1 }">
                      销量最高
                    </div>
                  </div>
                  <div class="bt1" @click="zhongliang">
                    <div :class="{ txt: true, active: form.zhongliang == 1 }">
                      重量最重
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="items">
            <div class="item" v-for="item in tableData2" :key="item.id">
              <img class="pic1" :src="item.image_id" alt="" />
              <div class="tit1">{{ item.name }}</div>
              <div class="tit2">
                <div class="tit2-1">¥{{ item.price }}</div>
                <div class="tit2-2">{{ item.weight }}kg/{{ item.unit }}</div>
              </div>
              <div class="tit3">库存：{{ item.stock }}件</div>
              <div class="tit4" @click="goumai">
                <img
                  class="pic"
                  src="../../assets/newImg/lujin136.png"
                  alt=""
                />
                <div @click="addShop(item)" class="txt">立即购买</div>
              </div>
            </div>
          </div> -->
          <div class="items">
            <div class="item" v-for="item in tableData1" :key="item.id">
              <img class="pic1" :src="item.image_id" alt="" />
              <div class="tit1">{{ item.name }}</div>
              <div class="tit2">
                <div class="tit2-1">¥{{ item.price }}</div>
                <div class="tit2-2">{{ item.weight }}kg/{{ item.unit }}</div>
              </div>
              <!-- <div class="tit3">库存：{{ item.stock }}件</div> -->
              <div class="tit4" @click="addShop(item)">
                <!-- <img class="pic" src="../../assets/newImg/lujin136.png" alt="" /> -->
                <div class="txt">立即购买</div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="nav4">
            <div class="tit">相符商品共{{ total }}件</div>
            <el-pagination
              @current-change="ljgmhandleCurrentChange"
              :current-page="this.ljgmlipingshangchengPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination>
          </div>
        </div>
        <div class="right">
          <vxe-table
            :merge-cells="colspanMethod"
            align="left"
            :data="tableData3"
          >
            <vxe-table-column :field="null" width="120" title="商品">
              <template #default="{ row }">
                <div class="formNav1">
                  <div class="nav1-1" :title="row.name">
                    {{ row.name }}
                  </div>
                  <img class="nav1-2" :src="row.image_id" alt="" />
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column :field="null" width="110" title="数量/重量">
              <template #default="{ row }">
                <div class="formNav2">
                  <div class="nav2-1">
                    <img
                      @click="jianS"
                      class="icon"
                      src="../../assets/newImg/zu279.png"
                      alt=""
                    />
                    <div class="tit">{{ addShopNum }}</div>
                    <img
                      @click="jiaS"
                      class="icon"
                      src="../../assets/newImg/zu278.png"
                      alt=""
                    />
                  </div>
                  <div class="nav2-2">{{ row.weight }}kg/{{ row.unit }}</div>
                  <div class="nav2-3">{{ row.stock }}库存</div>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column :field="null" title="价格">
              <template #default="{ row }">
                <div class="formNav3">¥{{ Number(row.price * addShopNum).toFixed(2) }}</div>
              </template>
            </vxe-table-column>
            <vxe-table-column :field="null" title="操作">
              <template>
                <div class="pos">
                  <div class="formNav4" @click="delShop">
                    <img
                      class="icon"
                      src="../../assets/newImg/lujin244.png"
                      alt=""
                    />
                    <div class="nav4-1">删除</div>
                  </div>
                </div>
              </template>
            </vxe-table-column>
            <template #empty>
              <div class="tabEmpty">
                <img class="pic" src="../../assets/newImg/zu261.png" />
                <p class="txt">没有相关内容</p>
              </div>
            </template>
          </vxe-table>
          <div class="rightBox">
            <div class="r-nav1">{{ form.cangchu }}</div>
            <div class="r-nav2">注：下单后每个收件人将收到以上产品</div>
            <div class="r-nav3">
              <div class="nav1">
                <div class="txt1">商品价格</div>
                <div v-if="!tableData3[0]" class="txt2">¥0.00</div>
                <div v-else class="txt2">
                  ¥{{ Number(tableData3[0].price * addShopNum).toFixed(2) }}
                </div>
              </div>
              <div v-if="tableData3[0]">
                <div class="nav1">
                  <div class="txt1">快递运费</div>
                  <div class="txt2">¥{{ kdyunfei }}</div>
                </div>
                <div class="nav1">
                  <div class="txt1">共计：</div>
                  <div class="txt3">
                    ¥{{ Number(tableData3[0].price * addShopNum + kdyunfei).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="r-nav4">
              <div class="btn1">取消</div>
              <div @click="toLJFH" class="btn2">确定</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["lipingshangchengPage", "ljgmlipingshangchengPage"]),
  },
  watch: {
    lipingshangchengPage: function (page) {
      this.$store.commit("lipingshangchengPage", page);
      this.getData();
    },
    ljgmlipingshangchengPage: function (page) {
      this.$store.commit("ljgmlipingshangchengPage", page);
      this.getData();
    },
    addShopNum: {
      deep: true, //深度监听设置为 true
      handler: function () {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum < 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
          }
        }
      },
    },
    tableData3: {
      deep: true, //深度监听设置为 true
      handler: function () {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum < 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
          }
        }
      },
    },
    dataObj: {
      deep: true, //深度监听设置为 true
      handler: function () {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum < 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
          }
        }
      },
    },
  },
  data() {
    return {
      dataObj: {},
      ycId: "",
      flId: "",
      paixu_value: "",
      paixu_order: "asc",
      searchVal: "",
      form: {
        fenlei: "礼品商城",
        cangchu: "华北云仓",
        miandan: "海带宝",
        paixu: "",
        jiage: 0,
        fabu: 0,
        morenpaixu: 0,
        xiaoliang: 0,
        zhongliang: 0,
      },
      form2: {
        fenlei: "礼品商城",
        cangchu: "华北云仓",
        miandan: "海带宝",
        paixu: "",
        jiage: 0,
        fabu: 0,
        morenpaixu: 0,
        xiaoliang: 0,
        zhongliang: 0,
      },
      dialogVisible: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      colspanMethod: [{ rowspan: 3, colspan: 3 }],
      addShopNum: 1,
      kdyunfei: 0,
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getGoods({
        token: sessionStorage.getItem("token"),
        page: this.lipingshangchengPage,
        limit: 20,
        search: this.searchVal,
        yuncang: this.ycId,
        classify: this.flId,
        paixu: 1,
        paixu_value: this.paixu_value,
        paixu_order: this.paixu_order,
      });
      console.log(res);
      if (res.code == 0) {
        this.tableData1 = [];
        this.tableData2 = [];
        this.total = 0;
        this.$message.error(res.msg);
      } else {
        this.tableData1 = res.data.goods_data;
        this.tableData2 = res.data.goods_data;
        this.total = res.data.total;
        this.dataObj = res.data;
        this.ycId = res.data.yun_cang[0].id;
        this.flId = res.data.goods_classify[0].id;
      }
    },
    mySearchData() {
      this.getData();
    },
    async changeVal1(val) {
      var obj = {};
      obj = this.dataObj.yun_cang.find(function (item) {
        return item.logi_name === val;
      });
      // console.log(obj.id); //label值
      const res = await this.$api.switchYc({
        token: sessionStorage.getItem("token"),
        id: obj.id,
      });
      this.ycId = obj.id;
      console.log(res.data);
      this.$set(this.dataObj, "kd_data", res.data.kd_data);
      this.form.miandan = res.data.kd_data[0].name;
      this.$set(this.dataObj, "kd_price", res.data.kd_price);
      this.getData();
    },
    async changeVal2(val) {
      var obj = {};
      obj = this.dataObj.kd_data.find(function (item) {
        return item.name === val;
      });
      // console.log(obj.id); //label值
      const res = await this.$api.kdPrice({
        token: sessionStorage.getItem("token"),
        kd_id: obj.id,
        type: 2,
        yc_id: this.ycId,
      });
      console.log(res.data);
      // this.$set(this.dataObj,'kd_data',res.data.kd_data)
      // this.form.miandan = res.data.kd_data[0].name;
      this.$set(this.dataObj.kd_price, "kg", res.data.kg);
      this.$set(this.dataObj.kd_price, "kg_add", res.data.kg_add);
    },
    jianS() {
      if (this.addShopNum == 1) {
        this.addShopNum == 1;
      } else {
        this.addShopNum--;
      }
    },
    jiaS() {
      this.addShopNum++;
    },
    addShop(item) {
      this.$set(this.tableData3, 0, item);
      console.log(this.tableData3);
    },
    toLJFH() {
      this.$set(this.tableData3[0], "num", this.addShopNum);
      this.$store.commit("shopObj", this.tableData3[0]);
      this.$router.push({ name: "Lijifahuo" });
    },
    delShop() {
      this.tableData3 = [];
    },
    jiagezuidi() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      this.form.xiaoliang = 0;
      this.form.zhongliang = 0;
      if (this.form.jiage == 1) {
        this.form.jiage = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.jiage = 1;
        this.paixu_value = "price";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    fabu() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      this.form.xiaoliang = 0;
      this.form.zhongliang = 0;
      if (this.form.fabu == 1) {
        this.form.fabu = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.fabu = 1;
        this.paixu_value = "ctime";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    xiaoliang() {
      this.form.jiage = 0;
      this.form.xiaoliang = 0;
      this.form.morenpaixu = 0;
      this.form.xiaoliang = 0;
      this.form.zhongliang = 0;
      if (this.form.xiaoliang == 1) {
        this.form.xiaoliang = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.xiaoliang = 1;
        this.paixu_value = "buy_count";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    zhongliang() {
      this.form.jiage = 0;
      this.form.zhongliang = 0;
      this.form.morenpaixu = 0;
      this.form.xiaoliang = 0;
      this.form.zhongliang = 0;
      if (this.form.zhongliang == 1) {
        this.form.zhongliang = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.zhongliang = 1;
        this.paixu_value = "weight";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    paixu() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      this.form.xiaoliang = 0;
      this.form.zhongliang = 0;
      if (this.form.morenpaixu == 1) {
        this.form.morenpaixu = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.morenpaixu = 1;
        this.paixu_value = "id";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    goumai(item) {
      this.$set(this.tableData3, 0, item);
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lipingshangchengPage", val);
    },
    ljgmhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("ljgmlipingshangchengPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  .nav1 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn {
      position: relative;
      width: 278px;
      height: 62px;
      opacity: 1;
      .pic1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 278px;
        height: 62px;
        opacity: 1;
      }
      .pic2 {
        position: absolute;
        top: 19px;
        left: 83px;
        width: 22px;
        height: 23px;
        opacity: 1;
      }
      .tit1 {
        position: absolute;
        top: 0;
        left: 114px;
        line-height: 62px;
        opacity: 1;
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
      }
    }
    .pic3 {
      width: 65px;
      height: 15px;
      opacity: 1;
    }
    .search {
      /deep/ .el-input__inner {
        border: 0px;
        border-radius: 16px;
        box-sizing: content-box;
        box-shadow: inset 0px 0px 10px 2px #dddddd !important;
      }
      /deep/ .el-button {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
      .input-with-select {
        width: 500px;
        .searchBtn {
          background: rgb(234, 142, 17);
          color: #ffffff;
        }
      }
    }
    .search2 {
      width: 120px;
      height: 40px;
      opacity: 1;
      background: #5c5c5c;
      font-size: 14px;
      font-family: zw;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 40px;
    }
  }
  .nav2 {
    display: flex;
    align-items: center;
    margin: 13px 52px;
    .tit1 {
      //   margin-left: 52px;
      opacity: 1;
      font-size: 16px;
      font-family: zw;
      font-weight: 400;
      text-align: left;
      color: #000000;
    }
    .tit2 {
      display: flex;
      margin-left: 372px;
      .item {
        margin-right: 17px;
        opacity: 1;
        font-size: 16px;
        font-family: zw;
        font-weight: 400;
        text-align: left;
        color: #5c5c5c;
      }
    }
  }
  .nav3 {
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    // margin-top: 27px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk16.png");
    background-size: 100% 100%;
    border-radius: 10px;
    // height: 316px;
    opacity: 1;
    padding: 28px 41px;
    .tit1 {
      opacity: 1;
      font-size: 14px;
      font-family: Helvetica, Helvetica-Regular;
      font-weight: 400;
      color: #5c5c5c;
    }
    .form {
      margin-top: 16px;
      padding: 24px 0;
      margin-bottom: 30px;
      background-image: url("../../assets/newImg/kk17.png");
      // height: 194px;
      background-size: 100% 100%;
      /deep/ .el-form-item__label {
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 400;
        color: #707071;
      }
      .btnItem {
        display: flex;
      }
      .bt1 {
        cursor: pointer;
        padding: 0px 6px 0 0;
        display: inline-block;
        display: flex;
        align-items: center;
        .txt {
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          text-align: left;
          color: #707071;
          font-weight: 400;
          margin-right: 3px;
        }
        .txt.active {
          color: #f07a01;
        }
        .pic {
          width: 6px;
          height: 8px;
          opacity: 1;
        }
      }
    }
  }
  .nav4 {
    margin-left: 16px;
    display: flex;
    align-items: center;
    /deep/ .el-pager .active {
      background-color: #f07a01 !important;
    }
  }
  .items {
    padding: 24px;
    // margin-top: 16px;
    // margin-left: 6px;
    background-image: url("../../assets/newImg/kk16.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    /deep/ .el-pager .active {
      background-color: #f07a01 !important;
    }
  }
  .left {
    .items {
      // margin-top: 10px;
      padding: 10px 24px 40px 24px;
      display: flex;
      flex-wrap: wrap;
      //   justify-content: space-between;
      .item {
        background-image: url("../../assets/newImg/kk19.png");
        background-size: 100% 100%;
        margin: 10px 4px 0px 4px;
        width: calc(0.61 * 252px);
        height: calc(0.61 * 361px);
        opacity: 1;
        .pic1 {
          display: block;
          margin: 11px auto 10px auto;
          width: calc(0.61 * 210px);
          height: calc(0.61 * 209px);
          opacity: 1;
        }
        .tit1 {
          margin: 0 22px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #5c5c5c;
        }
        .tit2 {
          margin: 10px 22px 0px 22px;
          // padding-bottom: 20px;
          // border-bottom: 1px solid #e5e5e5;
          font-size: 12px;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          .tit2-1 {
            opacity: 1;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 400;
            color: #f07a01;
          }
          .tit2-2 {
            margin-left: 10px;
            opacity: 1;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #c3c3c3;
          }
        }
        .tit3 {
          padding: 6px 8px;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
          opacity: 1;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #707071;
        }
        .tit4 {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(0.61 * 200px);
          height: calc(0.61 * 36px);
          opacity: 1;
          // background: rgb(246, 247, 250);
          // border-radius: 6px;
          background-image: url("../../assets/newImg/kk20.png");
          background-size: 100% 100%;
          margin: 10px auto;
          // box-shadow: inset 0px 0 8px 2px #ccc !important;
          .pic {
            width: calc(0.61 * 23px);
            height: calc(0.61 * 22px);
            opacity: 1;
          }
          .txt {
            font-size: 12px;
            margin-left: 10px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 500;
            color: #f07a01;
          }
        }
      }
    }
  }
  .items {
    // margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    padding: 50px 95px 80px 35px;
    // justify-content: space-between;
    .item {
      margin: 10px 4px 0px 50px;
      padding-bottom: 6px;
      width: 252px;
      height: 361px;
      opacity: 1;
      background-image: url("../../assets/newImg/kk19.png");
      background-size: 100% 100%;
      // background: #ffffff;
      border-radius: 10px;
      .pic1 {
        display: block;
        margin: 19px auto 17px auto;
        width: 210px;
        height: 209px;
        opacity: 1;
      }
      .tit1 {
        margin: 0 32px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #5c5c5c;
      }
      .tit2 {
        margin: 16px 32px 0px 32px;
        // padding-bottom: 20px;
        // border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        .tit2-1 {
          opacity: 1;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 500;
          color: #f07a01;
        }
        .tit2-2 {
          margin-left: 10px;
          opacity: 1;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #5c5c5c;
        }
      }
      .tit3 {
        padding: 6px 8px;
        border-bottom: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #707071;
      }
      .tit4 {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 36px;
        opacity: 1;
        // background: rgb(246, 247, 250);
        background-image: url("../../assets/newImg/kk20.png");
        background-size: 100% 100%;
        // border-radius: 6px;
        margin: 14px auto;
        .pic {
          width: 23px;
          height: 22px;
          opacity: 1;
        }
        .txt {
          font-size: 14px;
          margin-left: 10px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 500;
          color: #f07a01;
        }
      }
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
    .left {
      width: 700px;
      .nav4 {
        margin-top: 16px;
        margin-left: 6px;
        display: flex;
        align-items: center;
        /deep/ .el-pager .active {
          background-color: #f07a01 !important;
        }
      }
    }
    .right {
      width: 440px;
      .formNav1 {
        margin-left: 6px;
        display: flex;
        flex-direction: column;
        align-content: center;
        .nav1-1 {
          opacity: 1;
          margin-bottom: 6px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nav1-2 {
          width: 90px;
          height: 90px;
          opacity: 1;
        }
      }
      .formNav2 {
        transform: translateY(36px);
        display: flex;
        flex-direction: column;
        .nav2-1 {
          display: flex;
          align-items: center;
          .icon {
            cursor: pointer;
            width: 22px;
            height: 23px;
          }
          .tit {
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #000000;
            margin: 0 8px;
          }
        }
        .nav2-2 {
          opacity: 1;
          margin-top: 18px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #000000;
        }
        .nav2-3 {
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #868686;
        }
      }
      .formNav3 {
        transform: translateY(30px);
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Heavy;
        font-weight: 800;
        text-align: left;
        color: #f07a01;
      }
      .pos {
        position: relative;
      }
      .formNav4 {
        position: absolute;
        top: 38px;
        width: 100%;
        height: 80px;
        border-left: 1px solid #e5e5e5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon {
          // margin-left: 20px;
          width: 19px;
          height: 25px;
          cursor: pointer;
        }
        .nav4-1 {
          cursor: pointer;
          margin-top: 6px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #868686;
        }
      }
      /deep/ .vxe-table--empty-placeholder {
        height: 176px !important;
      }
      .tabEmpty {
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
      .rightBox {
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        .r-nav1 {
          width: 80%;
          margin: 0 auto;
          height: 30px;
          opacity: 1;
          border: 1px solid #f07a01;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: center;
          line-height: 30px;
          color: #f07a01;
        }
        .r-nav2 {
          margin-top: 12px;
          margin-bottom: 24px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: right;
          color: #e64950;
        }
        .r-nav3 {
          width: 100%;
          height: 100px;
          background: #efefef;
          .nav1 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 14px;
            padding: 0 20px;
            .txt1 {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              color: #000000;
            }
            .txt2 {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              color: #f07a01;
            }
            .txt3 {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              color: #f07a01;
            }
          }
        }
        .r-nav4 {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .btn1 {
            cursor: pointer;
            width: 211px;
            height: 34px;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: center;
            color: #000000;
            box-shadow: inset 0px 0 8px 2px #ccc !important;
            line-height: 34px;
          }
          .btn2 {
            cursor: pointer;
            width: 211px;
            height: 34px;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            line-height: 34px;
            background: #5c5c5c;
          }
        }
      }
    }
  }
}
.nav33 {
  // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
  margin-top: 27px;
  background-image: url("../../assets/newImg/kk16.png");
  background-size: 100% 100%;
  // background: #ffffff;
  border-radius: 10px;
  padding: 18px 21px;
  /deep/ .el-radio-button__inner {
    border: 0;
    font-size: 12px;
    border-radius: 0px !important;
  }
  /deep/ .el-radio-button.is-active {
    .el-radio-button__inner {
      background-color: transparent !important;
      border-color: transparent !important;
      color: #f07a01;
      font-weight: 400;
      font-size: 12px;
    }
  }
  /deep/ .el-radio-button__inner {
    background-color: transparent !important;
    border-color: transparent !important;
  }
  /deep/ .el-form-item__label {
    font-weight: 400 !important;
    font-size: 12px !important;
  }
  .form {
    /deep/ .el-form-item__label {
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #707071;
    }
    .btnItem {
      display: flex;
    }
    .bt1 {
      cursor: pointer;
      padding: 0px 6px 0 0;
      display: inline-block;
      display: flex;
      align-items: center;
      .txt {
        font-size: 12px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #707071;
        font-weight: 400;
        margin-right: 3px;
      }
      .txt.active {
        color: #ea8e11;
      }
      .pic {
        width: 6px;
        height: 8px;
        opacity: 1;
      }
    }
  }
}
/deep/ .el-form-item {
  margin: 0;
}
/deep/ .el-radio-button {
  margin-right: 10px !important;
}
/deep/ .el-radio-button.is-active {
  .el-radio-button__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: inset 0px 0 5px 0 #fff !important;
    color: #f07a01;
    font-weight: 400;
    font-size: 14px;
    padding: 0 !important;
  }
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border-left: 0px !important;
}
/deep/ .el-radio-button__inner {
  border: 0;
  font-size: 14px;
  border-radius: 0px !important;
  padding: 0 !important;
}
/deep/ .el-dialog__body {
  background: #f5f7fa;
}
</style>