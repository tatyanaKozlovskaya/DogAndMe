define(['underscore', 'text!templates/addPhotoTemplate.html', 'radio','jquery','jqueryui','fb','router'],
    function (_, addPhotoTemplateString, radio, jquery, jqueryui, fb, router) {

        var AddPhotoView = function (model) {
            this.model = model;
            this.$el = $('.add-photo-page');
            this.template = _.template(addPhotoTemplateString);
            this.init();

        };

       AddPhotoView.prototype = {

            init: function () {
                
                this.enable();
                this.render();

            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                this.$el.on('change', this.changeHandler.bind(this));

                return this
            },
            render: function (snapshot) {
                this.$el.html(this.template({
                     snapshot :snapshot,
                     user: fb.user
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.upload-photo')){
                    if(this.model.file){
                        this.uploadPhoto();
                    }
                }
                if($(ev.target).is('.cancel-photo')){
                    if(this.model.file){
                       
                        this.cleanPhotoAndTextArea();
                    }
                }

            },
            changeHandler: function (ev) {

              if ($(ev.target).is('.download-photos')) {
                            radio.trigger('userAddNewPhoto',ev);
                    }
            },
            uploadPhoto: function(){
                var $description = this.$el.find($('.photo-description')).val();
                var puths = {
                    storage: 'images/' + fb.currentUserDog.id + '/photos/'+ this.model.file.id,
                    database:'dogs/' + fb.currentUserDog.id + '/photos/'+ this.model.file.id,
                    description: $description
                };
                fb.saveInStorage(this.model.file.id, this.model.file, puths);
                this.render();
                fb.cleanTemporal();   
            },
            cleanPhotoAndTextArea: function () {
              
              this.model.file = '';
              this.render();

            }

        };
        return AddPhotoView;
    });