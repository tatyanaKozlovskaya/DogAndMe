define(['fb','radio'],
	function (fb, radio) {


    var AddPhotoModel = function () {
       
    };

   AddPhotoModel.prototype = {
        imgDownload: function (ev) {

                    var fileList = ev.target.files;
                    this.file  = fileList[0];
                    this.file.id = fb.generateId();
                    var puths = {
                            storage: 'images/' + fb.user.uid + '/temporal/new-photo/',
                            database:'users/' + fb.user.uid + '/temporal/new-photo/',
                            temporal: true
                          };
                    fb.saveInStorage(this.file.id,this.file,puths);
                    radio.trigger('setupRefNewPhoto');
                    radio.trigger('addPhotoRender');
        }

    };
    return  AddPhotoModel;
});