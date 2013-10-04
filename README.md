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
view.$el.html() === "<p>Hello</p>";
```






