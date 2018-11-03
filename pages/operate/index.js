const CONFIG = require("../../config/index.js");
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');
import geoJson from '../../utils/mapData.js';
import * as echarts from '../../utils/ec-canvas/echarts';

const APP = getApp();
let Optionbar = {
  init:'', //单位
  name:[],  //名称
  data1:[],  //数据1
  data2:[],  //数据2
  date:[]    //日期
}
//挂货量与销售概况-配置
function setOptionbar(chart) {
  const option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    legend: {
      data: Optionbar.name,
      bottom: 0,
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 40,
      top: 40,
      containLabel: true
    },
    yAxis: [
      {
        name:Optionbar.init,
        nameLocation:'end',
        nameTextStyle:{
          color: '#999',
          padding: [0, 25, 5, 0]
        },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        axisTick: { show: false },
        axisLine:{
          show:false,
          lineStyle:{
            color:"#999"
          }
        },
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: Optionbar.date,
        axisLine: {
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: Optionbar.name[0],
        type: 'bar',
        stack: '总量',
        barWidth: 10, //柱子宽度
        label: {
          normal: {
            show: true,
            position: 'top',
            color: '#666'
          }
        },
        data: Optionbar.data1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFE192'
            }, {
                offset: 1,
                color: '#FD8D59'
            }]),
            opacity: 1,
          }
        }
      },
      {
        name: Optionbar.name[1],
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#666'
          }
        },
        data: Optionbar.data2,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#3288BE'
            }, {
                offset: 1,
                color: '#6DC8E2'
            }]),
            opacity: 1,
          }
        }
      }
    ]
  };
  chart.setOption(option);
}
//成交品种比例(线上购)-配置
function setOptionbar2(chart) {
  let myColor= ['#D53E4F','#FD8D59','#FFDE85','#99DC94'];
  const option = {
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 36,
      containLabel: true
    },
    yAxis: [
      {
        name:"单位(吨)",
        nameLocation:'end',
        nameTextStyle:{
          color: '#999',
          padding: [0, 35, 5, 0]
        },
        type: 'value',
        axisLine: {
          show:false,
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        axisTick:{
          alignWithLabel:true,
          show:false
        },
        splitLine: {
          lineStyle: {
              // 使用深浅的间隔色
              color: ['#E5E5E5']
          }
        },
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['普冷', '热轧', '热镀锌', '酸洗'],
        axisLine: {
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        axisLabel: {
          color: '#666'
        }
        
      }
    ],
    series: [
      {
        name: '成交品种比例',
        type: 'bar',
        barWidth: 15, //柱子宽度
        label: {
          normal: {
            show: true,
            position: 'top',
            color: '#666'
          }
        },
        color: function(params) {
            var num=myColor.length;
            return myColor[params.dataIndex%num]
        },
        data: [1218.513, 2188.441, 692.993, 253.145],
        itemStyle: {
          emphasis: {
            color: '#fff'
          }
        }
      }
    ]
  };
  chart.setOption(option);
}
//交易量(吨)-配置
var data = [
  [10, 500, 30, 50],
  [80, 90, 66, 100],
  [90, 40, 33, 110],
  [50, 60, 40, 80],
  [200, 180, 160, 200],
  [100, 200, 40, 250],
  [80, 90, 66, 100]
]
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
          result.push('-');
          continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
      }
      result.push((sum / dayCount).toFixed(2));
  }
  return result;
}
function setOptionK(chart) {

  var dataMA5 = calculateMA(1, data);
  const option = {
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 20,
      containLabel: true
    },
    xAxis: {
      boundaryGap:true,
      data: ['1', '2', '3', '4', '5', '6', '7'],
      axisTick:{
        alignWithLabel:true,
        show:false
      },
      axisLine:{
        lineStyle:{
          color:"#E5E5E5",
        }
      },
      axisLabel: {
        color: '#999'
      }

    },
    yAxis: {
      max:1000,
      splitNumber:2,
      boundaryGap:true,
      axisTick:{
        alignWithLabel:true,
        show:false
      },
      axisLine:{
        show:false,
        lineStyle:{
          color:"#999"
        }
      },
      splitLine: {
        lineStyle: {
            // 使用深浅的间隔色
            color: ['#E5E5E5']
        }
      },
    },
    series: [{
      type: 'k',
      data: [
        [100, 200, 40, 250],
        [80, 90, 66, 100],
        [90, 40, 33, 110],
        [50, 60, 40, 80],
        [200, 180, 160, 200],
        [100, 200, 40, 250],
        [80, 90, 66, 100]
      ],
      itemStyle: {
        normal: {
          color: '#ff0000',
          color0: '#00ff00',
          borderWidth: 1,
          opacity: 1,
        }
      }
    },{
      name: 'MA5',
      type: 'line',
      data: dataMA5,
      smooth: true,
      showSymbol: false,
      lineStyle: {
          normal: {
              width: 1
          }
      }
  },]
  };
  chart.setOption(option);
}
//销售方式占比-配置
function setOptionPic(chart) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#D53E4F", "#FD8D59", "#FFE18C"],
    legend: {
        orient: 'vertical',
        left: '220',
        top: 'center',
        data: ['公共区','定向区','竞价区']
    },
    series: [{
      label: {
        show: true,
        fontSize: 12,
        position: 'outside',
        color: '#666',
        formatter: '{d}%',
      },
      labelLine: {
        show:false,
        lineStyle: {
          color: '#000'
        }
      },
      type: 'pie',
      clockWise: false,
      radius: ['50', '25'],
      center: ['105', '50%'],
      data: [
        {
          value: 55,
          name: '公共区'
        }, {
          value: 20,
          name: '定向区'
        }, {
          value: 10,
          name: '竞价区'
        }
      ]
    }]
  };
  chart.setOption(option);
}
//业务模式占比-配置
function setOptionPic2(chart) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#E7F598", "#99D695"],
    legend: {
        orient: 'vertical',
        left: '220',
        top: 'center',
        data: ['寄售','托盘']
    },
    series: [{
      label: {
        show: true,
        fontSize: 12,
        position: 'outside',
        color: '#666',
        formatter: '{d}%',
      },
      labelLine: {
        show:false,
        lineStyle: {
          color: '#000'
        }
      },
      type: 'pie',
      clockWise: false,
      radius: ['50', '25'],
      center: ['105', '50%'],
      data: [
        {
          value: 37,
          name: '寄售'
        }, {
          value: 63,
          name: '托盘'
        },
      ]
    }]
  };
  chart.setOption(option);
}
//销售区域分布-配置
let areaColor; //地图块颜色
let areadata; //地图数据
let areapoint;//地图点颜色
function setOptionMap(chart) {
  echarts.registerMap('china', geoJson);
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
                      fontSize:11,
                      color:"#333",
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

function setOptionline(chart) {

  var option = {

    color: ["#008CFF", "#D53E4F"],
    legend: {
      data: ['用户总数', '活跃用户数'],
      bottom: 0,
      left: 'center',
      z: 100
    },
    grid: {
      left: 0,
      right: 10,
      bottom: 40,
      top: 20,
      containLabel: true
    },
    xAxis: {
        type: 'category',
        //boundaryGap:false,
        data: ['1月', '2月', '3月', '4月', '5月'],
        axisTick:{
          alignWithLabel:true,
          show:false
        },
        axisLine:{
          lineStyle:{
            color:"#E5E5E5",
          }
        },
        axisLabel: {
          color: '#999'
        }
    },
    yAxis: {
      max:500,
      splitNumber:2,
      boundaryGap:true,
      axisTick:{
        alignWithLabel:true,
        show:false
      },
      axisLine:{
        show:false,
        lineStyle:{
          color:"#999"
        }
      },
      splitLine: {
        lineStyle: {
            // 使用深浅的间隔色
            color: ['#E5E5E5']
        }
      },
    },
    series: [{
      name: '用户总数',
      type: 'line',
      smooth: true,
      data: [58, 136, 165, 130, 178, 140, 133]
    }, {
      name: '活跃用户数',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }]
  };
  chart.setOption(option);
}


Page({
    data: {
      isShowToast: 0,
      title: '',
      icon: '',
        showTab:1,  //当前Tab
        scrollH:0,  //可滚动视图区域高度
        iconDomain: GLOBAL.iconDomain, //图标
        ecDate:['最近七天'], //假数据
        ecStartingTime:UTIL.shorTime(UTIL.get7DaysBefore(UTIL.getNowFormatDate())),
        ecEndTime:UTIL.shorTime(UTIL.getNowFormatDate()),
        ecK:{
           lazyLoad: true 
        },
        ecBar: {
          lazyLoad: true 
      },
      ecBar: {
        lazyLoad: true 
      },
      ecMap:{
        lazyLoad: true 
      },
      ecPie:{
        lazyLoad: true
      },
      ecline:{
        lazyLoad: true
      },
      areaDataTable:[], //地图表格数据
      isDisposed:false  //图表显示
    },
    
    onLoad() {
      this.setData({
        scrollH: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth/ 750 * 86) + 'px'
      });
      this.setUp();
    },
    //默认
    setUp:function(){
      let tab = this.data.showTab;
      this.title();
      //清除图表
      this.dispose("chart");
      this.dispose("Kchart");
      this.dispose("barchart");
      this.dispose("picChart");
      this.dispose("picChart2");
      this.dispose("Mapchart");
      this.dispose("lineChart");
      //判断图表显示区域
      setTimeout(() => {
        this.setData({
            isDisposed: false
        });
        if(tab == 1){
          this.initChart("#amount-chart","KChart",setOptionK);
          this.hangingEC();
          this.saleEcMap();
          this.initChart("#deal-Variety","barChart",setOptionbar2);
          this.initChart("#sales-mode","picChart",setOptionPic);
          this.initChart("#business-mode","picChart2",setOptionPic2);
          
        }else{
          this.userEcMap();
          this.initChart("#user-number","lineChart",setOptionline);
          this.userEc();
        }
      }, 500);
    },
    //改变Tab
    changeTab:function(e){
        //TAB切换
        let tab = e.currentTarget.dataset.tab;
        this.setData({
            showTab:tab
        })
        this.setUp();
    },
    //区域分布标题
    title:function(){
      let showTab = this.data.showTab
      if(showTab == 2){
          this.setData({
              areaTitle:"用户区域分布",
              subtitle:"用户量排行榜TOP5",
              amountName:"个数"
          })
      }else{
          this.setData({
              areaTitle:"挂货量区域分布",
              subtitle:"挂货量排行榜TOP5",
              amountName:"吨数"
          })
      }
    },
    //销售区域分布
    saleEcMap:function(){
      let params = {
          userId:APP.globalData.userId,
          companyId: APP.globalData.companyId,
      };
      APP.request('packagesWeight', params).then(
          (res) => {
              areaColor =['#df6867','#fcc4c0']
              areapoint = "#38fcae"
              let map_data = res.data
              let _map_data = map_data.sort(UTIL.compare("value"));
              areadata = _map_data
              this.setData({
                  areaDataTable : _map_data
              })
              this.initChart("#sale-ecMap","Mapchart",setOptionMap);
          },
          (err) => {}
      );
    },
    //用户区域分布
    userEcMap:function(){
      let params = {
          userId:APP.globalData.userId,
          companyId: APP.globalData.companyId,
      };
      APP.request('userAreaCount', params).then(
          (res) => {
              areaColor =['#6cbfdc','#c4eafa'],
              areapoint = "#ed556f"
              let map_data = res.data
              let _map_data = map_data.sort(UTIL.compare("value"));
              areadata = _map_data
              this.setData({
                  areaDataTable : _map_data
              })
              this.initChart("#sale-ecMap","Mapchart",setOptionMap);
          },
          (err) => {}
      );
    },
    //挂货量与销售概况
    hangingEC:function(){
      Optionbar.init ="单位(吨)";
      Optionbar.name=["销售量",'挂货量']
      Optionbar.data1 = [120, 102, 141, 174, 190, 250, 226 ]
      Optionbar.data2 = [-20, -32, -21, -34, -90, -130, -110]
      Optionbar.date =['1','2','3','4','5','6','7']
      this.initChart("#hanging-goods","chart",setOptionbar);
    },
    //新用户与流失用户
    userEc:function(){
      Optionbar.init ="单位(个)";
      Optionbar.name=["新增用户",'流失用户']
      Optionbar.data1 = [120, 102, 141, 174, 190, 250, 220]
      Optionbar.data2 = [-20, -32, -21, -34, -90, -130, -110]
      Optionbar.date =['1','2','3','4','5','6','7']
      this.initChart("#hanging-goods","chart",setOptionbar);
    },



























    // 初始化图表
    initChart: function (id,chart,setOption) {
      this.selectComponent(id).init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        setOption(chart);
        this.chart = chart;
        return chart;
      });
    },
    //清除图表
    dispose: function (chart) {
      if (this.chart) {
        this.chart.dispose();
      }
      this.setData({
        isDisposed: true
      });
    }
});


