const APP = getApp();
const GLOBAL = require('../../utils/global.js');
const UTIL = require('../../utils/util.js');

Page({
    data: {
        iconDomain: GLOBAL.iconDomain,
        imgDomain: GLOBAL.imgDomain,
        isShowToast: 0,
        title: '',
        icon: '',
        scrollH: 0,
        goodsId: '',
        packCode: '', // 捆包号
        imgList: [], // 实物图片
        dt: {}, // 详情
        tempFiles: [],
        isFront: 0,
        isSticker: 0,
        isSide: 0,
        fileName: {
            front: '',
            sticker: '',
            side: ''
        },
        previewUrls: {
            front: '',
            sticker: '',
            side: ''
        }, // 图片预览
    },
    // 选图片
    chooseImage(e) {
        let _this = this,
            _type = e.currentTarget.dataset.type,
            _tempFiles = this.data.tempFiles;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                if (res.tempFiles[0].size >= 1048576) {
                    APP.showToast({
                        title: '图片大小不能超出1M'
                    });
                    return;
                };
                let _tempArr = [],
                    _paths = res.tempFilePaths;
                _paths.map((item) => {
                    let _obj = {};
                    _obj.type = _type;
                    _obj.path = item;
                    _obj.packageCode = _this.data.packCode;
                    _obj.imageName = _this.data.packCode + '-' + _type;
                    if (_type == 1) {
                        _this.setData({
                            'previewUrls.front': _obj.path,
                            isFront: 1
                        });
                    } else if (_type == 2) {
                        _this.setData({
                            'previewUrls.sticker': _obj.path,
                            isSticker: 1
                        });
                    } else if (_type == 3) {
                        _this.setData({
                            'previewUrls.side': _obj.path,
                            isSide: 1
                        });
                    };
                    _tempArr.push(_obj);
                });
                _tempFiles = _tempFiles.concat(_tempArr);
                _this.setData({
                    tempFiles: _tempFiles
                });
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    saveImage() {
        let _data = this.data;
        if (!_data.tempFiles.length || !_data.isFront || !_data.isSticker || !_data.isSide) return;
        let isSucc = [];
        _data.tempFiles.map((item) => {
            isSucc.push(this.uploadImage(item));
        });
        Promise.all(isSucc).then(
            (res) => {
                if (isSucc.length == _data.tempFiles.length) {
                    setTimeout(() => {
                        APP.showToast({
                            icon: GLOBAL.iconDomain + 'toast-succ.png',
                            title: '保存成功',
                            duaration: 1000
                        });
                        this.setData({
                            tempFiles: []
                        });
                    }, 300);
                    let _resourceDt = {
                        packCode: _data.packCode
                    };
                    wx.setStorageSync('resourceDt', _resourceDt);
                } else {
                    setTimeout(() => {
                        APP.showToast({
                            title: '保存失败',
                            duaration: 1000
                        });
                    }, 500);
                };
            }
        );
    },
    uploadImage(opts) {
        return new Promise((resolve, reject) => {
            APP.uploadImage({
                url: 'uploadPackageImg',
                path: opts.path,
                name: opts.imageName,
                formData: {
                    packageCode: opts.packageCode,
                    imageName: opts.imageName
                }
            }).then(
                (res) => {
                    resolve(true);
                },
                (err) => {
                    reject(false);
                }
            )
        })
    },
    // 预览
    previewImage(e) {
        let _urlStr = e.currentTarget.dataset.url,
            _url = [],
            _data = this.data;
        if (_data.previewUrls.front) {
            _url.push(_data.previewUrls.front);
        };
        if (_data.previewUrls.sticker) {
            _url.push(_data.previewUrls.sticker);
        };
        if (_data.previewUrls.side) {
            _url.push(_data.previewUrls.side);
        };
        wx.previewImage({
            current: _urlStr,
            urls: _url
        });
    },
    // 删除
    deleteImage(e) {
        APP.showModal({
            showCancel: true,
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    let _this = this,
                        _target = e.currentTarget.dataset;
                    
                    if (_target.name) {
                        // 已上传删除
                        let params = {
                            packCode: _this.data.packCode,
                            type: 30,
                            fileName: _target.name
                        };
                        APP.request('deletePackageImg', params).then(
                            (res) => {
                                _this.showToast();
                                if (_target.type == 1) {
                                    _this.setData({
                                        'previewUrls.front': '',
                                        'fileName.front': '',
                                        isFront: 0
                                    });
                                } else if (_target.type == 2) {
                                    _this.setData({
                                        'previewUrls.sticker': '',
                                        'fileName.sticker': '',
                                        isSticker: 0
                                    });
                                } else if (_target.type == 3) {
                                    _this.setData({
                                        'previewUrls.side': '',
                                        'fileName.side': '',
                                        isSide: 0
                                    });
                                };
                            },
                            (err) =>{
                                APP.showToast({
                                    title: err.message
                                });
                            }
                        );
                    } else {
                        // 未上传删除
                        _this.showToast();
                        _this.data.tempFiles.map((item, index, arr) => {
                            if (item.type == _target.type) {
                                arr.splice(index, 1);
                            };
                        });
                        if (_target.type == 1) {
                            _this.setData({
                                'previewUrls.front': '',
                                isFront: 0
                            });
                        } else if (_target.type == 2) {
                            _this.setData({
                                'previewUrls.sticker': '',
                                isSticker: 0
                            });
                        } else if (_target.type == 3) {
                            _this.setData({
                                'previewUrls.side': '',
                                isSide: 0
                            });
                        };
                    };
                }
            }
        })
    },
    showToast() {
        APP.showToast({
            icon: GLOBAL.iconDomain + 'toast-succ.png',
            title: '删除成功',
            duaration: 1000
        });
    },
    loadDetail() {
        APP.request('getXianhuoDetail', { goodsId: this.data.goodsId }).then(
            (res) => {
                let _dt = res.data.packagesVo;
                _dt.column2 = _dt.column2? _dt.column2.split(',') : '';
                _dt.price = UTIL.parsePrice(_dt.price);
                _dt.weight = UTIL.parseWeight(_dt.weight);
                _dt.uploadTime = _dt.uploadTime? UTIL.formatDate.format(_dt.uploadTime) : '—';
                _dt.inDate = _dt.inDate? UTIL.formatDate.format(_dt.inDate) : '—';
                _dt.outDate = _dt.outDate? UTIL.formatDate.format(_dt.outDate) : '—';
                this.setData({
                    dt: _dt
                });
            }
        );
        APP.request('getPackageImg', { packCode: this.data.packCode }).then(
            (res) => {
                let _imgList = res.data;
                if (_imgList.length > 0) {
                    _imgList.map((item) => {
                        item.count = item.fileName;
                        let _idx = item.count.lastIndexOf('-');
                        item.count = item.count.substr(_idx+1, 1);
                        if (item.count == 1) {
                            this.setData({
                                'previewUrls.front': item.picPath,
                                'fileName.front': item.fileName,
                                isFront: 1
                            });
                        } else if (item.count == 2) {
                            this.setData({
                                'previewUrls.sticker': item.picPath,
                                'fileName.sticker': item.fileName,
                                isSticker: 1
                            });
                        } else if (item.count == 3) {
                            this.setData({
                                'previewUrls.side': item.picPath,
                                'fileName.side': item.fileName,
                                isSide: 1
                            });
                        };
                    });
                };
                this.setData({
                    imgList: _imgList
                });
            }
        )
    },
    onLoad(opts) {
        this.setData({
            goodsId: opts.goodsId,
            packCode: opts.packCode
        });
        this.setData({
            scrollH: (wx.getSystemInfoSync().windowHeight) + 'px'
        });
        this.loadDetail();
    }
});
