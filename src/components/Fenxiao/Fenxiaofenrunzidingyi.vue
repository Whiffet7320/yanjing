<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">分销分润自定义</div>
    </div>
    <div class="myForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="一级消费总额">
              <el-input v-model="form.money1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="分润百分比">
              <el-input v-model="form.percentage1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="二级消费总额">
              <el-input v-model="form.money2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="分润百分比">
              <el-input v-model="form.percentage2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="三级消费总额">
              <el-input v-model="form.money3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="分润百分比">
              <el-input v-model="form.percentage3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="四级消费总额">
              <el-input v-model="form.money4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="分润百分比">
              <el-input v-model="form.percentage4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="五级消费总额">
              <el-input v-model="form.money5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="分润百分比">
              <el-input v-model="form.percentage5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.otherMoney_and_level();
      console.log(res);
      res.data.forEach((ele, i) => {
        this.$set(this.form, `money${i + 1}`, ele.money);
        this.$set(this.form, `percentage${i + 1}`, ele.percentage);
      });
      console.log(this.form);
    },
    async onSubmit() {
      for (const key in this.form) {
        console.log(key);
        var tag = null;
        if (key == "money1") {
          tag = "first_level_money";
        } else if (key == "money2") {
          tag = "second_level_money";
        } else if (key == "money3") {
          tag = "third_level_money";
        } else if (key == "money4") {
          tag = "four_level_money";
        } else if (key == "money5") {
          tag = "five_level_money";
        } else if (key == "percentage1") {
          tag = "first_level_percentage";
        } else if (key == "percentage2") {
          tag = "second_level_percentage";
        } else if (key == "percentage3") {
          tag = "third_level_percentage";
        } else if (key == "percentage4") {
          tag = "four_level_percentage";
        } else if (key == "percentage5") {
          tag = "five_level_percentage";
        }
        await this.$api.otherWeb_config_edit(tag, "", this.form[key]);
      }
      this.$message({
        message: '保存成功',
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav1 {
  width: 100%;
  height: 80px;
  opacity: 1;
  background: #ffffff;
  .tit1 {
    opacity: 1;
    font-size: 25px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #2f313d;
    line-height: 80px;
    margin-left: 44px;
  }
}
.myForm {
  margin-top: 30px;
}
/deep/ .el-form-item {
  display: flex;
}
/deep/ .el-form-item__label {
  width: 100px !important;
}
/deep/ .el-form-item__content {
  width: 70%;
  margin-left: 10px !important;
}
</style>