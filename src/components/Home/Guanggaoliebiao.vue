<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">广告列表</div>
    </div>
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :show-overflow-tooltip="true" prop="id" label="id">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="pic" label="图片">
          <template slot-scope="scope">
            <!-- <div class="splbImg" v-for="(item, i) in scope.row.pic" :key="i"> -->
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              :src="scope.row.pic"
            />
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="url"
          label="跳转链接"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="sub_title"
          label="副标题"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="editform" :model="editform" label-width="80px">
        <el-form-item label="图片">
          <img
            @click="companyList"
            v-if="editImgSrc != ''"
            :src="editImgSrc"
            class="img_cyy"
          />
          <img
            @click="companyList"
            v-else
            class="img_cyy"
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            alt=""
          />
          <input
            type="file"
            name="companyLogo"
            id="file0"
            class="displayN"
            multiple="multiple"
            @change="companyLogo($event)"
            ref="fileInputList"
          />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editform.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="editform.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="editform.urlLink"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editOnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      editDialogVisible: false,
      editform: {
        title: "",
        sub_title: "",
        urlLink: "",
      },
      editImgSrc: "",
      urlLink: "",
      imgFile: null,
      id: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.centerbanner_list();
      this.tableData = res.list;
      console.log(this.tableData);
    },
    edit(row) {
      this.editDialogVisible = true;
      console.log(row);
      this.id = row.id;
      this.editImgSrc = row.pic;
      this.editform.urlLink = row.url;
      this.editform.title = row.title;
      this.editform.sub_title = row.sub_title;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    async editOnSubmit() {
      this.editImgSrc =
        this.editImgSrc.indexOf("http") != -1 ? "" : this.editImgSrc;
      const res = await this.$api.centerbanner_edit(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.editImgSrc,
        this.editform.urlLink,
        this.id,
        this.editform.title,
        this.editform.sub_title
      );
      console.log(res);
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.editDialogVisible = false;
        this.getData();
      }
    },
    // 轮播图上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      console.log(this.imgIndex);
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
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
            that.editImgSrc = reader.result;
            console.log(that.editImgSrc);
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
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
.myTable {
  margin-top: 30px;
  margin-right: 30px;
}
.displayN {
  display: none;
}
.img_cyy {
  width: 100px;
  height: 100px;
}
</style>