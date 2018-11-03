
const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        // 打开|隐藏侧边栏
        showSideBar: {
            type: Boolean,
            value: 0
        },
        // === 搜索框
        showInput: {
            type: Boolean,
            value: 0
        },
        inputTitle: {
            type: String,
            value: ''
        },
        inputValue: { // 搜索框内容
            type: String,
            value: '',
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    this.setData({
                        inputValue: newData
                    });
                };
            }
        },
        // === 日期
        showDate: {
            type: Boolean,
            value: 0
        },
        dateTitle: {
            type: String,
            value: '请选择日期'
        },
        // === 仓库
        showWarehouse: {
            type: Boolean,
            value: 0
        },
        warehouseData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        warehouseData: newData
                    });
                };
            }
        },
        // === 小品种
        showSmallType: {
            type: Boolean,
            value: 0
        },
        smallTypeData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        smallTypeData: newData
                    });
                };
            }
        },
        // === 品种
        showType: {
            type: Boolean,
            value: 0
        },
        typeData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        typeData: newData
                    });
                };
            }
        },
        // === 规格 复选框
        showSpec: {
            type: Boolean,
            value: 0
        },
        specData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        specData: newData
                    });
                };
            }
        },
        // === 牌号
        showShopSign: {
            type: Boolean,
            value: 0
        },
        shopSignData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        shopSignData: newData
                    });
                };
            }
        },
        // === 产地没重量
        showOrigin: {
            type: Boolean,
            value: 0
        },
        originData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        originData: newData
                    });
                };
            }
        },
        // === 产地有重量
        showOriginWeight: {
            type: Boolean,
            value: 0
        },
        originWeightData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        originWeightData: newData
                    });
                };
            }
        },
        // === 存放地
        showStorage: {
            type: Boolean,
            value: 0
        },
        storageData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        storageData: newData
                    });
                };
            }
        },
        // === 存放地无重量
        showStorageNoWeight: {
            type: Boolean,
            value: 0
        },
        storageDataNoWeight: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        storageDataNoWeight: newData
                    });
                };
            }
        },
        // === 服务承诺
        showService: {
            type: Boolean,
            value: 0
        },
        serviceData: {
            type: Array,
            value: [{
                code: '10',
                name: '极速购'
            }, {
                code: '20',
                name: '放心购'
            }, {
                code: '30',
                name: '耐心购'
            }, {
                code: '40,50',
                name: '线下购'
            }, {
                code: 'bargainedPrice',
                name: '砍价'
            }, {
                code: 'hasBook',
                name: '质保书'
            }, {
                code: 'hasImg',
                name: '实物图片'
            }, {
                code: 'isAfterSettle',
                name: '后结算'
            }, {
                code: 'businessType',
                name: '积分'
            }]
        },
        // === 规格 输入框
        showSpecInput: {
            type: Boolean,
            value: 0
        },
        // === 其他
        showOthers: {
            type: Boolean,
            value: 0
        },
        // 供应商 模糊搜索 暂时不做
        showProviderName: {
            type: Boolean,
            value: 0
        },
        providerNameData: {
            type: Array,
            value: []
        },
        // 捆包号 模糊搜索 暂时不做
        showPackCode: {
            type: Boolean,
            value: 0
        },
        packCodeData: {
            type: Array,
            value: []
        },
        // 仓库原料编号 模糊搜索 暂时不做
        showMaHandCodes: {
            type: Boolean,
            value: 0
        },
        maHandCodesData: {
            type: Array,
            value: []
        },
        // 质量等级
        gradeData: {
            type: Array,
            value: [{
                code: 'A01',
                name: '正品（受理质量异议）'
            }, {
                code: 'B01',
                name: '次品/协议品（不受理质量异议）'
            }]
        },
        // 资源
        resourceData: {
            type: Array,
            value: [{
                code: 'bidOnly',
                name: '竞价资源'
            }, {
                code: 'directOnly',
                name: '定向资源'
            }]
        },
        // === 交货月
        showDeliveryMonth: {
            type: Boolean,
            value: 0
        },
        deliveryMonthData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        deliveryMonthData: newData
                    });
                };
            }
        },
        // === 交货地
        showDeliveryPlace: {
            type: Boolean,
            value: 0
        },
        deliveryPlaceData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        deliveryPlaceData: newData
                    });
                };
            }
        },
        // === 订单号
        showOrderNo: {
            type: Boolean,
            value: 0
        },
        orderNoData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        orderNoData: newData
                    });
                };
            }
        },
        // === 供应商
        showProvider: {
            type: Boolean,
            value: 0
        },
        providerData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        providerData: newData
                    });
                };
            }
        },
        // === 客户
        showCustomer: {
            type: Boolean,
            value: 0
        },
        customerData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        customerData: newData
                    });
                };
            }
        },
        // === 付款性质
        showPayType: {
            type: Boolean,
            value: 0
        },
        payTypeData: {
            type: Array,
            value: [{
                code: '10',
                name: '全额付款'
            }, {
                code: '20',
                name: '定金'
            }, {
                code: '30',
                name: '赊销'
            }]
        },
        // === 出资方
        showFunder: {
            type: Boolean,
            value: 0
        },
        funderData: {
            type: Array,
            value: [],
            observer: function (newData, oldData) {
                if (newData && oldData) {
                    newData.map((newItem) => {
                        oldData.map((oldItem) => {
                            if (newItem.code == oldItem.code && oldItem.checked) {
                                newItem.checked = 1;
                            };
                        });
                    });
                    this.setData({
                        funderData: newData
                    });
                };
            }
        },
        // === 状态
        showStatus: {
            type: Boolean,
            value: 0
        },
        statusData: {
            type: Array,
            value: [{
                code: '1',
                name: '未还款'
            }, {
                code: '2',
                name: '已还款'
            }, {
                code: '3',
                name: '逾期未还款'
            }, {
                code: '4',
                name: '已完成'
            }]
        },
        // === 订单状态
        showOrderStatus: {
            type: Boolean,
            value: 0
        },
        orderStatusData: {
            type: Array,
            value: [{
                code: '0',
                name: '意向'
            }, {
                code: '10',
                name: '待付款'
            }, {
                code: '20',
                name: '待赎货'
            }, {
                code: '30',
                name: '待提货'
            }, {
                code: '40',
                name: '待开票'
            }, {
                code: '50',
                name: '已完成'
            }, {
                code: '60',
                name: '已结算'
            }, {
                code: '70',
                name: '已开票'
            }, {
                code: '90',
                name: '已撤销'
            }, {
                code: '100',
                name: '已违约'
            }, {
                code: '110',
                name: '已结案'
            }]
        },
        // === 订单类型
        showOrderType: {
            type: Boolean,
            value: 0
        },
        orderTypeData: {
            type: Array,
            value: [{
                code: '10',
                name: '现货'
            }, {
                code: '20',
                name: '定制'
            }]
        },
        // === 周期
        showPeriod: {
            type: Boolean,
            value: 0
        },
        periodData: {
            type: Array,
            value: [{
                code: UTIL.getPreSomeMonth(UTIL.getNowFormatDate(),6),
                name: '最近6个月'
            }, {
                code: UTIL.getPreSomeMonth(UTIL.getNowFormatDate(),3),
                name: '最近3个月'
            }, {
                code: UTIL.getPreMonth(UTIL.getNowFormatDate()),
                name: '最近1个月'
            }]
        },
        // === 资金流向
        showFundFlow: {
            type: Boolean,
            value: 0
        },
        fundFlowData: {
            type: Array,
            value: [{
                code: '1',
                name: '收入'
            }, {
                code: '2',
                name: '支出'
            }]
        },
        // === 款项用途
        showFundUse: {
            type: Boolean,
            value: 0
        },
        fundUseData: {
            type: Array,
            value: [{
                code: '1',
                name: '货款'
            }, {
                code: '2',
                name: '运费'
            }, {
                code: '3',
                name: '违约金'
            }, {
                code: '4',
                name: '仓储费'
            }, {
                code: '5',
                name: '退款 '
            }, {
                code: '6',
                name: '充值'
            }, {
                code: '7',
                name: '提现'
            }, {
                code: '8',
                name: '银转现'
            }, {
                code: '9',
                name: '收入银票'
            }]
        },
        // === 实物图片
        showImage: {
            type: Boolean,
            value: 0
        },
        hasImage: {
            type: Object,
            value: {
                code: 1,
                name: '有',
                checked: 0,
            }
        },
        noImage: {
            type: Object,
            value: {
                code: 0,
                name: '无',
                checked: 0,
            }
        },
    },
    // 私有数据，可用于模版渲染
    data: {
        iconDomain: GLOBAL.iconDomain,
        startDate: '', // 开始时间
        endDate: '', // 结束时间
        thickMin: '', // 最小 厚度/直径/高度
        thickMax: '', // 最大 厚度/直径/高度
        widthMin: '', // 最小 宽度/壁厚
        widthMax: '', // 最大 宽度/壁厚
        lengthMin: '', // 最小 长度
        lengthMax: '', // 最大 长度
        providerName: '', // 供应商 值
        packCode: '', // 捆包号 值
        maHandCodes: '', // 仓库原料编号 值
        weightMin: '', // 最小 重量
        weightMax: '', // 最大 重量
        selGrade: {}, // 已选择质量等级
        minPrice: '', // 最小 价格
        maxPrice: '', // 最大 价格
        checkedResource: [], // 已选中资源
        checkedWarehouse: [], // 已选中仓库
        showAllWarehouse: 0, // 显示全部仓库
        checkedSmallType: [], // 已选中小品种
        showAllSmallType: 0, // 显示全部小品种
        checkedType: [], // 已选中品种
        showAllType: 0, // 显示全部品种
        checkedSpec: [], // 已选中规格
        showAllSpec: 0, // 显示全部规格
        checkedShopSign: [], // 已选中牌号
        showAllShopSign: 0, // 显示全部牌号
        checkedOrigin: [], // 已选中产地无重量
        showAllOrigin: 0, // 显示全部产地无重量
        checkedOriginWeight: [], // 已选中产地有重量
        showAllOriginWeight: 0, // 显示全部产地有重量
        checkedStorage: [], // 已选中存放地
        showAllStorage: 0, // 显示全部存放地
        checkedStorageNoWeight: [], // 已选中存放地
        showAllStorageNoWeight: 0, // 显示全部存放地
        checkedService: [], // 已选中服务承诺
        checkedDeliveryMonth: [], // 已选中交货月
        showAllDeliveryMonth: 0, // 显示全部交货月
        checkedDeliveryPlace: [], // 已选中交货地
        showAllDeliveryPlace: 0, // 显示全部交货地
        checkedOrderNo: [], // 已选中订单号
        showAllOrderNo: 0, // 显示全部订单号
        checkedProvider: [], // 已选中供应商
        showAllProvider: 0, // 显示全部供应商
        checkedCustomer: [], // 已选中客户
        showAllCustomer: 0, // 显示全部客户
        checkedPayType: [], // 已选中付款性质
        checkedFunder: [], // 已选中出资方
        showAllFunder: 0, // 显示全部出资方
        checkedStatus: [], // 已选中状态
        checkedOrderStatus: [], // 已选中订单状态
        checkedOrderType: [], // 已选中订单类型
        checkedPeriod: [], // 已选中周期
        checkedFundFlow: [], // 已选中资金流向
        checkedFundUse: [], // 已选中款项用途
        checkedImage: null // 已选中实物图片
    },
    methods: {
        // 开始日期
        startDateChange: function (e) {
            this.setData({
                startDate: e.detail.value
            });
        },
        // 结束日期
        endDateChange: function (e) {
            this.setData({
                endDate: e.detail.value
            });
        },
        // 搜索框
        inputChange: function (e) {
            this.setData({
                inputValue: e.detail.value
            });
            this.triggerEvent('input', e.detail.value);
        },
        // 最小 厚度/直径/高度
        inputThickMin: function (e) {
            this.setData({
                thickMin: e.detail.value
            });
        },
        // 最大 厚度/直径/高度
        inputThickMax: function (e) {
            this.setData({
                thickMax: e.detail.value
            });
        },
        // 最小 宽度/壁厚
        inputWidthMin: function (e) {
            this.setData({
                widthMin: e.detail.value
            });
        },
        // 最大 宽度/壁厚
        inputWidthMax: function (e) {
            this.setData({
                widthMax: e.detail.value
            });
        },
        // 最小 长度
        inputLengthMin: function (e) {
            this.setData({
                lengthMin: e.detail.value
            });
        },
        // 最大 长度
        inputLengthMax: function (e) {
            this.setData({
                lengthMax: e.detail.value
            });
        },
        // 输入供应商
        inputProviderName: function (e) {
            this.setData({
                providerName: e.detail.value
            });
        },
        // 确定供应商
        confirmProviderName: function (e) {
            this.setData({
                providerName: e.currentTarget.dataset.name
            });
        },
        // 输入捆包号
        inputPackCode: function (e) {
            this.setData({
                packCode: e.detail.value
            });
        },
        // 确定捆包号
        confirmPackCode: function (e) {
            this.setData({
                packCode: e.currentTarget.dataset.name
            });
        },
        // 输入仓库原料编号
        inputMaHandCodes: function (e) {
            this.setData({
                maHandCodes: e.detail.value
            });
        },
        // 确定仓库原料编号
        confirmMaHandCodes: function (e) {
            this.setData({
                maHandCodes: e.currentTarget.dataset.name
            });
        },
        // 最小 重量
        inputWeightMin: function (e) {
            this.setData({
                weightMin: e.detail.value
            });
        },
        // 最大 重量
        inputWeightMax: function (e) {
            this.setData({
                weightMax: e.detail.value
            });
        },
        // 最小 价格
        inputMinPrice: function (e) {
            this.setData({
                minPrice: e.detail.value
            });
        },
        // 最大 价格
        inputMaxPrice: function (e) {
            this.setData({
                maxPrice: e.detail.value
            });
        },
        // 选资源
        checkResource: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.resourceData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                resourceData: _data,
                checkedResource: _checkedData
            });
        },
        // 选仓库
        checkWarehouse: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.warehouseData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                warehouseData: _data,
                checkedWarehouse: _checkedData
            });
        },
        // 显示全部仓库
        showAllWarehouse: function () {
            if (this.data.warehouseData.length <= 3) return;
            this.setData({
                showAllWarehouse: !this.data.showAllWarehouse
            });
        },
        // 选小品种
        checkSmallType: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.smallTypeData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                smallTypeData: _data,
                checkedSmallType: _checkedData
            });
        },
        // 显示全部小品种
        showAllSmallType: function () {
            if (this.data.smallTypeData.length <= 3) return;
            this.setData({
                showAllSmallType: !this.data.showAllSmallType
            });
        },
        // 选品种
        checkType: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.typeData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                typeData: _data,
                checkedType: _checkedData
            });
        },
        // 显示全部品种
        showAllType: function () {
            if (this.data.typeData.length <= 3) return;
            this.setData({
                showAllType: !this.data.showAllType
            });
        },
        // 选规格
        checkSpec: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.specData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                specData: _data,
                checkedSpec: _checkedData
            });
        },
        // 显示全部规格
        showAllSpec: function () {
            if (this.data.specData.length <= 3) return;
            this.setData({
                showAllSpec: !this.data.showAllSpec
            });
        },
        // 选牌号
        checkShopSign: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.shopSignData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                shopSignData: _data,
                checkedShopSign: _checkedData
            });
        },
        // 显示全部牌号
        showAllShopSign: function () {
            if (this.data.shopSignData.length <= 3) return;
            this.setData({
                showAllShopSign: !this.data.showAllShopSign
            });
        },
        // 选产地无重量
        checkOrigin: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.originData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                originData: _data,
                checkedOrigin: _checkedData
            });
        },
        // 显示全部产地无重量
        showAllOrigin: function () {
            if (this.data.originData.length <= 3) return;
            this.setData({
                showAllOrigin: !this.data.showAllOrigin
            });
        },
        // 选产地有重量
        checkOriginWeight: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.originWeightData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                originWeightData: _data,
                checkedOriginWeight: _checkedData
            });
        },
        // 显示全部产地有重量
        showAllOriginWeight: function () {
            if (this.data.originWeightData.length <= 3) return;
            this.setData({
                showAllOriginWeight: !this.data.showAllOriginWeight
            });
        },
        // 选存放地
        checkStorage: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.storageData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                storageData: _data,
                checkedStorage: _checkedData
            });
        },
        // 显示全部存放地
        showAllStorage: function () {
            if (this.data.storageData.length <= 3) return;
            this.setData({
                showAllStorage: !this.data.showAllStorage
            });
        },
        // 选存放地无重量
        checkStorageNoWeight: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.storageDataNoWeight,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                storageDataNoWeight: _data,
                checkedStorageNoWeight: _checkedData
            });
        },
        // 显示全部存放地无重量
        showAllStorageNoWeight: function () {
            if (this.data.storageDataNoWeight.length <= 3) return;
            this.setData({
                showAllStorageNoWeight: !this.data.showAllStorageNoWeight
            });
        },
        // 选服务承诺
        checkService: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.serviceData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                serviceData: _data,
                checkedService: _checkedData
            });
        },
        // 选质量等级
        gradeChange: function (e) {
            this.setData({
                selGrade: this.data.gradeData[e.detail.value]
            });
        },
        // 选交货月
        checkDeliveryMonth: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.deliveryMonthData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                deliveryMonthData: _data,
                checkedDeliveryMonth: _checkedData
            });
        },
        // 显示全部交货月
        showAllDeliveryMonth: function () {
            if (this.data.deliveryMonthData.length <= 3) return;
            this.setData({
                showAllDeliveryMonth: !this.data.showAllDeliveryMonth
            });
        },
        // 选交货地
        checkDeliveryPlace: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.deliveryPlaceData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                deliveryPlaceData: _data,
                checkedDeliveryPlace: _checkedData
            });
        },
        // 显示全部交货地
        showAllDeliveryPlace: function () {
            if (this.data.deliveryPlaceData.length <= 3) return;
            this.setData({
                showAllDeliveryPlace: !this.data.showAllDeliveryPlace
            });
        },
        // 选订单号
        checkOrderNo: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.orderNoData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                orderNoData: _data,
                checkedOrderNo: _checkedData
            });
        },
        // 显示全部订单号
        showAllOrderNo: function () {
            if (this.data.orderNoData.length <= 3) return;
            this.setData({
                showAllOrderNo: !this.data.showAllOrderNo
            });
        },
        // 选供应商
        checkProvider: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.providerData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                providerData: _data,
                checkedProvider: _checkedData
            });
        },
        // 显示全部供应商
        showAllProvider: function () {
            if (this.data.providerData.length <= 3) return;
            this.setData({
                showAllProvider: !this.data.showAllProvider
            });
        },
        // 选客户
        checkCustomer: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.customerData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    let _obj = {};
                    _obj.name = _data[i].name;
                    _obj.code = _data[i].code;
                    _checkedData.unshift(_obj);
                };
            };
            this.setData({
                customerData: _data,
                checkedCustomer: _checkedData
            });
        },
        // 显示全部客户
        showAllCustomer: function () {
            if (this.data.customerData.length <= 3) return;
            this.setData({
                showAllCustomer: !this.data.showAllCustomer
            });
        },
        // 选付款性质
        checkPayType: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.payTypeData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                payTypeData: _data,
                checkedPayType: _checkedData
            });
        },
        // 选出资方
        checkFunder: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.funderData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                funderData: _data,
                checkedFunder: _checkedData
            });
        },
        // 显示全部出资方
        showAllFunder: function () {
            this.setData({
                showAllFunder: !this.data.showAllFunder
            });
        },
        // 选状态
        checkStatus: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.statusData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                statusData: _data,
                checkedStatus: _checkedData
            });
        },
        // 选订单状态
        checkOrderStatus: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.orderStatusData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                orderStatusData: _data,
                checkedOrderStatus: _checkedData
            });
        },
        // 选订单类型
        checkOrderType: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.orderTypeData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    if (_data[i].code == 20) {
                        _checkedData.push('20', '30');
                    } else {
                        _checkedData.push(_data[i].code);
                    };
                };
            };
            this.setData({
                orderTypeData: _data,
                checkedOrderType: _checkedData
            });
        },
        // 选周期
        checkPeriod: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.periodData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                periodData: _data,
                checkedPeriod: _checkedData
            });
        },
        // 选资金流向
        checkFundFlow: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.fundFlowData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                fundFlowData: _data,
                checkedFundFlow: _checkedData
            });
        },
        // 选款项用途
        checkFundUse: function (e) {
            let _target = e.currentTarget.dataset,
                _data = this.data.fundUseData,
                _checkedData = [];

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].checked == undefined) {
                    _data[i].checked = 0;
                };
                if (_data[i].checked != undefined && _target.index === i) {
                    _data[i].checked = !_data[i].checked;
                };
                if (_data[i].checked) {
                    _checkedData.push(_data[i].code);
                };
            };
            this.setData({
                fundUseData: _data,
                checkedFundUse: _checkedData
            });
        },
        // 选实物图片 单选
        checkImage: function (e) {
            let _target = e.currentTarget.dataset,
                _hasImage = this.data.hasImage,
                _noImage = this.data.noImage;
            if (this.data.checkedImage == _target.code) {
                _hasImage.checked = 0;
                _noImage.checked = 0;
                this.setData({
                    checkedImage: null
                });
            } else {
                if (_target.code == 1) {
                    _hasImage.checked = 1;
                    _noImage.checked = 0;
                } else {
                    _hasImage.checked = 0;
                    _noImage.checked = 1;
                };
                this.setData({
                    checkedImage: _target.code
                });
            };
            this.setData({
                hasImage: _hasImage,
                noImage: _noImage
            });
        },
        // 关闭侧边栏
        closeSideBar: function () {
            this.setData({
                showSideBar: 0
            });
        },
        // 重置
        resetSideBar: function () {
            // 日期
            if (this.data.startDate) {
                this.setData({
                    startDate: ''
                });
            };
            if (this.data.endDate) {
                this.setData({
                    endDate: ''
                });
            };
            // 搜索框
            if (this.data.inputValue) {
                this.setData({
                    inputValue: ''
                });
            };
            // 最小 厚度/直径/高度
            if (this.data.thickMin) {
                this.setData({
                    thickMin: ''
                });
            };
            // 最大 厚度/直径/高度
            if (this.data.thickMax) {
                this.setData({
                    thickMax: ''
                });
            };
            // 最小 宽度/壁厚
            if (this.data.widthMin) {
                this.setData({
                    widthMin: ''
                });
            };
            // 最大 宽度/壁厚
            if (this.data.widthMax) {
                this.setData({
                    widthMax: ''
                });
            };
            // 最小 长度
            if (this.data.lengthMin) {
                this.setData({
                    lengthMin: ''
                });
            };
            // 最大 长度
            if (this.data.lengthMax) {
                this.setData({
                    lengthMax: ''
                });
            };
            // 捆包号
            if (this.data.packCode) {
                this.setData({
                    packCode: ''
                });
            };
            // 仓库原料编号
            if (this.data.maHandCodes) {
                this.setData({
                    maHandCodes: ''
                });
            };
            // 最小 重量
            if (this.data.weightMin) {
                this.setData({
                    weightMin: ''
                });
            };
            // 最大 重量
            if (this.data.weightMax) {
                this.setData({
                    weightMax: ''
                });
            };
            // 质量等级
            if (Object.keys(this.data.selGrade).length > 0) {
                this.setData({
                    selGrade: {}
                });
            };
            // 最小 价格
            if (this.data.minPrice) {
                this.setData({
                    minPrice: ''
                });
            };
            // 最大 价格
            if (this.data.maxPrice) {
                this.setData({
                    maxPrice: ''
                });
            };
            // 资源
            if (Object.keys(this.data.resourceData).length > 0) {
                let _data = this.data.resourceData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    resourceData: _data,
                    checkedResource: []
                });
            };
            // 仓库
            if (Object.keys(this.data.warehouseData).length > 0) {
                let _data = this.data.warehouseData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    warehouseData: _data,
                    checkedWarehouse: []
                });
            };
            // 小品种
            if (Object.keys(this.data.smallTypeData).length > 0) {
                let _data = this.data.smallTypeData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    smallTypeData: _data,
                    checkedSmallType: []
                });
            };
            // 品种
            if (Object.keys(this.data.typeData).length > 0) {
                let _data = this.data.typeData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    typeData: _data,
                    checkedType: []
                });
            };
            // 规格
            if (Object.keys(this.data.specData).length > 0) {
                let _data = this.data.specData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    specData: _data,
                    checkedSpec: []
                });
            };
            // 牌号
            if (Object.keys(this.data.shopSignData).length > 0) {
                let _data = this.data.shopSignData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    shopSignData: _data,
                    checkedShopSign: []
                });
            };
            // 产地无重量
            if (Object.keys(this.data.originData).length > 0) {
                let _data = this.data.originData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    originData: _data,
                    checkedOrigin: []
                });
            };
            // 产地有重量
            if (Object.keys(this.data.originWeightData).length > 0) {
                let _data = this.data.originWeightData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    originWeightData: _data,
                    checkedOriginWeight: []
                });
            };
            // 服务承诺
            if (Object.keys(this.data.serviceData).length > 0) {
                let _data = this.data.serviceData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    serviceData: _data,
                    checkedService: []
                });
            };
            // 存放地
            if (Object.keys(this.data.storageData).length > 0) {
                let _data = this.data.storageData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    storageData: _data,
                    checkedStorage: []
                });
            };
            // 存放地无重量
            if (Object.keys(this.data.storageDataNoWeight).length > 0) {
                let _data = this.data.storageDataNoWeight;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    storageDataNoWeight: _data,
                    checkedStorageNoWeight: []
                });
            };
            // 交货月
            if (Object.keys(this.data.deliveryMonthData).length > 0) {
                let _data = this.data.deliveryMonthData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    deliveryMonthData: _data,
                    checkedDeliveryMonth: []
                });
            };
            // 交货地
            if (Object.keys(this.data.deliveryPlaceData).length > 0) {
                let _data = this.data.deliveryPlaceData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    deliveryPlaceData: _data,
                    checkedDeliveryPlace: []
                });
            };
            // 订单号
            if (Object.keys(this.data.orderNoData).length > 0) {
                let _data = this.data.orderNoData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    orderNoData: _data,
                    checkedOrderNo: []
                });
            };
            // 供应商
            if (Object.keys(this.data.providerData).length > 0) {
                let _data = this.data.providerData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    providerData: _data,
                    checkedProvider: []
                });
            };
            // 客户
            if (Object.keys(this.data.customerData).length > 0) {
                let _data = this.data.customerData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    customerData: _data,
                    checkedCustomer: []
                });
            };
            // 付款性质
            if (Object.keys(this.data.payTypeData).length > 0) {
                let _data = this.data.payTypeData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    payTypeData: _data,
                    checkedPayType: []
                });
            };
            // 出资方
            if (Object.keys(this.data.funderData).length > 0) {
                let _data = this.data.funderData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    funderData: _data,
                    checkedFunder: []
                });
            };
            // 状态
            if (Object.keys(this.data.statusData).length > 0) {
                let _data = this.data.statusData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    statusData: _data,
                    checkedStatus: []
                });
            };
            // 订单状态
            if (Object.keys(this.data.orderStatusData).length > 0) {
                let _data = this.data.orderStatusData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    orderStatusData: _data,
                    checkedOrderStatus: []
                });
            };
            // 订单类型
            if (Object.keys(this.data.orderTypeData).length > 0) {
                let _data = this.data.orderTypeData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    orderTypeData: _data,
                    checkedOrderType: []
                });
            };
            // 周期
            if (Object.keys(this.data.periodData).length > 0) {
                let _data = this.data.periodData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    periodData: _data,
                    checkedPeriod: []
                });
            };
            // 资金流向
            if (Object.keys(this.data.fundFlowData).length > 0) {
                let _data = this.data.fundFlowData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    fundFlowData: _data,
                    checkedFundFlow: []
                });
            };
            // 款项用途
            if (Object.keys(this.data.fundUseData).length > 0) {
                let _data = this.data.fundUseData;
                _data.map((item) => {
                    item.checked = 0;
                });
                this.setData({
                    fundUseData: _data,
                    checkedFundUse: []
                });
            };
            // 实物图片
            if (this.data.hasImage.checked || this.data.noImage.checked) {
                this.setData({
                    'hasImage.checked': 0,
                    'noImage.checked': 0,
                    checkedImage: null
                });
            };
            this.triggerEvent('reset');
        },
        // 确定
        confirmSideBar: function () {
            let _data = this.data,
                params = {};
            // 开始日期
            if (_data.startDate) {
                params.startDate = _data.startDate;
            };
            // 结束日期
            if (_data.endDate) {
                params.endDate = _data.endDate;
            };
            // 搜索框
            if (_data.inputValue) {
                params.inputValue = _data.inputValue;
            };
            // 最小 厚度/直径/高度
            if (_data.thickMin) {
                params.thickMin = _data.thickMin;
            };
            // 最大 厚度/直径/高度
            if (_data.thickMax) {
                params.thickMax = _data.thickMax;
            };
            // 最小 宽度/壁厚
            if (_data.widthMin) {
                params.widthMin = _data.widthMin;
            };
            // 最大 宽度/壁厚
            if (_data.widthMax) {
                params.widthMax = _data.widthMax;
            };
            // 最小 长度
            if (_data.lengthMin) {
                params.lengthMin = _data.lengthMin;
            };
            // 最大 长度
            if (_data.lengthMax) {
                params.lengthMax = _data.lengthMax;
            };
            // 供应商 模糊搜索
            if (_data.providerName) {
                params.providerName = _data.providerName;
            };
            // 捆包号
            if (_data.packCode) {
                params.packCode = _data.packCode;
            };
            // 仓库原料编号
            if (_data.maHandCodes) {
                params.maHandCodes = _data.maHandCodes;
            };
            // 最小 重量
            if (_data.weightMin) {
                params.weightMin = _data.weightMin;
            };
            // 最大 重量
            if (_data.weightMax) {
                params.weightMax = _data.weightMax;
            };
            // 质量等级
            if (Object.keys(_data.selGrade).length > 0) {
                params.gradeCode = _data.selGrade.code;
            };
            // 最小 价格
            if (_data.minPrice) {
                params.minPrice = _data.minPrice;
            };
            // 最大 价格
            if (_data.maxPrice) {
                params.maxPrice = _data.maxPrice;
            };
            // 资源
            if (Object.keys(_data.checkedResource).length > 0) {
                params.checkedResource = _data.checkedResource;
            };
            // 仓库
            if (Object.keys(_data.checkedWarehouse).length > 0) {
                let _checkedArr = [];
                _data.checkedWarehouse.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedWarehouse = _checkedArr.toString();
            };
            // 小品种
            if (Object.keys(_data.checkedSmallType).length > 0) {
                let _checkedArr = [];
                _data.checkedSmallType.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedSmallType = _checkedArr.toString();
            };
            // 品种
            if (Object.keys(_data.checkedType).length > 0) {
                let _checkedArr = [];
                _data.checkedType.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedType = _checkedArr.toString();
            };
            // 规格
            if (Object.keys(_data.checkedSpec).length > 0) {
                let _checkedArr = [];
                _data.checkedSpec.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedSpec = _checkedArr.toString();
            };
            // 牌号
            if (Object.keys(_data.checkedShopSign).length > 0) {
                let _checkedArr = [];
                _data.checkedShopSign.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedShopSign = _checkedArr.toString();
            };
            // 产地无重量
            if (Object.keys(_data.checkedOrigin).length > 0) {
                let _checkedArr = [];
                _data.checkedOrigin.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedOrigin = _checkedArr.toString();
            };
            // 产地有重量
            if (Object.keys(_data.checkedOriginWeight).length > 0) {
                let _checkedArr = [];
                _data.checkedOriginWeight.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedOriginWeight = _checkedArr.toString();
            };
            // 服务承诺
            if (Object.keys(_data.checkedService).length > 0) {
                params.checkedService = _data.checkedService;
            };
            // 存放地
            if (Object.keys(_data.checkedStorage).length > 0) {
                let _checkedArr = [];
                _data.checkedStorage.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedStorage = _checkedArr.toString();
            };
            // 存放地无重量
            if (Object.keys(_data.checkedStorageNoWeight).length > 0) {
                let _checkedArr = [];
                _data.checkedStorageNoWeight.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedStorageNoWeight = _checkedArr;
            };
            // 交货月
            if (Object.keys(_data.checkedDeliveryMonth).length > 0) {
                let _checkedArr = [];
                _data.checkedDeliveryMonth.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedDeliveryMonth = _checkedArr.toString();
            };
            // 交货地
            if (Object.keys(_data.checkedDeliveryPlace).length > 0) {
                let _checkedArr = [];
                _data.checkedDeliveryPlace.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedDeliveryPlace = _checkedArr.toString();
            };
            // 订单号
            if (Object.keys(_data.checkedOrderNo).length > 0) {
                let _checkedArr = [];
                _data.checkedOrderNo.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedOrderNo = _checkedArr.toString();
            };
            // 供应商
            if (Object.keys(_data.checkedProvider).length > 0) {
                let _checkedArr = [];
                _data.checkedProvider.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedProvider = _checkedArr;
            };
            // 客户
            if (Object.keys(_data.checkedCustomer).length > 0) {
                let _checkedArr = [];
                _data.checkedCustomer.map((item) => {
                    _checkedArr.push(item.code);
                });
                params.checkedCustomer = _checkedArr;
            };
            // 付款性质
            if (Object.keys(_data.checkedPayType).length > 0) {
                params.checkedPayType = _data.checkedPayType.toString();
            };
            // 出资方
            if (Object.keys(_data.checkedFunder).length > 0) {
                params.checkedFunder = _data.checkedFunder;
            };
            // 状态
            if (Object.keys(_data.checkedStatus).length > 0) {
                params.checkedStatus = _data.checkedStatus;
            };
            // 订单状态
            if (Object.keys(_data.checkedOrderStatus).length > 0) {
                params.checkedOrderStatus = _data.checkedOrderStatus;
            };
            // 订单类型
            if (Object.keys(_data.checkedOrderType).length > 0) {
                params.checkedOrderType = _data.checkedOrderType;
            };
            // 周期
            if (Object.keys(_data.checkedPeriod).length > 0) {
                params.checkedPeriod = _data.checkedPeriod.toString();
            };
            // 资金流向
            if (Object.keys(_data.checkedFundFlow).length > 0) {
                params.checkedFundFlow = _data.checkedFundFlow;
            };
            // 款项用途
            if (Object.keys(_data.checkedFundUse).length > 0) {
                params.checkedFundUse = _data.checkedFundUse;
            };
            // 实物图片
            if (_data.hasImage.checked || _data.noImage.checked) {
                params.checkedImage = _data.checkedImage;
            };
            this.triggerEvent('confirm', params);
            this.setData({
                showSideBar: 0
            });
        }
    },
    ready: function () {
    },
    attached: function () {
    }
})