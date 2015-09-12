describe('Backbone.FileUploadModel', function() {

  jasmine.getFixtures().fixturesPath = 'fixtures';
  
  beforeEach(function() {
    loadFixtures('index.html');
    
    this.modelPrototype = Backbone.Model.prototype;
    this.fileUploadModelPrototype = Backbone.FileUploadModel.prototype;

    this.model = new Backbone.FileUploadModel({
      url: 'jasmineTesting'
    });

    spyOn(this.fileUploadModelPrototype, 'save').and.returnValue(true);
    spyOn(this.modelPrototype, 'save').and.returnValue(true);
  });
  
  it('requires Backbone', function() {
    expect(Backbone).toBeDefined();
  });

  it('requires jQuery', function() {
    expect(window.jQuery).toBeDefined();
  });

  it('extends from Backbone.Model', function() {
    expect(this.model).toEqual(jasmine.any(Backbone.Model));
  });

  it('has a fileAttribute', function() {
    expect(this.model.fileAttribute).toBeDefined();
  });
  
  it('has a fileAttribute named file', function() {
    expect(this.model.fileAttribute).toEqual('file');
  });

  describe('Backbone.FileUploadModel.save()', function() {
    
    beforeEach(function() {
      this.model.save();
    });

    it('should call Backbone.FileUploadModel.save()', function() {
      expect(this.fileUploadModelPrototype.save).toHaveBeenCalled();
    });

    it('should call Backbone.Model.save()', function() {
      expect(this.model.save).toHaveBeenCalled();
    });
    
  });

});
