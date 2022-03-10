<template>
  <div class="index">
    <div class="nav1">
      <el-row :gutter='20'>
        <el-col :span="10">
          <div class="n1-l">
            <div class="tit1">跟踪订单</div>
            <div
              class="tit2"
            >我们将尽最大努力尽快交付您的包裹。但是，犹豫地址无效 和清关问题或不可抗力（例如COVID-19）等问题，可能需要 更多时间。感谢您的支持和理解。</div>
            <div class="tit3">
              <el-radio-group v-model="rad1">
                <el-radio-button label="email">邮箱</el-radio-button>
                <el-radio-button label="phone">追踪号码</el-radio-button>
              </el-radio-group>
            </div>
            <div class="tit4">
              <el-input v-model="input1" placeholder="请输入内容"></el-input>
              <div class="tijiaoBtn">提交</div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="n1-r">
            <div class="tit1">运送时间和运送费用</div>
            <div class="tit2">
              <vxe-table
                border
                :row-config="{isHover: true}"
                :data="tableData"
                :merge-cells="mergeCells"
                align='center'
              >
                <vxe-column field="qy" title="区域"></vxe-column>
                <vxe-column field="jf1" title="标准 预计交付"></vxe-column>
                <vxe-column field="jf2" title="提前 预计交付"></vxe-column>
                <vxe-column field="jf3" title="提前 预计交付"></vxe-column>
              </vxe-table>
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
      rad1: "",
      input1: "",
      tableData: [
        {
          qy: "我们",
          jf1: "14-21天",
          jf2: "10-14天",
          jf3: "10-14天"
        },
        {
          qy: "亚洲",
          jf1: "18-24天",
          jf2: "无法使用",
          jf3: "10-14天"
        },
        {
          qy: "欧洲",
          jf1: "21-30天",
          jf2: "无法使用",
          jf3: "7-14天"
        },
        {
          qy: "其他",
          jf1: "请在运输和跟踪上搜索"
        }
      ],
      mergeCells: [
        { row: 3, col: 1, rowspan: 1, colspan: 3 },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.index {
    padding: 0 40px 40px 40px;
    background: #fafafa;
}
.n1-l {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tit1 {
    margin-top: 40px;
    font-size: 40px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    color: #000000;
  }
  .tit2 {
    margin-top: 36px;
    width: 422px;
    font-size: 16px;
    font-family: Segoe UI, Segoe UI-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
  }
  .tit3 {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    /deep/ .el-radio-button:first-child .el-radio-button__inner {
      border-radius: 0;
      margin-right: 100px;
    }
    /deep/ .el-radio-button:last-child .el-radio-button__inner {
      border: 1px solid #dcdfe6;
      border-radius: 0;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      box-shadow: 0 0 0 0;
    }
  }
  .tit4 {
    margin-top: 40px;
    display: flex;
    align-items: center;
    .tijiaoBtn {
      cursor: pointer;
      width: 100px;
      height: 40px;
      background: #000000;
      font-size: 14px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 400;
      text-align: center;
      line-height: 40px;
      color: #ffffff;
    }
  }
}
.n1-r {
  .tit1 {
    margin-top: 40px;
    font-size: 28px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    text-align: center;
    color: #000000;
  }
  .tit2 {
    margin-top: 24px;
  }
}
</style>