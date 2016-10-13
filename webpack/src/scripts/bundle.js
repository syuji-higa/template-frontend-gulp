// import 'html5-polyfills/classList';
// import 'html5-polyfills/dataset';
// import 'fetch';
// import 'rAF';  // https://gist.github.com/1579671.git
// import 'polyfill/function';
// import 'lodash';
// import 'Velocity';
// import 'Velocity.ui';
// import 'velocity.easeplus';
// import 'vendor/custom-event-polyfill';  // https://github.com/krambuhl/custom-event-polyfill.git
// import 'html-domparser';  // https://gist.github.com/1129031.git
import { createIncetance, createSingleIncetance } from 'view/incetance';
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
