define(['models/mapModel','views/mapView','radio','fb','ym'],
  function(MapModel, MapView, radio, fb, ym){
    var MapController = function () {
        
        this.model = new MapModel();
        this.view = new MapView(this.model);
        
        this.init();
    };

  MapController.prototype = {

    	init: function () {

          this.handlers().enable();
          this.allDogsInfoReceived();

    	},
    	handlers: function () {

           this.allDogsInfoReceivedHandler = this.allDogsInfoReceived.bind(this);
           this.makeMapHandler = this.makeMap.bind(this);
           this.deleteMapHandler = this.deleteMap.bind(this);

          return this
      },
      enable: function () {

          radio.once('allDogsInfoReceived', this.allDogsInfoReceivedHandler);
          radio.on('makeMap', this.makeMapHandler);
          radio.on('deleteMap', this.deleteMapHandler);

          return this;
      },
      allDogsInfoReceived: function () {
           
      },
      makeMap: function () {
          ym.objectDogsToJson();
      },
      deleteMap: function () {
          ym.deleteMap();
      },

    };

    return MapController;
});