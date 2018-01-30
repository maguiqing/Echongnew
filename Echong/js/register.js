$("#yz").html(getCode());
$("#btn").click(function(){
	$("#yz").html(getCode());
})
$(".btn").mouseenter(function(){
	$(this).css("background","#33cb98")
})
$(".btn").mouseleave(function(){
	$(this).css("background","#fff")
})
$("input").blur(function(){
	$(this).css("color","#ffbb9e");
})
$("form").submit(function(){
	if(flagname && flagupwd && flagqpwd){
	   var ujson = {
				"uname" : $("#uname").val(),
				"upwd" : $("#upwd").val()
			}
			//存cookie
	setCookie("ulist", JSON.stringify( ujson ) );
	return true;	
	}else{
		return false;
	}
})
$("#phone").blur(function(){
	var reg = /^1(3|5|7|8)\d{9}$/;
	$("#a1").css("display","block");
	if(reg.test($(this).val())){
		$("#a1").html("正确")
	}else{
		$("#a1").html("请输入11位电话号码")
	}
})
$("#yz1").blur(function(){
	$("#a2").css("display","block");
	var val=$(this).val();
	if($("#yz").html()==val){
		$("#a2").html("正确")
	}else{
		$("#a2").html("请输入图片验证码")
	}
})
var flagname=null;
$("#uname").blur(function(){
   var reg=/^\w{4,20}$/;
   $("#a3").css("display","block");
   if(reg.test($(this).val())){
   	$("#a3").html("正确");
   	flagname=true;
   }else{
   	$("#a3").html("请输入4-20位用户名");
   	flagname=false;
   }
})
var flagupwd=null;

var regNum = /\d+/;
var regChar = /[a-z]+/i;
var regOth = /[!@#$%^&*]+/;
	//只能有数字  字母  特殊字符 三个正则
var _regNum = /^\d+$/;
var _regChar = /^[a-z]+$/i;
var _regOth = /^[!@#$%^&*]+$/;
	
$("#upwd").keyup(function(){
 
  var str = $(this).val();
	$("#box").css("display","block");
	$("#a4").css("display","block");
		//长度小于5  不做处理
		if(	str.length < 5 ){		
			//排他处理
			$("#r").css("background","#ccc");
			$("#z").css("background","#ccc");
			$("#q").css("background","#ccc");
			 flagupwd=false;
			$("#a4").html("请输入至少5位密码");
			return;
		}
		//排他处理
		$("#r").css("background","#ccc");
		$("#z").css("background","#ccc");
		$("#q").css("background","#ccc");
		
		if( _regNum.test(str) || _regChar.test(str) || _regOth.test(str) ){
			flagupwd=true;//弱
			$("#a4").html("正确");
			$("#r").css("background","orange");
			
		}else if( regNum.test(str) && regChar.test(str) && regOth.test(str) ){ //强  即包含数字 又包含字母  又包含特殊字符
			$("#q").css("background","orange");
			flagupwd=true;
			$("#a4").html("正确");
		}else{
			$("#z").css("background","orange");
			flagupwd=true;
			$("#a4").html("正确");
		}
}) 
var flagqpwd=null;
$("#qpwd").blur(function(){
	$("#a5").css("display","block");
	if($("#upwd").val()==$("#qpwd").val()){
		flagqpwd=true;
		$("#a5").html("正确");
	}
	else{
		flagqpwd=false;
		$("#a5").html("两次密码不一致");
	}
})















