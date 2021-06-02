<template>
  <div class="header">
    <div class="logo">
      <span class="title">知识库系统</span>
    </div>
    <div class="user">
      <span>{{ this.userObj.nickname }}</span>
      <el-dropdown @command="editPassword">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">修改个人资料</el-dropdown-item>
          <el-dropdown-item command="type" v-if="this.userObj.status == 1"
            >知识库类型(修改/添加)</el-dropdown-item
          >
          <el-dropdown-item command="user" v-if="this.userObj.status == 1"
            >用户管理</el-dropdown-item
          >
          <el-dropdown-item command="signOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="userCenter">个人中心</el-button>
      <!-- <el-button
        icon="el-icon-switch-button"
        @click="signOut"
        circle
      ></el-button> -->
    </div>
    <!-- 修改个人信息 -->
    <el-dialog
      title="修改个人信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPas">
          <el-input v-model="ruleForm.oldPas"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPas">
          <el-input v-model="ruleForm.newPas"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPas2">
          <el-input v-model="ruleForm.newPas2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="this.formSubimt">保存</el-button>
          <el-button type="primary" @click="this.resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改知识库类型 -->
    <el-dialog
      title="修改知识库类型"
      :visible.sync="typeDialogVisible"
      width="50%"
      :before-close="typeHandleClose"
    >
      <el-button type="primary" @click="newTypeDialogVisible = true"
        >新增一级分类</el-button
      >
      <el-button type="primary" @click="newTypeDialogVisible2 = true"
        >新增二级分类</el-button
      >
      <el-table :data="typeTableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              ref="skuMultipleTable"
              :data="props.row.type"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column prop="typename1" label="二级分类">
              </el-table-column>
              <el-table-column prop="typename" label="二级分类">
                <template scope="scope">
                  <div class="input-box">
                    <el-input
                      size="small"
                      v-model="scope.row.typename"
                      @keyup.enter.native="type2Enter(scope)"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="50">
                <template slot-scope="scope">
                  <el-button
                    @click="deleteSort2(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="typename" label="一级分类">
          <template scope="scope">
            <div class="input-box">
              <el-input
                size="small"
                v-model="scope.row.typename"
                @keyup.enter.native="type1Enter(scope)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="二级分类" prop="typename1"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteSort1(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 新增一级分类 -->
    <el-dialog
      title="新增分类"
      :visible.sync="newTypeDialogVisible"
      width="30%"
      :before-close="newTypeHandleClose"
    >
      <el-form
        :model="newTypeRuleForm"
        ref="newTypeRuleForm"
        label-width="100px"
        class="demo-newTypeRuleForm"
      >
        <el-form-item label="一级分类" prop="typename1">
          <el-input v-model="newTypeRuleForm.typename1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="this.newTypeFormSubimt"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增二级分类 -->
    <el-dialog
      title="新增分类"
      :visible.sync="newTypeDialogVisible2"
      width="30%"
      :before-close="newTypeHandleClose2"
    >
      <el-form
        :model="newTypeRuleForm2"
        ref="newTypeRuleForm2"
        label-width="100px"
        class="demo-newTypeRuleForm2"
      >
        <el-form-item label="一级分类" prop="typename1">
          <el-select v-model="newTypeRuleForm2.typename1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="typename2">
          <el-input v-model="newTypeRuleForm2.typename2"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="this.newTypeFormSubimt2"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 用户管理 -->
    <el-dialog
      title="修改知识库类型"
      :visible.sync="userDialogVisible"
      width="50%"
      :before-close="userHandleClose"
    >
      <el-table :data="userTableData" style="width: 100%">
        <el-table-column label="ID" prop="id"> </el-table-column>
        <el-table-column label="用户名" prop="nickname"> </el-table-column>
        <el-table-column label="是否是管理员" prop="status">
          <template slot-scope="scope">
            <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
            <el-checkbox v-model="scope.row.newStatus"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text" size="small"
              >操作</el-button
            >
            <el-button @click="deleteUser(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 更新用户 -->
    <el-dialog
      class="editUser"
      title="更新用户"
      :visible.sync="editUserDialogVisible"
      width="30%"
      :before-close="editUserTypeHandleClose"
    >
      <el-form
        :model="editUserRuleForm"
        ref="editUserRuleForm"
        label-width="100px"
        class="demo-editUserRuleForm"
      >
        <el-form-item label="设置管理员：" prop="status">
          <el-radio-group v-model="editUserRuleForm.status" size="small">
            <el-radio label="1" border>是</el-radio>
            <el-radio label="0" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="this.editUserFormSubimt"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userObj"]),
  },
  data() {
    return {
      username: null,
      mobile: null,
      passWord: null,
      user: null,
      dialogVisible: false,
      ruleForm: {
        oldPas: "",
        newPas: "",
        newPas2: "",
      },
      rules: {
        oldPas: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPas: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPas2: [
          { required: true, message: "请输入再次新密码", trigger: "blur" },
        ],
      },
      typeDialogVisible: false,
      typeTableData: [],
      //   新增一级分类
      newTypeDialogVisible: false,
      newTypeRuleForm: {
        typename1: "",
      },
      //   新增二级分类
      newTypeDialogVisible2: false,
      newTypeRuleForm2: {
        typename1: "",
        typename2: "",
      },
      options: [],
      //   用户管理
      userDialogVisible: false,
      userTableData: [],
      //   更新用户
      editUserDialogVisible: false,
      editUserRuleForm: {},
    };
  },
  created() {
    // this.username = sessionStorage.getItem("userid");
    this.getTypeTableData();
    this.getUserTableData();
  },
  methods: {
    async getTypeTableData() {
      const res = await this.$api.selectKType();
      // let newArr = [];
      console.log(res.data);
      this.options = res.data;
      this.typeTableData = res.data;
    },
    // 用户管理
    async getUserTableData() {
      const res = await this.$api.selectUser();
      console.log(res.data);
      this.userTableData = res.data;
      res.data.forEach((ele) => {
        if (ele.status == 0) {
          ele.newStatus = false;
        } else if (ele.status == 1) {
          ele.newStatus = true;
        }
      });
    },
    // 删除用户
    async deleteUser(row) {
      const res = await this.$api.deleteUser(row.id);
      console.log(res.data);
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getUserTableData();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 更新用户
    editUser(row) {
      this.editUserDialogVisible = true;
      this.editUserRuleForm = { ...row };
      this.editUserRuleForm.status = this.editUserRuleForm.status.toString();
      console.log(this.editUserRuleForm);
    },
    async editUserFormSubimt() {
      console.log(this.editUserRuleForm);
      const obj = {
        id: this.editUserRuleForm.id,
        status: +this.editUserRuleForm.status,
      };
      const res = await this.$api.updateUser(obj);
      if (res.code == 200) {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getUserTableData();
      } else {
        this.$message.error("操作失败");
      }
    },
    // 删除一级分类
    async deleteSort1(row) {
      console.log(row);
      const res = await this.$api.deleteKType(row.id);
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTypeTableData();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 删除二级分类
    async deleteSort2(row) {
      console.log(row);
      const res = await this.$api.deleteKType(row.id);
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTypeTableData();
      } else {
        this.$message.error("删除失败");
      }
    },
    //   修改一级标题
    async type1Enter(scope) {
      console.log(scope.row);
      const obj = {
        id: 0,
        parentId: 0,
        type: 1,
        typename: scope.row.typename,
      };
      const res = await this.$api.updateKType(obj);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTypeTableData();
      } else {
        this.$message.error("修改失败");
      }
    },
    //   修改二级标题
    async type2Enter(scope) {
      console.log(scope.row);
      const obj = {
        id: 0,
        parentId: scope.row.parent_id,
        type: 2,
        typename: scope.row.typename,
      };
      const res = await this.$api.updateKType(obj);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTypeTableData();
      } else {
        this.$message.error("修改失败");
      }
    },
    editPassword(command) {
      if (command == "signOut") {
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("isLogin", null);
        this.$router.go(0);
        this.$router.push({ path: "/login" });
      } else if (command == "edit") {
        this.dialogVisible = true;
      } else if (command == "type") {
        this.typeDialogVisible = true;
      } else if (command == "user") {
        this.userDialogVisible = true;
      }
    },
    // 新增分类保存按钮(添加一级分类)
    async newTypeFormSubimt() {
      console.log(this.newTypeRuleForm);
      const obj1 = {
        type: 1,
        typename: this.newTypeRuleForm.typename1,
      };
      const res = await this.$api.insertKType(obj1);
      console.log(res);
      this.getTypeTableData();
    },
    // 新增分类保存按钮(添加二级分类)
    async newTypeFormSubimt2() {
      console.log(this.newTypeRuleForm2);
      const obj2 = {
        type: 2,
        parentId: this.newTypeRuleForm2.typename1,
        typename: this.newTypeRuleForm2.typename2,
      };
      const res3 = await this.$api.insertKType(obj2);
      console.log(res3);
      if (res3.code == 200) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.getTypeTableData();
      } else {
        this.$message.error("添加失败");
      }
    },
    formSubimt() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    typeHandleClose() {
      this.typeDialogVisible = false;
    },
    newTypeHandleClose() {
      this.newTypeDialogVisible = false;
    },
    newTypeHandleClose2() {
      this.newTypeDialogVisible2 = false;
    },
    userHandleClose() {
      this.userDialogVisible = false;
    },
    editUserTypeHandleClose() {
      this.editUserDialogVisible = false;
    },
    // 个人中心
    userCenter() {
      this.$router.push({ name: "PersonalCenter" });
    },
  },
};
</script>

<style scoped lang='scss'>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  background-color: #409eff;
  .logo {
    position: absolute;
    left: 4%;
    .title {
      line-height: 60px;
      font-size: 30px;
      color: #fff;
    }
  }
  .user {
    height: 100%;
    position: absolute;
    right: 10%;
    line-height: 60px;
    color: #fff;
  }
  .user span {
    font-size: 16px;
    margin-right: 14px;
  }
  .user .el-icon-arrow-down.el-icon--right {
    color: #fff;
  }
  /deep/ .el-form-item__label {
    width: 80px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 84px !important;
    width: 260px;
  }
  .editUser {
    /deep/ .el-form-item__label {
      width: 100px !important;
    }
    .el-radio {
      margin-right: 0px;
    }
  }
}
</style>
