(function(window, undefined) {

	"use strict";

	var $ = window.$;
	var $cache = {};

	var setColor = function(event) {
		var $target = $(event.target);
		$cache.status
			.css("background-color", $target.text())
			.empty()
			.append($("Color: <strong>" + $target.text() + "</strong>"));
	};

	$(function() {

		$cache.status = $(".status");
		$cache.setColor = $(".set-color");
		$cache.enableChooser = $(".enable-chooser");

		$cache.enableChooser.toggle(function() {
			$cache.setColor.live("click", setColor);
			$cache.enableChooser.html("Disable");
		}, function() {
			$cache.setColor.die("click", setColor);
			$cache.enableChooser.html("Enable");
		});

		if (!$.browser.webkit && !$.browser.mozilla) {
			$(document.body).html("Please upgrade your browser (I'm a lazy developer)");
			return;
		}

	});
}(this));
