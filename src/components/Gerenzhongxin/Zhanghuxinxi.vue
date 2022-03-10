<template>
  <div class="index">
    <div class="tit1">编辑账户信息</div>
    <div class="tit2">账户信息</div>
    <div class="nav1">
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: ""
      }
    };
  },
  created() {
    // console.log(this.asideVal);
  },
  methods: {
    onSubmit() {
      console.log(this.form);
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
.tit2 {
  margin-top: 40px;
  font-size: 26px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  color: #1e1f33;
}
.nav1 {
  margin-top: 40px;
}
</style>