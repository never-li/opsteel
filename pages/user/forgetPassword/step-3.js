const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        username: '', // 用户名
        mobile: null, // 手机号
        smsValue: '', // 验证码输入
        smsSucc: 0, // 验证码状态
        timeout: 60 // 倒计时
    },
    // 验证码输入
    smsInput(e) {
        this.setData({
            smsValue: e.detail.value
        });
        if (this.data.smsValue.length == 4) {
            this.setData({
                smsSucc: 1
            });
        } else {
            this.setData({
                smsSucc: 0
            });
        };
    },
    // 下一步
    nextStep() {
        if (!this.data.smsSucc) return;
        let _data = this.data,
            params = {
                username: _data.username,
                mobile: _data.mobile,
                smsCode: _data.smsValue
            };
        APP.request('forgetPasswordStep1', params).then(
            (res) => {
                wx.navigateTo({
                    url: '/pages/user/forgetPassword/step-4?username=' + _data.username + '&mobile=' + _data.mobile + '&sms=' + _data.smsValue
                });
            },
            (err) => {
                this.setData({
                    smsValue: '',
                    smsSucc: 0
                });
            }
        );
    },
    // 获取验证码
    sendSms() {
        let params = {
            username: this.data.username,
            mobile: this.data.mobile
        };
        APP.request('forgetPasswordMsg', params).then(
            (res) => {}, 
            (err) => {}
        );
    },
    // 60s倒计时
    timeout() {
        let _timeout = 60;
        var timer = setInterval(() => {
            _timeout--;
            if (_timeout <= 0) {
                _timeout = 0;
                clearInterval(timer);
                timer = null;
            };
            this.setData({
                timeout: _timeout
            });
        }, 1000);
    },
    onLoad(opts) {
        this.setData({
            username: opts.username,
            mobile: opts.mobile
        });
        this.timeout();
    }
})