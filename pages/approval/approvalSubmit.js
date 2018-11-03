const APP = getApp();
const CONFIG = require("../../config/index.js");
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        array: ['同意，请尽快办理'],
        index:0
    },
    onLoad: function (opts) {
    },
    bindPickerChange:function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindTextAreaBlur:function(){
        console.log("111")
    }
});