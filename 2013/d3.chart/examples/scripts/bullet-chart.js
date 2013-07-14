// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
d3.chart("Bullet", {
	initialize: function(d, i) {
		// Default configuration
		this.duration(0);
		this.markers(bulletMarkers);
		this.measures(bulletMeasures);
		this.width(380);
		this.height(30);
		this.tickFormat(null);
		this.orient("left"); // TODO top & bottom
		this.ranges(bulletRanges);

  // For each small multiple…
  //function bullet(g) {
      var rangez = this._ranges.call(this.base, d, i).slice().sort(d3.descending),
          markerz = this._markers.call(this.base, d, i).slice().sort(d3.descending),
          measurez = this._measures.call(this.base, d, i).slice().sort(d3.descending),
          g = this.base;
		var duration = this.duration();

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
          .range(this._reverse ? [this.width(), 0] : [0, this.width()]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

      // Update the range rects.
      var range = g.selectAll("rect.range")
          .data(rangez);

      range.enter().append("rect")
          .attr("class", function(d, i) { return "range s" + i; })
          .attr("width", w0)
          .attr("height", height)
          .attr("x", this._reverse ? x0 : 0)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", this._reverse ? x1 : 0);

      range.transition()
          .duration(duration)
          .attr("x", this._reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", height);

      // Update the measure rects.
      var measure = g.selectAll("rect.measure")
          .data(measurez);

      measure.enter().append("rect")
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("width", w0)
          .attr("height", height / 3)
          .attr("x", this._reverse ? x0 : 0)
          .attr("y", height / 3)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", this._reverse ? x1 : 0);

      measure.transition()
          .duration(duration)
          .attr("width", w1)
          .attr("height", height / 3)
          .attr("x", this._reverse ? x1 : 0)
          .attr("y", height / 3);

      // Update the marker lines.
      var marker = g.selectAll("line.marker")
          .data(markerz);

      marker.enter().append("line")
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", height / 6)
          .attr("y2", height * 5 / 6)
        .transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1);

      marker.transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", height / 6)
          .attr("y2", height * 5 / 6);

      // Compute the tick format.
      var format = this.tickFormat() || x1.tickFormat(8);

      // Update the tick groups.
      var tick = g.selectAll("g.tick")
          .data(x1.ticks(8), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append("g")
          .attr("class", "tick")
          .attr("transform", bulletTranslate(x0))
          .style("opacity", 1e-6);

      tickEnter.append("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickEnter.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("y", height * 7 / 6)
          .text(format);

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      tickUpdate.select("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickUpdate.select("text")
          .attr("y", height * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1e-6)
          .remove();
    d3.timer.flush();
  //}
  //return bullet;
	},

	// left, right, top, bottom
	orient: function(x) {
		if (!arguments.length) return this._orient;
		this._orient = x;
		this._reverse = this._orient == "right" || this._orient == "bottom";
		return this;
	},

	// ranges (bad, satisfactory, good)
	ranges: function(x) {
		if (!arguments.length) return this._ranges;
		this._ranges = x;
		return this;
	},

	// markers (previous, goal)
	markers: function(x) {
		if (!arguments.length) return this._markers;
		this._markers = x;
		return this;
	},

	// measures (actual, forecast)
	measures: function(x) {
		if (!arguments.length) return this._measures;
		this._measures = x;
		return this;
	},

	width: function(x) {
		if (!arguments.length) return this._width;
		this._width = x;
		return this;
	},

	height: function(x) {
		if (!arguments.length) return this._height;
		this._height = x;
		return this;
	},

	tickFormat: function(x) {
		if (!arguments.length) return this._tickFormat;
		this._tickFormat = x;
		return this;
	},

	duration: function(x) {
		if (!arguments.length) return this._duration;
		this._duration = x;
		return this;
	}

});

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}
