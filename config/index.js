/**
 * @file: 配置api文件
 */

'use strict';

var develop = true; // 环境配置 false-发布环境 true-开发环境
// 密码 123456
// 帐号 oupulc(18689464362) / fanggys / fangmj / fangkh / admin_xyz / panda2
// 接口文档 https://www.showdoc.cc/web/#/opsteel 密码 opsteel

var testDomain = 'http://uat.devopsteel.cn/'; // 测试环境
var productionDomain = 'https://www.opsteel.cn/'; // 发布环境
var config = {
    apiDomain: develop? testDomain : productionDomain, 
    api: { // 存放api
        login: 'wx/account/login/', // 登录
        logOut: 'wx/account/wx-loginOut/', // 登出
        getScanQR_CODE: 'wx/account/wxRichScan/', // 微信扫一扫二维码
        scanLogin: 'wx/account/wxRichScanLogin/', // 微信扫一扫登录确认
        selectLogin: 'wx/account/wx-selectCompanyNameLogin/', // 选择公司名称登录操作
        registerwxMsg: 'wx/account/register-wxMsg/', // 短信验证码
        wxRegister: 'wx/account/wxRegister/', // 注册
        forgetPasswordMsg: 'wx/account/wx-update-password-msg/', // 忘记密码-获取短信验证码
        forgetPasswordStep1: 'wx/account/wx-update-password-step1/', // 忘记密码-验证身份-01
        forgetPasswordStep2: 'wx/account/wx-update-password-step2/', // 忘记密码-设置密码-02
        getAccountInfo: 'wx/account/wx-getMyBalanceInfo/', // 我的-我的账户
        getCompanyInfo: 'wx/account/wx-getCompanyInfo/', // 我的-公司信息
        companyAuth: 'wx/account/wx-companyAuth/', // 我的-公司信息认证
        taxNumCheck: 'wx/account/wx-taxNumCheck/', // 我的-企查查查询公司税号
        uploadAuth: 'wx/account/wx-upLoad/', // 我的-公司信息认证上传图片接口
        getUserInfo: 'wx/account/wx-getUserInfo/', // 我的-个人信息
        updateUserInfo: 'wx/account/wx-updateUserInfo/', // 我的-个人信息-修改接口
        changeMobileMsg: 'wx/account/wx-getMsgForChangeBindingMobile/', // 我的-更改绑定的手机号获取验证短信
        changeMobile: 'wx/account/wx-changeBindingMobile/', // 我的-更改绑定的手机号
        getStaffInfo: 'wx/account/wx-getEmployeeContent/', // 我的-职员管理
        updatePassword: 'wx/account/wx-update-password/', // 我的-修改密码
        userAreaCount: 'wx/home/wx-userAreaCount/', // 首页- 用户量排行
        packagesWeight: 'wx/home/wx-packagesWeightTop5/', //首页- 区域挂货量
        getXianhuoList: 'wx/shoppingmall/wx-getResourcesList/', // 钢贸商城-【现货】资源接口
        getXianhuoDetail: 'wx/shoppingmall/wx-getPackageDetailPage/', // 钢贸商城-【现货】详情页
        getOrderList: 'wx/shoppingmall/wx-getCustomizeOrderList/', // 钢贸商城-【定制订单】列表查询
        getGoodsList: 'wx/shoppingmall/wx-getCustomizeGoodsList/', // 钢贸商城-【定制到货】列表查询
        getGoodsDetail: 'wx/shoppingmall/wx-getCustomizeGoodsDetail/', // 钢贸商城-【定制到货】详情页
        addCartXianhuo: 'wx/shoppingcart/wx-add-cart/', // 【现货】资源加入购物车
        addCartOrder: 'wx/shoppingcart/wx-add-cart-customize-order/', // 【定制订单】加入购物车
        addCartGoods: 'wx/shoppingcart/wx-add-cart-customize-goods/', // 【定制到货】加入购物车
        cartList: 'wx/shoppingcart/wx-myshopping-cart/', // 【我的购物车清单】
        delCart: 'wx/shoppingcart/wx-shopping-cart-del/', // 【删除】选定购物车资源
        clearCartDisabled: 'wx/shoppingcart/wx-shopping-cart-del-all/', // 【清空购物车】
        refreshUserInfo: 'wx/account/wx-refreshUserInfo/', // 刷新用户登录信息
        checkAccountStatus: 'wx/cartSettle/wx-check-company-status/', // 检查公司是否被冻结
        settleCart: 'wx/cartSettle/wx-settle-page/', // 【结算】结算购物车资源
        createXianhuoOrder: 'wx/cartSettle/wx-create-order/', // 【结算-现货】生成订单
        createGoodsOrder: 'wx/cartSettle/wx-create-redemption-bill/', // 【结算-到货】生成赎单
        checkGoodsBillStatus: 'wx/cartSettle/wx-check-redemption-bill-status/', // 【结算-到货】检查赎单状态
        updateOrder: 'wx/cartSettle/wx-updateOrderIntentionToWaitPayStatus/', // 【结算-定制订单】更新订单意向等待付款状态
        getOrderFreightCodeAndDate: 'wx/cartSettle/wx-getOrderToFreightCodeAndDate/', // 【结算-定制订单】根据流水号获取运单号和最后付款日
        savePayment: 'wx/cartSettle/wx-saveOrderPayment/', // 【结算】保存付款信息
        confirmPayData: 'wx/cartSettle/wx-pay-data/', // 【结算】付款确认界面
        goPay: 'wx/cartSettle/wx-verifyPaySmsCode/', // 【结算】订单支付
        payResult: 'wx/cartSettle/wx-pay-success/', // 【结算】支付结果界面
        getProductType: 'search/all-product-type/', // 大品种查询
        getProduct: 'search/all-product/', // 小品种查询
        getProducingArea: 'search/all-producing-area/', // 产地查询
        getStoragePlace: 'search/all-storage-place/', // 存放地查询
        getorderstatistics:'/wx/salepuranalyze/wx-pur-orderStatistics/', //采购/销售销售统计
        getsalelist:'/wx/salepuranalyze/wx-purSale-list/', //销售/采购列表
        getHeadCount:'/wx/salepuranalyze/wx-purSaleDetail-count/', //头部统计
        getPackageList: 'wx/account/wx-getPackages-list/', // 捆包信息管理列表
        uploadPackageImg: 'wx/account/wx-upload-packages-images/', // 捆包实物图片上传
        getPackageImg: 'wx/account/wx-look-packages-img/', // 捆包实物图片-查看
        deletePackageImg: 'wx/account/wx-delete-package-files/', // 捆包文件删除
        getPackageFileName: 'wx/account/wx-view-packages-files/', // 捆包文件名称查询(删除用)
        getScanList: 'wx/account/wx-wxQuerySteelFactoryList/', // 查询钢厂名信息
        getScanCode: 'wx/account/wx-getScanQRCodeForPacksgeCode/', // 二维码解析捆包号
    }
};
for (var key in config.api) {
    config.api[key] = config.apiDomain + config.api[key];
};

module.exports = config;