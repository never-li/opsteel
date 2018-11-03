const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        showTab:1,
        loanId:null,
        noMore: 0, // 加载更多
        page: 0, // 第几页
        totalPage: 1, // 总页数
    },
    onLoad: function (opts) {
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 85) + 'px'
        });
    },
    //改变Tab
    changeTab:function(e){
        //TAB切换
        let tab = e.currentTarget.dataset.tab;
        this.setData({
            showTab:tab
        })
    },
    //进入详情
    details:function(e){
        let _id = e.currentTarget.dataset.loanid;
        console.log(_id)
        this.setData({
            loanId:_id
        })
        wx.navigateTo({
            url:'../inquiry/loanDetails?loanid=' + this.data.loanId
        })
    }
});