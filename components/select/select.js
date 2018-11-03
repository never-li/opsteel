const APP = getApp();
const GLOBAL = require('../../utils/global.js');
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        selectData:{
            type:Array,
            value:[],
            observer:function(newData,oldData){
            }
        }
    },
    data: {
        iconDomain: GLOBAL.iconDomain,
        checkItemData:[], //选中数据
        arrowUp:true, //收起状态
        checkWeight:0,
        collapsetxt:"收起"
    },
    methods: {
        //添加选择属性
        addSelect:function(){
            let _data = this.data;
            _data.checkedAll = false;
            _data.selectData.map((item)=>{
                item.checked = false;
            });
            this.setData({
                selectData: _data.selectData
            });
        },
        //选中
        checkItem:function(e){
            let _target = e.currentTarget.dataset,
                _data = this.data,
                _checkedData = [];
                _data.selectData.map((item)=>{
                    if(item.id == _target.id){
                        item.checked = !item.checked;
                    }
                    if(item.checked){
                        _checkedData.push(item);
                    }
                });
                let _checkedDataLength = Object.keys(_checkedData).length,
                    _selectDataLength = Object.keys(_data.selectData).length
                if(_checkedDataLength <= 0 || _checkedDataLength < _selectDataLength){
                   this.setData({
                        checkedAll:false
                   })
                }
                if(_checkedDataLength == _selectDataLength ){
                    this.setData({
                        checkedAll:true
                   })
                }
                //更新
                this.setData({
                    selectData: _data.selectData,
                    checkItemData:_checkedData
                });
                this.checkevent();
        },
        //全选
        checkAll:function(){
            let _data = this.data,
                _checkedData =[];
            _data.checkedAll = !_data.checkedAll;
            //console.log(_data.checkedAll)
            if(_data.checkedAll){
                _data.selectData.map((item)=>{
                    if(item.checked ==! true){
                        item.checked = true;
                    };
                })
            }else{
                _data.selectData.map((item)=>{
                    if(item.checked){
                        item.checked = false;
                    };
                }) 
            }
            _data.selectData.map((item)=>{
                if(item.checked){
                    _checkedData.push(item);
                }
            })
            
            //更新
            this.setData({
                selectData: _data.selectData,
                checkItemData:_checkedData,
                checkedAll:_data.checkedAll
            });
            this.checkevent();
            
        },
        //事件
        checkevent:function(){
            let params = {},
                _data = this.data,
                _weight = 0;
            _data.checkItemData.map((item)=>{
                if(item.weight){
                    _weight += item.weight
                }
            })
            this.setData({
                checkWeight:_weight
            })
            if(Object.keys(_data.checkItemData).length > 0){
                let _checkedArr = [];
                _data.checkItemData.map((item)=>{
                    _checkedArr.push(item.id);
                })
                params.checkedData = _checkedArr;
            }

            //父事件
            this.triggerEvent('Select', params);
        },
        //收起
        checkCollapse:function(){
            this.setData({
                arrowUp:!this.data.arrowUp
            })
        }
    },
    ready() {
        this.addSelect()
    },
    attached() {}
})