const APP = getApp();
const GLOBAL = require('../../utils/global.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        list: [], // 钢厂列表
        filterList: [], // 过滤列表
        msg: '',
        searchVal: '',
        result: ''
    },
    // 输入框
    inputSearch(e) {
        if (!e.detail.value) {
            this.clearinput();
            return;
        };
        this.setData({
            searchVal: e.detail.value
        });
        this.comfirmSearch();
    },
    // 过滤
    comfirmSearch() {
        if (!this.data.searchVal) return;
        this.setData({
            msg: '',
            filterList: []
        });
        let _filterList = [];
        this.data.list.filter((item) => {
            if (item.indexOf(this.data.searchVal) != -1) {
                _filterList.push(item);
            };
        });
        if (_filterList.length < 1) {
            this.setData({
                msg: '该钢厂暂不支持扫码'
            });
        };
        this.setData({
            filterList: _filterList
        });
    },
    clearinput() {
        this.setData({
            searchVal: '',
            msg: '',
            filterList: []
        });
    },
    // 获取捆包号
    getPackCode(e) {
        let _name = e.currentTarget.dataset.name;
        APP.request('getScanCode', { factoryname: _name, content: this.data.result }).then(
            (res) => {
                if (res.data) {
                    let params = {
                        page: 1,
                        pageSize: 10,
                        body: {
                            searchKeys: res.data.steelcode
                        }
                    };
                    APP.request('getPackageList', params).then(
                        (list) => {
                            if (list.data.recordList.length == 1) {
                                wx.navigateTo({
                                    url: '/pages/resource/detail?goodsId=' + list.data.recordList[0].goodsId + '&packCode=' + res.data.steelcode
                                });
                            } else if (list.data.recordList.length > 1) {
                                wx.navigateTo({
                                    url: '/pages/resource/index?packCode=' + res.data.steelcode
                                });
                            } else {
                                APP.showToast({
                                    title: '搜索不到该资源'
                                });
                            };
                        }
                    );
                } else {
                    APP.showToast({
                        title: '该钢厂无法匹配二维码'
                    });
                };
            }
        );
    },
    onLoad(opts) {
        this.setData({
            result: opts.result
        });
        if (wx.getStorageSync('scanList')) {
            this.setData({
                list: wx.getStorageSync('scanList')
            });
        } else {
            APP.request('getScanList').then(
                (res) => {
                    let _list = [];
                    res.data.filter((item) => {
                        if (item.isCode == 1) {
                            _list.push(item.factoryname);
                        };
                    });
                    this.setData({
                        list: _list
                    });
                    wx.setStorageSync('scanList', _list);
                }
            );
        };
    }
});
