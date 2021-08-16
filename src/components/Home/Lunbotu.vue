<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">轮播图内容</div>
    </div>
    <div class="lbtForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-form-item label="轮播内容">
            <img
              @click="companyList"
              v-if="form.img != ''"
              :src="form.img"
              class="img_cyy"
            />
            <img
              @click="companyList"
              v-else
              class="img_cyy"
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              alt=""
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="公告栏内容">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapState(["fileList", "fileListImg"]),
  },
  data() {
    return {
      form: {
        img: "",
        content: "",
      },
      imgFile: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // const resp = await this.$api.logincheck(
      //   sessionStorage.getItem("user_name"),
      //   sessionStorage.getItem("user_pass")
      // );
      // if (resp.result == 1) {
      //   sessionStorage.setItem("isLogin", true);
      // } else {
      //   //   console.log(res)
      //   sessionStorage.setItem("token", null);
      //   sessionStorage.setItem("isLogin", null);
      //   this.$router.go(0);
      //   this.$router.push({ path: "/login" });
      // }
      // const res2 = await this.$api.viewswiper();
      // console.log(res2);
      // this.img1 = res2.first_pic;
      // this.img2 = res2.second_pic;
      // this.img3 = res2.third_pic;
    },
    // 保存
    async onSubmit() {
      const that = this;
      this.imgFile.append("title", this.form.content);
      var configs = {
        headers: {
          "Content-Type": "multipart/form-data;charse=UTF-8",
          "X-Token": sessionStorage.getItem("token"),
        },
      };
      axios
        .post(
          `${this.$url}/banner/upload`,
          // `/admin/banner/upload`,
          this.imgFile,
          configs
        )
        .then(function (res) {
          console.log(res);
          if (res.data.code == 200) {
            that.$message({
              message: res.data.message,
              type: "success",
            });
            setTimeout(() => {
              that.$router.push({ name: "Lunbotuliebiao" });
            }, 500);
          } else {
            that.$message.error(res.data.message);
          }
        });
    },
    // 轮播图上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          var reader = new FileReader();
          reader.readAsDataURL(file); //通过文件流将文件转换成Base64字符串
          reader.onloadend = function () {
            that.form.img = reader.result;
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 删除轮播图
    async deleImage(i) {
      const res = await this.$api.delswiper(
        i,
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
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
    font-size: 25px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #2f313d;
    line-height: 80px;
    margin-left: 44px;
  }
}
.lbtForm {
  margin-top: 28px;
  .img_cyy {
    width: 414px;
    height: 217px;
    opacity: 1;
    background: #ffffff;
  }
}
.displayN {
  display: none;
}
/deep/ .el-form-item {
  display: flex !important;
}
/deep/ .el-form-item__label {
  width: 120px !important;
}
/deep/ .el-form-item__content {
  margin-left: 0px !important;
  width: 100%;
}
</style>