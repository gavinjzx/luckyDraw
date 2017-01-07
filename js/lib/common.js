/**
 * Created by c-zouzhongxing on 2017/1/4.
 */
//201604260540 by ati 显示
function showDialog(promptStr) {
    var tempStr = "<div class='Dialog'><div><div>" + promptStr + "<div><button class='btnCloseDialog'>确定</button></div></div></div></div>";
    $("body").append(tempStr).find(".Dialog").find("button").on("click", function () {
        DestroyDialog();
    });
}

function DestroyDialog() {
    $(".Dialog").remove();
}

function showConfirm(promptStr, callback) {
    var tempStr = "<div class='Confirm'><div><div>" + promptStr + "<div><button class='btnConfirm'>确定</button><button class='btnReturn'>返回</button></div></div></div></div>";
    $("body").append(tempStr).find(".Confirm").find("button:nth-child(1)").on("click", function () {
        DestroyConfirm();
        if (typeof(callback) == "function") {
            callback();
        }
    }).next().on("click", function () {
        DestroyConfirm();
    });
}
function DestroyConfirm() {
    $(".Confirm").remove();
}


function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
        //显示在页面中间
        $("#showName").val(shuffled[i]);
        $("#showName").delay(800).fadeIn();
    }
    return shuffled.slice(min);
}
//来源于http://www.jb51.net/article/71134.htm
Array.prototype.unique = function () {
    var n = {},
        r = []; //n为hash表，r为临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (!n[this[i]]) //如果hash表中没有当前项
        {
            n[this[i]] = true; //存入hash表
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

//去指定项
Array.prototype.delete = function (arr) {
    //var r = this.repeatedly();
    var b = [];
    for (var i = 0; i < this.length; i++) {
        //console.log(arr);
        if (arr.indexOf(this[i]) < 0) {
            //console.log(this[i] + "留在剩余抽奖人员名单");
            b.push(this[i]);
        }
    }
    return b;
}

//获取重复项
Array.prototype.repeatedly = function () {
    var n = {},
        r = []; //n为hash表，r为临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (!n[this[i]]) //如果hash表中没有当前项
        {
            n[this[i]] = true; //存入hash表
        } else {
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

//去重复项
Array.prototype.deleteRepeatedly = function () {
    var r = this.repeatedly();
    var b = [];
    for (var i = 0; i < this.length; i++) {
        if (r.indexOf(this[i]) < 0) {
            b.push(this[i]);
        }
    }
    return b;
}

//去空内容项
Array.prototype.deleteBlankObj = function () {
    var b = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i].length != 0) {
            b.push(this[i]);
        }
    }
    return b;
};
//http://www.cnblogs.com/banbu/archive/2012/07/25/2607880.html
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}