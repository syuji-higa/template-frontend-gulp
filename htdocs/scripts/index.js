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
	
	var _module = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../imports/modules/module\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _module2 = _interopRequireDefault(_module);
	
	var _template = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../imports/modules/template\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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
	// import 'fetch');
	// import '../../vendors/rAF';  // https://gist.github.com/paulirish/1579671
	// import '../../requires/polyfill/function';
	
	// create multiple incetance
	var createIncetance = function createIncetance(_class, _selector, _opts) {
	  var $$el_ = document.querySelectorAll(_selector);
	  var instances = [];
	  for (var i_ = 0; $$el_.length > i_; i_++) {
	    var arg_ = [$$el_[i_]];
	    if (_opts) arg_.push(_opts);
	    instances.push(new (Function.prototype.bind.apply(_class, [null].concat(arg_)))());
	  }
	  return instances;
	};
	
	// create single incetance
	var createSingleIncetance = function createSingleIncetance(_class, _selector, _opts) {
	  var $$el_ = document.querySelectorAll(_selector);
	  if (!$$el_.length) return false;
	  var arg_ = [$$el_];
	  if (_opts) arg_.push(_opts);
	  return new (Function.prototype.bind.apply(_class, [null].concat(arg_)))();
	};
	
	// get path name
	var getPathName = function getPathName() {
	  return location.pathname.replace('index.html', '');
	};
	
	window.addEventListener('DOMContentLoaded', function () {
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map