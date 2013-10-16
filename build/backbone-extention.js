(function() {
  Backbone.View.prototype.extention = {
    __super__ensureElement: Backbone.View.prototype._ensureElement,
    initPtr: function() {
      if (this.VIEW_PTR != null) {
        return this.$el.data(this.VIEW_PTR, this);
      }
    },
    initTemplateLoader: function() {
      var $templateEl, data;
      if (this.templatePath != null) {
        $templateEl = $(this.templatePath);
        this.templateContent = $templateEl.html();
      }
      if ((this.templateContent != null) && !this.templateCompiled) {
        this.templateProcessor || (this.templateProcessor = _.template);
        this.templateCompiled = this.templateProcessor(this.templateContent);
      }
      if (this.templateCompiled != null) {
        data = this.templateData != null ? _.result(this, "templateData") : {};
        return this.$el.html(this.templateCompiled(data));
      } else if (this.templateContent != null) {
        return this.$el.html(this.templateContent);
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
    bindContext: function(ctx, param) {
      var func;
      func = _.isString(param) ? ctx[param] : param;
      if (func != null) {
        return _.bind(func, ctx);
      } else {
        return null;
      }
    },
    eventImgLoadAnimation: function(e) {
      var $img, options,
        _this = this;
      $img = $(e.target);
      options = this.imgLoadAnimation;
      return _.each(options, function(opt, selector) {
        var $item, afterRender, beforeRender, className, complete, jsOptions;
        beforeRender = _this.extention.bindContext(_this, opt.beforeRender);
        afterRender = _this.extention.bindContext(_this, opt.afterRender);
        complete = _this.extention.bindContext(_this, opt.complete);
        $item = selector === "this" || selector === "self" ? _this.$el : $(selector, _this.$el);
        if (typeof beforeRender === "function") {
          beforeRender($item, opt);
        }
        if (opt.css != null) {
          className = _.isString(opt.css) ? opt.css : opt.css["class"] || "";
          $item.addClass(className);
          if (typeof afterRender === "function") {
            afterRender($item, opt);
          }
        }
        if (opt.js != null) {
          jsOptions = _.defaults({
            properties: {
              opacity: 1
            },
            duration: 400,
            easing: "swing"
          }, opt.js);
          if (complete != null) {
            jsOptions.complete = complete;
          }
          $item.animate(jsOptions.properties, _.omit(jsOptions, "properties"));
          return typeof afterRender === "function" ? afterRender($item, opt) : void 0;
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
