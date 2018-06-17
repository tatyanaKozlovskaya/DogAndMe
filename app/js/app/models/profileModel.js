define(['fb', 'radio'],
    function (fb, radio) {


    var ProfileModel = function () {
         this.dogsInfo='';
         this.file={};
    };

   ProfileModel.prototype = {

     	setInfo: function (info) {

          this.dogsInfo = info;
    	},
        followDog: function (dogId) {

          var puthForUser = 'dogs/'+ fb.currentUserDog.id + '/following/' + fb.currentDogInfo.id;
          var puthForDog = 'dogs/' + fb.currentDogInfo.id + '/followers/' + fb.currentUserDog.id;
          fb.saveInfoFullPuth(puthForDog, fb.currentUserDog.id);
          var callbackFunction = function (){
             radio.trigger('goToUserProfile', dogId);
          }
          fb.saveInfoFullPuth(puthForUser, dogId, callbackFunction);
        },
        unFollowDog: function (dogId) {

         var puthForUser = 'dogs/'+ fb.currentUserDog.id + '/following/' + fb.currentDogInfo.id;
          var puthForDog = 'dogs/' + fb.currentDogInfo.id + '/followers/' + fb.currentUserDog.id;
          fb.deleteFromDataBase(puthForDog);
          var callbackFunction = function (){
             radio.trigger('goToUserProfile', dogId);
          }
          fb.deleteFromDataBase(puthForUser, callbackFunction);
        },
    };
    return  ProfileModel;
});