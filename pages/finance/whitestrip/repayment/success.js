const APP = getApp();
const CONFIG = require("../../../../config/index.js");
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
    },
    onLoad: function (opts) {
    },
    returnHome:function(){
        wx.switchTab({
            url:'/pages/home/index'
        })
        
    }
});