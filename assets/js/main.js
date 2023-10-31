/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Contact Form

	// Logo Animation
	const $logo = $("#animated-logo");
	const logoText = $logo.text()
	const $cursor = $("<span>").attr("id", "cursor").text("_");
	let index = 0;

	// Cursor
	function showCursor() { $cursor.css("visibility", "visible"); }
	function hideCursor() { $cursor.css("visibility", "hidden"); }
	function toggleCursor() { $cursor.css("visibility") === "hidden" ? showCursor() : hideCursor() }
	function blinkCursor(speed) {
		return setInterval(function() {
			toggleCursor();
		}, speed); // Adjust the blinking speed (in milliseconds)
	}
	function setCursorPositionInPx(x, y) {
		$cursor.css('left', x + 'px');
		$cursor.css('top', y + 'px');
	}

	$window.on('load', function() {
		window.setTimeout(function() {
			//Logo - clear Text
			$logo.text("");

			//Cursor - init
			$cursor.insertAfter($logo);
			//Cursor - set init position
			setCursorPositionInPx(
				($window.width() / 2) - ($cursor.width() / 2),
				$logo.position().top
			);
			//Cursor - blink
			var cursorIntervalId = blinkCursor(500); // Adjust the blinking speed (in milliseconds)

			//Logo - Start Typing Animation
			setTimeout(function() {
				clearInterval(cursorIntervalId); //as we type, stop cursor blinking
				showCursor(); //cursor constantly on
				type(); // run type animation
			}, 2500);

		}, 100);
	});

	function type() {
		if (index < logoText.length) {
			$logo.text($logo.text() + logoText.charAt(index));
			var endPosition = $logo.offset().left + $logo.width();
			//Adjust cursor position
			setCursorPositionInPx(endPosition, $cursor.offset().top );

			index++;
			setTimeout(type, 200); // Adjust typing speed here (in milliseconds)
		} else {
			$cursor.fadeOut(1000, function() {
				// Remove the cursor after it has faded out
				$cursor.remove();
			});
		}
	}
})(jQuery);