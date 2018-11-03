const APP = getApp();
const CONFIG = require("../../../../config/index.js");
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        idTypes:0, //1还款记录 0未还贷款
        noMore: 0, // 加载更多
        page: 0, // 第几页
        totalPage: 10, // 总页数
        dataList: [1,2,3],
        
    },
    onLoad: function (opts) {
        wx.setNavigationBarTitle({
            title: opts.title
        });
        this.setData({
            idTypes:opts.idTypes
        })
        console.log(opts.idTypes);
        this.loadPage()
    },
    // 分页
    loadPage() {
        this.data.page++;
    },
});