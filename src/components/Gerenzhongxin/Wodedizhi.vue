<template>
  <div class="index">
    <div class="tit1">我的地址</div>
    <div class="nav1">
      <el-row :gutter="30" style="margin-right: 0px">
        <el-col :span="16">
          <div class="items">
            <div class="item" v-for="item in dizhiList" :key="item.id">
              <div class="i-txt1">
                <div class="it-left">{{item.is_default == 1 ? '默认送货地址' : ''}}</div>
                <div class="it-right">
                  <span @click="editAddress(item)">编辑</span>
                  <span @click="delAddress(item)" class="sp">删除</span>
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
        </el-col>
        <el-col :span="6">
          <div class="rright" @click="addAddress">
            <div class="r-tit1">
              <i class="el-icon-plus"></i>
            </div>
            <div class="r-txt1">添加地址</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加/编辑 -->
    <el-dialog :visible.sync="dialogVisible" width="740px" :before-close="handleClose">
      <div class="dia">
        <div class="txt1">添加/编辑地址</div>
        <div class="dia-form">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="姓">
                  <el-input v-model="form.real_name_first"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名">
                  <el-input v-model="form.real_name_second"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="国家">
                  <el-select v-model="form.province_id" filterable placeholder="请选择">
                    <el-option
                      v-for="item in countryList"
                      :key="item.id"
                      :label="`${item.country_pos}-${item.country_name}`"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城市">
                  <el-input v-model="form.city"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="form.detail"></el-input>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="邮编/邮政">
                  <el-input v-model="form.post_code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地区">
                  <el-input v-model="form.district"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="电话">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-checkbox
                  style="margin-left:60px;margin-top:10px"
                  v-model="form.is_default"
                >设为默认地址</el-checkbox>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btns">
          <div @click="dialogVisible = false" class="b-btn1">取消</div>
          <div @click="onSubmit" class="b-btn">保存</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        real_name_first: "",
        real_name_second: "",
        province_id: "",
        city: "",
        detail: "",
        post_code: "",
        district: "",
        phone: "",
        province: "",
        is_default: false
      },
      countryList: [],
      dizhiList: [],
      isAdd: true,
      id: ""
    };
  },
  created() {
    // console.log(this.asideVal);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.country_list();
      this.countryList = res.data;
      const res2 = await this.$api.address_list();
      this.dizhiList = res2.data.data;
    },
    editAddress(item) {
      console.log(item);
      this.id = item.id;
      this.isAdd = false;
      this.form = { ...item, is_default: item.is_default == 1 ? true : false };
      this.dialogVisible = true;
    },
    addAddress() {
      this.isAdd = true;
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.dialogVisible = true;
    },
    async delAddress(item) {
      const res = await this.$api.del_address({ id: item.id });
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
    },
    async onSubmit() {
      delete this.form.add_time;
      delete this.form.delete_time;
      delete this.form.latitude;
      delete this.form.longitude;
      if (this.isAdd) {
        const res = await this.$api.save_address({
          ...this.form,
          is_default: this.form.is_default ? "1" : "0"
        });
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
        const res = await this.$api.save_address({
          ...this.form,
          is_default: this.form.is_default ? "1" : "0",
          id: this.id
        });
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