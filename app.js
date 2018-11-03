//app.js
const CONFIG = require('config/index.js');
const GLOBAL = require('utils/global.js');
const WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
const APPID = 'wxce1c5bd8d3046de4';
const APPSECRET = 'e79cd900f06ccf0332028f9be1a93caf';

App({
    onLaunch: function (opts) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
        });
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请重启应用',
                success: function (res) {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    };
                }
            });
        });
        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        });
        if (wx.getStorageSync('token')) {
            this.globalData.token = wx.getStorageSync('token');
            this.globalData.openId = wx.getStorageSync('openId');
            this.globalData.userId = wx.getStorageSync('userId');
            this.globalData.appId = wx.getStorageSync('appId');
            this.globalData.companyId = wx.getStorageSync('companyId');
            this.globalData.companyPrivilegeCodes = wx.getStorageSync('companyPrivilegeCodes');
            this.globalData.companyNameVos = wx.getStorageSync('companyNameVos');
            this.globalData.typeData = wx.getStorageSync('typeData');
            this.globalData.smallTypeData = wx.getStorageSync('smallTypeData');
            this.globalData.originWeightData = wx.getStorageSync('originWeightData');
            this.globalData.storageData = wx.getStorageSync('storageData');
        };
    },
    // 全局数据
    globalData: {
        token: '',
        openId: '',
        userId: null,
        appId: null,
        companyId: null,
        companyPrivilegeCodes: [],
        companyNameVos: [],
        typeData: [], // 品种
        smallTypeData: [], // 小品种
        originWeightData: [], // 产地
        storageData: [] // 存放地
    },
    // 排除Loading
    isExcludeLoading(url) {
        let excludeUrl = [
            'getStaffInfo', // 职员管理
            'getXianhuoList', // 现货列表
            'getOrderList', // 订单列表
            'getGoodsList', // 到货列表
            'getPackageList', // 捆包信息管理列表
            'refreshUserInfo', // 刷新用户登录信息
            'checkAccountStatus', // 检查公司是否被冻结
            'getsalelist' // 销售/采购列表
        ];
        if (excludeUrl.includes(url)) return true;
    },
    // 排除status
    isExcludeStatus(url) {
        let excludeUrl = [
            'createXianhuoOrder', // 【结算-现货】生成订单
            'checkGoodsBillStatus', // 【结算-到货】检查赎单状态
            'confirmPayData', // 【结算】付款确认界面
            'checkAccountStatus', // 检查公司是否被冻结
            'getPackageImg' // 捆包实物图片-查看
        ];
        if (excludeUrl.includes(url)) return true;
    },
    // 网络请求
    request(url, data, header, method) {
        if (!this.isExcludeLoading(url)) {
            this.showLoading();
        };
        return new Promise((resolve, reject) => {
            let reqHead = {};
            if (this.globalData.token) {
                reqHead = {
                    'WX-Token': this.globalData.token
                };
            };
            header = header || reqHead;
            method = method || 'POST';
            data = data || {};
            if (!CONFIG.api[url]) {
                this.showModal({
                    content: '接口路径有误！'
                });
                return;
            };
            let _url = CONFIG.api[url] || CONFIG.apiDomain,
                _this = this;
            
            wx.request({
                url: _url,
                data: data,
                header: header,
                method: method,
                success: (res) => {
                    if (!_this.isExcludeLoading(url)) {
                        _this.hideLoading();
                    };
                    if (res.statusCode == 200) {
                        // 未登录
                        if (res.data.status == 401) {
                            _this.clearStorage();
                            _this.unLogModal();
                        } else {
                            if (res.data.status == 1) {
                                resolve(res.data);
                            } else {
                                if (!_this.isExcludeStatus(url)) {
                                    reject(res.data);
                                    _this.showToast({
                                        title: res.data.message
                                    });
                                } else {
                                    reject(res.data);
                                };
                            };
                        };
                    } else if (res.statusCode == 502 || res.message.includes('服务器错误: Connection refused')) {
                        reject(res);
                        _this.showToast({
                            title: '服务器重启中，请稍后再试'
                        });
                    } else {
                        reject(res.errMsg);
                        _this.showToast({
                            title: res.errMsg
                        });
                    };
                },
                fail: (err) => {
                    if (!_this.isExcludeLoading(url)) {
                        _this.hideLoading();
                    };
                    reject(err);
                }
            });
        });
    },
    // 检查帐号状态
    isAuth() {
        return new Promise((resolve, reject) => {
            this.request('refreshUserInfo', { companyId: wx.getStorageSync('companyId') }).then(
                (res) => {
                    let _this = this;
                    _this.request('checkAccountStatus').then(
                        (state) => {
                            resolve(true);
                        },
                        (err) => {
                            // 返回状态码（1:认证通过;4:认证中;5:未认证;6:账户冻结;-1：登录信息为空）
                            if (err.status == -1) {
                                _this.clearStorage();
                                _this.unLogModal();
                            } else if (err.status == 4) {
                                _this.showModal({
                                    content: '帐号正在认证中，请耐心等待。'
                                });
                            } else if (err.status == 5) {
                                _this.showModal({
                                    title: '未认证帐号无法在线交易',
                                    content: '您的帐号未认证，请先认证。',
                                    success(res) {
                                        if (res.confirm) {
                                            wx.navigateTo({
                                                url: '/pages/user/companyInfo/index'
                                            });
                                        };
                                    }
                                });
                            } else if (err.status == 6) {
                                _this.showModal({
                                    title: '您的帐号已冻结',
                                    content: '您已违约三次，帐号已被冻结暂时不支持购买，请联系客服进行解冻。'
                                });
                            };
                            reject(false);
                        }
                    )
                },
                (err) => {}
            );
        });
    },
    // 清除本地缓存
    clearStorage() {
        wx.removeStorageSync('token');
        wx.removeStorageSync('openId');
        wx.removeStorageSync('userId');
        wx.removeStorageSync('appId');
        wx.removeStorageSync('companyId');
        wx.removeStorageSync('mobile');
        wx.removeStorageSync('logo');
        wx.removeStorageSync('companyPrivilegeCodes');
        wx.removeStorageSync('companyNameVos');
        wx.removeStorageSync('typeData');
        wx.removeStorageSync('smallTypeData');
        wx.removeStorageSync('originWeightData');
        wx.removeStorageSync('storageData');
        wx.removeStorageSync('cartDt');
        wx.removeStorageSync('xianhuoObj');
        wx.removeStorageSync('orderObj');
        wx.removeStorageSync('goodsObj');
        wx.removeStorageSync('freightVo');
        wx.removeStorageSync('historyData');
        wx.removeStorageSync('scanList');
        wx.removeStorageSync('authData');
        wx.removeStorageSync('oneEnter');
        this.globalData = {
            token: '',
            openId: '',
            userId: null,
            appId: null,
            companyId: null,
            companyPrivilegeCodes: [],
            companyNameVos: [],
            typeData: [], // 品种
            smallTypeData: [], // 小品种
            originWeightData: [], // 产地
            storageData: [] // 存放地
        };
    },
    // 未登录提示框
    unLogModal() {
        this.showModal({
            content: '您还未登录，请登录后再进行操作',
            confirmText: '去登录',
            showCancel: true,
            success(res) {
                if (res.confirm) {
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/user/login/index'
                        });
                    }, 300);
                };
            }
        });
    },
    // 登录
    login(params) {
        return new Promise((resolve, reject) => {
            this.request('login', params).then(
                (res) => {
                    // 返回信息---
                    // int id; // 主键(userId)
                    // String appId; // 应用id
                    // Integer companyId; // 公司id
                    // String companyName; // 公司名
                    // String companyNameAbbr; //公司名简称
                    // Integer departmentId; // 部门id
                    // String username; // 用户名
                    // String mobile; // 手机号
                    // String mailing; // email
                    // Integer userStatus; // 用户状态（0：正常，1：禁用）
                    // Integer companyStatus; // 公司状态（0：初始值，10:正常，其他值如有请维护）
                    // Integer companyActiveStatus;// 启用状态：10，启用；20，停用
                    // List<String> urls; // 用户权限可访问地址
                    resolve(res);
                    let _this = this,
                        _data = res.data;
                    wx.setStorageSync('token', _data.ticket); // token令牌
                    wx.setStorageSync('userId', _data.id); // userId
                    wx.setStorageSync('appId', _data.appId); // appId
                    wx.setStorageSync('companyId', _data.companyId); // companyId
                    wx.setStorageSync('username', _data.username); // username
                    wx.setStorageSync('mobile', _data.mobile); // mobile
                    wx.setStorageSync('logo', _data.logo); // logo 头像
                    wx.setStorageSync('companyPrivilegeCodes', _data.companyPrivilegeCodes); // companyPrivilegeCodes
                    if (_data.companyNameVos) {
                        wx.setStorageSync('companyNameVos', _data.companyNameVos); // companyNameVos
                        _this.globalData.companyNameVos = wx.getStorageSync('companyNameVos');
                    };
                    
                    _this.globalData.token = wx.getStorageSync('token');
                    _this.globalData.openId = wx.getStorageSync('openId');
                    _this.globalData.userId = wx.getStorageSync('userId');
                    _this.globalData.appId = wx.getStorageSync('appId');
                    _this.globalData.companyId = wx.getStorageSync('companyId');
                    _this.globalData.companyPrivilegeCodes = wx.getStorageSync('companyPrivilegeCodes');
                },
                (err) => {
                    reject(err.data);
                    this.showToast({
                        title: err.message
                    });
                }
            );
        })
    },
    // 微信授权登录
    wxLogin() {
        if (this.globalData.openId) return;
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        let _this = this;
                        wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            data:{
                                appid: APPID,
                                secret: APPSECRET,
                                js_code: res.code,
                                grant_type:'authorization_code'
                            },
                            success: (res) => {
                                var _WXBizDataCrypt = new WXBizDataCrypt(APPID, res.data.session_key);
                                wx.getUserInfo({
                                    withCredentials: true,
                                    success: (res) => {
                                        console.log(res)
                                        var userInfo = _WXBizDataCrypt.decryptData(res.encryptedData, res.iv);
                                        resolve(userInfo);
                                        console.log(userInfo)
                                        wx.setStorageSync('openId', userInfo.openId);
                                        _this.globalData.openId = userInfo.openId;
                                    },
                                    fail: (err) => {
                                        reject(err);
                                    }
                                });
                            },
                            fail: (err) => {
                                reject(err);
                            }
                        })
                    } else {
                        reject(res.errMsg);
                        _this.showToast({
                            title: res.errMsg
                        });
                    };
                }
            });
        });
    },
    // 过滤条件
    loadFilter() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let p1 = this.request('getProductType').then(
                (res) => {
                    let _tempObj = res.data,
                        _tempData = [];

                    for (var i in _tempObj) {
                        let _obj = {};
                        _obj.code = i;
                        _obj.name= _tempObj[i];
                        _tempData.push(_obj);
                    };
                    wx.setStorageSync('typeData', _tempData);
                    _this.globalData.typeData = wx.getStorageSync('typeData');
                },
                (err) => {}
            );
            let p2 = this.request('getProduct').then(
                (res) => {
                    let _tempObj = res.data,
                        _tempData = [];

                    for (var i in _tempObj) {
                        let _obj = {};
                        _obj.code = i;
                        _obj.name= _tempObj[i];
                        _tempData.push(_obj);
                    };
                    wx.setStorageSync('smallTypeData', _tempData);
                    _this.globalData.smallTypeData = wx.getStorageSync('smallTypeData');
                },
                (err) => {}
            );
            let p3 = this.request('getProducingArea').then(
                (res) => {
                    let _tempData = [];
                    res.data.map((item) => {
                        let _obj = {};
                        _obj.code = item.code;
                        _obj.name = item.name;
                        _tempData.push(_obj);
                    });
                    wx.setStorageSync('originWeightData', _tempData);
                    _this.globalData.originWeightData = wx.getStorageSync('originWeightData');
                },
                (err) => {}
            );
            let p4 = this.request('getStoragePlace').then(
                (res) => {
                    let _tempObj = res.data,
                        _tempData = [];

                    for (var i in _tempObj) {
                        let _obj = {};
                        _obj.code = i;
                        _obj.name= _tempObj[i].name;
                        _tempData.push(_obj);
                    };
                    wx.setStorageSync('storageData', _tempData);
                    _this.globalData.storageData = wx.getStorageSync('storageData');
                },
                (err) => {}
            );
            Promise.all([p1, p2, p3, p4]).then(
                (res) => {
                    resolve(true);
                },
                (err) => {
                    reject(false);
                }
            );
        });
    },
    // 上传图片
    uploadImage(opts = {}) {
        this.showLoading({
            title: '上传中...'
        });
        return new Promise((resolve, reject) => {
            let header = {};
            if (this.globalData.token) {
                header = {
                    'content-type': 'multipart/form-data',
                    'WX-Token': this.globalData.token
                };
            };
            if (!CONFIG.api[opts.url]) {
                this.showModal({
                    content: '接口路径有误！'
                });
                return;
            };
            opts.formData = opts.formData || {};
            let _this = this,
                _url = CONFIG.api[opts.url] || CONFIG.apiDomain;
            wx.uploadFile({
                url: _url,
                filePath: opts.path,
                name: opts.name,
                header: header,
                formData: opts.formData,
                success: (res) => {
                    _this.hideLoading();
                    if (res.statusCode == 200) {
                        let _res = JSON.parse(res.data);
                        if (_res.status == 401) {
                            _this.clearStorage();
                            _this.unLogModal();
                        };
                        if (_res.status == 1) {
                            resolve(_res.data);
                        } else {
                            if (!_this.isExcludeStatus(opts.url)) {
                                reject(res.data);
                                _this.showToast({
                                    title: res.data.message
                                });
                            } else {
                                reject(res.data);
                            };
                        };
                    } else {
                        reject(res.errMsg);
                        _this.showToast({
                            title: res.errMsg
                        });
                    };
                },
                fail: (err) => {
                    _this.hideLoading();
                    reject(err.errMsg);
                }
            });
        });
    },
    // 扫码
    checkRole(role) {
        return this.globalData.companyPrivilegeCodes.includes(role);
    },
    goScan() {
        wx.scanCode({
            success: (res) => {
                if (res.result) {
                    // 扫码登录
                    if (res.result.includes('wx/account/wxRichScan/')) {
                        let _idx = res.result.indexOf('=');
                        let _wxrslgToken = res.result.substring(_idx+1);
                        wx.navigateTo({
                            url: '/pages/user/login/scanLogin?wxrslgToken=' + _wxrslgToken
                        });
                    } else if (res.result.includes('http') && !res.result.includes('wx/account/wxRichScan/')) {
                        // 其他二维码
                        this.showToast({
                            title: '不合法二维码!'
                        });
                    } else {
                        // 图片上传
                        if (this.checkRole('SV-XS-SM-PIM')) {
                            wx.navigateTo({
                                url: '/pages/resource/list?result=' + res.result
                            });
                        } else {
                            this.showToast({
                                title: '暂无图片上传权限!'
                            });
                        };
                    };
                } else {
                    this.showToast({
                        title: '无法识别该二维码!'
                    });
                };
            }
        });
    },
    // 模态弹窗
    showModal(opt = {}) {
        wx.showModal({
            title: opt.title || '',
            content: opt.content || '未知错误',
            confirmColor: '#008CFF',
            confirmText: opt.confirmText || '确定',
            showCancel: opt.showCancel || false,
            success: opt.success || ''
        });
    },
    cartModal(msg) {
        this.showModal({
            content: msg,
        });
    },
    // loading提示框
    showLoading(opt = {}) {
        wx.showLoading({
            title: opt.title || '加载中...',
            mask: opt.mask || true,
            success: opt.success || ''
        });
    },
    // 隐藏loading
    hideLoading() {
        wx.hideLoading();
    },
    // 消息提示框
    showToast(opts = {}) {
        let pages = getCurrentPages(),
            _this = pages[pages.length - 1],
            duaration = opts.duaration || 1500;
        _this.setData({
            isShowToast: 1,
            icon: opts.icon || GLOBAL.iconDomain + 'toast-error.png',
            title: opts.title || '未知错误'
        });
        setTimeout(() => {
            _this.setData({
                isShowToast: 0
            });
        }, duaration);
    },
})