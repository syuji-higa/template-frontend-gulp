import { createInstance, createSingleInstance } from 'utility/instance';
import Sample from 'sample';

if(typeof NS !== 'undefined') {
  throw new Error('namespace "NS" is already exists.');
}
window.NS = {};

window.addEventListener('DOMContentLoaded', () => {

  const _modules = [
    [ Sample, '.js-sample' ],
  ];

  const _singleModules = [
    [ Sample, '.js-sample' ],
  ];

  _modules.forEach((arr) => {
    createInstance(...arr);
  });

  _singleModules.forEach((arr) => {
    createSingleInstance(...arr);
  });

});
