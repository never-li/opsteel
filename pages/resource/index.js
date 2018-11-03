const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH: 0,
        noMore: 0,
        showAllData: 1,
        // ====== 筛选组件内容
        showSideBar: 0, // 筛选
        showInput: 1,
        showImage: 1,
        inputTitle: '请输入捆包号/牌号/文件名/品种',
        dataList: [],
        filterDt: {},
        uploadCount: 0, // 已上传
        unUploadCount: 0, // 未上传
        totalCount: 0, // 总条数
        totalWeight: 0, // 总重量
        page: 0, // 第几页
        totalPage: 1 // 总页数
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
    confirmSideBar(e) {
        this.resetData();
        this.setData({
            filterDt: e.detail
        });
        this.loadPage();
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
                body: {}
            },
            _this = this,
            _data = this.data;

        // === 参数
        if (Object.keys(_data.filterDt).length > 0) {
            let _dt = _data.filterDt;
            if (_dt.inputValue) {
                params.body.searchKeys = _dt.inputValue;
            };
            if (_dt.checkedImage != undefined) {
                params.body.hasImg = _dt.checkedImage;
                this.setData({
                    showAllData: 0
                });
            };
        } else {
            this.setData({
                showAllData: 1
            });
        };
        
        APP.request('getPackageList', params).then(
            (res) => {
                let _res = res.data,
                    _itemList = _res.recordList;
                
                if (Object.keys(_itemList).length > 0) {
                    let _dataList = _data.dataList;
                    
                    _itemList.map((item) => {
                        item.weight = UTIL.parseWeight(item.weight);
                    });
                    
                    _this.setData({
                        totalCount: _res.totalCount,
                        totalWeight: _res.totalWeight,
                        totalPage: _res.totalPage
                    });
                    _dataList.push.apply(_dataList, _itemList);
                    _this.setData({
                        dataList: _dataList
                    });
                    // 获取已上传&未上传数量
                    if (_data.uploadCount == 0 && _data.unUploadCount == 0) {
                        params.body.hasImg = 1;
                        APP.request('getPackageList', params).then(
                            (count) => {
                                this.setData({
                                    uploadCount: count.data.totalCount,
                                    unUploadCount: _data.totalCount - count.data.totalCount
                                });
                            }
                        );
                    };
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
    goDetail(e) {
        let _item = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/resource/detail?goodsId=' + _item.goodsId + '&packCode=' + _item.packCode
        });
    },
    onLoad(opts) {
        if (opts.packCode) {
            this.setData({
                ['filterDt.inputValue']: opts.packCode
            });
        };
        this.loadPage();
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - 50) + 'px'
        });
    },
    onShow() {
        let _data = this.data;
        if (_data.dataList.length > 0) {
            _data.dataList.map((item) => {
                if (wx.getStorageSync('resourceDt')) {
                    let resourceDt = wx.getStorageSync('resourceDt');
                    if (resourceDt.packCode == item.packCode) {
                        item.hasImg = 1;
                        this.setData({
                            dataList: _data.dataList
                        });
                        setTimeout(() => {
                            wx.removeStorageSync('resourceDt');
                        }, 500);
                    };
                };
            });
        };
    }
});
