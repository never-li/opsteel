const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        scrollH:0,
        idTypes:null,
        title:null,
        selectData:[{
                id:"1",
                BundleNumber:"KB001-0001",
                variety:"冷轧不锈钢卷",
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
    //还款记录
    returnRecord:function(e){
        let _id = e.currentTarget.dataset.id,
            _title = e.currentTarget.dataset.title;
        this.setData({
            idTypes:_id,
            title:_title
        })
        wx.navigateTo({
            url:'../refund/paybackRecord?idTypes=' + this.data.idTypes +'&title='+ this.data.title
        })
    },
    //还款
    payback:function(){
        wx.navigateTo({
            url:'../refund/payback'
        })
    }
});