window.onload = function() {
	// turn of all videos
	videos = document.getElementsByTagName("video");
	for(var i = 1; i < videos.length; i++) {
		videos[i].volume = 0;
	}


	// current and next item
	var currentItem;
	var nextItem;

	// this function is called when a slide is starting to move.
	$('#carousel-example-generic').on("slide.bs.carousel", function(e){
		currentItem = $('#carousel-example-generic .carousel-inner .item.active')[0];
		nextItem = e.relatedTarget;

		// play next video
		nextItem.children[0].play();

		// volume handler
		var upVolumeHandler = null;
		var downVolumeHandler = null;

		// if previous video is running, clear it
		if(downVolumeHandler) {
			clearInterval(downVolumeHandler);
			downVolumeHandler.video.volume = 0;
		}

		// function to remember previous handler
		debug = nextItem.children[0];
		upVolumeHandler = {
			handler: setInterval(upVolume, 10, nextItem.children[0]),
			video: nextItem.children[0]
		};
		downVolumeHandler = {
			handler: setInterval(downVolume, 10, currentItem.children[0]),
			video: currentItem.children[0]
		};

		// function to turn up volume
		function upVolume(video) {
			if(video.volume >= 0.9) {
				video.volume = 1;
				clearInterval(upVolumeHandler.handler);
			} else {
				video.volume += 0.01;
			}
		}
		// function to turn down volume
		function downVolume(video) {
			if(video.volume <= 0.1) {
				video.volume = 0;
				clearInterval(downVolumeHandler.handler);
			} else {
				video.volume -= 0.01;
			}
		}
	});

	// called when finish to slide video
	$('#carousel-example-generic').on("slid.bs.carousel", function(e){
		currentItem.children[0].pause();
	});
}
var debug