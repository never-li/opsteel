const APP = getApp();
const GLOBAL = require('../../utils/global.js');

Page({
    data: {
        succIcon: GLOBAL.iconDomain + 'icon-success.png',
        isAudit: ''
    },
    backCart() {
        wx.switchTab({
            url: '/pages/cart/index'
        });
    },
    onLoad(opts) {
        this.setData({
            isAudit: opts.isAudit // 0：不审核；1：审核
        });
    },
    onUnload() {
        wx.removeStorageSync('xianhuoObj');
        wx.removeStorageSync('orderObj');
        wx.removeStorageSync('goodsObj');
        wx.removeStorageSync('freightVo');
    }
})