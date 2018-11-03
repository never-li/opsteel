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
        type: null,
        tab: '', // 排序
        num: '',
        isSecondUp: 0, // 升序/降序
        secondVal: null,
        isThirdUp: 0, // 升序/降序
        thirdVal: null,
        tData: [], // 品种 临时
        sTData: [], // 小品种 临时
        oWData: [], // 产地有重量 临时
        sData: [], // 存放地有重量 临时
        keyWords: '', // 搜索关键词
        // ====== 筛选组件内容
        showInput: 0,
        inputTitle: '品种/牌号/产地/存放地/规格/供应商/捆包号',
        inputValue: '', // 搜索关键词
        showSideBar: 0, // 筛选
        showSmallType: 0, // 小品种 -- 现货
        smallTypeData: [], // 小品种
        checkedSmallTypeData: [], // 小品种
        showDeliveryMonth: 0, // 交货月 -- 订单 到货
        deliveryMonthData: [], // 交货月
        checkedDeliveryMonthData: [], // 交货月
        showDeliveryPlace: 0, // 交货地 -- 订单
        deliveryPlaceData: [], // 交货地
        checkedDeliveryPlaceData: [], // 交货地
        showOrderNo: 0, // 订单号 -- 到货
        orderNoData: [], // 订单号
        checkedOrderNoData: [], // 订单号
        showType: 0, // 品种 -- 到货
        typeData: [], // 品种
        checkedTypeData: [], // 品种
        showSpec: 0, // 规格 复选框 -- 到货
        specData: [], // 规格 复选框
        checkedSpecData: [], // 规格 复选框
        showShopSign: 0, // 牌号 -- 现货 到货
        shopSignData: [], // 牌号
        checkedShopSignData: [], // 牌号
        showOriginWeight: 0, // 产地有重量 -- 现货 到货
        originWeightData: [], // 产地有重量
        checkedOriginWeightData: [], // 产地有重量
        showStorage: 0, // 存放地 -- 现货 到货
        storageData: [], // 存放地
        checkedStorageData: [], // 存放地
        showService: 0, // 服务承诺 -- 现货
        showSpecInput: 0, // 规格 输入框 -- 现货
        showOthers: 0, // 其他 -- 现货
        showProvider: 0, // 供应商 -- 订单
        providerData: [], // 供应商
        checkedProviderData: [], // 供应商
        showPayType: 0, // 付款性质 -- 订单
        showFunder: 0, // 出资方 -- 订单
        funderData: [], // 出资方
        dataList: [],
        filterDt: {},
        totalCount: 0, // 总条数
        totalWeight: 0, // 总重量
        scrollH: 0, // scroll-view高度
        noMore: 0, // 加载更多
        page: 0, // 第几页
        totalPage: 1, // 总页数
        cartList: [], // 购物车信息
    },
    // 排序
    changeRank(e) {
        let _tab = e.currentTarget.dataset.tab,
            _num = e.currentTarget.dataset.num;

        if (_tab == this.data.tab && _tab == '') return;
        if (_tab == this.data.tab && _num == 2) {
            this.setData({
                isSecondUp: !this.data.isSecondUp,
                secondVal: !this.data.secondVal
            });
        } else {
            this.setData({
                isSecondUp: 0,
                secondVal: 0
            });
        };
        if (_tab == this.data.tab && _num == 3) {
            this.setData({
                isThirdUp: !this.data.isThirdUp,
                thirdVal: !this.data.thirdVal
            });
        } else if (_tab != this.data.tab) {
            this.setData({
                isThirdUp: 0,
                thirdVal: 0
            });
        };
        this.setData({
            tab: _tab,
            num: _num
        });
        this.resetData();
        this.loadPage();
    },
    resetData() {
        this.setData({
            dataList: [],
            noMore: 0,
            page: 0,
            totalPage: 1,
            totalCount: 0,
            totalWeight: 0
        });
    },
    // 筛选
    showSideBar() {
        this.setData({
            showSideBar: 1
        });
    },
    // 确定搜索
    confirmSideBar(e) {
        this.resetData();
        this.setData({
            filterDt: e.detail
        });
        this.loadPage();
    },
    // 重置
    resetSideBar() {
        this.setData({
            inputValue: ''
        });
    },
    inputChange(e) {
        this.setData({
            inputValue: e.detail
        });
    },
    // 分页
    loadPage() {
        this.data.page++;
        if (this.data.page > this.data.totalPage) {
            this.setData({
                noMore: 1
            });
            return;
        };
        let params = {
                page: this.data.page,
                pageSize: 10,
                idType: '1,2' // 1现货，2今日报价，3自有资源
            },
            _url = this.data.type == 0? 'getXianhuoList' : this.data.type == 1? 'getOrderList' : 'getGoodsList',
            _this = this,
            _data = this.data;
        
        params.orderValue = _data.type == 0? 0 : 'DESC';
        if (_data.tab) {
            if (_data.tab == 'price' || _data.tab == 'upload_time') {
                _data.secondVal = _data.secondVal? 1 : 0;
                _data.thirdVal = _data.thirdVal? 1 : 0;
            } else {
                _data.secondVal = _data.secondVal? 'ASC' : 'DESC';
                _data.thirdVal = _data.thirdVal? 'ASC' : 'DESC';
            };
            params.field = _data.tab;
            params.orderValue = _data.num == 2? _data.secondVal : _data.num == 3? _data.thirdVal : params.orderValue;
            _data.secondVal = _data.secondVal == 'ASC'? 1 : _data.secondVal == 'DESC'? 0 : _data.secondVal;
            _data.thirdVal = _data.thirdVal == 'ASC'? 1 : _data.thirdVal == 'DESC'? 0 : _data.thirdVal;
        };
        // 暂时屏蔽
        // if (_data.keyWords) {
        //     params.keyWords = _data.keyWords
        // };
        if (_data.inputValue) {
            params.keyWords = _data.inputValue;
        };
        // === 侧边栏参数
        // console.log(_data.filterDt);
        if (Object.keys(_data.filterDt).length > 0) {
            let _dt = _data.filterDt;
            if (_dt.inputValue) {
                params.keyWords = _dt.inputValue;
            };
            if (_dt.checkedSmallType) {
                params.product = _dt.checkedSmallType;
            };
            if (_dt.checkedShopSign) {
                params.shopSign = _dt.checkedShopSign;
            };
            if (_dt.checkedOriginWeight) {
                params.producingArea = _dt.checkedOriginWeight;
            };
            if (_dt.checkedStorage) {
                params.storagePlace = _dt.checkedStorage;
            };
            if (_dt.checkedService) {
                let _shieldStatus = [];
                _dt.checkedService.map((item) => {
                    if (item == '10' || item == '20' || item == '30' || item == '40,50') {
                        _shieldStatus.push(item);
                        let _str = _shieldStatus.join(',');
                        params.shieldStatus = _str;
                    };
                    if (item == 'bargainedPrice') {
                        params.bargainedPrice = 1;
                    };
                    if (item == 'hasBook') {
                        params.hasBook = 1;
                    };
                    if (item == 'hasImg') {
                        params.hasImg = 1;
                    };
                    if (item == 'isAfterSettle') {
                        params.isAfterSettle = 1;
                    };
                    if (item == 'businessType') {
                        params.businessType = 30;
                    };
                });
            };
            if (_dt.thickMin) {
                params.thickMin = _dt.thickMin;
            };
            if (_dt.thickMax) {
                params.thickMax = _dt.thickMax;
            };
            if (_dt.widthMin) {
                params.widthMin = _dt.widthMin;
            };
            if (_dt.widthMax) {
                params.widthMax = _dt.widthMax;
            };
            if (_dt.lengthMin) {
                params.lengthMin = _dt.lengthMin;
            };
            if (_dt.lengthMax) {
                params.lengthMax = _dt.lengthMax;
            };
            if (_dt.weightMin) {
                params.weightMin = _dt.weightMin;
            };
            if (_dt.weightMax) {
                params.weightMax = _dt.weightMax;
            };
            if (_dt.providerName) {
                params.providerName = _dt.providerName;
            };
            if (_dt.packCode) {
                params.packCode = _dt.packCode;
            };
            if (_dt.maHandCodes) {
                params.maHandCodes = _dt.maHandCodes;
            };
            if (_dt.checkedDeliveryMonth) {
                params.deliveryMonth = _dt.checkedDeliveryMonth;
            };
            if (_dt.checkedDeliveryPlace) {
                params.providerStoragePlace = _dt.checkedDeliveryPlace;
            };
            if (_dt.checkedProvider) {
                params.providerName = _dt.checkedProvider;
            };
            if (_dt.checkedPayType) {
                params.contractNatures = _dt.checkedPayType;
            };
            if (_dt.checkedOrderNo) {
                params.orderCode = _dt.checkedOrderNo;
            };
            if (_dt.checkedSpec) {
                params.specLists = _dt.checkedSpec;
            };
            if (_dt.checkedType) {
                params.productType = _dt.checkedType;
            };
        };
        
        APP.request(_url, params).then(
            (res) => {
                let _res = res.data,
                    _itemList = [];
                
                _itemList = _data.type == 0? _res.items : _res.items.recordList;
                if (Object.keys(_itemList).length > 0) {
                    let _dataList = _data.dataList,
                        _filterList = _res.facet,
                        _shopSignData = [],
                        _smallTypeData = [],
                        _originWeightData = [],
                        _storageData = [],
                        _deliveryMonthData = [],
                        _orderNoData = [],
                        _typeData = [],
                        _specData = [],
                        _deliveryPlaceData = [],
                        _providerData = [],
                        _totalWeight = 0;
                        
                    if (_data.type == 0) {
                        // === 现货
                        _itemList.map((item) => {
                            item.isCartAdded = 0; // 是否加入购物车
                            item.isPackAdded = 0; // 判断捆包 1已买完 2继续购买
                            item.btnAddCart = '购买'; // 按钮控制
                            item.price = UTIL.parsePrice(item.price);
                            item.weight = UTIL.parseWeight(item.weight);
                            item.column2 = item.column2? item.column2.split(',')[0] : '';
                            if (_data.cartList.length > 0) {
                                _data.cartList.map((cart) => {
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
                                    }
                                });
                            };
                            if (item.shield_status >= 40) {
                                item.btnAddCart = '线下购';
                            } else if (item.isCartAdded || item.isPackAdded == 1) {
                                item.btnAddCart = '已加入购物车';
                            } else if (item.isPackAdded == 2) {
                                item.btnAddCart = '继续购买';
                            };
                        });
                        // 筛选
                        _filterList.map((item) => {
                            let _key = item.key,
                                _items = item.items;

                            // 牌号
                            if (_key == 'shop_sign' && Object.keys(_items).length > 0) {
                                _items.map((child) => {
                                    let _obj = {};
                                    _obj.code = _obj.name = child.name;
                                    _shopSignData.push(_obj);
                                });
                            };
                            // 小品种
                            if (_key == 'product_code' && Object.keys(_items).length > 0) {
                                _items.map((child) => {
                                    _smallTypeData.push(child);
                                });
                            };
                            // 产地
                            if (_key == 'producing_code' && Object.keys(_items).length > 0) {
                                _items.map((child) => {
                                    _originWeightData.push(child);
                                });
                            };
                            // 存放地
                            if (_key == 'storage_place_code' && Object.keys(_items).length > 0) {
                                _items.map((child) => {
                                    _storageData.push(child);
                                });
                            };
                            if (_key == 'app_id' && Object.keys(_items).length > 0) {
                                _items.map((child) => {
                                    _totalWeight = UTIL.parseWeight(child.value);
                                });
                            };
                        });
                        // 小品种
                        let _tempSmallTypeData = [];
                        if (Object.keys(_smallTypeData).length > 0 && Object.keys(_data.sTData).length > 0) {
                            _data.sTData.map((item) => {
                                _smallTypeData.map((child) => {
                                    if (item.code == child.name) {
                                        let _obj = {};
                                        _obj.name = item.name;
                                        _obj.code = item.code;
                                        _tempSmallTypeData.push(_obj);
                                    };
                                });
                            });
                        };
                        // 产地
                        let _tempOriginWeightData = [];
                        if (Object.keys(_originWeightData).length > 0 && Object.keys(_data.oWData).length > 0) {
                            _data.oWData.map((item) => {
                                _originWeightData.map((child) => {
                                    if (item.code == child.name) {
                                        let _obj = {};
                                        _obj.name = item.name;
                                        _obj.code = item.code;
                                        _obj.weight = Math.floor(child.value);
                                        _tempOriginWeightData.push(_obj);
                                    };
                                });
                            });
                        };
                        // 存放地
                        let _tempStorageData = [];
                        if (Object.keys(_storageData).length > 0 && Object.keys(_data.sData).length > 0) {
                            _data.sData.map((item) => {
                                _storageData.map((child) => {
                                    if (item.code == child.name) {
                                        let _obj = {};
                                        _obj.name = item.name;
                                        _obj.code = item.code;
                                        _obj.weight = Math.floor(child.value);
                                        _tempStorageData.push(_obj);
                                    };
                                });
                            });
                        };
                        
                        _this.setData({
                            shopSignData: _shopSignData,
                            smallTypeData: _tempSmallTypeData,
                            originWeightData: _tempOriginWeightData,
                            storageData: _tempStorageData,
                            totalCount: _res.total,
                            totalWeight: _totalWeight,
                            totalPage: Math.ceil(_res.total / params.pageSize)
                        });
                    } else if (_data.type == 1) {
                        // === 订单
                        _itemList.map((item) => {
                            item.minPrice = UTIL.parsePrice(item.minPrice);
                            item.purchasePrice = UTIL.parsePrice(item.purchasePrice);
                            item.freightPrice = UTIL.parsePrice(item.freightPrice);
                            item.totalWeight = UTIL.parseWeight(item.totalWeight);
                            item.deliveryMonth = item.deliveryMonth? UTIL.formatDate.format(item.deliveryMonth) : '';
                            item.btnAddCart = item.isAddShoppingStatus? '已加入购物车' : '预定';
                        });
                        // 交货月
                        if (Object.keys(_filterList.deliveryMonths).length > 0) {
                            _filterList.deliveryMonths.map((item) => {
                                if (item.name) {
                                    let _obj = {};
                                    _obj.code = _obj.name = item.name;
                                    _deliveryMonthData.push(_obj);
                                };
                            });
                        };
                        // 交货地
                        if (Object.keys(_filterList.deliveryAddressNames).length > 0) {
                            _filterList.deliveryAddressNames.map((item) => {
                                if (item.name) {
                                    let _obj = {};
                                    _obj.code = _obj.name = item.name;
                                    _deliveryPlaceData.push(_obj);
                                };
                            });
                        };
                        // 供应商	
                        if (Object.keys(_filterList.providers).length > 0) {
                            _filterList.providers.map((item) => {
                                if (item.name) {
                                    let _obj = {};
                                    _obj.code = item.code;
                                    _obj.name = item.name;
                                    _providerData.push(_obj);
                                };
                            });
                        };
                        _this.setData({
                            deliveryMonthData: _deliveryMonthData,
                            deliveryPlaceData: _deliveryPlaceData,
                            providerData: _providerData,
                            totalCount: _res.items.totalCount,
                            totalWeight: UTIL.parseWeight(_res.items.totalWeight),
                            totalPage: _res.items.totalPage
                        });
                    } else {
                        // === 到货
                        _itemList.map((item) => {
                            item.salePrice = UTIL.parsePrice(item.salePrice);
                            item.weight = UTIL.parseWeight(item.weight);
                            item.btnAddCart = item.isAddShoppingStatus? '已加入购物车' : '挑选';
                        });
                        // 交货月
                        if (Object.keys(_filterList.deliveryMonth).length > 0) {
                            _filterList.deliveryMonth.map((item) => {
                                if (item.name) {
                                    let _obj = {};
                                    _obj.code = _obj.name = item.name;
                                    _deliveryMonthData.push(_obj);
                                };
                            });
                        };
                        // 订单号
                        if (Object.keys(_filterList.saleSerialCode).length > 0) {
                            _filterList.saleSerialCode.map((item) => {
                                let _obj = {};
                                _obj.code = _obj.name = item.name;
                                _orderNoData.push(_obj);
                            });
                        };
                        // 品种
                        if (Object.keys(_filterList.product).length > 0) {
                            _filterList.product.map((item) => {
                                let _obj = {};
                                _obj.code = _obj.name = item.name;
                                _typeData.push(_obj);
                            });
                        };
                        // 规格
                        if (Object.keys(_filterList.spec).length > 0) {
                            _filterList.spec.map((item) => {
                                if (item.name) {
                                    let _obj = {};
                                    _obj.code = _obj.name = item.name;
                                    _specData.push(_obj);
                                };
                            });
                        };
                        // 牌号
                        if (Object.keys(_filterList.shopSign).length > 0) {
                            _filterList.shopSign.map((item) => {
                                let _obj = {};
                                _obj.code = _obj.name = item.name;
                                _shopSignData.push(_obj);
                            });
                        };
                        // 产地
                        if (Object.keys(_filterList.producingName).length > 0) {
                            _filterList.producingName.map((item) => {
                                let _obj = {};
                                _obj.code = _obj.name = item.name;
                                _obj.weight = Math.floor(item.weight);
                                _originWeightData.push(_obj);
                            });
                        };
                        // 存放地
                        if (Object.keys(_filterList.storagePlace).length > 0) {
                            _filterList.storagePlace.map((item) => {
                                let _obj = {};
                                _obj.code = _obj.name = item.name;
                                _obj.weight = Math.floor(item.weight);
                                _storageData.push(_obj);
                            });
                        };

                        _this.setData({
                            deliveryMonthData: _deliveryMonthData,
                            orderNoData: _orderNoData,
                            typeData: _typeData,
                            specData: _specData,
                            shopSignData: _shopSignData,
                            originWeightData: _originWeightData,
                            storageData: _storageData,
                            totalCount: _res.items.totalCount,
                            totalWeight: UTIL.parseWeight(_res.items.totalWeight),
                            totalPage: _res.items.totalPage
                        });
                    };
                    
                    _dataList.push.apply(_dataList, _itemList);
                    _this.setData({
                        dataList: _dataList
                    });
                    if (_data.totalPage <= 1 || _itemList.length < 10) {
                        _this.setData({
                            noMore: 1
                        });
                        return;
                    } else {
                        _this.setData({
                            noMore: 0
                        });
                    };
                } else {
                    _this.setData({
                        noMore: 1
                    });
                };
            },
            (err) => {
                _this.setData({
                    noMore: 1
                });
            }
        );
    },
    setCommonFilter() {
        this.setData({
            tData: APP.globalData.typeData,
            sTData: APP.globalData.smallTypeData,
            oWData: APP.globalData.originWeightData,
            sData: APP.globalData.storageData
        });
    },
    // 头部过滤
    loadFilter() {
        APP.loadFilter().then(
            (res) => {
                this.setCommonFilter();
                this.loadCart();
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
            let _target = e.currentTarget.dataset,
                _item = _target.item,
                _data = this.data,
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
                    _data.dataList.map((item) => {
                        if (_data.type == 0) {
                            if (item.tagId == _item.tagId) {
                                item.isCartAdded = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        } else if (_data.type == 1){
                            if (item.serialCode == _item.serialCode) {
                                item.isAddShoppingStatus = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        } else {
                            if (item.goodsId == _item.goodsId) {
                                item.isAddShoppingStatus = 1;
                                item.btnAddCart = '已加入购物车';
                            };
                        };
                    });
                    this.setData({
                        dataList: _data.dataList
                    });
                }
            );
        });
    },
    // 购物车接口
    loadCart() {
        if (this.data.type == 0 && APP.globalData.token) {
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
        };
        this.loadPage();
    },
    // 详情
    goDetail(e) {
        let _target = e.currentTarget.dataset;
        if ((_target.type == 0 && _target.idtype == 2) || _target.type == 1) return;
        wx.navigateTo({
            url: '/pages/mall/detail?goodsid=' + _target.goodsid + '&type=' + _target.type
        });
    },
    onLoad(opts) {
        // 暂时只显示现货
        wx.setNavigationBarTitle({
            title: '现货资源'
        });
        this.setData({
            type: 0
        });
        this.setData({
            showInput: 1,
            showSmallType: 1,
            showShopSign: 1,
            showOriginWeight: 1,
            showStorage: 1,
            showService: 1,
            showSpecInput: 1,
            showOthers: 1
        });
        // wx.setNavigationBarTitle({
        //     title: opts.title
        // });
        // this.setData({
        //     type: opts.type
        // });
        // if (opts.type == 0) {
        //     // 现货
        //     this.setData({
        //         showSmallType: 1,
        //         showShopSign: 1,
        //         showOriginWeight: 1,
        //         showStorage: 1,
        //         showService: 1,
        //         showSpecInput: 1,
        //         showOthers: 1
        //     });
        // } else if (opts.type == 1) {
        //     // 订单
        //     this.setData({
        //         showDeliveryMonth: 1,
        //         showDeliveryPlace: 1,
        //         showProvider: 1,
        //         showPayType: 1,
        //         showFunder: 1
        //     });
        // } else {
        //     // 到货
        //     this.setData({
        //         showDeliveryMonth: 1,
        //         showOrderNo: 1,
        //         showType: 1,
        //         showSpec: 1,
        //         showShopSign: 1,
        //         showOriginWeight: 1,
        //         showStorage: 1
        //     });
        // };
        if (opts.keyWords) {
            this.setData({
                keyWords: opts.keyWords,
                inputValue: opts.keyWords
            });
        };
        if (Object.keys(APP.globalData.typeData).length <= 0 || Object.keys(APP.globalData.smallTypeData).length <= 0 || Object.keys(APP.globalData.originWeightData).length <= 0 || Object.keys(APP.globalData.storageData).length <= 0) {
            this.loadFilter();
        } else {
            this.setCommonFilter();
            this.loadCart();
        };
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - 69) + 'px'
        });
    },
    onShow() {
        let _data = this.data;
        if (_data.dataList.length > 0) {
            _data.dataList.map((item) => {
                if (wx.getStorageSync('cartDt')) {
                    let _cartDt = wx.getStorageSync('cartDt');
                    if (_data.type == 0) {
                        if (item.pack_code == _cartDt.packCode) {
                            item.isCartAdded = _cartDt.isCartAdded;
                            item.isPackAdded = _cartDt.isPackAdded;
                            item.btnAddCart = _cartDt.btnAddCart;
                            setTimeout(() => {
                                wx.removeStorageSync('cartDt');
                            }, 500);
                        };
                    } else if (_data.type == 2) {
                        if (item.packCode == _cartDt.packCode) {
                            item.isAddShoppingStatus = _cartDt.isAddShoppingStatus;
                            item.btnAddCart = _cartDt.btnAddCart;
                            setTimeout(() => {
                                wx.removeStorageSync('cartDt');
                            }, 500);
                        };
                    };
                    this.setData({
                        dataList: _data.dataList
                    });
                };
            });
        };
    }
});
