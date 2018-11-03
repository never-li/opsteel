const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        codeValue: '',
        recodeValue: '',
        codeSucc: 0,
        recodeSucc: 0,
        username: '',
        mobile: null,
        sms: null
    },
    // 输入密码
    codeInput(e) {
        this.setData({
            codeValue: e.detail.value
        });
        if (this.data.codeValue.length >= 6 && this.data.codeValue.length <= 16) {
            this.setData({
                codeSucc: 1
            });
        } else {
            this.setData({
                codeSucc: 0
            });
        };
    },
    // 再次输入
    recodeInput(e) {
        this.setData({
            recodeValue: e.detail.value
        });
        if (this.data.recodeValue.length >= 6 && this.data.recodeValue.length <= 16) {
            this.setData({
                recodeSucc: 1
            });
        } else {
            this.setData({
                recodeSucc: 0
            });
        };
    },
    resetData() {
        this.setData({
            codeValue: '',
            codeSucc: 0,
            recodeValue: '',
            recodeSucc: 0
        });
    },
    // 完成
    nextStep() {
        if (!this.data.codeSucc || !this.data.recodeSucc) return;
        if (this.data.codeValue != this.data.recodeValue) {
            APP.showToast({
                title: '两次密码输入不相同'
            });
            this.resetData();
            return;
        };
        const PATTERN = /^[0-9A-Za-z]{6,16}$/; // 匹配6-16位数字和字母
        if (!PATTERN.test(this.data.codeValue) || !PATTERN.test(this.data.recodeValue)) {
            APP.showToast({
                title: '密码格式不正确'
            });
            this.resetData();
            return;
        };
        let params = {
            username: this.data.username,
            mobile: this.data.mobile,
            smsCode: this.data.sms,
            password: this.data.codeValue
        };
        APP.request('forgetPasswordStep2', params).then(
            (res) => {
                wx.reLaunch({
                    url: '/pages/user/forgetPassword/step-5?userName=' + this.data.username + '&password=' + this.data.codeValue
                });
            },
            (err) => {
                this.resetData();
            }
        );
    },
    onLoad(opts) {
        this.setData({
            username: opts.username,
            mobile: opts.mobile,
            sms: opts.sms
        });
    },
})