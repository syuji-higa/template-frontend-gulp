$ = window.jQuery = require 'jquery'
require 'jquery-color'
require 'lodash'
{ componentPublicMethod, @componentStaticPublicMethod } = require '../components/component'
# Pearent = require './pearetn'

module.exports =
class Module # extends Pearent

  ###
  static public var / constants
  ###
  @staticPublicVar: 'static public var'
  @CONST: 'const'

  ###
  public var
  ###
  publicVar: 'public var'

  ###
  static private var
  ###
  _privateVar = 'private var'

  ###
  constructor
  ###
  constructor: (@arg) ->
    # super

    ###
    instance var
    ###
    @$window = $ window # public var
      .one 'load', (arg) =>
        Module.staticPublicFunc arg
        @publicFunc arg
        _privateFunc.call @, arg

    $ 'button'
      .on 'click', =>
        $ '.txt'
          .text 'ok'

  ###
  static public method
  ###
  @staticPublicFunc: (arg) ->
    console.log 'static public'

  ###
  public method
  ###
  publicFunc: (arg) ->
    console.log 'public'

  ###
  static private method
  ###
  _privateFunc = (arg) ->
    console.log 'private'
    componentPublicMethod()
