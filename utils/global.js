/**
 * @file: 全局域名，变量
 */

'use strict';

var develop = true; // 环境配置 false-发布环境 true-开发环境
var iconTestDomain = 'http://uat-cdn.devopsteel.cn/static/img/miniapp/'; // 图标测试域名
var iconProductionDomain = 'https://cdn.opsteel.cn/static/img/miniapp/'; // 图标正式域名

var imgTestDomain = 'http://uat-cdn.devopsteel.cn/static/img/face/s/'; // 请求图片测试域名
var imgProductionDomain = 'https://cdn.opsteel.cn/static/img/face/s/'; // 请求图片正式域名

var global = {
    iconDomain: develop? iconTestDomain : iconProductionDomain, // 图标域名
    imgDomain: develop? imgTestDomain : imgProductionDomain // 图片域名
};

module.exports = global;