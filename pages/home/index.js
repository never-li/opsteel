// 首页 home/index.js

const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');
import * as echarts from '../../utils/ec-canvas/echarts';
import geoJson from '../../utils/mapData.js';

let chart = null;
let areaColor; //地图块颜色
let areadata; //地图数据
let areapoint;//地图点颜色

//地图设置
function setOption(chart) {
    let option = {
        legend: {
            show:false,
            orient: 'vertical',
            left: 'left',
            data:['area-data'],
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            color: areaColor, //地图颜色
            itemWidth:10,
            itemHeight:60,
            left:8,
            bottom:-10
        },
        series: [
            {
                name: 'area-data',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        fontSize:10,
                        color:"#666",
                        show: true
                    },
                },
                itemStyle: {
                    normal: {
                        color: areapoint  ,//点颜色
                    }
                },
                data:areadata
            }
        ]
    };
    chart.setOption(option);
}
Page({
    data: {
        ec: {
            lazyLoad: true
        },
        scanIcon: GLOBAL.iconDomain + 'icon-scan.png',
        searchIcon: GLOBAL.iconDomain + 'icon-search.png',
        isShowToast: 0,
        title: '',
        icon: '',
        imgUrls: [
            GLOBAL.iconDomain + "home-banner.png"
        ], // 广告
        iconsGroup:[
            {
                id: 1,
                gruopIcon: GLOBAL.iconDomain + "icon-resource.png",
                name: "图片上传",
                url:"/pages/resource/index",
                role:'SV-XS-SM-PIM',
                type: 1,
                isHidden: 0,
                isShow: 1
            },
            {
                id: 2,
                gruopIcon: GLOBAL.iconDomain + "icon-finance.png",
                name: "金融服务",
                url:"/pages/finance/index",
                role:1,
                type: 2,
                isHidden: 1,
                isShow: 0
            },
            {
                id: 3,
                gruopIcon: GLOBAL.iconDomain + "icon-approval.png",
                name: "流程审批",
                url:"/pages/approval/index",
                role:'SV-WX',
                type: 3,
                isHidden: 1,
                isShow: 0
            },
            {
                id: 4,
                gruopIcon: GLOBAL.iconDomain + "icon-purchase.png",
                name: "采购分析",
                url:"/pages/purchase/index",
                role:'SV-CG',
                type: 4,
                isHidden: 0,
                isShow: 1
            },
            {
                id: 5,
                gruopIcon: GLOBAL.iconDomain + "icon-sale.png",
                name: "销售分析",
                url:"/pages/purchase/index",
                role:'SV-XS',
                type: 5,
                isHidden: 0,
                isShow: 1
            },
            {
                id: 6,
                gruopIcon: GLOBAL.iconDomain + "icon-operate.png",
                name: "经营报告",
                url:"/pages/operate/index",
                role:'SV-WX',
                type: 6,
                isHidden: 0,
                isShow: 0
            }
        ],//图标组
        role:null,  //角色 1、普通用户 2、领导
        companyPrivilegeCodes: [],
        areaTitle:'', //标题
        subtitle:'',//次标题
        amountName:"",//类项名称
        areaDataTable:[]//区域数据
        
    },
    // 初始化图表
    init() {
        this.ecComponent.init((canvas, width, height) => {
            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            canvas.setChart(chart);
            echarts.registerMap('china', geoJson);
            setOption(chart);
            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            this.chart = chart;
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });
    },
    //点击图标
    tapMdl(e) {
        APP.isAuth().then(
            (val) => {
                if (!val) return;
                let _target = e.currentTarget.dataset;
                wx.navigateTo({
                    url: _target.url+'?title='+ _target.name +'&type='+ _target.type 
                });
            }
        );
    },
    checkRole(role) {
        return this.data.companyPrivilegeCodes.includes(role);
    },
    //标题
    title() {
        if (APP.globalData.token && this.checkRole('SV-WX')) {
            this.setData({
                areaTitle:"用户区域分布",
                subtitle:"用户量排行榜TOP5",
                amountName:"个数"
            });
        } else {
            this.setData({
                areaTitle:"挂货量区域分布",
                subtitle:"挂货量排行榜TOP5",
                amountName:"吨数"
            });
        };
    },
    //切换地图数据
    chartsMap() {
        if(APP.globalData.token && this.checkRole('SV-WX')) {
            // 领导-用户量排行
            areaColor =['#df6867','#fcc4c0'];
            areapoint = "#38fcae";
            APP.request('userAreaCount').then(
                (res) => {
                    let map_data = res.data
                    let _map_data = map_data.sort(UTIL.compare("value"));
                    areadata = _map_data
                    this.setData({
                        areaDataTable : _map_data
                    })
                    this.ecComponent = this.selectComponent('#mychart-dom-bar');
                    this.init();
                }
            );
        } else {
            // 用户-挂货量区域分布
            areaColor =['#6cbfdc','#c4eafa'];
            areapoint = "#ed556f";
            APP.request('packagesWeight').then(
                (res) => {
                    let map_data = res.data
                    let _map_data = map_data.sort(UTIL.compare("value"));
                    areadata = _map_data
                    this.setData({
                        areaDataTable : _map_data
                    })
                    this.ecComponent = this.selectComponent('#mychart-dom-bar');
                    this.init();
                }
            );
        };
    },
    goSearch() {
        wx.navigateTo({
            url: '/pages/mall/search'
        });
    },
    goScan() {
        APP.goScan();
    },
    onShow() {
        if (APP.globalData.token) {
            this.setData({
                companyPrivilegeCodes: APP.globalData.companyPrivilegeCodes
            });
            this.data.iconsGroup.map((item) => {
                item.isShow = (this.data.companyPrivilegeCodes.includes(item.role))? 1 : 0;
                if (item.role == 'SV-XS' || item.role == 'SV-CG') {
                    item.isShow = 1;
                };
            });
            this.setData({
                iconsGroup: this.data.iconsGroup
            });
        } else {
            this.data.iconsGroup.map((item) => {
                if (item.role == 'SV-XS' || item.role == 'SV-CG') {
                    item.isShow = 1;
                } else {
                    item.isShow = 0;
                };
            });
            this.setData({
                iconsGroup: this.data.iconsGroup
            });
        };
        this.chartsMap();
        this.title();
    }
});
