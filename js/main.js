/* PreLoader */
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

/* Navbar */

jQuery(function($) {
    $(window).on('scroll', function() {
		if ($(this).scrollTop() >= 200) {
			$('.navbar').addClass('fixed-top');
		} else if ($(this).scrollTop() == 0) {
			$('.navbar').removeClass('fixed-top');
		}
	});
	
	function adjustNav() {
		var winWidth = $(window).width(),
			dropdown = $('.dropdown'),
			dropdownMenu = $('.dropdown-menu');
		
		if (winWidth >= 768) {
			dropdown.on('mouseenter', function() {
				$(this).addClass('show')
					.children(dropdownMenu).addClass('show');
			});
			
			dropdown.on('mouseleave', function() {
				$(this).removeClass('show')
					.children(dropdownMenu).removeClass('show');
			});
		} else {
			dropdown.off('mouseenter mouseleave');
		}
	}
	
	$(window).on('resize', adjustNav);
	
	adjustNav();
});


/* Carousels */
$('.owl1').owlCarousel({
	loop:true,
	margin: 30,
	nav:false,
	dots:true,
	autoplay:true,
	autoplayHoverPause: true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		1000:{
			items:4
		}
	}
})

$('.owl2').owlCarousel({
	loop:true,
	margin:20,
	autoplay:true,
	autoplayHoverPause: true,
	autoplayTimeout: 3000,
	dots: false,
	responsive:{
		0:{
			items:2
		},
		600:{
			items:3
		},
		1000:{
			items:5
		}
	}
})

/**Gallery */
$('.gallery-menu ul li').click(function(){
	$('.gallery-menu ul li').removeClass('active');
	$(this).addClass('active');
	
	var selector = $(this).attr('data-filter');
	$('.gallery-item').isotope({
		filter:selector
	});
	return  false;
});

$(document).ready(function() {
var popup_btn = $('.popup-btn');
popup_btn.magnificPopup({
type : 'image',
gallery : {
	enabled : true
}
});
});