/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth


(function ($, Drupal, window, document, undefined) {

$('.s-twitter.btn-3d').on('click', function(e){e.preventDefault()});


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.glrAll = {

	attach: function(context, settings) {

		$(document).ready(function(e){

				//Delay al hover en diferentes Menús
				$("#main-menu .main-menu li").hoverIntent(open, close);

				function open(){
					$(this).addClass('hover');
				}
				function close(){
					$(this).removeClass('hover');
				}

				$("#floating-nav .floating-nav-header .parent").hoverIntent(openFloatingItems, close);

				function openFloatingItems(){
					var child = $(this).data('child');
					$("#floating-nav .floating-nav-items .slider-wrapper").removeClass('active');
					$("#floating-nav .floating-nav-items ."+child).addClass('active');
				}

				$("#floating-nav").hoverIntent(openFloatingNavItems, closeFloatingNavItems);

				function openFloatingNavItems(){
					$(this).addClass("expanded");
				}

				function closeFloatingNavItems(){
					$(this).removeClass("expanded");
				}

				$("#floating-nav .floating-nav-header .social, #floating-nav .floating-nav-header .logo").mouseout(function(){
					$("#floating-nav .floating-nav-items .slider-wrapper").removeClass('active');
				});

				$("#floating-nav .floating-nav-header .social, #floating-nav .floating-nav-header .logo").mouseover(function(){
					$("#floating-nav .floating-nav-items .slider-wrapper").removeClass('active');
				});


				/* Sliders para diferentes secciones, no he ubicado clases o ids especificas en cada sección
				para poder condicionar la instancia de cada slider a excepción de las secciones especiales (esto está pendiente).*/

				$('.floating-items-slider').slick({
					dots: false,
					speed: 300,
					slidesToShow: 6,
					infinite: false,
					variableWidth: true,
					responsive: [
						{
							breakpoint: 1600,
							settings: {
								slidesToShow: 5,
							}
						},
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 4,
							}
						}
					]
				});

				$('#tags ul').slick({
					dots: false,
					speed: 300,
					slidesToShow: 3,
					variableWidth: true
				});


				// Setting para responsive de navegación de tags flotante, la opción por defecto de slick tiene conflicto

				var $tagsSliderToShow = 10;
				if(window.innerWidth <= 1800 )
					$tagsSliderToShow = 8;
				if(window.innerWidth <= 1600 )
					$tagsSliderToShow = 6;
				if(window.innerWidth < 1400 )
					$tagsSliderToShow = 4;

				$('#floating-nav .floating-tags-slider').slick({
					dots: false,
					speed: 300,
					infinite: false,
					slidesToShow: $tagsSliderToShow,
					slidesToScroll: 1,
					variableWidth: true
				});

				$('.nota-slider').slick({
					slidesToShow: 1,
				  slidesToScroll: 1,
				  arrows: false,
				  fade: true,
				  asNavFor: '.nota-slider-nav'
				});

				$('.nota-slider-nav').slick({
					slidesToShow: 3,
				  slidesToScroll: 1,
				  asNavFor: '.nota-slider',
				  dots: true,
				  centerMode: true,
				  focusOnSelect: true
				});

				$('.america-cup-slider').slick({
					lazyLoad: 'ondemand',
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					focusOnSelect: true
					//adaptiveHeight: true
				});

				$('.america-cup-slider-nav').slick({
					slidesToShow: 6,
					slidesToScroll: 1,
					asNavFor: '.america-cup-slider',
					focusOnSelect: true

				});

				$('.rumbos-slider').slick({
					lazyLoad: 'ondemand',
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					focusOnSelect: true
				});


				$('.aside-pr ul').slick({
					dots: false,
					infinite: true,
					speed: 300,
					slidesToShow: 5,
					vertical: true,
					centerMode: false
				});

				$('.slider-columnistas').slick({
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false
				});

				$('.slider-fotogalerias > ul, .slider-noticias > ul, .slider-most-viewed > ul').slick({
					arrows: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					responsive: [
						{
							breakpoint: 730,
							settings: "unslick"
						}]
				});



				//Inicializando el plugin para mostrar de manera fluida las infografias

				if (!Drupal.behaviors.glrAll.isMobile()){

					$(window).load(function(){
					 var $container = $('#infographics-list');
					 $container.masonry({
						itemSelector: '.grid-item'
					 });
					});

				}

				$('.w-search input:text').on('focus', function(){
					$(this).closest('.w-search').addClass('focused hightlight-bg');
				});
				$('.w-search input:text').on('blur', function(){
					$(this).closest('.w-search').removeClass('focused');
					setTimeout(function(){
						$('.w-search').removeClass('hightlight-bg');
					}, 500);
				});

				$('.w-search .btn').on('click', function(e){
					if($('.w-search input:text').val().length===0 ){
						e.preventDefault();
						if($(this).hasClass('focused')){
							$('.w-search input:text').trigger('blur');
							$(this).removeClass('focused');
							console.log('blur');
						} else {
							$(this).addClass('focused');
							$('.w-search input:text').trigger('focus');
							console.log('focus');
						}
					}
				});


				//lazy
				$("img.lazy").lazyload();


			});
	},

	isMobile: function(){
		if(window.innerWidth <= 767 ) {
		 return true;
		} else {
		 return false;
		}
	},

	barsClick: function(e){
		$nav = $("nav#main-menu");
		if($nav.hasClass("active")){
			$nav.removeClass("active").hide();
			$(this).removeClass("active");
		} else {
			$nav.addClass("active").show();
			$(this).addClass("active");
		}
	},

	fixBlockPos: function(){
		if ($(window).scrollTop() > 350) {
			$("#floating-nav, #floating").addClass('show'); }
		else {
			$("#floating-nav, #floating").removeClass('show');  }
	},

	fixSidebar: function(pos, firstPos, lastPos){
		//console.log(firstPos);
		var $aside = $("#main .col-sidebar aside");

		if(pos > firstPos && pos < lastPos){
			$aside.addClass('fixed');
			$aside.css('top', $('#floating').height()+20);
			$aside.removeClass('stop');
		}

		if(pos < firstPos){
			$aside.removeClass('fixed');
			$aside.css('top', 'auto');
		}

		if(pos > lastPos){
			$aside.addClass('stop');
			$aside.css('top', 'auto');
		}

	},

	filterColumnists: function(){
		var columnist = $(".front .columnistas .slider ul li");
		columnist.hide();
		columnist.slice(0,6).show();
	},

	showMisturaMenu: function(e){
		$nav = $("nav#main-menu ul.menu");
		if($nav.hasClass("active")){
			$nav.removeClass("active").hide();
			$(this).removeClass("active");
		} else {
			$nav.addClass("active").show();
			$(this).addClass("active");
		}
	},

	toggleMobileMenu: function(e){
		$nav = $("nav#main-menu .section-menu");
		if($nav.hasClass("active")){
			$nav.removeClass("active").hide();
			$(this).removeClass("active");
		} else {
			$nav.addClass("active").show();
			$(this).addClass("active");
		}
	}


};


