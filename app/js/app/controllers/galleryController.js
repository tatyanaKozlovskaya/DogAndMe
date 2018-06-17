define(['models/galleryModel','views/galleryView','radio','fb'],
  function(GalleryModel, GalleryView, radio, fb){
    var GalleryController = function () {
        
        this.model = new GalleryModel();
        this.view = new GalleryView(this.model);
        
        this.init();
    };

  GalleryController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers: function () {

           this.setInfoHandler = this.setInfo.bind(this);
           this.showGalleryHandler = this.showGallery.bind(this);
           this.renderGalleryHandler = this.renderGallery.bind(this);
          return this
      },
      enable: function () {

          radio.on('makeNewProfile', this.setInfoHandler);  
          radio.on('showGallery', this.showGalleryHandler);
          radio.on('renderGallery',this.renderGalleryHandler)

          return this;
      },
      setInfo: function (dogsInfo) {
          this.model.setInfo(dogsInfo);
      },
      showGallery: function (dogsId) {
          document.location.href = "#gallery";
          this.model.getDogInfo(dogsId);
      },
      renderGallery: function (dogsInfo) {
          this.view.render(dogsInfo);
      },

    };

    return GalleryController;
});