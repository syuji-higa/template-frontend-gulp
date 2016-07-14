/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _module = __webpack_require__(1);
	
	var _module2 = _interopRequireDefault(_module);
	
	var _template = __webpack_require__(2);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// import 'lodash';
	// import 'Velocity';
	// import 'Velocity.ui';
	// import '../../vendors/velocity.easeplus';
	// import 'custom-event-polyfill';  // https://github.com/krambuhl/custom-event-polyfill.git
	// import 'html5-polyfills/classList';
	// import 'html5-polyfills/dataset';
	// import 'fetch';
	// import '../../vendors/rAF';  // https://gist.github.com/1579671.git
	// import '../../vendors/html-domparser';  // https://gist.github.com/1129031.git
	// import '../../requires/polyfill/function';
	
	// create multiple incetance
	var createIncetance = function createIncetance(_class, _selector) {
	  for (var _len = arguments.length, _opts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    _opts[_key - 2] = arguments[_key];
	  }
	
	  var $$el_ = document.querySelectorAll(_selector);
	  var instances = [];
	  for (var i_ = 0; $$el_.length > i_; i_++) {
	    var arg_ = [$$el_[i_]];
	    if (_opts) Array.prototype.push.apply(arg_, _opts);
	    instances.push(new (Function.prototype.bind.apply(_class, [null].concat(arg_)))());
	  }
	  return instances;
	};
	
	// create single incetance
	var createSingleIncetance = function createSingleIncetance(_class, _selector) {
	  for (var _len2 = arguments.length, _opts = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	    _opts[_key2 - 2] = arguments[_key2];
	  }
	
	  var $$el_ = document.querySelectorAll(_selector);
	  if (!$$el_.length) return false;
	  var arg_ = [$$el_];
	  if (_opts) Array.prototype.push.apply(arg_, _opts);
	  return new (Function.prototype.bind.apply(_class, [null].concat(arg_)))();
	};
	
	// get path name
	var getPathName = function getPathName() {
	  return location.pathname.replace('index.html', '');
	};
	
	window.addEventListener('DOMContentLoaded', function () {
	
	  new _module2.default();
	
	  // new Template();
	
	  // const page = getPathName();
	
	  var modules_ = [[_template2.default, '.sample1']];
	
	  var singleModules_ = [[_template2.default, '.sample2']];
	
	  modules_.forEach(function (_arr) {
	    createIncetance.apply(undefined, _toConsumableArray(_arr));
	  });
	
	  singleModules_.forEach(function (_arr) {
	    createSingleIncetance.apply(undefined, _toConsumableArray(_arr));
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Pearent = require './pearetn'
	
	/**
	 * Module
	 * @class
	 */
	
	var Module = function () {
	  _createClass(Module, [{
	    key: 'CONST',
	
	
	    /**
	     * public const
	     * @instance
	     * @return {string}
	     */
	    get: function get() {
	      return 'public const';
	    }
	
	    /**
	     * public propertie
	     * @instance
	     * @prop {string}
	     */
	
	  }], [{
	    key: 'CONST',
	    // extends Pearent
	
	    /**
	     * static public propertie
	     * @static
	     * @return {string}
	     */
	    get: function get() {
	      return 'static public const';
	    }
	
	    /**
	     * static public propertie
	     * @static
	     * @prop {string}
	     */
	
	  }]);
	
	  /**
	   * @instance
	   * @param arg {string|number|Object|Array} argument
	   */
	
	  function Module(arg) {
	    _classCallCheck(this, Module);
	
	    this.publicProp = 'public prop';
	
	    // super
	
	    this.prop = arg;
	
	    console.log(Module.CONST);
	
	    console.log(Module.staticPublicProp);
	
	    console.log(this.CONST);
	
	    console.log(this.publicProp);
	
	    Module.staticPublicMethod();
	
	    this.publicMethod();
	
	    console.log(Module.StaticPublicGetter);
	
	    console.log(this.publicGetter);
	
	    Module.staticPublicSetter = 'static public setter';
	    console.log(Module.staticPublicProp);
	
	    this.publicSetter = 'public setter';
	    console.log(this.publicProp);
	  }
	
	  /**
	   * static public method
	   * @static
	   */
	
	
	  _createClass(Module, [{
	    key: 'publicMethod',
	
	
	    /**
	     * public method
	     * @instance
	     */
	    value: function publicMethod() {
	      console.log('public');
	    }
	
	    /**
	     * static public getter
	     * @static
	     * @return {string}
	     */
	
	  }, {
	    key: 'publicGetter',
	
	
	    /**
	     * public getter
	     * @instance
	     * @return {string}
	     */
	    get: function get() {
	      return 'public getter';
	    }
	
	    /**
	     * static public setter
	     * @static
	     * @param str {string}
	     */
	
	  }, {
	    key: 'publicSetter',
	
	
	    /**
	     * public setter
	     * @instance
	     * @param str {string}
	     */
	    set: function set(str) {
	      this.publicProp = str;
	    }
	  }], [{
	    key: 'staticPublicMethod',
	    value: function staticPublicMethod() {
	      console.log('static method');
	    }
	  }, {
	    key: 'StaticPublicGetter',
	    get: function get() {
	      return 'static public getter';
	    }
	  }, {
	    key: 'staticPublicSetter',
	    set: function set(str) {
	      Module.staticPublicProp = str;
	    }
	  }]);
	
	  return Module;
	}();
	
	/**
	 * class export
	 */
	
	
	Module.staticPublicProp = 'static public prop';
	exports.default = Module;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Template
	 * @class
	 */
	
	var Template =
	
	/**
	 * @instance
	 */
	function Template() {
	  _classCallCheck(this, Template);
	
	  var $tmp_ = document.getElementsByClassName('template')[0];
	  var $result_ = document.getElementsByClassName('result')[0];
	  var tmp_ = _.template($tmp_.innerHTML);
	  var obj_ = {
	    data: [{ class: 'class1', name: 'taro', age: 25 }, { class: 'class2', name: 'jiro', age: 18 }, { class: 'class3', name: 'saburo', age: 15 }]
	  };
	  $result_.append(tmp_(obj));
	};
	
	/**
	 * class export
	 */
	
	
	exports.default = Template;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map