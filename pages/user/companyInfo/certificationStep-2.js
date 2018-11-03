// pages/user/companyInfo/certificationStep-2.js
const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        succIcon: GLOBAL.iconDomain + 'icon-success.png'
    },
    backAccount() {
        wx.switchTab({
            url: '/pages/user/index'
        });
    },
    backHome() {
        wx.switchTab({
            url: '/pages/home/index'
        })
    },
    onLoad() {
    }
})