//Actions

if(Drupal.behaviors.glrAll.isMobile()==true){
	Drupal.behaviors.glrAll.filterColumnists();
}

$("#header .bars").click(Drupal.behaviors.glrAll.barsClick);
$(".bars-mistura2015").click(Drupal.behaviors.glrAll.showMisturaMenu);
$(".section-menu-bars").click(Drupal.behaviors.glrAll.toggleMobileMenu);


if(Drupal.behaviors.glrAll.isMobile()==false) {
	$(window).on('scroll', function(){
		//top bar
		Drupal.behaviors.glrAll.fixBlockPos();
	});
}

//Se agregan los botones solo a lo que tiene un cite
$("#note-body blockquote").each(function(){

	if($(this).find('cite').length){

		$(this).addClass('custom');

		var shareButons = $("#share-buttons-cite-wrapper").html();
		var $block = $(this).clone();
		var author = $block.find('cite').text() || "";

		if (author.charAt(0) == '-') {
			author = author.substr(1, author.length);
		}

		if (author.charAt(author.length - 1) == '.') {
			author = author.substr(0, author.length - 1);
		}

		var maxText = 97 - author.length;
		$block.find('cite').remove();

		if ($block.text().length > maxText) {
			var text = $block.text().substring(0, 93 - author.length);
			var tweet = author + ": " + text + " ...";
		} else {
			var text = $block.text().substring(0, 97 - author.length);
			var tweet = author + ": " + text;
		}

		tweet = tweet.replace(/"/g, "");

		shareButons = shareButons.replace("citaenlarepublica", tweet);
		$(this).append(shareButons);

	}

});


})(jQuery, Drupal, this, this.document);



