$ = require 'jquery'
_ = require 'lodash'

module.exports =
class Template

  constructor: ->
    $tmp = $ '.template'
    $result = $ '.result'
    tmp = _.template $tmp.html()
    obj = data: [
      { class: 'class1', name: 'taro',   age: 25 }
      { class: 'class2', name: 'jiro',   age: 18 }
      { class: 'class3', name: 'saburo', age: 15 }
    ]
    $result
      .append tmp obj
