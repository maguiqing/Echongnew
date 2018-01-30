$(".nav2 a").mouseenter(function(){
	$(this).css("color","#ff6000")
	var _left=$(this).parent().position().left;
	$(".nav2 .cloud").stop().animate({"left":_left},500)
})
$(".nav2 a").mouseleave(function(){
	$(this).css("color","#000000")
	$(".nav2 .cloud").stop().animate({"left":0},500)
})
var arr=getCookie("shoplist");
	var html="";
	for(var i=0;i<arr.length;i++){
		var shopinfo=arr[i];
		html+='<div class="shop-item clearfix">'+
					'<p class="fl"><input type="checkbox" class="ck"/></p>'+
					'<img class="fl" src="image/'+ shopinfo.src +'" alt="" />'+
					'<p class="fl">'+ shopinfo.name +'</p>'+
					'<span class="fl">'+ shopinfo.price +'元</span>'+
					'<p class="fl count" '+
						'data-id="'+ shopinfo.id +'" '+
						'data-price="'+ shopinfo.price +'" data-count="'+ shopinfo.count +'"'+
						'data-name="'+ shopinfo.name +'" data-src="'+ shopinfo.src +'"'+
						'>'+
						'<span class="updateCount" data-number="1">+</span>'+
						'<span class="shop-count">'+ shopinfo.count +'</span>'+
						'<span class="updateCount" data-number="-1">-</span>'+
					'</p>'+
					'<em class="fl sumPrice">'+ (shopinfo.count * shopinfo.price) +'元</em>'+
					'<i class="fl delBtn">删除</i>'+
				'</div>';
	}
	$(".shoplist").html(html);
	function jiesuan(){
		var sumCount=0;
		var sumMoney=0;
		$(".ck:checked").each(function(){
			sumCount+=parseFloat($(this).parent().parent().find(".shop-count").html());
			sumMoney+=parseFloat($(this).parent().parent().find(".sumPrice").html());
		})
		$(".count2").html(sumCount);
		$(".money2").html(sumMoney);
	}
	$(".ck").click(function(){
		jiesuan();
	})
	$("#selectAll").click(function(){
		$(".ck").prop("checked",$(this).prop("checked"));
	})
	$(".updateCount").click(function(){
		var pid=$(this).parent().data("id");
		var pname=$(this).parent().data("name");
		var sign=$(this).data("number");
		var count=$(this).parent().find(".shop-count").html();
		if(sign=="-1" && count==1){
			return;
		}
		for(var i=0;i<arr.length;i++){
			if(pid==arr[i].id && pname==arr[i].name){
				sign==1?arr[i].count++:arr[i].count--;
				setCookie("shoplist",JSON.stringify(arr))
				$(this).parent().find(".shop-count").html(arr[i].count);
				$(this).parent().parent().find(".sumPrice").html(arr[i].count*arr[i].price);
				break;
			}
		}
		jiesuan();
	})
	$(".delBtn").click(function(){
		var pid=$(this).prev().prev().data("id");
		var pname=$(this).prev().prev().data("name");
		for(var i=0;i<arr.length;i++){
			if(pid==arr[i].id && pname==arr[i].name){
				arr.splice(i,1);
				setCookie("shoplist",JSON.stringify(arr));
			}
		}
		$(this).parent().remove();
	})