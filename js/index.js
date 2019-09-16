$(function(){
    var originWidth = $(".progress").width();
    $(".rules").click(function(){
        $(".rule").stop().fadeIn(100);
    });
    $(".rule>a").click(function(){
        $(".rule").stop().fadeOut(100);
    });
    $(".begin").click(function(){
        $(this).stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
    });
    $(".rebegin").click(function(){
        $(".mask").stop().fadeOut(100);
        $(".progress").css({
            width:originWidth
        });
        progressHandler();
        startWolfAnimation();
    });
    function progressHandler(){
        $(".score").text(0);
        var time = setInterval(function(){
            var progressWidth = $(".progress").width();
            progressWidth -= 1;
            $(".progress").css({
                width:progressWidth
            });
            if(progressWidth <= 0){
                endWolfAnimation();
                clearInterval(time);
                $(".mask").stop().fadeIn(100);
            }
        },100);
    };
    var wolfTimer;
    function startWolfAnimation(){
        var wolf_1 = ['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png',];
        var wolf_2 = ['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png',];
        var arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"},
        ];
        var $wolfImg = $("<img src=\"\" class='wolfImage'>");
        var posIndex = Math.round(Math.random() * 8 );
        var wolfType = Math.round(Math.random())==0?wolf_1:wolf_2;
        $wolfImg.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        console.log(wolfIndex, wolfIndexEnd);
        wolfTimer = setInterval(function(){
            if(wolfIndex>wolfIndexEnd){
                clearInterval(wolfTimer);
                $wolfImg.remove();
                startWolfAnimation();
            }
            wolfIndex++;
            $wolfImg.attr("src",wolfType[wolfIndex]);
        },300);
        $(".container").append($wolfImg);
        gameRule($wolfImg);
    };
    function endWolfAnimation(){
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    };
    function gameRule($wolfImg){
        //只执行一次动作
        $wolfImg.one("click",function(){
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            var $src = $(this).attr("src");
            var flag = $src.indexOf("h") >= 0;
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);

            }else{
                $(".score").text(parseInt($(".score").text())-10);
            }
        });
    };
});