define(function () {


    var AsideModel = function () {
          this.count;
    };

   AsideModel.prototype = {

        newMessageCount: function(count){
        	this.count = count || false;
        }
    };
    return AsideModel;
});