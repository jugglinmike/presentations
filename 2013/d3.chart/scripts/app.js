(function() {

var s = Array.prototype.slice.call(document.querySelectorAll("#impress > .step"));
var idx = 0;
s.forEach(function(elem) {
	if (!elem.getAttribute("data-y")) {
		elem.setAttribute("data-y",idx++*1500);
	}
});

impress().init();

})();
