# $ = require 'jquery'

###
private var
###
_componentPrivateVar = 'component private var'
_COMPONENT_CONST: 'component const'

###
private method
###
componentPrivateMethod = (arg) ->
  console.log 'component private method'

module.exports =

  ###
  public var
  ###
  componentPublicVar: 'component public var'

  ###
  public method
  ###
  componentPublicMethod: (arg) ->
    componentPrivateMethod()
    console.log 'component public method'
