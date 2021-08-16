<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">新建产品</div>
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
          <el-col :span="13">
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="分 类" prop="category_id">
              <el-cascader
                v-model="ruleForm.category_id"
                :options="options"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item, i) in ggList" :key="i">
          <el-col :span="7">
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="item.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="规格" prop="size">
              <el-input v-model="item.size"></el-input>
            </el-form-item>
          </el-col>
          <el-button class="ggdelBtn" @click="ggdel(item, i)" type="text"
            >删除</el-button
          >
        </el-row>
        <i @click="addgg" class="el-icon-circle-plus"></i>
        <!-- 主图 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="主图" prop="zt">
              <div class="items">
                <div class="item" v-for="(ele, i) in imgList" :key="i">
                  <div class="myImg" @click="companyList(i)">
                    <!-- <viewer> -->
                    <img v-if="ele.img != ''" :src="ele.img" class="img_cyy" />
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
                      v-if="ele.img != ''"
                      @click="deleImage(i)"
                    >
                      删除
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="13">
            <el-form-item label="提示语" prop="title">
              <el-input v-model="ruleForm.prompt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="添加颜色" prop="title">
              <el-row :gutter="20">
                <el-col :span="4" v-for="(item, i) in bqList" :key="i">
                  <div class="tjbq">
                    <el-input
                      style="width: 80%"
                      v-model="item.title"
                    ></el-input>
                    <div class="delbq" @click="delbq(i)">X</div>
                  </div>
                </el-col>
                <i @click="addbq" class="el-icon-circle-plus"></i>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 详情 -->
        <el-row>
          <el-col :span="21">
            <el-form-item label="详情" prop="xq">
              <div id="editor"></div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import E from "wangeditor";
