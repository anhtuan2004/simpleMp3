$(document).ready(function() {
	var crrId = 0; crrTime = 0;
	var atmp3 = $('.audio-wrap audio').get(0);

	$(atmp3).bind('play',function() {
		$(".at-play").addClass('playing');
	}).bind('pause ended', function() {
		$(".at-play").removeClass('playing');
	});

	$(".at-play").click(function() {
		if (atmp3.paused) { 
			atmp3.play(); 
		}else { 
			crrTime = atmp3.currentTime;
			atmp3.pause(); 
			Cookies.set('crrId', crrId);
			Cookies.set('crrTime', crrTime);
		}
	});

	$('.at-playlist a').click(function(event) {
		var newmp3 = $(this).attr('href');
		$('.audio-wrap audio source').attr('src', newmp3);
		atmp3.pause();
		atmp3.load();
		atmp3.play();
		crrId = $(this).parent().index();
		$('.at-song-title').html($(this).text());
		$('.at-playlist li').removeClass('current');
		$(this).parent().addClass('current')
		return false;
	});

	$('.at-process-wrap').click(function(e) {
		if (atmp3.duration != 0) {
			left = $(this).offset().left;
			offset = e.pageX - left;
			percent = offset / $('.at-process-wrap').width();
			duration_seek = percent * atmp3.duration;
			atmp3.currentTime = duration_seek;
		}
	});


	$(atmp3).bind('ended', function() {
        $('.at-playlist li.current').next().children().trigger('click');
    }).bind('timeupdate', function(e) {
          var rem = parseInt(this.duration - this.currentTime, 10),
          pos = (this.currentTime / this.duration) * 100,
          mins = Math.floor(rem/60,10),
          secs = rem - mins*60;

          $('.at-song-timer').text(mins + ':' + (secs > 9 ? secs : '0' + secs));
          $('.at-process').css('width', pos + '%');
    });

    if(Cookies.get('crrId') != undefined){
     	var crrOldId = Cookies.get('crrId');
     	var crrOldTime = Cookies.get('crrTime');
     	$('.at-playlist li').eq(crrOldId).children().trigger('click');
     	atmp3.currentTime = crrOldTime;
     	Cookies.remove('crrId');
     	Cookies.remove('crrTime');
    }
    atmp3.volume = 0.8;
});