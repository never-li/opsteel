const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        noMore: {
            type: Object,
            value: 0
        }
    },
    data: {
        loadingIcon: GLOBAL.iconDomain + 'icon-loading.png'
    },
    methods: {},
    ready() {},
    attached() {}
})