// Chart design based on original implementation by Mike Bostock:
// http://bl.ocks.org/mbostock/4061961
d3.chart("Bullet", {
	initialize: function() {
		this.xScale = d3.scale.linear();
		this.base.classed("bullet", true);

		this._margin = { top: 0, right: 0, bottom: 0, left: 0 };
		// Default configuration
		this.duration(0);
		this.markers(function(d) {
			return d.markers;
		});
		this.measures(function(d) {
			return d.measures;
		});
		this.width(380);
		this.height(30);
		this.tickFormat(this.xScale.tickFormat(8));
		this.orient("left"); // TODO top & bottom
		this.ranges(function(d) {
			return d.ranges;
		});

		this.titleGroup = this.base.append("g")
			.style("text-anchor", "end")
			.attr("transform", "translate(-6," + height / 2 + ")");

		this.title = this.titleGroup.append("text")
			.attr("class", "title");
			//.text(function(d) { return d.title; });

		this.subtitle = this.titleGroup.append("text")
			.attr("class", "subtitle")
			.attr("dy", "1em");
			//.text(function(d) { return d.subtitle; });

		this.layer("ranges", this.base.append("g").classed("ranges", true), {
			dataBind: function(data) {
				// This layer operates on "ranges" data
				data = data.ranges;

				return this.selectAll("rect.range").data(data);
			},
			insert: function() {
				return this.append("rect");
			},
			events: {
				enter: function() {
					var chart = this.chart();
					this.attr("class", function(d, i) { return "range s" + i; })
						.attr("width", chart.xScale)
						.attr("height", chart.height())
						.attr("x", this.chart()._reverse ? chart.xScale : 0);
				},
				"merge:transition": function() {
					var chart = this.chart();
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", chart._reverse ? chart.xScale : 0);
				},
				exit: function() {
					this.remove();
				}
			}
		});

		this.layer("measures", this.base.append("g").classed("measures", true), {
			dataBind: function(data) {
				// This layer operates on "measures" data
				data = data.measures;

				return this.selectAll("rect.measure").data(data);
			},
			insert: function() {
				return this.append("rect");
			},
			events: {
				enter: function() {
					var chart = this.chart();
					var hy = chart.height() / 3;
					this.attr("class", function(d, i) { return "measure s" + i; })
						.attr("width", chart.xScale)
						.attr("height", hy)
						.attr("x", chart._reverse ? chart.xScale : 0)
						.attr("y", hy);
				},
				"merge:transition": function() {
					var chart = this.chart();
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", chart.reverse ? chart.xScale : 0);
				}
			}
		});

		this.layer("markers", this.base.append("g").classed("markers", true), {
			dataBind: function(data) {
				// This layer operates on "markers" data
				data = data.markers;

				return this.selectAll("line.marker").data(data);
			},
			insert: function() {
				return this.append("line");
			},
			events: {
				enter: function() {
					var chart = this.chart();
					var height = chart.height();
					this.attr("class", "marker")
						.attr("x1", chart.xScale)
						.attr("x2", chart.xScale)
						.attr("y1", height / 6)
						.attr("y2", height * 5 / 6);
				},
				"merge:transition": function() {
					var chart = this.chart();
					var height = chart.height();
					this.duration(chart.duration())
						.attr("x1", chart.xScale)
						.attr("x2", chart.xScale)
						.attr("y1", height / 6)
						.attr("y2", height * 5 / 6);
				}
			}
		});

		this.layer("ticks", this.base.append("g").classed("ticks", true), {
			dataBind: function() {
				var format = this.chart().tickFormat();
				return this.selectAll("g.tick").data(this.chart().xScale.ticks(8), function(d) {
					return this.textContent || format(d);
				});
			},
			insert: function() {
				var tick = this.append("g").attr("class", "tick");
				var chart = this.chart();
				var height = chart.height();
				var format = chart.tickFormat();

				tick.append("line")
					.attr("y1", height)
					.attr("y2", height * 7 / 6);

				tick.append("text")
					.attr("text-anchor", "middle")
					.attr("dy", "1em")
					.attr("y", height * 7 / 6)
					.text(format);

				return tick;
			},
			events: {
				enter: function() {
					var chart = this.chart();
					this.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1e-6);
				},
				"merge:transition": function() {
					var chart = this.chart();
					var height = chart.height();

					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1);
					this.select("line")
						.attr("y1", height)
						.attr("y2", height * 7 / 6);
					this.select("text")
						.attr("y", height * 7 / 6);
				},
				"exit:transition": function() {
					var chart = this.chart()
					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1e-6)
						.remove();
				}
			}
		});

		d3.timer.flush();
	},

	transform: function(data) {
		// Copy data before sorting
		var newData = {
			title: data.title,
			subtitle: data.subtitle,
			randomizer: data.randomizer,
			ranges: data.ranges.slice().sort(d3.descending),
			measures: data.measures.slice().sort(d3.descending),
			markers: data.markers.slice().sort(d3.descending)
		};

		this.xScale.domain([0, Math.max(newData.ranges[0], newData.measures[0], newData.markers[0])]);
		this.title.text(data.title);
		this.subtitle.text(data.subtitle);

		return newData;
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
		var margin;
		if (!arguments.length) {
			return this._width;
		}
		margin = this.margin();
		x -= margin.left + margin.right
		this._width = x;
		this.xScale.range(this._reverse ? [x, 0] : [0, x]);

		this.base.attr("width", x);

		return this;
	},

	height: function(x) {
		var margin;
		if (!arguments.length) {
			return this._height;
		}
		margin = this.margin();
		x -= margin.top + margin.bottom;
		this._height = x;

		this.base.attr("height", x);

		return this;
	},

	margin: function(margin) {
		if (!margin) {
			return this._margin;
		}

		["top", "right", "bottom", "left"].forEach(function(dimension) {
			if (dimension in margin) {
				this._margin[dimension] = margin[dimension];
			}
		}, this);

		this.base.attr("transform", "translate(" + this._margin.left + "," +
			this._margin.top + ")")

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
