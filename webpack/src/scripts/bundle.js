import 'babel-polyfill';  // https://www.npmjs.com/package/babel-polyfill
import 'html5-polyfills/classList';
import 'html5-polyfills/dataset';
import 'fetch-polyfill';  // https://www.npmjs.com/package/fetch-polyfill for ie8+
import 'whatwg-fetch';  // https://www.npmjs.com/package/whatwg-fetch for ie10+
import 'rAF';  // https://gist.github.com/1579671.git
import 'custom-event-polyfill';  // https://www.npmjs.com/package/custom-event-polyfill
import 'html-domparser';  // https://gist.github.com/1129031.git
import 'velocity';  // https://www.npmjs.com/package/velocity-animate
import 'velocity.ui';  // https://www.npmjs.com/package/velocity-animate
import 'velocity.easeplus';  // https://github.com/syuji-higa/easeplus-velocity
import { createIncetance, createSingleIncetance } from 'utility/incetance';
import Sample from 'sample';

window.addEventListener('DOMContentLoaded', () => {

  const _modules = [
    [ Sample, '.js-sample' ],
  ];

  const _singleModules = [
    [ Sample, '.js-sample' ],
  ];

  _modules.forEach((arr) => {
    createIncetance(...arr);
  });

  _singleModules.forEach((arr) => {
    createSingleIncetance(...arr);
  });

});
