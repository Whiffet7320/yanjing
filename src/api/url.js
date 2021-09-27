export default {
    // baseUrl: '',
    // baseUrl: 'http://47.100.26.153',
    // baseUrl: 'http://192.168.50.132',
    baseUrl:'http://ht.yuncanggift.com',
    // baseUrl:'http://lpw.zhangba.shop',
    getVerificationCode: '/home/Comment/getVerificationCode', //获取短信验证码
    login:'/home/Login/login',//登录
    username:'/home/Reg/reg',//注册
    getOrder:'/home/order/getOrder',//订单-获取订单数据
    verificationSession: '/home/Comment/verificationSession', //获取短信验证码
    inviteReward:'/home/User/inviteReward',//推广返佣界面
    userInfo:'/home/user/info',//会员中心
    getGoods:'/home/goods/getGoods',//获取商品数据
    kdPrice:'/home/goods/kdPrice',//获取快递费用
    editIndex:'/home/user/editIndex',//会员资料修改页面
    editData:'/home/user/editData',//会员资料修改提交
    upLevelDefault:'/home/User/upLevelDefault',//会员升级页面
    searchData:'/home/User/searchData',//会员升级页面-切换云仓或快递
    getKefu:'/home/Comment/getKefu',//在线客服
    switchYc:'/home/goods/switchYc',//商城切换云仓
    AftermarketGetData:'/home/Aftermarket/getData',//售后底单申请
    AftermarketAddData:'/home/Aftermarket/addData',//售后底单申请提交
    UserEditPassword:'/home/User/editPassword',//修改密码
    UserCheckYzm:'/home/User/checkYzm',//修改密码-验证短信码
    ArticleList:'/home/Article/list',//获取文章数据列表
    ArticleInfo:'/home/Article/info',//获取文章详情
    orderInsertData:'/home/order/insertData',//完成并导入订单
    orderDelOrder:'/home/order/delOrder',//撤销订单号
    orderGetFilterData:'/home/order/getFilterData',//获取智能筛选数据
    alipayGetPay:'/home/alipay/getPay',//支付-会员充值和会员升级
    userInvitationReward:'/home/user/invitationReward',//获取邀请奖励列表
    userMoneyList:'/home/user/moneyList',//获取资金明细列表
    CommentEditIndexPassword:'/home/Comment/editIndexPassword',//未登录状态-修改密码
    userAddLevel:'/home/user/addLevel',//会员升级-使用余额
    userReCharge:'/home/user/reCharge',//余额提现
    userCommission:'/home/user/commission',//佣金提现
    alipayQueryOrder:'/home/alipay/queryOrder',//查询订单是否支付成功
    orderCutAddress:'/home/order/cutAddress',//确认信息
    OrderBg:'/home/Order/bg',//订单接口
    OrderDaochu_order:'/home/Order/daochu_order',//导出订单
    OrderDaochu:'/home/Order/daochu',//导出包裹
    OrderExport:'/home/Order/export',//导出
    orderBg_info:'/home/order/bg_info',//包裹详情
    orderBg_pay:'/home/order/bg_pay',//支付订单
}