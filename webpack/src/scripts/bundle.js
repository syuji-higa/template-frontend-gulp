import { createIncetance, createSingleIncetance } from 'utility/incetance';
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
    createIncetance(...arr);
  });

  _singleModules.forEach((arr) => {
    createSingleIncetance(...arr);
  });

});
