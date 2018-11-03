/**
 * @file: 公共方法
*/


const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
const dataType = ['Number', 'String', 'Function', 'Boolean', 'Object', 'Array', 'Date'];
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

// 时间格式化
const formatDate = {
    // 时间格式化
    format: function (date, pattern) {
        (DataType.isString(date) || DataType.isNumber(date)) && (date = new Date(date));
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function ($0) {
            switch ($0.charAt(0)) {
                case 'y': return padding(date.getFullYear(), $0.length);
                case 'M': return padding(date.getMonth() + 1, $0.length);
                case 'd': return padding(date.getDate(), $0.length);
                case 'w': return date.getDay() + 1;
                case 'h': return padding(date.getHours(), $0.length);
                case 'm': return padding(date.getMinutes(), $0.length);
                case 's': return padding(date.getSeconds(), $0.length);
            }
        });
    }
};

// 判断数据类型判断
const DataType = {};
for (var i = 0; i < dataType.length; i++) {
    DataType['is' + dataType[i]] = (function (_type) {
        return function (_data) {
            return {}.toString.call(_data) == '[object ' + _type + ']';
        }
    })(dataType[i]);
};

// 价格格式化
const parsePrice = (num) => {
    return num = num? parseFloat(num).toFixed(2) : 0;
};

// 重量格式化
const parseWeight = (num) => {
    return num = num? parseFloat(num).toFixed(3) : 0;
};

//最近7天
function get7DaysBefore(date){
    var date = date || new Date(),
        timestamp, newDate;
    if(!(date instanceof Date)){
        date = new Date(date.replace(/-/g, '/'));
    }
    timestamp = date.getTime();
    newDate = new Date(timestamp - 7 * 24 * 3600 * 1000);
    var month = newDate.getMonth() + 1,
        strDate = newDate.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return [newDate.getFullYear(), month, strDate].join('-');
}
//最近一个月
function getPreMonth(date) {
    var arr = [];
    var year = null; //获取当前日期的年份
    var month = null; //获取当前日期的月份
    var day = null; //获取当前日期的日
    if(typeof(date) == "string"){
        arr = date.split('-');
        year = arr[0]; //获取当前日期的年份
        month = arr[1]; //获取当前日期的月份
        day = arr[2]; //获取当前日期的日
    }else if(typeof(date) == "date"){
        year = nowDate.getFullYear(); //获取当前日期的年份
        month = nowDate.getMonth(); //获取当前日期的月份
        day = nowDate.getDate(); //获取当前日期的日
    }

    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
//最近三个月
function getPreSomeMonth(date,date2) {
    var arr = [];
    var year = null; //获取当前日期的年份
    var month = null; //获取当前日期的月份
    var day = null; //获取当前日期的日
    if(typeof(date) == "string"){
        arr = date.split('-');
        year = arr[0]; //获取当前日期的年份
        month = arr[1]; //获取当前日期的月份
        day = arr[2]; //获取当前日期的日
    }else if(typeof(date) == "date"){
        year = nowDate.getFullYear(); //获取当前日期的年份
        month = nowDate.getMonth(); //获取当前日期的月份
        day = nowDate.getDate(); //获取当前日期的日
    }

    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - date2 || 3;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
//当时时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//时间格式化 18/07/23
function shorTime(date){
    var date = date || new Date();
    var arry = date.split("-");
    var y = arry[0].substr(arry[0].length-2);
    var m = arry[1]
    var d = arry[2]
    var Time = y + "/" + m + "/" + d
    return Time
}

function currentMonth (){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    return  year + "-" + month + "-01"
}
 //排序
function compare (property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value2 - value1;     //降序
    }
}
module.exports = {
    getNowFormatDate,
    getPreSomeMonth,
    getPreMonth,
    get7DaysBefore,
    shorTime,
    currentMonth,
    compare,

    formatDate,
    parsePrice,
    parseWeight,
    ...DataType
}
