// Pearent = require './pearetn'

/**
 * Module
 * @class
 */
class Module { // extends Pearent

  /**
   * static public propertie
   * @static
   * @return {string}
   */
  static get CONST() {
    return 'static public const';
  }

  /**
   * static public propertie
   * @static
   * @prop {string}
   */
  static staticPublicProp = 'static public prop';

  /**
   * public const
   * @instance
   * @return {string}
   */
  get CONST() {
    return 'public const';
  }

  /**
   * public propertie
   * @instance
   * @prop {string}
   */
  publicProp = 'public prop';

  /**
   * @instance
   * @param arg {string|number|Object|Array} argument
   */
  constructor(arg) {
    // super

    this.prop = arg;

    console.log(Module.CONST);

    console.log(Module.staticPublicProp);

    console.log(this.CONST);

    console.log(this.publicProp);

    Module.staticPublicMethod();

    this.publicMethod();

    console.log(Module.StaticPublicGetter);

    console.log(this.publicGetter);

    Module.staticPublicSetter = 'static public setter';
    console.log(Module.staticPublicProp);

    this.publicSetter = 'public setter';
    console.log(this.publicProp);

  }

  /**
   * static public method
   * @static
   */
  static staticPublicMethod() {
    console.log('static method');
  }

  /**
   * public method
   * @instance
   */
  publicMethod() {
    console.log('public');
  }

  /**
   * static public getter
   * @static
   * @return {string}
   */
  static get StaticPublicGetter() {
    return 'static public getter'
  }

  /**
   * public getter
   * @instance
   * @return {string}
   */
  get publicGetter() {
    return 'public getter'
  }

  /**
   * static public setter
   * @static
   * @param str {string}
   */
  static set staticPublicSetter(str) {
    Module.staticPublicProp = str
  }

  /**
   * public setter
   * @instance
   * @param str {string}
   */
  set publicSetter(str) {
    this.publicProp = str
  }

}

/**
 * class export
 */
export default Module;
