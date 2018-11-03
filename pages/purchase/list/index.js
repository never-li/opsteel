const APP = getApp();
const GLOBAL = require('../../../utils/global.js');
const UTIL = require('../../../utils/util.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH:0, // scroll-view高度
        noMore: false, // 加载更多
        headCount:{},
        page: 0, // 第几页
        totalPage: 1, // 总页数
        dataList: [], //订单列表
        dataListAll:{}, //全部数据
        type: null,
        isPur:null,
        // ====== 筛选组件内容
        filterDt: {},
        showSideBar:false,
        showInput: true, // 搜索框
        inputTitle: '采购订单号/销售订单号/捆包号/牌号', // 搜索框名称

        showProvider:0, // 供应商 -- 订单
        providerData: [], // 供应商
        checkedProviderData:[], // 供应商

        showCustomer: 0, // 客户
        customerData:[], //客户
        checkedCustomer:[], //客户

        showOrderStatus: true, // 订单状态
        showOrderType: true, // 订单类型

        showPeriod: true, // 周期

        showType: 1, // 品种
        typeData: [], // 品种
        checkedTypeData: [], // 品种

        showShopSign: 1, // 显示全部牌号
        shopSignData:[],
        checkedShopSign: [], // 已选中牌号

        showSpecInput: 1, // 规格 输入框

        showOrigin: 1, // 产地
        originData: [], // 产地
        checkedOriginData: [], // 产地

        showPayType: 1, // 付款性质 
        payTypeData: [], // 付款
        checkedPayType:[],// 付款

        showStorage: 1, // 存放地
        storageData: [], // 存放地
        checkedStorageData: [], // 存放地
        showAllStorage: 1, // 显示全部存放地

        showStorageNoWeight:1,
        storageDataNoWeight: [], // 存放地
        checkedStorageDataNoWeight: [], // 存放地
        showAllStorageNoWeight: 1, // 显示全部存放地
        
    },
    onLoad: function (opts) {
        wx.setNavigationBarTitle({
            title: opts.title
        });
        this.setData({
            type: opts.type,
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 200) + 'px'
        });
        if(opts.type == 4){
           this.setData({
                showProvider:1, //开启供应商
                isPur:1
           })
        }
        if(opts.type == 5){
            this.setData({
                showCustomer:1, //开启客户
                isPur:0
           })
        }
        this.loadPage();
        this.headCount();
    },
    details:function(){
        APP.showModal({
            content:"订单详情请登录欧浦智网查看",
            confirmText:"我知道了"
        })
    },
    showSideBar: function() {
        this.setData({
            showSideBar: true
        });
    },
    confirmSideBar: function (e) {
        console.log(e);
        this.resetData();
        this.setData({
            filterDt: e.detail
        });
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
            "isPur":this.data.isPur,
            "page":this.data.page,
            "pageSize": 10,
            "secondTabType":"1",
            "sort":{
                "orderBy":"DESC",
                "sortField":"oc.create_time"
            },
            "firstTabType":10,
            "date1":UTIL.currentMonth(),
            "date2":UTIL.getNowFormatDate()
        },
        _this = this,
        _data = this.data;
        if(Object.keys(_data.filterDt).length > 0){
            let _dt = _data.filterDt;
            //搜索
            if(_dt.inputValue){
                params.searchKey = _dt.inputValue
            }
            //品种
            if(_dt.checkedType){
                params.productCodeArr = _this.turnArray(_dt.checkedType);
            }
            //牌号
            if(_dt.checkedShopSign){
                params.shopSignArr = _dt.checkedShopSign
            }
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
            //周期
            if (_dt.checkedPeriod) {
                params.createTimeMax = UTIL.getNowFormatDate();
                params.createTimeMin = _dt.checkedPeriod;
            };
            //付款性质
            if (_dt.checkedPayType) {
                params.paymentMethodArr =_this.turnArray(_dt.checkedPayType);
            };
            //产地
            if (_dt.checkedOrigin) {
                params.producingCodeArr = _dt.checkedOrigin;
            };
            
            //供应商
            if(_dt.checkedProvider){
                params.providerIds = _dt.checkedProvider
            }
            //客户
            if(_dt.checkedCustomer){
                params.buyerIdArr = _dt.checkedCustomer
            }
            //存放地
            if(_dt.checkedStorageNoWeight){
                params.storagePlaceCodes = _dt.checkedStorageNoWeight
            }
           
            //订单状态
            if(_dt.checkedOrderStatus){
                params.orderStatusArr = _dt.checkedOrderStatus
            }
            //订单类型
            if(_dt.checkedOrderType){
                params.orderTypeArr = _dt.checkedOrderType
            }
        }
        APP.request('getsalelist', params).then(
            (res) => {
                let _res = res.data,
                    _dataList = _this.data.dataList;
                if(Object.keys(_res.pageBean.recordList).length > 0){
                    _res.pageBean.recordList.map((item) => {
                        item.totalWeight = UTIL.parseWeight(item.totalWeight);
                        item.totalAmount = UTIL.parsePrice(item.totalAmount);
                    });
                    //合并数组
                    _dataList.push.apply(_dataList,_res.pageBean.recordList);
                    //转换
                    _dataList.map((item)=>{
                        let orderStatus = item.orderStatus,
                           orderType = item.orderType;
                        if(orderStatus == 0){
                            item.orderStatus = "意向";
                        };
                        if(orderStatus == 10){
                            item.orderStatus = "待付款";
                        };
                        if(orderStatus == 20){
                            item.orderStatus = "待赎货";
                        };
                        if(orderStatus == 30){
                           if(orderType == 20 || orderType == 30){
                                item.orderStatus = "待赎货";
                           }else{
                                item.orderStatus = "待提货";
                           };
                        };
                        if(orderStatus == 40){
                            item.orderStatus = "待开票";
                        };
                        if(orderStatus == 50){
                            item.orderStatus = "待开票";
                        };
                        if(orderStatus == 60){
                            item.orderStatus = "已结算";
                        };
                        if(orderStatus == 70){
                            item.orderStatus = "已开票";
                        };
                        if(orderStatus == 90){
                            item.orderStatus = "已撤销";
                        };
                        if(orderStatus == 100){
                            item.orderStatus = "已违约";
                        };
                        if(orderStatus == 110){
                            item.orderStatus = "已结案";
                        };
                    });
                    let _providerData =  this.accessData(_res,'_providerData','providers'),//供应商
                        _typeData =  this.accessData(_res,'_typeData','products'), // 品种
                        _shopSignData =  this.accessData(_res,'_shopSignData','shopSigns'), // 牌号
                        _originData =  this.accessData(_res,'_originData','producings'), // 产地
                        _payTypeData =  this.accessData(_res,'_payTypeData','paymentMethods'), // 付款性质
                        _storageDataNoWeight =  this.accessData(_res,'_storageDataNoWeight','storagePlaces'),// 存放地
                        _customerData =  this.accessData(_res,'_customerData','buyers');//客户
                    
                    //更新
                    _this.setData({
                        dataListAll:_res,
                        dataList:_dataList,
                        totalPage:_res.pageBean.totalPage,
                        providerData: _providerData,
                        typeData:_typeData,
                        shopSignData:_shopSignData,
                        originData:_originData,
                        payTypeData:_payTypeData,
                        storageDataNoWeight:_storageDataNoWeight,
                        customerData:_customerData
                    });
                    //加载组件显示状态
                    if (_data.totalPage <= 1 || _res.pageBean.recordList.length < 10) {
                        _this.setData({
                            noMore: 1
                        });
                    } else {
                        _this.setData({
                            noMore: 0
                        });
                    };
                }else{
                    _this.setData({
                        dataListAll:res.data,
                        noMore: 1
                    }); 
                }
            },
            (err) => {
                _this.setData({
                    noMore: 1
                });
            }
        );
    },
    //全部统计
    headCount:function(){
        let params = {
            "isPur":this.data.isPur,
            "page":this.data.page,
            "pageSize":10,
            "sort":{
                "orderBy":"DESC",
                "sortField":"oc.create_time"
            },
            "secondTabType":1,
            "date1": UTIL.currentMonth(),
            "date2": UTIL.getNowFormatDate()
        },
        _this = this;
        APP.request('getHeadCount', params).then(
            (res)=>{
               let _res = res.data;
               _this.setData({
                headCount:_res
               })
              
            },(err)=>{
            }
        );
    },
    //转数组
    turnArray:function(string){
        let arr = string.split(",");
        return arr;
    },
    //接入数据
    accessData:function(_res,_arr,value){
        _arr = [];
        if (Object.keys(_res.filterVo[value]).length > 0) {
            _res.filterVo[value].map((item) => {
                if(item != null){
                    if (item.name) {
                        let _obj = {};
                        _obj.code = item.code;
                        _obj.name = item.name;
                        _arr.push(_obj);
                    };
                }
               
            });
        };
        return _arr;
    }
});
