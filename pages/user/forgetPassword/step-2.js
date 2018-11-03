const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        mobileValue: '', // 手机号
        mobileSucc: 0,
        accountValue: '',
    },
    // 手机号输入
    mobileInput(e) {
        this.setData({
            mobileValue: e.detail.value,
            mobileSucc: 1
        });
        if (!this.data.mobileValue) {
            this.setData({
                mobileSucc: 0
            });
        };
    },
    // 获取验证码
    nextStep() {
        if (!this.data.mobileSucc) return;

        let params = {
            username: this.data.accountValue,
            mobile: this.data.mobileValue
        };
        APP.request('forgetPasswordMsg', params).then(
            (res) => {
                wx.navigateTo({
                    url: '/pages/user/forgetPassword/step-3?username=' + this.data.accountValue + '&mobile=' + this.data.mobileValue
                });
            }
        );
    },
    onLoad(opts) {
        this.setData({
            accountValue: opts.account
        });
    }
})