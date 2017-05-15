$(function(){
	
	/*轮播*/
	$(".bg_03_ri_top").slide({	
		mainCell:".bd>ul",
		effect:"left",
		vis:"4",
		effect:"leftLoop",
		pnLoop:false,
		delayTime:'1000'
	})				

	$(".bg_06_bot").slide({
		mainCell:".bd>ul",
		effect:"fold",
		trigger:"click",
		autoPlay:"true",
		delayTime:'2000'
	})
	
    if (jQuery.browser.version < 7) {
        $(".roll").css({ "overflow-y": "auto" })
    } else {
        $(".roll").mCustomScrollbar({
            scrollInertia:400,
            autoDraggerLength: false,
            advanced: {
                updateOnContentResize: true
            }

        });
    }
	//回到顶部
	$(window).scroll(function(e){
		if($(window).scrollTop()>=300){
			$(".actGotop").fadeIn(300);
		}else{
			$(".actGotop").fadeOut(300);
		}
	})
	$(".actGotop").click(function(){
		$("html,body").animate({scrollTop:0},500);
	})
	
	//提交报名
    $('#btnOrder').click(function(){
        var ret = validationNew();
        console.log($('#groupForm').serialize())
        if(ret) {
            //保存栏目信息
            $.ajax({
                type: 'POST',
                url: "http://tuangou.mycar168.com/apply/japplynew",
                data: $('#groupForm').serialize(),
                dataType: 'jsonp',
                success: function (ret) {
                	console.log(ret);
                    if(ret['ret']==1){
                        alert(ret['msg']);
                    } else {
                        alert(ret['msg']);
                    }
                }
            });
        }
    });
    

    function validationNew (){
        var username = $('#pepName').val(); //用户名
        var tel = $('#pepNum').val(); //手机
        var cartype = $('#carType').val(); //车型
        //var areaname = $('#area_name').val(); //地区
        if(cartype == ''){
            alert('请填写意向车型');
            return false;
        }
        if(username == ''){
            alert('请填写您的姓名');
            return false;
        }
        if(tel == ''){
            alert('请填写您的手机号');
            return false;
        } else {
            if(!isMobel(tel)){
                alert("请输入正确的手机号码");
                return false;
            }
        }
        return true;
    }   
    function isMobel(value) {
	    //if (/^13\d{9}$/g.test(value) || (/^15[0-35-9]\d{8}$/g.test(value)) || (/^18[05-9]\d{8}$/g.test(value))) {
	    if (/^13\d{9}$/g.test(value) || (/^15\d{9}$/g.test(value)) || (/^18\d{9}$/g.test(value)) || (/^19\d{9}$/g.test(value))) {
	        return true;
	    } else {
	        return false;
	    }
	}
})