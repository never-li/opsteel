const APP = getApp();
Page({
    data: {
        phoneDefault:true,
        phoneNumber:null
    },
    onLoad: function (opts) {
    },
    watchPhone:function(e){
        if(e.detail.value.match(/^(1[3,4,5,6,7,8,9])\d{9}$/)){
            this.setData({ phoneDefault:false})
            this.setData({ phoneNumber:e.detail.value})
        }else{
            this.setData({ phoneDefault:true })
        }
    },
    nextStep:function(){
        if(!this.data.phoneDefault){
            wx.navigateTo({
                url:'/pages/user/registered/registered-2?phone='+this.data.phoneNumber
            })
        }
        
    }



})