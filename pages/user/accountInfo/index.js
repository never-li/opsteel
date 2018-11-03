const APP = getApp();
const UTIL = require('../../../utils/util.js');
Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        dataList: []
    },
    onLoad() {
        let params = {
            companyId: APP.globalData.companyId
        };
        APP.request('getAccountInfo', params).then(
            (res) => {
                let _dataList = res.data;
                _dataList.map((item) => {
                    item.totalAmount = UTIL.parsePrice(item.totalAmount);
                    item.activeAmount = UTIL.parsePrice(item.activeAmount);
                    item.freezeAmount = UTIL.parsePrice(item.freezeAmount);
                })
                this.setData({
                    dataList: _dataList
                });
            }
        );
    }
})