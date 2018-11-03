const APP = getApp();
const GLOBAL = require('../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        cargoStatus:3
    },
    onLoad: function (opts) {
    },
   //弹出框
   PopUpBox:function(){
        APP.showModal({
            content:"请登录欧浦智网进行贷款业务",
            confirmText:"我知道了"
        })
    },
    //还钱
    refund:function(){
        wx.navigateTo({
            url:'../cargo/refund/index'
        })
    },
    //换货
    exchange:function(){
        wx.navigateTo({
            url:'../cargo/exchange/pledge'
        })
    },
    //䃼货
    supply:function(){
        wx.navigateTo({
            url:'../cargo/supply/index'
        })
    },
    //查询
    inquiry:function(){
        wx.navigateTo({
            url:'../cargo/inquiry/index'
        })
    }
});