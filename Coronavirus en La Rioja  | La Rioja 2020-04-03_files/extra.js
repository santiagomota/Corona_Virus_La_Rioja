/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

	var ExtraAbstract = __webpack_require__(1);
	var SMAMP = __webpack_require__(7);

	/**
	 * FoldExtra class
	 * @param pluginType
	 * @constructor
	 */
	function FoldExtra (pluginType) {
	  // [Inheritance]
	  ExtraAbstract.call(this, pluginType);
	}

	// [Inheritance]
	FoldExtra.prototype = Object.create(ExtraAbstract.prototype);
	FoldExtra.prototype.constructor = FoldExtra;

	FoldExtra.prototype.rewrite = function (plg) {
	  plg.referenceFoldHeight = 1;

	  plg.buildReferenceStyle = function () {
	    var adFactoryCreativeSize = this.getAdFactoryCreativeSize();
	    var referenceClientRect = this.reference.getBoundingClientRect();

	    var width = (referenceClientRect.width > 0)
	      ? referenceClientRect.width
	      : this.params.container.offsetWidth;
	    var height = ((this.adFactory && adFactoryCreativeSize.height))
	      ? adFactoryCreativeSize.height
	      : this.getHeightFromWidth(width);

	    var marginLeft = 0;

	    if (this.adFactory && this.adFactory.height && this.adFactory.forceDimensions) {
	      height = adFactoryCreativeSize.height;
	    }
	    if (this.sspSize && this.sspSizeBanner() && !this.params.ava.enabled) {
	      height = this.sspSize.h;

	      if (this.sspSize.rescale) {
	        height = (adFactoryCreativeSize.width * this.sspSize.h) / this.sspSize.w;
	      }
	      if (this.device.mobileDesktop !== 'desktop' &&
	        (this.sspSize.rescaleMobile || this.sspSize.mobileWidth)
	      ) {
	        height = (adFactoryCreativeSize.width * this.sspSize.h) / this.sspSize.w;
	      }
	    }
	    // saving reference initial height
	    this.referenceInitialHeight = height;

	    // extra
	    var marginTop = '10px';
	    var marginBottom = '20px';
	    // end extra

	    // using fold height
	    if (this.state !== this.states.PLAYING && this.state !== this.states.PAUSED && this.params.options.fold) {
	      height = this.referenceFoldHeight;
	    }

	    if (this.params.options.margin && parseInt(this.params.options.margin) > 0) {
	      width = this.params.container.offsetWidth - this.params.options.margin;
	      marginLeft = this.params.options.margin / 2;
	    }

	    var bgColor;

	    if (this.adFactory && (
	      this.adFactory.type === 'AdImage' ||
	      this.adFactory.type === 'SocialAd' ||
	      this.adFactory.type === 'Scroller' ||
	      this.adFactory.type === 'Display' ||
	      (this.adFactory.type === 'SSP' && !this.params.ava.enabled) ||
	      (this.adFactory.type === 'vertical')
	    )) {
	      bgColor = 'transparent';
	    } else {
	      bgColor = '#e7e7e7';
	    }

	    if (this.params.options.fold) {
	      height = this.referenceFoldHeight;
	      bgColor = 'rgba(246,246,246,.4)';
	      // extra
	      marginTop = '0';
	      marginBottom = '0';
	      // end extra
	    }

	    var st = '';

	    if (SMAMP.isAMP()) {
	      st += '' +
	        'margin-top:-1px;' + // Margin top is -1px because of the space that the effective takes up (1px)
	        'margin-left:0px;' +
	        'margin-bottom:0px;';

	      if (SMAMP.isAMPStickyIntegration()) {
	        height = SMAMP.getStickyAdMaxHeight();
	      }
	    } else {
	      st += 'margin-left:' + marginLeft + 'px;';
	    }

	    st += '' +
	      'margin-top:' + marginTop + ';' +
	      'margin-bottom:' + marginBottom + ';' +
	      'height:' + height + 'px;' +
	      'width:' + width + 'px;' +
	      'background-color:' + bgColor + ';';

	    return st;
	  };
	};

	// This line creates an instance of the class defined above and
	// calls the method named run to start it's executions
	FoldExtra.prototype.exec('SMIntext');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * ExtraAbstract class
	 * @constructor
	 */
	function ExtraAbstract (pluginType) {
	  this.extraFLAG = 'SMExtraPlgs';
	  this.pluginType = pluginType;
	  // Sets window[this.extraFLAG] default value
	  if (!window[this.extraFLAG]) {
	    window[this.extraFLAG] = {};
	  }
	}

	/**
	 * Checks if the plugin has been rewritten
	 * @param api
	 * @return {boolean}
	 */
	ExtraAbstract.prototype.hasBeenRewritten = function (api) {
	  return window[this.extraFLAG] && window[this.extraFLAG][api] === true;
	};

	/**
	 * To rewrite plugin instance methods
	 * @param plugin
	 */
	ExtraAbstract.prototype.rewrite = function (plugin) {
	  throw new Error('Missing implementation of abstract method!');
	};

	/**
	 *
	 * @param api
	 * @param [plugin]
	 */
	ExtraAbstract.prototype.rewritePlugin = function (api, plugin) {
	  plugin = plugin || window[this.pluginType + '_' + api];

	  if (!this.hasBeenRewritten(api)) {
	    // Calling rewrite plugin instance
	    if (plugin) {
	      this.rewrite(plugin);
	    }
	    // Sets the current plugin Flag to avoid calling it more than one time
	    window[this.extraFLAG][api] = true;
	  }
	};

	/**
	 * Start the extra script
	 */
	ExtraAbstract.prototype.run = function () {
	  var scriptArr = document.getElementsByTagName('script');

	  for (var index = 0; index < scriptArr.length; index++) {
	    var currentScript = scriptArr[index];
	    if (currentScript.src.indexOf('extra.js') > -1) {
	      var apiIndex = currentScript.src.indexOf('?');
	      if (apiIndex > -1) {
	        // SMIntext
	        var api = currentScript.src.substr(apiIndex + 1);
	        this.rewritePlugin(api);
	      } else if (window.hasOwnProperty(this.pluginType)) {
	        // PluginAbstract
	        var collection = window[this.pluginType];
	        for (var plgId in collection) {
	          if (collection.hasOwnProperty(plgId)) {
	            var plg = collection[plgId];
	            this.rewritePlugin(plg.api, plg);
	          }
	        }
	      }
	    }
	  }
	};

	/**
	 * This line creates an instance of the class defined above and
	 * calls the method named run to start it's executions
	 */
	ExtraAbstract.prototype.exec = function (pluginType) {
	  var instance = new this.constructor(pluginType);
	  instance.run();
	};

	module.exports = ExtraAbstract;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

	function AMP() {
	  AMP.prototype.isAMP = function () { return true; };

	  AMP.prototype.getAMPContainerClass = function () { return 'c'; };

	  AMP.prototype.isAMPStickyIntegration = function () {
	    return (window.context.container === 'AMP-STICKY-AD');
	  };

	  AMP.prototype.requestResize = function (width, height, hasOverflow) {
	    window.context.requestResize(width, height, hasOverflow);
	  };

	  AMP.prototype.requestResizeUntilSuccess = function (width, height, hasOverflow) {
	    if (this.isAMPStickyIntegration()) {
	      return; // because always denies resizing
	    }

	    if (this.unlisten) {
	      this.unlisten();
	    }

	    this.unlisten = window.context.observeIntersection(function () {
	      window.context.requestResize(width, height, hasOverflow);
	    });

	    window.context.onResizeSuccess(this.unlisten);
	  };

	  AMP.prototype.reportEntity = function (identifier) {
	    window.context.reportRenderedEntityIdentifier('' + identifier);
	  };

	  AMP.prototype.closeAd = function () {
	    if (this.isAMPStickyIntegration()) {
	      window.context.noContentAvailable();
	    } else {
	      SMAMP.requestResizeUntilSuccess(window.document.body.offsetWidth, 0, true);
	    }
	  };

	  AMP.prototype.getStickyAdMaxHeight = function () {
	    return 100;
	  };

	  AMP.prototype.convertSizesForStickyAd = function (width, height) {
	    var maxHeight = this.getStickyAdMaxHeight();
	    var newWidth, newHeight;

	    if (height > maxHeight) {
	      newHeight = maxHeight;
	      newWidth = width * maxHeight / height;
	    } else {
	      newWidth = width;
	      newHeight = height;
	    }

	    return {
	      width: newWidth,
	      height: newHeight,
	    };
	  };
	}

	function NoAMP() {
	  var ampInstance = new AMP();
	  var methodNames = Object.keys(Object.getPrototypeOf(ampInstance));

	  for (var i = 0; i < methodNames.length; i++) {
	    var methodName = methodNames[i];
	    NoAMP.prototype[methodName] = function () { };
	  }

	  NoAMP.prototype.isAMP = function () { return false; };
	};

	function detectAMPEnvironment() {
	  return (
	    window.context &&
	    window.context.tagName &&
	    window.context.tagName.indexOf('AMP') > -1
	  );
	}

	var SMAMP;
	var isAMP = detectAMPEnvironment();
	if (isAMP) {
	  SMAMP = new AMP;
	} else {
	  SMAMP = new NoAMP;
	}

	module.exports = SMAMP;


/***/ })
/******/ ]);