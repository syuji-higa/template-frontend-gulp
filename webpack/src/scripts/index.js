const Module = require('../../requires/modules/module');
const Template = require('../../requires/modules/template');
// require('lodash');
// require('Velocity');
// require('Velocity.ui');
// require('../../vendors/velocity.easeplus');
// require('custom-event-polyfill');  // https://github.com/krambuhl/custom-event-polyfill.git
// require('html5-polyfills/classList');
// require('html5-polyfills/dataset');
// require('fetch');
// require('../../vendors/rAF');  // https://gist.github.com/paulirish/1579671
// require('../../requires/polyfill/function');

// create multiple incetance
const createIncetance = (_class, _selector, _opts) => {
  const $$el_ = document.querySelectorAll(_selector);
  const instances = [];
  for(let i_ = 0; $$el_.length > i_; i_++) {
    const arg_ = [ $$el_[i_] ];
    if(_opts) arg_.push(_opts);
    instances.push(new _class(...arg_));
  }
  return instances;
};

// create single incetance
const createSingleIncetance = (_class, _selector, _opts) => {
  const $$el_ = document.querySelectorAll(_selector);
  if(!$$el_.length) return false;
  const arg_ = [$$el_];
  if(_opts) arg_.push(_opts);
  return new _class(...arg_);
};

// get path name
const getPathName = () => {
  return location.pathname.replace('index.html', '');
};

window.addEventListener('DOMContentLoaded', () => {

  // new Template();

  // const page = getPathName();

  const modules_ = [
    [ Template, '.sample1' ],
  ];

  const singleModules_ = [
    [ Template, '.sample2' ],
  ];

  modules_.forEach((_arr) => {
    createIncetance(..._arr);
  });

  singleModules_.forEach((_arr) => {
    createSingleIncetance(..._arr);
  });

});
