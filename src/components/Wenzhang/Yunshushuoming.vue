<template>
  <div class="index">
    <div class="nav1">运输说明</div>
    <div class="nav2">为了尽可能缩短您的等待时间，我们建议您选择商务快递。</div>
    <div class="nav3">国家/地区</div>
    <div class="nav4">
      <el-select v-model="value" placeholder="请选择">
        <el-option label="item.label" value="item.value"></el-option>
      </el-select>
    </div>
    <div class="nav5">
      <vxe-table border align="center" :data="tableData">
        <vxe-column field="t1" title="邮寄方式"></vxe-column>
        <vxe-column field="t2" title="预计交货"></vxe-column>
        <vxe-column field="t3" title="运输费用"></vxe-column>
      </vxe-table>
    </div>
    <div class="nav6">注意：</div>
    <div class="nav7">1. 邮政信箱和 APO/FPO 地址不提供快递服务。</div>
    <div class="nav7">2. 以下国家/地区暂不发货：</div>
    <div class="nav7">欧洲：俄罗斯、克里米亚</div>
    <div class="nav7">亚洲：伊朗、叙利亚、朝鲜、乌兹别克斯坦、印度、香港、台湾</div>
    <div class="nav7">非洲：苏丹</div>
    <div class="nav7">南美：法属圭亚那、古巴、委内瑞拉</div>
    <div class="nav7">3. 补充运费可能适用于超过二十 (20) 双的货件。</div>
    <div class="nav7">4. 我们将尽最大努力尽快交付您的包裹。但是，由于地址无效和清关问题或 COVID-19 等不可抗力等问题，可能需要额外的时间。</div>
    <div class="nav6">免费运费标准：</div>
    <div class="nav7">1.满 69.00 美元免运费（US/CA/UK/FR/DE/NL/ES/IE/SG/AU/NZ/CH/SE/FI）</div>
    <div class="nav7">2.仅限标准运费。</div>
    <div class="nav7">3.自动申请，无需优惠码。</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      tableData: [
        {
          t1: "标准运输",
          t2: "14-21天",
          t3: "￥6.95"
        },
        {
          t1: "高级运输",
          t2: "10-14天",
          t3: "￥18.95"
        },
        {
          t1: "商务快递",
          t2: "10-14天",
          t3: "￥156.00"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 1300px;
  padding: 60px;
  margin: 0 auto;
  background: #fafafa;
}
.nav1 {
  margin-top: 30px;
  font-size: 48px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: center;
  color: #1e1f33;
}
.nav2 {
  margin-top: 100px;
  font-size: 20px;
  font-family: Segoe UI, Segoe UI-Bold;
  color: #333334;
}
.nav3 {
  margin-top: 40px;
  font-size: 20px;
  font-family: Segoe UI, Segoe UI-Regular;
  font-weight: 400;
  color: #4b4b4d;
}
.nav4 {
  margin-top: 20px;
}
.nav5 {
  margin-top: 40px;
}
.nav6 {
  margin-top: 60px;
  font-size: 24px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  color: #1e1f33;
  margin-bottom: 38px;
}
.nav7 {
  margin-bottom: 6px;
  font-size: 20px;
  font-family: Segoe UI, Segoe UI-Regular;
  font-weight: 300;
  color: #707070;
}
</style>