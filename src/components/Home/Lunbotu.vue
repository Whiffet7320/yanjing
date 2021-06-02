<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">轮播图上传</div>
    </div>
    <div class="nav2">
      <div class="tit1">（图片尺寸：360*125，最多上传三张）</div>
    </div>
    <div class="nav3">
      <div class="item">
        <div class="myImg" @click="companyList(1)">
          <!-- <viewer> -->
            <img v-if="img1 != ''" :src="img1" class="img_cyy" />
            <img
              v-else
              class="img_cyy"
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              alt=""
            />
          <!-- </viewer> -->
        </div>
        <div class="tit">
          <div class="tit1">轮播图01</div>
          <div class="tit2" v-if="img1 != ''" @click="deleImage(1)">删除</div>
        </div>
      </div>
      <div class="item">
        <div class="myImg" @click="companyList(2)">
          <!-- <viewer> -->
            <img v-if="img2 != ''" :src="img2" class="img_cyy" />
            <img
              v-else
              class="img_cyy"
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              alt=""
            />
          <!-- </viewer> -->
        </div>
        <div class="tit">
          <div class="tit1">轮播图02</div>
          <div class="tit2" v-if="img2 != ''" @click="deleImage(2)">删除</div>
        </div>
      </div>
      <div class="item">
        <div class="myImg" @click="companyList(3)">
          <!-- <viewer> -->
            <img v-if="img3 != ''" :src="img3" class="img_cyy" />
            <img
              v-else
              class="img_cyy"
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              alt=""
            />
          <!-- </viewer> -->
        </div>
        <div class="tit">
          <div class="tit1">轮播图03</div>
          <div class="tit2" v-if="img3 != ''" @click="deleImage(3)">删除</div>
        </div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["fileList", "fileListImg"]),
  },
  data() {
    return {
      dialogImageUrl: "",
      imgList: [],
      myImgList: [],
      imgFile: null,
      imgIndex: 1,
      img1: "",
      img2: "",
      img3: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const resp = await this.$api.logincheck(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      if (resp.result == 1) {
        sessionStorage.setItem("isLogin", true);
      } else {
        //   console.log(res)
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("isLogin", null);
        this.$router.go(0);
        this.$router.push({ path: "/login" });
      }
      const res2 = await this.$api.viewswiper();
      console.log(res2);
      this.img1 = res2.first_pic;
      this.img2 = res2.second_pic;
      this.img3 = res2.third_pic;
    },
    // 轮播图上传
    companyList(i) {
      this.imgIndex = i;
      console.log(this.imgIndex);
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      // console.log(this.myImgList.length);
      // this.imgIndex = this.myImgList.length + 1;
      console.log(this.imgIndex);
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      // console.log(event)
      //创建文件读取对象
      console.log(filetType);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          var reader = new FileReader();
          reader.readAsDataURL(this.imgFile); //通过文件流将文件转换成Base64字符串
          reader.onloadend = function () {
            that.myImgList.push(reader.result);
            console.log(that.myImgList);
            that.$api
              .updateswiper(
                reader.result,
                that.imgIndex,
                sessionStorage.getItem("user_name"),
                sessionStorage.getItem("user_pass")
              )
              .then((res) => {
                console.log(res);
                if (res.result == 1) {
                  if (that.imgIndex == 1) {
                    that.img1 = reader.result;
                  }
                  if (that.imgIndex == 2) {
                    that.img2 = reader.result;
                  }
                  if (that.imgIndex == 3) {
                    that.img3 = reader.result;
                  }
                  that.$message({
                    message: res.msg,
                    type: "success",
                  });
                }
              });
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
    font-size: 30px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 80px;
    margin-left: 40px;
    color: #ebbfcc;
  }
}
.nav2 {
  margin-top: 36px;
  .tit1 {
    opacity: 1;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #b41616;
  }
}
.nav3 {
  margin-top: 23px;
  display: flex;
  .item {
    margin-right: 10px;
    .myImg {
      width: 360px;
      height: 125px;
      opacity: 1;
      background: #ffffff;
      border-radius: 10px;
      .img_cyy {
        width: 360px;
        height: 125px;
      }
    }
    .tit {
      height: 25px;
      display: flex;
      justify-content: center;
      .tit1 {
        margin-top: 10px;
        text-align: center;
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #000000;
      }
      .tit2 {
        margin-left: 10px;
        color: #f40;
        margin-top: 10px;
        text-align: center;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
      }
    }
  }
}
.nav4 {
  margin-top: 40px;
  width: 100px;
  height: 40px;
  opacity: 1;
  background: #ebbfcc;
  border-radius: 10px;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
}
.displayN {
  display: none;
}
</style>