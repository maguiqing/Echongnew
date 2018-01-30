var json=getCookie("ulist")
$("#btn").click(function(){
	if($("#tname").val()==json.uname && $("#tpwd").val()==json.upwd){
		alert("登录成功");
		return true;
	}
	else{
		alert("登录失败");
		location.reload();
		return false;
	}
})
