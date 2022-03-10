<template>
  <div class="index">
    <div class="box1">
      <el-row>
        <el-col :span="16">
          <div class="nav1">
            <div class="n1-left">
              <el-image
                @click="changeNowImg(item)"
                class="n1l-pic"
                v-for="item in srcList"
                :key="item"
                :src="item"
              ></el-image>
            </div>
            <div class="n1-right">
              <transition name="fade">
                <img v-if="show" :src="nowImg" alt class="n1-top" />
              </transition>
              <div class="n1-bottom">
                <el-image
                  @click="changeNowImg2(item)"
                  class="n1b-pic"
                  v-for="item in shopList"
                  :key="item.id"
                  style="width: 100px; height: 100px"
                  :src="item.product_img"
                ></el-image>
              </div>
              <div class="n1b-txt">
                颜色：
                <span class="sp">黑色</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nav2">
            <div class="n2-tit1">
              <div class="txt1">{{nowSku.product_name}}</div>
              <div class="txt2">50%OFF</div>
            </div>
            <div class="n2-tit2">
              <div class="txt1">评价（2320）</div>
              <el-rate v-model="rateValue" disabled show-score text-color="#ff9900"></el-rate>
            </div>
            <div class="n2-tit3">
              <div class="n2t3-item">
                尺寸：
                <span class="sp">{{Number(detailObj.frame_width)}}</span>
              </div>
            </div>
            <div class="n2-tit4">
              <div class="left">￥{{nowSku.product_price}}</div>
              <div class="right">
                <div class="top">震撼价</div>
                <div class="bottom">基础的镜片和镜框全部打折</div>
              </div>
            </div>
            <div class="n2-tit5">
              <img src="../../assets/img/Paypal.png" class="pic1" alt />
              <div class="txt1">为符合资格的购买物品支付四次无息付款</div>
            </div>
            <div @click="chufangDialogVisible = true" class="n2-tit6">选择镜头</div>
            <div @click="shoucang" class="n2-tit7">{{nowSku.is_collect == '1' ? '取消收藏' : '添加到收藏'}}</div>
            <div class="n2-tit8">分享到</div>
            <div class="n2-tit9">
              <img src="../../assets/img/lianshu.png" class="pic1" alt />
              <img src="../../assets/img/Pinterest.png" class="pic2" alt />
              <img src="../../assets/img/twitter.png" class="pic3" alt />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box2">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="细节" name="1">
          <el-row>
            <el-col :span="12">
              <div class="b2-nav1">
                <div class="txt1">规格</div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="tit1">
                      <div class="txtt1">
                        瞳距：{{detailObj.pd_range}}
                        <i
                          @click="tongjudialogVisible = true"
                          class="el-icon-question"
                        ></i>
                      </div>
                      <div class="txtt1">
                        度数：{{detailObj.prescription_range}}
                        <i
                          @click="dushudialogVisible = true"
                          class="el-icon-question"
                        ></i>
                      </div>
                      <div class="txtt1 flex">
                        作用于：
                        <div class="sps">
                          <div class="spd">
                            散光或平光：
                            <span class="sp">{{detailObj.progressive_or_bifocal}}</span>
                            <i @click="shuangjiaodialogVisible = true" class="el-icon-question"></i>
                          </div>
                          <div class="spd" style="margin-top:8px">
                            阅读：
                            <span class="sp">{{detailObj.readers}}</span>
                            <i @click="yueduzhedialogVisible = true" class="el-icon-question"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="tit1">
                      <div class="txtt1">边框：{{detailObj.rim}}</div>
                      <div class="txtt1">外形：{{detailObj.shape}}</div>
                      <div class="txtt1">材料：{{detailObj.material}}</div>
                      <div class="txtt1">特色：{{detailObj.feature}}</div>
                      <div class="txtt1">标签：{{detailObj.shape}}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="b2-nav1">
                <div class="txt1">规格</div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="tit1">
                      <div class="txtt1">
                        <img src="../../assets/img/ic1.png" alt class="ic1" />
                        镜框总长：{{detailObj.frame_width}}
                      </div>
                      <div class="txtt1">
                        <img src="../../assets/img/ic2.png" alt class="ic2" />
                        单镜框宽度：{{detailObj.lens_width}}
                      </div>
                      <div class="txtt1">
                        <img src="../../assets/img/ic3.png" alt class="ic3" />
                        镜架距离：{{detailObj.bridge}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="tit1">
                      <div class="txtt1 flexali">
                        <img src="../../assets/img/ic4.png" alt class="ic4" />
                        眼镜腿长：{{detailObj.temple_length}}
                      </div>
                      <div class="txtt1 flexali">
                        <img src="../../assets/img/ic5.png" alt class="ic5" />
                        单镜高度：{{detailObj.lens_height}}
                      </div>
                      <div class="txtt1 flexali">
                        <img src="../../assets/img/ic6.png" alt class="ic6" />
                        镜框重量：{{detailObj.frame_weight}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="描述" name="2">
          <div class="b2-nav2">{{detailObj.description}}</div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="3">
          <!-- <el-row>
            <el-col :span="20"></el-col>
            <el-col :span="4"></el-col>
          </el-row>-->
          <div class="b2-nav3">
            <!-- <div class="floatBtn">写评价</div>
            <div class="b2n3-tit1">
              <div class="txt1">评分</div>
              <el-rate v-model="ratePlZong" disabled show-score text-color="#ff9900"></el-rate>
              <div class="txt2">2844人已评价</div>
            </div>
            <div class="b2n3-tit2">
              <div class="jdt">
                <el-progress
                  type="circle"
                  :stroke-width="12"
                  :width="184"
                  :percentage="90"
                  color="#D0B28B"
                ></el-progress>
                <img src="../../assets/img/good.png" alt class="good" />
              </div>
              <div class="txt1">91%</div>
              <div class="txt2">会推荐给朋友</div>
            </div>
            <div class="b2n3-tit3">
              <div class="txt1">风格</div>
              <div class="txt2">休闲，时尚，运动，时尚前卫，经典，正式</div>
            </div>
            <div class="b2n3-tit4">
              <el-row :gutter="60">
                <el-col :span="8">
                  <div class="tit1">
                    <div class="txt1">质量</div>
                    <div class="txt2">
                      <div class="txt2-1">时尚</div>
                      <el-progress
                        :text-inside="true"
                        color="#000000"
                        :stroke-width="26"
                        :percentage="70"
                      ></el-progress>
                    </div>
                    <div class="txt2">
                      <div class="txt2-1">土</div>
                      <el-progress
                        :text-inside="true"
                        color="#4b4b4d"
                        :stroke-width="26"
                        :percentage="26"
                      ></el-progress>
                    </div>
                    <div class="txt2">
                      <div class="txt2-1">一般</div>
                      <el-progress
                        :text-inside="true"
                        color="#e1e2e6"
                        :stroke-width="26"
                        :percentage="51"
                      ></el-progress>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="tit1">
                    <div class="txt1">舒适</div>
                    <div class="txt2">
                      <div class="txt2-1">尺寸合适</div>
                      <el-progress
                        :text-inside="true"
                        color="#000000"
                        :stroke-width="26"
                        :percentage="70"
                      ></el-progress>
                    </div>
                    <div class="txt2">
                      <div class="txt2-1">紧</div>
                      <el-progress
                        :text-inside="true"
                        color="#4b4b4d"
                        :stroke-width="26"
                        :percentage="26"
                      ></el-progress>
                    </div>
                    <div class="txt2">
                      <div class="txt2-1">松</div>
                      <el-progress
                        :text-inside="true"
                        color="#e1e2e6"
                        :stroke-width="26"
                        :percentage="51"
                      ></el-progress>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>-->
            <div class="b2n3-tit5">
              <el-select v-model="nowRad1" placeholder="请选择">
                <el-option label="最新" value="1"></el-option>
                <el-option label="最热" value="2"></el-option>
              </el-select>
            </div>
            <div class="b2n3-tit6" v-for="item in pinglunList" :key="item.id">
              <div class="b2n3-tit1">
                <el-rate v-model="item.star" disabled show-score text-color="#ff9900"></el-rate>
                <div class="txt2">颜色：{{item.colorname}}</div>
              </div>
              <el-row :gutter="60" style="display:flex;align-items: center;">
                <el-col :span="14">
                  <div class="txttt1">{{item.title}}</div>
                  <div class="titt2">
                    <div class="txt1">by{{item.username}} ，{{item.timeBefore}}</div>
                    <i class="el-icon-s-custom"></i>
                  </div>
                  <!-- <div class="titt3">
                    <div class="txt1" style="margin-right:70px">
                      质量：
                      <span class="sp">高</span>
                    </div>
                    <div class="txt1">
                      舒适：
                      <span class="sp">尺寸合适</span>
                    </div>
                  </div>-->
                  <div class="titt4">{{item.content}}</div>
                  <!-- <div class="titt5">0/0的人发现这篇评论很有帮助。</div> -->
                </el-col>
                <el-col :span="10" style="display: flex;align-items: center;">
                  <div class="imgItems">
                    <el-image
                      v-for="(pic,i) in item.imgs"
                      :key="i"
                      :src="pic"
                      alt
                      :preview-src-list="[pic]"
                      class="item"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <div class="imgItems" v-if="activeName == '1' || activeName == '2'">
          <img v-for="item in srcList" :key="item" :src="item" alt class="imgitem" />
        </div>
      </el-tabs>
    </div>
    <div class="box3">
      <div class="tit1">猜你喜欢</div>
      <div class="nav6">
        <el-row :gutter="90">
          <el-col :span="6">
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="swItem">
              <img class="sw-pic1" src="../../assets/img/mcz3.png" alt />
              <div class="sw-txt1">猎杀系列</div>
              <div class="sw-txt2">￥98.0</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="box4"></div>
    <!-- 选择处方 -->
    <el-dialog :visible.sync="chufangDialogVisible" width="70%" :before-close="chufangHandleClose">
      <div class="chufangDia">
        <el-row>
          <el-col :span="16">
            <div class="left">
              <img :src="nowImg" alt class="l-pic" />
              <div class="l-tit1">
                <div class="lt1-left">
                  <div class="lt1-txt1">{{nowSku.product_name}}</div>
                  <div class="lt1-txt2">{{color_name}}</div>
                </div>
                <div class="lt1-right">￥{{nowSku.product_price}}</div>
              </div>
              <div class="l-tit3">
                <div class="lt3-tit1" v-if="dushu_id != ''">处方：{{chufangObj.dushu_name}}</div>
                <div class="lt3-tit1" v-else>无处方</div>
                <div class="lt3-step" v-if="buzhouVal != ''">
                  <div class="lt3s-tit1">
                    <div class="step1">1</div>
                    <!-- <div class="step1-tx">{{buzhouVal}}：平面 | 正常使用</div> -->
                    <div class="step1-tx">{{buzhouVal}} (￥{{leixinObj.type_price}})</div>
                  </div>
                  <div class="lt3s-tit2">
                    <div
                      class="lt3s-txt1"
                      v-if="nowStep == '1-2-1-1-1' || nowStep == '1-2-1-1-1-1'"
                    >
                      <div class="lt3s-left">颜色：{{yanseObj.color_name}}</div>
                      <div class="lt3s-right">￥{{yanseObj.color_price}}</div>
                    </div>
                    <div
                      class="lt3s-txt1"
                      v-if="nowStep == '1-2-1-1-1' || nowStep == '1-2-1-1-1-1'"
                    >
                      <div class="lt3s-left">折射率：{{buzhouVal2}}</div>
                      <div class="lt3s-right">￥{{colorPrice}}</div>
                    </div>
                    <div class="lt3s-txt1" v-if="nowStep == '1-2-1-1-1-1'">
                      <div class="lt3s-left">反射涂料：{{nowTucengObj.coating_name}}</div>
                      <div class="lt3s-right">￥{{nowTucengObj.coating_price}}</div>
                    </div>
                  </div>
                </div>
                <div class="lt3-step" v-if="isWancheng">
                  <div class="lt3s-tit1">
                    <div class="step1">2</div>
                    <div class="step1-tx">完成</div>
                  </div>
                  <!-- <div class="lt3s-tit2">
                    <div class="lt3s-txt1">
                      <div class="lt3s-left">折射率：1.5 布洛克兹 无处方</div>
                      <div class="lt3s-right">￥45.6</div>
                    </div>
                    <div class="lt3s-txt1">
                      <div class="lt3s-left">增透膜：耐油</div>
                      <div class="lt3s-right">￥45.6</div>
                    </div>
                  </div>-->
                </div>
              </div>
              <div class="l-tit2">
                <div class="lt1-left">预计总额</div>
                <div
                  class="lt1-right"
                >￥{{price}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="right">
              <transition name="fade">
                <!-- step1 -->
                <div v-if="nowStep == '0' && stepShow">
                  <div class="r-tit1">选择镜头类型</div>
                  <div class="r-items">
                    <div class="r-box" @click="toStep('0','1-1','','',1)">
                      <div class="rb-left">
                        <div class="rb-tit1">处方</div>
                        <div class="rb-tit2">带视力矫正的透镜</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box" @click="toStep('0','1-2','','',3)">
                      <div class="rb-left">
                        <div class="rb-tit1">非处方</div>
                        <div class="rb-tit2">不带视力矫正的透镜</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- step1-1(处方) -->
                <div v-if="nowStep == '1-1' && stepShow">
                  <i @click="goBack('0')" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">选择一个</div>
                  <div class="r-items">
                    <div class="r-box" @click="toStep('1-1','1-1-1')">
                      <div class="rb-left">
                        <div class="rb-tit1">新顾客或新处方</div>
                        <div class="rb-tit3">最新的处方和瞳距（PD）</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box" @click="toStep('1-1','1-1-2','','',2)">
                      <div class="rb-left">
                        <div class="rb-tit1">阅读者</div>
                        <div class="rb-tit3">一个放大领域的阅读，无需处方说明</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box" @click="toStep('1-1','1-1-3')">
                      <div class="rb-left">
                        <div class="rb-tit1">选择我的处方</div>
                        <div class="rb-tit3">选择一个已保存的处方</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- step1-2-3-3(非处方前一步) -->
                <div v-if="nowStep == '1-2-3-3' && stepShow">
                  <i @click="goBack" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">选择一个</div>
                  <div class="r-items">
                    <div
                      v-for="item in dengjiList"
                      :key="item.id"
                      class="r-box"
                      @click="toStep('1-2-3-3','1-2',item.id)"
                    >
                      <div class="rb-haveImg">
                        <div class="rb-left">
                          <div class="rb-tit1">{{item.level_name}}</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- step1-2(非处方) -->
                <div v-if="nowStep == '1-2' && stepShow">
                  <i @click="goBack" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">选择一个</div>
                  <div class="r-items">
                    <div
                      class="r-box"
                      v-for="item in yanjinleixinList"
                      :key="item.id"
                      @click="toStep('1-2','1-2-1',item.id,item)"
                    >
                      <div class="rb-haveImg">
                        <img class="rb-img" src="../../assets/img/tu2011.png" alt />
                        <div class="rb-left">
                          <div class="rb-tit1">{{item.type_name}}</div>
                          <div class="rb-tit3">{{item.type_desc}}</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <!-- <div class="r-box">
                      <div class="rb-haveImg">
                        <img class="rb-img" src="../../assets/img/tu2012.png" alt />
                        <div class="rb-left">
                          <div class="rb-tit1">防蓝光</div>
                          <div class="rb-tit3">通常是透明的晶状体，能阻挡蓝光和紫外线，保护眼睛一整天</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box">
                      <div class="rb-haveImg">
                        <img class="rb-img" src="../../assets/img/tu2014.png" alt />
                        <div class="rb-left">
                          <div class="rb-tit1">太阳镜</div>
                          <div class="rb-tit3">纯色或是镜面</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box">
                      <div class="rb-haveImg">
                        <img class="rb-img" src="../../assets/img/tu2014.png" alt />
                        <div class="rb-left">
                          <div class="rb-tit1">墨镜</div>
                          <div class="rb-tit3">纯色或是镜面</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box">
                      <div class="rb-haveImg">
                        <img class="rb-img" src="../../assets/img/tu2013.png" alt />
                        <div class="rb-left">
                          <div class="rb-tit1">光致变色</div>
                          <div class="rb-tit3">室内透明，在明亮阳光下自动变暗的透明镜片</div>
                        </div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>-->
                  </div>
                </div>
                <!-- step1-1-1(处方-新顾客或新处方) -->
                <div v-if="nowStep == '1-1-1' && stepShow">
                  <i @click="goBack('1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">选择一个</div>
                  <div class="r-items">
                    <div class="r-box" @click="toStep('1-1-1','1-1-1-1')">
                      <div class="rb-left">
                        <div class="rb-tit1">单一视觉</div>
                        <div class="rb-tit3">最新的处方和瞳距（PD）</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box" @click="toStep('1-1-1','1-1-1-1')">
                      <div class="rb-left">
                        <div class="rb-tit1">渐进的</div>
                        <div class="rb-tit3">选择一个已保存的处方</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                    <div class="r-box" @click="toStep('1-1-1','1-1-1-1')">
                      <div class="rb-left">
                        <div class="rb-tit1">双焦</div>
                        <div class="rb-tit3">选择一个已保存的处方</div>
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- step1-1-2(处方-阅读者) -->
                <div v-if="nowStep == '1-1-2' && stepShow">
                  <i @click="goBack('1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">挑选一个放大强度</div>
                  <div class="step1-1-2box">
                    <i @click="fangdadialogVisible = true" class="el-icon-question"></i>
                    <el-row :gutter="22">
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(1,'+0.25')"
                          :class="{'iitem':true,'active':nowFangdaIndex==1}"
                        >+0.25</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(2,'+0.50')"
                          :class="{'iitem':true,'active':nowFangdaIndex==2}"
                        >+0.50</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(3,'+0.75')"
                          :class="{'iitem':true,'active':nowFangdaIndex==3}"
                        >+0.75</div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:16px" :gutter="22">
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(4,'+1.00')"
                          :class="{'iitem':true,'active':nowFangdaIndex==4}"
                        >+1.00</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(5,'+1.25')"
                          :class="{'iitem':true,'active':nowFangdaIndex==5}"
                        >+1.25</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(6,'+1.50')"
                          :class="{'iitem':true,'active':nowFangdaIndex==6}"
                        >+1.50</div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:16px" :gutter="22">
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(7,'+1.75')"
                          :class="{'iitem':true,'active':nowFangdaIndex==7}"
                        >+1.75</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(8,'+2.00')"
                          :class="{'iitem':true,'active':nowFangdaIndex==8}"
                        >+2.00</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(9,'+2.25')"
                          :class="{'iitem':true,'active':nowFangdaIndex==9}"
                        >+2.25</div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:16px" :gutter="22">
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(10,'+2.50')"
                          :class="{'iitem':true,'active':nowFangdaIndex==10}"
                        >+2.50</div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          @click="clickFangdaItem(11,'+2.75')"
                          :class="{'iitem':true,'active':nowFangdaIndex==11}"
                        >+2.75</div>
                      </el-col>
                    </el-row>
                    <!-- <div @click="toStep('1-1-2','1-1-2-1')" class="tit3">下一步</div> -->
                    <div @click="toStep('1-1-2','1-2','')" class="tit3">下一步</div>
                  </div>
                </div>
                <!-- step1-1-3(处方-选择我的处方) -->
                <div v-if="nowStep == '1-1-3' && stepShow">
                  <i @click="goBack('1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-tit1">选择我的处方</div>
                  <div class="r-items">
                    <div
                      class="r-box"
                      v-for="item in chufangList"
                      :key="item.id"
                      @click="toStep('1-1-3','1-1-3-1',item.id,item)"
                    >
                      <div class="rb-left">
                        <div class="rb-tit1">{{item.dushu_name}}</div>
                        <!-- <div class="rb-tit3">最新的处方和瞳距（PD）</div> -->
                      </div>
                      <div class="rb-right">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- step1-1-2-1(处方-阅读者-下一步) -->
                <div v-if="nowStep == '1-1-2-1' && stepShow">
                  <i @click="goBack('1-1-2')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">选择一个渐进镜</div>
                  <div class="step1-1-2-1box">
                    <div
                      class="item"
                      style="margin-top:50px"
                      @click="toStep('1-1-2-1','1-1-2-1-1')"
                    >
                      <div class="tit1">
                        标准
                        <span class="sp">（大约20+ft）</span>
                      </div>
                      <div class="tit2">所有用途（大部分用途）</div>
                      <div class="tit3">全距离视力，近、小范围视野</div>
                      <div class="tit4">开车使用</div>
                      <div class="tit5">推荐使用</div>
                    </div>
                    <div class="item" @click="toStep('1-1-2-1','1-1-2-1-1')">
                      <div class="tit1">
                        中等距离
                        <span class="sp">（大约14ft）</span>
                      </div>
                      <div class="tit2">工作空间（特别用途）</div>
                      <div class="tit3">更宽的中距视野区域和一些近距离区域</div>
                      <div class="tit4">不用于开车</div>
                      <div class="tit5">推荐使用</div>
                    </div>
                    <div class="item" @click="toStep('1-1-2-1','1-1-2-1-1')">
                      <div class="tit1">
                        近距离
                        <span class="sp">（大约20+ft）</span>
                      </div>
                      <div class="tit2">所有用途（大部分用途）</div>
                      <div class="tit3">更宽的中距视野区域和一些近距离区域</div>
                      <div class="tit4">不用于开车</div>
                      <div class="tit5">推荐使用</div>
                    </div>
                  </div>
                </div>
                <!-- step1-1-2-1(处方-阅读者-下一步-下一步) -->
                <div v-if="nowStep == '1-1-2-1-1' && stepShow">
                  <i @click="goBack('1-1-2-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">生成你的处方</div>
                  <div class="step1-1-2-1-1box">
                    <div class="tit1">处方：单视 | 近视</div>
                    <div class="tit2">
                      PD-瞳距：
                      <span class="sp">25.1/26.45</span>
                    </div>
                    <div class="tit3">
                      <el-row style="display: flex;align-items: center;">
                        <el-col :span="6">
                          <div class="txt1">右-OD</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">SPH</div>
                          <div class="txtx2">+8.00</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">CYL</div>
                          <div class="txtx2">+8.00</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">Axis</div>
                          <div class="txtx2">4</div>
                        </el-col>
                      </el-row>
                      <el-row style="display: flex;align-items: center;margin-top:20px">
                        <el-col :span="6">
                          <div class="txt1">左-OS</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">+8.00</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">+8.00</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">4</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="tit4" @click="toStep('1-1-2-1-1','1-2-1-1-1-1')">保存</div>
                    <div class="tit5" @click="toStep('1-1-2-1-1','1-2-1-1-1-1')">跳过</div>
                  </div>
                </div>
                <!-- step1-1-2-1(处方-选择我的处方-下一步) -->
                <div v-if="nowStep == '1-1-3-1' && stepShow">
                  <i @click="goBack('1-1-2-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">处方详情</div>
                  <div class="step1-1-2-1-1box">
                    <div class="tit1">处方：{{chufangObj.dushu_name}}</div>
                    <div class="tit2">
                      PD-瞳距：
                      <span
                        class="sp"
                      >{{chufangObj.one_number != '' ? chufangObj.one_number : `左：${chufangObj.two_number_left}/右：${chufangObj.two_number_right}`}}</span>
                    </div>
                    <div class="tit3">
                      <el-row style="display: flex;align-items: center;">
                        <el-col :span="6">
                          <div class="txt1">右-OD</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">SPH</div>
                          <div class="txtx2">{{chufangObj.you_sph}}</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">CYL</div>
                          <div class="txtx2">{{chufangObj.you_cyl}}</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx1">Axis</div>
                          <div class="txtx2">{{chufangObj.you_axis}}</div>
                        </el-col>
                      </el-row>
                      <el-row style="display: flex;align-items: center;margin-top:20px">
                        <el-col :span="6">
                          <div class="txt1">左-OS</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">{{chufangObj.zuo_sph}}</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">{{chufangObj.zuo_cyl}}</div>
                        </el-col>
                        <el-col :span="6">
                          <div class="txtx2">{{chufangObj.zuo_axis}}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="tit4" @click="toStep('1-1-3-1','1-2-3-3',chufangObj.id)">下一步</div>
                  </div>
                </div>
                <!-- step1-2-1(非处方-平面镜) -->
                <div v-if="nowStep == '1-2-1' && stepShow">
                  <i @click="goBack('1-2')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">选择一个折射率</div>
                  <div class="r-ntit2">所有镜片都有防紫外线和防划伤涂层</div>
                  <div class="r-nItems">
                    <div class="r-nItem">
                      <div class="r-ntxt1">正常用途</div>
                      <div
                        class="r-nbox1"
                        v-for="item in zheshelvList"
                        :key="item.id"
                        @click="toStep('1-2-1','1-2-1-1',item.id,item)"
                      >
                        <div class="rnb-left">
                          <div class="rnb-tit">{{item.basic_index}}</div>
                        </div>
                        <div class="rnb-right">
                          +￥{{item.price}}
                          <i class="el-icon-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="r-nItem">
                      <div class="r-ntxt1">加收费用</div>
                      <div class="r-nbox1">
                        <div class="rnb-left">
                          <div class="rnb-tit">1.5 布洛克兹 无验光</div>
                          <div class="rnb-tit">1.5 布洛克兹 无验光</div>
                        </div>
                        <div class="rnb-right">
                          +￥24.6
                          <i class="el-icon-arrow-right"></i>
                        </div>
                      </div>
                    </div>-->
                  </div>
                </div>
                <!-- step1-1-1-1(处方-新顾客或新处方-单一视觉) -->
                <div v-if="nowStep == '1-1-1-1' && stepShow">
                  <i @click="goBack('1-1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">输入你的处方</div>
                  <div class="step1-1-1-1box">
                    <div class="tit1">
                      <div class="t-left">PD-瞳距</div>
                      <i @click="tongjudialogVisible = true" class="el-icon-question"></i>
                    </div>
                    <div class="tit2">
                      <el-radio-group
                        @change="tongjuChange"
                        v-model="tongjuRad1"
                        style="margin-bottom:20px"
                      >
                        <el-radio label="1">一个瞳距</el-radio>
                        <el-radio label="2">两个瞳距</el-radio>
                      </el-radio-group>
                      <!-- 一个瞳距 -->
                      <el-select v-if="tongjuRad1=='1'" v-model="tongjuVal" placeholder="请选择处方瞳距">
                        <el-option
                          v-for="(item,i) in 43"
                          :key="`${i}1`"
                          :label="i+37"
                          :value="i+37"
                        ></el-option>
                      </el-select>
                      <!-- 两个瞳距 -->
                      <template v-if="tongjuRad1=='2'">
                        <div class="txxx">左</div>
                        <el-select v-model="tongjuValLeft" placeholder="请选择处方瞳距">
                          <el-option
                            v-for="(item,i) in 45"
                            :key="`${i}left`"
                            :label="(i+36)/2"
                            :value="(i+36)/2"
                          ></el-option>
                        </el-select>
                        <div class="txxx" style="margin-top: 10px;">右</div>
                        <el-select v-model="tongjuValRight" placeholder="请选择处方瞳距">
                          <el-option
                            v-for="(item,i) in 45"
                            :key="`${i}right`"
                            :label="(i+36)/2"
                            :value="(i+36)/2"
                          ></el-option>
                        </el-select>
                      </template>
                    </div>
                    <div
                      @click="step1111OnSubmit"
                      :class="{'tit3':true,'active':tongjuVal!='' || (tongjuValLeft!='' && tongjuValRight!='')}"
                    >提交</div>
                  </div>
                </div>
                <!-- step1-1-1-1-1(处方-新顾客或新处方-单一视觉-提交) -->
                <div v-if="nowStep == '1-1-1-1-1' && stepShow">
                  <i @click="goBack('1-1-1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">输入你的处方</div>
                  <div class="step1-1-1-1-1box">
                    <div class="txt1">为SPH或CYL，选择+或-的值</div>
                    <div class="tit1">
                      <div class="t-left">右眼-OD</div>
                      <i @click="chufangleixindialogVisible = true" class="el-icon-question"></i>
                    </div>
                    <div class="tit2">
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <div class="txtt1">SPH</div>
                          <el-select v-model="leftSPH" placeholder="0.00">
                            <el-option
                              v-for="(item,i) in 129"
                              :key="`${i}leftSPH`"
                              :label="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                              :value="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <div class="txtt1">CYL</div>
                          <el-select v-model="leftCYL" placeholder="0.00">
                            <el-option
                              v-for="(item,i) in 49"
                              :key="`${i}leftCYL`"
                              :label="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                              :value="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <div class="txtt1">Axis</div>
                          <el-select
                            :disabled="leftCYL == ''"
                            v-model="leftAxis"
                            placeholder="0.00"
                          >
                            <el-option
                              v-for="(item,i) in 181"
                              :key="`${i}leftAxis`"
                              :label="i"
                              :value="i"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="tit1">
                      <div class="t-left">左眼-OS</div>
                      <!-- <i class="el-icon-question"></i> -->
                    </div>
                    <div class="tit2">
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <div class="txtt1">SPH</div>
                          <el-select v-model="rightSPH" placeholder="0.00">
                            <el-option
                              v-for="(item,i) in 129"
                              :key="`${i}rightSPH`"
                              :label="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                              :value="((i-80)/4).toFixed(2) > 0 ? `+${((i-80)/4).toFixed(2)}` : ((i-80)/4).toFixed(2)"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <div class="txtt1">CYL</div>
                          <el-select v-model="rightCYL" placeholder="0.00">
                            <el-option
                              v-for="(item,i) in 49"
                              :key="`${i}rightCYL`"
                              :label="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                              :value="((i-24)/4).toFixed(2) > 0 ? `+${((i-24)/4).toFixed(2)}` : ((i-24)/4).toFixed(2)"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <div class="txtt1">Axis</div>
                          <el-select
                            :disabled="rightCYL == ''"
                            v-model="rightAxis"
                            placeholder="0.00"
                          >
                            <el-option
                              v-for="(item,i) in 181"
                              :key="`${i}rightAxis`"
                              :label="i"
                              :value="i"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="tit4">
                      <div class="t-left">
                        <div @click="addLJZ" class="btn">增加你的棱镜值</div>
                        <div class="txt">如果你的处方有棱镜值</div>
                      </div>
                      <!-- <i class="el-icon-question"></i> -->
                    </div>
                    <template v-if="ljzShow">
                      <div class="tit5">
                        <div class="txtt1">右眼-OD</div>
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <div class="tx1">水平</div>
                            <el-select v-model="leftODsp" placeholder="0.00">
                              <el-option
                                v-for="(item,i) in 50"
                                :key="`${i}rightSPH`"
                                :label="(i/4).toFixed(2)"
                                :value="(i/4).toFixed(2)"
                              ></el-option>
                            </el-select>
                            <div class="tx1">垂直</div>
                            <el-select v-model="leftODcz" placeholder="0.00">
                              <el-option
                                v-for="(item,i) in 129"
                                :key="`${i}rightSPH`"
                                :label="(i/4).toFixed(2)"
                                :value="(i/4).toFixed(2)"
                              ></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <div class="tx2">基础方向</div>
                            <el-radio-group
                              @change="leftODspChange"
                              v-model="leftODspRad1"
                              style="margin-bottom:20px"
                            >
                              <el-radio label="1">里</el-radio>
                              <el-radio label="2">外</el-radio>
                            </el-radio-group>
                            <div class="tx2">基础方向</div>
                            <el-radio-group
                              @change="leftODczChange"
                              v-model="leftODczRad1"
                              style="margin-bottom:20px"
                            >
                              <el-radio label="1">里</el-radio>
                              <el-radio label="2">外</el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="tit5">
                        <div class="txtt1">左眼-OS</div>
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <div class="tx1">水平</div>
                            <el-select v-model="leftOSsp" placeholder="0.00">
                              <el-option
                                v-for="(item,i) in 50"
                                :key="`${i}rightSPH`"
                                :label="(i/4).toFixed(2)"
                                :value="(i/4).toFixed(2)"
                              ></el-option>
                            </el-select>
                            <div class="tx1">垂直</div>
                            <el-select v-model="leftOScz" placeholder="0.00">
                              <el-option
                                v-for="(item,i) in 129"
                                :key="`${i}rightSPH`"
                                :label="(i/4).toFixed(2)"
                                :value="(i/4).toFixed(2)"
                              ></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <div class="tx2">基础方向</div>
                            <el-radio-group
                              @change="leftOSspChange"
                              v-model="leftOSspRad1"
                              style="margin-bottom:20px"
                            >
                              <el-radio label="1">里</el-radio>
                              <el-radio label="2">外</el-radio>
                            </el-radio-group>
                            <div class="tx2">基础方向</div>
                            <el-radio-group
                              @change="leftOSczChange"
                              v-model="leftOSczRad1"
                              style="margin-bottom:20px"
                            >
                              <el-radio label="1">里</el-radio>
                              <el-radio label="2">外</el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-row>
                      </div>
                    </template>

                    <div @click="addChufang" class="tit3">提交</div>
                  </div>
                </div>
                <!-- step1-2-1-1(非处方-平面镜-正常用途) -->
                <div v-if="nowStep == '1-2-1-1' && stepShow">
                  <i @click="goBack('1-2-1')" class="el-icon-arrow-left p"></i>

                  <div class="step1-2-1-1box">
                    <div class="r-nntit1">1.选择一个颜色</div>
                    <div class="stepnav1">
                      <div class="tit1">
                        <div class="txt1">{{nowZslObj.basic_index}}</div>
                        <div class="txt2">+￥{{colorPrice}}</div>
                      </div>
                      <div class="tit2">{{nowZslObj.desc}}</div>
                      <div class="items">
                        <div
                          class="item"
                          v-for="(item,i) in colorList"
                          :key="item.id"
                          @click="step1211Pic(i,item)"
                        >
                          <img
                            :src="item.color_img"
                            alt
                            :class="{'pic':true,'active':step1211PicIndex == i}"
                          />
                          <div class="txt">{{item.color_name}}</div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="stepnav2">
                      <div class="t3-left">保险</div>
                      <div class="t3-right">+￥24.6</div>
                    </div>-->
                    <div @click="step1211next" class="stepnav3">下一步</div>
                  </div>
                </div>
                <!-- step1-2-1-1-1(非处方-平面镜-正常用途-下一步) -->
                <div v-if="nowStep == '1-2-1-1-1' && stepShow">
                  <i @click="goBack('1-2-1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">选择一个折射率</div>
                  <div class="step1-2-1-1-1box">
                    <i @click="fanshedialogVisible = true" class="el-icon-question"></i>
                    <div class="steptxt1">2.挑选你的反射涂料</div>
                    <div class="steptxt2">抗反射（AR）涂层可大大减少光反射，改善视力和眼镜外观。</div>
                    <div class="r-nItems">
                      <div class="r-nItem">
                        <div class="r-ntxt1">基础</div>
                        <div
                          class="r-nbox1"
                          @click="toStep('1-2-1-1-1','1-2-1-1-1-1',item.id,item)"
                          v-for="item in fansheList"
                          :key="item.id"
                        >
                          <div class="myLeft">
                            <!-- <img class="pic" src="../../assets/img/tu2001.png" alt /> -->
                            <img class="pic" :src="item.coating_img" alt />
                            <div class="rnb-left">
                              <div class="rnb-tit1">{{item.coating_name}}</div>
                              <div class="rnb-tit2">{{item.coating_desc}}</div>
                            </div>
                          </div>
                          <div class="rnb-right">
                            +￥{{item.coating_price}}
                            <i class="el-icon-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="r-nItem">
                        <div class="r-ntxt1">高级</div>
                        <div class="r-nbox1">
                          <div class="myLeft">
                            <img class="pic" src="../../assets/img/tu2002.png" alt />
                            <div class="rnb-left">
                              <div class="rnb-tit1">耐水</div>
                              <div class="rnb-tit2">防水，减少光线反射</div>
                            </div>
                          </div>
                          <div class="rnb-right">
                            +￥24.6
                            <i class="el-icon-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                      <div class="r-nItem">
                        <div class="r-ntxt1">保险费</div>
                        <div class="r-nbox1">
                          <div class="myLeft">
                            <img class="pic" src="../../assets/img/tu2003.png" alt />
                            <div class="rnb-left">
                              <div class="rnb-tit1">耐油的</div>
                              <div class="rnb-tit2">防指纹、防水；减少光线放射</div>
                            </div>
                          </div>
                          <div class="rnb-right">
                            +￥24.6
                            <i class="el-icon-arrow-right"></i>
                          </div>
                        </div>
                        <div class="r-nbox1">
                          <div class="myLeft">
                            <img class="pic" src="../../assets/img/tu2004.png" alt />
                            <div class="rnb-left">
                              <div class="rnb-tit1">防雾的</div>
                              <div class="rnb-tit2">全距离视力，近、小范围视野</div>
                            </div>
                          </div>
                          <div class="rnb-right">
                            +￥24.6
                            <i class="el-icon-arrow-right"></i>
                          </div>
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
                <!-- step1-2-1(非处方-平面镜-正常用途-下一步-基础) -->
                <div v-if="nowStep == '1-2-1-1-1-1' && stepShow">
                  <i @click="goBack('1-2-1-1-1')" class="el-icon-arrow-left p"></i>
                  <div class="r-ntit1">完成</div>
                  <div class="step1-2-1-1-1-1box">
                    <div class="boxxs">
                      <div
                        @click="stepBoxIndex = '1'"
                        :class="{'boxx1':true,'active':stepBoxIndex == '1'}"
                      >
                        <img src="../../assets/img/tu2021.png" alt class="pic" />
                        <div class="txt">添加一个夹子</div>
                      </div>
                      <div
                        @click="stepBoxIndex = '2'"
                        :class="{'boxx1':true,'active':stepBoxIndex == '2'}"
                        style="margin-left: 20px;"
                      >
                        <img src="../../assets/img/tu2021.png" alt class="pic" />
                        <div class="txt">添加一个雕刻</div>
                      </div>
                    </div>
                    <div class="step-tit1">在你完成处方之前，可能你需要一些附加选项</div>
                    <div @click="onSubmit" class="step-tit2">完成</div>
                    <div @click="onSubmit" class="step-tit3">保存到我的处方</div>
                  </div>
                </div>
              </transition>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 什么是瞳距 -->
    <el-dialog :visible.sync="tongjudialogVisible" width="600px" :before-close="tongjuhandleClose">
      <div class="tongjuDia">
        <el-tabs v-model="tongjuActiveName">
          <el-tab-pane label="一个瞳距" name="1">
            <img src="../../assets/img/tongju.png" alt class="pic" />
            <div
              class="txt"
            >瞳孔距离（PD），即瞳孔中心之间的距离，决定了你通过眼镜镜片看的位置。它应该尽可能准确。成人平均单个PD在54-74 mm之间；儿童的身高在43-58毫米之间。 通过查看我们的PD信息图和视频，了解如何测量以及了解单PD、双PD和近PD之间的差异。</div>
          </el-tab-pane>
          <el-tab-pane label="两个瞳距" name="2">
            <img src="../../assets/img/tongju.png" alt class="pic" />
            <div class="txt">瞳孔距离（PD），即瞳孔中心之间的距离，决定了你通过眼镜镜片看的位置。。</div>
          </el-tab-pane>
          <el-tab-pane label="什么是瞳距" name="3">
            <img src="../../assets/img/tongju.png" alt class="pic" />
            <div class="txt">瞳孔距离（PD），即瞳孔中心之间的距离，查看我们的PD信息图和视频，了解如何测量以及了解单PD、双PD和近PD之间的差异。</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <!-- 度数 -->
    <el-dialog :visible.sync="dushudialogVisible" width="600px" :before-close="dushuhandleClose">
      <div class="dushuDia">
        <div class="txt1">处方范围</div>
        <div
          class="txt2"
        >处方范围这些框架只能在某些处方中使用。这是基于球面(sph)值的近似范围。如果您有散光(cyl)在您的处方，这一范围可能会进一步限制。请在订单页面上输入您的处方，看看我们是否能为您生产这些眼镜/太阳镜。</div>
      </div>
    </el-dialog>
    <!-- 双焦点透镜 -->
    <el-dialog
      :visible.sync="shuangjiaodialogVisible"
      width="600px"
      :before-close="shuangjiaohandleClose"
    >
      <div class="dushuDia">
        <div class="txt1">双焦点透镜</div>
        <div
          class="txt2"
        >两个视野被一条线隔开。一般来说，顶部用于远距离视觉或计算机距离，底部用于近距离视觉工作，例如阅读。在双焦点透镜中，两个视野由一条可见光线特别区分。底部阅读区域为28毫米宽，并且位于镜头中心线以下。双焦点区域的物理位置会受到所选镜头物理高度的影响。双焦距镜头的镜头总高度必须在30毫米或以上。我们推荐更高的镜头，更舒适的佩戴，但30毫米是双焦镜头的最低高度。如果选择的镜框高度小于30毫米，双焦镜头必须选择不同的镜框渐进镜</div>
        <div class="txt1" style="margin-top:30px">渐进镜</div>
        <div
          class="txt2"
        >包括多个视野，没有线条，有时被称为“无线多焦点”。在渐进镜片中，镜片矫正部分的形状大约为漏斗或蘑菇状。在标准进行体中，上半部分用于远距离视觉，下半部分用于中间视觉，最后下半部分用于阅读视觉。中间和阅读区域应小于距离区域。标准渐进镜片是最常用的渐进镜片。在工作区渐进式中，顶部部分用于中间视觉，底部部分用于近视或阅读，在工作区渐进式中没有远视。有两种类型的工作空间进步人士:中级进步人士和近级进步人士。中距渐进式适用于需要较大中间视力的近距离工作，如台式电脑和会议，而近距离渐进式最适用于静态近距离工作，如长时间阅读、手持设备的使用和手工制作。渐进式镜头的镜头高度必须达30毫米或以上。我们推荐更高的镜头，更舒适的佩戴，但最低镜头高度是30毫米。如果镜架的镜片高度小于30毫米，必须为渐进镜片选择不同的镜架。</div>
      </div>
    </el-dialog>
    <!-- 阅读者 -->
    <el-dialog
      :visible.sync="yueduzhedialogVisible"
      width="600px"
      :before-close="yueduzhehandleClose"
    >
      <div class="yueduzheDia">
        <div class="txt1">阅读者</div>
        <div
          class="txt2"
        >眼睛近距离聚焦的能力会随着年龄的增长而减弱。当我们到了40岁时，由于眼睛自然失去弹性，阅读小字体的困难变得更加明显。这就是为什么菜单、报纸和智能手机上的印刷品变得难以阅读的原因。如果你有以下任何一种经验，那么阅读眼镜可能适合你:眯着眼睛看近处的材料，拿着远处的阅读材料，在弱光条件下阅读困难。读者不需要处方</div>
        <div class="tit3">
          <el-table :data="yueduzheTableData" border style="width: 361px">
            <el-table-column prop="date" label="你的年龄" width="180"></el-table-column>
            <el-table-column prop="name" label="预计交货" width="180"></el-table-column>
          </el-table>
        </div>
        <div class="txt1">给阅读者忠告</div>
        <div
          class="txt2"
          style="margin-bottom:20px"
        >不要把读者忠告当作矫正镜片的替代品，只有专业的眼睛检查才能确定你的眼睛健康状况和视力需要。请咨询专业的眼睛护理人员，定期进行眼睛检查。</div>
      </div>
    </el-dialog>
    <!-- 处方类型 -->
    <el-dialog
      :visible.sync="chufangleixindialogVisible"
      width="700px"
      :before-close="chufangleixinhandleClose"
    >
      <div class="chufangleixinDia">
        <div class="txt1">处方类型</div>
        <div class="tit3">
          <el-table :data="chufangleixinTableData" style="width: 100%">
            <el-table-column prop="OS" label="OS/OD"></el-table-column>
            <el-table-column prop="SPH" label="SPH(视力)"></el-table-column>
            <el-table-column prop="CYL" label="CYL(散光)"></el-table-column>
            <el-table-column prop="AXIS" label="AXIS(散光方向)"></el-table-column>
            <el-table-column prop="NVADD" label="NV-ADD(加光)"></el-table-column>
          </el-table>
        </div>
        <div class="tit2">OD=右眼 OS=左眼</div>
      </div>
    </el-dialog>
    <!-- 放大强度 -->
    <el-dialog :visible.sync="fangdadialogVisible" width="600px" :before-close="fangdahandleClose">
      <div class="fangdaDia">
        <div class="txt1">放大强度</div>
        <div class="txt2">通过使用此图表或以下建议找到您首选的放大强度。读者不需要处方。</div>
        <div class="tit3">
          <el-table :data="fangdaTableData" style="width: 100%">
            <el-table-column prop="age" label="你的年龄"></el-table-column>
            <el-table-column prop="tuijian" label="推荐的阅读眼镜功率"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 反射涂料 -->
    <el-dialog :visible.sync="fanshedialogVisible" width="600px" :before-close="fanshehandleClose">
      <div class="tongjuDia fansheDia">
        <div class="txx">反射涂料</div>
        <el-tabs v-model="fansheActiveName" @tab-click="fanshehandleClick">
          <el-tab-pane label="基础" name="1">
            <img src="../../assets/img/mcz29.png" alt class="pic2" />
            <div class="fstxt">
              基础
              <span class="sp">防反射涂层可减少夜间灯光周围的眩光、反射和光晕，改善视力和眼镜外观。</span>
            </div>
            <div class="fstxt2">包括</div>
            <div class="items">
              <div class="item">
                <img src="../../assets/img/tu2001.png" alt class="it-pic" />
                <div class="it-txt1">反射涂料</div>
                <i :class="{'el-icon-success':true,'active':fsIndex1}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2002.png" alt class="it-pic" />
                <div class="it-txt1">防水</div>
                <i :class="{'el-icon-success':true,'active':fsIndex2}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2003.png" alt class="it-pic" />
                <div class="it-txt1">防油</div>
                <i :class="{'el-icon-success':true,'active':fsIndex3}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2004.png" alt class="it-pic" />
                <div class="it-txt1">防雾</div>
                <i :class="{'el-icon-success':true,'active':fsIndex4}"></i>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="高级" name="2">
            <img src="../../assets/img/mcz29.png" alt class="pic2" />
            <div class="fstxt">
              基础
              <span class="sp">防反射涂层可减少夜间灯光周围的眩光、反射和光晕，改善视力和眼镜外观。</span>
            </div>
            <div class="fstxt2">包括</div>
            <div class="items">
              <div class="item">
                <img src="../../assets/img/tu2001.png" alt class="it-pic" />
                <div class="it-txt1">反射涂料</div>
                <i :class="{'el-icon-success':true,'active':fsIndex1}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2002.png" alt class="it-pic" />
                <div class="it-txt1">防水</div>
                <i :class="{'el-icon-success':true,'active':fsIndex2}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2003.png" alt class="it-pic" />
                <div class="it-txt1">防油</div>
                <i :class="{'el-icon-success':true,'active':fsIndex3}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2004.png" alt class="it-pic" />
                <div class="it-txt1">防雾</div>
                <i :class="{'el-icon-success':true,'active':fsIndex4}"></i>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附加费" name="3">
            <div class="fsbox">
              <template v-if="isFW">
                <div class="top">
                  <img @click="clickFY" src="../../assets/img/tu2022.png" alt class="pic1" />
                  <img src="../../assets/img/tu2004.png" alt class="pic2" />
                </div>
                <div class="down">防雾</div>
              </template>
              <template v-if="isFY">
                <div class="top">
                  <img src="../../assets/img/tu2003.png" alt class="pic2" />
                  <img @click="clickFW" src="../../assets/img/tu2023.png" alt class="pic3" />
                </div>
                <div class="down">防油</div>
              </template>
            </div>
            <img src="../../assets/img/mcz29.png" alt class="pic2" />
            <div class="fstxt">
              基础
              <span class="sp">防反射涂层可减少夜间灯光周围的眩光、反射和光晕，改善视力和眼镜外观。</span>
            </div>
            <div class="fstxt2">包括</div>
            <div class="items">
              <div class="item">
                <img src="../../assets/img/tu2001.png" alt class="it-pic" />
                <div class="it-txt1">反射涂料</div>
                <i :class="{'el-icon-success':true,'active':fsIndex1}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2002.png" alt class="it-pic" />
                <div class="it-txt1">防水</div>
                <i :class="{'el-icon-success':true,'active':fsIndex2}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2003.png" alt class="it-pic" />
                <div class="it-txt1">防油</div>
                <i :class="{'el-icon-success':true,'active':fsIndex3}"></i>
              </div>
              <div class="item">
                <img src="../../assets/img/tu2004.png" alt class="it-pic" />
                <div class="it-txt1">防雾</div>
                <i :class="{'el-icon-success':true,'active':fsIndex4}"></i>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shopId"])
  },
  watch: {
    nowStep () {
      this.price = 0;
      if (this.nowSku) {
        console.log(this.nowSku)
        if(this.nowSku.product_price != ""){
          this.price += Number(this.nowSku.product_price)
          console.log(Number(this.nowSku.product_price))
        }
        if (this.nowTucengObj.coating_price && this.nowTucengObj.coating_price != ""){
          this.price += Number(this.nowTucengObj.coating_price)
          console.log(this.nowTucengObj)
        }
        if (this.colorPrice && this.colorPrice != ""){
          this.price += Number(this.colorPrice)
        }
        if (this.leixinObj.type_price && this.leixinObj.type_price != ""){
          this.price += Number(this.leixinObj.type_price)
        }
        if (this.yanseObj.color_price && this.yanseObj.color_price != ""){
          this.price += Number(this.yanseObj.color_price)
        }
        console.log(this.price);
      }
    }
  },
  data() {
    return {
      price:0,
      colorPrice: 0,
      zheshelvList: [],
      shopList: [],
      nowImg:
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      srcList: [],
      rateValue: 3.7,
      show: true,
      activeName: "3",
      ratePlZong: 2.2,
      nowRad1: "1",
      chufangDialogVisible: false,
      nowStep: "0",
      // nowStep: "1-2-3-3",
      product_level_id: "",
      stepShow: true,
      stepBoxIndex: "1",
      tongjuRad1: "1",
      tongjuVal: "",
      tongjuValLeft: "",
      tongjuValRight: "",
      leftSPH: "",
      leftCYL: "",
      leftAxis: "",
      rightSPH: "",
      rightCYL: "",
      rightAxis: "",
      leftODsp: "",
      leftODcz: "",
      leftOScz: "",
      leftOSsp: "",
      leftODspRad1: "",
      leftODczRad1: "",
      leftOSczRad1: "",
      leftOSspRad1: "",
      ljzShow: false,
      tongjudialogVisible: false,
      tongjuActiveName: "1",
      dushudialogVisible: false,
      yueduzhedialogVisible: false,
      yueduzheTableData: [
        {
          date: "40-44",
          name: "（+075）-（+1.00）"
        },
        {
          date: "45-49",
          name: "（+1.00）-（+1.50）"
        },
        {
          date: "50-54",
          name: "（+1.50）-（+2.00）"
        },
        {
          date: "55-59",
          name: "（+2.00）-（+2.25）"
        },
        {
          date: "60+",
          name: "（+2.25）-（+2.75）"
        }
      ],
      chufangleixinTableData: [
        {
          OS: "右-OD",
          SPH: "0.00",
          CYL: "0.00",
          AXIS: "0.25",
          NVADD: "1.25"
        },
        {
          OS: "左-OS",
          SPH: "0.00",
          CYL: "0.00",
          AXIS: "0.25",
          NVADD: "1.25"
        }
      ],
      shuangjiaodialogVisible: false,
      chufangleixindialogVisible: false,
      nowFangdaIndex: "",
      fangdadialogVisible: false,
      fangdaTableData: [
        {
          age: "40-44",
          tuijian: "+0.75 至 +1.00"
        },
        {
          age: "45-49",
          tuijian: "+1.00 至 +1.50"
        },
        {
          age: "50-54",
          tuijian: "+1.50 至 +2.00"
        },
        {
          age: "55-59",
          tuijian: "+2.00 至 +2.25"
        },
        {
          age: "60+",
          tuijian: "+2.25 至 +2.75"
        }
      ],
      fanshedialogVisible: false,
      fansheActiveName: "1",
      fsIndex1: true,
      fsIndex2: false,
      fsIndex3: false,
      fsIndex4: false,
      isFW: true,
      isFY: false,
      step1211PicIndex: "",
      nowSku: {
        product_price: ""
      },
      detailObj: {},
      yanjinleixinList: [],
      product_type_id: "",
      colorList: [],
      fansheList: [],
      product_id: "",
      color_id: "",
      type_id: "",
      coatings_id: "",
      basicindex_id: "",
      dushu_id: "",
      pinglunList: [],
      chufangList: [],
      chufangObj: {},
      backStep: [],
      reader_num: "",
      buzhouVal: "",
      buzhouVal2: "",
      isWancheng: false,
      color_name: "",
      dengjiList: [],
      fromz: "",
      nowZslObj: {},
      nowTucengObj: {},
      leixinObj:{},
      yanseObj:{},
    };
  },
  created() {
    if (!this.shopId) {
      this.$router.push({ name: "Xinping" });
    }
    this.getData();
  },
  methods: {
    async getData() {
      const res2 = await this.$api.detail(this.shopId);
      this.detailObj = res2.data;
      const res = await this.$api.products({ storehouse_id: this.shopId });
      console.log(res.data);
      this.shopList = res.data.data;
      if (this.$route.params.detailShopId) {
        this.shopList.forEach(ele => {
          if (ele.id == this.$route.params.detailShopId) {
            this.nowSku = ele;
          }
        });
      } else {
        this.nowSku = this.shopList[0];
      }
      this.nowImg = this.nowSku.product_img;
      this.srcList = this.nowSku.product_detail_imgs.filter(ele => {
        return ele != "";
      });
      // const res3 = await this.$api.product_type_list();
      // this.yanjinleixinList = res3.data;
      // console.log(this.yanjinleixinList);
      const res4 = await this.$api.product_comment_list(this.shopId);
      this.pinglunList = res4.data.data;
      this.pinglunList.forEach(ele => {
        ele.timeBefore = this.getDateDiff(new Date(ele.add_time));
        ele.imgs.forEach((ele2, i2) => {
          if (ele2 == "") {
            ele.imgs.splice(i2, 1);
          }
        });
      });
      console.log(this.pinglunList);
      const res5 = await this.$api.dushu_list();
      console.log(res5);
      this.chufangList = res5.data;
      const res6 = await this.$api.product_level_list();
      this.dengjiList = res6.data;
    },
    async shoucang() {
      const res = await this.$api.collect(this.nowSku.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
        this.dialogVisible = false;
      } else {
        this.$message.error(res.message);
      }
    },
    fanshehandleClick() {
      console.log(this.fansheActiveName);
      if (this.fansheActiveName == "1") {
        this.fsIndex1 = true;
        this.fsIndex2 = false;
        this.fsIndex3 = false;
        this.fsIndex4 = false;
      } else if (this.fansheActiveName == "2") {
        this.fsIndex1 = true;
        this.fsIndex2 = true;
        this.fsIndex3 = false;
        this.fsIndex4 = false;
      } else if (this.fansheActiveName == "3") {
        if (this.isFY) {
          this.fsIndex1 = true;
          this.fsIndex2 = true;
          this.fsIndex3 = true;
          this.fsIndex4 = false;
        } else {
          this.fsIndex1 = true;
          this.fsIndex2 = false;
          this.fsIndex3 = false;
          this.fsIndex4 = true;
        }
      }
    },
    getDateDiff(dateTimeStamp) {
      var result = "";
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      // var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      if (diffValue < 0) {
        return;
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else result = "刚刚";
      return result;
    },
    step1211next() {
      this.toStep("1-2-1-1", "1-2-1-1-1");
    },
    step1211Pic(i, item) {
      console.log(item)
      this.yanseObj = item;
      this.step1211PicIndex = i;
      this.color_i = item.id;
      this.colorPrice = item.color_price;
      this.color_name = item.color_name;
    },
    clickFY() {
      this.isFY = true;
      this.isFW = false;
      this.fsIndex1 = true;
      this.fsIndex2 = true;
      this.fsIndex3 = true;
      this.fsIndex4 = false;
    },
    clickFW() {
      this.isFW = true;
      this.isFY = false;
      this.fsIndex1 = true;
      this.fsIndex2 = false;
      this.fsIndex3 = false;
      this.fsIndex4 = true;
    },
    clickFangdaItem(i, val) {
      this.nowFangdaIndex = i;
      this.reader_num = val;
    },
    async onSubmit() {
      const res = await this.$api.add2cart({
        type_id: this.product_type_id,
        product_id: this.nowSku.id,
        num: 1,
        color_id: this.color_id,
        coatings_id: this.coatings_id,
        basicindex_id: this.basicindex_id,
        dushu_id: this.dushu_id,
        reader_num: this.reader_num,
        jiazi: this.stepBoxIndex == "1" ? "1" : "2",
        product_level_id: this.product_level_id,
        from: this.fromz,
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.chufangDialogVisible = false;
      } else {
        this.$message.error(res.message);
      }
    },
    step1111OnSubmit() {
      if (
        this.tongjuVal != "" ||
        (this.tongjuValLeft != "" && this.tongjuValRight != "")
      ) {
        this.toStep("1-1-1-1", "1-1-1-1-1");
      }
    },
    fanshehandleClose() {
      this.fanshedialogVisible = false;
    },
    fangdahandleClose() {
      this.fangdadialogVisible = false;
    },
    chufangleixinhandleClose() {
      this.chufangleixindialogVisible = false;
    },
    shuangjiaohandleClose() {
      this.shuangjiaodialogVisible = false;
    },
    yueduzhehandleClose() {
      this.yueduzhedialogVisible = false;
    },
    dushuhandleClose() {
      this.dushudialogVisible = false;
    },
    tongjuhandleClose() {
      this.tongjudialogVisible = false;
    },
    chufangHandleClose() {
      this.chufangDialogVisible = false;
    },
    changeNowImg(item) {
      this.show = !this.show;
      this.nowImg = item;
      setTimeout(() => {
        this.show = !this.show;
      }, 200);
    },
    changeNowImg2(item) {
      this.srcList = item.product_detail_imgs.filter(ele => {
        return ele != "";
      });
      this.nowSku = item;
      this.nowImg = this.nowSku.product_img;
      console.log(this.nowSku);
    },
    goBack() {
      this.stepShow = !this.stepShow;
      setTimeout(() => {
        this.stepShow = !this.stepShow;
        this.nowStep = this.backStep[this.backStep.length - 1];
        if (this.backStep.length > 1) {
          this.backStep.pop();
        }
        console.log(this.nowStep, this.backStep);
      }, 200);
    },
    addLJZ() {
      this.leftODsp = "";
      this.leftODcz = "";
      this.leftOScz = "";
      this.leftOSsp = "";
      this.leftODspRad1 = "";
      this.leftODczRad1 = "";
      this.leftOSczRad1 = "";
      this.leftOSspRad1 = "";
      this.ljzShow = !this.ljzShow;
    },
    async addChufang() {
      const res = await this.$api.dushu_save({
        zuo_sph: this.rightSPH,
        zuo_cyl: this.rightCYL,
        zuo_axis: this.rightAxis,
        you_sph: this.leftSPH,
        you_cyl: this.leftCYL,
        you_axis: this.leftAxis,
        one_number: this.tongjuVal,
        two_number_left: this.tongjuValLeft,
        two_number_right: this.tongjuValRight
      });
      console.log(res.data);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.toStep("1-1-1-1-1", "1-1-3");
      } else {
        this.$message.error(res.message);
      }
    },
    async toStep(backVal, val, id = "", item, fromz) {
      this.stepShow = !this.stepShow;
      if (fromz) {
        this.fromz = fromz;
      }
      console.log(this.fromz);
      if (val == "1-2") {
        // this.dushu_id = id;
        console.log(id);
        const res3 = await this.$api.product_type_list({
          level_id: id
        });
        this.yanjinleixinList = res3.data;
        this.product_level_id = id;
        console.log(this.yanjinleixinList);
      }
      if (val == "1-1-3-1") {
        this.chufangObj = item;
        this.dushu_id = id;
      }
      // if(val == '1-1-3'){

      // }
      if (val == "1-2-1") {
        this.product_type_id = id;
        const res = await this.$api.basicindex_list({
          product_type_id: this.product_type_id
        });
        this.zheshelvList = res.data;
        this.basicindex_id = id;
        this.buzhouVal = `${item.type_name}`;
        this.leixinObj = item
      }
      if (val == "1-2-1-1") {
        const res = await this.$api.product_type_color_list({
          product_type_id: this.product_type_id
        });
        this.nowZslObj = item;
        this.colorList = res.data;
        this.yanseObj = this.colorList[0]
        this.colorPrice = this.colorList[0].color_price;
        this.color_id = this.colorList[0].id;
        this.color_name = this.colorList[0].color_name;
        this.buzhouVal2 = item.basic_index;
      }
      if (val == "1-2-1-1-1") {
        const res = await this.$api.product_type_coatings_list({
          product_type_id: this.product_type_id
        });
        this.fansheList = res.data;
      }
      if (val == "1-2-1-1-1-1") {
        this.coatings_id = id;
        this.isWancheng = true;
        this.nowTucengObj = item;
      } else {
        this.isWancheng = false;
      }
      this.backStep.push(backVal);
      setTimeout(() => {
        this.stepShow = !this.stepShow;
        this.nowStep = val;
        console.log(this.nowStep, this.backStep);
      }, 200);
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
    leftODspChange(e) {
      console.log(e);
    },
    leftODczChange(e) {
      console.log(e);
    },
    leftOSspChange(e) {
      console.log(e);
    },
    leftOSczChange(e) {
      console.log(e);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.index {
}
.nav1 {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 40px 80px 100px 80px;
  .n1-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 120px;
    .n1l-pic {
      width: 66px;
      height: 66px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid #e1e1e6;
      cursor: pointer;
      margin: 8px 0;
    }
    .n1l-pic:hover {
      border: 1px solid #707070;
    }
    .n1l-pic.active {
      border: 1px solid #707070;
    }
  }
  .n1-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    .n1-top {
      width: 800px;
      height: 800px;
      margin-bottom: 60px;
    }
    .n1-bottom {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .n1b-pic {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        margin: 0 12px;
      }
      .n1b-pic:hover {
        box-shadow: 0px 0px 6px 1px #707070;
      }
    }
    .n1b-txt {
      width: 100%;
      margin-top: 20px;
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #969699;
      .sp {
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #1e1f33;
      }
    }
  }
}
.nav2 {
  box-sizing: border-box;
  margin-right: 80px;
  height: 923px;
  background: #fafafa;
  padding: 120px 60px;
  .n2-tit1 {
    display: flex;
    align-items: center;
    .txt1 {
      font-size: 40px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #1e1f33;
    }
    .txt2 {
      margin-left: 20px;
      width: 118px;
      height: 36px;
      background: #ffc234;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 36px;
    }
  }
  .n2-tit2 {
    margin: 30px 0;
    display: flex;
    align-items: center;
    .txt1 {
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #4b4b4d;
    }
  }
  .n2-tit3 {
    display: flex;
    align-items: center;
    .n2t3-item {
      background: #ffffff;
      border-radius: 3px;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #969699;
      padding: 10px 12px;
      margin-right: 10px;
      .sp {
        color: #1e1f33;
      }
    }
  }
  .n2-tit4 {
    height: 98px;
    margin-top: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 12px;
    position: relative;
    .left {
      font-size: 36px;
      color: #e61717;
    }
    .right {
      position: absolute;
      left: 200px;
      display: flex;
      flex-direction: column;
      .top {
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #4b4b4d;
      }
      .bottom {
        margin-top: 8px;
        font-size: 16px;
        color: #4b4b4d;
      }
    }
  }
  .n2-tit5 {
    margin: 40px 0 80px 0;
    display: flex;
    align-items: center;
    .pic1 {
      width: 83px;
      height: 20px;
      margin-right: 20px;
    }
    .txt1 {
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #4b4b4d;
    }
  }
  .n2-tit6 {
    cursor: pointer;
    height: 68px;
    background: #000000;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 68px;
    color: #ffffff;
  }
  .n2-tit7 {
    margin-top: 28px;
    cursor: pointer;
    height: 68px;
    height: 68px;
    border: 1px solid #707070;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 68px;
    color: #000000;
  }
  .n2-tit8 {
    margin-top: 30px;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #000000;
  }
  .n2-tit9 {
    margin-top: 24px;
    display: flex;
    align-items: center;
    .pic1 {
      width: 14px;
      height: 32px;
      margin-right: 18px;
    }
    .pic2 {
      width: 32px;
      height: 32px;
      margin-right: 18px;
    }
    .pic3 {
      width: 33px;
      height: 27px;
    }
  }
}
.box2 {
  padding: 0 80px 100px 80px;
  /deep/ .el-tabs__item {
    font-size: 16px !important;
    font-weight: 600;
  }
  .b2-nav1 {
    margin-top: 24px;
    .txt1 {
      font-size: 32px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #000000;
    }
    .tit1 {
      .el-icon-question {
        cursor: pointer;
        cursor: pointer;
        margin-left: 10px;
        color: #ffb300;
      }
      .txtt1 {
        margin-top: 20px;
        font-size: 24px;
        color: #969699;
        .spd {
          color: #000000;
          .sp {
            color: #969699;
          }
        }
        .ic1 {
          width: 42px;
          height: 26px;
          margin-right: 22px;
        }
        .ic2 {
          width: 42px;
          height: 30px;
          margin-right: 22px;
        }
        .ic3 {
          width: 42px;
          height: 28px;
          margin-right: 22px;
        }
        .ic4 {
          width: 42px;
          height: 26px;
          margin-right: 20px;
        }
        .ic5 {
          width: 56px;
          height: 15px;
          margin-right: 6.5px;
        }
        .ic6 {
          width: 42px;
          height: 14px;
          margin-right: 20px;
        }
      }
      .flex {
        display: flex;
      }
      .flexali {
        display: flex;
        align-items: center;
      }
    }
  }
  .b2-nav2 {
    margin-top: 30px;
    width: 70%;
    font-size: 24px;
    color: #969699;
    line-height: 28px;
  }
  .b2-nav3 {
    margin-top: 40px;
    position: relative;
    .floatBtn {
      position: absolute;
      top: 40;
      right: 60px;
      width: 269px;
      height: 78px;
      border: 4px solid #f0f0f0;
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      color: #333334;
      line-height: 78px;
      cursor: pointer;
    }
    .b2n3-tit1 {
      display: flex;
      align-content: center;
      .txt1 {
        margin-right: 30px;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #333334;
      }
      /deep/ .el-rate__icon {
        font-size: 24px;
      }
      /deep/ .el-rate__text {
        margin-left: 6px;
        font-size: 22px;
      }
      .txt2 {
        margin-left: 30px;
        font-size: 24px;
        color: #969699;
      }
    }
    .b2n3-tit2 {
      margin-top: 40px;
      display: flex;
      align-items: center;
      .jdt {
        width: 184px;
        height: 184px;
        position: relative;
        /deep/ .el-progress__text {
          display: none;
        }
        .good {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 75px;
        }
      }
      .txt1 {
        margin-left: 80px;
        margin-right: 28px;
        font-size: 60px;
        font-family: TenSans, TenSans-Bold;
        font-weight: 700;
        color: #333334;
        letter-spacing: -6px;
      }
      .txt2 {
        font-size: 36px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
    }
    .b2n3-tit3 {
      margin-top: 50px;
      display: flex;
      align-items: center;
      .txt1 {
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #333334;
      }
      .txt2 {
        margin-left: 46px;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        text-align: left;
        color: #333334;
      }
    }
    .b2n3-tit4 {
      margin-top: 66px;
      .tit1 {
        .txt1 {
          margin-bottom: 26px;
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #333334;
        }
        .txt2 {
          margin-left: 10px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          .txt2-1 {
            width: 100px;
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Light;
            color: #333334;
            margin-right: 28px;
          }
          /deep/ .el-progress {
            width: 80%;
          }
        }
      }
    }
    .b2n3-tit5 {
      margin-top: 60px;
      height: 121px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      padding: 0 60px;
    }
    .b2n3-tit6 {
      border-bottom: 1px solid;
      margin-top: 36px;
      .txttt1 {
        margin-top: 40px;
        font-size: 40px;
        color: #000000;
      }
      .titt2 {
        display: flex;
        align-items: center;
        margin-top: 30px;
        .txt1 {
          font-size: 24px;
          color: #969699;
        }
        .el-icon-s-custom {
          margin-left: 38px;
          font-size: 24px;
          color: #2626ff;
        }
      }
      .titt3 {
        margin-top: 26px;
        display: flex;
        align-items: center;
        .txt1 {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
          .sp {
            color: #969699;
          }
        }
      }
      .titt4 {
        margin: 34px 0 20px 0;
        font-size: 18px;
        color: #4b4b4d;
        line-height: 24px;
      }
      .titt5 {
        font-size: 16px;
        color: #969699;
        margin-bottom: 40px;
      }
      .imgItems {
        margin-top: 0;
        .item {
          width: 216px;
          height: 216px;
        }
      }
    }
  }
  .imgItems {
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .imgitem {
      width: 18%;
      height: 367px;
    }
  }
}
.box3 {
  box-sizing: border-box;
  background: #f5f5f5;
  padding: 40px 60px;
  .tit1 {
    font-size: 32px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    color: #000000;
  }
  .nav6 {
    margin: 50px 60px 0 60px;
    .swItem {
      width: 100%;
      background: #ffffff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      .sw-pic1 {
        width: 100%;
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
        margin-bottom: 30px;
      }
    }
  }
}
.box4 {
  background: #ffffff;
  height: 58px;
}
.chufangDia {
  .left {
    margin: 0 80px;
    .l-pic {
      width: 100%;
      height: 500px;
    }
    .l-tit1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
      padding: 20px 0;
      border-bottom: 1px solid #e6e6e6;
      .lt1-left {
        display: flex;
        align-items: center;
        .lt1-txt1 {
          font-size: 24px;
          color: #969699;
        }
        .lt1-txt2 {
          font-size: 24px;
          color: #969699;
          margin-left: 100px;
        }
      }
      .lt1-right {
        font-size: 24px;
        font-weight: 800;
        color: #000000;
      }
    }
    .l-tit2 {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lt1-left {
        font-size: 24px;
        color: #969699;
      }
      .lt1-right {
        font-size: 48px;
        font-family: PingFang SC, PingFang SC-Heavy;
        font-weight: 800;
        color: #000000;
      }
    }
    .l-tit3 {
      margin-top: 20px;
      .lt3-tit1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #2626ff;
      }
      .lt3-step {
        .lt3s-tit1 {
          display: flex;
          align-items: center;
          margin-top: 10px;
          .step1 {
            margin-right: 24px;
            width: 30px;
            height: 30px;
            background: #000000;
            border-radius: 50%;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 600;
            text-align: center;
            line-height: 30px;
            color: #ffffff;
          }
          .step1-tx {
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 800;
            color: #000000;
          }
        }
        .lt3s-tit2 {
          margin: 10px 0 10px 15px;
          padding: 0 0 0 38px;
          border-left: 1px solid #e1e2e6;
          .lt3s-txt1 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .lt3s-left {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Light;
              font-weight: 300;
              text-align: left;
              color: #969699;
              line-height: 18px;
            }
            .lt3s-right {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Light;
              font-weight: 700;
              text-align: left;
              color: #000000;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
  /*滚动条样式*/
  .right::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #f5f5ff;
  }
  .right::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  .right::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .right {
    overflow-y: auto;
    background: #fafafa;
    height: 840px;
    width: 100%;
    position: relative;
    .p.el-icon-arrow-left {
      font-size: 26px;
      font-weight: 700;
      color: #000000;
      position: absolute;
      top: 28px;
      left: 20px;
      cursor: pointer;
    }
    .r-tit1 {
      padding-top: 30px;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: center;
      color: #000000;
      margin-bottom: 40px;
    }
    .r-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      .r-box {
        cursor: pointer;
        width: 90%;
        height: 106px;
        background: #333334;
        border-radius: 3px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        .rb-haveImg {
          display: flex;
          align-items: center;
          width: 90%;
          .rb-img {
            transform: translateX(-8px);
            width: 66px;
            height: 33px;
            margin-right: 4px;
          }
        }
        .rb-left {
          display: flex;
          flex-direction: column;
          width: 90%;
          .rb-tit1 {
            font-size: 32px;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 800;
            color: #ffffff;
          }
          .rb-tit2 {
            font-size: 22px;
            font-family: PingFang SC, PingFang SC-Light;
            color: #ffffff;
            margin-top: 20px;
          }
          .rb-tit3 {
            line-height: 16px;
            font-weight: 300;
            margin-top: 14px;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .rb-right {
          .el-icon-arrow-right {
            font-size: 26px;
            color: #ffffff;
          }
        }
      }
    }
    .r-ntit1 {
      padding-top: 30px;
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      color: #000000;
      margin-bottom: 16px;
    }
    .r-ntit2 {
      font-size: 14px;
      text-align: center;
      color: #969699;
      font-weight: 300;
    }
    .r-nItems {
      margin: 30px 20px;
      .r-nItem {
        .r-ntxt1 {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #000000;
          margin-bottom: 10px;
        }
        .r-nbox1 {
          display: flex;
          padding: 14px 20px;
          background: #333334;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 3px;
          margin-bottom: 16px;
          cursor: pointer;
          .rnb-left {
            .rnb-tit {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Light;
              color: #ffffff;
              line-height: 22px;
              font-weight: 300;
            }
          }
          .rnb-right {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Light;
            text-align: right;
            color: #ffb300;
            .el-icon-arrow-right {
              font-size: 18px;
              color: #ffffff;
            }
          }
        }
      }
    }
    // .r-nntit1 {
    //   padding: 70px 20px 0 20px;
    //   font-size: 22px;
    //   font-family: PingFang SC, PingFang SC-Heavy;
    //   font-weight: 800;
    //   color: #000000;
    // }
    .step1-1-1-1box {
      padding: 0 20px;
      .tit1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        .t-left {
          font-size: 22px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .el-icon-question {
          cursor: pointer;
          color: #ffb300;
          font-size: 22px;
        }
      }
      .tit2 {
        margin-top: 30px;
        /deep/ .el-radio__input.is-checked {
          .el-radio__inner {
            border-color: #000000;
            background: #000000;
            // width: 20px;
            // height: 20px;
          }
        }
        /deep/ .el-radio__input.is-checked + .el-radio__label {
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
        /deep/ .el-select {
          width: 100%;
        }
        .txxx {
          font-size: 18px;
          margin-bottom: 6px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: left;
          color: #000000;
        }
      }
      .tit3 {
        margin-top: 40px;
        width: 100%;
        height: 60px;
        background: #969699;
        border-radius: 3px;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
        line-height: 60px;
      }
      .tit3.active {
        cursor: pointer;
        background: #000000;
      }
    }
    .step1-1-2box {
      padding: 0 20px;
      position: relative;
      .el-icon-question {
        position: absolute;
        font-size: 22px;
        right: 20px;
        top: -62px;
        cursor: pointer;
        color: #ffb300;
      }
      .iitem {
        cursor: pointer;
        height: 46px;
        border: 1px solid #e1e2e6;
        border-radius: 3px;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        text-align: center;
        color: #969699;
        line-height: 46px;
      }
      .iitem.active {
        background: #333334;
        color: #ffffff;
      }
      .tit3 {
        cursor: pointer;
        margin: 40px 0;
        width: 100%;
        height: 60px;
        background: #000000;
        border-radius: 3px;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
        line-height: 60px;
      }
    }
    .step1-1-2-1box {
      padding: 0 20px;
      .item {
        cursor: pointer;
        margin-top: 20px;
        padding: 12px;
        background: #ffffff;
        border: 1px solid #d0b28b;
        border-radius: 3px;
        .tit1 {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #000000;
          .sp {
            margin-left: 12px;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Light;
            font-weight: 300;
            color: #333334;
          }
        }
        .tit2 {
          margin-top: 12px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #333334;
        }
        .tit3 {
          margin-top: 12px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #333334;
        }
        .tit4 {
          margin-top: 20px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .tit5 {
          margin-top: 10px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #2626ff;
        }
      }
    }
    .step1-1-2-1-1box {
      padding: 0 20px;
      .tit1 {
        margin-top: 40px;
        margin-bottom: 24px;
        font-size: 22px;
        color: #000000;
      }
      .tit2 {
        font-size: 22px;
        color: #000000;
        .sp {
          color: #2626ff;
        }
      }
      .tit3 {
        border-top: 1px solid #e1e2e6;
        border-bottom: 1px solid #e1e2e6;
        padding: 16px 0;
        margin-top: 34px;
        .txt1 {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #000000;
        }
        .txtx1 {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
          margin-bottom: 16px;
          text-align: center;
        }
        .txtx2 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Light;
          font-weight: 300;
          color: #000000;
          text-align: center;
        }
      }
      .tit4 {
        cursor: pointer;
        margin-top: 80px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 18px;
        color: #ffffff;
        background: #000000;
        border-radius: 3px;
      }
      .tit5 {
        cursor: pointer;
        margin-top: 20px;
        font-size: 18px;
        text-align: center;
        color: #000000;
      }
    }
    .step1-1-1-1-1box {
      padding: 0 20px;
      .txt1 {
        margin-top: 30px;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
      .tit1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        .t-left {
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .el-icon-question {
          cursor: pointer;
          color: #ffb300;
          font-size: 20px;
        }
      }
      .tit2 {
        margin-top: 20px;
        .txtt1 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
          margin-bottom: 10px;
        }
      }
      .tit3 {
        cursor: pointer;
        margin: 40px 0;
        width: 100%;
        height: 60px;
        background: #000000;
        border-radius: 3px;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
        line-height: 60px;
      }
      .tit4 {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t-left {
          display: flex;
          align-items: center;
          .btn {
            cursor: pointer;
            width: 190px;
            height: 42px;
            background: #000000;
            border-radius: 3px;
            font-size: 14px;
            text-align: center;
            color: #e1e2e6;
            line-height: 42px;
            margin-right: 20px;
          }
        }
        .el-icon-question {
          cursor: pointer;
          color: #ffb300;
          font-size: 20px;
        }
      }
      .tit5 {
        margin-top: 30px;
        .txtt1 {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
          margin-bottom: 10px;
        }
        .tx1 {
          margin: 10px 0;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .tx2 {
          margin: 10px 0 16px 0;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        /deep/ .el-radio {
          transform: translateY(6px);
        }
        /deep/ .el-radio__input.is-checked {
          .el-radio__inner {
            border-color: #000000;
            background: #000000;
            // width: 20px;
            // height: 20px;
          }
        }
        /deep/ .el-radio__input.is-checked + .el-radio__label {
          color: #000000;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }

    .step1-2-1-1box {
      padding: 0 20px;
      position: relative;
      .r-nntit1 {
        margin-top: 90px;
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Heavy;
        font-weight: 800;
        color: #000000;
      }
      .stepnav1 {
        margin-top: 12px;
        background: #ffffff;
        border: 1px solid #e1e2e6;
        border-radius: 3px;
        padding: 22px 20px;
        .tit1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .txt1 {
            font-size: 18px;
            color: #333334;
          }
          .txt2 {
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Light;
            font-weight: 300;
            color: #ffb300;
          }
        }
        .tit2 {
          margin-top: 12px;
          font-size: 16px;
          font-weight: 300;
          color: #333334;
        }
        .items {
          margin-top: 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          .item {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            // margin-left: 20px;
            .pic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .pic.active {
              box-shadow: 0px 0px 5px 2px #000000;
            }
            .txt {
              margin-top: 12px;
              font-size: 14px;
              color: #333334;
            }
          }
        }
      }
      .stepnav2 {
        margin-top: 20px;
        background: #333334;
        border-radius: 3px;
        padding: 18px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t3-left {
          font-size: 16px;
          font-weight: 300;
          color: #ffffff;
        }
        .t3-right {
          font-size: 16px;
          font-weight: 300;
          color: #ffb300;
        }
      }
      .stepnav3 {
        cursor: pointer;
        margin-top: 100px;
        height: 60px;
        background: #000000;
        border-radius: 3px;
        font-size: 18px;
        text-align: center;
        color: #ffffff;
        line-height: 60px;
      }
    }
    .step1-2-1-1-1box {
      padding: 0 20px;
      position: relative;
      .el-icon-question {
        position: absolute;
        font-size: 22px;
        right: 20px;
        top: -62px;
        cursor: pointer;
        color: #ffb300;
      }
      .steptxt1 {
        padding-top: 20px;
        font-size: 22px;
        font-weight: 800;
        color: #000000;
      }
      .steptxt2 {
        margin-top: 10px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #333334;
      }
      .r-nItems {
        margin: 30px 0px;
        .r-nItem {
          margin-bottom: 24px;
        }
        .r-ntxt1 {
          font-size: 18px;
        }
        .r-nbox1 {
          background: #ffffff;
          border: 1px solid #d0b28b;
          border-radius: 3px;
          .myLeft {
            display: flex;
            align-items: center;
            .pic {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .rnb-left {
              margin-left: 16px;
              .rnb-tit1 {
                color: #000000;
                font-size: 18px;
                font-family: PingFang SC, PingFang SC-Heavy;
                font-weight: 800;
                color: #000000;
              }
              .rnb-tit2 {
                margin-top: 10px;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Light;
                font-weight: 300;
                color: #333334;
              }
            }
          }
          .rnb-right {
            .el-icon-arrow-right {
              color: #000000;
              font-weight: 800;
              font-size: 20px;
            }
          }
        }
      }
    }
    .step1-2-1-1-1-1box {
      padding: 0 20px;
      .boxxs {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        .boxx1 {
          cursor: pointer;
          width: 180px;
          height: 200px;
          border: 1px solid #e1e2e6;
          display: flex;
          flex-direction: column;
          align-items: center;
          .pic {
            width: 135px;
            height: 45px;
            margin-top: 60px;
          }
          .txt {
            margin-top: 50px;
            font-size: 16px;
            color: #969699;
          }
        }
        .boxx1.active {
          border: 1px solid #000000;
        }
        .boxx2.active {
          border: 1px solid #000000;
        }
        .boxx2 {
          width: 180px;
          height: 200px;
          border: 1px solid #e1e2e6;
          margin-left: 20px;
        }
      }
      .step-tit1 {
        margin-top: 100px;
        font-size: 16px;
        text-align: center;
        color: #969699;
      }
      .step-tit2 {
        cursor: pointer;
        margin-top: 90px;
        width: 100%;
        height: 72px;
        background: #000000;
        border-radius: 3px;
        font-size: 24px;
        text-align: center;
        color: #ffffff;
        line-height: 72px;
      }
      .step-tit3 {
        cursor: pointer;
        margin-top: 28px;
        font-size: 24px;
        text-align: center;
        color: #000000;
      }
    }
  }
}
.tongjuDia {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  /deep/ .el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-tabs__header {
      width: 70%;
    }
  }
  /deep/ .el-tabs--top .el-tabs__item.is-top {
    padding: 0 20px;
    font-size: 16px;
  }
  /deep/ .el-tab-pane {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pic {
    margin-top: 40px;
    width: 300px;
    height: 200px;
  }
  .txt {
    line-height: 20px;
    margin-top: 30px;
    width: 80%;
    font-size: 18px;
    font-family: Segoe UI, Segoe UI-Regular;
    font-weight: 300;
    color: #707070;
  }
}
.fansheDia {
  .fsbox {
    padding: 20px 0;
    .top {
      display: flex;
      align-items: center;
      .pic1 {
        cursor: pointer;
        width: 48px;
        height: 70px;
        margin-right: 70px;
      }
      .pic2 {
        cursor: pointer;
        width: 80px;
        height: 80px;
      }
      .pic3 {
        cursor: pointer;
        width: 70px;
        height: 40px;
        margin-left: 60px;
      }
    }
    .down {
      margin-top: 10px;
      font-size: 16px;
      text-align: center;
      color: #000000;
    }
  }
  .txx {
    font-size: 28px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #000000;
    margin-bottom: 16px;
  }
  .pic2 {
    height: 178px;
  }
  .fstxt {
    margin: 20px 20px 0 20px;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    color: #000000;
    .sp {
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 300;
      color: #333334;
    }
  }
  .fstxt2 {
    margin-top: 30px;
    width: 93%;
    font-size: 16px;
    color: #000000;
  }
  .items {
    margin-top: 16px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .it-pic {
        width: 80px;
        height: 80px;
      }
      .it-txt1 {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 14px;
        color: #000000;
      }
      .el-icon-success {
        font-size: 30px;
        color: #e1e2e6;
      }
      .el-icon-success.active {
        font-size: 30px;
        color: #000000;
      }
    }
  }
  /deep/ .el-tabs--top .el-tabs__item.is-top {
    padding: 0 40px;
    font-size: 16px;
  }
}
.dushuDia {
  padding: 0 14px;
  margin-bottom: 20px;
  .txt1 {
    font-size: 22px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    text-align: left;
    margin-bottom: 20px;
    color: #000000;
  }
  .txt2 {
    font-size: 16px;
    font-family: Segoe UI, Segoe UI-Bold;
    line-height: 18px;
    font-weight: 300;
    text-align: left;
    color: #707070;
  }
}
.yueduzheDia {
  padding: 0 20px;
  .txt1 {
    font-size: 22px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    color: #000000;
  }
  .txt2 {
    margin-top: 16px;
    font-size: 16px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 300;
    color: #000000;
    line-height: 18px;
  }
  .tit3 {
    margin: 30px 0;
    /deep/ .el-table {
      margin: 0 auto;
    }
  }
  .txt4 {
    font-size: 22px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    color: #000000;
  }
}
.chufangleixinDia {
  margin-bottom: 10px;
  .txt1 {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #000000;
  }
  .tit3 {
    margin: 20px 0;
    /deep/ .el-table .cell {
      font-size: 14px;
      color: #969699;
    }
    /deep/ .el-table th.is-leaf {
      .cell {
        color: #000000 !important;
      }
      background: #f5f5f5;
      font-weight: 700;
    }
  }
  .tit2 {
    font-size: 16px;
    font-family: Segoe UI, Segoe UI-Regular;
    font-weight: 300;
    line-height: 18px;
    color: #707070;
  }
}
.fangdaDia {
  .txt1 {
    font-size: 26px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #000000;
  }
  .txt2 {
    margin-top: 30px;
    font-size: 16px;
    font-family: Segoe UI, Segoe UI-Regular;
    font-weight: 300;
    text-align: center;
    color: #707070;
  }
  .tit3 {
    margin: 20px 40px;
    /deep/ .el-table .cell {
      font-size: 14px;
      color: #969699;
    }
    /deep/ .el-table th.is-leaf {
      .cell {
        color: #000000 !important;
      }
      background: #f5f5f5;
      font-weight: 700;
    }
  }
}
</style>