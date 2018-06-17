define(['models/profileModel','views/profileView','radio','fb','ym'],
  function(ProfileModel, ProfileView, radio, fb, ym){
    var ProfileController = function () {
        
        this.model = new ProfileModel();
        this.view = new ProfileView(this.model);
        
        this.init();
    };

  ProfileController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers: function () {

          this.setupReferensPhotogalleryHandler = this.setupReferensPhotogallery.bind(this);
          this.makeNewProfileHandler = this.makeNewProfile.bind(this);
          this.followDogHandler = this.followDog.bind(this);
          this.unFollowDogHandler = this.unFollowDog.bind(this);
          this.signInOrOutHandler = this.signInOrOut.bind(this);
          this.deleteProfileMapHandler = this.deleteProfileMap.bind(this);
          
          return this
      },
      enable: function () {

          radio.once('setupReferensPhotogallery', this.setupReferensPhotogalleryHandler);
          radio.on('makeNewProfile', this.makeNewProfileHandler);
          radio.on('followDog', this.followDogHandler);
          radio.on('unFollowDog', this.unFollowDogHandler);
          radio.on('signInOrOut',this.signInOrOutHandler);
          radio.on('deleteProfileMap',this.deleteProfileMapHandler);
                  
          return this;
      },
      makeNewProfile: function (dogsInfo) {

          this.model.setInfo(dogsInfo);
          this.view.render();

      },
      setupReferensPhotogallery: function () {

          fb.setupReferensPhotogallery();
      },
      followDog: function (dogId) {

          this.model.followDog(dogId);
      },
      unFollowDog: function (dogId) {

          this.model.unFollowDog(dogId);
      },
      signInOrOut:  function () {
        
          this.view.render();
          this.view.clearMap();
      },
      deleteProfileMap: function () {
          ym.deleteProfileMap();
      },
    };

    return ProfileController;
});