const APP = getApp();
const CONFIG = require("../../config/index.js");
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        clearIcon: GLOBAL.iconDomain + 'icon-clear.png',
        trashIcon: GLOBAL.iconDomain + 'icon-trash.png',
        searchVal: '', // 搜索内容
        searchStorage: [], // 搜索历史
        searchHot: [] // 热门
    },
    // 删除搜索内容
    clearinput(e) {
        this.setData({
            searchVal: ''
        });
    },
    // 清空历史记录
    clearHistory(e) {
        APP.showModal({
            showCancel: true,
            content: '确定清空历史记录？',
            success:(res) => {
                if (res.confirm) {
                    wx.removeStorageSync('historyData');
                    this.setData({
                        searchStorage: []
                    });
                };
            }
        })
    },
    inputSearch(e) {
        this.setData({
            searchVal: e.detail.value
        });
    },
    // 搜索
    comfirmSearch(e) {
        let _searchVal = '';
        if (e.detail.value) {
            _searchVal = e.detail.value;
            let _searchStorage = this.data.searchStorage;
            _searchStorage.unshift(_searchVal);
            let _historyData = this.unique(_searchStorage);
            if (_historyData.length > 10) {
                _historyData.splice(10);
            };
            wx.setStorageSync('historyData', _historyData);
            this.setData({
                searchStorage: _historyData
            });
        } else if (e.currentTarget.dataset.item) {
            _searchVal = e.currentTarget.dataset.item;
        };
        // 暂时改为查看更多页面
        wx.reLaunch({
            url: '/pages/mall/more?keyWords=' + _searchVal + '&title=现货资源&type=0'
        });
    },
    // 数组去重
    unique(arr) {
        var res =[];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            };
        };
        return res;
    },
    backPage() {
        wx.navigateBack();
    },
    onLoad() {
        this.setData({
            searchStorage: wx.getStorageSync('historyData') || [],
            searchHot: ['冷卷', '冷轧平直板', '热轧平直板', '热轧']
        });
    },
    onHide() {
        this.setData({
            searchVal: ''
        });
    }
});