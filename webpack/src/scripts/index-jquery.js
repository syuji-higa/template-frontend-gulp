const $ = window.jQuery = require('jquery');
const _ = require('lodash');
const Module = require('../../requires/modules/module');
const Template = require('../../requires/modules/template');
require('html5shiv');
require('Velocity');
// require('Velocity.ui');
require('../../books-es2015/polyfill/function');

// multiple new class
const newClass = (className, el, opts) => {
  $(el).each(({}, _el) => {
    if(opts) {
      new className(_el, opts);
    } else {
      new className(_el);
    }
  });
};

// single new class
const newClassSingle = (className, el, opts) => {
  const $el = $(el);
  if($el.size()) {
    if(opts) {
      new className(el, opts);
    } else {
      new className(el);
    }
  }
};

// get path name
const getPathName = () => {
  let pathName = location.pathname;
  const params = location.search;
  if(pathName.match('index.html')) {
    pathName = pathName.replace('index.html', '');
  }
  if(params) {
    pathName = pathName.replace(params, '');
  }
  return pathName;
};

$(document).one('ready', () => {

  new Module();
  new Template();

  // var page = getPathName()

  // _.forEach([
  //     [ ClassName, '#element1' ],
  //     [ ClassName, '#element2' ],
  //   ], (arr) => {
  //     newClass(...arr);
  //     newClassSingle(...arr);
  //   }
  // );

});
