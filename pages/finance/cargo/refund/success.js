const APP = getApp();
const CONFIG = require("../../../../config/index.js");
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        id:null
    },
    onLoad: function (opts) {
    },
    returnHome:function(){
        wx.switchTab({
            url:'/pages/home/index'
        })
    },
    //还款记录
    returnRecord:function(e){
        let _id = e.currentTarget.dataset.id,
            _title = e.currentTarget.dataset.title;
        this.setData({
            idTypes:_id,
            title:_title
        })
        wx.navigateTo({
            url:'../refund/paybackRecord?idTypes=' + this.data.idTypes +'&title='+ this.data.title
        })
    },
});