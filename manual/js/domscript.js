$(document).ready(function() {

	var domscripts = {

		init: function init () {

			var self = this;

			if(window.innerWidth >= 600 ) {
				self.installStickyMenu();
			} else {
				self.enableSelectMenu();
			}

			self.installSyntaxHighlighting();
			self.drawSimpleDummyExample("OrganiseChart-array-result");
			self.drawSimpleDummyExample("OrganiseChart-json-result");
		},

		installStickyMenu: function installStickyMenu () {

			var header      = $('body > header'),
				headings    = $('#main h2'),
				nav         = $('nav#level2'),
				stickyClass = 'fix';

			if (nav.find('.ym-hlist').length > 0 ) {

				$(document).bind('scroll',function(){
					var hOffset = header.offset().top+header.height(),
						top     = $(document).scrollTop();

					// make it sticky ...
					if (hOffset < top) {
						if (nav.data(stickyClass) !== true) {
							nav.addClass(stickyClass).data(stickyClass,true);
						}
					} else {
						if (nav.data(stickyClass) !== false) {
							nav.removeClass(stickyClass).data(stickyClass,false);
						}
					}

					var nOffset = nav.height();

					// adjust active menu-item from scroll-value
					$.each(headings, function(key){
						var id        = '#'+$(this).attr('id'),
							offset    = $(this).offset().top,
							pos       = offset - top,
							targetPos = 0;

						if (nav.hasClass(stickyClass) === true) {
							targetPos = 2*nav.height();
						}

						if (pos > targetPos) {
							nav.find('a[href="'+id+'"]').parent().prev().addClass('active').siblings().removeClass('active');
							return false;
						} else if (pos < targetPos && pos > targetPos - nOffset) {
							nav.find('a[href="'+id+'"]').parent().addClass('active').siblings().removeClass('active');
							return false;
						}
					});
				});

				// initial check for scroll-status ...
				$(document).trigger('scroll');
				$(window).trigger('resize');

				if ($('body').hasClass('doc') === true) {

					var stateObj = { page: "index" };

					// jump to a named anchor ...
					$('#level2 a,a.offset').bind('click', function(event){
						event.preventDefault();

						var self 	= $(this),
							id      = self.attr('href'),
							pos     = $(id).offset().top,
							nHeight = nav.height() + 6; // 6px whitespace

						// set active menu-item ...

						$(id).focus();

						// adjust scroll-value
						if (nav.hasClass(stickyClass) === true) {
							$(document).scrollTop(pos-nHeight);
						} else {
							$(document).scrollTop(pos-90);
						}

						setTimeout(function() {

							self.parent()
								.siblings()
								.removeClass('active');

							self.parent().addClass('active');

						}, 10);
					});
				}
			}
		},

		enableSelectMenu: function() {
			$('#level2 select').on('change', function(e){
				var target = $($(e.target).val()).offset().top;
				$(document).scrollTop(target);
			});
		},

		installSyntaxHighlighting: function(){
			var highlightStyle = "peachpuff";

			if (jQuery.fn.snippet) {
				$("pre.htmlCode").snippet("html", {style: highlightStyle});
				$("pre.cssCode").snippet("css", {style: highlightStyle});
				$("pre.jsCode").snippet("javascript", {style: highlightStyle});
			}
		},

		drawSimpleDummyExample: function(id) {
			var paths = [
				{path:'M 166,64.5 C 166,79.5 227.5,79.5 227.5,94.5',style:{"stroke":"black"}},
				{path:'M 166,64.5 C 166,79.5 94,79.5 94,94.5',style:{"stroke":"black"}}
			];

			var i = paths.length,
				_R = Raphael(document.getElementById(id));

			while(i--) {
				var line = paths[i],
					connLine = _R.path(line.path);

				connLine.attr(line.style);
			}
		}
	};

	domscripts.init();
});

//check for deep links
$(window).load(function() {
	var fragment = location.href.split('#'),
		nav      = $('nav#level2');

	if (fragment.length > 0) {
		$(nav.find('a[href="#'+fragment[1]+'"]')).trigger('click');
	}
});
