const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        cargoStatus:1 // 1、有额度2、未审核3、审核中4、审核不通过
    },
    onLoad: function (opts) {
    },
   //弹出框
   PopUpBox:function(){
        APP.showModal({
            content:"请登录欧浦智网进行资质审核",
            confirmText:"我知道了"
        })
    },
    cargoDetails:function(){
        let cargoStatus = this.data.cargoStatus;
        if(cargoStatus == 2){
            APP.showModal({
                content:"请登录欧浦智网进行资质审核",
                confirmText:"我知道了"
            }) 
        }else if(cargoStatus == 1){
            wx.navigateTo({
                url:'../finance/cargo/index'
            })
        }
        
    },
    whitestrip:function(){
        wx.navigateTo({
            url:'../finance/whitestrip/index'
        })
    }
});
