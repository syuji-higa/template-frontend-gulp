import 'babel-polyfill';
import 'classList';  // https://github.com/eligrey/classList.js.git
import 'element-dataset';
import 'fetch-polyfill';  // ie8+
import 'whatwg-fetch';  // ie10+
import 'rAF';  // https://gist.github.com/1579671.git
import 'custom-event-polyfill';
import 'html-domparser';  // https://gist.github.com/1129031.git
import 'gsap';
import 'velocity';  // velocity-animate
import 'velocity.ui';  // velocity-animate
import 'velocity.easeplus';  // https://github.com/syuji-higa/easeplus-velocity.git
import { Router } from 'hash-router';  // https://github.com/michaelsogos/Hash-Router.git
import deepAssign from 'deep-assign';
import doT from 'doT';  // dot

if(typeof VENDORS !== 'undefined') {
  throw new Error('namespace "VENDORS" is already exists.');
}
window.VENDORS = {};

VENDORS.deepAssign = deepAssign;
VENDORS.HashRouter = Router;
VENDORS.doT        = doT;

doT.templateSettings = {
  evaluate    : /<%([\s\S]+?(\}?)+)%>/g,
  interpolate : /<%=([\s\S]+?)%>/g,
  encode      : /<%!([\s\S]+?)%>/g,
  use         : /<%#([\s\S]+?)%>/g,
  useParams   : /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
  define      : /<%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#%>/g,
  defineParams: /^\s*([\w$]+):([\s\S]+)/,
  conditional : /<%\?(\?)?\s*([\s\S]*?)\s*%>/g,
  iterate     : /<%~\s*(?:%>|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*%>)/g,
  varname         : 'it',
  strip           : true,
  append          : true,
  selfcontained   : false,
  doNotSkipEncoded: false
};
