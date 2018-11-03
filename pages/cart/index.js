const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        isLogin: 0,
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH: 0,
        tab: 0,
        hasXianhuo: 1,
        hasOrder: 1,
        hasGoods: 1,
        xianhuoData: [], // 现货
        disableData: [], // 失效
        orderData: [], // 订单
        goodsData: [], // 到货
        disablePieces: 0, // 失效资源
        totalXianhuoPieces: 0,
        totalXianhuoWeight: 0,
        totalXianhuoAmount: 0,
        totalDingzhiPieces: 0,
        totalDingzhiWeight: 0,
        totalDingzhiAmount: 0
    },
    changeTab(e) {
        let _tab = e.currentTarget.dataset.tab;
        if (_tab == this.data.tab) return;

        this.setData({
            tab: _tab
        });
    },
    // 展开/收起
    showDetail(e) {
        let _target = e.currentTarget.dataset,
            _key = '',
            _value = 0;

        if (_target.type == '0') {
            _key = 'xianhuoData[' + _target.idx + '].flag';
            _value = this.data.xianhuoData[_target.idx].flag;
        } else {
            _key = 'goodsData[' + _target.idx + '].flag';
            _value = this.data.goodsData[_target.idx].flag;
        };
        this.setData({
            [_key]: !_value
        });
    },
    // 判断类型
    defineType(type) {
        let _info = {
                data: [],
                key: ''
            };
        if (type == 0) {
            // 现货
            _info = {
                data: this.data.xianhuoData,
                key: 'xianhuoData'
            };
        } else if (type == 1) {
            // 订单
            _info = {
                data: this.data.orderData,
                key: 'orderData'
            };
        } else {
            // 到货
            _info = {
                data: this.data.goodsData,
                key: 'goodsData'
            };
        };
        return _info;
    },
    // 全选
    checkAll(e) {
        let _target = e.currentTarget.dataset,
            _info = this.defineType(_target.type);
        _info.data.map((item, index) => {
            if (index == _target.idx) {
                item.checked = !item.checked;
                let _item = _target.type == 0? item.xianhuoList : item.cartGoodsVoList;
                _item.map((child) => {
                    child.checked = item.checked;
                });
            };
        });
        this.setData({
            [_info.key]: _info.data
        });
        this.calSmallTotal(_target, _info);
    },
    // 多选
    checkItem(e) {
        let _target = e.currentTarget.dataset,
            _info = this.defineType(_target.type);
        this.filterItem(_target, _info);
    },
    filterItem(target, info) {
        let _childArr = [];
        if (target.type == 0 || target.type == 2) {
            // 现货 到货
            info.data.map((item, index) => {
                if (index == target.idx) {
                    let _item = target.type == 0? item.xianhuoList : item.cartGoodsVoList;
                    _item.map((child, childIdx, childArr) => {
                        if (childIdx == target.childidx) {
                            child.checked = !child.checked;
                        };
                        if (child.checked) {
                            _childArr.push(item);
                            if (_childArr.length == childArr.length) {
                                item.checked = 1;
                            } else {
                                item.checked = 0;
                            };
                        } else {
                            item.checked = 0;
                        };
                    });
                };
            });
        } else if (target.type == 1) {
            // 订单
            info.data.map((item, index) => {
                if (index == target.idx) {
                    item.checked = !item.checked;
                };
            });
        };
        this.setData({
            [info.key]: info.data
        });
        this.calSmallTotal(target, info);
    },
    // 现货小计
    calSmallTotal(target, info) {
        if (target.type == 0 || target.type == 2) {
            // 现货 到货
            info.data.map((item) => {
                item.smallWeight = 0;
                item.smallAmount = 0;
                item.smallPieces = 0;
                let _item = target.type == 0? item.xianhuoList : item.cartGoodsVoList;
                _item.map((child) => {
                    if (child.checked) {
                        item.smallPieces += child.pieces;
                        item.smallWeight += child.orgWeight;
                        item.smallAmount += child.orgTotalAmount;
                    };
                });
                item.smallWeight = UTIL.parseWeight(item.smallWeight);
                item.smallAmount = UTIL.parsePrice(item.smallAmount);
            });
        } else {
            // 订单
            info.data.map((item) => {
                item.smallWeight = 0;
                item.smallAmount = 0;
                item.smallPieces = 0;
                if (item.checked) {
                    item.smallPieces = 1;
                    item.smallWeight = UTIL.parseWeight(item.orderVo.orgWeight);
                    if (item.orderVo && item.freightVo) {
                        item.smallAmount = UTIL.parsePrice(item.orderVo.orgAmount + item.freightVo.orgAmount);
                    } else {
                        item.smallAmount = UTIL.parsePrice(item.orderVo.orgAmount);
                    }
                };
            });
        };
        this.setData({
            [info.key]: info.data
        });
        this.calTotal(target, info.data);
    },
    // 合计
    calTotal(target, data) {
        // 现货
        let _totalPieces = 0;
        let _totalWeight = 0;
        let _totalAmount = 0;
        if (target.type == 0) {
            data.map((item) => {
                _totalPieces += item.smallPieces;
                _totalWeight += parseFloat(item.smallWeight);
                _totalAmount += parseFloat(item.smallAmount);
            });
            this.setData({
                totalXianhuoPieces: _totalPieces,
                totalXianhuoWeight: UTIL.parseWeight(_totalWeight),
                totalXianhuoAmount: UTIL.parsePrice(_totalAmount)
            });
        } else {
            this.data.orderData.map((item) => {
                _totalPieces += item.smallPieces;
                _totalWeight += parseFloat(item.smallWeight);
                _totalAmount += parseFloat(item.smallAmount);
            });
            this.data.goodsData.map((item) => {
                _totalPieces += item.smallPieces;
                _totalWeight += parseFloat(item.smallWeight);
                _totalAmount += parseFloat(item.smallAmount);
            });
            this.setData({
                totalDingzhiPieces: _totalPieces,
                totalDingzhiWeight: UTIL.parseWeight(_totalWeight),
                totalDingzhiAmount: UTIL.parsePrice(_totalAmount)
            });
        };
    },
    // 现货
    loadXianhuo(list) {
        let _xianhuoData = list,
            _disableData = list,
            _disablePieces = 0;
        if (list.length > 0) {
            this.setData({
                hasXianhuo: 1
            });
            list.map((item) => {
                item.xianhuoList = [],
                item.disableList = [];
                item.cartGoodsVoList.map((child) => {
                    if (child.isSaled == 1) {
                        item.xianhuoList.push(child);
                        item.smallWeight = 0;
                        item.smallAmount = 0;
                        item.smallPieces = 0;
                        item.flag = 0;
                        item.checked = 0;
                        item.id = item.providerId;
                        child.checked = 0;
                        child.orgWeight = child.weight? child.weight : 0;
                        child.orgTotalAmount = child.totalAmount? child.totalAmount : 0;
                    } else {
                        item.disableList.push(child);
                    };
                    child.weight = UTIL.parseWeight(child.weight);
                    child.price = UTIL.parsePrice(child.price);
                    child.totalAmount = UTIL.parsePrice(child.totalAmount);
                });
            });
        } else {
            this.setData({
                hasXianhuo: 0
            });
        };
        _disableData.map((item) => {
            _disablePieces += item.disableList.length;
        });
        this.setData({
            xianhuoData: _xianhuoData,
            disableData: _disableData,
            disablePieces: _disablePieces
        });
    },
    // 订单
    loadOrder(list) {
        let _orderData = list;
        if (_orderData.length > 0) {
            this.setData({
                hasOrder: 1
            });
            _orderData.map((item) => {
                item.checked = 0;
                item.smallWeight = 0;
                item.smallAmount = 0;
                item.smallPieces = 0;
                if (item.shoppingCartOrderVo){
                    item.orderVo = item.shoppingCartOrderVo;
                    item.orderVo.orgWeight = item.orderVo.orderWeight? item.orderVo.orderWeight : 0;
                    item.orderVo.orgAmount = item.orderVo.goodsAmount? item.orderVo.goodsAmount : 0;
                    item.orderVo.frameOrderMonth = item.orderVo.frameOrderMonth? UTIL.formatDate.format(item.orderVo.frameOrderMonth) : '';
                    item.orderVo.orderWeight = UTIL.parseWeight(item.orderVo.orderWeight);
                    item.orderVo.frameOrderPrice = UTIL.parsePrice(item.orderVo.frameOrderPrice);
                    item.orderVo.goodsAmount = UTIL.parsePrice(item.orderVo.goodsAmount);
                };
                if (item.shoppingCartFreightVo){
                    item.freightVo = item.shoppingCartFreightVo;
                    item.freightVo.orgWeight = item.freightVo.transportWeight? item.freightVo.transportWeight : 0;
                    item.freightVo.orgAmount = item.freightVo.freightAmount? item.freightVo.freightAmount : 0;
                    item.freightVo.transportWeight = UTIL.parseWeight(item.freightVo.transportWeight);
                    item.freightVo.freightPrice = UTIL.parsePrice(item.freightVo.freightPrice);
                    item.freightVo.freightAmount = UTIL.parsePrice(item.freightVo.freightAmount);
                };
            });
        } else {
            this.setData({
                hasOrder: 0
            });
        };
        this.setData({
            orderData: _orderData
        });
    },
    // 到货
    loadGoods(list) {
        let _goodsData = list;
        if (_goodsData.length > 0) {
            this.setData({
                hasGoods: 1
            });
            _goodsData.map((item) => {
                item.flag = 0;
                item.checked = 0;
                item.smallWeight = 0;
                item.smallAmount = 0;
                item.smallPieces = 0;
                item.id = item.frameOrderCode;
                item.cartGoodsVoList.map((child) => {
                    child.checked = 0;
                    child.orgWeight = child.weight? child.weight : 0;
                    child.orgTotalAmount = child.totalAmount? child.totalAmount : 0;
                    child.weight = UTIL.parseWeight(child.weight);
                    child.price = UTIL.parsePrice(child.price);
                    child.totalAmount = UTIL.parsePrice(child.totalAmount);
                });
            });
        } else {
            this.setData({
                hasGoods: 0
            });
        };
        this.setData({
            goodsData: _goodsData
        });
    },
    loadCart() {
        APP.request('cartList').then(
            (res) => {
                let _res = res.data;
                this.loadXianhuo(_res.shoppingCartVoList);
                this.loadOrder(_res.shoppingCartCustomizeVoList);
                this.loadGoods(_res.shoppingCartCustomizeGoodVoList);
            }
        );
    },
    // 删除
    delCart() {
        let _data = this.data,
            _ids = [],
            _cartOrderIds = [];

        if (_data.tab == 0) {
            _data.xianhuoData.map((item) => {
                item.xianhuoList.map((child) => {
                    if (child.checked) {
                        _ids.push(child.id);
                    };
                });
            });
        } else {
            _data.orderData.map((item) => {
                if (item.checked) {
                    _cartOrderIds.push(item.orderVo.id);
                };
            });
            _data.goodsData.map((item) => {
                item.cartGoodsVoList.map((child) => {
                    if (child.checked) {
                        _ids.push(child.id);
                    };
                });
            });
        };
        if (!_ids.length && !_cartOrderIds.length) return;
        let _params = {};
        if (_ids.length) {
            _params.ids = _ids;
        };
        if (_cartOrderIds.length) {
            _params.cartOrderIds = _cartOrderIds.toString();
        };
        this.delCartRequest(_params);
    },
    // 清空失效
    delCartDisable() {
        let _params = {
            ids: []
        };
        this.data.disableData.map((item) => {
            item.disableList.map((child) => {
                _params.ids.push(child.id);
            });
        });
        this.delCartRequest(_params);
    },
    delCartRequest(params) {
        APP.showModal({
            showCancel: true,
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    APP.request('delCart', params).then(
                        (res) => {
                            APP.showToast({
                                icon: GLOBAL.iconDomain + 'toast-succ.png',
                                title: '删除成功',
                                duaration: 1000
                            });
                            setTimeout(() => {
                                this.loadCart();
                            }, 1100);
                        }
                    );
                };
            }
        });
    },
    // 去商城
    goMall() {
        // 暂时改为查看更多页面
        wx.switchTab({
            url: '/pages/mall/more'
        });
    },
    // 去结算
    goSettle(e) {
        let _data = this.data,
            _settleType = e.currentTarget.dataset.settle,
            _type = e.currentTarget.dataset.type,
            _ids = [],
            _cartOrderIds = '',
            _providerName = '';

        if (_settleType == 10) {
            // 现货10
            _data.xianhuoData.map((item) => {
                _providerName = item.providerName;
                item.xianhuoList.map((child) => {
                    if (child.checked) {
                        _ids.push(child.id);
                    };
                });
            });
        } else if (_settleType == 20 || _settleType == 40) {
            // 订单 有运单40 没运单20
            _data.orderData.map((item) => {
                if (item.checked) {
                    _providerName = item.orderVo.providerName;
                    _cartOrderIds = item.orderVo.id;
                };
            });
        } else {
            // 到货30
            _data.goodsData.map((item) => {
                _providerName = item.providerName;
                item.cartGoodsVoList.map((child) => {
                    if (child.checked) {
                        _ids.push(child.id);
                    };
                });
            });
        };
        if (!_ids.length && !_cartOrderIds) return; 
        APP.isAuth().then((val) => {
            if (!val) return;
            if (_ids.length) {
                wx.navigateTo({
                    url: '/pages/cart/settle-1?settleType=' + _settleType + '&type=' + _type + '&provider=' + _providerName + '&ids=' + _ids.toString()
                });
            };
            if (_cartOrderIds) {
                wx.navigateTo({
                    url: '/pages/cart/settle-1?settleType=' + _settleType + '&type=' + _type + '&provider=' + _providerName + '&cartOrderIds=' + _cartOrderIds
                });
            };
        });
    },
    onShow() {
        if (APP.globalData.token) {
            this.setData({
                isLogin: 1
            });
        };
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - 45) + 'px'
        });
        this.setData({
            tab: 0,
            xianhuoData: [], // 现货
            disableData: [], // 失效
            orderData: [], // 订单
            goodsData: [], // 到货
            disablePieces: 0,
            totalXianhuoPieces: 0,
            totalXianhuoWeight: 0,
            totalXianhuoAmount: 0,
            totalDingzhiPieces: 0,
            totalDingzhiWeight: 0,
            totalDingzhiAmount: 0
        });
        this.loadCart();
        wx.removeStorageSync('xianhuoObj');
        wx.removeStorageSync('orderObj');
        wx.removeStorageSync('goodsObj');
        wx.removeStorageSync('freightVo');
    }
});
