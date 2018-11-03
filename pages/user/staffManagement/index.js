const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH: 0, // scroll-view高度
        noMore: 0, // 加载更多
        page: 0, // 第几页
        totalPage: 1, // 总页数
        dataList: []
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
            companyId: APP.globalData.companyId
        },
        _this = this;
        APP.request('getStaffInfo', params).then(
            (res) => {
                if (Object.keys(res.data.recordList).length > 0) {
                    let _res = res.data,
                        _dataList = _this.data.dataList;

                    _res.recordList.map((item) => {
                        item.roleEntities = JSON.stringify(item.roleEntities) == '[]'? '未设置' : item.roleEntities[0].name;
                    });
                    _dataList.push.apply(_dataList, _res.recordList);
                    _this.setData({
                        dataList: _dataList,
                        totalPage: Math.ceil(_res.totalCount / params.pageSize)
                    });
                    if (_this.data.totalPage <= 1 || _res.recordList.length < 10) {
                        _this.setData({
                            noMore: 1
                        });
                    } else {
                        _this.setData({
                            noMore: 0
                        });
                    };
                } else {
                    _this.setData({
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
    // 打电话
    makeCall(e) {
        let _mobile = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: _mobile
        });
    },
    onLoad() {
        this.setData({
            scrollH: wx.getSystemInfoSync().windowHeight + 'px'
        });
        this.loadPage();
    }
})