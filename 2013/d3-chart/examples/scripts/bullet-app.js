(function() {

"use strict";

d3.json("data/bullets.json", function(error, data) {

	var myChart = d3.select("#new").chart("Bullets", {
		seriesCount: data.length
	});

	myChart.margin(margin)
		.width(960)
		.height(50)
		.duration(1000);

	myChart.draw(data);

	d3.selectAll(".new-button").on("click", function() {
		data.forEach(randomize);
		myChart.draw(data);
	});
});

function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}

})();
