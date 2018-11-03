const APP = getApp();
const CONFIG = require("../../config/index.js");
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
    },
    onLoad: function (opts) {
    },
    returnOn:function(){
        wx.navigateTo({
            url:'../approval/index'
        }) 
    },
    returnHome:function(){
        wx.navigateTo({
            url:'../home/index'
        })
        
    }
});