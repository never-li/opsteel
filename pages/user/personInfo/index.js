const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        editIcon: GLOBAL.iconDomain + 'icon-edit.png',
        isShowToast: 0,
        title: '',
        icon: '',
        showMask: 0,
        userInfo: {},
        linkmanValue: ''
    },
    // 打开弹框
    showMask() {
        this.setData({
            showMask: 1
        });
    },
    // 关闭弹框
    closeMask() {
        this.setData({
            showMask: 0
        });
    },
    // 输入新姓名
    linkmanInput(e) {
        this.setData({
            linkmanValue: e.detail.value
        });
    },
    // 保存新姓名
    updateNickname() {
        let params = {
            linkman: this.data.linkmanValue,
            companyId: APP.globalData.companyId,
            companyName: this.data.userInfo.companyName,
            userId: APP.globalData.userId,
            mobilePhone: wx.getStorageSync('mobile')
        };
        APP.request('updateUserInfo', params).then(
            (res) => {
                APP.showToast({
                    icon: GLOBAL.iconDomain + 'toast-succ.png',
                    title: res.data,
                    duaration: 1000
                });
                setTimeout(() => {
                    this.setData({
                        showMask: 0,
                        'userInfo.nickname': this.data.linkmanValue
                    });
                }, 1100);
            }
        );
    },
    // 跳转修改手机号
    goChangeMobile(e) {
        wx.navigateTo({
            url: '/pages/user/personInfo/changeMobileStep-1?mobile=' + e.currentTarget.dataset.mobile
        });
    },
    onLoad() {
        let params = {
            userName: wx.getStorageSync('username'),
            companyId: APP.globalData.companyId
        };
        APP.request('getUserInfo', params).then(
            (res) => {
                this.setData({
                    userInfo: res.data
                });
            }
        );
    }
})