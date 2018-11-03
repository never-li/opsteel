const APP = getApp();

Page({
    data: {
        isShowToast: 0,
        title: '',
        icon: '',
        companyName: '', // 名称
        taxNum: '', // 税号
        bank: '', // 开户行
        bankAccount: '', // 开户行账号
        billAddress: '', // 开票地址
        refundBankName: '', // 收退款银行
        refundBankAccount: '', // 收退款账号
        billTel: '', // 开票电话
        faxNum: '', // 传真
        taxTypeArr: [
            {
                code: '1',
                value: '是',
                checked: 1
            },
            {
                code: '0',
                value: '否',
                checked: 0
            }
        ], // 一般纳税人
        taxType: 1, // 一般纳税人
        companyInfo: {},
        companyDetailInfo: {},
        baseBankAccountInfo: {}
    },
    // 名称
    companyNameInput(e) {
        this.setData({
            companyName: e.detail.value
        });
    },
    // 查询税号
    checkTaxNum() {
        if (!this.data.companyName) return;
        APP.request('taxNumCheck', { companyName: this.data.companyName }).then(
            (res) => {
                this.setData({
                    companyName: res.data[0].companyName,
                    taxNum: res.data[0].taxpayerNumber
                });
            }
        );
    },
    // 开户行
    bankInput(e) {
        this.setData({
            bank: e.detail.value
        });
    },
    // 开户行账号
    bankAccountInput(e) {
        this.setData({
            bankAccount: e.detail.value
        });
    },
    // 开票地址
    billAddressInput(e) {
        this.setData({
            billAddress: e.detail.value
        });
    },
    // 开票电话
    billTelInput(e) {
        this.setData({
            billTel: e.detail.value
        });
    },
    // 收退款银行
    refundBankNameInput(e) {
        this.setData({
            refundBankName: e.detail.value
        });
    },
    // 收退款账号
    refundBankAccountInput(e) {
        this.setData({
            refundBankAccount: e.detail.value
        });
    },
    // 传真
    faxNumInput(e) {
        this.setData({
            faxNum: e.detail.value
        });
    },
    // 一般纳税人
    taxTypeChange(e) {
        this.setData({
            taxType: e.detail.value
        });
    },
    // 去认证
    goAuth() {
        let _data = {
            companyName: this.data.companyName,
            taxNum: this.data.taxNum,
            bank: this.data.bank,
            bankAccount: this.data.bankAccount,
            billAddress: this.data.billAddress,
            billTel: this.data.billTel,
            refundBankName: this.data.refundBankName,
            refundBankAccount: this.data.refundBankAccount,
            taxType: this.data.taxType,
            faxNum: this.data.faxNum || ''
        };
        if (!_data.companyName) {
            APP.showToast({
                title: '请输入名称'
            });
            return;
        };
        if (!_data.taxNum) {
            APP.showToast({
                title: '请输入税号'
            });
            return;
        };
        if (!_data.bank) {
            APP.showToast({
                title: '请输入开户行'
            });
            return;
        };
        if (!_data.bankAccount) {
            APP.showToast({
                title: '请输开户行账号'
            });
            return;
        };
        if (!_data.billAddress) {
            APP.showToast({
                title: '请输入开票地址'
            });
            return;
        };
        if (!_data.billTel) {
            APP.showToast({
                title: '请输入开票电话'
            });
            return;
        };
        if (!_data.refundBankName) {
            APP.showToast({
                title: '请输入收/退款银行'
            });
            return;
        };
        if (!_data.refundBankAccount) {
            APP.showToast({
                title: '请输入收/退款账号'
            });
            return;
        };
        if (!_data.taxType) {
            APP.showToast({
                title: '请选择一般纳税人'
            });
            return;
        };
        let authData = {
            companyName: _data.companyName,
            taxNum: _data.taxNum,
            bank: _data.bank,
            bankAccount: _data.bankAccount,
            billAddress: _data.billAddress,
            billTel: _data.billTel,
            refundBankName: _data.refundBankName,
            refundBankAccount: _data.refundBankAccount,
            taxType: _data.taxType,
            faxNum: _data.faxNum
        };
        wx.setStorageSync('authData', authData);
        wx.navigateTo({
            url: '/pages/user/companyInfo/certificationStep-1'
        });
    },
    onLoad() {
        APP.request('getCompanyInfo').then(
            (res) => {
                this.setData({
                    companyInfo: res.data.companyInfo
                });
                if (res.data.companyDetailInfo) {
                    this.setData({
                        companyDetailInfo: res.data.companyDetailInfo
                    });
                };
                if (res.data.baseBankAccountInfo) {
                    this.setData({
                        baseBankAccountInfo: res.data.baseBankAccountInfo
                    });
                };
            }
        );
    }
})