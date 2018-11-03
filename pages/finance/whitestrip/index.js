const APP = getApp();
const GLOBAL = require('../../../utils/global.js');
Page({
    data: {
        //iconDomain: GLOBAL.iconDomain,
        //cargoStatus:3,
        showTab:1,
        orderlist:[{
                singleNumber:"DH20180514001",
                status:"未还款",
                amount:"1000.00",
                handlingFee:"200.00",
                unpaidPrincipal:"1000.00",
                noProcessingFee:"0.00",
                recentDate:"2018-05-01",
                dateOfExpiry:"2018-08-01"
            }, {
                singleNumber:"DH20180514001",
                status:"逾期未还款",
                amount:"1000.00",
                handlingFee:"200.00",
                unpaidPrincipal:"1000.00",
                noProcessingFee:"0.00",
                recentDate:"2018-05-01",
                dateOfExpiry:"2018-08-01"
            },{
                singleNumber:"DH20180514001",
                status:"已还款",
                amount:"1000.00",
                handlingFee:"200.00",
                unpaidPrincipal:"1000.00",
                noProcessingFee:"0.00",
                recentDate:"2018-05-01",
                dateOfExpiry:"2018-08-01"
            },{
                singleNumber:"DH20180514001",
                status:"未还款",
                amount:"1000.00",
                handlingFee:"200.00",
                unpaidPrincipal:"1000.00",
                noProcessingFee:"0.00",
                recentDate:"2018-05-01",
                dateOfExpiry:"2018-08-01"
            }
        ], //交易列表
        repaymentlist:[{
                serialNumber:"20180514001234",
                repaymentAmount:"1200.00",
                dateOfExpiry:"2018-08-01"
            },{
                serialNumber:"20180514001234",
                repaymentAmount:"1200.00",
                dateOfExpiry:"2018-08-01"
            },{
                serialNumber:"20180514001234",
                repaymentAmount:"1200.00",
                dateOfExpiry:"2018-08-01"
            },{
                serialNumber:"20180514001234",
                repaymentAmount:"1200.00",
                dateOfExpiry:"2018-08-01"
            },{
                serialNumber:"20180514001234",
                repaymentAmount:"1200.00",
                dateOfExpiry:"2018-08-01"
            }
        ],
        scrollH: 0, // scroll-view高度
        noMore: 0, // 加载更多
        page: 0, // 第几页
        totalPage: 1, // 总页数

        dateTitle: '请选择日期', // 日期名称
        showDate: 1, // 日期
        showStatus:1, // 状态
    },
    onLoad: function (opts) {
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 243) + 'px'
        });
    },
    changeTab:function(e){
      let  tab = e.currentTarget.dataset.tab;
      this.setData({
            showTab:tab
      })
      if(tab == 2){
         this.setData({
            showStatus:0,
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 153) + 'px'
         })
      }else{
        this.setData({
            showStatus:1,
            scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 243) + 'px'
        })
      }
    },
    // 筛选
    showSideBar() {
        this.setData({
            showSideBar: 1
        });
    },
    confirmSideBar(e) {
        console.log(e)
    },
    repayment_bnt:function(){
        wx.navigateTo({
            url:'../whitestrip/repayment/index'
        })
    }
});