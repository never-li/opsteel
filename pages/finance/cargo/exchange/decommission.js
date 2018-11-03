const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        scrollH:0, //高度
        selectData:[{
                id:"1",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷1",
                brand:"SPCC",
                PlaceOrigin:"柳钢",
                specification:"1.0*1250*C",
                Placestorage:"宝钢8号库",
                weight:1.395,
                value:5000.00
            },{
                id:"2",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷",
                brand:"SPCC",
                PlaceOrigin:"柳钢",
                specification:"1.0*1250*C",
                Placestorage:"宝钢8号库",
                weight:1.395,
                value:5000.00
            },{
                id:"3",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷",
                brand:"SPCC",
                PlaceOrigin:"柳钢",
                specification:"1.0*1250*C",
                Placestorage:"宝钢8号库",
                weight:1.395,
                value:5000.00
            },{
                id:"4",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷",
                brand:"SPCC",
                PlaceOrigin:"柳钢",
                specification:"1.0*1250*C",
                Placestorage:"宝钢8号库",
                weight:1.395,
                value:5000.00
            },{
                id:"5",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷",
                brand:"SPCC",
                PlaceOrigin:"柳钢",
                specification:"1.0*1250*C",
                Placestorage:"宝钢8号库",
                weight:1.395,
                value:5000.00
            }
        ]
    },
    onLoad: function (opts) {
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 90) + 'px'
        });
    },
    //选中输出
    selectComponents:function(e){
        console.log(e)
    },
    //下一步
    nextStep:function(){
        wx.navigateTo({
            url:'../exchange/confirmMessage'
        })
    }
    
});