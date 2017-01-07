//抽奖人员名单
var allPerson = "蔡国瑜;曹正一;曾隆海;曾耀衡;陈观斌;陈军;陈军俊;陈倩雯;陈毓新;崔惠海;戴锦霞;段斌;樊清华;方林;符运琼;付坤;付文静;付园园;龚小龙;古冬苗;古举标;官鑫;何若兵;洪俊凯;侯斌;侯莉;胡军;胡伟澎;胡晓;黄欢茂;黄玲;黄星心;黄泽辉;黄志博;蒋明;金矿;赖礼通;赖婷婷;兰方权;李成国;李国庆;李吉庆;李兰兰;李良;李鹏程;李胜康;李涛;李未波;李咸良;李小红;李鑫;李焱;梁家寶;林珊珊;林伟俊;刘婧娟;刘玫;刘权;刘小燕;刘新星;刘曜玮;刘奕;卢丽花;罗宇峰;吕春杰;苗继业;莫忧;南良改;潘志健;彭海锋;彭科达;彭钟涛;乔新;石浩;宋超;宋浩;苏鸿;谭秀梅;田冰;田晶;田力玮;汪鑫;王刚正;王晶;王立伟;王石林;王政阳;韦振勇;吴海荣;吴家胜;吴俊;吴晏琳;向真明;徐良;许海芬;闫海燕;杨广霞;杨力平;杨涛;杨志明;叶辰;叶华浩;殷雪;张丹丹;张华宁;张辉武;张娟;张敏;张清云;张勇;张志强;郑大鹏;周萍;朱然威;李铎;崔丽洁;吴耀红;温先木;李奕邦;郭学端;李伟;刘玉灼;周成威;盛子凡;刘佳;刘宇航;曾冬资;王巍;张晶;邱东;陈龙;郑威;刘伟雄;叶丽娟;谭剑颖;丁鹏;李江洲;姜萌萌;彭华婴;李德林;黎宇;叶强;师新会;冯绍文;林海强;潘冰冰;彭见峡;卢军良;江山;王义;甘伊璇;刘倩;龚京栋;闵冬;张宜羡;徐龙瑞;邹中兴;廖华衡;胡斌;周孝雄;时攀;苏路凯;李丽冲;彭启;曹安琥;廖宜源;黄荣发;严小锋;郭春艳";
//领导人员名单
var leaderArr = ["方林", "宋浩", "叶辰", "田力玮", "樊清华", "张勇", "蒋明", "官鑫", "李国庆", "赖礼通", "石浩", "杨广霞"];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
