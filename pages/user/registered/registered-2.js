const APP = getApp();

let countdown = 60;
let settime = function (that) {
    if (countdown == 0) {
        that.setData({
            is_show: true
        })
        countdown = 60;
        return;
    } else {
        that.setData({
            is_show:false,
            last_time:countdown
        })
        countdown--;
    }
    setTimeout(function () {
        settime(that)
    }, 1000)
}


Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        oneEnter:true,  //第一次进入页面
        phone:null,   //手机号码
        is_show:true, //验证码状态
        state_show:true, //倒数状态
        codeDefault:false, //验证码正确显示状态
        codeDataAll:'', //验证码
    },
    onLoad: function (option) {
        this.setData({
            phone:option.phone,
        });
        var value = wx.getStorageSync('oneEnter')
        if(!value){
             this.clickVerify();
        }else{
            let that = this;
            that.setData({
                state_show:false
             })
            setTimeout(function () {
                that.setData({
                    state_show:true
                })
                countdown = 0;
                wx.removeStorageSync('oneEnter');
            }, 3000)
        }
    },
    clickVerify:function(){
        let data = {
            mobile: this.data.phone,
        };
        var that = this;
        APP.request('registerwxMsg', data).then((res) => {
            wx.setStorageSync('oneEnter', true);
            // 将获取验证码按钮隐藏60s，60s后再次显示
            that.setData({
                is_show: (!that.data.is_show)  //false
            })
            settime(that);
        });
    },
    watchcode:function(e){
        let value = e.detail.value;
        if(value.length==4 && this.isDigits(value)){
            this.setData({
                codeDataAll:value,
                codeDefault:true,
            })
        }else{
            this.setData({
                codeDefault:false
            })
        }
    },
    nextStep2:function(){
        if(this.data.codeDefault){
            wx.navigateTo({
                url:'/pages/user/registered/registered-3?phone='+this.data.phone+'&code='+this.data.codeDataAll
            })
        }
        
    },
    //验证数字
    isDigits:function(num){
        var pattern =  /^\d+$/;
        return pattern.test(num);
    },

       

})