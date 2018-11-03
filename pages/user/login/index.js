// login/index.js
const APP = getApp();
const GLOBAL = require('../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain, // 图标域名
        isShowToast: 0,
        title: '',
        icon: '',
        accVal: '', // 帐号
        pwdVal: '', // 密码
        accSucc: 0, // 是否输入帐号
        pwdSucc: 0, // 是否输入密码
    },
    // 帐号输入
    accInput(e) {
        this.setData({
            accVal: e.detail.value,
            accSucc: 1
        });
        if (!this.data.accVal) {
            this.setData({
                accSucc: 0
            });
        };
    },
    clearAcc() {
        this.setData({
            accVal: '',
            accSucc: 0
        });
    },
    // 密码输入
    pwdInput(e) {
        this.setData({
            pwdVal: e.detail.value
        });
        if (this.data.pwdVal.length >= 6 && this.data.pwdVal.length <= 16) {
            this.setData({
                pwdSucc: 1
            });
        } else {
            this.setData({
                pwdSucc: 0
            });
        };
    },
    clearPwd() {
        this.setData({
            pwdVal: '',
            pwdSucc: 0
        });
    },
    // 登录
    goLogin() {
        if (!this.data.accSucc || !this.data.pwdSucc) return;
        let params = {
            userName: this.data.accVal,
            password: this.data.pwdVal
        };
        APP.login(params).then(
            (res) => {
                APP.showToast({
                    icon: GLOBAL.iconDomain + 'toast-succ.png',
                    title: res.message
                });
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/home/index'
                    });
                }, 500);
            }
        );
    },
    onLoad() {
        // 保存上次登录的帐号名
        if (wx.getStorageSync('username')) {
            this.setData({
                accVal: wx.getStorageSync('username'),
                accSucc: 1
            });
        };
    }
})