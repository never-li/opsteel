const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        //cargoStatus:3,
        status:false,  //状态
        paymoney:null, //还款金额
        overage:'1000',//可用余额
        flick:false,    //弹出显示状态
        code:null  //密码
    },
    onLoad: function (opts) {
    },
    //输入还款金额
    payBack:function(e){
        let  value = e.detail.value;
        if(value.length>0){
            this.setData({
                status:true,
                paymoney:value
            })
        }else{
            this.setData({
                status:false
            })
        }
    },
    //还款
    pay:function(){
        let status = this.data.status;
        let paymoney = this.data.paymoney;
        let overage = parseInt(this.data.overage);
        if(status){
            if(paymoney > overage){
                //console.log("你没钱")
                APP.showModal({
                    title:'余额不足',
                    content:"请充值或拨打客服电话：xxxxxxx",
                    confirmText:"确定"
                })
            }else{
                //console.log("你有钱")
                this.setData({
                    flick:true
                })
            }
        }
    },
    //输密码
    input:function(e){
       let  value = e.detail.value;
       this.setData({
            code: value
       });
       if(this.data.code.length == 6){
           //接口

            wx.redirectTo({
                url:'../repayment/success'
            })
       }
    },
    //返回
    back:function(){
        this.setData({
            flick:false
        })
    }
});