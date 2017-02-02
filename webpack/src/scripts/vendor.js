import 'babel-polyfill';  // https://www.npmjs.com/package/babel-polyfill
import 'html5-polyfills/classList';  // https://github.com/remy/polyfills
import 'html5-polyfills/dataset';  // https://github.com/remy/polyfills
import 'fetch-polyfill';  // https://www.npmjs.com/package/fetch-polyfill for ie8+
import 'whatwg-fetch';  // https://www.npmjs.com/package/whatwg-fetch for ie10+
import 'rAF';  // https://gist.github.com/1579671.git
import 'custom-event-polyfill';  // https://www.npmjs.com/package/custom-event-polyfill
import 'html-domparser';  // https://gist.github.com/1129031.git
import 'velocity';  // https://www.npmjs.com/package/velocity-animate
import 'velocity.ui';  // https://www.npmjs.com/package/velocity-animate
import 'velocity.easeplus';  // https://github.com/syuji-higa/easeplus-velocity
import deepAssign from 'deep-assign';  // https://www.npmjs.com/package/deep-assign

if(typeof VENDORS !== 'undefined') {
  throw new Error('namespace "VENDORS" is already exists.');
}
window.VENDORS = {};

VENDORS.deepAssign = deepAssign;
