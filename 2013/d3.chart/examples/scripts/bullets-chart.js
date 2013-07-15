// Chart design based on original implementation by Mike Bostock:
// http://bl.ocks.org/mbostock/4061961
d3.chart("Bullets", {
	initialize: function(options) {
		var mixins = this.mixins = [];
		var idx, len, mixin;

		if (options && options.seriesCount) {
			for (idx = 0, len = options.seriesCount; idx < len; ++idx) {
				this._addSeries(idx);
			}
		}
	},
	_addSeries: function(idx) {
		var mixin = this.mixin("Bullet", this.base.append("svg").append("g"));
		// Cache the prototype's implementation of `transform` so that it may
		// be invoked from the overriding implementation. This is admittedly a
		// bit of a hack, and it may point to a future improvement for d3.chart
		var t = mixin.transform;

		mixin.transform = function(data) {
			return t.call(mixin, data[idx]);
		};

		this.mixins.push(mixin);
	},
	width: function(width) {
		if (!arguments.length) {
			return this._width;
		}
		this._width = width;
		this.base.attr("width", width);
		this.base.selectAll("svg").attr("width", width);
		this.mixins.forEach(function(mixin) {
			mixin.width(width);
		});
		return this;
	},
	height: function(height) {
		if (!arguments.length) {
			return this._height;
		}
		this._height = height;
		this.base.selectAll("svg").attr("height", height);
		this.mixins.forEach(function(mixin) {
			mixin.height(height);
		});
		return this;
	},
	duration: function(duration) {
		if (!arguments.length) {
			return this._duration;
		}
		this._duration = duration;
		this.mixins.forEach(function(mixin) {
			mixin.duration(duration);
		});
	},
	margin: function(margin) {
		this.mixins.forEach(function(mixin) {
			mixin.margin(margin);
		});
		return this;
	}
});
