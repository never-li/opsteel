const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        oldPwd: '', // 原密码
        oldPwdSucc: 0,
        newPwd: '', // 新密码
        newPwdSucc: 0,
        renewPwd: '', // 确认密码
        renewPwdSucc: 0,
    },
    // 输入原密码
    oldPwdInput(e) {
        this.setData({
            oldPwd: e.detail.value
        });
        if (this.data.oldPwd.length >= 6 && this.data.oldPwd.length <= 16) {
            this.setData({
                oldPwdSucc: 1
            });
        } else {
            this.setData({
                oldPwdSucc: 0
            });
        };
    },
    // 输入新密码
    newPwdInput(e) {
        this.setData({
            newPwd: e.detail.value
        });
        if (this.data.newPwd.length >= 6 && this.data.newPwd.length <= 16) {
            this.setData({
                newPwdSucc: 1
            });
        } else {
            this.setData({
                newPwdSucc: 0
            });
        };
    },
    // 输入确认密码
    renewPwdInput(e) {
        this.setData({
            renewPwd: e.detail.value
        });
        if (this.data.renewPwd.length >= 6 && this.data.renewPwd.length <= 16) {
            this.setData({
                renewPwdSucc: 1
            });
        } else {
            this.setData({
                renewPwdSucc: 0
            });
        };
    },
    resetData() {
        this.setData({
            newPwd: '',
            newPwdSucc: 0,
            renewPwd: '',
            renewPwdSucc: 0
        });
    },
    // 提交
    submit() {
        if (!this.data.newPwdSucc || !this.data.renewPwdSucc) return;

        if (this.data.newPwd != this.data.renewPwd) {
            APP.showToast({
                title: '两次密码不相同'
            });
            this.resetData();
            return;
        };

        const PATTERN = /^[0-9A-Za-z]{6,16}$/; // 匹配6-16位数字和字母
        if (!PATTERN.test(this.data.newPwd) || !PATTERN.test(this.data.renewPwd)) {
            APP.showToast({
                title: '密码格式不正确'
            });
            this.resetData();
            return;
        };

        let paramsA = {
            mobile: wx.getStorageSync('mobile'),
            originalPassword: this.data.oldPwd,
            password: this.data.newPwd
        };
        APP.request('updatePassword', paramsA).then(
            (res) => {
                APP.showModal({
                    content: '密码修改成功',
                    success: (res) => {
                        let paramsB = {
                            userName: wx.getStorageSync('username'),
                            password: this.data.newPwd
                        };
                        APP.login(paramsB).then((res) => {
                            wx.switchTab({
                                url: '/pages/user/index'
                            });
                        });
                    }
                });
            }
        );
    },
    onLoad() {
    }
})