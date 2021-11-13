<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">
        <div class="txt1">第一步：选择数据来源平台</div>
        <div class="myRadio">
          <el-radio-group v-model="radioVal1" size="small">
            <el-radio-button label="淘宝/天猫"></el-radio-button>
            <el-radio-button label="京东"></el-radio-button>
            <el-radio-button label="拼多多"></el-radio-button>
            <el-radio-button label="抖音"></el-radio-button>
            <el-radio-button label="其他"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="nav1 nav2">
        <div class="txt1">第二步：录入收件人信息</div>
        <div class="myRadio">
          <el-radio-group v-model="radioVal2" size="small">
            <el-radio-button label="手动输入"></el-radio-button>
            <el-radio-button label="模板导入"></el-radio-button>
            <!-- <el-radio-button label="智能筛选"></el-radio-button> -->
            <!-- <el-radio-button
              v-if="radioVal1 == '淘宝/天猫'"
              label="淘宝一键下单"
            ></el-radio-button>-->
            <!-- <el-radio-button
              v-if="radioVal1 == '拼多多'"
              label="拼多多一键下单"
            ></el-radio-button>-->
          </el-radio-group>
        </div>
      </div>
      <template v-if="radioVal2 == '手动输入'">
        <img src="../../assets/newImg/fh_03.jpg" class="pic-top" alt="">
        <div class="nav3">
          <div class="nav3-1">
            <div class="txt1">格式要求：</div>
            <!-- <div class="txt1">查看视频教程订单</div> -->
            <div class="txt1 color">编号,姓名,电话,地址按顺序填写,中间用逗号分隔。一次可以输入多个收件人信息，一个收件人信息一行输入。</div>
            <div class="txt1">示例：</div>
            <div class="txt1 color">0000000,张三,13900000000,浙江省杭州市西湖区江南大道88号;</div>
            <div class="txt1">订单编号：淘、猫、京、拼等平台订单编号，如无订单编号可随机填写。</div>
            <div class="txt1">如遇东莞市、中山市、天门市、三沙市、儋州市、嘉峪关市等没有区的城市，区域可设置为“其他区”</div>
            <!-- <div class="txt1 txt2">一键批量发货说明：</div>
            <div class="txt1">1、使用方式：从网站千牛卖家发货中心或京东商家中心跳转至云仓包裹下单并自动上传快递单号。</div>
            <div class="txt1">
              2、该批量发货方式需要先1、使用方式：从网站千牛卖家发货中心或京东商家中心跳转至云仓包裹下单并自动上传快递单号。2、该批量发货方式需要先
              <span
                class="colorspan"
              >下载安装插件</span>（打开浏览器的扩展程序，然后在那里加载已解压的插件）查看视频教程
            </div>
            <div class="txt1">点击查看快递停发区域</div> -->
          </div>
          <!-- 生成表格 -->
          <div class="myTable1">
            <vxe-table :data="createTableData">
              <vxe-table-column field="id" width="50" title="#"></vxe-table-column>
              <vxe-table-column field="order" title="订单编号"></vxe-table-column>
              <vxe-table-column field="name" title="姓名"></vxe-table-column>
              <vxe-table-column field="phone" title="电话"></vxe-table-column>
              <vxe-table-column field="myAddress" title="地址"></vxe-table-column>
              <vxe-table-column field="msg" title="状态">
                <template slot-scope="scope">
                  <span :class="{'myRed':scope.row.status == 0}">{{scope.row.msg}}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column title="操作" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button
                      size="small"
                      @click="tabEdit(scope.row,scope.rowIndex)"
                      type="text"
                    >编辑</el-button>
                    <el-button size="small" @click="tabDel(scope.row,scope.rowIndex)" type="text">删除</el-button>
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
          <div class="nav3-2">
            <div class="txt1">收件人信息</div>
            <el-input type="textarea" :rows="8" placeholder="订单编号，姓名，电话，地址;" v-model="textarea1"></el-input>
            <div @click="wanchengtianjia" class="btn">完成添加</div>
          </div>
        </div>
        <img src="../../assets/newImg/fh_08.jpg" class="pic-bottom" alt="">
        <div class="nav4">
          <div class="txt1">最后一步：选择赠送礼品</div>
          <div class="txt4">
            <div class="myTable">
              <vxe-table :header-cell-class-name="headerCellClassName" :data="tableData3">
                <vxe-table-column width="280" title="商品名称">
                  <template slot-scope="scope">
                    <div class="tab1">
                      <img class="pic" :src="scope.row.image_id" />
                      <p class="txt">{{ scope.row.name }}</p>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="stock"
                  title="库存"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="price"
                  title="单价"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="num"
                  title="采购数量"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="weight"
                  title="单重量"
                ></vxe-table-column>
                <template #empty>
                  <div class="tabEmpty" @click="tjbjDialogVisible = true">
                    <img class="pic" src="../../assets/newImg/zu251.png" />
                    <p class="txt">选择商品</p>
                  </div>
                </template>
              </vxe-table>
            </div>
            <div class="btnn" @click="tjbjDialogVisible = true">
              <img class="pic" src="../../assets/newImg/tubiaoxie.png" alt />
              <div class="txt">编辑商品</div>
            </div>
            <div v-if="tableData.length > 0" class="lab">
              <div class="txt">财务备注：</div>
              <el-input class="labInp" v-model="sdsrcwbzVal1"></el-input>
            </div>
            <div class="footer">
              <div @click="onSubmitTijiao" class="btn">确认订单￥{{ zongPrice.toFixed(2) }}</div>
              <div class="txt">总共 {{ peopleNum }} 个 收件人，每位价格 ￥ {{ shopPrice.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="radioVal2 == '模板导入'">
        <img src="../../assets/newImg/fh_03.jpg" class="pic-top" alt="">
        <div class="nav3-mbdr">
          <div class="box1">
            <div class="left">
              <el-upload
                class="upload-demo"
                drag
                action="/"
                multiple
                :http-request="newupLoadSuccess"
              >
                <!-- <i class="el-icon-upload"></i> -->
                <img class="upLoadImg" src="../../assets/newImg/lujin498.png" alt />
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
            <div class="right">
              <div class="tit1">
                <div class="shu"></div>
                <div class="txt1">注意事项：</div>
              </div>
              <div class="tit2">1、仅支持CSV、XLXS、XLS文件</div>
              <div class="tit2">2、文件大小限制在5m以内</div>
              <div class="tit2">3、如果您对ExCel操作比较熟悉，可以下载后台订单，筛选后直接上传</div>
              <div @click="uploadExl" class="tit2 red">4、导入模版下载</div>
            </div>
          </div>
          <div @click="querenShangchuan" class="box2">
            <img class="pic" src="../../assets/newImg/zu139.png" alt />
            <div class="txt">确认上传</div>
          </div>
          <!-- 生成表格 -->
          <div class="myTable1 tab2">
            <vxe-table :data="createTableData">
              <vxe-table-column field="id" width="50" title="#"></vxe-table-column>
              <vxe-table-column field="order" title="订单编号"></vxe-table-column>
              <vxe-table-column field="name" title="姓名"></vxe-table-column>
              <vxe-table-column field="phone" title="电话"></vxe-table-column>
              <vxe-table-column field="myAddress" title="地址"></vxe-table-column>
              <vxe-table-column field="msg" title="状态">
                <template slot-scope="scope">
                  <span :class="{'myRed':scope.row.status == 0}">{{scope.row.msg}}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column title="操作" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button
                      size="small"
                      @click="tabEdit(scope.row,scope.rowIndex)"
                      type="text"
                    >编辑</el-button>
                    <el-button size="small" @click="tabDel(scope.row,scope.rowIndex)" type="text">删除</el-button>
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
        <img src="../../assets/newImg/fh_08.jpg" class="pic-bottom" alt="">
        <div class="nav4">
          <div class="txt1">最后一步：选择赠送礼品</div>
          <div class="txt4">
            <div class="myTable">
              <vxe-table :header-cell-class-name="headerCellClassName" :data="tableData3">
                <vxe-table-column width="280" title="商品名称">
                  <template slot-scope="scope">
                    <div class="tab1">
                      <img class="pic" :src="scope.row.image_id" />
                      <p class="txt">{{ scope.row.name }}</p>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="stock"
                  title="库存"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="price"
                  title="单价"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="num"
                  title="采购数量"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="weight"
                  title="单重量"
                ></vxe-table-column>
                <template #empty>
                  <div class="tabEmpty" @click="tjbjDialogVisible = true">
                    <img class="pic" src="../../assets/newImg/zu251.png" />
                    <p class="txt">选择商品</p>
                  </div>
                </template>
              </vxe-table>
            </div>
            <div class="btnn" @click="tjbjDialogVisible = true">
              <img class="pic" src="../../assets/newImg/tubiaoxie.png" alt />
              <div class="txt">编辑商品</div>
            </div>
            <div v-if="tableData.length > 0" class="lab">
              <div class="txt">财务备注：</div>
              <el-input class="labInp" v-model="sdsrcwbzVal1"></el-input>
            </div>
            <div class="footer">
              <div @click="querenShangchuan2" class="btn">确认订单￥{{ zongPrice.toFixed(2) }}</div>
              <div class="txt">总共 {{ peopleNum }} 个 收件人，每位价格 ￥ {{ shopPrice.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="radioVal2 == '智能筛选'">
        <div class="nav3-znsx nav3-mbdr">
          <div class="box1">
            <div class="left">
              <el-upload
                class="upload-demo"
                drag
                action="http://ht.yuncanggift.com/home/order/getFilterData"
                multiple
                :on-success="upLoadSuccess"
              >
                <!-- <i class="el-icon-upload"></i> -->
                <img class="upLoadImg" src="../../assets/newImg/lujin498.png" alt />
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
            <div class="right">
              <div class="tit1">
                <div class="shu"></div>
                <div class="txt1">注意事项：</div>
              </div>
              <div class="tit2">1、仅支持CSV、XLXS、XLS文件</div>
              <div class="tit2">2、文件大小限制在5m以内</div>
              <div class="tit2">3、如果您对ExCel操作比较熟悉，可以下载后台订单，筛选后直接上传</div>
              <div @click="uploadExl" class="tit2 red">4、导入模版下载</div>
            </div>
          </div>
          <div class="box2-2">
            <div class="myRadio">
              <el-radio-group v-model="radioVal3" size="small">
                <el-radio-button label="订单号筛选"></el-radio-button>
                <el-radio-button label="收件人筛选"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="box2-3">
            <el-input class="kddh" type="textarea" v-model="znsxTextarea1"></el-input>
          </div>
          <!-- <div class="box2-4">确定筛选</div> -->
        </div>
        <div class="nav4">
          <div class="txt1">最后一步：选择赠送礼品</div>
          <div class="txt4">
            <div class="myTable">
              <vxe-table :header-cell-class-name="headerCellClassName" :data="tableData3">
                <vxe-table-column width="280" title="商品名称">
                  <template slot-scope="scope">
                    <div class="tab1">
                      <img class="pic" :src="scope.row.image_id" />
                      <p class="txt">{{ scope.row.name }}</p>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="stock"
                  title="库存"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="price"
                  title="单价"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="num"
                  title="采购数量"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="weight"
                  title="单重量"
                ></vxe-table-column>
                <template #empty>
                  <div class="tabEmpty" @click="tjbjDialogVisible = true">
                    <img class="pic" src="../../assets/newImg/zu251.png" />
                    <p class="txt">选择商品</p>
                  </div>
                </template>
              </vxe-table>
            </div>
            <div class="btnn" @click="tjbjDialogVisible = true">
              <img class="pic" src="../../assets/newImg/tubiaoxie.png" alt />
              <div class="txt">编辑商品</div>
            </div>
            <div v-if="tableData.length > 0" class="lab">
              <div class="txt">财务备注：</div>
              <el-input class="labInp" v-model="sdsrcwbzVal1"></el-input>
            </div>
            <div class="footer">
              <div @click="onSubmitZhineng" class="btn">确认订单￥{{ zongPrice.toFixed(2) }}</div>
              <div class="txt">总共 {{ peopleNum }} 个 收件人，每位价格 ￥ {{ shopPrice.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="radioVal2 == '淘宝一键下单' || radioVal2 == '拼多多一键下单'">
        <div class="nav3-tbyjxd">
          <div class="tit1">
            <div class="shu"></div>
            <div class="txt1">选择自动发货</div>
            <div v-if="radioVal2 == '拼多多一键下单'" class="pddVideo">
              <img src="../../assets/newImg/zu129.png" alt class="pic" />
              <div class="txt">查看视频教程</div>
            </div>
          </div>
          <div class="tit2">
            <el-select v-model="TBvalue" placeholder="请选择店铺（自动发货）">
              <el-option
                v-for="item in TBoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div @click="xzdpDialogVisible = true" class="bt1">新增店铺</div>
            <div @click="ckdplbDialogVisible = true" class="bt1">查看店铺列表</div>
          </div>
          <div v-if="radioVal2 == '拼多多一键下单'" class="pdd-radio">
            <el-radio-group v-model="pddRadio">
              <el-radio label="pddsNo">按订单号筛选</el-radio>
              <el-radio label="pddTime">按时间筛选</el-radio>
            </el-radio-group>
          </div>
          <div v-if="radioVal2 == '拼多多一键下单' && pddRadio == 'pddTime'" class="pddTimeInp">
            <el-date-picker
              v-model="pddTimeArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="btn">获取拼多多订单</div>
          </div>

          <div class="tit3">
            <div class="left">
              <el-input
                placeholder="一行一条"
                class="TBtextarea"
                type="textarea"
                v-model="tbyjfhTextarea1"
              ></el-input>
            </div>
            <div class="right">
              <div class="tit1">
                <div class="shu"></div>
                <div class="txt1">注意事项：</div>
              </div>
              <div class="tit2 yello">【选择后可到订单列表进行一键发货】</div>
              <div class="tit2">1、建议订单号不要超过100条</div>
              <div class="tit2">2、点击授权时，若没有跳转到授权页面，请重新授权</div>
              <div class="tit2">3、不支持淘宝一键下单的仓储：广州极兔仓、广州申通仓、华北顺丰仓</div>
            </div>
          </div>
          <div class="tit4">完成添加</div>
        </div>
        <div class="nav3-tbyjxd-tit6">
          <div class="myTable">
            <vxe-table
              :header-cell-class-name="headerCellClassName2"
              align="center"
              :data="tableData"
            >
              <vxe-table-column
                show-overflow="title"
                show-footer-overflow
                field="name"
                title="订单编号"
              ></vxe-table-column>
              <vxe-table-column show-overflow="title" show-footer-overflow field="role" title="姓名"></vxe-table-column>
              <vxe-table-column show-overflow="title" show-footer-overflow field="age" title="电话"></vxe-table-column>
              <vxe-table-column show-overflow="title" show-footer-overflow field="sex" title="地址"></vxe-table-column>
              <vxe-table-column
                show-overflow="title"
                show-footer-overflow
                field="address"
                title="状态"
              ></vxe-table-column>
              <vxe-table-column title="操作状态" width="180">
                <template slot-scope="scope">
                  <div class="flex">
                    <div
                      class="delBtn yellow"
                      @click="tbyjxddel(scope.row)"
                      type="text"
                      size="small"
                    >删除</div>
                    <div class="delBtn" @click="tbyjxdEdit(scope.row)" type="text" size="small">编辑</div>
                  </div>
                </template>
              </vxe-table-column>
              <template #empty>
                <div class="tabEmpty">
                  <img class="pic" src="../../assets/newImg/zu261.png" />
                  <p class="txt">没有相关内容</p>
                </div>
              </template>
            </vxe-table>
          </div>
        </div>
        <div class="nav3-tbyjxd-tit5">
          <div class="txt1">最后一步：选择赠送礼品</div>
          <div class="txt4">
            <div class="myTable">
              <vxe-table :header-cell-class-name="headerCellClassName" :data="tableData">
                <vxe-table-column width="280" title="商品名称">
                  <template slot-scope="scope">
                    <div class="tab1">
                      <img class="pic" src="../../assets/newImg/zu251.png" />
                      <p class="txt">{{ scope.row.name }}</p>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="role"
                  title="订单状态"
                ></vxe-table-column>
                <vxe-table-column show-overflow="title" show-footer-overflow field="age" title="库存"></vxe-table-column>
                <vxe-table-column show-overflow="title" show-footer-overflow field="sex" title="单价"></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="status"
                  title="采购数量"
                ></vxe-table-column>
                <vxe-table-column
                  show-overflow="title"
                  show-footer-overflow
                  field="address"
                  title="单重量"
                ></vxe-table-column>
                <template #empty>
                  <div class="tabEmpty">
                    <img class="pic" src="../../assets/newImg/zu251.png" />
                    <p class="txt">选择商品</p>
                  </div>
                </template>
              </vxe-table>
            </div>
            <div class="btnn">
              <img class="pic" src="../../assets/newImg/tubiaoxie.png" alt />
              <div class="txt">编辑商品</div>
            </div>
            <div v-if="tableData.length > 0" class="lab">
              <div class="txt">财务备注：</div>
              <el-input class="labInp" v-model="TBcwbzVal1"></el-input>
            </div>
            <div class="footer">
              <div class="btn">确认订单￥0.00</div>
              <div class="txt">总共 0 个 收件人，每位价格 ￥ 0</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 添加/编辑商品 -->
    <div class="tjbjDio">
      <el-dialog
        title="添加/编辑商品"
        :visible.sync="tjbjDialogVisible"
        :before-close="tjbjHandleClose"
        width="1200px"
      >
        <div id="tjbj">
          <div class="left">
            <div class="nav1">
              <div class="search">
                <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select">
                  <el-button
                    @click="mySearchData"
                    slot="append"
                    class="searchBtn"
                    icon="el-icon-search"
                  >搜索</el-button>
                </el-input>
              </div>
              <div class="search2">商城产品</div>
            </div>
            <div class="nav3">
              <el-form class="form" ref="form" :model="form" label-width="120px">
                <el-form-item label="分类筛选：">
                  <el-radio-group v-model="form.fenlei" size="small">
                    <el-radio-button
                      v-for="item in dataObj.goods_classify"
                      :key="item.id"
                      :label="item.name"
                    ></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="仓储：">
                  <el-radio-group @change="changeVal1" v-model="form.cangchu" size="small">
                    <el-radio-button
                      v-for="item in dataObj.yun_cang"
                      :key="item.id"
                      :label="item.id"
                    >{{item.logi_name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="面单：">
                  <el-radio-group @change="changeVal2" v-model="form.miandan" size="small">
                    <el-radio-button
                      v-for="item in dataObj.kd_data"
                      :key="item.id"
                      :label="item.name"
                    ></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="排序：">
                  <div class="btnItem">
                    <div class="bt1" @click="jiagezuidi">
                      <div :class="{ txt: true, active: form.jiage == 1 }">价格最低</div>
                      <img
                        class="pic"
                        v-if="form.jiage == 1"
                        src="../../assets/newImg/zu69.png"
                        alt
                      />
                      <img class="pic" v-else src="../../assets/newImg/zu71.png" alt />
                    </div>
                    <div class="bt1" @click="fabu">
                      <div :class="{ txt: true, active: form.fabu == 1 }">最新发布</div>
                      <img class="pic" v-if="form.fabu == 1" src="../../assets/newImg/zu69.png" alt />
                      <img class="pic" v-else src="../../assets/newImg/zu71.png" alt />
                    </div>
                    <div class="bt1" @click="paixu">
                      <div :class="{ txt: true, active: form.morenpaixu == 1 }">默认排序</div>
                      <img
                        class="pic"
                        v-if="form.morenpaixu == 1"
                        src="../../assets/newImg/zu69.png"
                        alt
                      />
                      <img class="pic" v-else src="../../assets/newImg/zu71.png" alt />
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="items">
              <div class="item" v-for="item in tableData2" :key="item.id">
                <img class="pic1" :src="item.image_id" alt />
                <div class="tit1">{{ item.name }}</div>
                <div class="tit2">
                  <div class="tit2-1">¥{{ item.price }}</div>
                  <div class="tit2-2">{{ item.weight }}kg/{{ item.unit }}</div>
                </div>
                <div class="tit3">库存：{{ item.stock }}件</div>
                <div class="tit4" @click="goumai">
                  <img class="pic" src="../../assets/newImg/lujin136.png" alt />
                  <div @click="addShop(item)" class="txt">立即购买</div>
                </div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="nav4">
              <div class="tit">相符商品共{{ total }}件</div>
              <el-pagination
                @current-change="ljgmhandleCurrentChange"
                :current-page="this.tianjiabianjiPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="total"
                background
              ></el-pagination>
            </div>
          </div>
          <div class="right">
            <vxe-table :merge-cells="colspanMethod" align="left" :data="tableData3">
              <vxe-table-column :field="null" width="120" title="商品">
                <template #default="{ row }">
                  <div class="formNav1">
                    <div class="nav1-1" :title="row.name">{{ row.name }}</div>
                    <img class="nav1-2" :src="row.image_id" alt />
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column :field="null" width="110" title="数量/重量">
                <template #default="{ row }">
                  <div class="formNav2">
                    <div class="nav2-1">
                      <img @click="jianS" class="icon" src="../../assets/newImg/zu279.png" alt />
                      <div class="tit">{{ addShopNum }}</div>
                      <img @click="jiaS" class="icon" src="../../assets/newImg/zu278.png" alt />
                    </div>
                    <div class="nav2-2">{{ row.weight }}kg/{{ row.unit }}</div>
                    <div class="nav2-3">{{ row.stock }}库存</div>
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column :field="null" title="价格">
                <template #default="{ row }">
                  <div class="formNav3">¥{{ Number(row.price * addShopNum).toFixed(2) }}</div>
                </template>
              </vxe-table-column>
              <vxe-table-column :field="null" title="操作">
                <template>
                  <div class="pos">
                    <div class="formNav4" @click="delShop">
                      <img class="icon" src="../../assets/newImg/lujin244.png" alt />
                      <div class="nav4-1">删除</div>
                    </div>
                  </div>
                </template>
              </vxe-table-column>
              <template #empty>
                <div class="tabEmpty">
                  <img class="pic" src="../../assets/newImg/zu261.png" />
                  <p class="txt">没有相关内容</p>
                </div>
              </template>
            </vxe-table>
            <div class="rightBox">
              <div class="r-nav1">{{ ycVal }}</div>
              <div class="r-nav2">注：下单后每个收件人将收到以上产品</div>
              <div class="r-nav3">
                <div class="nav1">
                  <div class="txt1">商品价格</div>
                  <div v-if="!tableData3[0]" class="txt2">¥0.00</div>
                  <div
                    v-else
                    class="txt2"
                  >¥{{ Number(tableData3[0].price * addShopNum).toFixed(2) }}</div>
                </div>
                <div v-if="tableData3[0]">
                  <div class="nav1">
                    <div class="txt1">快递运费</div>
                    <div class="txt2">¥{{ kdyunfei.toFixed(2) }}</div>
                  </div>
                  <div class="nav1">
                    <div class="txt1">共计：</div>
                    <div class="txt3">¥{{ Number(shopPrice).toFixed(2) }}</div>
                  </div>
                </div>
              </div>
              <div class="r-nav4">
                <div class="btn1">取消</div>
                <div @click="quedingShop" class="btn2">确定</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑收件人地址 -->
    <el-dialog
      title="编辑收件人地址"
      :visible.sync="bjsjrDialogVisible"
      width="560px"
      :before-close="bjsjrHandleClose"
    >
      <div class="bjsjrForm">
        <img class="pic" src="../../assets/newImg/shuxian2.png" alt />
        <el-form ref="bjsjrForm" :model="bjsjrForm" label-width="80px">
          <el-form-item label="订单编号">
            <el-input v-model="bjsjrForm.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="bjsjrForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="bjsjrForm.name"></el-input>
          </el-form-item>
          <el-form-item label="省市区">
            <el-cascader
              v-model="bjsjrForm.address"
              :options="addOptions"
              @change="bjsjrHandleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="bjsjrForm.addressXQ"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="bjsjrOnSubmit">确认修改</el-button>
            <el-button @click="bjsjrDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 新增店铺 -->
    <el-dialog
      title="新增店铺"
      :visible.sync="xzdpDialogVisible"
      width="560px"
      :before-close="xzdpHandleClose"
    >
      <div class="xzdpForm bjsjrForm">
        <img class="pic" src="../../assets/newImg/shuxian2.png" alt />
        <el-form ref="xzdpForm" :model="xzdpForm" label-width="80px">
          <el-form-item label="店铺类型">
            <el-select v-model="xzdpForm.status" placeholder="请选择">
              <el-option
                v-for="item in xzdpOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺名称">
            <el-input v-model="xzdpForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="xzdpOnSubmit">确认修改</el-button>
            <el-button @click="xzdpDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看店铺列表 -->
    <el-dialog
      title="查看店铺列表（请购买服务后再进行授权）"
      :visible.sync="ckdplbDialogVisible"
      width="760px"
      :before-close="ckdplbHandleClose"
    >
      <div class="ckdplbTable">
        <vxe-table :header-cell-class-name="headerCellClassName2" :data="tableData">
          <vxe-table-column show-overflow="title" show-footer-overflow field="name" title="类型"></vxe-table-column>
          <vxe-table-column show-overflow="title" show-footer-overflow field="role" title="店铺名"></vxe-table-column>
          <vxe-table-column show-overflow="title" show-footer-overflow field="age" title="授权状态"></vxe-table-column>
          <vxe-table-column title="操作" width="300">
            <template slot-scope="scope">
              <div class="flex">
                <div class="delBtn" type="text" size="small">购买服务</div>
                <div class="delBtn" type="text" size="small">未授权</div>
                <div
                  class="delBtn yellow"
                  @click="ckdplbxdDel(scope.row)"
                  type="text"
                  size="small"
                >删除</div>
              </div>
            </template>
          </vxe-table-column>
          <template #empty>
            <div class="tabEmpty">
              <img class="pic" src="../../assets/newImg/zu261.png" />
              <p class="txt">没有相关内容</p>
            </div>
          </template>
        </vxe-table>
      </div>
    </el-dialog>
    <!-- 确定删除该店铺 -->
    <el-dialog
      title="提示"
      :visible.sync="tsDialogVisible"
      width="360px"
      :before-close="tsHandleClose"
    >
      <div class="tsDialog">
        <img class="pic" src="../../assets/newImg/shuxian2.png" alt />
        <div class="txt">确定删除该店铺？</div>
        <div class="btns">
          <el-button type="info" @click="tsOnSubmit">确认</el-button>
          <el-button @click="tsDialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 生成表格编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="myTabDialogVisible"
      width="360px"
      :before-close="myTabHandleClose"
    >
      <div class="myTabDialog">
        <el-form ref="myTabForm" :model="myTabForm" label-width="80px">
          <el-form-item label="订单编号：">
            <el-input size="small" v-model="myTabForm.order"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input size="small" v-model="myTabForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input size="small" v-model="myTabForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input size="small" type="textarea" v-model="myTabForm.myAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="info" @click="myTabOnSubmit">确认修改</el-button>
            <el-button size="small" @click="myTabDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Aside from "../Aside";
import { mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    Aside
  },
  computed: {
    ...mapState(["tianjiabianjiPage", "shopObj"])
  },
  watch: {
    radioVal1: function() {
      this.radioVal2 = "手动输入";
    },
    radioVal2: function() {
      console.log(this.radioVal2);
    },
    radioVal3: function() {
      console.log(this.radioVal3);
      if (this.radioVal3 == "订单号筛选") {
        this.znsxTextarea1 = "";
        this.orderArr.forEach(ele => {
          this.znsxTextarea1 += `${ele};\n`;
        });
      } else if (this.radioVal3 == "收件人筛选") {
        this.znsxTextarea1 = "";
        this.strDataArr.forEach(ele => {
          this.znsxTextarea1 += `${ele["1"]},${ele["2"]},${ele["3"]};\n`;
          console.log(this.znsxTextarea1);
        });
      }
    },
    storageText: {
      immediate: true,
      handler: function() {
        console.log(this.storageText);
        if (this.storageText == "") {
          this.peopleNum = 0;
        } else {
          this.peopleNum = this.storageText.split("\n").length;
        }
        this.shopPrice =
          this.tableData3[0].price * this.addShopNum + this.kdyunfei;
        this.zongPrice = this.shopPrice * this.peopleNum;
      }
    },
    // storageText: function() {
    //   console.log(this.storageText);
    //   if (this.storageText == "") {
    //     this.peopleNum = 0;
    //   } else {
    //     this.peopleNum = this.storageText.split("\n").length;
    //   }
    // },
    tianjiabianjiPage: function(page) {
      this.$store.commit("tianjiabianjiPage", page);
      this.getData();
    },
    addShopNum: {
      deep: true, //深度监听设置为 true
      handler: function() {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum <= 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
          }
        }
        if (this.radioVal2 == "手动输入") {
          if (this.radioVal2 == "手动输入") {
            // this.peopleNum = this.textarea1.split("\n").length - 1;
            this.peopleNum = this.storageText.split("\n").length;
          }
        }
        this.shopPrice =
          this.tableData3[0].price * this.addShopNum + this.kdyunfei;
        this.zongPrice = this.shopPrice * this.peopleNum;
      }
    },
    tableData3: {
      deep: true, //深度监听设置为 true
      handler: function() {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum <= 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
          }
        }
        if (this.radioVal2 == "手动输入") {
          this.peopleNum = this.storageText.split("\n").length;
        }
        this.shopPrice =
          this.tableData3[0].price * this.addShopNum + this.kdyunfei;
        this.zongPrice = this.shopPrice * this.peopleNum;
      }
    },
    dataObj: {
      deep: true, //深度监听设置为 true
      handler: function() {
        if (this.tableData3[0]) {
          if (Number(this.tableData3[0].weight) * this.addShopNum <= 1) {
            this.kdyunfei = Number(this.dataObj.kd_price.kg);
          } else {
            var num = parseInt(
              (Number(this.tableData3[0].weight) * this.addShopNum) / 1
            );
            this.kdyunfei =
              Number(this.dataObj.kd_price.kg) +
              num * this.dataObj.kd_price.kg_add;
            console.log(this.kdyunfei);
          }
        }
        if (this.radioVal2 == "手动输入") {
          this.peopleNum = this.storageText.split("\n").length;
        }
        this.shopPrice =
          this.tableData3[0].price * this.addShopNum + this.kdyunfei;
        this.zongPrice = this.shopPrice * this.peopleNum;
        console.log(this.peopleNum, this.zongPrice);
      }
    }
  },
  data() {
    return {
      storageText: "",
      createTableData2: [],
      myTabDialogVisible: false,
      myTabArr: [],
      createTableArr: [],
      createTableData: [], //生成的表格
      orderArr: null,
      strDataArr: null,
      shopPrice: 0,
      peopleNum: 0,
      zongPrice: 0,
      formData: {},
      myformData: null,
      myformData2: null,
      import_mode: null,
      import_type: null,
      // 添加/编辑商品
      dataObj: {},
      ycId: "",
      flId: "",
      kdId: "",
      kdyunfei: 0,
      paixu_value: "",
      paixu_order: "asc",
      searchVal: "",
      form: {
        fenlei: "礼品商城",
        cangchu: 1026,
        miandan: "海带宝",
        paixu: "",
        jiage: 0,
        fabu: 0,
        morenpaixu: 0
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      addShopNum: 1,
      total: 0,
      tjbjDialogVisible: false,
      colspanMethod: [{ rowspan: 3, colspan: 3 }],
      //
      radioVal1: "淘宝/天猫",
      radioVal2: "手动输入",
      radioVal3: "订单号筛选",
      sdsrcwbzVal1: "", //手动输入财务备注
      textarea1: "",
      znsxTextarea1: "",
      znsxTextarea1Data: "",
      znsxTextarea1Arr: [],
      tableData: [
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "+50.00",
          age: 24,
          address: "Shanghdsadsadai",
          status: 1
        }
      ],
      //   淘宝一件发货
      TBoptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      TBvalue: "",
      tbyjfhTextarea1: "",
      TBcwbzVal1: "",
      //
      bjsjrDialogVisible: false,
      bjsjrForm: {
        name: "",
        addressXQ: "",
        address: ""
      },
      addOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      ycVal: "",
      //   新增店铺
      xzdpDialogVisible: false,
      xzdpForm: {
        name: "",
        status: ""
      },
      xzdpOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      //   查看店铺列表
      ckdplbDialogVisible: false,
      //   提示(确定删除该店铺)
      tsDialogVisible: false,
      //   拼多多一键下单
      pddRadio: "pddsNo",
      pddTimeArr: "",
      //
      myTabForm: {},
      myTabIndex: null
    };
  },
  created() {
    this.getData();
    if (this.shopObj) {
      this.$set(this.tableData3, 0, this.shopObj);
      this.addShopNum = this.shopObj.num;
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.getGoods({
        token: sessionStorage.getItem("token"),
        page: this.tianjiabianjiPage,
        limit: 20,
        search: this.searchVal,
        yuncang: this.ycId,
        classify: this.flId,
        paixu: 1,
        paixu_value: this.paixu_value,
        paixu_order: this.paixu_order
      });
      console.log(res);
      if (res.code == 0) {
        this.tableData1 = [];
        this.tableData2 = [];
        this.total = 0;
      } else {
        this.tableData1 = res.data.goods_data;
        this.tableData2 = res.data.goods_data;
        this.total = res.data.total;
        this.dataObj = res.data;
        this.ycId = this.form.cangchu == '' ? res.data.yun_cang[0].id : this.form.cangchu;
        this.form.cangchu = this.ycId;
        this.ycVal = res.data.yun_cang[0].logi_name;
        this.flId = res.data.goods_classify[0].id;
        this.kdId = res.data.kd_data[0].id;
      }
    },
    tabEdit(row, i) {
      this.myTabIndex = i;
      console.log(row, i);
      this.myTabForm = { ...row };
      this.myTabDialogVisible = true;
    },
    tabDel(row, i) {
      this.createTableData.splice(i, 1);
      this.createTableArr = [];
      this.createTableData.forEach((ele, i) => {
        if (i >= 1) {
          this.createTableArr[
            i
          ] = `\n${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        } else {
          this.createTableArr[
            i
          ] = `${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        }
      });
      this.textarea1 = "";
      this.storageText = "";
      this.createTableArr.forEach(ele => {
        this.storageText += ele;
      });
      console.log(this.storageText);
    },
    myTabHandleClose() {
      this.myTabDialogVisible = false;
    },
    async wanchengtianjia(val = "") {
      if (this.tableData3[0]) {
        if (Number(this.tableData3[0].weight) * this.addShopNum <= 1) {
          this.kdyunfei = Number(this.dataObj.kd_price.kg);
        } else {
          var num = parseInt(
            (Number(this.tableData3[0].weight) * this.addShopNum) / 1
          );
          this.kdyunfei =
            Number(this.dataObj.kd_price.kg) +
            num * this.dataObj.kd_price.kg_add;
        }
      }
      // if (this.radioVal2 == "手动输入") {
      this.createTableArr = this.textarea1.split("\n");
      this.peopleNum = this.storageText.split("\n").length;
      // }
      if (this.tableData3[0]) {
        this.shopPrice =
          this.tableData3[0].price * this.addShopNum + this.kdyunfei;
      }

      this.zongPrice = this.shopPrice * this.peopleNum;
      // this.createTable();//生成表格
      const res = await this.$api.orderCutAddress({
        token: sessionStorage.getItem("token"),
        data: this.textarea1,
        yc: this.form.cangchu
      });

      // this.storageText += this.textarea1;
      console.log(res, 1111111);
      if (res.code == 200) {
        if (val != "edit") {
          this.createTableData = this.createTableData.concat(res.data.data);
        } else {
          this.createTableData = res.data.data;
        }
      }

      this.createTableArr = [];
      this.createTableData.forEach((ele, i) => {
        ele.myAddress = `${ele.address.province}${ele.address.city}${ele.address.county}${ele.address.address}`;
        console.log(ele);
        if (i >= 1) {
          this.createTableArr[
            i
          ] = `\n${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        } else {
          this.createTableArr[
            i
          ] = `${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        }
      });
      this.textarea1 = "";
      this.storageText = "";
      this.createTableArr.forEach(ele => {
        console.log(ele);
        this.storageText += ele;
      });
      console.log(this.createTableData);
      this.createTableData.forEach(ele => {
        // if (ele.status == 0) {
        // }
        ele.myAddress = `${ele.address.province}${ele.address.city}${ele.address.county}${ele.address.address}`;
      });
    },
    isPoneAvailable(pone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(pone)) {
        return "false";
      } else {
        return "true";
      }
    },
    myTabOnSubmit() {
      for (const key in this.myTabForm) {
        // if(this.createTableData[this.myTabIndex])
        if (key == "phone") {
          this.myTabForm.status =
            this.isPoneAvailable(this.myTabForm[key]) == "true"
              ? "验证通过"
              : "验证未通过";
          this.$set(
            this.createTableData[this.myTabIndex],
            "status",
            this.myTabForm.status
          );
        }
        this.$set(
          this.createTableData[this.myTabIndex],
          key,
          this.myTabForm[key]
        );
        // this.createTableArr
        // this.wanchengtianjia();
      }
      this.createTableData.forEach((ele, i) => {
        if (i >= 1) {
          this.createTableArr[
            i
          ] = `\n${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        } else {
          this.createTableArr[
            i
          ] = `${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        }
      });
      this.textarea1 = "";
      this.createTableArr.forEach(ele => {
        this.textarea1 += ele;
      });
      this.myTabDialogVisible = false;
      console.log(this.createTableArr, this.textarea1);
      this.wanchengtianjia("edit");
    },
    createTable() {
      var newArr = [];
      this.createTableData = [];
      this.createTableArr.forEach(ele => {
        if (ele == "") {
          this.createTableArr.pop();
        } else {
          this.textarea1.split("\n");
        }
      });
      this.createTableArr.forEach((ele, i) => {
        if (ele.substring(0, 1) == "\n") {
          ele = ele.slice(1);
        }
        newArr = ele.split(",");
        var obj = {};
        obj.ddnum = newArr[0];
        obj.name = newArr[1];
        obj.phone = newArr[2];
        obj.address = newArr[3];
        obj.status =
          this.isPoneAvailable(newArr[2]) == "true" ? "验证通过" : "验证未通过";
        // this.createTableData.push(obj)
        this.$set(this.createTableData, i, obj);
      });
      console.log(this.createTableData);
      console.log(this.createTableArr);
    },
    mySearchData() {
      this.getData();
    },
    async changeVal1(val) {
      console.log(val);
      var obj = {};
      obj = this.dataObj.yun_cang.find(function(item) {
        return item.id === val;
      });
      this.form.cangchu = val;
      this.ycVal = obj.logi_name;
      // console.log(obj.id); //label值
      const res = await this.$api.switchYc({
        token: sessionStorage.getItem("token"),
        id: obj.id
      });
      this.ycId = obj.id;
      console.log(this.ycId)
      console.log(res.data);
      this.$set(this.dataObj, "kd_data", res.data.kd_data);
      this.form.miandan = res.data.kd_data[0].name;
      this.$set(this.dataObj, "kd_price", res.data.kd_price);
      this.getData();
    },
    async changeVal2(val) {
      var obj = {};
      obj = this.dataObj.kd_data.find(function(item) {
        return item.name === val;
      });
      // console.log(obj.id); //label值
      const res = await this.$api.kdPrice({
        token: sessionStorage.getItem("token"),
        kd_id: obj.id,
        type: 2,
        yc_id: this.ycId
        // this.tableData3
      });
      console.log(res.data);
      this.kdId = obj.id;
      // this.$set(this.dataObj,'kd_data',res.data.kd_data)
      // this.form.miandan = res.data.kd_data[0].name;
      this.$set(this.dataObj.kd_price, "kg", res.data.kg);
      this.$set(this.dataObj.kd_price, "kg_add", res.data.kg_add);
    },
    jianS() {
      if (this.addShopNum == 1) {
        this.addShopNum == 1;
      } else {
        this.addShopNum--;
      }
    },
    jiaS() {
      this.addShopNum++;
    },
    addShop(item) {
      this.$set(this.tableData3, 0, item);
      console.log(this.tableData3);
    },
    delShop() {
      this.tableData3 = [];
    },
    jiagezuidi() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      if (this.form.jiage == 1) {
        this.form.jiage = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.jiage = 1;
        this.paixu_value = "price";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    fabu() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      if (this.form.fabu == 1) {
        this.form.fabu = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.fabu = 1;
        this.paixu_value = "ctime";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    paixu() {
      this.form.jiage = 0;
      this.form.fabu = 0;
      this.form.morenpaixu = 0;
      if (this.form.morenpaixu == 1) {
        this.form.morenpaixu = 0;
        this.paixu_value = "";
        this.paixu_order = "asc";
      } else {
        this.form.morenpaixu = 1;
        this.paixu_value = "id";
        this.paixu_order = "desc";
      }
      this.getData();
    },
    // 手动输入的确认订单
    async onSubmitTijiao() {
      this.$confirm("确定支付?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: "订单正在向快递公司下单",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if (this.radioVal1 == "淘宝/天猫") {
          this.import_mode = 1;
        } else if (this.radioVal1 == "京东") {
          this.import_mode = 2;
        } else if (this.radioVal1 == "拼多多") {
          this.import_mode = 3;
        } else if (this.radioVal1 == "抖音") {
          this.import_mode = 4;
        } else if (this.radioVal1 == "其他") {
          this.import_mode = 5;
        }
        if (this.radioVal2 == "手动输入") {
          this.import_type = 2;
        } else if (this.radioVal2 == "模板导入") {
          this.import_type = 1;
        } else if (this.radioVal2 == "智能筛选") {
          this.import_type = 3;
        }
        const res = await this.$api.orderInsertData({
          token: sessionStorage.getItem("token"),
          import_mode: this.import_mode,
          type: this.import_type,
          data: this.storageText,
          goods_id: this.tableData3[0] ? this.tableData3[0].id : "",
          kd_id: this.kdId,
          goods_member: this.tableData3[0] ? this.tableData3[0].num : 0,
          remarks: this.sdsrcwbzVal1,
          yc: this.form.cangchu
        });
        console.log(res);
        loading.close();
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.textarea1 = "";
          this.$router.push({ name: "Dingdanliebiao" });
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    // 模板导入的确认订单
    querenShangchuan() {
      console.log(this.createTableData2, this.createTableArr);
      this.createTableData = this.createTableData2;
      this.createTableData.forEach((ele, i) => {
        ele.myAddress = `${ele.address.province}${ele.address.city}${ele.address.county}${ele.address.address}`;
        if (i >= 1) {
          this.createTableArr[
            i
          ] = `\n${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        } else {
          this.createTableArr[
            i
          ] = `${ele.order},${ele.name},${ele.phone},${ele.myAddress};`;
        }
      });
      // this.createTableArr.forEach(ele => {
      //   this.textarea1 += ele;
      // });
      this.wanchengtianjia();
    },
    async querenShangchuan2() {
      this.myformData = new FormData();
      this.$confirm("确定支付?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: "订单正在向快递公司下单",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if (this.radioVal1 == "淘宝/天猫") {
          this.import_mode = 1;
        } else if (this.radioVal1 == "京东") {
          this.import_mode = 2;
        } else if (this.radioVal1 == "拼多多") {
          this.import_mode = 3;
        } else if (this.radioVal1 == "抖音") {
          this.import_mode = 4;
        }
        if (this.radioVal2 == "手动输入") {
          this.import_type = 2;
        } else if (this.radioVal2 == "模板导入") {
          this.import_type = 1;
        } else if (this.radioVal2 == "智能筛选") {
          this.import_type = 3;
        }
        this.myformData.append("token", sessionStorage.getItem("token"));
        this.myformData.append("import_mode", this.import_mode);
        this.myformData.append("yc", this.form.cangchu);
        this.myformData.append("data", this.textarea1);
        this.myformData.append(
          "goods_id",
          this.tableData3[0] ? this.tableData3[0].id : ""
        );
        this.myformData.append("kd_id", this.kdId);
        this.myformData.append(
          "goods_member",
          this.tableData3[0] ? this.tableData3[0].num : 0
        );
        this.myformData.append("remarks", this.sdsrcwbzVal1);
        // var configs = {
        //   headers: {
        //     "Content-Type": "multipart/form-data;charse=UTF-8"
        //   }
        // };
        const res = await this.$api.orderInsertData({
          token: sessionStorage.getItem("token"),
          import_mode: this.import_mode,
          type: this.import_type,
          data: this.storageText,
          goods_id: this.tableData3[0] ? this.tableData3[0].id : "",
          kd_id: this.kdId,
          goods_member: this.tableData3[0] ? this.tableData3[0].num : 0,
          remarks: this.sdsrcwbzVal1,
          yc: this.form.cangchu
        });
        console.log(res);
        loading.close();
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$router.push({ name: "Dingdanliebiao" });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
        // axios
        //   .post(
        //     "http://ht.yuncanggift.com/home/order/insertData",
        //     this.myformData,
        //     configs
        //   )
        //   .then(res => {
        //     console.log(res);
        //     if (res.data.code == 200) {
        //       this.$message({
        //         message: res.data.msg,
        //         type: "success"
        //       });
        //       this.$router.push({ name: "Dingdanliebiao" });
        //     } else {
        //       this.$message({
        //         message: res.data.msg,
        //         type: "warning"
        //       });
        //     }
        //   });
      });
    },
    // 智能筛选的确认订单
    async onSubmitZhineng() {
      if (this.radioVal1 == "淘宝/天猫") {
        this.import_mode = 1;
      } else if (this.radioVal1 == "京东") {
        this.import_mode = 2;
      } else if (this.radioVal1 == "拼多多") {
        this.import_mode = 3;
      } else if (this.radioVal1 == "抖音") {
        this.import_mode = 4;
      }
      if (this.radioVal2 == "手动输入") {
        this.import_type = 2;
      } else if (this.radioVal2 == "模板导入") {
        this.import_type = 1;
      } else if (this.radioVal2 == "智能筛选") {
        this.import_type = 3;
      }
      const res = await this.$api.orderInsertData({
        token: sessionStorage.getItem("token"),
        import_mode: this.import_mode,
        type: this.import_type,
        data: this.znsxTextarea1Data,
        goods_id: this.tableData3[0] ? this.tableData3[0].id : "",
        kd_id: this.kdId,
        goods_member: this.tableData3[0] ? this.tableData3[0].num : 0,
        remarks: this.sdsrcwbzVal1
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$router.push({ name: "Dingdanliebiao" });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 上传文件
    newupLoadSuccess(params) {
      console.log(params.file);
      this.myformData2 = new FormData();
      this.myformData2.append("formData", params.file);
      this.myformData2.append("token", sessionStorage.getItem("token"));
      this.myformData2.append("yc", this.form.cangchu);
      var configs = {
        headers: {
          "Content-Type": "multipart/form-data;charse=UTF-8"
        }
      };
      axios
        .post(
          "http://ht.yuncanggift.com/home/order/getFilterData",
          this.myformData2,
          configs
        )
        .then(res => {
          console.log(res.data, 22222222);
          if (res.data.code == 200) {
            this.createTableData2 = res.data.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      if (this.radioVal2 == "智能筛选") {
        this.myformData2 = new FormData();
        this.myformData2.append("formData", params.file);
        this.myformData2.append("token", sessionStorage.getItem("token"));
        this.myformData2.append("yc", this.form.cangchu);
        axios
          .post(
            "http://ht.yuncanggift.com/home/order/getFilterData",
            this.myformData2,
            configs
          )
          .then(res => {
            console.log(res.data, 22222222);
            if (res.data.code == 200) {
              this.orderArr = res.data.data.order;
              this.strDataArr = res.data.data.strData;
              this.peopleNum = res.data.data.order.length;
              this.znsxTextarea1Arr = [];
              this.orderArr.forEach(ele => {
                this.znsxTextarea1Arr.push(ele);
              });
              this.strDataArr.forEach((ele, i) => {
                this.znsxTextarea1Arr[
                  i
                ] += `,${ele["1"]},${ele["2"]},${ele["3"]};\n`;
              });
              console.log(this.znsxTextarea1Arr);
              this.znsxTextarea1Arr.forEach(ele => {
                this.znsxTextarea1Data += ele;
              });
              if (this.radioVal3 == "订单号筛选") {
                this.znsxTextarea1 = "";
                this.orderArr.forEach(ele => {
                  this.znsxTextarea1 += `${ele};\n`;
                });
              } else if (this.radioVal3 == "收件人筛选") {
                this.znsxTextarea1 = "";
                this.strDataArr.forEach(ele => {
                  this.znsxTextarea1 += `${ele["1"]},${ele["2"]},${ele["3"]};\n`;
                  console.log(this.znsxTextarea1);
                });
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
      }
    },
    upLoadSuccess(response, file) {
      console.log(file.raw);
      this.myformData2 = new FormData();
      this.myformData2.append("formData", file.raw);
      this.myformData2.append("token", sessionStorage.getItem("token"));
      this.myformData2.append("yc", this.form.cangchu);
      var configs = {
        headers: {
          "Content-Type": "multipart/form-data;charse=UTF-8"
        }
      };
      axios
        .post(
          "http://ht.yuncanggift.com/home/order/getFilterData",
          this.myformData2,
          configs
        )
        .then(res => {
          console.log(res.data, 22222222);
          if (res.data.code == 200) {
            this.createTableData2 = res.data.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      if (this.radioVal2 == "智能筛选") {
        this.myformData2 = new FormData();
        this.myformData2.append("formData", file.raw);
        this.myformData2.append("token", sessionStorage.getItem("token"));
        this.myformData2.append("yc", this.form.cangchu);
        axios
          .post(
            "http://ht.yuncanggift.com/home/order/getFilterData",
            this.myformData2,
            configs
          )
          .then(res => {
            console.log(res.data, 22222222);
            if (res.data.code == 200) {
              this.orderArr = res.data.data.order;
              this.strDataArr = res.data.data.strData;
              this.peopleNum = res.data.data.order.length;
              this.znsxTextarea1Arr = [];
              this.orderArr.forEach(ele => {
                this.znsxTextarea1Arr.push(ele);
              });
              this.strDataArr.forEach((ele, i) => {
                this.znsxTextarea1Arr[
                  i
                ] += `,${ele["1"]},${ele["2"]},${ele["3"]};\n`;
              });
              console.log(this.znsxTextarea1Arr);
              this.znsxTextarea1Arr.forEach(ele => {
                this.znsxTextarea1Data += ele;
              });
              if (this.radioVal3 == "订单号筛选") {
                this.znsxTextarea1 = "";
                this.orderArr.forEach(ele => {
                  this.znsxTextarea1 += `${ele};\n`;
                });
              } else if (this.radioVal3 == "收件人筛选") {
                this.znsxTextarea1 = "";
                this.strDataArr.forEach(ele => {
                  this.znsxTextarea1 += `${ele["1"]},${ele["2"]},${ele["3"]};\n`;
                  console.log(this.znsxTextarea1);
                });
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
      }
    },
    uploadExl() {
      window.open(
        "http://47.100.26.153/%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls"
      );
    },
    // 添加/编辑商品
    goumai() {
      console.log("goumai");
    },
    quedingShop() {
      this.$set(this.tableData3[0], "num", this.addShopNum);
      console.log(this.tableData3);
      this.tjbjDialogVisible = false;
    },
    ljgmhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("tianjiabianjiPage", val);
    },
    tjbjHandleClose() {
      this.tjbjDialogVisible = false;
    },
    //   提示(确定删除该店铺)
    tsOnSubmit() {},
    tsHandleClose() {
      this.tsDialogVisible = false;
    },
    //   查看店铺列表
    ckdplbHandleClose() {
      this.ckdplbDialogVisible = false;
    },
    ckdplbxdDel(row) {
      this.tsDialogVisible = true;
      console.log(row);
    },
    // 新增店铺
    xzdpOnSubmit() {
      console.log(this.xzdpForm);
    },
    xzdpHandleClose() {
      this.xzdpDialogVisible = false;
    },
    //   淘宝一件发货-订单列表删除
    tbyjxddel(row) {
      console.log(row);
    },
    //   淘宝一件发货-订单列表编辑
    tbyjxdEdit(row) {
      console.log(row);
      this.bjsjrDialogVisible = true;
    },
    bjsjrHandleChange(value) {
      console.log(value);
    },
    bjsjrOnSubmit() {
      console.log(this.bjsjrForm);
    },
    bjsjrHandleClose() {
      this.bjsjrDialogVisible = false;
    },
    headerCellClassName() {
      return "col-blue";
    },
    headerCellClassName2() {
      return "col-hui";
    }
  }
};
</script>

<style lang="scss" scoped>
.hyindex {
  display: flex;
}
.myTabDialog {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
  }
  .search {
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.right {
  width: 100%;
  .nav1 {
    height: 100px;
    // background: #ffffff;
    border-radius: 10px;
    padding: 30px 40px;
    background-image: url("../../assets/newImg/kk13.png");
    background-size: 100% 100%;
    .txt1 {
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 700;
      color: #000000;
    }
    .myRadio {
      margin-top: 24px;
      display: flex;
      align-items: center;
    }
  }
  .nav2.nav1 {
    // margin-top: 20px;
  }
  .pic-top{
    transform: translateY(2px);
    width: 100%;
  }
  .pic-bottom{
    transform: translateY(-2px);
    width: 100%;
  }
  .nav3 {
    padding-bottom: 10px;
    // margin-top: 20px;
    // height: 640px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/fh_06.jpg");
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 10px;
    .nav3-1 {
      margin: 20px auto;
      padding: 20px;
      width: 90%;
      height: 140px;
      background: #f9f9f9;
      border-radius: 4px;
      .txt1 {
        // margin-bottom: 6px;
        line-height: 22px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #5c5c5c;
        .colorspan {
          color: #ea8e11;
        }
      }
      .txt1.color {
        color: #ea8e11;
      }
      .txt1.txt2 {
        margin-top: 30px;
      }
    }
    .nav3-2 {
      margin: 30px;
      .txt1 {
        margin-left: 6px;
        margin-bottom: 20px;
        font-weight: 700;
      }
      .btn {
        cursor: pointer;
        margin-top: 20px;
        width: 132px;
        height: 49px;
        opacity: 1;
        box-shadow: inset 0px 0 8px 2px #ccc !important;
        color: #ea8e11;
        line-height: 49px;
        text-align: center;
      }
    }
  }
  .nav4 {
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk15.png");
    background-size: 100% 100%;
    border-radius: 10px;
    padding: 30px 40px;
    // margin-top: 20px;

    .tab1 {
      display: flex;
      align-items: center;
      .pic {
        margin-right: 8px;
        width: 40px;
        height: 40px;
      }
    }
    .txt1 {
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 700;
      color: #000000;
    }
    .txt4 {
      position: relative;
      margin-top: 18px;
      background: #ffffff;
      border-radius: 10px;
      .myTable {
        width: 85%;
      }
      .lab {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .txt {
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #5c5c5c;
        }
        .labInp {
          width: 200px;
        }
      }
      .btnn {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 66px;
        width: 103px;
        height: 32px;
        opacity: 1;
        box-shadow: inset 0px 0 8px 2px #ccc !important;
        display: flex;
        align-items: center;
        justify-content: center;
        .pic {
          width: 15px;
          height: 15px;
          opacity: 1;
        }
        .txt {
          margin-left: 4px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #ea8e11;
        }
      }
      .fenye {
        margin-top: 10px;
      }
      /deep/ .vxe-body--column {
        vertical-align: middle;
      }
      /deep/ .el-pager {
        .active {
          color: #ea8e11;
        }
        .number:hover {
          color: #ea8e11;
        }
      }
      .footer {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-top: 20px;
        .btn {
          width: 232px;
          height: 49px;
          opacity: 1;
          box-shadow: inset 0px 0 8px 2px #ccc !important;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          text-align: center;
          line-height: 49px;
          color: #5c5c5c;
        }
        .txt {
          margin-left: 20px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #5c5c5c;
        }
      }
    }
  }
  //模板导入
  .pic-top{
    transform: translateY(2px);
    width: 100%;
  }
  .pic-bottom{
    transform: translateY(-2px);
    width: 100%;
  }
  .nav3-mbdr {
    // margin-top: 20px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/fh_06.jpg");
    background-size: 100% 100%;
    padding: 40px;
    .box1 {
      display: flex;
      justify-content: space-between;
      .left {
        width: 380px;
        height: 275px;
        /deep/ .el-upload-dragger {
          width: 380px;
          height: 275px;
          padding-top: 56px;
        }
        /deep/ .el-upload__text em {
          color: #ea8e11;
        }
        .upLoadImg {
          margin-top: 30px;
          width: 43px;
          height: 50px;
          opacity: 1;
          margin-bottom: 20px;
        }
      }
      .right {
        background: #fafafa;
        width: 429px;
        height: 275px;
        opacity: 1;
        .tit1 {
          margin-top: 30px;
          display: flex;
          align-items: center;
          margin-left: 40px;
          padding-bottom: 20px;
          .shu {
            width: 5px;
            height: 25px;
            opacity: 1;
            background: #ea8e11;
            margin-right: 16px;
          }
          .txt1 {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #000000;
          }
        }
        .tit2 {
          margin-left: 56px;
          line-height: 30px;
          padding-right: 50px;
        }
        .tit2.red {
          cursor: pointer;
          color: #e64950;
        }
      }
    }
    .box2 {
      cursor: pointer;
      margin-top: 35px;
      width: 232px;
      height: 65px;
      opacity: 1;
      box-shadow: inset 0px 0 10px 4px #ccc !important;
      display: flex;
      justify-content: center;
      align-items: center;
      .pic {
        width: 24px;
        height: 23px;
      }
      .txt {
        margin-left: 10px;
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #5c5c5c;
      }
    }
  }
  // 智能筛选
  .nav3-znsx.nav3-mbdr {
    background-image: url("../../assets/newImg/kk14.png");
    background-size: 100% 100%;
    .box2-2 {
      margin-top: 30px;
      margin-bottom: 30px;
      /deep/ .el-radio-button {
        margin-right: 10px !important;
        width: 200px;
        height: 49px;
        margin-top: 10px;
        border-radius: 6px;
      }
    }
    .box2-4 {
      cursor: pointer;
      margin-top: 20px;
      width: 200px;
      height: 49px;
      box-shadow: inset 0px 0 10px 4px #ccc !important;
      opacity: 1;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      line-height: 49px;
      text-align: center;
      color: #5c5c5c;
    }
  }
  // 淘宝一键下单
  .nav3-tbyjxd {
    margin-top: 20px;
    background: #ffffff;
    padding: 40px;
    .tit1 {
      position: relative;
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
      .shu {
        width: 5px;
        height: 25px;
        opacity: 1;
        background: #ea8e11;
        margin-right: 16px;
      }
      .txt1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
      .pddVideo {
        cursor: pointer;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        .pic {
          width: 22px;
          height: 23px;
          opacity: 1;
        }
        .txt {
          margin-left: 8px;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
        }
      }
    }
    .tit2 {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .bt1 {
        cursor: pointer;
        width: 150px;
        height: 40px;
        opacity: 1;
        // box-shadow: inset 0px 0 10px 4px #ccc !important;
        background: #ffffff;
        border: 1px solid #efefef;
        text-align: center;
        line-height: 40px;
        color: #5c5c5c;
        margin-left: 30px;
        border-radius: 4px;
        font-size: 12px;
      }
      .bt1:hover {
        background: #efefef;
      }
    }
    .pdd-radio {
      margin-top: 20px;
    }
    .pddTimeInp {
      display: flex;
      margin-top: 20px;
      .btn {
        width: 188px;
        height: 40px;
        opacity: 1;
        box-shadow: inset 0px 0 10px 4px #ccc !important;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        line-height: 40px;
        color: #5c5c5c;
        font-size: 14px;
        margin-left: 16px;
        border-radius: 4px;
      }
    }
    .tit3 {
      margin-top: 20px;
      display: flex;
      .left {
        width: 41%;
      }
      .right {
        background: #fafafa;
        width: 488px;
        height: 285px;
        opacity: 1;
        .tit1 {
          margin-top: 30px;
          display: flex;
          align-items: center;
          margin-left: 40px;
          padding-bottom: 20px;
          margin-bottom: 16px;
          .shu {
            width: 5px;
            height: 25px;
            opacity: 1;
            background: #ea8e11;
            margin-right: 16px;
          }
          .txt1 {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #000000;
          }
        }
        .tit2 {
          margin-top: 0;
          margin-left: 56px;
          line-height: 30px;
          padding-right: 50px;
        }
        .tit2.yello {
          color: #ea8e11;
        }
      }
    }
    .tit4 {
      cursor: pointer;
      margin-top: 20px;
      width: 200px;
      height: 49px;
      box-shadow: inset 0px 0 10px 4px #ccc !important;
      opacity: 1;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      line-height: 49px;
      text-align: center;
      color: #5c5c5c;
    }
  }
  .nav3-tbyjxd-tit6 {
    margin-top: 20px;
    /deep/ .vxe-body--column {
      vertical-align: middle;
    }
    .delBtn {
      background: #efefef;
      margin: 0 auto;
      cursor: pointer;
      width: 73px;
      height: 26px;
      opacity: 1;
      box-shadow: inset 0px 0 5px 0 #ccc !important;
      font-size: 12px;
      font-family: zw;
      font-weight: 400;
      text-align: center;
      line-height: 26px;
      color: #707071;
      border-radius: 2px;
    }
    .delBtn.yellow {
      color: #ea8e11;
    }
  }
  .nav3-tbyjxd-tit5 {
    background: #ffffff;
    border-radius: 10px;
    padding: 30px 40px;
    margin-top: 20px;

    .tab1 {
      display: flex;
      align-items: center;
      .pic {
        margin-right: 8px;
        width: 40px;
        height: 40px;
      }
    }
    .txt1 {
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 700;
      color: #000000;
    }
    .txt4 {
      position: relative;
      margin-top: 18px;
      background: #ffffff;
      border-radius: 10px;
      .myTable {
        width: 85%;
      }
      .lab {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .txt {
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #5c5c5c;
        }
        .labInp {
          width: 200px;
        }
      }
      .btnn {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 66px;
        width: 103px;
        height: 32px;
        opacity: 1;
        box-shadow: inset 0px 0 8px 2px #ccc !important;
        display: flex;
        align-items: center;
        justify-content: center;
        .pic {
          width: 15px;
          height: 15px;
          opacity: 1;
        }
        .txt {
          margin-left: 4px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #ea8e11;
        }
      }
      .fenye {
        margin-top: 10px;
      }
      /deep/ .vxe-body--column {
        vertical-align: middle;
      }
      /deep/ .el-pager {
        .active {
          color: #ea8e11;
        }
        .number:hover {
          color: #ea8e11;
        }
      }
      .footer {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-top: 20px;
        .btn {
          width: 232px;
          height: 49px;
          opacity: 1;
          box-shadow: inset 0px 0 8px 2px #ccc !important;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          text-align: center;
          line-height: 49px;
          color: #5c5c5c;
        }
        .txt {
          margin-left: 20px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #5c5c5c;
        }
      }
    }
  }
}
/deep/ .el-radio-group {
  display: flex;
  align-items: center;
}
/deep/ .el-radio-button {
  margin-right: 10px !important;
  width: 150px;
  height: 49px;
  margin-top: 10px;
  border-radius: 6px;
}
/deep/ .el-radio-button.is-active {
  .el-radio-button__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: inset 0px 0 10px 4px #ccc !important;
    color: #ea8e11;
  }
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border-left: 0px;
}
/deep/ .el-radio-button__inner {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 30px;
  font-size: 16px;
  border: 0px;
  border-radius: 4px !important;
  background-color: #efefef;
  border-color: #ffffff;
}
.tabEmpty {
  cursor: pointer;
  // transform: translateX(-292px);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 108px;
  .pic {
    width: 52px;
    height: 50px;
    margin-bottom: 10px;
  }
  .txt {
    font-size: 14px;
    font-family: zw;
    font-weight: 400;
    text-align: center;
    color: #5c5c5c;
  }
}
.kddh {
  /deep/ .el-textarea__inner {
    width: 500px;
    height: 400px;
    box-shadow: inset 0px 0 16px 2px #dddddd !important;
  }
}
/deep/ .vxe-header--column.col-blue {
  background-color: #656565;
  color: #fff;
}
// 淘宝一件发货
.TBtextarea {
  /deep/ .el-textarea__inner {
    width: 288px;
    height: 284px;
    box-shadow: inset 0px 0 16px 2px #dddddd !important;
  }
}
/deep/ .vxe-header--column.col-hui {
  background-color: #eceef5;
  color: #000000;
}
.flex {
  display: flex;
}
//
.bjsjrForm {
  margin: 0 auto;
  width: 90%;
  /deep/ .el-cascader {
    width: 387px;
  }
  /deep/ .el-select {
    width: 387px;
  }
  /deep/ .el-input__inner {
    box-shadow: inset 0px 0 6px 2px #dddddd !important;
  }
  .pic {
    transform: translate(20px, -30px);
    display: inline-block;
    width: 401px;
    height: 10px;
    opacity: 1;
    margin: 0 auto;
  }
}
/deep/ .el-dialog__header {
  text-align: center;
  font-weight: 700;
}
.ckdplbTable {
  position: relative;
  margin-top: 18px;
  background: #ffffff;
  border-radius: 10px;
  .delBtn {
    background: #efefef;
    // margin: 0 auto;
    margin-right: 10px;
    cursor: pointer;
    width: 73px;
    height: 26px;
    opacity: 1;
    box-shadow: inset 0px 0 5px 0 #ccc !important;
    font-size: 12px;
    font-family: zw;
    font-weight: 400;
    text-align: center;
    line-height: 26px;
    color: #707071;
    border-radius: 2px;
  }
  .delBtn.yellow {
    color: #ffffff;
    background: #ea8e11;
  }
  /deep/ .vxe-body--column {
    vertical-align: middle;
  }
}
.tsDialog {
  margin: 0 auto;
  width: 90%;
  .pic {
    transform: translate(-12px, -30px);
    display: inline-block;
    width: 294px;
    height: 10px;
    opacity: 1;
    margin: 0 auto;
  }
  .txt {
    text-align: center;
    font-size: 14px;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .el-button {
      width: 176px;
      height: 40px;
    }
  }
}
// 添加/编辑

#tjbj {
  display: flex;
  justify-content: space-between;
  .left {
    width: 700px;
    .nav1 {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        position: relative;
        width: 278px;
        height: 62px;
        opacity: 1;
        .pic1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 278px;
          height: 62px;
          opacity: 1;
        }
        .pic2 {
          position: absolute;
          top: 19px;
          left: 83px;
          width: 22px;
          height: 23px;
          opacity: 1;
        }
        .tit1 {
          position: absolute;
          top: 0;
          left: 114px;
          line-height: 62px;
          opacity: 1;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
        }
      }
      .pic3 {
        width: 65px;
        height: 15px;
        opacity: 1;
      }
      .search {
        .input-with-select {
          width: 500px;
          .searchBtn {
            background: rgb(234, 142, 17);
            color: #ffffff;
          }
        }
      }
      .search2 {
        width: 120px;
        height: 40px;
        opacity: 1;
        background: #5c5c5c;
        font-size: 14px;
        font-family: zw;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 40px;
      }
    }
    .nav3 {
      margin-top: 27px;
      background: #ffffff !important;
      border-radius: 10px;
      .form {
        .btnItem {
          display: flex;
        }
        .bt1 {
          cursor: pointer;
          padding: 0px 15px;
          display: inline-block;
          display: flex;
          align-items: center;
          .txt {
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #707071;
            margin-right: 3px;
          }
          .txt.active {
            color: #ea8e11;
          }
          .pic {
            width: 6px;
            height: 8px;
            opacity: 1;
          }
        }
      }
    }

    .items {
      // margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      //   justify-content: space-between;
      .item {
        margin: 10px 4px 0px 4px;
        width: calc(0.74 * 223px);
        height: calc(0.8 * 390px);
        opacity: 1;
        background: #ffffff;
        border-radius: 10px;
        .pic1 {
          display: block;
          margin: 6px auto 13px auto;
          width: calc(0.73 * 210px);
          height: calc(0.73 * 210px);
          opacity: 1;
        }
        .tit1 {
          margin: 0 8px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #000000;
        }
        .tit2 {
          margin: 16px 8px 0px 8px;
          padding-bottom: 20px;
          // border-bottom: 1px solid #e5e5e5;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .tit2-1 {
            opacity: 1;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 800;
            color: #ea8e11;
          }
          .tit2-2 {
            opacity: 1;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #c3c3c3;
          }
        }
        .tit3 {
          padding: 6px 8px;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #707071;
        }
        .tit4 {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(0.73 * 200px);
          height: calc(0.73 * 36px);
          opacity: 1;
          background: rgb(246, 247, 250);
          border-radius: 6px;
          margin: 8px auto;
          box-shadow: inset 0px 0 8px 2px #ccc !important;
          .pic {
            width: calc(0.73 * 23px);
            height: calc(0.73 * 22px);
            opacity: 1;
          }
          .txt {
            font-size: 14px;
            margin-left: 10px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            color: #5c5c5c;
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
  }
  .right {
    width: 440px;
    .formNav1 {
      margin-left: 6px;
      display: flex;
      flex-direction: column;
      align-content: center;
      .nav1-1 {
        opacity: 1;
        margin-bottom: 6px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .nav1-2 {
        width: 90px;
        height: 90px;
        opacity: 1;
      }
    }
    .formNav2 {
      transform: translateY(36px);
      display: flex;
      flex-direction: column;
      .nav2-1 {
        display: flex;
        align-items: center;
        .icon {
          cursor: pointer;
          width: 22px;
          height: 23px;
        }
        .tit {
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #000000;
          margin: 0 8px;
        }
      }
      .nav2-2 {
        opacity: 1;
        margin-top: 18px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #000000;
      }
      .nav2-3 {
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #868686;
      }
    }
    .formNav3 {
      transform: translateY(30px);
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: left;
      color: #ea8e11;
    }
    .pos {
      position: relative;
    }
    .formNav4 {
      position: absolute;
      top: 38px;
      width: 100%;
      height: 80px;
      border-left: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        // margin-left: 20px;
        width: 19px;
        height: 25px;
        cursor: pointer;
      }
      .nav4-1 {
        cursor: pointer;
        margin-top: 6px;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #868686;
      }
    }
    /deep/ .vxe-table--empty-placeholder {
      height: 176px !important;
    }
    .tabEmpty {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 140px;
      .pic {
        width: 108px;
        height: 80px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        font-family: zw;
        font-weight: 400;
        text-align: center;
        color: #5c5c5c;
      }
    }
    .rightBox {
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .r-nav1 {
        width: 80%;
        margin: 0 auto;
        height: 30px;
        opacity: 1;
        border: 1px solid #ea8e11;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        line-height: 30px;
        color: #ea8e11;
      }
      .r-nav2 {
        margin-top: 12px;
        margin-bottom: 24px;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: right;
        color: #e64950;
      }
      .r-nav3 {
        width: 100%;
        height: 100px;
        background: #efefef;
        .nav1 {
          background: #efefef;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding: 0 20px;
          .txt1 {
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #000000;
          }
          .txt2 {
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #ea8e11;
          }
          .txt3 {
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #ea8e11;
          }
        }
      }
      .r-nav4 {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .btn1 {
          cursor: pointer;
          width: 211px;
          height: 34px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: center;
          color: #000000;
          box-shadow: inset 0px 0 8px 2px #ccc !important;
          line-height: 34px;
        }
        .btn2 {
          cursor: pointer;
          width: 211px;
          height: 34px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          line-height: 34px;
          background: #5c5c5c;
        }
      }
    }
  }
  /deep/ .el-form-item {
    margin: 0;
  }
  /deep/ .el-form-item__content {
    display: flex;
    flex-wrap: wrap;
  }
  /deep/ .el-radio-group {
    display: flex;
    flex-wrap: wrap;
  }
  /deep/ .el-radio-button {
    margin-right: 10px !important;
    width: auto;
    height: 30px;
    margin-top: 4px !important;
    border-radius: 6px;
  }
  /deep/ .el-radio-button.is-active {
    .el-radio-button__inner {
      background-color: #ffffff !important;
      border-color: #ffffff !important;
      box-shadow: inset 0px 0 5px 0 #ccc !important;
      color: #ea8e11;
      font-size: 12px;
    }
  }

  /deep/ .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px !important;
  }
  /deep/ .el-radio-button__inner {
    line-height: 12px;
    border: 0;
    border-radius: 0px !important;
    font-size: 12px;
    background: #ffffff;
  }
}
.tjbjDio {
  /deep/ .el-dialog__body {
    background: #f5f7fa !important;
  }
}
.myTable1.tab2 {
  margin-left: 0px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.myTable1 {
  width: 1040px;
  margin-left: 36px;
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.myRed {
  color: #e64950;
}
</style>