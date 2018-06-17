define(['fb','radio'],
   function (fb, radio) {


    var GalleryModel = function () {
        this.dogsInfo='';
        this.file = {};
        this.dog ={};
    };

    GalleryModel.prototype = {

		setInfo: function (info) {

          this.dogsInfo = info;

    	},
    	getDogInfo: function (dogId) {
           var puth = 'dogs/'+ dogId;
           this.dog.id = dogId;
 
           var callbackFunction = function (snapshot){

              radio.trigger('renderGallery',snapshot);
           };
           fb.returnInfo(puth, callbackFunction);

    	},

    };
    return GalleryModel;
});