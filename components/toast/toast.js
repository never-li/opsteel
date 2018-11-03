const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        isShowToast: {
            type: Object,
            value: 0
        },
        icon: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        }
    },
    data: {
    },
    methods: {},
    ready() {},
    attached() {}
})