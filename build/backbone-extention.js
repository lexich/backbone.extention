(function() {
  Backbone.View.prototype.extention = {
    __super__ensureElement: Backbone.View.prototype._ensureElement,
    initPtr: function() {
      if (this.VIEW_PTR != null) {
        return this.$el.data(this.VIEW_PTR, this);
      }
    },
    initTemplateLoader: function() {
      var $templateEl;
      if (this.templatePath == null) {
        return;
      }
      $templateEl = $(this.templatePath);
      if ((this.template_content = $templateEl.html())) {
        return this.$el.html(this.template_content);
      }
    },
    initImgLoadAnimation: function($imgs, options) {
      var _this = this;
      if (options == null) {
        options = this.imgLoadAnimation;
      }
      if (this.options == null) {
        return;
      }
      if ($imgs == null) {
        $imgs = this.$el.find("img");
      }
      _.each(options, function(opt, selector) {
        var $item;
        $item = selector === "this" || selector === "self" ? _this.$el : $(selector, _this.$el);
        if (opt.defaultClass != null) {
          $item.addClass(opt.defaultClass);
        }
        if (opt.defaultCSS != null) {
          return $item.css(opt.defaultCSS);
        }
      });
      return $imgs.load(_.bind(this.extention.eventImgLoadAnimation, this));
    },
    /*
    domLinks:{
      key:value
    }
    access to dom Links
    this.$d.key -> $(value,this.$el)
    */

    initDomLinks: function() {
      var _this = this;
      if (this.domLinks == null) {
        return;
      }
      this.$d = {};
      _.each(this.domLinks, function(selector, name) {
        return _this.$d[name] = $(selector, _this.$el);
      });
      return this.d = function(name) {
        return $(this.domLinks[name], this.$el);
      };
    },
    eventImgLoadAnimation: function(e) {
      var $img,
        _this = this;
      $img = $(e.target);
      return _.each(this.imgLoadAnimation, function(opt, selector) {
        var $item, className, jsOptions;
        $item = selector === "this" || selector === "self" ? _this.$el : $(selector, _this.$el);
        if (opt.css != null) {
          className = _.isString(opt.css) ? opt.css : opt.css["class"] || "";
          $item.addClass(className);
        }
        if (opt.js != null) {
          jsOptions = _.defaults({
            properties: {
              opacity: 1
            },
            duration: 400,
            easing: "swing",
            complete: function() {}
          }, opt.js);
          if (_.isString(jsOptions.complete)) {
            jsOptions.complete = _.bind(_this[jsOptions.complete], _this);
          }
          return $item.animate(jsOptions.properties, _.omit(jsOptions, "properties"));
        }
      });
    }
  };

  Backbone.View.prototype._ensureElement = function() {
    this.extention.__super__ensureElement.call(this);
    this.extention.initPtr.call(this);
    this.extention.initTemplateLoader.call(this);
    this.extention.initDomLinks.call(this);
    return this.extention.initImgLoadAnimation.call(this);
  };

}).call(this);
