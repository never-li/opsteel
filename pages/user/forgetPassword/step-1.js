const APP = getApp();

Page({
    data: {
        accountValue: '', // 用户名
        accountSucc: 0
    },
    accountInput(e) {
        this.setData({
            accountValue: e.detail.value,
            accountSucc: 1
        });
        if (!this.data.accountValue) {
            this.setData({
                accountSucc: 0
            });
        };
    },
    nextStep() {
        if (!this.data.accountSucc) return;

        wx.navigateTo({
            url: '/pages/user/forgetPassword/step-2?account=' + this.data.accountValue
        });
    },
    onLoad() {
    }
})