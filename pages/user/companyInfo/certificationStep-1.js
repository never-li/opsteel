// pages/user/companyInfo/certificationStep-1.js
const APP = getApp();
const GLOBAL = require('../../../utils/global.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        isThree: 0,
        version: 1, // 0 三证合一  1 非三证
        // === 上传状态
        isUploadThree: 0, // 三证合一
        isUploadLicense: 0, // 营业执照
        isUploadOrganization: 0, // 组织机构代码证
        isUploadTax: 0, // 税务登记证
        isUploadBill: 0, // 开票资料
        isUploadIdcard: 0, // 法人代表身份证（正面）
        // === 预览地址
        previewUrls: {
            three: '',
            businessLicense: '',
            organizationCode: '',
            taxCertificate: '',
            billInfo: '',
            legalPerson: '',
        },
        authData: {},
    },
    // 切换
    switchChange(e) {
        this.setData({
            isThree: e.detail.value
        });
        if (this.data.isThree) {
            this.setData({
                version: 0
            });
        } else {
            this.setData({
                version: 1
            });
        };
    },
    // 上传
    chooseImage(e) {
        let opts = {};
        opts.name = e.currentTarget.dataset.type;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                if (res.tempFiles[0].size >= 2097152) {
                    APP.showToast({
                        title: '图片大小不能超出2M'
                    });
                    return;
                };
                opts.path = res.tempFilePaths[0];
                this.uploadImage(opts);
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    uploadImage(data) {
        APP.uploadImage({
            url: 'uploadAuth',
            path: data.path,
            name: data.name,
            formData: {
                imageName: data.name,
                companyId: APP.globalData.companyId
            }
        }).then(
            (url) => {
                let _this = this;
                if (data.name == 'three') {
                    _this.setData({
                        isUploadThree: 1,
                        ['previewUrls.three']: url
                    });
                } else if (data.name == 'businessLicense') {
                    _this.setData({
                        isUploadLicense: 1,
                        ['previewUrls.businessLicense']: url
                    });
                } else if (data.name == 'organizationCode') {
                    _this.setData({
                        isUploadOrganization: 1,
                        ['previewUrls.organizationCode']: url
                    });
                } else if (data.name == 'taxCertificate') {
                    _this.setData({
                        isUploadTax: 1,
                        ['previewUrls.taxCertificate']: url
                    });
                } else if (data.name == 'billInfo') {
                    _this.setData({
                        isUploadBill: 1,
                        ['previewUrls.billInfo']: url
                    });
                } else if (data.name == 'legalPerson') {
                    _this.setData({
                        isUploadIdcard: 1,
                        ['previewUrls.legalPerson']: url
                    });
                };
                setTimeout(() => {
                    APP.showToast({
                        icon: GLOBAL.iconDomain + 'toast-succ.png',
                        title: '上传成功',
                        duaration: 1000
                    });
                }, 200);
            }
        );
    },
    // 预览
    previewImage(e) {
        let _urlStr = e.currentTarget.dataset.url,
            _random = Math.floor(Math.random() * 50 + 1),
            _url = [];

        _urlStr += '?=v' + _random;
        _url.push(_urlStr);
        wx.previewImage({
            urls: _url
        });
    },
    // 提交
    submit() {
        let _data = this.data,
            _url = this.data.previewUrls;
        if ((!_url.three && (!_url.businessLicense || !_url.organizationCode || !_url.taxCertificate)) || !_url.billInfo) return;
        let params = _data.authData;
        params.version = _data.version;
        params.companyId = APP.globalData.companyId;
        params.billInfoUrl = _url.billInfo;
        params.legalPersonUrl = _url.legalPerson;
        if (_data.version == 0) {
            params.threeUrl = _url.three;
        } else {
            params.businessLicenseUrl = _url.businessLicense;
            params.organizationCodeUrl = _url.organizationCode;
            params.taxCertificateUrl = _url.taxCertificate;
        };
        APP.request('companyAuth', params).then(
            (res) => {
                wx.reLaunch({
                    url: '/pages/user/companyInfo/certificationStep-2'
                });
            }
        );
    },
    onLoad() {
        this.setData({
            authData: wx.getStorageSync('authData')
        });
    }
})