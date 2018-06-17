define(['models/registrationDogModel','views/registrationDogView','radio','fb'],
  function(RegistrationDogModel, RegistrationDogView, radio, fb){
    var RegistrationDogController = function () {
        
        this.model = new RegistrationDogModel();
        this.view = new RegistrationDogView(this.model);
        
        this.init();
    };

   RegistrationDogController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers: function () {

          this.newDogAvatarHandler = this.newDogAvatar.bind(this);
          this.registerNewDogHandler = this.registerNewDog.bind(this);
          this.registerNewDogInUserBaseHandler = this.registerNewDogInUserBase.bind(this);
          this.getToProfileHandler = this.getToProfile.bind(this);
          this.registrationDogAdressHandler = this.registrationDogAdress.bind(this);
          this.registrationCoordsHandler = this.registrationCoords.bind(this);
          this.registrationDogInitHandler = this.registrationDogInit.bind(this);
          this.setFocusOutEventHandler = this.setFocusOutEvent.bind(this);

          return this
      },
      enable: function () {

          radio.on('newDogAvatar', this.newDogAvatarHandler);
          radio.on('registerNewDog', this.registerNewDogHandler);
          radio.on('registerNewDogInUserBase', this.registerNewDogInUserBaseHandler);
          radio.on('getToProfile', this.getToProfileHandler);
          radio.on('registrationDogAdress', this.registrationDogAdressHandler);
          radio.on('registrationCoords', this.registrationCoordsHandler);
          radio.once('registrationDogInit', this.registrationDogInitHandler);
          radio.once('setFocusOutEvent', this.setFocusOutEventHandler);
          
          
          return this;
      },
      newDogAvatar: function (snapshot) {

          this.view.newDogAvatarRegistration(snapshot);
      },
      registerNewDog: function (puth, data) {

          fb.saveInfoFullPuth(puth, data);
      },
      registerNewDogInUserBase: function (puth, data, callbackFunction) {

          fb.saveInfoFullPuth(puth, data, callbackFunction);
      },
      getToProfile: function () {

           document.location.href = "#profile";
      },
      registrationDogAdress: function (address) {

          this.view.insertAddress(address);
      },
      registrationCoords: function (coords) {

          this.model.saveCoords(coords);
      },
      registrationDogInit: function (coords) {

          this.view.init();
      },
      setFocusOutEvent: function (coords) {

          this.view.setFocusOutEvent();
      },

        
    };

    return RegistrationDogController;
});