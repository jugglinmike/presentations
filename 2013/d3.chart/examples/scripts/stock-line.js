// Chart design based on original implementation by Mike Bostock:
// http://bl.ocks.org/mbostock/3883245
d3.chart("StockLine", {
	initialize: function() {
		var x = this.x = d3.time.scale();
		var y = this.y = d3.scale.linear();
		this.line = d3.svg.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.close); });

		var xAxis = this.xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		var yAxis = this.yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");
		this.xLayer = this.base.append("g")
			.attr("class", "x axis");
		this.yLayer = this.base.append("g")
			.attr("class", "y axis");
		this.yLayer.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Price ($)");

		this.linePath = this.base.append("path").attr("class", "line");
		this.layer("line", this.linePath, {
			dataBind: function(data) {
				return this.data([data]).attr("d", this.chart().line);
			},
			insert: function() {
				return this.chart().linePath;
			}
		});

		// Default dimensions
		this._margin = {};
		this.margin({ top: 20, right: 20, bottom: 30, left: 50 });
		this.width(960);
		this.height(500);
	},
	margin: function(margin) {
		if (!margin) {
			return this._margin;
		}
		["top", "bottom", "left", "right"].forEach(function(dimension) {
			var newMargin = margin[dimension];
			if (typeof newMargin === "number") {
				this._margin[dimension] = newMargin;
			}
		}, this);
		this.base.attr("transform",
			"translate(" + this._margin.left + "," + this._margin.top + ")");
		return this;
	},
	width: function(width) {
		if (!arguments.length) {
			return this._width;
		}
		this._width = width;
		width -= this._margin.left + this._margin.right;
		this.base.attr("width", width);
		this.x.range([0, width]);
		this.redraw();
		return this;
	},
	height: function(height) {
		if (!arguments.length) {
			return this._height;
		}
		this._height = height;
		height -= this._margin.top + this._margin.bottom;
		this.xLayer.attr("transform", "translate(0," + height + ")")
		this.base.attr("height", height);
		this.y.range([height, 0]);
		this.redraw();
		return this;
	},
	// This parsing method is static, so it can be created at definition time
	// and attached to the chart's prototype to be shared by all instances.
	parseDate: d3.time.format("%d-%b-%y").parse,
	redraw: function() { this.draw(this._oldData || []); },
	transform: function(data) {
		this._oldData = data;
		data.forEach(function(d) {
			if (typeof d.date === "string") {
				d.date = this.parseDate(d.date);
			}
			d.close = +d.close;
		}, this);
		this.x.domain(d3.extent(data, function(d) { return d.date; }));
		this.xLayer.call(this.xAxis);
		this.y.domain(d3.extent(data, function(d) { return d.close; }));
		this.yLayer.call(this.yAxis);
		return data;
	}
});
