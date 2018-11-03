const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        type: null, // 类型 0-现货 1-订单 2-到货
        settleType: null, // 结算类型 10-现货 20-订单 没运单 30-到货 40-订单 有运单
        cartId: null,
        serialCode: '',
        freightVo: {},
        frameOrderCode: '',
        freightCode: '',
        payEndDatetime: ''
    },
    nextStep() {
        let _this = this,
            _data = this.data,
            paramsA = {
                cartId: _data.cartId,
                serialCode: _data.serialCode
            },
            paramsB = {
                serialCode: _data.serialCode
            };
        APP.request('updateOrder', paramsA).then(
            (res) => {}
        ).then((res) => {
            // 获取单号和最后付款日
            APP.request('getOrderFreightCodeAndDate', paramsB).then(
                (code) => {
                    _this.setData({
                        frameOrderCode: code.data.frameOrderCode,
                        freightCode: code.data.freightCode,
                        payEndDatetime: code.data.payEndDatetime
                    });
                    wx.redirectTo({
                        url: '/pages/cart/settle-3?settleType=' + _data.settleType + '&type=' + _data.type + '&frameOrderCode=' + _data.frameOrderCode + '&freightCode=' + _data.freightCode + '&payEndDatetime=' + _data.payEndDatetime + '&serialCode=' + _data.serialCode + '&freightBillCode=' + _data.freightVo.freightBillCode
                    });
                }
            )
        });
    },
    onLoad(opts) {
        this.setData({
            settleType: opts.settleType,
            type: opts.type,
            cartId: opts.cartId,
            serialCode: opts.serialCode
        });
        this.setData({
            freightVo: wx.getStorageSync('freightVo')
        });
    },
})