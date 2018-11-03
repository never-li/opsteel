const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        id:null //产品ID
    },
    onLoad: function (opts) {
        this.setData({
            id:opts.loanid
        })
        //console.log(this.data.id)
    },
    
});