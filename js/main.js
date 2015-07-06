window.onload = function() {




	/**********************************************/
	//                Smooth scroll
	/**********************************************/
	$(function(){
	    // #で始まるアンカーをクリックした場合に処理
	    $('ul.navbar-nav li a[href^=#]').click(function() {
	        // スクロールの速度
	        var speed = 400; // ミリ秒
	        // アンカーの値取得
	        var href= $(this).attr("href");
	        // 移動先を取得
	        var target = $(href == "#" || href == "" ? 'html' : href);
	        // 移動先を数値で取得
	        var position = target.offset().top;
	        // スムーススクロール
	        $('body,html').animate({scrollTop:position}, speed, 'swing');
	        return false;
	    });
	});	


	/**********************************************/
	//                Modal window
	/**********************************************/
	$('#exampleModal').on('show.bs.modal', function (event) {
	    var button = $(event.relatedTarget) // Button that triggered the modal
	    var recipient = button.data('whatever') // Extract info from data-* attributes
	    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	    var modal = $(this)
	    // modal.find('.modal-title').text('New message to ' + recipient)
	    // modal.find('.modal-body input').val(recipient)
	});

	// event processor
	$('button#submit').click(function(e){
		var email = $("#email-text")[0].value;
		var message = $("#message-text")[0].value;
		alert(email + "," + message);
		$('#exampleModal').modal('hide');
	});


	/**********************************************/
	//                process video 
	/**********************************************/
	// turn of all videos
	videos = document.getElementsByTagName("video");
	for(var i = 1; i < videos.length; i++) {
		videos[i].volume = 0;
		videos[i].pause();
	}

	// current and next item
	var currentItem;
	var nextItem;

	// volume handler
	var upVolumeHandler = null;
	var downVolumeHandler = null;

	// this function is called when a slide is starting to move.
	$('#carousel-generic').on("slide.bs.carousel", function(e){
		currentItem = $('#carousel-generic .carousel-inner .item.active')[0];
		nextItem = e.relatedTarget;

		// play next video
		nextItem.children[0].play();

		// if previous video is running, clear it
		if(downVolumeHandler) {
			clearInterval(downVolumeHandler.handler);
			downVolumeHandler.video.volume = 0;
		}
		if(upVolumeHandler) {
			clearInterval(upVolumeHandler.handler);
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
				upVolumeHandler = null;
			} else {
				video.volume += 0.01;
			}
		}
		// function to turn down volume
		function downVolume(video) {
			if(video.volume <= 0.1) {
				video.volume = 0;
				clearInterval(downVolumeHandler.handler);
				downVolumeHandler = null;
			} else {
				video.volume -= 0.01;
			}
		}
	});

	// called when finish to slide video
	$('#carousel-generic').on("slid.bs.carousel", function(e){
		currentItem.children[0].pause();
	});
}
var debug