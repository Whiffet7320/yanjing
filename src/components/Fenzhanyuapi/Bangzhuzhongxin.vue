<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：帮助中心-帮助中心</div>
      <div class="nav2">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="系统公告" name="3">
            <div class="xtgg">
              <div class="nav1" v-if="!Bangzhuzhongxinxiangqin">
                <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
                <div class="txt1">最新通知</div>
                <div class="bt1" @click="onfabu">
                  <div :class="{ txt: true, active: fabu == 1 }">最新发布</div>
                  <img
                    class="pic"
                    v-if="fabu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
                <div class="bt1 bt2" @click="onpaixu">
                  <div :class="{ txt: true, active: morenpaixu == 1 }">
                    默认排序
                  </div>
                  <img
                    class="pic"
                    v-if="morenpaixu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
              </div>
              <div v-else class="nav11" @click="toBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <template v-if="!Bangzhuzhongxinxiangqin">
                <div class="nav2" v-for="(item, i) in tabData1" :key="i">
                  <div class="tit1">
                    <div class="txt1">通知：{{ item.title }}</div>
                    <div class="txt2">{{ item.ctime }}</div>
                  </div>
                  <div class="tit2">
                    <div class="txt1">
                      {{ item.brief }}
                    </div>
                    <div class="txt2" @click="toXiangqin(item.id)">
                      查看详情
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="nav3">
                <div class="tit1">
                  通知：{{ Bangzhuzhongxinxiangqin.title }}
                </div>
                <div class="tit2">
                  <div class="txt1">
                    来源：{{ Bangzhuzhongxinxiangqin.title1 }}
                  </div>
                  <div class="txt1">
                    发布时间:{{ Bangzhuzhongxinxiangqin.title2 }}
                  </div>
                  <div class="txt1">
                    浏览量:{{ Bangzhuzhongxinxiangqin.title3 }}
                  </div>
                </div>
                <div v-html="Bangzhuzhongxinxiangqin.title4" class="tit3">
                  {{ Bangzhuzhongxinxiangqin.title4 }}
                </div>
                <!-- <div v-html="Bangzhuzhongxinxiangqin11" class="tit3">
                  {{ Bangzhuzhongxinxiangqin.title4 }}
                </div> -->
              </div>
              <!-- 分页 -->
              <div v-if="!Bangzhuzhongxinxiangqin" class="nav4">
                <div class="tit">相符商品共{{ total }}件</div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="this.lipingshangchengPage"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="total"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新闻资讯" name="4">
            <div class="xtgg">
              <div class="nav1" v-if="!Bangzhuzhongxinxiangqin">
                <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
                <div class="txt1">最新通知</div>
                <div class="bt1" @click="onfabu">
                  <div :class="{ txt: true, active: fabu == 1 }">最新发布</div>
                  <img
                    class="pic"
                    v-if="fabu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
                <div class="bt1 bt2" @click="onpaixu">
                  <div :class="{ txt: true, active: morenpaixu == 1 }">
                    默认排序
                  </div>
                  <img
                    class="pic"
                    v-if="morenpaixu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
              </div>
              <div v-else class="nav11" @click="toBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <template v-if="!Bangzhuzhongxinxiangqin">
                <div class="nav2" v-for="(item, i) in tabData1" :key="i">
                  <div class="tit1">
                    <div class="txt1">通知：{{ item.title }}</div>
                    <div class="txt2">{{ item.ctime }}</div>
                  </div>
                  <div class="tit2">
                    <div class="txt1">
                      {{ item.brief }}
                    </div>
                    <div class="txt2" @click="toXiangqin(item.id)">
                      查看详情
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="nav3">
                <div class="tit1">
                  通知：{{ Bangzhuzhongxinxiangqin.title }}
                </div>
                <div class="tit2">
                  <div class="txt1">
                    来源：{{ Bangzhuzhongxinxiangqin.title1 }}
                  </div>
                  <div class="txt1">
                    发布时间:{{ Bangzhuzhongxinxiangqin.title2 }}
                  </div>
                  <div class="txt1">
                    浏览量:{{ Bangzhuzhongxinxiangqin.title3 }}
                  </div>
                </div>
                <div v-html="Bangzhuzhongxinxiangqin.title4" class="tit3">
                  {{ Bangzhuzhongxinxiangqin.title4 }}
                </div>
              </div>
              <!-- 分页 -->
              <div v-if="!Bangzhuzhongxinxiangqin" class="nav4">
                <div class="tit">相符商品共{{ total }}件</div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="this.lipingshangchengPage"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="total"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="行业资讯" name="5">
            <div class="xtgg">
              <div class="nav1" v-if="!Bangzhuzhongxinxiangqin">
                <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
                <div class="txt1">最新通知</div>
                <div class="bt1" @click="onfabu">
                  <div :class="{ txt: true, active: fabu == 1 }">最新发布</div>
                  <img
                    class="pic"
                    v-if="fabu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
                <div class="bt1 bt2" @click="onpaixu">
                  <div :class="{ txt: true, active: morenpaixu == 1 }">
                    默认排序
                  </div>
                  <img
                    class="pic"
                    v-if="morenpaixu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
              </div>
              <div v-else class="nav11" @click="toBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <template v-if="!Bangzhuzhongxinxiangqin">
                <div class="nav2" v-for="(item, i) in tabData1" :key="i">
                  <div class="tit1">
                    <div class="txt1">通知：{{ item.title }}</div>
                    <div class="txt2">{{ item.ctime }}</div>
                  </div>
                  <div class="tit2">
                    <div class="txt1">
                      {{ item.brief }}
                    </div>
                    <div class="txt2" @click="toXiangqin(item.id)">
                      查看详情
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="nav3">
                <div class="tit1">
                  通知：{{ Bangzhuzhongxinxiangqin.title }}
                </div>
                <div class="tit2">
                  <div class="txt1">
                    来源：{{ Bangzhuzhongxinxiangqin.title1 }}
                  </div>
                  <div class="txt1">
                    发布时间:{{ Bangzhuzhongxinxiangqin.title2 }}
                  </div>
                  <div class="txt1">
                    浏览量:{{ Bangzhuzhongxinxiangqin.title3 }}
                  </div>
                </div>
                <div v-html="Bangzhuzhongxinxiangqin.title4" class="tit3">
                  {{ Bangzhuzhongxinxiangqin.title4 }}
                </div>
              </div>
              <!-- 分页 -->
              <div v-if="!Bangzhuzhongxinxiangqin" class="nav4">
                <div class="tit">相符商品共{{ total }}件</div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="this.lipingshangchengPage"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="total"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="常见问题" name="6">
            <div class="xtgg">
              <div class="nav1" v-if="!Bangzhuzhongxinxiangqin">
                <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
                <div class="txt1">最新通知</div>
                <div class="bt1" @click="onfabu">
                  <div :class="{ txt: true, active: fabu == 1 }">最新发布</div>
                  <img
                    class="pic"
                    v-if="fabu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
                <div class="bt1 bt2" @click="onpaixu">
                  <div :class="{ txt: true, active: morenpaixu == 1 }">
                    默认排序
                  </div>
                  <img
                    class="pic"
                    v-if="morenpaixu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
              </div>
              <div v-else class="nav11" @click="toBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <template v-if="!Bangzhuzhongxinxiangqin">
                <div class="nav2" v-for="(item, i) in tabData1" :key="i">
                  <div class="tit1">
                    <div class="txt1">通知：{{ item.title }}</div>
                    <div class="txt2">{{ item.ctime }}</div>
                  </div>
                  <div class="tit2">
                    <div class="txt1">
                      {{ item.brief }}
                    </div>
                    <div class="txt2" @click="toXiangqin(item.id)">
                      查看详情
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="nav3">
                <div class="tit1">
                  通知：{{ Bangzhuzhongxinxiangqin.title }}
                </div>
                <div class="tit2">
                  <div class="txt1">
                    来源：{{ Bangzhuzhongxinxiangqin.title1 }}
                  </div>
                  <div class="txt1">
                    发布时间:{{ Bangzhuzhongxinxiangqin.title2 }}
                  </div>
                  <div class="txt1">
                    浏览量:{{ Bangzhuzhongxinxiangqin.title3 }}
                  </div>
                </div>
                <div v-html="Bangzhuzhongxinxiangqin.title4" class="tit3">
                  {{ Bangzhuzhongxinxiangqin.title4 }}
                </div>
              </div>
              <!-- 分页 -->
              <div v-if="!Bangzhuzhongxinxiangqin" class="nav4">
                <div class="tit">相符商品共{{ total }}件</div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="this.lipingshangchengPage"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="total"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关于我们" name="7">
            <div class="gywm">
              <div class="nav1" v-if="!guanyuwomenxiangqin">
                <div class="bt1" @click="onfabu">
                  <div :class="{ txt: true, active: fabu == 1 }">最新发布</div>
                  <img
                    class="pic"
                    v-if="fabu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
                <div class="bt1 bt2" @click="onpaixu">
                  <div :class="{ txt: true, active: morenpaixu == 1 }">
                    默认排序
                  </div>
                  <img
                    class="pic"
                    v-if="morenpaixu == 1"
                    src="../../assets/newImg/zu69.png"
                    alt=""
                  />
                  <img
                    class="pic"
                    v-else
                    src="../../assets/newImg/zu71.png"
                    alt=""
                  />
                </div>
              </div>
              <div v-else class="nav11" @click="toguanyuwomenBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <template v-if="!guanyuwomenxiangqin">
                <div class="nav2">
                  <div class="tit1">
                    <div class="txt1">
                      <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
                      <div class="txt1-1">关于我们</div>
                    </div>
                    <div class="txt2">2021-06-21 03:31</div>
                  </div>
                  <div class="tit2">
                    <div class="txt1">
                      礼品代发平台成立于2018年是一家专业的小礼品代发平台，专注为商家提供一系列礼品代发服务，一件代发，共享云仓，全国包邮，公司主营业务有电商系列软件开发，礼品代发，电商工具箱等，致力于打造一站式电商服务平台体系，为商家提供更便捷的一站式服务。
                    </div>
                    <div class="txt2" @click="togywmXiangqin">查看详情</div>
                  </div>
                </div>
              </template>
              <div v-else class="nav3">
                <div class="tit1">{{ guanyuwomenxiangqin.title }}</div>
                <div class="tit2">
                  <div class="txt1">{{ guanyuwomenxiangqin.title1 }}</div>
                  <div class="txt1">{{ guanyuwomenxiangqin.title2 }}</div>
                  <div class="txt1">{{ guanyuwomenxiangqin.title3 }}</div>
                </div>
                <div class="tit3">{{ guanyuwomenxiangqin.title4 }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Aside from "../Aside";
export default {
  components: {
    Aside,
  },
  computed: {
    ...mapState(["lipingshangchengPage", "myactiveName"]),
  },
  watch: {
    lipingshangchengPage: function (page) {
      this.$store.commit("lipingshangchengPage", page);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      fabu: 1,
      morenpaixu: 0,
      Bangzhuzhongxinxiangqin: null,
      guanyuwomenxiangqin: null,
      tabData1: [],
      total: 0,
      sort: "desc",
    };
  },
  created() {
    if (this.myactiveName) {
      console.log(this.myactiveName);
      this.activeName = this.myactiveName;
    }
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.ArticleList({
        token: sessionStorage.getItem("token"),
        type_id: this.activeName,
        page: 1,
        limit: 10,
        sort: this.sort,
      });
      console.log(res);
      this.tabData1 = res.data.data;
      this.total = res.data.total;
    },
    handleClick(tab) {
      console.log(tab);
      this.$store.commit("lipingshangchengPage", 1);
      this.getData();
      this.Bangzhuzhongxinxiangqin = null;
    },
    onfabu() {
      if (this.fabu == 1) {
        this.fabu = 0;
        this.sort = "asc";
      } else {
        this.fabu = 1;
        this.sort = "desc";
      }
      this.getData();
    },
    onpaixu() {
      if (this.morenpaixu == 1) {
        this.morenpaixu = 0;
        this.sort = "asc";
      } else {
        this.morenpaixu = 1;
        this.sort = "desc";
      }
      this.getData();
    },
    async toXiangqin(id) {
      this.Bangzhuzhongxinxiangqin = {};
      // this.Bangzhuzhongxinxiangqin = {
      //   title: "通知：广州荔湾区暂时无法发货",
      //   title1: "来源：云仓包裹",
      //   title2: "发布时间:2021-06-21 12:11",
      //   title3: "浏览量:100次",
      //   title4: "发货地址:王先生 17656543657 广东省荔湾区竹料商贸城",
      // };
      const res = await this.$api.ArticleInfo({
        token: sessionStorage.getItem("token"),
        id: id,
      });
      console.log(res);
      this.$set(this.Bangzhuzhongxinxiangqin, "title", res.data.title);
      this.$set(this.Bangzhuzhongxinxiangqin, "title1", res.data.source);
      this.$set(this.Bangzhuzhongxinxiangqin, "title2", res.data.ctime);
      this.$set(this.Bangzhuzhongxinxiangqin, "title3", res.data.pv);
      this.$set(this.Bangzhuzhongxinxiangqin, "title4", res.data.content);
    },
    togywmXiangqin() {
      this.guanyuwomenxiangqin = {
        title: "关于我们",
        title1: "来源：云仓包裹",
        title2: "发布时间:2021-06-21 12:11",
        title3: "浏览量:100次",
        title4:
          "礼品代发平台成立于2018年是一家专业的小礼品代发平台，专注为商家提供一系列礼品代发服务，一件代发，共享云仓，全国包邮，公司主营业务有电商系列软件开发，礼品代发，电商工具箱等，致力于打造一站式电商服务平台体系，为商家提供更便捷的一站式服务。",
      };
    },
    toguanyuwomenBack() {
      this.guanyuwomenxiangqin = null;
    },
    toBack() {
      this.Bangzhuzhongxinxiangqin = null;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lipingshangchengPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.fzindex {
  display: flex;
}
.right {
  width: 100%;
  .nav1 {
    margin-left: 16px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #868686;
  }
  .nav2 {
    margin-top: 26px;
    /deep/ .el-tabs__header {
      border: 0;
    }
    /deep/ .el-tabs__nav {
      border: 0;
    }
    /deep/ .el-tabs__item:first-child {
      border-left: 0;
    }
    /deep/ .el-tabs__item {
      //   margin:0 20px !important;
      width: 222px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-left: 1px solid #c3c3c3;
      border-bottom: 0;
      // border-radius: 10px;
    }
    /deep/ .el-tabs__item.is-active {
      background: #ffffff;
      // box-shadow: inset 0px 0 16px 2px #dddddd !important;
      background-image: url("../../assets/newImg/kk100.png");
      background-size: 100% 100%;
      color: #000000;
    }
  }
  .xtgg {
    margin-top: 10px;
    .nav1 {
      display: flex;
      align-items: center;
      .shu {
        margin-left: 10px;
        width: 5px;
        height: 27px;
        background: #ea8e11;
      }

      .txt1 {
        opacity: 1;
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
        margin-left: 12px;
      }
      .bt1.bt2 {
        margin-left: 20px;
      }
      .bt1 {
        cursor: pointer;
        margin-left: 800px;
        display: flex;
        align-items: center;
        .txt {
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 700;
          color: #707071;
        }
        .txt.active {
          color: #ea8e11;
        }
        .pic {
          margin-left: 4px;
          width: 6px;
          height: 10px;
          opacity: 1;
        }
      }
    }
    .nav11 {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .pic1 {
        width: 18px;
        height: 18px;
        opacity: 1;
      }
      .txt1 {
        margin-left: 12px;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #b9b9b9;
      }
    }
    .nav2 {
      position: relative;
      width: 100%;
      height: 208px;
      opacity: 1;
      background: #ffffff;
      border-radius: 8px;
      // box-shadow: inset 0px 0 20px 2px #dddddd !important;
      background-image: url("../../assets/newImg/kk100.png");
      background-size: 100% 100%;
      .tit1 {
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 60px;
        border-bottom: 1px solid #e5e5e5;
        .txt1 {
          opacity: 1;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
        }
        .txt2 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          color: #868686;
        }
      }
      .tit2 {
        margin: 0 60px;
        .txt1 {
          margin-top: 16px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #000000;
        }
        .txt2 {
          position: absolute;
          right: 60px;
          bottom: 30px;
          cursor: pointer;
          margin-top: 25px;
        }
        .txt2:hover {
          color: #ea8e11;
        }
      }
    }
    .nav3 {
      width: 100%;
      height: 208px;
      opacity: 1;
      background: #ffffff;
      border-radius: 8px;
      // box-shadow: inset 0px 0 20px 2px #dddddd !important;
      background-image: url("../../assets/newImg/kk100.png");
      background-size: 100% 100%;
      .tit1 {
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #ea8e11;
      }
      .tit2 {
        padding-bottom: 34px;
        border-bottom: 1px dashed #c3c3c3;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .txt1 {
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          color: #868686;
        }
      }
      .tit3 {
        margin: 27px 43px 0 43px;
        font-size: 16px;
        font-family: zw;
        font-weight: 400;
        color: #000000;
      }
    }
  }
  .gywm {
    margin-top: 10px;
    .nav1 {
      display: flex;
      align-items: center;
      .bt1.bt2 {
        margin-left: 20px;
      }
      .bt1 {
        margin-top: 6px;
        cursor: pointer;
        margin-left: 920px;
        display: flex;
        align-items: center;
        .txt {
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 700;
          color: #707071;
        }
        .txt.active {
          color: #ea8e11;
        }
        .pic {
          margin-left: 4px;
          width: 6px;
          height: 10px;
          opacity: 1;
        }
      }
    }
    .nav11 {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .pic1 {
        width: 18px;
        height: 18px;
        opacity: 1;
      }
      .txt1 {
        margin-left: 12px;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #b9b9b9;
      }
    }
    .nav2 {
      position: relative;
      width: 100%;
      height: 208px;
      opacity: 1;
      background: #ffffff;
      border-radius: 8px;
      // box-shadow: inset 0px 0 20px 2px #dddddd !important;
      background-image: url("../../assets/newImg/kk100.png");
      background-size: 100% 100%;
      .tit1 {
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 60px;
        border-bottom: 1px solid #e5e5e5;
        .txt1 {
          display: flex;
          align-items: center;
          .shu {
            margin-left: -30px;
            width: 5px;
            height: 27px;
            background: #ea8e11;
          }

          .txt1-1 {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #000000;
            margin-left: 25px;
          }
        }
        .txt2 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          color: #868686;
        }
      }
      .tit2 {
        margin: 0 60px;
        .txt1 {
          margin-top: 16px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #000000;
        }
        .txt2 {
          position: absolute;
          right: 60px;
          bottom: 30px;
          cursor: pointer;
          margin-top: 25px;
        }
        .txt2:hover {
          color: #ea8e11;
        }
      }
    }
    .nav3 {
      width: 100%;
      height: 258px;
      opacity: 1;
      background: #ffffff;
      border-radius: 8px;
      // box-shadow: inset 0px 0 20px 2px #dddddd !important;
      background-image: url("../../assets/newImg/kk100.png");
      background-size: 100% 100%;
      .tit1 {
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #ea8e11;
      }
      .tit2 {
        padding-bottom: 34px;
        border-bottom: 1px dashed #c3c3c3;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .txt1 {
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          color: #868686;
        }
      }
      .tit3 {
        margin: 27px 43px 0 43px;
        font-size: 16px;
        font-family: zw;
        font-weight: 400;
        color: #000000;
      }
    }
  }
}
.nav4 {
  margin-top: 16px;
  margin-left: 6px;
  display: flex;
  align-items: center;
  /deep/ .el-pager .active {
    background-color: #ea8e11 !important;
  }
}
</style>