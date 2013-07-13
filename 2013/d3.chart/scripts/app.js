(function() {

var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
var textProp = "innerText" in document.createElement("div") ?
	"innerText" : "textContent";

var s = toArray(document.querySelectorAll("#impress > .step"));
var idx = 0;
s.forEach(function(elem) {
	var yPos = idx++ * 1500;
	if (!elem.getAttribute("data-y")) {
		elem.setAttribute("data-y", yPos);
	}
	toArray(elem.querySelectorAll(".step")).forEach(function(elem) {
		elem.setAttribute("data-y", yPos);
		elem.setAttribute("data-z", 100);
	});
});

// Normalize indentation of code samples
toArray(document.querySelectorAll("pre.code > code")).forEach(function(codeElem) {
	var code = codeElem[textProp];
	var indent;

	// Strip leading newline characters and trailing whitespace
	code = code.replace(/^[\r\n]*|\s*$/g, "");
	// Detect the "baseline" indentation as defined by first line of code
	indent = (code.match(/^\s+/) || [""])[0];
	// Remove "baseline" indentation from each line
	code = code.replace(new RegExp("^" + indent, "gm"), "");

	codeElem[textProp] = code;
});

impress().init();

})();
