<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">客服系统</div>
    </div>
    <div class="websocket">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div id="dplayer1"></div>
      </el-dialog>
      <div class="webSocketWrapper">
        <div class="wxchatBorderLeft">
          <el-row>
            <div style="padding: 10px">
              <div style="display: inline-block">
                <el-input
                  class="searchInp"
                  placeholder="搜索"
                  prefix-icon="el-icon-search"
                  v-model="input2"
                  size="mini"
                >
                </el-input>
              </div>
            </div>
          </el-row>

          <el-row class="userList">
            <div
              v-for="(ele, index) in searchListArr"
              :key="index"
              @click="userClick(ele, index)"
              class="user"
            >
              <el-col :span="24" ref="userActive">
                <div style="display: inline-block; padding: 12px">
                  <!--  -->
                  <el-badge :is-dot="ele.isDot == true"
                    ><el-avatar shape="square" :src="ele.head_pic"></el-avatar
                  ></el-badge>
                </div>

                <div style="display: inline-block" class="leftUser_input">
                  <el-col>
                    <div class="wxchatPeople">{{ ele.nick_name }}</div>
                  </el-col>

                  <el-col>
                    <div class="wxchatNews">{{ ele.content }}</div>
                  </el-col>
                </div>
              </el-col>
            </div>
          </el-row>
        </div>

        <div class="leftContent" v-loading="loading">
          <div class="wxchatBorderRightTop">
            <div style="float: right; padding: 5px" class="close">
              <i class="el-icon-close" style="font-size: 10px"></i>
            </div>

            <div class="wxchatName">{{ contentChat.nick_name }}</div>

            <!-- <div class="wxchatMore">
            <i class="el-icon-more"></i>
          </div> -->
          </div>

          <div class="wxchatBorderRightMid" ref="wxchatBorderRightMid">
            <div v-for="(ele, index) in historyMassage" :key="index">
              <!-- 右侧 -->
              <div
                style="margin-left: 30px; margin-top: 15px"
                v-if="ele.send_id == 's_35'"
              >
                <div align="center" style="padding: 15px 0">
                  <el-tag type="info" size="mini">{{ ele.myadd_time }}</el-tag>
                </div>

                <el-row>
                  <el-col :span="21">
                    <div class="chatPop2">
                      <span class="popspan" style="line-height: 23px">
                        <viewer>
                          <img
                            :src="ele.content"
                            class="img_cyy"
                            v-if="ele.type == 1"
                          />
                          <div class="dplayer" v-else-if="ele.type == 3"></div>
                          <p v-else>{{ ele.content }}</p>
                        </viewer>
                      </span>
                    </div>
                  </el-col>

                  <el-col :span="2">
                    <el-avatar
                      shape="square"
                      :src="ele.head_pic"
                      style="width: 35px; height: 35px"
                    ></el-avatar>
                  </el-col>
                </el-row>
              </div>
              <!-- 左侧 -->
              <div style="margin-left: 30px; margin-top: 15px" v-else>
                <div align="center" style="padding: 15px 0">
                  <el-tag type="info" size="mini">{{ ele.myadd_time }}</el-tag>
                </div>

                <el-row>
                  <el-col :span="2">
                    <el-avatar
                      shape="square"
                      :src="ele.head_pic"
                      style="width: 35px; height: 35px"
                    ></el-avatar>
                  </el-col>

                  <el-col :span="12">
                    <div class="chatPop1">
                      <span class="popspan" style="line-height: 23px">
                        <viewer>
                          <img
                            :src="ele.content"
                            class="img_cyy"
                            v-if="ele.type == 1"
                          />
                          <p v-else-if="ele.type == 11">
                            <img
                              :src="ele.content.goods_image"
                              class="img_cyy"
                            />
                            <span class="spanRed popspan"
                              >¥{{ ele.content.shop_price }}</span
                            >
                            <span class="type11Span popspan">{{
                              ele.content.goods_name
                            }}</span>
                          </p>
                          <div
                            class="posRelative"
                            v-else-if="ele.type == 3"
                            @click="dialogV(ele)"
                          >
                            <div class="dplayer"></div>
                            <i class="el-icon-video-play"></i>
                          </div>
                          <p v-else>{{ ele.content }}</p>
                        </viewer>
                        <!--  -->
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <div class="wxchatBorderRightBottom">
            <div class="wxchatIcon1">
              <el-popover placement="top" width="218" v-model="visible">
                <p>请选择上传方式：</p>
                <div style="text-align: left; margin-top: 10px">
                  <el-button size="mini" type="primary" @click="company"
                    >本地上传</el-button
                  >
                  <el-button type="primary" size="mini" @click="popInps"
                    >输入网络资源地址</el-button
                  >
                  <el-input
                    style="margin-top: 10px; width: 160px"
                    v-model="oppinput"
                    placeholder="请输入资源地址"
                    v-if="popInp"
                  ></el-input>
                  <el-button
                    style="margin-top: 22px; float: right"
                    size="mini"
                    type="test"
                    @click="Inpcompany"
                    v-if="popInp"
                    >上传</el-button
                  >
                </div>
                <i
                  class="el-icon-picture"
                  slot="reference"
                  @click="popInps2"
                ></i>
              </el-popover>
              <!-- <i class="el-icon-picture" @click="company"></i> -->
              <input
                type="file"
                name="companyLogo"
                id="file0"
                class="displayN"
                multiple="multiple"
                @change="companyLogo($event)"
                ref="fileInput"
              />
              <el-button
                type="primary"
                class="displayN"
                @click="uploading(true)"
                >保存</el-button
              >
            </div>

            <div style="margin: -2px 15px">
              <el-input
                ref="sayInput"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3 }"
                placeholder=""
                v-model="inputValue"
                resize="none"
                autofocus
                maxlength="500"
                @keyup.enter.native="sendBtn"
              >
              </el-input>
            </div>

            <div class="sendButton" @click="sendBtn">
              <el-button size="mini">发送 (Enter)</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      mysrcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      srcList: [], //放大后的图片数组
      inputValueImg: "", //上传链接地址的input
      oppinput: "",
      popInp: false,
      visible: false,
      imgFile: "",
      oss_imgurl: "",
      myCYYfile: null,
      fileList: [],
      ws: null,
      count: 0,
      userId: null, //当前用户ID
      list: [], //聊天记录的数组
      contentText: "", //input输入的值
      input2: "",
      squareUrl: "",
      textarea2: "",
      leftUserList: [], //左侧用户
      searchListArr: [], //根据搜索筛选后的左侧用户
      contentChat: {}, //右侧主聊天框
      historyMassage: null, //历史聊天记录
      inputValue: "",
      leftRight: [], //根据send_id渲染我和客户的对话框
      isDot: false, //未读消息小红点
      isDotList: [], //小红点列表
      webFlag: false,
      dplayerList: [],
      dialogVisible: false,
      dp: null,
    };
  },
  computed: {
    ...mapState(["client_id", "isDotNum", "sayObj"]),
  },
  created() {
    this.isDotList = this.isDotNum;
    console.log(this.client_id);
    this.$api.bindShop(this.client_id).then((res) => {
      //绑定client_id到shop_id
      console.log(res);
      this.getLeftUserList();
    });
    // this.getLeftUserList();
    // oss
  },
  mounted() {
    console.log(document.getElementById("dplayer1"));
    // console.log(document.getElementsByClassName('el-dialog__close')[0])
    // let closeBtn = document.getElementsByClassName('el-dialog__close')[0]
    // closeBtn.onclick = function(){
    //   console.log(1777)
    // }
  },
  watch: {
    dialogVisible: function () {
      if (this.dialogVisible == false) {
        this.dp.pause();
      }
    },
    "$store.state.isDotNum": function () {
      this.isDotList = this.$store.state.isDotNum;
      console.log(this.sayObj);
      this.userHistory();
      setTimeout(() => {
        console.log(1111221111);
        this.getLeftUserList();
      }, 500);
      console.log(this.isDotList.length);
      if (this.isDotList.length == 0) {
        this.$store.commit("overallIsDot", false);
        console.log("已空");
      }
      console.log(this.isDotList);
    },
    input2: function () {
      this.searchListArr = this.leftUserList.filter((ele) => {
        return ele.nick_name.indexOf(this.input2) != -1;
      });
    },
  },
  methods: {
    Inpcompany() {
      console.log(this.oppinput);
      this.sendBtn();
    },
    popInps2() {
      this.popInp = false;
    },
    popInps() {
      this.popInp = !this.popInp;
    },
    companyLogo(event) {
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        console.log(filetType);
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          this.uploading(true);
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        console.log(this.imgFile);
        this.$api.ossststoken().then((res) => {
          // console.log(res.data.data.date);
          let myData = res.data.data.date;
          let client = new window.OSS.Wrapper({
            region: "oss-cn-hangzhou", //oss地址
            accessKeyId: myData.Credentials.AccessKeyId, //ak
            accessKeySecret: myData.Credentials.AccessKeySecret, //secret
            stsToken: myData.Credentials.SecurityToken,
            bucket: "nxhzapp", //oss名字
          });
          // console.log(client);
          var imgtype = this.imgFile.type.substr(6, 4);
          var store = `images/${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then((res) => {
            //这个结果就是url
            console.log(res);
            var a = `http://nxhzapp.oss-cn-hangzhou.aliyuncs.com/${store}`;
            this.oss_imgurl = a;
            console.log(a); //图片url地址
            console.log(this.oss_imgurl);
            if (this.oss_imgurl == "") {
              this.$message({
                message: "不能发送空白信息",
                type: "warning",
              });
            } else {
              let obj = {};
              if (this.oss_imgurl != "") {
                obj = {
                  type: 1,
                  content: this.oss_imgurl,
                  user_id: this.contentChat.user_id,
                };
              } else {
                obj = {
                  type: 0,
                  content: this.inputValue,
                  user_id: this.contentChat.user_id,
                };
              }
              this.$api
                .userSay(obj)
                .then((res) => {
                  console.log(res);
                })
                .then(() => {
                  this.getLeftUserList();
                })
                .then(() => {
                  this.userHistory();
                })
                .then(() => {
                  this.oss_imgurl = "";
                });
            }
          });
        });
      }
    },
    // oss
    company() {
      this.$refs.fileInput.click();
      this.visible = false;
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    // oss
    userHistory() {
      //获取消息历史记录
      this.dplayerList = [];
      const historyObj = {
        user_id: this.contentChat.user_id,
        // between_time:,
        // is_read:,//是否已读
      };
      this.$api
        .userHistory(historyObj)
        .then((res) => {
          this.historyMassage = res.data.data;
          this.leftRight = [];
          this.historyMassage.forEach((ele) => {
            ele.myadd_time = this.formatDate(new Date(ele.add_time * 1000)); //聊天时间
            this.leftRight.push(ele.send_id);
            // var reg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
            // if (reg.test(ele.content)) {
            //   // ele.type = 1;
            // }
            // console.log(ele.type)
            if (ele.type == 11) {
              //链接（图片，价格，描述）
              ele.content = JSON.parse(ele.content);
              console.log(ele.content);
            } else if (ele.type == 3) {
              //视频
              this.dplayerList.push(ele);
            }
          });
          console.log(this.historyMassage, this.leftRight);
        })
        .then(() => {
          if (this.dplayerList) {
            console.log(this.dplayerList);
            this.dplayerList.forEach((ele, index) => {
              new this.$DPlayer({
                container: document.getElementsByClassName("dplayer")[index],
                screenshot: true,
                video: {
                  url: ele.content,
                },
                hotkey: false,
              });
            });
          }
        })
        .then(() => {
          setTimeout(() => {
            this.scrollBottm();
            this.loading = false;
          }, 500);
        });
    },
    dialogV(ele) {
      console.log(ele);
      this.dialogVisible = true;
      setTimeout(() => {
        // console.log(document.getElementById("dplayer1"));
        this.dp = new this.$DPlayer({
          container: document.getElementById("dplayer1"),
          screenshot: true,
          autoplay: true,
          video: {
            url: ele.content,
            // pic: "https://v-cdn.zjol.com.cn/280443.mp4",
            // thumbnails: "thumbnails.jpg",
          },
          hotkey: false,
          // danmaku: {
          //   id: "demo",
          //   api: "https://api.prprpr.me/dplayer/",
          // },
        });
      }, 300);
    },
    userClick(ele, index) {
      // 点击左侧用户列表
      this.loading = true;
      this.webFlag = false;
      console.log(ele, index);
      // this.isDotList[index] = "";
      console.log(this.isDotList);
      if (this.isDotList.length != 0) {
        // ******点击左侧用户列表后小红点消失且不重新跳到下面******
        this.isDotList = this.isDotList.filter((num) => {
          ele.isDot = false;
          return num != ele.user_id;
        });
      }
      console.log(this.isDotList);
      this.$store.commit("isDotNum", this.isDotList);
      this.contentChat = ele;
      this.userHistory();
      // this.getLeftUserList();
      // setTimeout(()=>{
      //   ele.isDot = false
      // },1000)
      // this.$refs.wxchatBorderRightMid.scrollTop = 0;
      console.log(this.$refs.userActive[index].$el.classList);
      this.$refs.userActive.forEach((item) => {
        item.$el.classList.remove("active");
      });
      this.$refs.userActive[index].$el.classList.add("active");
      // setTimeout(() => {
      //   this.scrollBottm();
      // }, 300);
    },
    async sendBtn() {
      //发送聊天内容
      // console.log(document.getElementsByClassName("el-upload-list__item-name"))
      if (this.oppinput != "") {
        // this.inputValue = this.oppinput
        console.log(this.oppinput);
      } else {
        this.inputValue = this.$refs.sayInput.$refs.textarea.value; //输入框的内容
      }
      console.log(this.inputValue == "\n");
      // if (e.keyCode == 13) {
      //   e.cancelBubble = true;
      //   e.preventDefault();
      //   e.stopPropagation();
      //   this.inputValue = "";
      // }
      let obj = {};
      if (this.oppinput == "") {
        if (this.inputValue == "\n" || this.inputValue == "") {
          this.$message({
            message: "不能发送空白信息",
            type: "warning",
          });
        } else {
          obj = {
            type: 0,
            content: this.inputValue,
            user_id: this.contentChat.user_id,
          };
          await this.$api
            .userSay(obj)
            .then((res) => {
              console.log(res);
            })
            .then(() => {
              this.getLeftUserList();
            })
            .then(() => {
              this.userHistory();
            });
        }
      } else {
        obj = {
          type: 1,
          content: this.oppinput,
          user_id: this.contentChat.user_id,
        };
        // this.srcList.push(this.oppinput);
        await this.$api
          .userSay(obj)
          .then((res) => {
            console.log(res);
          })
          .then(() => {
            this.getLeftUserList();
          })
          .then(() => {
            this.userHistory();
          })
          .then(() => {
            this.oppinput = "";
          });
      }
      this.$refs.sayInput.$refs.textarea.value = "";
      this.oss_imgurl = "";
    },
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // var g=1551334252272; //定义一个时间戳变量
    // var d=new Date(g);
    getLeftUserList() {
      this.$api.userList().then((res) => {
        //获取聊天用户列表
        console.log(res.data.data);
        this.leftUserList = [];
        res.data.data.forEach((ele, index) => {
          // console.log(ele.chat_info.content)//最后一条内容
          this.leftUserList.push(ele.user);
          this.leftUserList[index].content = ele.chat_info.content; //最后一条内容
          // formatDate(new Date(ele.chat_info.add_time))
          this.leftUserList[index].add_time = this.formatDate(
            new Date(ele.chat_info.add_time)
          ); //聊天时间
        });
        console.log(this.leftUserList);
        this.leftUserList.forEach((item, index) => {
          // if (item.user_id == this.isDotList) {
          //   console.log(item.user_id, item);
          //   item.isDot = true;
          // }
          if (this.isDotList.indexOf(item.user_id) != -1) {
            console.log(item.user_id, item);
            item.isDot = true;
          }
          if (item.isDot == true) {
            this.leftUserList.unshift(this.leftUserList.splice(index, 1)[0]);
          }
        });
        // this.leftUserList.forEach(item=>{
        //   // item.un_read_number
        // })
        this.searchListArr = this.leftUserList;
      });
    },
    // 滚动条到底部
    scrollBottm() {
      let el = this.$refs.wxchatBorderRightMid;
      el.scrollTop = el.scrollHeight;
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
.websocket{
    // transform: translateX(10px);
    transform: translateY(400px);
}
.websocket .img_cyy {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
.websocket .searchInp {
  transform: translateY(-4px);
}
.websocket .el-popover button {
  margin-top: 20px !important;
}
.websocket .displayN {
  display: none;
}
.websocket .upload-demo {
  height: 50px;
}
.websocket .el-upload-list {
  transform: translate(56px, -47px);
  width: 210px;
}
.websocket .chatBtn {
  transform: translate(54px, 106px);
}
/* .el-dialog__wrapper {
  position: relative !important;
}
.el-dialog__header {
  padding: 20px 20px 10px;
} */
.websocket {
  height: 100%;
  width: 100%;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.webSocketWrapper {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 798px;
}
.chatPop1 :hover {
  /* background-color: #fafafa; */
}
.chatPop1 .popspan {
  background-color: #fafafa;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 0 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
  -webkit-word-break: break-all;
  -moz-word-break: break-all;
  -ms-word-break: break-all;
  -o-word-break: break-all;
  word-break: break-all;
}
.chatPop1 .popspan::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #fff;
  position: absolute;
  top: 8px;
  left: -16px;
}
.chatPop1 .spanRed {
  color: #f40;
  border: 0px;
  margin: 0;
}
.chatPop1 .type11Span {
  border: 0px;
  margin: 0;
}
.chatPop1 .popspan.spanRed::after,
.chatPop1 .popspan.type11Span::after {
  content: "";
  border: 0px solid #ffffff00;
  border-right: 0px solid #fff;
  position: absolute;
  top: 8px;
  left: -16px;
}
.chatPop2 .popspan :hover {
  background-color: #2683f5;
}
.chatPop2 .popspan {
  background-color: #2683f5;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 15px 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
  float: right;
  color: #fff;
  -webkit-word-break: break-all;
  -moz-word-break: break-all;
  -ms-word-break: break-all;
  -o-word-break: break-all;
  word-break: break-all;
}
.chatPop2 .popspan::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #2683f5;
  position: absolute;
  top: 8px;
  right: -16px;
  transform: rotateY(180deg);
}
.custom {
  border: 0px solid blue;
  height: 670px;
  width: 795px;
}
.wxchatBorder {
  width: 795px;
  height: 670px;
  border: 1px solid red;
  margin-left: -20px;
  margin-top: -59.5px;
}
.wxchatBorderLeft {
  width: 250px;
  height: 670px;
  background-color: #eeebe9;
  border: 1px solid gray;
  display: inline-block;
  float: left;
  /* margin-top: -60px; */
}
.userList {
  position: absolute;
  top: 38px;
  width: 249px;
  height: 632px;
  overflow-y: scroll;
}
.userList .user div:hover {
  background-color: rgba(207, 209, 208, 1);
}
.userList .user .active {
  background-color: rgba(201, 199, 198, 1);
}
.userList .user .leftUser_input {
  width: calc(100% - 70px);
  transform: translateY(14px);
}
.el-dialog__body {
  position: relative;
}
.leftContent {
  position: absolute;
  /* top: -60px; */
  left: 252px;
  width: 543px;
}
.wxchatPeople {
  color: #000000;
  font-size: 14px;
}
.wxchatNews {
  color: #999;
  padding-top: 5px;
  font-size: 12px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wxchatName {
  color: #000000;
  font-size: 20px;
  float: left;
  padding-left: 30px;
  padding-top: 20px;
}
/* .wxchatMore {
  color: #999;
  font-size: 20px;
  float: right;
  margin-right: -15px;
  padding-top: 25px;
} */
.wxchatBorderRightTop {
  width: 545px;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e7e7e7;
  display: block;
  float: right;
  margin-right: -2px;
}
.wxchatBorderRightTop .close .el-icon-close {
  margin-right: 20px;
  font-size: 20px !important;
  margin-top: 16px;
}
.wxchatBorderRightMid {
  width: 545px;
  height: 428px;
  background-color: #f5f5f5;
  /* border: 2px solid deeppink; */
  display: block;
  margin-right: -2px;
  overflow-y: scroll;
}
.wxchatBorderRightBottom {
  width: 543px;
  height: 181px;
  background-color: #fff;
  border: 1px solid #eee;
  display: block;
  float: right;
  margin-right: -2px;
}
.wxchatIcon1 {
  display: inline-block;
  padding: 14px 10px 14px 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.wxchatIcon1 .el-icon-picture:hover {
  cursor: pointer;
  text-shadow: 0px 0px 5px rgb(189, 226, 255);
}
.sendButton {
  float: right;
  margin-top: 18px;
  margin-right: 28px;
}
.dplayer .dplayer-controller {
  display: none;
}
.dplayer .dplayer-controller-mask {
  display: none;
}
#dplayer1 .dplayer-controller {
  display: block;
}
#dplayer1 .dplayer-controller-mask {
  display: block;
}
.websocket .el-dialog__wrapper {
  max-height: 100%;
}
.websocket .el-dialog {
  width: 40% !important;
  /* max-height: 1000px; */
}
/* .websocket .el-dialog__body{
  max-height: 1000px !important;
} */
/* .dplayer{
  max-height: 1000px !important;
}
.dplayer-video-wrap{
  max-height: 1000px !important;
} */
.websocket .posRelative .el-icon-video-play {
  /* height: 50px;
  width: 50px; */
  font-size: 70px;
  color: rgb(30, 30, 36);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.websocket .posRelative .el-icon-video-play:hover {
  color: rgba(30, 30, 36, 0.8);
}
.websocket .posRelative {
  position: relative;
}
</style>