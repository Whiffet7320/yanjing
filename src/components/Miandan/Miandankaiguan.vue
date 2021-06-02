<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">免单开关按钮</div>
    </div>
    <div class="myForm">
      <el-form :model="ruleForm" class="demo-form-inline">
        <el-form-item label="免单开关按钮" prop="delivery">
          <el-switch @change="onSwitch" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        delivery: false,
      },
      switchVal: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.billagreementstatusview();
      console.log(res.status);
      this.switchVal = res.status;
      this.switchVal == 0
        ? (this.ruleForm.delivery = false)
        : (this.ruleForm.delivery = true);
    },
    async onSwitch(val) {
      console.log(val);
      val ? (this.switchVal = 1) : (this.switchVal = 0);
      console.log(this.switchVal);
      const res = await this.$api.billagreementsetstatus(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.switchVal
      );
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  width: 100%;
  height: 80px;
  opacity: 1;
  background: #ffffff;
  .tit1 {
    opacity: 1;
    font-size: 30px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 80px;
    margin-left: 40px;
    color: #ebbfcc;
  }
}
.myForm {
  margin-top: 30px;
  margin-left: 30px;
}
</style>