(function($, window, document, undefined){

	//Plugins

	if ($('body').hasClass('section-eliminatorias-rusia-2018') || $('body').hasClass('nota-interna-eliminatorias-2018')) {

		$('.eliminatorias-rusia2015-slider').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			focusOnSelect: true
		});

		$('.eliminatorias-rusia2015-slider-nav').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			asNavFor: '.eliminatorias-rusia2015-slider',
			focusOnSelect: true
		});

		var toggleMobileMenu = function(){
			var $bars = $('.eliminatorias-rusia-2018-bars-icon'), $menu = $('ul.menu');
			if ($bars.hasClass('active')) {
				$menu.hide();
				$bars.removeClass('active');
			} else {
				$menu.show();
				$bars.addClass('active');
			}
		}

		$('.eliminatorias-rusia-2018-bars-icon').click(toggleMobileMenu);

	};

})(jQuery, this, this.document);


(function($, window, document, undefined){
	/*
		hideShowDropdown
		//menu responsive
	*/
	var hideShowDropdown = function(){
		var $btn = $('[data-glrButton]'),
			$btnSubmenu = $('[data-glrmenu] > ul > li.is-expanded'),
			$dropdown = $('[data-glrmenu] > ul > li > .Dropdown-content');
		$btn.on('click', function(e){
			e.stopPropagation();
			if($btn.data('glrbutton')){
				$btn.addClass('is-active');
				$dropdown.show();
				$btn.data('glrbutton', false);
			}else{
				$btn.removeClass('is-active');
				$dropdown.hide();
				$btn.data('glrbutton', true);
			}
		});
	};

	hideShowDropdown();
})(jQuery, this, this.document);

(function($, window, document, undefined){
	/*
		menuDropdownn
		//click menu dropdown
	*/
	var menuDropdown = function(e){
		var $menu = $('[data-glrmenu]'),
				$link = $('[data-glrmenu] > ul > li.is-expanded > a'),
				$btn = $('[data-glrmenu] > ul > li.is-expanded'),
				$megaMenu = $('[data-glrmenu] > ul > li.is-expanded > .Dropdown-content'),
				$btnRes = $('[data-glrButton]');

				if($(this).outerWidth() < 820){
					$btn.removeClass('is-active');
					$megaMenu.attr('style', '').removeClass('table');
					$btn.data('flag', false);
					$('body').addClass('flagResponsive');
				}
				if($(this).outerWidth() > 820){
					$megaMenu.attr('style', '');
					$btnRes.removeClass('is-active');
					$btnRes.data('glrbutton', true);
					$('body').removeClass('flagResponsive');
				}

				$(window).resize(function(e) {
					if($(this).outerWidth() < 820){
						$btn.removeClass('is-active');
						$megaMenu.attr('style', '').removeClass('table');
						$btn.data('flag', false);
						$('body').addClass('flagResponsive');
					}
					if($(this).outerWidth() > 820){
						$megaMenu.attr('style', '');
						$btnRes.removeClass('is-active');
						$btnRes.data('glrbutton', true);
						$('body').removeClass('flagResponsive');
					}
				});

				$btn.data('flag', false);
				$link.click(function(e){
					e.preventDefault();
				});

				$link.on('click', function(e){
					e.stopPropagation;
					if(!$('body').hasClass('flagResponsive')){
						var t = $(this);
						$megaMenu.hide();
						if(!t.data('flag')){
							t.closest(".is-expanded").addClass('is-active');
							t.data('flag', true);
							$(this).next('.Dropdown-content').addClass('table').show();
						}else{
							t.closest(".is-expanded").removeClass('is-active');
							t.data('flag', false);
							$(this).next('.Dropdown-content').removeClass('table').hide();
						}
					}
				});

				$btn.mouseleave(function() {
					if(!$('body').hasClass('flagResponsive')){
					  var t = $(this);
						t.removeClass('is-active');
						t.find('> a').data('flag', false);
						$(this).find('>.Dropdown-content').removeClass('table').hide();
					}
				});
	};

	if($(this).outerWidth() > 800){
		menuDropdown();
	}



})(jQuery, this, this.document);

(function($, window, document, undefined){
		var updateBanner = function(){

			var $heightHeader = $('#headerFix').outerHeight(),
				$heightHtml = $('html'),
				$ground_left = $('#ground_left'),
				$ground_right = $('#ground_right'),
					$body = $('html,body');

			/*$ground_left.css("top" , 200);
			$ground_right.css("top" , 200);*/

			var $floatingNav = $('#floating-nav');

			$(window).on('scroll', function(){
				var tTop = $(this).scrollTop();

				(tTop > $heightHeader) ? $body.addClass('banner_fixed') : $body.removeClass('banner_fixed');
				if($floatingNav){
					(tTop > 350) ? $body.addClass('banner_fixedHeader') : $body.removeClass('banner_fixedHeader');
				}

			});

		};

	updateBanner();

})(jQuery, this, this.document);


