import Module from '../../imports/modules/module';
import Template from '../../imports/modules/template';
// import 'lodash';
// import 'Velocity';
// import 'Velocity.ui';
// import '../../vendors/velocity.easeplus';
// import 'custom-event-polyfill';  // https://github.com/krambuhl/custom-event-polyfill.git
// import 'html5-polyfills/classList';
// import 'html5-polyfills/dataset';
// import 'fetch');
// import '../../vendors/rAF';  // https://gist.github.com/paulirish/1579671
// import '../../requires/polyfill/function';

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

  new Module();

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
