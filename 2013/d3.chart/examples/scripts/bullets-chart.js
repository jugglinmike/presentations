d3.chart("Bullets", {
	initialize: function(options) {
		if (options && options.data) {
			options.data.forEach(function(series, idx) {
				var mixin = this.mixin("Bullet", this.base.append("svg").append("g"));
				mixin.margin(options.margin);
				mixin.height(50);
				mixin.width(960);
				mixin.transform = function(data) {
					return data[idx];
				};
			}, this);
		}
	},
	width: function(width) {
		if (!arguments.length) {
			return this._width;
		}
		this._width = width;
		return this;
	},
	height: function(height) {
		if (!arguments.length) {
			return this._height;
		}
		this._height = height;
		return this;
	},
	margin: function() {

	}
});
