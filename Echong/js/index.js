//轮播左侧栏
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
//轮播图
  var timer= setInterval(autoPlay,3000);
	var index1 = 0;
	function autoPlay(){
		
		index1++;
		if( index1== $(".banner .bannerol li").size() ){
			index1= 0;
		}
		$(".banner .bannerol li").eq(index1)
				  .addClass("current")
				  .siblings()
				  .removeClass("current");
		$(".banner .bannerul li").eq(index1)
				  .fadeIn(1000)
				  .siblings()
				  .fadeOut(1000);
	}
	$(".bannerol li").mouseenter(function(){
		clearInterval(timer);
		index1 = $(this).index()-1;
		autoPlay();
	})
	$(".bannerol li").mouseleave(function(){
		timer= setInterval(autoPlay,3000);
	})
//轮播右侧栏
for(var i=0;i<$("#bannerRight li").length;i++){
	  $("#bannerRight li").eq(i).mouseenter(function(){
	    $(this).animate({"left":10},300)
  })
   $("#bannerRight li").eq(i).mouseleave(function(){
	   $(this).animate({"left":23},300)
   })
}
//menu上轮播
var flagA = true;// 如果值为真  可以点击 
	$("#arr #righta").click(function(){
		if( flagA ){
			flagA = false;
			$(".menu2top ul").animate({"marginLeft" : -115},1500,function(){
				$(".menu2top ul").css("margin-left",0)
					   .find("li:first")
					   .appendTo( $(".menu2top ul") );
				flagA = true;
			})
		}
	})
	
	$("#arr #lefta").click(function(){
		if( flagA ){
			flagA = false;
			//先将ul的最后一个li调整到最前面
			$(".menu2top ul li:last").prependTo( $(".menu2top ul") );
			//将ul的left值调整到-300
			$(".menu2top ul").css("margin-left","-115px");
			//以运动的方式  ul目标值调整到0
			$(".menu2top ul").animate({"marginLeft":0},1500,function(){
				flagA = true;
			});
		}
	})
//menu下轮播
var flag = true;// 如果值为真  可以点击 
	$("#brr #right").click(function(){
		if( flag ){
			flag = false;
			$(".menu2bottom ul").animate({"marginLeft" : -208},1500,function(){
				$(".menu2bottom ul").css("margin-left",0)
					   .find("li:first")
					   .appendTo( $(".menu2bottom ul") );
				flag = true;
			})
		}
})
	
    $("#brr #left").click(function(){
		if( flag ){
			flag = false;
			//先将ul的最后一个li调整到最前面
			$(".menu2bottom ul li:last").prependTo( $(".menu2bottom ul") );
			//将ul的left值调整到-300
			$(".menu2bottom ul").css("margin-left","-208px");
			//以运动的方式  ul目标值调整到0
			$(".menu2bottom ul").animate({"marginLeft":0},1500,function(){
				flag = true;
			});
		}
	})
/*main2移入透明度改变*/
$(".main2 ul li").mouseenter(function(){
		$(this).fadeTo(100,0.7);
	}).mouseleave(function(){
		$(".main2 ul li").fadeTo(100,1);
	})
/*ajax请求数据*/
window.onload = function(){
		$.ajax({
			type:"get",
			url:"js/data.json",
			success : function(json){
				var str = "";
				var html = "";
				for(var attr in json){
					str += `<li cname='${attr}'><a href="">${json[attr].name}</a></li>`;
					
				}
				for( var i = 0 ; i < json[attr].list.length ; i++ ){
						var pro = json[attr].list[i];
						html += `<li>
									<a href="detail.html?pid=${pro.id}&cname=${attr}">
										<img src="image/${pro.src}" alt="" />
										<p>${pro.name}</p>
										<p>${pro.price}元</p>
									</a>
							
								</li>`;
				}
				$(".maintopul").html( str );
				$(".shoplist").html( html );
				
				//分类显示功能
				$(".maintopul li").mouseenter(function(){
//					$(this).css({"z-index":20,"border":"1px solid #62a727","border-bottom":0})
					       
					//alert( $(this).attr("cname") )
					var cname = $(this).attr("cname");//确定商品的类型名称
					var page = "";
					for( var i = 0 ; i < json[cname].list.length ; i++ ){
						var pro = json[cname].list[i];
						page += `<li>
									<a href="detail.html?pid=${pro.id}&cname=${cname}">
										<img src="image/${pro.src}" alt="" />
										<p>${pro.name}</p>
										<p>${pro.price}元</p>
									</a>
									
								</li>`;
					}
					
					$(".shoplist").html( page );
				})
			}
		})
	}
//左侧选项卡显示和隐藏
	$(".content2 li").mouseenter(function(){
		$(this).css({"border":"1px solid #62a727","border-right":0,"background-color":"#fff"})
		       .siblings()
		       .css({"border":"0","border-bottom":"1px dashed #ccc","background-color":"#fcfcfc"})
		$(".hide ul").eq($(this).index())
		             .css({"display":"block","z-index":30})
		             .siblings()
		             .css("display","none")
	
	})
	$(".content2 li").mouseleave(function(){
		$(this).css({"border":"0","border-bottom":"1px dashed #ccc","background-color":"#fcfcfc"})
		$(".hide ul").css("display","none");
	})
//右侧栏选项卡显示隐藏
$(".rtcont-up i").mouseenter(function(){
	
	$(this).parent().css({"background":"#555","color":"#fff"})
	.end()
	.prev().css("display","block")
})
$(".rtcont-up i").mouseleave(function(){
	$(this).parent().css({"background":"#444","color":"#a6a6a6"})
	.end()
	.prev().css("display","none")
})
//回到顶部
$(window).scroll(function(){
   $(".rtcont-up li:last i").css("display","block")
                         
})
$(".rtcont-up li:last i").click(function(){
	$("html,body").scrollTop(0);
})
