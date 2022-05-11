<template>
  <div class="index">
    <div class="nav1">
      <img :src="imgData1.index_top_left" class="one nav1Img" />
      <div class="flex">
        <img :src="imgData1.index_top_right_one" class="nav1Img" alt />
        <img :src="imgData1.index_top_right_two" class="nav1Img mt" alt />
      </div>
    </div>
    <div class="nav2">
      <div class="yhqItem" v-for="item in yhqList" :key="item.id">
        <div class="n2-txtt1">￥</div>
        <div class="n2-txtt2">{{item.coupon_price}}</div>
        <div class="n2-txtt3">优惠券</div>
        <div class="n2-txtt4">满{{item.use_min_price}}元使用</div>
        <div @click="lingqu(item.id)" class="n2-txtt5">
          <div class="txt">点击领取</div>
        </div>
        <div class="n2-txtt6">每满{{item.use_min_price}}可用</div>
      </div>
      <div @click="yhqdialogVisible = true" class="n2-btn">立即领取</div>
    </div>
    <div class="nav3">
      <div class="txt1">在CC Space买眼镜</div>
      <div class="txt2">丰富的风格和精心制作的CC Space光学，帮助50万个家庭看清楚， 并同时宣称他们的时尚宣言。</div>
      <div class="tit3">
        <div @click="toShop(item.id)" class="item" v-for="item in fenleiList" :key="item.id">
          <img class="pic1 mm" :src="item.icon_url" alt />
          <div class="i-txt1">{{item.category_name}}</div>
        </div>
      </div>
    </div>
    <div class="nav4">
      <el-row style="display:flex;align-items: center;">
        <el-col :span="4">
          <div class="n4-left">
            <div class="n4-txt1">产品精选</div>
            <div @click="toShop('','','jx')" class="n4-txt2">点击查看更多</div>
          </div>
        </el-col>
        <el-col :span="20" style="display:flex;align-items: center;">
          <!-- <div class="anLeft">
            <i class="el-icon-arrow-left"></i>
          </div>-->
          <div class="flexd">
            <div class="swItem" v-for="item in jingxuanList" :key="item.id" @click="toShop('',item.id,'jx')" >
              <img class="sw-pic1" :src="item.product_img" alt />
              <div class="sw-txt1">{{item.product_name}}</div>
              <div class="sw-txt2">￥{{item.product_price}}</div>
            </div>
          </div>

          <!-- <swiper class="swiper" id="swiper" :options="swiperOption">
            <swiper-slide>
              <div class="swItem">
                <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
                <div class="sw-txt1">猎杀系列</div>
                <div class="sw-txt2">￥98.0</div>
              </div>
            </swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>-->
          <!-- <div class="anLeft" @click="nextSw">
            <i class="el-icon-arrow-right"></i>
          </div>-->
        </el-col>
      </el-row>
    </div>
    <div class="nav5">
      <el-row>
        <el-col :span="24">
          <img src="../../assets/img/wx11.png" class="n5-pic" alt />
        </el-col>
      </el-row>
    </div>
    <div class="nav6">
      <div class="tit1">
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <div class="n6-txt1">好物上新</div>
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
      </div>
      <el-row>
        <el-col :span="24" style="display:flex;align-items: center;">
          <div class="flexd">
            <div class="swItem" @click="toShop('',item.id,'sx')" v-for="item in shangxinList" :key="item.id">
              <img class="sw-pic1" :src="item.product_img" alt />
              <div class="sw-txt1">{{item.product_name}}</div>
              <div class="sw-txt2">￥{{item.product_price}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="seeMore">查看更多</div>
    <div class="nav7">
      <el-row>
        <el-col :span="24">
          <div class="n7-box">
            <div class="tit1">炫光</div>
            <div class="tit1">明亮</div>
            <div class="tit1">镜面磨砂</div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:45px">
        <el-col :span="24">
          <div class="n7-box">
            <div class="tit1">黑框</div>
            <div class="tit1">办公室适用</div>
            <div class="tit1">旅行适用</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="logo">
      <img src="../../assets/img/CCSpace.png" class="logo-pic" alt />
    </div>
    <div class="nav8">
      <el-row style="display:flex;align-items: center;justify-content: space-between;">
        <el-col :span="10">
          <img
            class="n8-pic"
            src="../../assets/img/wx12.png"
            alt
          />
        </el-col>
        <el-col :span="10">
          <img
            class="n8-pic"
            src="../../assets/img/wx13.png"
            alt
          />
        </el-col>
      </el-row>
    </div>
    <div class="nav9">
      <div class="tit1">
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <div class="n6-txt1">热销推荐</div>
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
      </div>
      <el-row style="margin-top:45px">
        <el-col :span="22">
          <div class="n9-box">
            <el-row>
              <el-col :span="14">
                <div class="n9-left">
                  <div class="top">
                    <img src="../../assets/img/mcz30.png" class="pic" alt />
                  </div>
                  <div class="down">
                    <div class="n9d-item">
                      <img class="pic" src="../../assets/img/mcz8.png" alt />
                      <div class="n9d-txt">长柄尾部</div>
                    </div>
                    <div class="n9d-item">
                      <img class="pic" src="../../assets/img/mcz9.png" alt />
                      <div class="n9d-txt">镜面</div>
                    </div>
                    <div class="n9d-item">
                      <img class="pic" src="../../assets/img/mcz10.png" alt />
                      <div class="n9d-txt">镜架</div>
                    </div>
                    <div class="n9d-item">
                      <img class="pic" src="../../assets/img/mcz11.png" alt />
                      <div class="n9d-txt">眼镜框</div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="n9-right">
                  <div class="swItem" @click="toShop('',item.id,'rx')" v-for="item in rexiaoList" :key="item.id">
                    <img class="sw-pic1" :src="item.product_img" alt />
                    <div class="sw-txt1">{{item.product_name}}</div>
                    <div class="sw-txt2">￥{{item.product_price}}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="nav6">
      <div class="tit1">
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <div class="n6-txt1">限时抢购</div>
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
        <img src="../../assets/img/lujin5.png" class="n6-xg" alt />
      </div>
      <el-row>
        <el-col :span="24" style="display:flex;align-items: center;">
          <div class="flexd">
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <div class="seeMore">查看更多</div>
    <div class="nav10">
      <div class="n10-txt1">在CCSpace购买眼镜</div>
      <div
        class="n10-txt2"
      >CCSpace致力于以实惠的价格提供大量优质眼镜。无论您是时尚爱好者还是日常戴眼镜，我们都提供各 种款式和颜色来表达您的个性。我们可以通过不同种类的镜片满足您的视力需求，包括标准镜片、蓝光阻隔剂、 光致变色镜片、偏光太阳镜镜片和镜面镜片的专业处方。每副眼镜均采用先进设备精细加工，出货前经过5道质 量控制。在CCSpace，我们相信每个人都可以通过无与伦比的服务以真正的价值购买最新的眼镜款式和时尚</div>
      <div class="n10-txt3">CCSPACE</div>
    </div>
    <div class="nav11">
      <el-row style="width:100%">
        <el-col :span="16">
          <div class="n11-left">
            <div class="n11-txt">订阅我们的官方账号，即可获得价值124人民币的4张优惠券</div>
            <el-input placeholder="请输入内容" v-model="keyword2" class="input-with-select">
              <el-button slot="append">发送</el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="n11-right">关注我们</div>
        </el-col>
      </el-row>
    </div>
    <!-- 领取优惠券 -->
    <el-dialog
      title="领取优惠券"
      :visible.sync="yhqdialogVisible"
      width="30%"
      :before-close="yhqhandleClose"
    >
      <div class="yhqDia">
        <div class="txt">注册即可领取优惠券</div>
        <div class="box" v-for="item in yhqList" :key="item.id">
          <div class="left">
            <div class="l-txt1">优惠券</div>
            <div class="l-txt2">全店通用</div>
          </div>
          <div class="right">
            <div class="l-txt1">
              {{item.coupon_price}}
              <span class="sp">元</span>
            </div>
            <div class="l-txt2">实付满{{item.use_min_price}}元使用</div>
          </div>
        </div>
        <div @click="toLinquyouhuiquan" class="btn">领取所有</div>
      </div>
    </el-dialog>
    <LoginDia v-if="isLogin != 'yes'"></LoginDia>
  </div>
</template>

<script>
import LoginDia from "../LoginDia/index.vue";
export default {
  components: {
    LoginDia
  },
  data() {
    return {
      zxkfDialogVisible: false,
      kefuImg: "",
      qq: "",
      //
      //
      lbtArr: [
        "https://img2.baidu.com/it/u=1208920319,2762754731&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500",
        "https://img2.baidu.com/it/u=1195495163,209534845&fm=253&fmt=auto&app=120&f=JPEG?w=1202&h=676",
        "https://img2.baidu.com/it/u=2690921320,2914556199&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
      ],
      mySwiper: null,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      keyword2: "",
      yhqdialogVisible: false,
      imgData1: {},
      yhqList: [],
      fenleiList: [],
      jingxuanList:[],
      shangxinList:[],
      rexiaoList:[],
    };
  },
  async created() {
    this.isLogin = sessionStorage.getItem("isLogin");
    if(this.isLogin == 'yes'){
      this.yhqdialogVisible = true;
    }
    this.getData();
  },
  mounted() {
    setTimeout(() => {
      var imgArr = document.getElementsByClassName("mm");
      imgArr.forEach(ele => {
        ele.style.height = ele.offsetWidth + "px";
      });
    }, 30);
  },
  methods: {
    async getData() {
      const res = await this.$api.web_config();
      console.log(res);
      this.imgData1 = res.data;
      const res2 = await this.$api.coupon_list();
      this.yhqList = res2.data;
      const res3 = await this.$api.category_list({
        cid: "0"
      });
      console.log(res3);
      this.fenleiList = res3.data;
      const res4 = await this.$api.products({
        limit:1000,
        page:1,
        jingxuan:1
      })
      if(res4.data.data.length>4){
        this.jingxuanList = res4.data.data.slice(0,4)
      }else{
         this.jingxuanList = res4.data.data
      }
      console.log(this.jingxuanList)
      const res5 = await this.$api.products({
        limit:1000,
        page:1,
        shangxin:1
      })
      if(res5.data.data.length>4){
        this.shangxinList = res5.data.data.slice(0,4)
      }else{
         this.shangxinList = res5.data.data
      }
      const res6 = await this.$api.products({
        limit:1000,
        page:1,
        rexiao:1
      })
      if(res6.data.data.length>4){
        this.rexiaoList = res6.data.data.slice(0,4)
      }else{
         this.rexiaoList = res6.data.data
      }
    },
    toShop(category_id='',id='',val=''){
      var status;
      if(val == 'jx'){
        status = 'jingxuan'
      }else if(val == 'rx'){
        status = 'rexiao'
      }else if(val == 'sx'){
        status = 'shangxin'
      }
      this.$router.push({name:'Xinping',params:{category_id:category_id,id:id,status:status}})
    },
    async lingqu(id) {
      const res = await this.$api.take_coupon({
        coupon_id: id
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error(res.message);
      }
    },
    yhqhandleClose() {
      this.yhqdialogVisible = false;
    },
    async toLinquyouhuiquan() {
      await this.yhqList.forEach(async ele => {
        const res = await this.$api.take_coupon({ coupon_id: ele.id });
        if (res.code != 200) {
          this.$message.error(res.message);
        } else {
          this.$message({
            message: "已领取",
            type: "success"
          });
        }
      });
      // this.$message({
      //   message: '已领取',
      //   type: "success"
      // });
      this.yhqdialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #ffffff;
}
.nav1 {
  display: flex;
  .nav1Img.one {
    width: 67%;
    // height: 200px;
    height: 770px;
    // object-fit: cover;
    margin-right: 20px;
  }
  .nav1Img {
    height: 375px;
    width: 100%;
    // height: 200px;
    object-fit: cover;
  }
  .nav1Img.mt {
    margin-top: 20px;
  }
  .flex {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
}
.nav2 {
  margin-top: 20px;
  background-image: url("../../assets/img/zu7.png");
  background-size: 100% 100%;
  width: calc(95% - 240px);
  height: 120px;
  margin: 20px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;
  .yhqItem {
    margin-right: 120px;
    // width: 238px;
    width: 384px;
    height: 112px;
    background-image: url("../../assets/img/yjjx4.png");
    background-size: 100% 100%;
    position: relative;
    .n2-txtt1 {
      position: absolute;
      top: 40px;
      left: 12px;
      font-size: 15px;
      font-family: PingFang SC;
      text-align: left;
      color: #000000;
      line-height: 20px;
      letter-spacing: -1.2px;
    }
    .n2-txtt2 {
      position: absolute;
      top: 30px;
      left: 28px;
      font-size: 65px;
      font-family: PingFang SC;
      text-align: left;
      color: #000000;
      line-height: 10px;
      letter-spacing: -5.2px;
    }
    .n2-txtt3 {
      position: absolute;
      top: 18px;
      // left: 100px;
      left: 180px;
      font-size: 18px;
      font-family: NotoSansHans-Bold;
      text-align: left;
      color: #282828;
      line-height: 23px;
      letter-spacing: -0.9px;
    }
    .n2-txtt4 {
      position: absolute;
      top: 44px;
      // left: 100px;
      left: 180px;
      font-size: 9px;
      font-family: NotoSansHans-Bold;
      text-align: left;
      color: #666666;
      line-height: 12px;
    }
    .n2-txtt5 {
      cursor: pointer;
      position: absolute;
      top: 16px;
      // left: 178px;
      left: 268px;
      width: 45px;
      height: 45px;
      background: #000000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .txt {
        width: 23px;
        height: 28px;
        font-size: 12px;
        font-family: NotoSansHans-Bold;
        text-align: left;
        color: #ffffff;
        line-height: 12px;
        letter-spacing: -0.96px;
      }
    }
    .n2-txtt6 {
      position: absolute;
      top: 82px;
      left: 76px;
      font-size: 15px;
      font-family: NotoSansHans-Bold;
      text-align: left;
      color: #3d3e4d;
      line-height: 15px;
    }
  }
  .n2-btn {
    cursor: pointer;
    width: 243px;
    height: 60px;
    background: linear-gradient(90deg, #ccaf89, #ffd8a4);
    border-radius: 3px;
    font-size: 24px;
    font-family: Source Han Sans CN, Source Han Sans CN-Heavy;
    font-weight: 800;
    text-align: left;
    color: #000000;
    line-height: 60px;
    text-align: center;
  }
}
.nav3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  .txt1 {
    font-size: 30px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    color: #000000;
    line-height: 66px;
    margin: 106px 0 36px 0;
  }
  .txt2 {
    text-align: center;
    width: 418px;
    height: 50px;
    font-size: 14px;
    color: #000000;
    line-height: 30px;
  }
  .tit3 {
    margin-top: 36px;
    margin: 36px 60px 0 60px;
    display: flex;
    align-items: center;
    // margin: 0 124px;
    width: 90%;
    justify-content: space-around;
    .item {
      cursor: pointer;
      width: calc(100% / 5);
      display: flex;
      margin: 0 30px;
      flex-direction: column;
      align-items: center;
      .pic1 {
        width: 216px;
        min-height: 216px;
        border-radius: 50%;
        // object-fit: cover;
      }
      .i-txt1 {
        margin-top: 30px;
        font-size: 30px;
        font-family: PingFang SC, PingFang SC-Heavy;
        font-weight: 800;
        color: #000000;
      }
    }
  }
}
.nav4 {
  margin-top: 100px;
  padding: 0 60px;
  .anLeft {
    width: 50px;
    height: 148px;
    background: #1e1f33;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon-arrow-left {
      font-size: 20px;
      color: #ffa000;
      font-weight: 700;
    }
    .el-icon-arrow-right {
      font-size: 20px;
      color: #ffa000;
      font-weight: 700;
    }
  }
  .n4-left {
    background-image: url("../../assets/img/zu8.png");
    background-size: 100% 100%;
    width: 100%;
    height: 427px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .n4-txt1 {
      width: 118px;
      height: 153px;
      font-size: 59px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: center;
      color: #ffffff;
      line-height: 70px;
    }
    .n4-txt2 {
      font-size: 24px;
      text-align: center;
      color: #ffffff;
      margin-top: 78px;
      cursor: pointer;
    }
  }
  .flexd {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .swItem {
    width: 25%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    .sw-pic1 {
      width: 80%;
      object-fit: cover;
    }
    .sw-txt1 {
      // margin-top: 43px;
      margin-bottom: 25px;
      font-size: 16px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 400;
      color: #707070;
    }
    .sw-txt2 {
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #e61717;
    }
  }
}
.nav5 {
  margin: 100px 60px 0 60px;
  .n5-pic {
    cursor: pointer;
    width: 100%;
    // object-fit: cover;
    height: 669px;
  }
}
.nav6 {
  margin-top: 100px;
  .tit1 {
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .n6-xg {
      width: 18px;
      height: 42px;
    }
    .n6-txt1 {
      margin: 0 30px;
      font-size: 30px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #000000;
    }
  }
  .flexd {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 20px;
  }
  .swItem {
    width: 25%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    .sw-pic1 {
      width: 80%;
      object-fit: cover;
    }
    .sw-txt1 {
      margin-top: 43px;
      margin-bottom: 25px;
      font-size: 16px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 400;
      color: #707070;
    }
    .sw-txt2 {
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #e61717;
    }
  }
}
.seeMore {
  font-family: PingFang SC, PingFang SC-常规体;
  width: 222px;
  height: 68px;
  background: #ffffff;
  border: 1px solid #1e1f33;
  margin: 54px auto 0 auto;
  font-size: 16px;
  text-align: center;
  color: #1e1f33;
  line-height: 68px;
  cursor: pointer;
}
.nav7 {
  margin: 100px 160px;
  .n7-box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .tit1 {
      width: 26%;
      // width: 420px;
      height: 104px;
      background: #f5f5f7;
      font-size: 30px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #969699;
      line-height: 104px;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  .logo-pic {
    width: 520px;
    height: 218px;
  }
}
.nav8 {
  // margin: 0 60px;
  margin-top: 60px;
  .n8-pic {
    cursor: pointer;
    width: 100%;
    height: 398px;
    object-fit: cover;
  }
}
.nav9 {
  margin-top: 100px;
  .tit1 {
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .n6-xg {
      width: 18px;
      height: 42px;
    }
    .n6-txt1 {
      margin: 0 30px;
      font-size: 30px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #000000;
    }
  }
  .n9-box {
    margin: 0 60px;
    width: 100%;
    height: 713px;
    background: #f5f5f7;
    .n9-left {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 130px;
      .top {
        .pic {
          width: 478px;
          height: 163px;
        }
      }
      .down {
        margin-top: 120px;
        display: flex;
        align-items: center;
        .n9d-item {
          margin: 0 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .pic {
            width: 175px;
            height: 175px;
          }
          .n9d-txt {
            margin-top: 10px;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #707070;
          }
        }
      }
    }
    .n9-right {
      display: flex;
      flex-wrap: wrap;
      margin-top: 26px;
      justify-content: center;
      .swItem {
        &:nth-child(2) {
          margin-left: 40px;
        }
        &:nth-child(4) {
          margin-left: 40px;
          margin-top: 20px;
        }
        &:nth-child(3) {
          margin-top: 20px;
        }
        width: 38%;
        height: 320px;
        background: #ffffff;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        .sw-pic1 {
          width: 80%;
          object-fit: cover;
          // height: 180px;
        }
        .sw-txt1 {
          // margin-top: 43px;
          margin-bottom: 25px;
          font-size: 16px;
          font-family: Segoe UI, Segoe UI-Regular;
          font-weight: 400;
          color: #707070;
        }
        .sw-txt2 {
          font-size: 28px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #e61717;
        }
      }
    }
  }
}
.nav10 {
  position: relative;
  margin-top: 100px;
  width: 100%;
  height: 343px;
  background: linear-gradient(180deg, #292929, #1c1c1c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .n10-txt1 {
    position: absolute;
    top: 80px;
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #ffffff;
    line-height: 2px;
  }
  .n10-txt2 {
    position: absolute;
    z-index: 1;
    top: 134px;
    width: 882px;
    height: 145px;
    font-size: 18px;
    color: #ffffff;
    line-height: 40px;
  }
  .n10-txt3 {
    position: absolute;
    z-index: 0;
    bottom: 70px;
    font-size: 151px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #333334;
    line-height: 12px;
  }
}
.nav11 {
  display: flex;
  align-items: center;
  height: 150px;
  margin-left: 60px;
  .n11-left {
    width: 100%;
    display: flex;
    align-items: center;
    .n11-txt {
      width: 420px;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #1f1f33;
      margin-right: 30px;
      line-height: 40px;
    }
    /deep/ .el-input-group {
      width: 30%;
    }
  }
  .n11-right {
    width: 100%;
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    color: #1f1f33;
    line-height: 40px;
  }
}
.nav12 {
  padding: 35px 60px;
  height: 436px;
  background: #fafafa;
  .n12-tit {
    .txt {
      // cursor: pointer;
      font-size: 16px;
      text-align: left;
      color: #1f1f33;
      line-height: 40px;
    }
  }
  .n12-right {
    .n12r-txt {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: left;
      color: #1f1f33;
      line-height: 40px;
    }
    .n12-box {
      margin-top: 12px;
      width: 200px;
      height: 48px;
      background: #000000;
      border-radius: 24px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      line-height: 48px;
    }
  }
}
.nav13 {
  height: 122px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  justify-content: space-between;
  .n13-pic {
    width: 447px;
    height: 44px;
  }
  .n13-txt {
    font-size: 16px;
    color: #000000;
    line-height: 40px;
  }
}
.yhqDia {
  display: flex;
  flex-direction: column;
  align-items: center;
  .txt {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #1e1f33;
    margin-bottom: 38px;
  }
  .box {
    position: relative;
    width: 352px;
    height: 98px;
    background-image: url("../../assets/img/zu183.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    margin: 6px 0;
    .left {
      width: 166px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateY(-4px);
      .l-txt1 {
        font-size: 35px;
        font-family: NotoSansHans-Bold;
        color: #ffb300;
        letter-spacing: 1.75px;
      }
      .l-txt2 {
        margin-top: 4px;
        font-size: 20px;
        font-family: NotoSansHans-Bold;
        color: #000000;
        letter-spacing: 0.2px;
      }
    }
    .right {
      transform: translateY(-4px);
      width: 180px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .l-txt1 {
        font-size: 36px;
        font-family: NotoSansHans-Bold;
        color: #f1291d;
        letter-spacing: -0.9px;
        .sp {
          font-size: 16px;
          font-family: NotoSansHans-Bold;
          color: #f1291d;
          letter-spacing: 1.7px;
        }
      }
      .l-txt2 {
        margin-top: 6px;
        font-size: 12px;
        font-family: NotoSansHans-Bold;
        text-align: left;
        color: #2c2c2c;
        letter-spacing: 0.72px;
      }
    }
  }
  .btn {
    width: 325px;
    height: 80px;
    background: #000000;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 80px;
    margin: 30px 0;
    cursor: pointer;
  }
}
</style>