require 'html5shiv'
$ = window.jQuery = require 'jquery'
_ = require 'lodash'
Module = require '../../requires/modules/module'
Template = require '../../requires/modules/template'

###
require in the case of not-IE6-7
###
spt = $.support
unless !spt.opacity and !spt.style
  require 'Velocity'
  require 'Velocity.ui'

###
multiple new class
###
newClass = (className, el, opts) ->
  $ el
    .each ({}, _el) ->
      if opts
        new className _el, opts
      else
        new className _el

###
single new class
###
newClassSingle = (className, el, opts) ->
  $el = $ el
  if $el.size()
    if opts
      new className el, opts
    else
      new className el

###
get path name
###
getPathName = ->
  pathName = location.pathname
  params = location.search
  if pathName.match 'index.html'
    pathName = pathName.replace 'index.html', ''
  if params
    pathName = pathName.replace params, ''
  pathName


$ document
  .one 'ready', ->

    new Module
    new Template

    # page = getPathName()

    # _.forEach [
    #   [ ClassName, '#element1' ]
    #   [ ClassName, '#element2' ]
    # ], (arr) ->
    #   newClass.apply @, arr
    #   newClassSingle.apply @, arr
