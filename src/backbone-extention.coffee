Backbone.View::extention =
  __super__ensureElement: Backbone.View::_ensureElement

  initPtr: ->
    #assign current view to root DOM element
    @$el.data @VIEW_PTR, this if @VIEW_PTR?

  initTemplateLoader:->
    #load template to root DOM element
    if @templatePath?
      $templateEl = $(@templatePath)
      @templateContent = $templateEl.html()

    if @templateContent? and !@templateCompiled
      @templateProcessor or = _.template
      @templateCompiled = @templateProcessor @templateContent

    if @templateCompiled?
      data = if @templateData? then _.result(this, "templateData") else {}
      @$el.html @templateCompiled(data)
    else if @templateContent?
      @$el.html @templateContent


  initImgLoadAnimation:($imgs, options)->
    options = @imgLoadAnimation unless options?
    return unless @options?
    $imgs = @$el.find("img") unless $imgs?
    _.each options, (opt, selector)=>
      $item = if selector in ["this","self"] then @$el else $(selector, @$el)
      $item.addClass opt.defaultClass if opt.defaultClass?
      $item.css opt.defaultCSS if opt.defaultCSS?
    $imgs.load _.bind(@extention.eventImgLoadAnimation,this)

  ###
  domLinks:{
    key:value
  }
  access to dom Links
  this.$d.key -> $(value,this.$el)
  ###
  initDomLinks:->
    return unless @domLinks?
    @$d = {}
    _.each @domLinks, (selector, name)=>
      @$d[name] = $(selector, @$el)
    @d = (name)-> $(@domLinks[name], @$el)

  bindContext:(ctx, param)->
    func = if _.isString(param) then ctx[param] else param
    if func?
      _.bind(func,ctx)
    else
      null

  eventImgLoadAnimation:(e)->
    $img = $(e.target)
    options = @imgLoadAnimation
    _.each options,(opt, selector)=>
      beforeRender = @extention.bindContext this, opt.beforeRender
      afterRender = @extention.bindContext this, opt.afterRender
      complete = @extention.bindContext this, opt.complete

      $item = if selector in ["this","self"] then @$el else $(selector, @$el)
      beforeRender? $item, opt
      if opt.css?
        className = if _.isString(opt.css) then opt.css else (opt.css["class"] or "")
        $item.addClass className
        afterRender? $item, opt
      if opt.js?
        jsOptions= _.defaults {
          properties:{ opacity:1 }
          duration: 400
          easing:"swing"
        }, opt.js
        jsOptions.complete = complete if complete?
        $item.animate jsOptions.properties, _.omit(jsOptions,"properties")
        afterRender? $item, opt

Backbone.View::_ensureElement = ->
  @extention.__super__ensureElement.call this
  @extention.initPtr.call this
  @extention.initTemplateLoader.call this
  @extention.initDomLinks.call this
  @extention.initImgLoadAnimation.call this
