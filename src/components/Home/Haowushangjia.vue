<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">好物上架</div>
    </div>
    <div class="myForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="21">
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="库 存" prop="stock">
              <el-input v-model="ruleForm.stock"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="分 类" prop="classify_id">
              <el-select v-model="ruleForm.classify_id" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 主图 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="主图" prop="zt">
              <div class="items">
                <div class="item" v-for="(ele, i) in imgList" :key="i">
                  <div class="myImg" @click="companyList(i)">
                    <!-- <viewer> -->
                    <img v-if="ele != ''" :src="ele" class="img_cyy" />
                    <img
                      v-else
                      class="img_cyy"
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                      alt=""
                    />
                    <!-- </viewer> -->
                  </div>
                  <div class="tit">
                    <div class="tit1">图{{ i + 1 }}</div>
                    <div
                      class="tit2"
                      v-if="ele != ''"
                      @click="deleImage(ele, i)"
                    >
                      删除
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 详情 -->
        <el-row>
          <el-col :span="21">
            <el-form-item label="详情" prop="xq">
              <div id="editor"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="邮费" prop="postage">
              <el-input v-model="ruleForm.postage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="直接下单开关" prop="overbooking">
              <el-switch v-model="ruleForm.overbooking"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="链接邀请开关" prop="link_status">
              <el-switch v-model="ruleForm.link_status"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="热卖榜单开关" prop="is_hot">
              <el-switch v-model="ruleForm.is_hot"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="国际大牌开关" prop="is_brand">
              <el-switch v-model="ruleForm.is_brand"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="男装专区开关" prop="is_zone">
              <el-switch v-model="ruleForm.is_zone"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="新品上新开关" prop="is_new">
              <el-switch v-model="ruleForm.is_new"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="颜色">
              <el-button type="primary" @click="addColor">添加</el-button>
              <span class="colorSpan" v-for="(item, i) in colorArr" :key="i"
                >{{ item }}
                <span class="del" @click="delColor(i)">x</span>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="尺寸">
              <el-button type="primary" @click="addSize">添加</el-button>
              <span class="colorSpan" v-for="(item, i) in sizeArr" :key="i"
                >{{ item }}
                <span class="del" @click="delSize(i)">x</span>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 保存 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
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
    <!-- 颜色 -->
    <el-dialog
      title="添加颜色"
      :visible.sync="colordialogVisible"
      width="30%"
      :before-close="colorhandleClose"
    >
      <el-form :inline="true" :model="colorForm" class="demo-form-inline">
        <el-form-item label="颜色">
          <el-input v-model="colorForm.color"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitColor">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 尺寸 -->
    <el-dialog
      title="添加尺寸"
      :visible.sync="sizedialogVisible"
      width="30%"
      :before-close="sizehandleClose"
    >
      <el-form :inline="true" :model="sizeForm" class="demo-form-inline">
        <el-form-item label="尺寸">
          <el-input v-model="sizeForm.size"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitSize">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import E from "wangeditor";
