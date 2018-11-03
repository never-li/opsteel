// pages/user/index.js
const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        logo: '',
        username: '',
        mobile: '',
        companyName: '',
        companyId: null, // 当前登录的公司id
        companyAuthStatus: null,
        companyNameVos: [],
        selectedUserName: '', // 参数
        showPopup: 0,
        infoList: [
            {
                id: 1,
                name: '我的账户'
            },
            {
                id: 2,
                name: '公司信息'
            },
            {
                id: 3,
                name: '个人信息'
            },
            {
                id: 4,
                name: '职员管理'
            },
            {
                id: 5,
                name: '修改密码'
            }
        ]
    },
    // 显示公司列表
    showCompanyName() {
        if (!this.data.companyNameVos.length) return;
        wx.hideTabBar();
        setTimeout(() => {
            this.setData({
                showPopup: 1
            });
        }, 300);
        this.data.companyNameVos.map((item) => {
            item.checked = 0;
            if (item.companyId == this.data.companyId) {
                item.checked = 1;
            };
        });
        this.setData({
            companyNameVos: this.data.companyNameVos
        });
    },
    // 选择公司
    selCompanyName (e) {
        let _item = e.currentTarget.dataset.item;
        this.data.companyNameVos.map((item) => {
            if (_item.companyId == item.companyId) {
                item.checked = 1;
            } else {
                item.checked = 0;
            };
        });
        this.setData({
            selectedUserName: _item.userName,
            companyNameVos: this.data.companyNameVos
        });
    },
    // 关闭弹框
    cancelPopup () {
        this.setData({
            showPopup: 0
        });
        setTimeout(() => {
            wx.showTabBar();
        }, 300);
    },
    // 切换登录
    changeLogin() {
        APP.request('selectLogin', { username: this.data.selectedUserName }).then(
            (res) => {
                APP.showToast({
                    title: res.message,
                    icon: GLOBAL.iconDomain + 'toast-succ.png'
                });
                this.setData({
                    showPopup: 0
                });
                let _data = res.data;
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
                    APP.globalData.companyNameVos = wx.getStorageSync('companyNameVos');
                };
                
                APP.globalData.token = wx.getStorageSync('token');
                APP.globalData.userId = wx.getStorageSync('userId');
                APP.globalData.appId = wx.getStorageSync('appId');
                APP.globalData.companyId = wx.getStorageSync('companyId');
                APP.globalData.companyPrivilegeCodes = wx.getStorageSync('companyPrivilegeCodes');
                setTimeout(() => {
                    wx.showTabBar();
                    wx.switchTab({
                        url: '/pages/home/index'
                    });
                }, 200);
            },
        );
    },
    goInfo(e) {
        let _id = e.currentTarget.dataset.id;
        if (_id == 1) {
            wx.navigateTo({
                url: '/pages/user/accountInfo/index'
            });
        } else if (_id == 2) {
            wx.navigateTo({
                url: '/pages/user/companyInfo/index'
            });
        } else if (_id == 3) {
            wx.navigateTo({
                url: '/pages/user/personInfo/index'
            });
        } else if (_id == 4) {
            wx.navigateTo({
                url: '/pages/user/staffManagement/index'
            });
        } else {
            wx.navigateTo({
                url: '/pages/user/changePassword/index'
            });
        };
    },
    // 退出登录
    logOut() {
        if (!APP.globalData.token) {
            APP.unLogModal();
            return;
        };
        APP.showModal({
            content: '确定退出登录？',
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    APP.request('logOut').then(
                        (res) => {
                            APP.clearStorage();
                        }
                    );
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/user/login/index'
                        });
                    }, 300);
                };
            }
        });
    },
    onShow() {
        APP.request('getCompanyInfo').then(
            (res) => {
                let _res = res.data.companyInfo;
                this.setData({
                    companyName: _res.name || '',
                    companyAuthStatus: _res.authStatus // 认证状态：10，未认证；20，认证中；30，认证通过；40，认证不通过
                });
            }
        );
        if (APP.globalData.token) {
            this.setData({
                username: wx.getStorageSync('username'),
                mobile: wx.getStorageSync('mobile'),
                logo:  wx.getStorageSync('logo') || this.data.iconDomain + 'icon-user.png'
            });
        };
        if (APP.globalData.companyNameVos) {
            this.setData({
                companyId: APP.globalData.companyId,
                companyNameVos: APP.globalData.companyNameVos
            });
        };
    }
})