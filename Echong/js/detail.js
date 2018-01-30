var list=$id("ulone").children;
var content=$id("content").children;
 var index=0;
  for(var i=0;i<list.length;i++){
  	   list[i].index=i;
  	   list[i].onmouseover=function(){
  	   	   
  	   	   for(var i=0;i<list.length;i++){
  	   	   	 
  	   	   	 list[i].style.background="#fff";
  	   	     content[i].style.display="none";
  	   	   }
  	   	list[this.index].style.background="#b52816";
         content[this.index].style.display="block";
         content[this.index].style.	zIndex=10;
  	   }
  	   list[i].onmouseout=function(){ 
  	   	    content[this.index].style.display="none";
  	   }
  	   
  }
  $cons=$(".content1").children();
	for(var i=0;i<$cons.length;i++){
		$cons.eq(i).mouseenter(function(){
			$(this).find("img").animate({"left":-27,"opacity":1},500);
		  }
	   ).mouseleave(function(){
		$(this).find("img").animate({"left":0,"opacity":0},500);
	   })
	}
//ajax请求
//http://127.0.0.1/Echong/detail.html?pid=shop01&cname=classify001
 var str=location.href;
   str=str.split("?")[1];
   var pid=str.split("&")[0].split("=")[1];
   var cname=str.split("&")[1].split("=")[1];
  $.ajax({
  	url:"js/data.json",
  	type:"get",
  	success:function(json){
  		var page="";
  		var str="";
  		var _str="";
  		var mes="";
  		
  		for(var i=0;i<json[cname].list.length;i++){
  			var pro=json[cname].list[i];
  			if(pid==pro.id  ){
  				page+=`<img src="image/${pro.src}" style="z-Index:1" alt="" id="mm"/> 
					    <img src="image/2b.jpg" alt=""/> 
					    <img src="image/3b.jpg" alt=""/> 
					    <img src="image/4b.jpg" alt=""/> 
					    <div id="mask" style="display: none;"></div>  `
  				str+=`<p>市场价：<span>￥23.90</span></p>
			    		<p>E宠价：<span>${pro.price}元</span></p>`
  				_str=`<p><a href="">[多件优惠]</a>${pro.name}</p>
			    		<span>磨牙/洁齿/添营养 黄绿包装随机发</span>`
  				mes=`<p>E宠快递15点前下单，其他快递16点前下单，当天发货</p>
			    		<input type="button" data-name="${pro.name}" data-src="${pro.src}" data-price="${pro.price}" data-id="${pro.id}" id="btn" value="加入购物车"/>`
  			}
  		}
  		$(".mainleft #box .small").html(page);
  		$(".div2").html(str);
  		$(".div1").html(_str);
  		$(".div7").html(mes);
  	}
  })
  //三级联动
  var provArr=["辽宁","山西","河北"]
  var cityArr=[["沈阳","大连","铁岭"],["大同","太原"],["邯郸","石家庄","唐山","雄安"]]
  var countyArr=[[["s1","s2"],["d1"],["昌图","莲花乡"]],[["t1","t2"],["y1"]],[["h1"],["s1","s2"],["tangshan1"],["xiongan1"]]]
 $(function(){
 	for(var i=0;i<provArr.length;i++){
 		$("#prov").append("<option value='"+i+"'>"+provArr[i]+"</option>")
 	}
 })
 $("#prov").change(function(){
 	$("#city").html('<option value="">请选择市</option>')
 	var index=$(this).val();
 	var _cityArr=cityArr[index];
 	
 	for(var i=0;i<_cityArr.length;i++){
 		$("#city").append("<option value='"+index+"-"+i+"'>"+_cityArr[i]+"</option>")
 	}
 })
 $("#city").change(function(){
 	$("#county").html('<option value="">请选择县</option>')
    var str=$(this).val();
    var provIndex=str.split("-")[0];
    var cityIndex=str.split("-")[1];
    var _countyArr=countyArr[provIndex][cityIndex];
    for(var i=0;i<_countyArr.length;i++){
 		$("#county").append("<option value=''>"+_countyArr[i]+"</option>")
 	}
 })
 //放大镜
 $("#bottom li").mouseenter(function(){
 	   $(this).css("border","1px solid #4c9605")
 	          .siblings()
 	          .css("border","1px solid #e4e4e4")
 		var index=$(this).index();
 		$(".small img").eq(index)
 		               .show()
 		               .siblings("img")
 		               .hide();
 		               
 		$("#big img").eq(index)
 		             .show()
 		             .siblings()
 		             .hide();
 	})
 
 	$("#small").mousemove(function(e){
 		var e=e||event;
 		var x=e.pageX-$("#box").offset().left-$("#mask").outerWidth()/2;
 		var y=e.pageY-$("#box").offset().top-$("#mask").outerHeight()/2;
 		var maxL=$("#box").outerWidth()-$("#mask").outerWidth();
 		var maxT=$("#box").outerHeight()-$("#mask").outerHeight();
 		x=Math.min(maxL,Math.max(0,x));
 		y=Math.min(maxT,Math.max(0,y));
 		$("#mask").css({"left":x,"top":y});
 		$(".bigImage").css({"left":-x*800/350,"top":-y*800/350})
 	})
 	$("#small").mouseenter(function(){
 		$("#big").css("display","block");
 		$("#mask").css("display","block");
 	})
 	$("#small").mouseleave(function(){
 		$("#big").css("display","none");
 		$("#mask").css("display","none");
 	})
//购物车
$(".div7").on("click","input",function(){
	var arr=[];
	var flag=true;
	var json={
		id:$(this).data("id"),
		name:$(this).data("name"),
		price:$(this).data("price"),
		src:$(this).data("src"),
		count:1
	}
	var oldCookie=getCookie("shoplist");
	if(oldCookie.length!=0){
		arr=oldCookie;
		for(var i=0;i<arr.length;i++){
			if(json.id==arr[i].id && json.name==arr[i].name){
				arr[i].count++;
				flag=false;
				break;
			}
		}
	}
	if(flag){
		arr.push(json)
	}
	setCookie("shoplist",JSON.stringify(arr));
	console.log(arr);
	if(!confirm("点击确定，继续购物，点击取消，去购物车结算")){
				location.href="shopcar.html";
	}
})
