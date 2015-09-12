/**
 * Backbone.FileUploadModel v0.6 | https://github.com/brandonhall/backbone.fileuploadmodel
 * Copyright (c) Brandon Hall <b@brandonhall.me> | The MIT License
 */

;(function (Backbone, _) {

  if (!Backbone) {
    throw new Error('Backbone should be loaded before Backbone.FileUploadModel');
  }

  if (!window.jQuery) {
    throw new Error('Backbone.FileUploadModel requires jQuery');
  }
  
  Backbone.FileUploadModel = Backbone.Model.extend({
    
    fileAttribute: 'file',
    
    save: function(attrs, options) {

      options || (options = {});
      
      var save = Backbone.Model.prototype.save;
      var $fileInput = options.fileInput;
      var fileAttribute = options.fileAttribute || this.fileAttribute;
      
      // Do we have a fileInput option?
      if (!$fileInput) {
        save.call(this, attrs, options);
        return this;
      }
      
      // Is fileInput a jQuery object?
      if (!$fileInput instanceof jQuery) {
        save.call(this, attrs, options);
        return this;
      }

      // Does the fileInput have a file?
      if (!$fileInput.val().length) {
        save.call(this, attrs, options);
        return this;
      }
      
      // Send all attributes if PATCH isn't set
      if (!options.patch) {
        _.extend(attrs, this.attributes);
      }
      
      _.extend(options, { processData: false });

      // Modern browser check for FormData support
      if (!!(window.FormData)) {
        
        // Set the fileAttribute right before FormData conversion
        attrs[fileAttribute] = $fileInput.get(0).files[0];
        
        _.extend(options, {
          data: this._getFormData(attrs),
          contentType: false
        })
      }

      // Use jquery.iframe-transport for IE6-9 browser support
      else {

        // Find the verb we'll use - following Backbone's rules here
        var verb = attrs.id ? (options.patch ? 'PATCH' : 'PUT') : 'POST';

        _.extend(options, {
          iframe: true,
          type: verb,
          files: $fileInput,
          data: attrs
        });
      }
      
      // xhr with a file upload requires processData to be false
      save.call(this, attrs, _.extend({ processData: false }, options));
      
      return this;
    },
    
    // Turn attributes into FormData
    _getFormData: function(attrs) {
      var formData = new FormData();
      
      _.each(attrs, function(value, key) {
        
        // Stringify objects and arrays
        if (_.isObject(value) && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        }
        
        else {
          formData.append(key, value);
        }
      });
      
      return formData;
    }
  })

}(Backbone, _, undefined));
