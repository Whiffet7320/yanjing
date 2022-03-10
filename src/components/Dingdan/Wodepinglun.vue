<template>
  <div class="index">
    <div class="tit1">我的评论</div>
    <div class="nav1">
      <div class="items">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="left">
            <div class="l-n1" @click="toShop(item.storehouse_id)">
              <img
                :src="item.product_img"
                class="pic1"
                alt
              />
              <div class="txt1">{{item.product_name}}</div>
            </div>
            <div class="l-n2">{{item.content}}</div>
          </div>
          <div @click="delpl(item.id)" class="right">删除</div>
        </div>
      </div>
      <el-pagination
        background
        class="fenye"
        @current-change="this.handleCurrentChange"
        :current-page="this.jishiShougouPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="this.total"
      ></el-pagination>
      <!-- <el-row :gutter='20'>
        <el-col :span='12'></el-col>
        <el-col :span='12'></el-col>
      </el-row>-->
    </div>
    <!-- 物流信息 -->
    <el-dialog :visible.sync="wuliudialogVisible" width="500px" :before-close="wuliuhandleClose">
      <div class="wuliuDia"></div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage"])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    }
  },
  data() {
    return {
      nowIndex: "1",
      wuliudialogVisible: false,
      total: 0,
      list:[],
    };
  },
  created() {
    // console.log(this.asideVal);
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$api.user_comment_list({
        limit:10,
        page:this.jishiShougouPage
      })
      this.list = res.data.data;
      this.total = res.data.total;
    },
    toShop(url){
      this.$store.commit('shopId',url)
      this.$router.push({name:'Shangpinxiangqin'})
    },
    async delpl(id){
      const res = await this.$api.del_user_comment({comment_id:id})
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.message);
      }
    },
    changeFahuo(i) {
      this.nowIndex = i;
    },
    onSubmit() {
      console.log(this.form);
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
    wuliuhandleClose() {
      this.wuliudialogVisible = false;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.fenye {
  margin-bottom: 20px;
}
.index {
}
.tit1 {
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: left;
  color: #1e1f33;
}
.tit2 {
  display: flex;
  align-content: center;
  margin-top: 20px;
  .txt1 {
    cursor: pointer;
    margin-right: 40px;
    font-size: 20px;
    color: #969699;
    font-weight: 300;
  }
  .txt1.active {
    color: #1e1f33;
  }
}
.nav1 {
  .items {
    margin-top: 30px;
    background: #ffffff;
    padding: 0 40px;
    margin-right: 60px;
    margin-bottom: 20px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      padding: 16px 0;
      border-top: 1px solid #e1e1e6;
      &:nth-child(1){
        border-top: 0px;
      }
      .left {
        display: flex;
        align-items: center;
        .l-n1 {
          display: flex;
          align-items: center;
          width: 336px;
          height: 48px;
          background: #f0f0f0;
          border-radius: 1px;
          .pic1 {
            margin-left: 22px;
            width: 28px;
            height: 28px;
            margin-right: 22px;
          }
          .txt1 {
            font-size: 14px;
            color: #969699;
          }
        }
        .l-n2 {
          margin-left: 100px;
          font-size: 14px;
          color: #000000;
        }
      }
      .right {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background: #000000;
        border-radius: 24px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
}
/deep/ .vxe-body--column.col-active {
  background-color: #fafafa;
  font-weight: 700;
}
.wuliuDia {
  .wuliuDia-tit1 {
    font-size: 16px;
    color: #1e1f33;
  }
  .wuliu-btn {
    cursor: pointer;
    margin: 10px auto;
    width: 320px;
    height: 60px;
    background: #000000;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 60px;
  }
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