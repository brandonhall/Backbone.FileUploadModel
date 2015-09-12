# Backbone.FileUploadModel.js

Add file uploads to Backbone models with minimal effort.

### Features

* Easily add file uploads to any Backbone Model
* Drop-in extension to Backbone.Model.save
* IE6-IE9 support with jquery.iframe-transport
* Respects Backbone conventions

This same problem was solved in a bit different way by [HomeSliceSolutions](https://github.com/homeslicesolutions/backbone-model-file-upload).
You may want to check that out before making a decision on which to use.

### Usage

1. Include Dependencies:

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone.js"></script>
    <!-- For IE6-IE9 support -->
    <script src="../src/jquery.iframe-transport.js"></script>
    ```

2. Include extensions's code:

    ```html
    <script src="../src/backbone.fileuploadmodel.js"></script>
    ```

3. See `index.js` in the `demo` folder for a full example.

    ```javascript
    model.save({}, {
      fileInput: this.$('input[type=file]'),
      fileAttribute: 'file',
    });
    ```
  
### Options

#### fileInput

    fileInput: null  

The fileInput DOM element as a jQuery object

#### fileAttribute

    fileAttribute: 'file'

The attribute the server is expecting. You can override this in your model or send 
something else entirely as an option when you call `model.save()`.

**Note**: Without a valid `fileInput` option calling `model.save()` will defer to 
`Backbone.Model.save` without any consequences. As a result, you can wherever you'd
like without worry.

### License

The MIT License