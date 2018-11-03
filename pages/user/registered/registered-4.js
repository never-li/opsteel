const APP = getApp();
const GLOBAL = require('../../../utils/global.js');
Page({
    data: {
        successIcon: GLOBAL.iconDomain + 'icon-success.png',
        isShowToast: 0,
        title: '',
        icon: '',
        userName: '',
        password: ''
    },
    goAuth() {
        let params = {
            userName: this.data.userName,
            password: this.data.password
        };
        APP.login(params).then(
            (res) => {
                wx.switchTab({
                    url: '/pages/user/index'
                });
            }
        );
    },
    backHome() {
        let params = {
            userName: this.data.userName,
            password: this.data.password
        };
        APP.login(params).then(
            (res) => {
                wx.switchTab({
                    url: '/pages/home/index'
                });
            }
        );
    },
    onLoad: function (opts) {
        this.setData({
            userName: opts.username,
            password: opts.password
        });
    }
})