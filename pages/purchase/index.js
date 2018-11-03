const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,//图标
        isShowToast: 0,
        title: '',
        icon: '',
        paymentRatio:0, //百分比
        goodsRatio:0,
        invoiceRatio:0,
        type:null,
        isPur:null,
        pickTimeDate:{
            index: 0,
            data:[
                {
                    id: 0,
                    value: '最近6个月'
                },
                {
                    id: 1,
                    value: '最近3个月'
                },
                {
                    id: 2,
                    value: '最近1个月'
                },
                {
                    id: 3,
                    value: '最近7天'
                },
            ]
        },//选择时间
        startTime:'',//开始时间
        lastTime:'',//结束时间
        totalData:{},//总计数据
        listDataShort:null
    },
    onLoad: function (opts) {
        wx.setNavigationBarTitle({
            title: opts.title
        });
        this.setData({
            title:opts.title,
            type: opts.type
        })
        if(opts.type ==4){
            this.setData({
                isPur: 1
            })
        }
        if(opts.type ==5){
            this.setData({
                isPur: 0
            })
        }
        this.ordersMore();
        this.depositTime(0);
    },
    Drawing:function(id,bg,colour,scale){
        let query = wx.createSelectorQuery();
        //选择id
        let that = this;
        query.select(".cir").boundingClientRect(function (rect) {
        let cxt_arc = wx.createCanvasContext(id);//创建并返回绘图上下文context对象。
        cxt_arc.setLineWidth(8);  
        cxt_arc.setStrokeStyle(bg);  
        cxt_arc.setLineCap('round')  
        cxt_arc.beginPath();//开始一个新的路径  
        cxt_arc.arc(rect.width/2,rect.height/2, rect.width/2.5 , 0, 2*Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径  
        cxt_arc.stroke();//对当前路径进行描边  
        
        cxt_arc.setLineWidth(8);  
        cxt_arc.setStrokeStyle(colour);  
        cxt_arc.setLineCap('round')  
        cxt_arc.beginPath();//开始一个新的路径  
        cxt_arc.arc(rect.width/2,rect.height/2, rect.width/2.5, -90 * Math.PI / 180, (scale * 3.6 - 90) * Math.PI / 180, false);  
        cxt_arc.stroke();//对当前路径进行描边

        cxt_arc.draw();
        }).exec();
    },
    //订单
    orders:function(){
        if (!this.data.listDataShort.pageBean.totalCount) return;
        let _data = this.data;
        wx.navigateTo({
            url:'../purchase/list/index'+"?title="+ _data.title +'&type='+ _data.type
        })
    },
    //弹出框
    PopUpBox:function(){
        let isPur = this.data.isPur;
        if(isPur == 1){
            APP.showModal({
                content:"收票详情请登录欧浦智网查看",
                confirmText:"我知道了"
            })
        }
        if(isPur == 0){
            APP.showModal({
                content:"开票详情请登录欧浦智网查看",
                confirmText:"我知道了"
            })
        }
    },
    //选择时间
    pickTime:function(e){
        let index = e.detail.value;
        let currentId = this.data.pickTimeDate.data[index].id; // 这个id就是选中项的id
        this.data.pickTimeDate.index = index;
        this.setData({
            pickTimeDate:this.data.pickTimeDate
        })
        this.depositTime(currentId);
    },
    //存参--时间
    depositTime:function(id){
        let startTime = UTIL.getNowFormatDate();//当前时间
        this.setData({
            startTime:startTime
        })
        switch(id){
            case 0://最近6个月
            this.setData({
                lastTime:UTIL.getPreSomeMonth(startTime,6)
            })
            break;
            case 1://最近3个月
            this.setData({
                lastTime:UTIL.getPreSomeMonth(startTime,3)
            })
            break;
            case 2://最近1个月
            this.setData({
                lastTime:UTIL.getPreMonth(startTime)
            })
            break;
            case 3://最近7天
            this.setData({
                lastTime:UTIL.get7DaysBefore(startTime)
            })
            break;
        }
        let data = {
            "isPur": this.data.isPur,
            "date1": this.data.lastTime,
            "date2": this.data.startTime
        };
        //格式转换
        this.setData({
            startTime : UTIL.shorTime(this.data.startTime),
            lastTime : UTIL.shorTime(this.data.lastTime)
        })
        APP.request('getorderstatistics', data).then(
            (res) => {
                let totalData = res.data;
                if(totalData == null){
                    let totalData = [];
                    this.setData({
                        totalData: totalData
                    })
                }else{
                    for(var key in totalData){
                        if(totalData[key] == null){
                            totalData[key] = 0;
                        }
                    }
                    let payed = totalData.payedAmount/totalData.totalAmount 
                    let payedRatio = Math.round(payed*100);

                    let weight = totalData.receiedWeight/totalData.totalWeight 
                    let weightRatio = Math.round(weight*100);

                    let invoice = totalData.receivedInvoicedAmt+totalData.unreceiveInvoicedAmt;
                    let invoiceRatio = Math.round(invoice*100);
                    //更新
                    this.setData({
                        totalData: totalData,
                        paymentRatio:payedRatio,
                        goodsRatio:weightRatio,
                        invoiceRatio:invoiceRatio
                    });
                }
                //画圆
                this.Drawing("canvasPayment",'#ffebdb',"#FF9B49",this.data.paymentRatio);
                this.Drawing("canvasGoods",'#e3f6fa',"#5cd1ed",this.data.goodsRatio);
                this.Drawing("canvasInvoice",'#fff2d7',"#ffc038",this.data.invoiceRatio);
            },
            (err) => {
            }
        );

    },
    //更多订单
    ordersMore:function(){
        let data={
            "isPur":this.data.isPur,
            "page":1,
            "pageSize":10,
            "secondTabType":"1",
            "sort":{
                "orderBy":"DESC",
                "sortField":"oc.create_time"
            },
            "firstTabType":10,
            "date1":UTIL.currentMonth(),
            "date2":UTIL.getNowFormatDate()
        }
        APP.request('getsalelist', data).then(
            (res) => {
               let  _listdata = res.data
               this.setData({
                  listDataShort:_listdata
               })
            },
            (err) => {
            }
        );
    }
});
