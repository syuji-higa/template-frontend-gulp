import Sample from 'sample';
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
    [ Sample, '.js-sample' ]
  ];

  const _singleModules = [
    [ Sample, '.js-sample' ]
  ];

  _modules.forEach((arr) => {
    createIncetance(...arr);
  });

  _singleModules.forEach((arr) => {
    createSingleIncetance(...arr);
  });

});
