<template>
  <div class="index">
    <div class="ho">
      <div class="nav1">
        <el-row :gutter="60">
          <el-col :span="9">
            <div class="n1-left">
              <div class="n1l-top">
                <div class="n1l-tit1">{{obj.account}}</div>
                <div class="n1l-tit2" @click="toGerenzhongx">
                  <img src="../../assets/img/bianji.png" alt class="pic1" />
                  <div class="txt1">编辑</div>
                </div>
              </div>
              <div class="n1l-down">
                <div class="txt1">积分:</div>
                <span class="sp">{{obj.integral}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="n1-right">
              <div class="n1r-item" @click="jump('Youhuiquan')">
                <img src="../../assets/img/zu115.png" alt class="pic1" />
                <div class="tit1">
                  <div class="txt1">{{obj.coupon_count}}</div>
                  <div class="txt2">优惠券</div>
                </div>
              </div>
              <div class="n1r-item" @click="jump('Wodeshoucang')">
                <img src="../../assets/img/zu116.png" alt class="pic2" />
                <div class="tit1">
                  <div class="txt1">{{obj.collect_count}}</div>
                  <div class="txt2">收藏夹</div>
                </div>
              </div>
              <div class="n1r-item" @click="jump('Gouwuche')">
                <img src="../../assets/img/zu118.png" alt class="pic3" />
                <div class="tit1">
                  <div class="txt1">2</div>
                  <div class="txt2">购物车</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav2">
        <div class="tit1">
          <img src="../../assets/img/zu119.png" alt class="n2t1-pic1" />
          <div class="n2t1-txt1">Zing</div>
          <div class="n2t1-txt2">您好！尊敬的会员LI</div>
        </div>
        <div class="tit2">
          续费
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="tit3">会员到期时间：2010-06-08</div>
      </div>
      <div class="nav3">
        <el-row :gutter="40">
          <el-col :span="8">
            <div class="n3-item" @click="jump('Shiliziliao')">
              <div class="shu"></div>
              <img src="../../assets/img/zu123.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">处方</div>
                <div class="txt2">管理处方</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="n3-item" @click="jump('Wodedingdan')">
              <div class="shu"></div>
              <img src="../../assets/img/zu124.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">我的订单</div>
                <div class="txt2">查看订单详情</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="n3-item" @click="jump('Youhuiquan')">
              <div class="shu"></div>
              <img src="../../assets/img/zu122.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">优惠券</div>
                <div class="txt2">
                  <span class="sp">1个</span>可用
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav3">
        <el-row :gutter="40">
          <el-col :span="8">
            <div class="n3-item" @click="jump('Wodedizhi')">
              <div class="shu"></div>
              <img src="../../assets/img/zu126.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">地址</div>
                <div class="txt2">管理地址</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="n3-item" @click="jump('Tuiguang')">
              <div class="shu"></div>
              <img src="../../assets/img/zu125.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">付费推广</div>
                <div class="txt2">15%粉丝佣金</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="n3-item" @click="jump('Wodepinglun')">
              <div class="shu"></div>
              <img src="../../assets/img/zu121.png" alt class="n3pic" />
              <div class="tit">
                <div class="txt1">评论</div>
                <div class="txt2">管理处方</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData()
  },
  data() {
    return {
      obj:{},
    };
  },
  methods:{
      async getData(){
        const res = await this.$api.user_info()
        console.log(res.data)
        this.obj = res.data;
      },
      jump(url){
        this.$router.push({name:url})
      },
      toGerenzhongx(){
          this.$store.commit('isLogin','true')
          this.$router.push({name:'Zhanghuxinxi'})
      },
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #fafafa;
  padding: 60px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.ho{
    width: 1400px;
}
.nav1 {
  .n1-left {
    box-sizing: border-box;
    padding: 20px 22px;
    background-image: url("../../assets/img/zu117.png");
    background-size: 100% 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .n1l-top {
      .n1l-tit1 {
        font-size: 24px;
        color: #ffffff;
        margin-bottom: 12px;
      }
      .n1l-tit2 {
        display: flex;
        align-items: center;
        .pic1 {
          cursor: pointer;
          width: 22px;
          height: 22px;
        }
        .txt1 {
          cursor: pointer;
          margin-left: 20px;
          font-size: 18px;
          color: #ffffff;
        }
      }
    }
    .n1l-down {
      display: flex;
      align-items: center;
      .txt1 {
        font-size: 42px;
        color: #ffffff;
      }
      .sp {
        transform: translate(10px, -2px);
        font-size: 60px;
        color: #ffffff;
      }
    }
  }
  .n1-right {
    height: 300px;
    background-image: url("../../assets/img/zu128.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    .n1r-item {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .pic1 {
      width: 93px;
      height: 63px;
    }
    .pic2 {
      width: 76px;
      height: 90px;
    }
    .pic3 {
      width: 72px;
      height: 72px;
    }
    .tit1 {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .txt1 {
        margin-bottom: 20px;
        font-size: 42px;
        font-weight: 800;
        color: #000000;
      }
      .txt2 {
        font-size: 20px;
        color: #000000;
      }
    }
  }
}
.nav2 {
  padding: 0 50px;
  box-sizing: border-box;
  margin-top: 20px;
  background-image: url("../../assets/img/zu130.png");
  background-size: 100% 100%;
  height: 300px;
  position: relative;
  .tit1 {
    padding-top: 52px;
    display: flex;
    align-items: center;
    .n2t1-pic1 {
      width: 59px;
      height: 54px;
    }
    .n2t1-txt1 {
      margin-left: 32px;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #d0b28b;
    }
    .n2t1-txt2 {
      margin-left: 160px;
      font-size: 24px;
      color: #d0b28b;
    }
  }
  .tit2 {
    cursor: pointer;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    font-size: 36px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    color: #d0b28b;
    .el-icon-caret-right {
      margin-left: 50px;
      font-size: 30px;
    }
  }
  .tit3 {
    position: absolute;
    bottom: 28px;
    left: 50px;
    font-size: 18px;
    font-weight: 800;
    color: #d0b28b;
  }
}
.nav3 {
  margin-top: 20px;
  .n3-item {
    height: 179px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    .shu {
      margin-left: 12px;
      width: 4px;
      height: 131px;
      background: #000000;
      border-radius: 2px;
    }
    .n3pic {
      margin: 0 48px 0 38px;
      width: 62px;
      height: 62px;
    }
    .tit {
      .txt1 {
        font-size: 48px;
        font-weight: 800;
        color: #333334;
      }
      .txt2 {
        margin-top: 16px;
        font-size: 24px;
        color: #969699;
        .sp {
          font-size: 30px;
          color: #ff0000;
        }
      }
    }
  }
}
</style>