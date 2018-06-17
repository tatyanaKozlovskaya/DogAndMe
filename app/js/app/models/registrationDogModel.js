define(function () {


    var RegistrationDogModel = function () {
         this.coords = []
    };

   RegistrationDogModel.prototype = {
        saveCoords: function(coords){
           this.coords = coords;
        }

    };
    return RegistrationDogModel;
});