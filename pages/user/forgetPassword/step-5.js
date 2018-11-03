const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        succIcon: GLOBAL.iconDomain + 'icon-success.png',
        isShowToast: 0,
        title: '',
        icon: '',
        userName: '',
        password: ''
    },
    backHome() {
        let params = {
            userName: this.data.userName,
            password: this.data.password
        };
        APP.login(params).then((res) => {
            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/home/index'
                });
            }, 500);
        });
    },
    onLoad(opts) {
        this.setData({
            userName: opts.userName,
            password: opts.password,
        });
    },
})