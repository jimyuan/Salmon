$(function(){
	$("div.foodlist").hover(function(){
		$(this).children("div.tip-mask").fadeToggle();
	}).click(function(e){
		if(e.target.nodeName=="IMG") {
			$("#seafoodModal").modal({show:true});
			$("#myModalLabel").text($(this).children().next().children().text());
			$(".modal-body>img").attr("src", $(this).children("img").attr("src").replace("t_",""))
			.attr("alt", $("#myModalLabel").text());
		}
	});

});