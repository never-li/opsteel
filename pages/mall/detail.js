const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        imgDomain: GLOBAL.imgDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH: 0,
        type: null,
        url: '',
        params: {},
        dt: {},
        availableVal: 0,
        val: null,
        isMinusDisable: false,
        isAddDisable: true,
        cartWeight: 0, // 购物车某捆包重量
        cartPieces: 0, // 购物车某捆包件数
        cartList: [], // 购物车列表
        btnAddCart: '' // 按钮
    },
    inputVal(e) {
        this.setData({
            val: e.detail.value
        });
    },
    // 加减
    changeVal(e) {
        let _data = this.data,
            _availableVal = _data.dt.saleMethod == 10? _data.dt.pieces - _data.cartPieces : UTIL.parseWeight(_data.dt.weight - _data.cartWeight),
            _val = _data.dt.saleMethod == 10? _data.val : parseFloat(_data.val);
        if (e.currentTarget.dataset.type == 'minus' && _availableVal > 0) {
            if (Math.floor(_val) >= 1) {
                _val--;
                if (_val <= 0) {
                    this.setData({
                        isMinusDisable: true
                    });
                } else {
                    this.setData({
                        isMinusDisable: false
                    });
                };
            } else {
                this.setData({
                    isMinusDisable: true
                });
            };
            this.setData({
                isAddDisable: false
            });
        } else if (e.currentTarget.dataset.type == 'add' && _availableVal > 0) {
            if (Math.ceil(_val) < Math.ceil(_availableVal)) {
                _val++;
                this.setData({
                    isAddDisable: false
                });
            } else {
                this.setData({
                    isAddDisable: true
                });
            };
            this.setData({
                isMinusDisable: false
            });
        } else {
            this.setData({
                isMinusDisable: true,
                isAddDisable: true
            });
        };
        this.setData({
            val: _val
        });
    },
    // 购物车接口
    loadCart(type) {
        if (type == 0) {
            APP.request('cartList').then(
                (res) => {
                    let _res = res.data;
                    if (_res.shoppingCartVoList.length > 0) {
                        let _cartList = [];
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
                        this.setData({
                            cartList: _cartList
                        });
                        this.setCartInfo(_cartList);
                    } else {
                        this.setOrgInfo(this.data.dt);
                    };
                }
            );
        } else if (type == 2) {
            this.setOrgInfo(this.data.dt);
        };
    },
    // 购物车对应捆包详情
    setCartInfo(cartList) {
        let _dt = this.data.dt;
        const CART = cartList.find((cart) => {
            if (cart.packCode == _dt.packCode) return cart;
        });
        if (CART) {
            if (_dt.goodsType == 20) {
                this.setData({
                    cartWeight: CART.weight, // 购物车某捆包重量
                    cartPieces: CART.pieces, // 购物车某捆包件数
                    availableVal: _dt.saleMethod == 10? (_dt.pieces - CART.pieces) : UTIL.parseWeight(_dt.weight - CART.weight),
                    val: _dt.saleMethod == 10? (_dt.pieces - CART.pieces) : UTIL.parseWeight(_dt.weight - CART.weight)
                });
                if (!_dt.isAddCart || (_dt.isAddCart && ((_dt.pieces > CART.pieces && _dt.saleMethod == 10) || (UTIL.parseWeight(_dt.weight - CART.weight) && _dt.saleMethod == 20)))) {
                    this.setData({
                        btnAddCart: '购买'
                    });
                } else {
                    this.setData({
                        btnAddCart: '已加入购物车',
                        isMinusDisable: true,
                        isAddDisable: true
                    });
                };
            } else {
                if (!_dt.isAddCart) {
                    this.setData({
                        btnAddCart: '购买'
                    });
                } else {
                    this.setData({
                        btnAddCart: '已加入购物车'
                    });
                };
            };
        } else {
            this.setOrgInfo(_dt);
        };
    },
    // 购物车设置初始值
    setOrgInfo(dt) {
        if (this.data.type == 0) {
            if (dt.goodsType == 20) {
                // 虚捆包
                this.setData({
                    availableVal: dt.saleMethod == 10? dt.pieces : dt.weight,
                    val: dt.saleMethod == 10? dt.pieces : dt.weight
                });
            };
            this.setData({
                btnAddCart: dt.shieldStatus >= 40? '线下购' : '购买'
            });
        } else {
            this.setData({
                btnAddCart: dt.isAddShoppingStatus? '已加入购物车' : '挑选'
            });
        };
    },
    addCart() {
        APP.isAuth().then((val) => {
            if (!val) return;
            let _dt = this.data.dt,
                _data = this.data
            if (_data.type == 0) {
                if (_dt.goodsType == 10) {
                    if (_dt.position == 30 || _dt.shieldStatus >= 40 || _dt.isAddCart) return;
                } else {
                    if (_dt.position == 30 || _dt.shieldStatus >= 40 || _data.val <= 0) return;
                };
                if (_data.val > _data.availableVal) {
                    APP.showToast({
                        title: '可供量不足'
                    });
                    return;
                };
            } else {
                if (_dt.isAddShoppingStatus) return;
            };
            this.addCartReq(_data.type, _dt);
        });
    },
    addCartReq(type, dt) {
        let _data = this.data,
            _url = type == 0? 'addCartXianhuo' : 'addCartGoods',
            params = {};
        if (type == 0) {
            // 现货
            params.packId = dt.id;
            if (dt.goodsType == 20) {
                if (dt.saleMethod == 10) {
                    params.pieces = _data.val;
                } else if (dt.saleMethod == 20) {
                    params.weight = UTIL.parseWeight(_data.val);
                };
            };
        } else {
            // 到货
            params.goodsIds = new Array(dt.goodsId);
        };
        APP.request(_url, params).then(
            (res) => {
                APP.showToast({
                    icon: GLOBAL.iconDomain + 'toast-succ.png',
                    title: '加入购物车成功',
                    duaration: 1000
                });
                let cartDt = {};
                cartDt.packCode = dt.packCode;
                if (type == 0) {
                    if (dt.goodsType == 20 && _data.val < _data.availableVal) {
                        cartDt.isCartAdded = 0;
                        cartDt.isPackAdded = 2;
                        cartDt.btnAddCart = '继续购买';
                        wx.setStorageSync('cartDt', cartDt);
                    } else if (dt.goodsType == 20 && _data.val >= _data.availableVal) {
                        cartDt.isCartAdded = 0;
                        cartDt.isPackAdded = 1;
                        cartDt.btnAddCart = '已加入购物车';
                        wx.setStorageSync('cartDt', cartDt);
                    } else {
                        cartDt.isCartAdded = 1;
                        cartDt.isPackAdded = 0;
                        cartDt.btnAddCart = '已加入购物车';
                        wx.setStorageSync('cartDt', cartDt);
                    };
                } else {
                    cartDt.isAddShoppingStatus = 1;
                    cartDt.btnAddCart = '已加入购物车';
                    wx.setStorageSync('cartDt', cartDt);
                };
                setTimeout(() => {
                    this.loadDetail();
                }, 1100);
            }
        );
    },
    // 预览
    previewImage(e) {
        let _urlStr = e.currentTarget.dataset.url,
            _url = [],
            _data = this.data;
        if (_data.type == 0) {
            if (_data.dt.column2 && _data.dt.hasImg) {
                _url = _data.dt.column2;
            } else if (!_data.dt.hasImg && _data.dt.productTypeCode) {
                _url.push(_urlStr);
            };
        } else {
            _url.push(_urlStr);
        };
        wx.previewImage({
            current: _urlStr,
            urls: _url
        });
    },
    loadDetail() {
        APP.request(this.data.url, this.data.params).then(
            (res) => {
                let _dt = '';
                if (this.data.type == 0) {
                    // 现货
                    _dt = res.data.packagesVo;
                    _dt.column2 = _dt.column2? _dt.column2.split(',') : '';
                    _dt.price = UTIL.parsePrice(_dt.price);
                    _dt.weight = UTIL.parseWeight(_dt.weight);
                    _dt.uploadTime = _dt.uploadTime? UTIL.formatDate.format(_dt.uploadTime) : '—';
                    _dt.inDate = _dt.inDate? UTIL.formatDate.format(_dt.inDate) : '—';
                    _dt.outDate = _dt.outDate? UTIL.formatDate.format(_dt.outDate) : '—';
                } else {
                    // 到货
                    _dt = res.data.goodsData;
                    _dt.goodsId = res.data.goodsId;
                    _dt.price = _dt.salePrice? UTIL.parsePrice(_dt.salePrice) : _dt.basePrice? UTIL.parsePrice(_dt.basePrice) : 0;
                    _dt.weight = UTIL.parseWeight(_dt.weight);
                    _dt.subWarehouseName = _dt.location? _dt.location : '';
                    _dt.uploadTime = _dt.uploadTime? UTIL.formatDate.format(_dt.uploadTime) : '—';
                    _dt.inDate = _dt.inDate? UTIL.formatDate.format(_dt.inDate) : '—';
                    _dt.outDate = _dt.outFromSteelDate? UTIL.formatDate.format(_dt.outFromSteelDate) : '—';
                    _dt.storageLocation = _dt.location? _dt.location : '—';
                    _dt.packMethod = _dt.packingMethod? _dt.packingMethod : '—';
                    _dt.primer = _dt.topcoatKind? _dt.topcoatKind : '—';
                    _dt.coating = _dt.coatingType? _dt.coatingType : '—';
                };
                this.setData({
                    dt: _dt
                });
                if (APP.globalData.token) {
                    this.loadCart(this.data.type);
                } else {
                    this.setData({
                        btnAddCart: '购买'
                    });
                };
            }
        );
    },
    onLoad(opts) {
        this.setData({
            type: opts.type,
            url: opts.type == 0? 'getXianhuoDetail' : 'getGoodsDetail',
            'params.goodsId': opts.goodsid
        });
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight) + 'px'
        });
        this.loadDetail();
    }
});
