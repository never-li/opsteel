const APP = getApp();
Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        phone:null,   //手机号码
        code:null,  //验证码
        passwordValue: '', // 密码
        againPasswordValue: '', // 再次密码
        passwordstatus:false, //按钮状态
        repasswordstatus:false //按钮状态
    },
    onLoad: function (opts) {
        this.setData({
            phone:opts.phone,
            code:opts.code,
        });
    },
    passwordInput:function(e){
        this.setData({
            passwordValue:e.detail.value
        });
        if (this.data.passwordValue.length >= 6 && this.data.passwordValue.length <= 16) {
            this.setData({
                passwordstatus: 1
            });
        } else {
            this.setData({
                passwordstatus: 0
            });
        };
    },
    againPassword:function(e){
        this.setData({
            againPasswordValue:e.detail.value
        });
        if (this.data.againPasswordValue.length >= 6 && this.data.againPasswordValue.length <= 16) {
            this.setData({
                repasswordstatus: 1
            });
        } else {
            this.setData({
                repasswordstatus: 0
            });
        };
    },
    nextStep3:function(){
        if (!this.data.passwordstatus || !this.data.repasswordstatus) return;
        if (this.data.passwordValue != this.data.againPasswordValue) {
            APP.showToast({
                title: '两次密码不相同'
            });
            return;
        };

        const PATTERN = /^[0-9A-Za-z]{6,16}$/; // 匹配6-16位数字和字母
        if (!PATTERN.test(this.data.passwordValue) || !PATTERN.test(this.data.againPasswordValue)) {
            APP.showToast({
                title: '密码格式不正确'
            });
            return;
        };
        if(this.data.passwordstatus){
            let data ={
                username:this.data.phone,
                mobile:this.data.phone,
                smsCode:this.data.code,
                password:this.data.passwordValue
            }
            APP.request('wxRegister', data).then((res) => {
                wx.reLaunch({
                    url:'/pages/user/registered/registered-4?password=' + this.data.passwordValue + '&username=' + res.data.username
                }) 
            });

        }
    }
})