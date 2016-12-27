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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sample = function () {
  function Sample() {
    _classCallCheck(this, Sample);
  }

  _createClass(Sample, [{
    key: 'say',
    value: function say() {
      return 'Hello World';
    }
  }]);

  return Sample;
}();

exports.default = Sample;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * incetance
 */

/**
 * @param {!Class} useClass
 * @param {!string} selector
 * @param {...*} [opts]
 * @return {Array<Instance>}
 */
var createIncetance = exports.createIncetance = function createIncetance(useClass, selector) {
  for (var _len = arguments.length, opts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    opts[_key - 2] = arguments[_key];
  }

  var _$$el = document.querySelectorAll(selector);
  var _instances = [];
  for (var _i = 0; _$$el.length > _i; _i++) {
    var _arg = [_$$el[_i]];
    if (opts) Array.prototype.push.apply(_arg, opts);
    _instances.push(new (Function.prototype.bind.apply(useClass, [null].concat(_arg)))());
  }
  return _instances;
};

/**
 * @param {!Class} useClass
 * @param {!string} selector
 * @param {...*} [opts]
 * @return {Instance}
 */
var createSingleIncetance = exports.createSingleIncetance = function createSingleIncetance(useClass, selector) {
  for (var _len2 = arguments.length, opts = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    opts[_key2 - 2] = arguments[_key2];
  }

  var _$$el = document.querySelectorAll(selector);
  if (!_$$el.length) return false;
  var _arg = [_$$el];
  if (opts) Array.prototype.push.apply(_arg, opts);
  return new (Function.prototype.bind.apply(useClass, [null].concat(_arg)))();
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _incetance = __webpack_require__(1);

var _sample = __webpack_require__(0);

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // import 'html5-polyfills/classList';
// import 'html5-polyfills/dataset';
// import 'fetch';
// import 'rAF';  // https://gist.github.com/1579671.git
// import 'polyfill/function';
// import 'lodash';
// import 'Velocity';
// import 'Velocity.ui';
// import 'velocity.easeplus';
// import 'custom-event-polyfill';  // https://github.com/krambuhl/custom-event-polyfill.git
// import 'html-domparser';  // https://gist.github.com/1129031.git


window.addEventListener('DOMContentLoaded', function () {

  var _modules = [[_sample2.default, '.js-sample']];

  var _singleModules = [[_sample2.default, '.js-sample']];

  _modules.forEach(function (arr) {
    _incetance.createIncetance.apply(undefined, _toConsumableArray(arr));
  });

  _singleModules.forEach(function (arr) {
    _incetance.createSingleIncetance.apply(undefined, _toConsumableArray(arr));
  });
});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map