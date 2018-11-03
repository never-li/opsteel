const APP = getApp();
const CONFIG = require("../../config/index.js");
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
    },
    onLoad: function (opts) {
    },
    //超发申请
    superApply:function(){
        wx.navigateTo({
            url:'../approval/application/index'
        }) 
    },
    //欠发申请
    lackApply:function(){

    },
    //采购合同审批
    purchase:function(){
        wx.navigateTo({
            url:'../approval/purchase/index'
        }) 
    },
    //降价审批
    drop:function(){

    }
});