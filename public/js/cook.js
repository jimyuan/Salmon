$("a[href=#myModal] img").on("click", function(){
	$("#myModalLabel").html($(this).attr("alt"));
	$("#menu-pic").attr({
		src:$(this).attr("src").replace("-s.png", ".png"),
		alt:$(this).attr("alt")
	})
})