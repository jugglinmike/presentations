/*!
 * repl-sim - v0.1.0
 * License: GPL-3.0
 * Date: 2016-08-06
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["replSim"] = factory();
	else
		root["replSim"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  'use strict';
	  var Cursor = __webpack_require__(1);
	  var pause = __webpack_require__(2);
	  var innerText = __webpack_require__(4);
	  var defaults = {
	    promptRe: /^\$ /,
	    cursorPeriod: 700,
	    submitDelay: 800,
	    readDelay: 1000,
	    getHeight: function(el) {
	      return el.clientHeight;
	    },
	    keystrokeDelay: function() {
	      return 50 + Math.random() * 100;
	    },
	    prepText: function(text) {
	      return text;
	    }
	  };

	  function Simulator(el, options) {
	    this.el = el;

	    this.submitDelay = options && options.submitDelay;
	    this.keystrokeDelay = options && options.keystrokeDelay ||
	      defaults.keystrokeDelay;
	    var promptRe = options && options.promptRe || defaults.promptRe;
	    var prepText = options && options.prepText || defaults.prepText;
	    var cursorPeriod = options && options.cursorPeriod || defaults.cursorPeriod;
	    var getHeight = options && options.getHeight || defaults.getHeight;

	    if (typeof this.submitDelay !== 'number') {
	      this.submitDelay = defaults.submitDelay;
	    }
	    this.readDelay = options && options.readDelay;
	    if (typeof this.readDelay !== 'number') {
	      this.readDelay = defaults.readDelay;
	    }
	    var code = el.getAttribute('data-repl-sim');
	    if (code === null) {
	      this.el.style.height = getHeight(this.el) + 'px';
	      code = prepText(innerText(this.el) || '');
	      this.el.setAttribute('data-repl-sim', code);
	    }

	    this._cursor = new Cursor(getComputedStyle(this.el).color, cursorPeriod);

	    this._lines = code.split('\n').map(function(line) {
	      var match = line.match(promptRe);
	      var prompt;

	      if (!match) {
	        return { output: line };
	      }
	      prompt = match[0];

	      return {
	        prompt: prompt,
	        input: line.substring(prompt.length, line.length) || ''
	      };
	    });
	  }

	  Simulator.prototype.destroy = function() {
	    if (this._destroyed) {
	      throw new Error('ReplSim: `destroy` called on destroyed instance');
	    }

	    this._cursor.hide();
	    this._destroyed = true;
	  };

	  Simulator.prototype.play = function() {
	    if (this._destroyed) {
	      throw new Error('ReplSim: `play` called on destroyed instance');
	    }

	    this.el.textContent = '';
	    this.el.appendChild(this._cursor.el);

	    return this._lines.reduce(function(previous, line, idx) {
	      return previous.then(function() {
	        var node;
	        if (this._destroyed) {
	          return;
	        }
	        node = document.createTextNode('');
	        this.el.insertBefore(node, this._cursor.el);
	        if ('output' in line) {
	          this._cursor.hide();
	          node.textContent = line.output + '\n';
	          return;
	        }
	        this._cursor.show();
	        node.textContent = line.prompt;
	        return pause(this.readDelay)
	          .then(function() {
	            if (this._destroyed) {
	              return;
	            }

	            return this._typeLine(node, line.input);
	          }.bind(this))
	          .then(function() {
	            if (this._destroyed) {
	              return;
	            }

	            return pause(this.submitDelay);
	          }.bind(this))
	          .then(function() {
	            if (this._destroyed) {
	              return;
	            }
	            if (idx < this._lines.length - 1) {
	              node.textContent += '\n';
	            }
	          }.bind(this));
	      }.bind(this));
	    }.bind(this), Promise.resolve());
	  };

	  Simulator.prototype._typeLine = function(node, text) {
	    var letters;

	    if (this._destroyed) {
	      return;
	    }

	    letters = text.split('');

	    return letters.reduce(function(previous, letter) {
	      return previous.then(function() {
	          if (this._destroyed) {
	            return;
	          }

	          return new Promise(function(resolve) {
	              setTimeout(function() {
	                if (!this._destroyed) {
	                  node.textContent += letter;
	                }
	                resolve();
	              }.bind(this), this.keystrokeDelay());
	            }.bind(this));
	        }.bind(this));
	    }.bind(this), Promise.resolve());
	  };

	  module.exports = Simulator;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  'use strict';
	  var pause = __webpack_require__(2);
	  var until = __webpack_require__(3);

	  function Cursor(color, period) {
	    this.el = document.createElement('span');
	    this.el.innerHTML = '&nbsp;';
	    this.color(color);
	    this.period(period);
	    this._blinking = false;
	    this._stopRequests = 0;

	    this.show();
	  }

	  Cursor.prototype.show = function() {
	    this.el.style.display = 'inline';
	    this._blink();
	  };

	  Cursor.prototype.hide = function() {
	    this.el.style.display = 'none';
	    if (this._blinking) {
	      this._blinking = false;
	      this._stopRequests += 1;
	    }
	  };

	  Cursor.prototype.color = function(value) {
	    this.el.style.backgroundColor = value;
	  };

	  Cursor.prototype.period = function(value) {
	    this._period = value;
	  };

	  Cursor.prototype._blink = function() {
	    var visibility;
	    if (this._blinking) {
	      return;
	    }

	    this._blinking = true;

	    until(function() {
	      visibility = visibility === 'visible' ? 'hidden' : 'visible';
	      this.el.style.visibility = visibility;
	      return pause(this._period);
	    }.bind(this), function() {
	      if (this._stopRequests) {
	        this._stopRequests -= 1;
	        return true;
	      }
	    }.bind(this));
	  };

	  module.exports = Cursor;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  'use strict';

	  module.exports = function pause(delay) {
	    return new Promise(function(resolve) { setTimeout(resolve, delay); });
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  'use strict';

	  module.exports = function until(operation, condition) {
	    return operation().then(function() {
	      if (condition()) {
	        return;
	      }

	      return until(operation, condition);
	    });
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Based on the MIT-licensed code at:
	 *
	 * https://github.com/duckinator/innerText-polyfill
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  'use strict';
	  module.exports = function innerText(el) {
	    if ('innerText' in el) {
	      return el.innerText;
	    }

	    if (!window.getSelection) {
	      throw new Error('getSelection not available');
	    }

	    var selection = window.getSelection();
	    var ranges = [];
	    var text, idx, length;

	    // Save existing selections.
	    for (idx = 0, length = selection.rangeCount; idx < length; ++idx) {
	      ranges[idx] = selection.getRangeAt(idx);
	    }

	    // Deselect everything.
	    selection.removeAllRanges();

	    // Select `el` and all child nodes.
	    selection.selectAllChildren(el);

	    // Get the string representation of the selected nodes.
	    text = selection.toString();

	    // Deselect everything. Again.
	    selection.removeAllRanges();

	    // Restore all formerly existing selections.
	    for (idx = 0, length = ranges.length; idx < length; ++idx) {
	      selection.addRange(ranges[idx]);
	    }

	    return text;
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});
;
