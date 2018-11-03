const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        bankFullName: '', // 银行全称
        bankAccount: '', // 银行账户
        banlanceChecked: 1, // 余额支付
        payType: '', // 付款方式（10:余额支付;20:网银支付;30：白条）
        payApplyMethod: '', // 支付方式
        baitiaoChecked: 0, // 白条支付
        baitiaoVal: 0, // 白条输入值
        type: null, // 类型 0-现货 1-订单 2-到货
        settleType: null, // 结算类型 10-现货 20-订单 没运单 30-到货 40-订单 有运单
        cartId: null, // 订单-购物车Id
        serialCode: '', // 订单-内部流水号
        freightBillCode: '', // 订单-外部订单号
        frameOrderCode: '', // 合同号
        batchcode: '', // 支付批次号
        freightCode: '', // 订单-运单号
        payEndDatetime: '', // 订单-最后付款日
        info: {}, // 付款信息
        payInfo: {}, // 付款明细
        bankInfoList: [], // 银行信息
        baitiaoList: [],
        canPay: 0 // 支付状态
    },
    // 选择银行
    bankChange(e) {
        this.setData({
            bankFullName: this.data.bankInfoList[e.detail.value].bankFullName,
            bankAccount: this.data.bankInfoList[e.detail.value].bankAccount
        });
    },
    // 余额支付
    // balancePay() {
    //     this.setData({
    //         banlanceChecked: !this.data.banlanceChecked
    //     });
    // },
    // 白条支付
    baitiaoPay() {
        this.setData({
            baitiaoChecked: !this.data.baitiaoChecked
        });
    },
    baitiaoInput(e) {
        this.setData({
            baitiaoVal: e.detail.value
        });
    },
    baitiaoChange(e) {
        let _item = e.currentTarget.dataset.item;
    },
    nextStep() {
        let _data = this.data;
        if (!_data.canPay) return;
        // payType 付款方式（10:余额支付;20:网银支付;30：白条）
        let _payType = [],
            _payApplyMethod = [];
        if (_data.banlanceChecked) {
            _payType.push('10');
            _payApplyMethod.push({ method: 10, amount: _data.payInfo.totalAmount });
        };
        if (_data.baitiaoChecked) {
            _payType.push('30');
        };
        this.setData({
            payType: _payType.toString(),
            payApplyMethod: JSON.stringify(_payApplyMethod)
        });
        if (_data.payInfo.buyerCompanySourceType == 0 && _data.bankInfoList.length > 0) {
            wx.navigateTo({
                url: '/pages/cart/settle-4?batchcode=' + _data.batchcode + '&bankNo=' + _data.info.bankName + '&bankAccount=' + _data.info.bankAccount + '&payType=' + _data.payType + '&payApplyMethod=' + _data.payApplyMethod + '&totalAmount=' + _data.payInfo.totalAmount + '&settleType=' + _data.settleType + '&type=' + _data.type
            });
        } else {
            wx.navigateTo({
                url: '/pages/cart/settle-4?batchcode=' + _data.batchcode + '&bankNo=' + _data.bankFullName + '&bankAccount=' + _data.bankAccount + '&payType=' + _data.payType + '&payApplyMethod=' + _data.payApplyMethod + '&totalAmount=' + _data.payInfo.totalAmount + '&settleType=' + _data.settleType + '&type=' + _data.type
            });
        };
    },
    // 付款确认
    confirmPayData() {
        let _this = this,
            _data = this.data;
        APP.request('confirmPayData', { batchcode: _data.batchcode }).then(
            (pay) => {
                let _pay = pay.data;
                if (_pay.accountInfo) {
                    _pay.activeAmount = UTIL.parsePrice(_pay.accountInfo.activeAmount);
                };
                _pay.paymentDetail.totalAmount = UTIL.parsePrice(_pay.paymentDetail.totalAmount);
                _pay.maxPayAmount = UTIL.parsePrice(_pay.maxPayAmount);
                if (_pay.paymentDetail.buyerCompanySourceType == 0 && _pay.bankInfoList) {
                    _this.setData({
                        bankInfoList: _pay.bankInfoList
                    });
                    if (_pay.bankInfoList.length > 0) {
                        _this.setData({
                            bankFullName: _pay.bankInfoList[0].bankFullName,
                            bankAccount: _pay.bankInfoList[0].bankAccount
                        });
                    };
                }
                _this.setData({
                    info: _pay,
                    payInfo: _pay.paymentDetail
                });
                if (_data.payInfo.payStatus == 20) {
                    APP.cartModal('请等待银行确认！');
                    return;
                } else if (_data.payInfo.payStatus == 30) {
                    APP.cartModal('已付款成功！');
                    return;
                } else if (_data.payInfo.payStatus == 90) {
                    APP.cartModal('已取消付款！');
                    return;
                } else if (_data.payInfo.payStatus == 100) {
                    APP.cartModal('付款失败！');
                    return;
                };
                if (_data.payInfo.buyerCompanySourceType == 1 && (parseFloat(_data.info.activeAmount + _data.info.maxPayAmount) < parseFloat(_data.payInfo.totalAmount))) {
                    APP.cartModal('余额不足，请登录欧浦智网充值！');
                    return;
                };
                if (_data.payInfo.buyerCompanySourceType == 0 && _data.bankInfoList.length < 1) {
                    APP.cartModal('无收款帐号，请联系客服：0757-28908888');
                    return;
                };
                _this.setData({
                    canPay: 1
                });
            },
            (err) => {
                APP.cartModal(err.message);
            }
        );
    },
    onLoad(opts) {
        APP.showLoading();
        this.setData({
            type: opts.type,
            settleType: opts.settleType
        });
        let _this = this,
            _data = this.data,
            params = {};
        if (opts.type == 0) {
            _this.setData({
                frameOrderCode: opts.frameOrderCode.toString(),
                payEndDatetime: opts.payEndDatetime
            });
            params = {
                serialCode: opts.frameOrderCode.toString(),
                fundType: 10
            };
        } else if (opts.type == 1) {
            // 订单
            _this.setData({
                frameOrderCode: opts.frameOrderCode,
                payEndDatetime: opts.payEndDatetime,
                freightCode: opts.freightCode
            });
            params = {
                fundType: 10, // 款项类型(10:货款,20:运费,30赎单)
                serialCode: opts.serialCode
            };
            if (opts.settleType == 40) {
                params.freightBillCode = opts.freightBillCode;
            };
        } else {
            // 到货
            _this.setData({
                frameOrderCode: opts.frameOrderCode,
                payEndDatetime: opts.payEndDatetime
            });
            params = {
                fundType: 30, // 款项类型(10:货款,20:运费,30赎单)
                serialCode: opts.frameOrderCode
            };
        };
        // 保存付款信息
        setTimeout(() => {
            APP.hideLoading();
            APP.request('savePayment', params).then(
                (res) => {
                    _this.setData({
                        batchcode: res.data.result[0].batchCode
                    });
                    if (opts.settleType == 40) {
                        // 运单
                        let paramsFreight = {
                            fundType: 20,
                            serialCode: _data.freightCode
                        };
                        APP.request('savePayment', paramsFreight).then(
                            (res) => {
                                _this.confirmPayData();
                            }
                        );
                    } else {
                        _this.confirmPayData();
                    };
                }
            );
        }, 1500);
    }
})