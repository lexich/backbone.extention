backbone.extention
==================

Usefull extention for Backbone.js

for every example use next statement

```js
var View = Backbone.View.extend({
   ....
});
var view = new View;
```

### Pointer to current View [VIEW_PTR]

```js
var View = Backbone.View.extend({
   VIEW_PTR:"pointer"
});

view.$el.data("pointer") === view;
```

### Named links to inner DOM elements [domLinks]

```js
var View = Backbone.View.extend({
   domLinks:{
     testLink:".testLink"
   }
});

//cache element, find once whole construct View
view.$d.testLink === $(".testLink", view.$el); 
//refind element
view.d("testLink") === $(".testLink", view.$el); 
```

### TemplateLoader [templatePath]
```html
<script id="templateID" type="text/template"><p>Hello</p></script>
```
```js
var View = Backbone.View.extend({
   templatePath:"#templateID"
});
view.$el.html() === "<p>Hello</p>" === view.template_content;
```

### <img> animated loader [imgLoadAnimation]
css Animations
```js
var View = Backbone.View.extend({
   el:"<div><img src='http://placehold.it/350x150'></div>"
   imgLoadAnimation:{
      self:{ // pointer to current DOM element this.el
             // we can use any jqeury selector to point to another element within this.el
         defaultClass:"defClass", // this.$el.addClass("defClass"); before img loaded
         defautlCSS:{             // this.$el.css({opacity:0});
           opacity:0
         },
         css:"fadeInCSSAnimation" // this.$el.addClass("fadeInCSSAnimation"); after img loaded
      }
   }
});
```

jQuery animations
```js
var View = Backbone.View.extend({
   el:"<div><img src='http://placehold.it/350x150'></div>"
   imgLoadAnimation:{
      self:{
         js:{
         // see http://api.jquery.com/animate/
          properties:{ opacity:1 }, 
          duration: 400,
          easing:"swing",
          complete:"on_complete" //callback this.on_complete in context
         }
      }
   },
   on_complete:function(){}
});
```