export default {
  computed: {
    ...mapState(["shangpinEditform"]),
  },
  data() {
    return {
      skuLength: null, //修改前sku的长度
      content: "", //详情
      imgsrc: "",
      imgFile: null,
      ggList: [{}], //规格
      bqList: [{}], //标签
      mybqList: [], //要传的标签字符串
      optionsVal: null,
      imgList: [
        { img: "" },
        { img: "" },
        { img: "" },
        { img: "" },
        { img: "" },
      ],
      imgIndex: null,
      options: [], //分类列表
      ruleForm: {
        title: "",
        price: "",
        size: "",
        category_id: [],
        pic_map: [],
        prompt: "",
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
        // 修改
        console.log(this.shangpinEditform);
        this.shangpinEditform.pic_arr.forEach((ele, i) => {
          this.$set(this.imgList, i, ele);
          this.$set(this.ruleForm.pic_map, i, ele.pic_id);
        });
        // this.ruleForm.category_id = [28,32]
        var arr = this.shangpinEditform.category_id_arr.split(",");
        arr.forEach((ele) => {
          this.ruleForm.category_id.push(+ele);
        });
        console.log(this.ruleForm);
        // var arr2 = this.shangpinEditform.product_tags.split(",");
        // this.bqList = [];
        // arr2.forEach((ele) => {
        //   this.bqList.push({ title: ele });
        // });
        const resp = await this.$api.productGet_desc(this.shangpinEditform.id)
        this.editor.txt.html(resp.data.desc);
        this.ruleForm.title = this.shangpinEditform.title;
        this.ruleForm.prompt = this.shangpinEditform.prompt;
        this.content = this.shangpinEditform.desc;
        this.ggList = this.shangpinEditform.sku_arr;
        this.skuLength = this.ggList.length;
        // this.bqList = this.shangpinEditform.sku_arr;
      } else {
        // 新增
      }
      const res = await this.$api.categoryIndex();
      console.log(res);
      this.total = res.data.total;
      res.data.forEach((ele) => {
        ele.value = ele.category_id;
        ele.label = ele.title;
        if (ele.children) {
          ele.children.forEach((item) => {
            item.value = item.category_id;
            item.label = item.title;
            if (item.children) {
              item.children.forEach((item2) => {
                item2.value = item2.category_id;
                item2.label = item2.title;
              });
            }
          });
        }
      });
      this.options = res.data;
      // this.$set(this.options[0], "children", res.data);
    },
    // 删除规格
    async ggdel(item,i) {
      // if (item.sku_id) {
      //   const res = await this.$api.productDel_sku(item.sku_id);
      //   console.log(res);
      //   if (res.code == 200) {
      //     this.$message({
      //       message: res.message,
      //       type: "success",
      //     });
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // }
      this.ggList.splice(i, 1);
    },
    // 添加规格
    addgg() {
      this.ggList.push({});
    },
    // 添加标签
    addbq() {
      this.bqList.push({});
    },
    // 删除标签
    delbq(i) {
      this.bqList.splice(i, 1);
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
      this.$refs.fileInputList.click();
    },
    async deleImage(i) {
      // console.log(ele);
      // if (ele.pic_id) {
      //   const res = await this.$api.productProduct_pic_del(
      //     [ele.pic_id],
      //     this.shangpinEditform.id
      //   );
      //   console.log(res);
      //   if (res.code == 200) {
      //     this.$message({
      //       message: res.message,
      //       type: "success",
      //     });
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // }
      this.$set(this.imgList, i, { img: "" });
      this.$set(this.ruleForm.pic_map, i, "");
    },
    companyLogo(event) {
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
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          var configs = {
            headers: {
              "Content-Type": "multipart/form-data;charse=UTF-8",
              "X-Token": sessionStorage.getItem("token"),
            },
          };
          axios
            .post(
              `${this.$url}/product/upload_product_pic`,
              // `/admin/product/upload_product_pic`,
              this.imgFile,
              configs
            )
            .then(async function (res) {
              if (res.data.code == 200) {
                that.$message({
                  message: res.data.message,
                  type: "success",
                });
                if (res.data.data.path.slice(0, 1) == ".") {
                  res.data.data.path = res.data.data.path.substr(1);
                }
                that.imgsrc = res.data.data.domain + res.data.data.path;
                that.$set(that.imgList, that.imgIndex, { img: that.imgsrc });
                that.$set(
                  that.ruleForm.pic_map,
                  that.imgIndex,
                  res.data.data.id
                );
                console.log(that.ruleForm.pic_map)
                // if(that.shangpinEditform){
                //   const resp = await that.$api.productProduct_pic_add([ res.data.data.id],that.shangpinEditform.id);
                //   console.log(resp)
                // }
              } else {
                that.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 保存
    async onSubmit() {
      if (this.shangpinEditform) {
        // 修改
        this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
        this.bqList.forEach((ele) => {
          this.mybqList.push(ele.title);
        });
        // console.log(this.ggList)
        // var newSku = this.ggList.slice(this.skuLength, this.ggList.length);
        // console.log(newSku);
        // if (this.ggList.length > 0) {
        //   const res = await this.$api.productAdd_sku(
        //     this.ggList,
        //     this.shangpinEditform.id
        //   );
        //   console.log(res);
        //   if (res.code == 200) {
        //     this.$message({
        //       message: res.message,
        //       type: "success",
        //     });
        //   } else {
        //     this.$message.error(res.message);
        //   }
        // }
        const res = await this.$api.productEdit_product({
          product_id: this.shangpinEditform.id,
          sku: this.ggList,
          title: this.ruleForm.title,
          category_id: this.ruleForm.category_id.toString(),
          desc: this.content,
          prompt: this.ruleForm.prompt,
          product_tags: this.mybqList.toString(),
          water_or_plant:1,
          pic_map: this.ruleForm.pic_map,
        });
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinliebiao" });
          }, 500);
        } else {
          this.$message.error(res.message);
        }
      } else {
        // 添加
        this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
        this.bqList.forEach((ele) => {
          this.mybqList.push(ele.title);
        });
        // console.log(this.mybqList.toString(),this.ggList)
        // console.log(this.ruleForm);
        const res = await this.$api.productAdd_product({
          title: this.ruleForm.title,
          sku: this.ggList,
          pic_map: this.ruleForm.pic_map,
          category_id: this.ruleForm.category_id,
          desc: this.content,
          prompt: this.ruleForm.prompt,
          product_tags: this.mybqList.toString(),
          water_or_plant:1
        });
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinliebiao" });
          }, 500);
        } else {
          this.$message.error(res.message);
        }
      }
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
        font-family: zw;;
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
        font-family: zw;;
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
.ggdelBtn {
  margin-left: 20px;
}
.tjbq {
  display: flex;
  align-content: center;
  .delbq {
    height: 20px;
    width: 16px;
    border: 1px solid #f40;
    margin-left: 6px;
    line-height: 20px;
    text-align: center;
    color: #f40;
    cursor: pointer;
  }
}
</style>