(function($, window, document, undefined){
	var widthTag = function(){

		var elm = $('.nav-Tags#tags'),
			h3 = elm.find('.tag-slide > h3'),
			wrap = elm.find('.tags');
			setTimeout(function(){
				if($('body').hasClass('theme-la-republica')){
					if(wrap.find('button').length){
						wrap.css({
							'padding-left' : h3.outerWidth() + 20
						});
					}else{
						wrap.css({
							'padding-left' : h3.outerWidth()
						});
					}
				}
			}, 1000);
	};

	widthTag();

})(jQuery, this, this.document);



(function($, window, document, undefined){
	/*
		menuDropdownn
		//click menu dropdown
	*/
	var menuResponDescabellado = function(e){
		var $menu = $('[data-responMenu]'),
				$btnRes = $('[data-responBtn]');



				$btnRes.on('click', function(){
						var t = $(this);
						if(!t.data('flag')){
							t.addClass('is-active');
							t.data('flag', true);
							$menu.show();
						}else{
							t.removeClass('is-active');
							t.data('flag', false);
							$menu.hide();
						}
				});

				if($('window').outerWidth() < 820){
					$btnRes.removeClass('is-active');
					$menu.attr('style', '');
					$btnRes.data('flag', false);
				}
				if($(window).outerWidth() > 820){
					$btnRes.removeClass('is-active');
					$menu.attr('style', '');
					$btnRes.data('flag', true);
				}

				$(window).resize(function(e) {
						if($(this).outerWidth() < 820){
							$btnRes.removeClass('is-active');
							$menu.attr('style', '');
							$btnRes.data('flag', false);
						}
						if($(this).outerWidth() > 820){
							$btnRes.removeClass('is-active');
							$menu.attr('style', '');
							$btnRes.data('flag', true);
						}
				});
	};

	menuResponDescabellado();
})(jQuery, this, this.document);


(function($, window, document, undefined){
	function menu(option)
   {
        var $wrapMenu = $("[data-plugin-js='menu_hidden_show']"),
            $btn = $wrapMenu.find("[data-item='button']"),
            $menu = $wrapMenu.find("[data-item='menu']"),
            $close = $wrapMenu.find('.icon-close');

            $btn.on("click", function(e){
                e.preventDefault();
                $menu.fadeToggle();
                $close.fadeToggle();
            })

            $close.on("click", function(){

                $menu.fadeToggle();
                $(this).fadeToggle();
            })
   };

    menu();


   function classParent(){
        var $el = $("[data-plugin='class-parent']");

        $el.hover(
          function() {
            $(this).closest('.post').addClass('hover');
            $(this).before( "<div class='full-bg'></div>" );
          }, function() {
            $(this).closest('.post').removeClass('hover');
            $('.full-bg').remove();
          }
        );

   }

    classParent();


})(jQuery, this, this.document);


(function($, window, document, undefined){
	var menuConteo = function(){
		var $menu = $('[data-script="menu-conteo"]'),
				$btn = $menu.find('.arrow');
				$btn.on('click', function(){
					$menu.toggleClass("is-active");
				});

				$menu.on('mouseleave', function(){
					if($menu.hasClass("is-active")){
						$btn.trigger("click");
					}
				})
	};

	var megaMenuConteo = function(){
		var $menu = $('[data-script="megamenu-conteo"]'),
				$btn = $('[data-script="btn-megamenu-conteo"]');

				$btn.on('click', menuToggle);


				$menu.find('li').on('click', function(e){
					var currentText = $(this).text();
					$btn.text(currentText);
					$btn.trigger("click");
				});

				function menuToggle(e){
					$(this).toggleClass('is-active');
					$menu.toggleClass("is-active");
				};
	};

	menuConteo();
	megaMenuConteo();
})(jQuery, this, this.document);


(function($, window, document, undefined){
	var MenuResponsive = function(){
			var button = $('.js-button-mob'),
					nav = $('.js-nav-mob');

					button.on('click', function(e){
						e.preventDefault();
						var self = $(this);
						if(!self.hasClass('is-active')){
							self.addClass('is-active');
							nav.addClass('is-active');
						}else{
							self.removeClass('is-active');
							nav.removeClass('is-active');
						}
					})
	};
	MenuResponsive();
})(jQuery, this, this.document);


(function($, window, document, undefined){
	$('.js-slide').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: true,
	  infinite : false
	});
})(jQuery, window, document, undefined)























