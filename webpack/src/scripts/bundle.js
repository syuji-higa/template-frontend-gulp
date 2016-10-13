import { createIncetance, createSingleIncetance } from '../../imports/view/incetance';
import Sample from 'sample';
// import 'lodash';
// import 'Velocity';
// import 'Velocity.ui';
// import '../../vendors/velocity.easeplus';
// import 'custom-event-polyfill';  // https://github.com/krambuhl/custom-event-polyfill.git
// import 'html5-polyfills/classList';
// import 'html5-polyfills/dataset';
// import 'fetch';
// import 'rAF';  // https://gist.github.com/1579671.git
// import 'html-domparser';  // https://gist.github.com/1129031.git
// import '../../requires/polyfill/function';

/**
 * get path name
 */
const getPathName = () => {
  return location.pathname.replace('index.html', '');
};

window.addEventListener('DOMContentLoaded', () => {

  // const page = getPathName();

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
