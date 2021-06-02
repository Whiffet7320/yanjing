<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">免单购物协议</div>
    </div>

    <div id="editor"></div>
    <el-row>
      <el-col :span="20">
        <div id="editor"></div>
      </el-col>
    </el-row>
    <el-button type="danger" @click="onSubmit">发布</el-button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      content: "", //获取富文本里面的内容
    };
  },
  created(){
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$api.billagreement_view()
      document.getElementsByClassName("w-e-text")[0].innerHTML = res.content;
    },
    async onSubmit() {
      console.log(document.getElementsByClassName("w-e-text")[0].innerHTML); //获取富文本里面的内容
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      const res = await this.$api.billagreement(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.content
      );
      console.log(res)
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
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
#editor {
  margin-top: 20px;
  margin-bottom: 25px;
}
</style>