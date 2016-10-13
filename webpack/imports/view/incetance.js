/**
 * incetance
 */

/**
 * @param {!Class} useClass
 * @param {!string} selector
 * @param {...*} [opts]
 * @return {Array<Instance>}
 */
export const createIncetance = (useClass, selector, ...opts) => {
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
 * @param {!Class} useClass
 * @param {!string} selector
 * @param {...*} [opts]
 * @return {Instance}
 */
export const createSingleIncetance = (useClass, selector, ...opts) => {
  const _$$el = document.querySelectorAll(selector);
  if(!_$$el.length) return false;
  const _arg = [_$$el];
  if(opts) Array.prototype.push.apply(_arg, opts);
  return new useClass(..._arg);
};
