/**
 * Backbone.FileUploadModel usage demo
 * 
 * This will fail when the code eventually reaches Backbone.save
 * Only here to show sample use of the extension
 */

;(function() {

  var App = window.App = { };

  App.Model = Backbone.FileUploadModel.extend();
  
  App.View = Backbone.View.extend({
    el: $('section'),
    model: new App.Model,
    
    events: {
      'submit form': 'save'
    },
    
    save: function(e) {
      e.preventDefault();
      
      this.model.save({}, {
        fileAttribute: 'file',
        fileInput: this.$('input')
      });
    }
  });
  
  new App.View();
  
})();