export default {
  computed: {
    ...mapState(["shangpinEditform"]),
  },
  data() {
    return {
      colordialogVisible: false,
      optionsVal: null,
      imgList: ["", "", "", "", ""],
      imgIndex: null,
      options: [], //分类列表
      colorForm: {
        color: "",
      },
      colorArr: [],
      sizedialogVisible: false,
      sizeForm: {
        size: "",
      },
      sizeArr: [],
      ruleForm: {
        title: "",
        price: "",
        stock: "",
        classify_id: "",
        pic: [],
        content: "",
        postage: "",
        overbooking: null,
        link_status: null,
        is_hot: null,
        is_brand: null,
        is_zone: null,
        is_new: null,
        color: [],
        size: [],
      },
      rules: {
        spjg: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        kc: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
    };
  },
  // created() {
  //   this.getData();
  // },
  methods: {
    async getData() {
      if (this.shangpinEditform) {
        console.log(this.shangpinEditform);
        this.ruleForm = this.shangpinEditform;
        // this.imgList = this.shangpinEditform
        this.shangpinEditform.pic.forEach((ele, i) => {
          this.imgList[i] = ele.name;
        });
        this.editor.txt.html(this.shangpinEditform.content);
      }
      this.ruleForm.overbooking = this.ruleForm.overbooking == 1 ? true : false;
      this.ruleForm.link_status = this.ruleForm.link_status == 1 ? true : false;
      this.ruleForm.is_hot = this.ruleForm.is_hot == 1 ? true : false;
      this.ruleForm.is_brand = this.ruleForm.is_brand == 1 ? true : false;
      this.ruleForm.is_zone = this.ruleForm.is_zone == 1 ? true : false;
      this.ruleForm.is_new = this.ruleForm.is_new == 1 ? true : false;
      this.ruleForm.color.forEach((ele) => {
        this.colorArr.push(ele.name);
      });
      this.ruleForm.size.forEach((ele) => {
        this.sizeArr.push(ele.name);
      });
      const res = await this.$api.listclassify();
      // console.log(res.list);
      this.options = res.list;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 主图
    companyList(i) {
      this.imgIndex = i;
      console.log(this.imgIndex);
      this.$refs.fileInputList.click();
    },
    async deleImage(ele, i) {
      const res = await this.$api.goodspic_del(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        ele
      );
      console.log(res);
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.$set(this.imgList, i, "");
      }
    },
    companyLogo(event) {
      // console.log(this.myImgList.length);
      // this.imgIndex = this.myImgList.length + 1;
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      // console.log(event)
      //创建文件读取对象
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
            that.imgList[that.imgIndex] = reader.result;
            that.$api
              .addgoodspic(
                sessionStorage.getItem("user_name"),
                sessionStorage.getItem("user_pass"),
                reader.result
              )
              .then((res) => {
                console.log(res.pic_url);
                // that.imgList[that.imgIndex] = res.pic_url
                that.$set(that.imgList, that.imgIndex, res.pic_url);
              });
            console.log(that.imgList);
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 保存
    async onSubmit() {
      console.log(this.colorArr);
      this.ruleForm.color = [];
      this.ruleForm.size = [];
      this.colorArr.forEach((ele) => {
        this.ruleForm.color.push({ name: ele });
      });
      this.sizeArr.forEach((ele) => {
        this.ruleForm.size.push({ name: ele });
      });
      this.ruleForm.overbooking = this.ruleForm.overbooking == false ? 0 : 1;
      this.ruleForm.link_status = this.ruleForm.link_status == false ? 0 : 1;
      this.ruleForm.is_hot = this.ruleForm.is_hot == false ? 0 : 1;
      this.ruleForm.is_brand = this.ruleForm.is_brand == false ? 0 : 1;
      this.ruleForm.is_zone = this.ruleForm.is_zone == false ? 0 : 1;
      this.ruleForm.is_new = this.ruleForm.is_new == false ? 0 : 1;
      this.ruleForm.content = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML;
      const arr = [];
      this.imgList.forEach((ele) => {
        arr.push({ name: ele });
      });
      this.ruleForm.pic = arr;
      console.log(this.ruleForm);
      if (this.shangpinEditform) {
        // 修改
        const res = await this.$api.goods_update(
          sessionStorage.getItem("user_name"),
          sessionStorage.getItem("user_pass"),
          { ...this.ruleForm },
          this.shangpinEditform.id
        );
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.$store.commit('shangpinEditform',null)
          setTimeout(() => {
            this.$router.push({ name: "Shangpinliebiao" });
          }, 500);
        }
      } else {
        // 新增
        const res = await this.$api.goods_add(
          sessionStorage.getItem("user_name"),
          sessionStorage.getItem("user_pass"),
          { ...this.ruleForm }
        );
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinliebiao" });
          }, 500);
        }
      }
    },
    // 颜色
    onSubmitColor() {
      this.colorArr.push(this.colorForm.color);
      this.colordialogVisible = false;
      this.colorForm.color = "";
    },
    addColor() {
      this.colordialogVisible = true;
    },
    colorhandleClose() {
      this.colordialogVisible = false;
    },
    delColor(i) {
      console.log(i);
      this.colorArr.splice(i, 1);
    },
    // 尺寸
    sizehandleClose() {
      this.sizedialogVisible = false;
    },
    addSize() {
      this.sizedialogVisible = true;
    },
    onSubmitSize() {
      this.sizeArr.push(this.sizeForm.size);
      this.sizedialogVisible = false;
      this.sizeForm.size = "";
    },
    delSize(i) {
      console.log(i);
      this.sizeArr.splice(i, 1);
    },
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo",
    ];
    // this.editor.config.uploadImgServer = "/upload-img";
    this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.config.customUploadImg = async function (
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      var reader = new FileReader();
      reader.readAsDataURL(resultFiles[0]); //通过文件流将文件转换成Base64字符串
      reader.onloadend = function () {
        //将转换结果赋值给img标签
        // preview.src = reader.result;
        //输出结果
        console.log(reader.result);
        insertImgFn(reader.result);
      };
      //   file_re = await that.readFileAsBuffer(resultFiles[0]);
    };
    this.editor.create();
    this.editor.txt.html(this.content);
    this.getData();
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
}

/deep/ #editor div {
  margin: 0;
}
/deep/ #editor .w-e-toolbar {
  z-index: 1 !important;
}
/deep/ #editor .w-e-text-container {
  z-index: 0 !important;
}
.items {
  display: flex;
  .item {
    margin-right: 10px;
    .myImg {
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tit {
      height: 25px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      .tit1 {
        margin-top: 10px;
        text-align: center;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #000000;
      }
      .tit2 {
        cursor: pointer;
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
.displayN {
  display: none;
}
.colorSpan {
  margin: 6px;
  .del {
    cursor: pointer;
    color: #f40;
    border: 1px solid #f40;
    padding: 0 4px;
  }
}
</style>