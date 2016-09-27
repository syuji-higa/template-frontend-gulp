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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Sample {
  say() {
    return 'Hello World';
  }
}

/* harmony default export */ exports["a"] = Sample;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sample__ = __webpack_require__(0);

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

/**
 * create multiple incetance
 * @param {Class} useClass
 * @param {string} selector
 * @param {...*} opts
 * @return {Array<Instance>}
 */
const createIncetance = (useClass, selector, ...opts) => {
  const _$$el = document.querySelectorAll(selector);
  const _instances = [];
  for(let _i = 0; _$$el.length > _i; _i++) {
    const _arg = [ _$$el[_i] ];
    if(opts) Array.prototype.push.apply(_arg, opts);
    _instances.push(new useClass(..._arg));
  }
  return _instances;
};

/**
 * create single incetance
 * @param {Class} useClass
 * @param {string} selector
 * @param {...*} opts
 * @return {Instance}
 */
const createSingleIncetance = (useClass, selector, ...opts) => {
  const _$$el = document.querySelectorAll(selector);
  if(!_$$el.length) return false;
  const _arg = [_$$el];
  if(opts) Array.prototype.push.apply(_arg, opts);
  return new useClass(..._arg);
};

/**
 * get path name
 */
const getPathName = () => {
  return location.pathname.replace('index.html', '');
};

window.addEventListener('DOMContentLoaded', () => {

  // const page = getPathName();

  const _modules = [
    [ __WEBPACK_IMPORTED_MODULE_0_sample__["a" /* default */], '.js-sample' ]
  ];

  const _singleModules = [
    [ __WEBPACK_IMPORTED_MODULE_0_sample__["a" /* default */], '.js-sample' ]
  ];

  _modules.forEach((arr) => {
    createIncetance(...arr);
  });

  _singleModules.forEach((arr) => {
    createSingleIncetance(...arr);
  });

});


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map