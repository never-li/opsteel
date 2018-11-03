const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        type: null, // 类型 0-现货 1-订单 2-到货
        settleType: null, // 结算类型 10-现货 20-订单 没运单 30-到货 40-订单 有运单
        invoiceCompanyName: '', // 现货发票公司名
        invoiceCompanyId: '', // 现货发票公司id
        cartVo: [], // 现货
        orderVo: {}, // 订单
        goodsVo: {}, // 到货
        freightVo: {}, // 运费
        frameOrderCode: '', // 合同号
        freightCode: '', // 运单号
        payEndDatetime: '' // 最后付款时间
    },
    invoiceCompanyNameChange(e) {
        this.setData({
            invoiceCompanyName: this.data.cartVo.selfRunBankAccoutEntities[e.detail.value].name,
            invoiceCompanyId: this.data.cartVo.selfRunBankAccoutEntities[e.detail.value].id
        });
    },
    nextStep() {
        APP.isAuth().then((val) => {
            if (!val) return;
            let _this = this,
                _data = this.data,
                params = {}; // 参数

            if (_data.settleType == 10) {
                // 现货
                params = {
                    cartIds: _data.cartVo.cartIds.split(','),
                    bargainedPrice: 0,
                    invoiceCompanyId: _data.invoiceCompanyId
                };
                APP.request('createXianhuoOrder', params).then(
                    (res) => {
                        let _res  = res.data;
                        wx.redirectTo({
                            url: '/pages/cart/settle-3?settleType=' + _data.settleType + '&type=' + _data.type + '&frameOrderCode=' + _res.finalBuyerSerialCode + '&payEndDatetime=' + _res.lastPayDate
                        });
                    },
                    (err) => {
                        if (err.status == 3) {
                            APP.showToast({
                                title: '当前订单异常，无法生成订单'
                            });
                        } else {
                            APP.showToast({
                                title: err.message
                            });
                        };
                    }
                );
            } else if (_data.settleType == 20) {
                // 订单 没运单
                let paramsA = {
                        cartId: _data.orderVo.id,
                        serialCode: _data.orderVo.serialCode
                    },
                    paramsB = {
                        serialCode: _data.orderVo.serialCode
                    };
                APP.request('updateOrder', paramsA).then(
                    (res) => {
                        // 获取单号和最后付款日
                        APP.request('getOrderFreightCodeAndDate', paramsB).then(
                            (res) => {
                                _this.setData({
                                    frameOrderCode: res.data.frameOrderCode,
                                    freightCode: res.data.freightCode,
                                    payEndDatetime: res.data.payEndDatetime
                                });
                                wx.redirectTo({
                                    url: '/pages/cart/settle-3?settleType=' + _data.settleType + '&type=' + _data.type + '&frameOrderCode=' + _data.frameOrderCode + '&freightCode=' + _data.freightCode + '&payEndDatetime=' + _data.payEndDatetime + '&serialCode=' + _data.orderVo.serialCode
                                });
                            }
                        );
                    }
                );
            } else if (_data.settleType == 30) {
                // 到货
                let _goodsIdList = [];
                _data.goodsVo.cartGoodsVoList.map((item) => {
                    _goodsIdList.push(item.goodsId.toString());
                });
                APP.request('createGoodsOrder', { goodsIdList: _goodsIdList }).then(
                    (res) => {
                        _this.setData({
                            frameOrderCode: res.data.redemptionBillCode,
                            payEndDatetime: res.data.lastPayDate
                        });
                        let interval = setInterval(() => {
                            APP.request('checkGoodsBillStatus', { redemptionBillCode: _data.frameOrderCode }).then(
                                (res) => {
                                    clearInterval(interval);
                                    interval = null;
                                    wx.redirectTo({
                                        url: '/pages/cart/settle-3?settleType=' + _data.settleType + '&type=' + _data.type + '&frameOrderCode=' + _data.frameOrderCode + '&payEndDatetime=' + _data.payEndDatetime
                                    });
                                },
                                (err) => {
                                    if (err.status != 2) {
                                        clearInterval(interval);
                                        interval = null;
                                        APP.showToast({
                                            title: err.message
                                        });
                                        if (err.status == 4) {
                                            setTimeout(() => {
                                                wx.switchTab({
                                                    url: '/pages/cart/index'
                                                });
                                            }, 1600);
                                        };
                                    } else {
                                        APP.showToast({
                                            title: err.message,
                                            duaration: 1000
                                        });
                                    };
                                }
                            );
                        }, 1000);
                    }
                );
            } else {
                // 订单 有运单
                wx.redirectTo({
                    url: '/pages/cart/settle-2?settleType=' + _data.settleType + '&type=' + _data.type + '&cartId=' + _data.orderVo.id + '&serialCode=' + _data.orderVo.serialCode
                });
            };
        });
    },
    onLoad(opts) {
        this.setData({
            settleType: opts.settleType,
            type: opts.type
        });
        let params = {};
        params.settleType = opts.settleType;
        params.providerName = opts.provider;
        if (opts.ids) {
            params.ids = opts.ids;
        };
        if (opts.cartOrderIds) {
            params.cartOrderIds = opts.cartOrderIds;
        };
        APP.request('settleCart', params).then(
            (res) => {
                let _res = res.data;
                if (opts.type == 0) {
                    // 现货
                    let _cartVo = _res,
                        _totalPieces = 0,
                        _totalWeight = 0,
                        _totalGoodsAmount = 0;
                    _cartVo.cartVoList.map((item) => {
                        _totalPieces += parseFloat(item.pieces);
                        _totalWeight += parseFloat(item.weight);
                        _totalGoodsAmount += parseFloat(item.totalAmount);
                        item.weight = UTIL.parseWeight(item.weight);
                        item.price = UTIL.parsePrice(item.price);
                        item.totalAmount = UTIL.parsePrice(item.totalAmount);
                    });
                    if (_cartVo.cartVoList[0].businessType == 30 && _cartVo.isIncludeProxyResource == 0) {
                        this.setData({
                            invoiceCompanyName: _cartVo.selfRunBankAccoutEntities[0].name,
                            invoiceCompanyId: _cartVo.selfRunBankAccoutEntities[0].id
                        });
                    } else if (_cartVo.cartVoList[0].businessType == 10 && _cartVo.isIncludeProxyResource == 1) {
                        this.setData({
                            invoiceCompanyName: _cartVo.cartVoList[0].realProviderName,
                            invoiceCompanyId: _cartVo.cartVoList[0].realProviderId
                        });
                    } else {
                        this.setData({
                            invoiceCompanyName: _cartVo.cartVoList[0].invoiceCompanyName,
                            invoiceCompanyId: _cartVo.cartVoList[0].invoiceCompanyId
                        });
                    };
                    this.setData({
                        cartVo: _cartVo
                    });
                    let xianhuoObj = {
                        totalPieces: _totalPieces,
                        totalWeight: UTIL.parseWeight(_totalWeight),
                        totalGoodsAmount: UTIL.parsePrice(_totalGoodsAmount)
                    };
                    wx.setStorageSync('xianhuoObj', xianhuoObj);
                } else if (opts.type == 1) {
                    // 订单
                    let _orderVo = _res.shoppingCartCustomizeVo.shoppingCartOrderVo;
                    _orderVo.paymentRate = _orderVo.paymentRate? _orderVo.paymentRate*100 : '';
                    _orderVo.frameOrderMonth = _orderVo.frameOrderMonth? UTIL.formatDate.format(_orderVo.frameOrderMonth, 'yyyy-MM') : '';
                    _orderVo.freightSubsidyAmount = UTIL.parsePrice(_orderVo.freightSubsidyAmount);
                    _orderVo.frameOrderPrice = UTIL.parsePrice(_orderVo.frameOrderPrice);
                    _orderVo.goodsAmount = UTIL.parsePrice(_orderVo.goodsAmount);
                    _orderVo.orderWeight = UTIL.parseWeight(_orderVo.orderWeight);
                    this.setData({
                        orderVo: _orderVo
                    });
                    let orderObj = {
                        totalPieces: 1,
                        totalWeight: _orderVo.orderWeight,
                        totalGoodsAmount: _orderVo.goodsAmount,
                        freightSubsidyAmount: _orderVo.freightSubsidyAmount
                    };
                    wx.setStorageSync('orderObj', orderObj);
                } else if (opts.type == 2) {
                    // 到货
                    let _goodsVo = _res.shoppingCartCustomizeGoodVo;
                    _goodsVo.cartGoodsVoList.map((item) => {
                        item.weight = UTIL.parseWeight(item.weight);
                        item.price = UTIL.parsePrice(item.price);
                        item.totalAmount = UTIL.parsePrice(item.totalAmount);
                        item.interest = UTIL.parsePrice(item.interest);
                    });
                    this.setData({
                        goodsVo: _goodsVo
                    });
                    let goodsObj = {
                        totalPieces: _goodsVo.totalCount? _goodsVo.totalCount : 1,
                        totalWeight: UTIL.parseWeight(_goodsVo.totalWeight),
                        totalGoodsAmount: UTIL.parsePrice(_goodsVo.totalGoodsAmount),
                        totalFreezeAmount: UTIL.parsePrice(_goodsVo.totalFreezeAmount),
                        totalInterest: UTIL.parsePrice(_goodsVo.totalInterest),
                        totalAmount: UTIL.parsePrice(_goodsVo.totalPayAmount)
                    };
                    wx.setStorageSync('goodsObj', goodsObj);
                };

                if (opts.settleType == 40) {
                    // 订单 有运费
                    let _freightVo = _res.shoppingCartCustomizeVo.shoppingCartFreightVo;
                    _freightVo.method = _freightVo.freightSettleMethod == 20? '价含运费' :  _freightVo.freightSettleMethod == 30? '价外代付(买家)' : _freightVo.freightSettleMethod == 40? '价外代收(卖家)' : '';
                    _freightVo.transportWeight = UTIL.parseWeight(_freightVo.transportWeight);
                    _freightVo.freightPrice = UTIL.parsePrice(_freightVo.freightPrice);
                    _freightVo.freightAmount = UTIL.parsePrice(_freightVo.freightAmount);
                    wx.setStorageSync('freightVo', _freightVo);
                };
            }
        );
    }
})