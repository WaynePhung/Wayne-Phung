//"use strict";
$(document).ready(function () {
	"use strict";
	$('.dropbtn').click(function () {
		$('.navigationBar').toggleClass('show');
		$('.dropbtn').toggleClass('toX');
		$('.dropdownContent').toggleClass('show');
		$('.name').toggleClass('hide');
		$('.menuIndicator').toggleClass('toX');
	});

	$(window).scroll(function(){
		var winWidth = $(document).width();
        var nameValue = 250;
		/*if (winWidth >= 1100) {
			nameValue = 1100;
		} else if (winWidth >= 700) {
			nameValue = 300;
		} else if(winWidth >= 400) {
			nameValue = 250;
		} else {
			nameValue = 200;
		}*/
		var fade = $(window).scrollTop();
		if (fade >= 50){
		  $(".name").css({"opacity": "0"});
		} else {
		  $(".name").css({"opacity": "1"});
		}
		/*if (fade >= nameValue) {
		  $("#firstImg, .picNum, .slideDots").css({"opacity": "0"});
		} else {
		  $("#firstImg, .picNum, .slideDots").css({"opacity": "1"});
		}
		var rkcbValue = nameValue + 450;
		var rkcbId = $(".rkcbVid");
		if (fade >= rkcbValue) {
			rkcbId.css({"opacity": "0"});
			//rkcbId.paused() ? rkcbId.play():rkcbId.pause();
		} else {
		  $(".rkcbVid").css({"opacity": "1"});
		}*/
	});

	changeName();
	//$(window).resize(changeName);
	/* This function changes the name from full to abbreviated when
	  the width of the browser window is less than 700px. This also
	  occurs when the browser's width is resized. */
	/*function changeName (){
	var winWidth = $(document).width();
		var widthVal = 700;
		if (winWidth < widthVal) {
			$(".name").text("WP");
		} else if (winWidth >= widthVal) {
			$(".name").text("Wayne Phung");
		}
		else {
			$(".name").text("Wayne Phung");
		}
	}*/
/*Empty code.*/
	$('.mediaContainer').hover(function() {
		$('.insetShadow').addClass('.colorChange');
	});
	//Below is unused code.

	/*Forming the picture slideshow. This code was adapted by
	  Chris Skinner from codepen.io named "Simple jQuery
	  Slideshow", https://codepen.io/chrisj-skinner/pen/pvFBf?editors=0010.

	//Get the photos.
	var imageGroup = $(".slideshow");

	var ulDots = '<ul id="dots">';

	var imageArray = $.makeArray(imageGroup);

	for (var i =0; i < imageArray.length; i++){
		if (i === 0){
			imageArray[i].addClass('current');
			ulDots += '<div class="selectedDot" id ="1">';
		} else {
			imageArray[i].addClass(i);
			ulDots += '<div class="dot" id="'+[i+1]+'">';
		}
		ulDots += '</div>';
	}
	ulDots += '</div>';
	$('.slideshow').after(ulDots);
	$('#left').click(changePic);
	$('#right').click(changePic);
	$('.slideDots .dot').click(pickImg);
	//setInterval(function(){moveImg()}, 4000);

	function pickImg(){	$('.selectedDot').removeClass('selectedDot').addClass('dot');
		var j = this.className;
		j--;
		var currentImg = $('.slideshow.current');
		var nextImg = $('.slideshow').eq(j);
		$(this).removeClass('dot').addClass('selectedDot');
		currentImg.removeClass('current').addClass('prev');	nextImg.css({"opacity":"0"}).addClass('current').anim ate({"opacity":"1"},500, function(){
			currentImg.removeClass('prev');
		});
	}

	function changePic(){
		var moveImg = this.id;
		var selectDot = $('.selectedDot').removeClass('selectedDot');
		var currentImg = $('.slideshow.current');
		var nextPhoto, nextDot;
		if (moveImg === 'next') {
			nextPhoto = currentImg.next();
			nextDot = selectDot.next();
			if (nextPhoto.length == 0) {
				nextPhoto = $('.slideshow:first');
				nextDot = $('.slideDots .dot:first');
			}
		} else if (moveImg === 'prev') {
			nextPhoto = currentImg.prev();
			nextDot = selectDot.prev();
			if (nextPhoto.length == 0) {
				nextPhoto = $('.slideshow:last');
				nextDot = $('.slideDots .dot:last');
			}
		}
		nextDot.addClass('selectedDot');
		currentImg.removeClass('current').addClass('prev');
		nextPhoto.css({"opacity": "0"}).addClass('current').animate({"opacity":"1"},500, function(){
			currentImg.removeClass('prev');
		});
	}

		/*var dotArray = $('.dot').toArray();
		var dotClick = dotArray[i].getElementById();
    	for (var i = 0; i < dotArray.length; i++) {
			if (dotArray[i].css.backgroundColor === "rgba(0,0,0,.7)") {
				dotArray[i].css({"background-color": "white"});
			}
		}
		if (dotClick.css.backgroundColor === "white") {
			dotClick.css({"backgroundColor": "rgba(0,0,0,0.7)"});
		}*/
});
