define(['models/asideModel','views/asideView','radio'],
  function(AsideModel,AsideView,radio){
    var AsideController = function () {
        
        this.model = new AsideModel();
        this.view = new AsideView(this.model);
        
        this.init();
    };

   AsideController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers:function () {  

          this.newMessageCountHandler = this.newMessageCount.bind(this);
          this.signInOrOutHandler = this.signInOrOut.bind(this);

          return this
    	},
    	enable: function () {

          radio.on('newMessageCount', this.newMessageCountHandler);
          radio.on('signInOrOut', this.signInOrOutHandler);

          return this;
      },
      newMessageCount: function(count){
        this.model.newMessageCount(count);
        this.view.render();
      },
      signInOrOut: function(){
        this.model.newMessageCount();
        this.view.render();
      },

       
    };
     return AsideController

});