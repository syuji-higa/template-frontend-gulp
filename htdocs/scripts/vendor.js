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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"babel-polyfill\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"html5-polyfills/classList\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"html5-polyfills/dataset\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fetch-polyfill\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"whatwg-fetch\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rAF\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"custom-event-polyfill\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"html-domparser\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"velocity\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"velocity.ui\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"velocity.easeplus\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

var _deepAssign = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"deep-assign\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.npmjs.com/package/deep-assign

// https://www.npmjs.com/package/velocity-animate
// https://gist.github.com/1129031.git
// https://gist.github.com/1579671.git
// https://www.npmjs.com/package/fetch-polyfill for ie8+
// https://github.com/remy/polyfills
if (typeof VENDORS !== 'undefined') {
  throw new Error('namespace "VENDORS" is already exists.');
} // https://github.com/syuji-higa/easeplus-velocity
// https://www.npmjs.com/package/velocity-animate
// https://www.npmjs.com/package/custom-event-polyfill
// https://www.npmjs.com/package/whatwg-fetch for ie10+
// https://github.com/remy/polyfills
// https://www.npmjs.com/package/babel-polyfill

window.VENDORS = {};

VENDORS.deepAssign = _deepAssign2.default;

/***/ })
/******/ ]);
//# sourceMappingURL=vendor.js.map