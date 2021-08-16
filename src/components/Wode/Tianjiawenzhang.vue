<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">添加文章</div>
    </div>
    <div class="myForm">
      <el-form @submit.native.prevent :model="form" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.title" placeholder="输入数值"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-row>
            <el-col :span="16">
              <div id="editor"></div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="onSubmit">发布</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import E from "wangeditor";
export default {
  computed: {
    ...mapState(["wenzhangObj"]),
  },
  data() {
    return {
      // content: "",
      form: {
        title: "",
        content: "", //获取富文本里面的内容
      },
    };
  },
  created() {},
  methods: {
    // async getData() {
    //   const res = await this.$api.guide_content();
    //   console.log(res);
    //   // document.getElementsByClassName("w-e-text")[0].innerHTML = res.content;
    //   this.editor.txt.html(res.content);
    // },
    async onSubmit() {
      console.log(document.getElementsByClassName("w-e-text")[0].innerHTML); //获取富文本里面的内容
      this.form.content =
        document.getElementsByClassName("w-e-text")[0].innerHTML;
      if (this.wenzhangObj) {
        // 修改
        const res = await this.$api.otherEdit_article(
          this.form.id,
          this.form.title,
          this.form.content,
          "notice"
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$router.push({name:'Wenzhangliebiao'})
        }
      } else {
        // 添加
        const res = await this.$api.otherAdd_article(
          this.form.title,
          this.form.content,
          "notice"
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$router.push({name:'Wenzhangliebiao'})
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
    if (this.wenzhangObj) {
      // 修改
      this.form = { ...this.wenzhangObj };
      console.log(this.form);
      this.editor.txt.html(this.form.content);
    }
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
#editor {
  // margin-top: 20px;
  margin-bottom: 25px;
}
.myForm {
  margin-right: 30px;
  margin-top: 30px;
}
</style>