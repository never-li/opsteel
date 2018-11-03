const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        isLogin: 0,
        iconDomain: GLOBAL.iconDomain,
        imgDomain: GLOBAL.imgDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        xianhuoData: [], // 现货
        orderData: [], // 定制订单
        goodsData: [], // 定制到货
        cartList: [], // 购物车
    },
    // 现货
    loadXianhuo() {
        let params = {
            page: 1,
            pageSize: 10,
            idType: '1,2'
        };
        APP.request('getXianhuoList', params).then(
            (res) => {
                let _xianhuoData = res.data.items;
                _xianhuoData.map((item, index, thisArr) => {
                    item.isCartAdded = 0; // 是否加入购物车
                    item.isPackAdded = 0; // 判断捆包 1已买完 2继续购买
                    item.btnAddCart = '购买'; // 按钮控制
                    item.price = UTIL.parsePrice(item.price);
                    item.weight = UTIL.parseWeight(item.weight);
                    item.column2 = item.column2? item.column2.split(',')[0] : '';
                    if (this.data.cartList.length > 0) {
                        this.data.cartList.map((cart) => {
                            if (cart.packageId == item.tagId && cart.packCode == item.pack_code) {
                                if (item.goods_type == 10) {
                                    item.isCartAdded = 1;
                                } else if (item.goods_type == 20) {
                                    if ((item.sale_method == 10 && item.pieces > cart.pieces) || (item.sale_method == 20 && item.weight > UTIL.parseWeight(cart.weight))) {
                                        // sale_method 虚捆包 10按件数 20按重量
                                        item.isPackAdded = 2;
                                    } else {
                                        // 虚捆包 已卖完
                                        item.isPackAdded = 1;
                                    };
                                };
                            };
                        });
                    };
                    if (item.shield_status >= 40) {
                        item.btnAddCart = '线下购';
                    } else if (item.isCartAdded || item.isPackAdded == 1) {
                        item.btnAddCart = '已加入购物车';
                    } else if (item.isPackAdded == 2) {
                        item.btnAddCart = '继续购买';
                    };
                    if (index > 1) {
                        thisArr.splice(index);
                    };
                });
                this.setData({
                    xianhuoData: _xianhuoData
                });
            }
        );
    },
    // 订单
    loadOrder() {
        let params = {
            page: 1,
            pageSize: 10
        };
        APP.request('getOrderList', params).then(
            (res) => {
                let _orderData = res.data.items.recordList;
                _orderData.map((item, index, thisArr) => {
                    item.minPrice = UTIL.parsePrice(item.minPrice);
                    item.purchasePrice = UTIL.parsePrice(item.purchasePrice);
                    item.freightPrice = UTIL.parsePrice(item.freightPrice);
                    item.totalWeight = UTIL.parseWeight(item.totalWeight);
                    item.deliveryMonth = item.deliveryMonth? UTIL.formatDate.format(item.deliveryMonth) : '';
                    item.btnAddCart = item.isAddShoppingStatus? '已加入购物车' : '预定';
                    if (index > 1) {
                        thisArr.splice(index);
                    };
                });
                this.setData({
                    orderData: _orderData
                });
            }
        );
    },
    // 到货
    loadGoods() {
        let params = {
            page: 1,
            pageSize: 10
        };
        APP.request('getGoodsList', params).then(
            (res) => {
                let _goodsData = res.data.items.recordList;
                _goodsData.map((item, index, thisArr) => {
                    item.salePrice = UTIL.parsePrice(item.salePrice);
                    item.weight = UTIL.parseWeight(item.weight);
                    item.btnAddCart = item.isAddShoppingStatus? '已加入购物车' : '挑选';
                    if (index > 1) {
                        thisArr.splice(index);
                    };
                });
                this.setData({
                    goodsData: _goodsData
                });
            }
        );
    },
    // 加入购物车
    addCart(e) {
        // id_type 1是现货，2是今日报价，3是自有资源
        // goods_type 捆包类型：10 实捆包、 20 虚捆包
        // resource_type >100 定制 <100 现货
        // position 30竞价
        // isCartAdded 已加入购物车
        // isPackAdded 捆包加入购物车
        // shield_status 40 50线下购

        APP.isAuth().then((val) => {
            if (!val) return;
            let _data = this.data,
                _target = e.currentTarget.dataset,
                _item = _target.item,
                _url = _target.type == 0? 'addCartXianhuo' : _target.type == 1? 'addCartOrder' : 'addCartGoods',
                params = {};
            if (_target.type == 0) {
                // 现货
                if (_item.position == 30 || _item.shield_status >= 40 || _item.isCartAdded || _item.isPackAdded == 1) return;
                if (_item.goods_type == 10) {
                    // 实捆包
                    params.packId = _item.tagId;
                } else {
                    // 虚捆包
                    wx.navigateTo({
                        url: '/pages/mall/detail?goodsid=' + _item.goods_id + '&type=' + _target.type
                    });
                    return;
                };
            } else if (_target.type == 1) {
                // 订单
                if (_item.isAddShoppingStatus) return;
                params.serialCode = _item.serialCode;
                params.frameOrderCode = _item.frameOrderCode;
            } else if (_target.type == 2) {
                // 到货
                if (_item.isAddShoppingStatus) return;
                params.goodsIds = new Array(_item.goodsId);
            };
            APP.request(_url, params).then(
                (res) => {
                    APP.showToast({
                        icon: GLOBAL.iconDomain + 'toast-succ.png',
                        title: '加入购物车成功',
                        duaration: 1000
                    });
                    if (_target.type == 0) {
                        _data.xianhuoData.map((item) => {
                            if (item.tagId == _item.tagId) {
                                item.isCartAdded = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        });
                        this.setData({
                            xianhuoData: _data.xianhuoData
                        });
                    } else if (_target.type == 1) {
                        _data.orderData.map((item) => {
                            if (item.serialCode == _item.serialCode) {
                                item.isAddShoppingStatus = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        });
                        this.setData({
                            orderData: _data.orderData
                        });
                    } else {
                        _data.goodsData.map((item) => {
                            if (item.goodsId == _item.goodsId) {
                                item.isAddShoppingStatus = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        });
                        this.setData({
                            goodsData: _data.goodsData
                        });
                    };
                }
            );
        });
    },
    // 购物车接口
    loadCart() {
        if (APP.globalData.token) {
            APP.request('cartList').then(
                (res) => {
                    let _res = res.data,
                        _cartList = [];
                    if (_res.shoppingCartVoList.length > 0) {
                        _res.shoppingCartVoList.map((item) => {
                            item.cartGoodsVoList.map((child) => {
                                let _obj = {};
                                _obj.packageId = child.packageId;
                                _obj.packCode = child.packCode;
                                _obj.weight = child.weight;
                                _obj.pieces = child.pieces;
                                _cartList.push(_obj);
                            });
                        });
                    };
                    this.setData({
                        cartList: _cartList
                    });
                }
            );
            this.loadOrder();
            this.loadGoods();
        };
        this.loadXianhuo();
    },
    // 去搜索
    goSearch() {
        wx.navigateTo({
            url: '/pages/mall/search'
        });
    },
    // 查看更多
    goMore(e) {
        let _type = e.currentTarget.dataset.type,
            _title = '';
        if (_type == 0) {
            _title = '现货资源';
        } else if (_type == 1) {
            _title = '定制订单';
        } else if (_type == 2) {
            _title = '定制到货';
        } else {
            return;
        };
        wx.navigateTo({
            url: '/pages/mall/more?type=' + _type + '&title=' + _title
        });
    },
    goDetail(e) {
        let _target = e.currentTarget.dataset;
        if (_target.type == 0 && _target.idtype == 2) return;
        wx.navigateTo({
            url: '/pages/mall/detail?goodsid=' + _target.goodsid + '&type=' + _target.type
        });
    },
    goScan() {
        APP.goScan();
    },
    onShow() {
        if (APP.globalData.token) {
            this.setData({
                isLogin: 1
            });
        };
        this.loadCart();
        if (wx.getStorageSync('cartDt')) {
            wx.removeStorageSync('cartDt');
        };
    }
});
