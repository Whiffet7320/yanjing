<template>
  <div class="index">
    <div class="tit1">视力资料</div>
    <div class="nav1">
      <el-row :gutter="30" style="margin-right: 0px">
        <el-col :span="16">
          <div class="items">
            <div class="item" v-for="item in shiliList" :key="item.id">
              <div class="i-txt1">
                <div class="it-left">1.我的视力 添加时间：{{item.add_time}}</div>
                <div class="it-right">
                  <span @click="toEdit(item)">编辑</span>
                  <span class="sp">删除</span>
                </div>
              </div>
              <div class="i-table">
                <vxe-table
                  align="center"
                  border
                  resizable
                  :cell-class-name="cellClassName"
                  :merge-cells="item.mergeCells"
                  :data="item.tableData"
                >
                  <vxe-column field="yanjing" title></vxe-column>
                  <vxe-column field="shili" title="视力"></vxe-column>
                  <vxe-column field="sanguang" title="散光"></vxe-column>
                  <vxe-column field="fangxiang" title="散光方向"></vxe-column>
                  <vxe-column field="jiaguang" title="加光"></vxe-column>
                </vxe-table>
                <vxe-table
                  align="center"
                  border
                  resizable
                  :cell-class-name="cellClassName"
                  :merge-cells="mergeCells"
                  :data="item.tableData2"
                >
                  <vxe-column field="yanjing" title></vxe-column>
                  <vxe-column field="chuizhi" title="垂直"></vxe-column>
                  <vxe-column field="fangxiangC" title="方向"></vxe-column>
                  <vxe-column field="shuiping" title="水平"></vxe-column>
                  <vxe-column field="fangxiangS" title="方向"></vxe-column>
                </vxe-table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="rright" @click="addShili">
            <div class="r-tit1">
              <i class="el-icon-plus"></i>
            </div>
            <div class="r-txt1">添加资料</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加/编辑 -->
    <el-dialog :visible.sync="dialogVisible" width="740px" :before-close="handleClose">
      <div class="dia">
        <div class="txt1">输入你的信息</div>
        <div class="box">
          <el-row :gutter="20">
            <div class="row1">
              <el-col :span="3" style="height:1px"></el-col>
              <el-col :span="7" style="text-align:center;line-height: 60px;">视力</el-col>
              <el-col :span="7" style="text-align:center;line-height: 60px;">散光</el-col>
              <el-col :span="7" style="text-align:center;line-height: 60px;">散光方向</el-col>
            </div>
            <div class="row1">
              <el-col :span="3" style="text-align:center;line-height: 60px;">右眼</el-col>
              <el-col :span="7">
                <el-select v-model="leftSL" placeholder="0.00">
                  <el-option
                    v-for="(item,i) in 129"
                    :key="`${i}leftSPH`"
                    :label="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                    :value="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="leftCYL" placeholder="0.00">
                  <el-option
                    v-for="(item,i) in 49"
                    :key="`${i}leftCYL`"
                    :label="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                    :value="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select :disabled="leftCYL == ''" v-model="leftAxis" placeholder="0.00">
                  <el-option v-for="(item,i) in 181" :key="`${i}leftAxis`" :label="i" :value="i"></el-option>
                </el-select>
              </el-col>
            </div>
            <div class="row1">
              <el-col :span="3" style="text-align:center;line-height: 60px;">左眼</el-col>
              <el-col :span="7">
                <el-select v-model="rightSL" placeholder="0.00">
                  <el-option
                    v-for="(item,i) in 129"
                    :key="`${i}rightSPH`"
                    :label="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                    :value="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="rightCYL" placeholder="0.00">
                  <el-option
                    v-for="(item,i) in 49"
                    :key="`${i}rightCYL`"
                    :label="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                    :value="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select :disabled="rightCYL == ''" v-model="rightAxis" placeholder="0.00">
                  <el-option v-for="(item,i) in 181" :key="`${i}rightAxis`" :label="i" :value="i"></el-option>
                </el-select>
              </el-col>
            </div>
            <div class="row1">
              <el-col :span="3" style="text-align:center;line-height: 60px;">瞳距</el-col>
              <el-col :span="7">
                <el-radio-group @change="tongjuChange" v-model="tongjuRad1">
                  <el-radio label="1">一个瞳距</el-radio>
                  <el-radio label="2">两个瞳距</el-radio>
                </el-radio-group>
              </el-col>

              <el-col :span="7">
                <el-select v-if="tongjuRad1=='1'" v-model="tongjuVal" placeholder="请选择瞳距">
                  <el-option v-for="(item,i) in 43" :key="`${i}1`" :label="i+37" :value="i+37"></el-option>
                </el-select>
                <el-select v-if="tongjuRad1=='2'" v-model="tongjuValLeft" placeholder="请选择瞳距(左)">
                  <el-option
                    v-for="(item,i) in 45"
                    :key="`${i}left`"
                    :label="(i+36)/2"
                    :value="(i+36)/2"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-if="tongjuRad1=='2'" v-model="tongjuValRight" placeholder="请选择瞳距(右)">
                  <el-option
                    v-for="(item,i) in 45"
                    :key="`${i}right`"
                    :label="(i+36)/2"
                    :value="(i+36)/2"
                  ></el-option>
                </el-select>
              </el-col>
            </div>
            <div class="b-txt1">
              <el-checkbox v-model="checked">增加棱镜值</el-checkbox>
            </div>
            <template v-if="checked">
              <div class="row1">
                <el-col :span="3" style="height:1px"></el-col>
                <el-col :span="5" style="text-align:center;line-height: 60px;">垂直</el-col>
                <el-col :span="5" style="text-align:center;line-height: 60px;">方向</el-col>
                <el-col :span="5" style="text-align:center;line-height: 60px;">水平</el-col>
                <el-col :span="5" style="text-align:center;line-height: 60px;">方向</el-col>
              </div>
              <div class="row1">
                <el-col :span="3" style="text-align:center;line-height: 60px;">右眼</el-col>
                <el-col :span="5">
                  <el-select v-model="rightODcz" placeholder="0.00">
                    <el-option
                      v-for="(item,i) in 50"
                      :key="`${i}rightSPH`"
                      :label="(i/4).toFixed(2)"
                      :value="(i/4).toFixed(2)"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="rightCZFX" placeholder="请选择">
                    <el-option label="里" value="1"></el-option>
                    <el-option label="外" value="2"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="rightODsp" placeholder="0.00">
                    <el-option
                      v-for="(item,i) in 50"
                      :key="`${i}rightSPH`"
                      :label="(i/4).toFixed(2)"
                      :value="(i/4).toFixed(2)"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="rightSPFX" placeholder="请选择">
                    <el-option label="里" value="1"></el-option>
                    <el-option label="外" value="2"></el-option>
                  </el-select>
                </el-col>
              </div>
              <div class="row1">
                <el-col :span="3" style="text-align:center;line-height: 60px;">右眼</el-col>
                <el-col :span="5">
                  <el-select v-model="leftODcz" placeholder="0.00">
                    <el-option
                      v-for="(item,i) in 50"
                      :key="`${i}leftSPH`"
                      :label="(i/4).toFixed(2)"
                      :value="(i/4).toFixed(2)"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="leftCZFX" placeholder="请选择">
                    <el-option label="里" value="1"></el-option>
                    <el-option label="外" value="2"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="leftODsp" placeholder="0.00">
                    <el-option
                      v-for="(item,i) in 50"
                      :key="`${i}leftSPH`"
                      :label="(i/4).toFixed(2)"
                      :value="(i/4).toFixed(2)"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="leftSPFX" placeholder="请选择">
                    <el-option label="里" value="1"></el-option>
                    <el-option label="外" value="2"></el-option>
                  </el-select>
                </el-col>
              </div>
            </template>
          </el-row>
        </div>
        <div @click="onSubmit" class="b-btn">保存</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdd: true,
      id: "",
      shiliList: [],
      dialogVisible: false,
      leftSL: "",
      rightSL: "",
      leftCYL: "",
      rightCYL: "",
      leftAxis: "",
      rightAxis: "",
      tongjuRad1: "1",
      tongjuVal: "",
      tongjuValLeft: "",
      tongjuValRight: "",
      checked: false,
      rightCZFX: "",
      rightSPFX: "",
      rightODcz: "",
      rightODsp: "",
      leftCZFX: "",
      leftSPFX: "",
      leftODcz: "",
      leftODsp: "",
      tableData: [
        {
          yanjing: "右眼",
          shili: "0.00",
          sanguang: "0.00",
          fangxiang: "0.00",
          jiaguang: "0.00"
        },
        {
          yanjing: "左眼",
          shili: "0.00",
          sanguang: "0.00",
          fangxiang: "0.00",
          jiaguang: "0.00"
        },
        {
          yanjing: "瞳距",
          shili: "63",
          sanguang: "0.00",
          fangxiang: "0.00",
          jiaguang: "0.00"
        }
      ],
      tableData2: [
        {
          yanjing: "右眼",
          chuizhi: "1.25",
          fangxiangC: "里",
          shuiping: "0.25",
          fangxiangS: "里"
        },
        {
          yanjing: "左眼",
          chuizhi: "0.75",
          fangxiangC: "外",
          shuiping: "0.50",
          fangxiangS: "里"
        }
      ],
      mergeCells: [{ row: 2, col: 1, rowspan: 1, colspan: 4 }]
    };
  },
  created() {
    // console.log(this.asideVal);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.dushu_list({
        limit: 100,
        page: 1
      });
      console.log(res);
      this.shiliList = res.data;
      this.shiliList.forEach(ele => {
        var number;
        if (ele.one_number != 0) {
          number = `${ele.one_number}`;
        } else {
          number = `右：${ele.two_number_left} , 左：${ele.two_number_right}`;
        }
        ele.mergeCells = [{ row: 2, col: 1, rowspan: 1, colspan: 4 }];
        ele.tableData = [
          {
            yanjing: "右眼",
            shili: ele.zuo_sph,
            sanguang: ele.zuo_cyl,
            fangxiang: ele.zuo_axis,
            jiaguang: "0.00"
          },
          {
            yanjing: "左眼",
            shili: ele.you_sph,
            sanguang: ele.you_cyl,
            fangxiang: ele.you_axis,
            jiaguang: "0.00"
          },
          {
            yanjing: "瞳距",
            shili: number,
            sanguang: "0.00",
            fangxiang: "0.00",
            jiaguang: "0.00"
          }
        ];
      });
    },
    async onSubmit() {
      // console.log()
      if (this.isAdd) {
        const res = await this.$api.dushu_save({
          zuo_sph: this.leftSL,
          zuo_cyl: this.leftCYL,
          zuo_axis: this.leftAxis,
          you_sph: this.rightSL,
          you_cyl: this.rightCYL,
          you_axis: this.rightAxis,
          one_number: this.tongjuVal,
          two_number_left: this.tongjuValLeft,
          two_number_right: this.tongjuValRight
        });
        console.log(res.data);
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      } else {
        const res = await this.$api.dushu_save({
          zuo_sph: this.leftSL,
          zuo_cyl: this.leftCYL,
          zuo_axis: this.leftAxis,
          you_sph: this.rightSL,
          you_cyl: this.rightCYL,
          you_axis: this.rightAxis,
          one_number: this.tongjuVal,
          two_number_left: this.tongjuValLeft,
          two_number_right: this.tongjuValRight,
          id:this.id
        });
        console.log(res.data);
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      }
    },
    toEdit(item) {
      this.id = item.id;
      this.isAdd = false;
      this.leftSL = item.zuo_sph;
      this.leftCYL = item.zuo_cyl;
      this.leftAxis = item.zuo_axis;
      this.rightSL = item.you_sph;
      this.rightCYL = item.you_cyl;
      this.rightAxis = item.you_axis;
      this.tongjuVal = item.one_number;
      this.tongjuValLeft = item.two_number_left;
      this.tongjuValRight = item.two_number_right;
      this.dialogVisible = true;
      if(item.one_number != 0){
        this.tongjuRad1 = '1';
      }else{
        this.tongjuRad1 = '2';
      }
    },
    addShili() {
      this.isAdd = true;
      this.leftSL = "";
      this.leftCYL = "";
      this.leftAxis = "";
      this.rightSL = "";
      this.rightCYL = "";
      this.rightAxis = "";
      this.tongjuVal = "";
      this.tongjuValLeft = "";
      this.tongjuValRight = "";
      this.dialogVisible = true;
      this.tongjuRad1 = '1';
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
    handleClose() {
      this.dialogVisible = false;
    },
    cellClassName({ column }) {
      if (column.property == "yanjing") {
        return "col-active";
      }
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
  margin-top: 30px;
  box-sizing: border-box;
  .items {
    .item {
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
    }
  }
  .rright {
    cursor: pointer;
    height: 340px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .r-tit1 {
      margin-top: 50px;
      width: 140px;
      height: 140px;
      background: #ffffff;
      border: 2px dashed #2626ff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 40px;
        color: #2626ff;
        font-weight: 700;
      }
    }
    .r-txt1 {
      margin-top: 60px;
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      color: #1e1f33;
    }
  }
}
/deep/ .vxe-body--column.col-active {
  background-color: #fafafa;
  font-weight: 700;
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
  .box {
    padding: 4px 40px 22px 40px;
    border: 1px solid #1e1f33;
    .row1 {
      height: 60px;
      font-weight: 400px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    .b-txt1 {
      margin-top: 10px;
      margin-left: 22px;
    }
  }
  .b-btn {
    cursor: pointer;
    margin-top: 40px;
    margin-left: 400px;
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