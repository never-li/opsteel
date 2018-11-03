const APP = getApp();
const GLOBAL = require('../../../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        selected:false, //选中
        inputShow:false,//输入框显示
        // 输入框参数设置
        inputData: {
            input_value: "",//输入框的初始内容
            value_length: 0,//输入框密码位数
            isNext: false,//是否有下一步的按钮
            get_focus: true,//输入框的聚焦状态
            focus_class: true,//输入框聚焦样式
            value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
            height: "98rpx",//输入框高度
            width: "604rpx",//输入框宽度
            see: false,//是否明文展示
            interval: true,//是否显示间隔格子
        }
    },
    onLoad: function (opts) {
       
    },
    //选择
    choose:function(){
        this.setData({
            selected:!this.data.selected
        })
    },
    //下一步
    nextStep:function(){
        let selected = this.data.selected;
        if(selected){
           this.setData({
                inputShow:true
           })
        }
    },
    // 当组件输入数字6位数时的自定义函数
    valueSix() {
        wx.redirectTo({
            url:'../refund/success'
        })
    },

});