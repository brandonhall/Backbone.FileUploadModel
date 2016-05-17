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

      attrs || (attrs = {});
      options || (options = {});

      var save = Backbone.Model.prototype.save;
      var $fileInput = options.fileInput;
      var file = options.file;
      var fileAttribute = options.fileAttribute || this.fileAttribute;
      
      // Determine whether we have a jQuery or File object
      var isjQuery = window.jQuery && $fileInput instanceof jQuery;
      var isFileObject = window.File && $fileInput instanceof File;
      
      // Do we have a valid option?
      if (!$fileInput && !file) {
        return save.call(this, attrs, options);
      }

      // Is fileInput a jQuery object and is file and a file object?
      if ( ($fileInput && !isjQuery) && (file && !isFileObject) ) {
        return save.call(this, attrs, options);
      }

      // Does the fileInput have a file?
      if ($fileInput && !$fileInput.val().length) {
        return save.call(this, attrs, options);
      }

      // Send all attributes if PATCH isn't set
      if (!options.patch) {
        _.extend(attrs, this.attributes);
      }

      _.extend(options, { processData: false });

      // Modern browser check for FormData support
      if (!!(window.FormData)) {

        // Set the fileAttribute right before FormData conversion
        attrs[fileAttribute] = file || $fileInput.get(0).files[0];
        
        _.extend(options, {
          data: this._getFormData(attrs),
          contentType: false
        })
      }

      // Use jquery.iframe-transport for IE6-9 browser support
      else {

        // Find the verb we'll use - following Backbone's rules here
        var verb = this.isNew() ? 'POST' : (options.patch ? 'PATCH' : 'PUT');

        _.extend(options, {
          iframe: true,
          type: verb,
          files: $fileInput,
          data: attrs
        });
      }

      // xhr with a file upload requires processData to be false
      return save.call(this, attrs, _.extend({ processData: false }, options));
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
