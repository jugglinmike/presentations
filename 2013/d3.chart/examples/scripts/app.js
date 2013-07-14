(function(window) {

	"use strict";

	var d3 = window.d3;
	var myChart = window.myChart = d3.select("body")
		.append("svg").append("g").chart("StockLine");

	d3.tsv("stock-data.tsv", function(error, data) {
		myChart.draw(data);
	});

})(this);
