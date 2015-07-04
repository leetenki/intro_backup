window.onload = function() {
	videos = document.getElementsByTagName("video");
	for(var i = 1; i < videos.length; i++) {
		videos[i].volume = 0;
	}

	$('#carousel-example-generic').on("slide.bs.carousel", function(e){
		$('#carousel-example-generic .carousel-inner .item.active')[0].children[0].volume = 0;
		e.relatedTarget.children[0].volume = 1
	})	
}
var debug