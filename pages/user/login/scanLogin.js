// user/index.js
const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        wxrslgToken: ''
    },
    backHome() {
        wx.switchTab({
            url: '/pages/home/index'
        });
    },
    pcLogin() {
        console.log('wxrslgToken', this.data.wxrslgToken,'wxToken', APP.globalData.token)
        APP.request('scanLogin', { wxrslgToken: this.data.wxrslgToken, wxToken: APP.globalData.token }).then(
            (res) => {
                APP.showToast({
                    title: '已成功登录欧浦智网',
                    icon: GLOBAL.iconDomain + 'toast-succ.png',
                    duaration: 1000
                });
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/home/index'
                    });
                }, 1200);
            },
            (err) => {
                console.log(err);
            }
        );
    },
    onLoad: function (opts) {
        if (opts.wxrslgToken) {
            this.setData({
                wxrslgToken: opts.wxrslgToken
            });
        } else if (opts.q) {
            let _q = decodeURIComponent(opts.q);
            let _idx = _q.indexOf('=');
            let _wxrslgToken = _q.substring(_idx+1);
            this.setData({
                wxrslgToken: _wxrslgToken
            });
        };
    }
})