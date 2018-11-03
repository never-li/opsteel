const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        type: null,
        settleType: null,
        xianhuoObj: {},
        orderObj: {},
        goodsObj: {},
        totalAmount: 0,
        freightAmount: 0,
        params: {}
    },
    goPay() {
        let _data = this.data,
            _p = this.data.params;
        APP.showModal({
            showCancel: true,
            content: '确认付款？',
            success: (res) => {
                if (res.confirm) {
                    let paramsA = {
                            batchcode: _p.batchcode,
                            bankNo: _p.bankNo,
                            bankAccount: _p.bankAccount,
                            payType: _p.payType,
                            payApplyMethod: _p.payApplyMethod
                        };
                    APP.request('goPay', paramsA).then(
                        (res) => {}
                    ).then((res) => {
                        let paramsB = {
                            batchcode: _p.batchcode,
                            amt: _data.totalAmount
                        };
                        APP.request('payResult', paramsB).then(
                            (pay) => {
                                wx.reLaunch({
                                    url: '/pages/cart/settle-5?isAudit=' + pay.data.isAudit
                                });
                            }
                        )
                    });
                };
            }
        })
        
    },
    onLoad(opts) {
        this.setData({
            params: opts,
            type: opts.type,
            settleType: opts.settleType,
            totalAmount: opts.totalAmount
        });
        if (opts.type == 0) {
            this.setData({
                xianhuoObj: wx.getStorageSync('xianhuoObj')
            });
        } else if (opts.type == 1) {
            this.setData({
                orderObj: wx.getStorageSync('orderObj')
            });
        } else if (opts.type == 2) {
            this.setData({
                goodsObj: wx.getStorageSync('goodsObj')
            });
        };
        if (opts.settleType == 40) {
            this.setData({
                freightAmount: wx.getStorageSync('freightVo').freightAmount
            });
        };
    }
})