const APP = getApp();
const CONFIG = require("../../../config/index.js");
const GLOBAL = require('../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isExpanded:true,
        arrowUp:false,
        ProcessIsExpanded:true,
        ProcessArrowUp:false,
    },
    onLoad: function (opts) {
    },
    // 订单子项展开收起
    orderSubkeyShow: function() {
        this.setData({
            arrowUp: !this.data.arrowUp,
            isExpanded:!this.data.isExpanded,
        });
    },
    ProcessTrackingShow:function() {
        this.setData({
            ProcessArrowUp: !this.data.ProcessArrowUp,
            ProcessIsExpanded:!this.data.ProcessIsExpanded,
        });
    },
});