define(['fb','radio'],
	function (fb, radio) {


    var AddNewsModel = function () {
       this.news = {
        sos: false
       }
       this.images = [];
    };

  AddNewsModel.prototype = {
        imgDownload: function (ev) {

                    var fileList = ev.target.files;
                    this.file  = fileList[0];
                    this.file.id = fb.generateId();
                    var puths = {
                            storage: 'images/' + fb.user.uid + '/temporal/new-news/' +this.file.id,
                            database:'users/' + fb.user.uid + '/temporal/new-news/' + this.file.id,
                            temporal: true
                          };
                    this.images.push(this.file);
                    fb.saveInStorage(this.file.id,this.file,puths);
                    radio.trigger('setupRefNewNews');
                    radio.trigger('addNewsRender');
        },
        removePhoto: function (target) {
                   var idImg = $(target).attr('data-id');
                   var puths = {
                    storage: 'images/' + fb.user.uid + '/temporal/new-news/' + idImg +'/',
                    database:'users/' + fb.user.uid + '/temporal/new-news/' + idImg +'/',
                   }
                   var remPhoto = this.images.find(function (file) {
                    return (file.id === idImg);
                   });

                   var a = this.images.indexOf(remPhoto);
                   if(a !== -1){
                     this.images.splice(a, 1);
                   }
                   fb.deleteInfoFullPuth(puths);
                   
        }

    };
    return  AddNewsModel;
});