const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        mobile: '', // 旧手机号
        mobileValue: '', // 手机号
        mobileSucc: 0
    },
    // 手机号输入
    mobileInput(e) {
        this.setData({
            mobileValue: e.detail.value
        });
        if (this.data.mobileValue.length == 11) {
            this.setData({
                mobileSucc: 1
            });
        } else {
            this.setData({
                mobileSucc: 0
            });
        };
    },
    // 获取验证码
    nextStep() {
        if (!this.data.mobileSucc) return;

        const PHONEPATTERN = /^(1[3,4,5,6,7,8,9])\d{9}$/;
        if (!PHONEPATTERN.test(this.data.mobileValue)) {
            APP.showToast({
                title: '手机号格式不正确'
            });
            this.setData({
                mobileSucc: 0
            });
            return;
        };

        let params = {
            mobilePhone: this.data.mobileValue
        };
        APP.request('changeMobileMsg', params).then(
            (res) => {
                wx.navigateTo({
                    url: '/pages/user/personInfo/changeMobileStep-2?mobile=' + this.data.mobileValue
                });
            }
        );
    },
    onLoad(opts) {
        this.setData({
            mobile: opts.mobile
        });
    }
})