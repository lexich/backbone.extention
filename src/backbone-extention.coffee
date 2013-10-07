Backbone.View::extention = 
  __super__ensureElement: Backbone.View::_ensureElement    

  initPtr: ->
    #assign current view to root DOM element
    @$el.data @VIEW_PTR, this if @VIEW_PTR?

  initTemplateLoader:->
    #load template to root DOM element
    return unless @templatePath?
    $templateEl = $(@templatePath)
    if(@template_content = $templateEl.html())
      @$el.html @template_content

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


  eventImgLoadAnimation:(e)->
    $img = $(e.target)
    _.each @imgLoadAnimation,(opt, selector)=>
      $item = if selector in ["this","self"] then @$el else $(selector, @$el)
      if opt.css?
        className = if _.isString(opt.css) then opt.css else (opt.css["class"] or "")
        $item.addClass className
      if opt.js?
        jsOptions= _.defaults {
          properties:{ opacity:1 }
          duration: 400
          easing:"swing"
          complete:->
        }, opt.js
        if _.isString(jsOptions.complete)
          jsOptions.complete = _.bind(this[jsOptions.complete],this)
        $item.animate jsOptions.properties, _.omit(jsOptions,"properties")

Backbone.View::_ensureElement = ->
  @extention.__super__ensureElement.call this    
  @extention.initPtr.call this
  @extention.initTemplateLoader.call this
  @extention.initDomLinks.call this  
  @extention.initImgLoadAnimation.call this