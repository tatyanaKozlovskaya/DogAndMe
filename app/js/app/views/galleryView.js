define(['underscore', 'text!templates/galleryTemplate.html', 'radio','jquery','fb'],
    function (_, galleryTemplateString, radio, jquery, fb) {

        var GalleryView = function (model) {
            this.model = model;
            this.$el = $('.gallery-page');
            this.template = _.template(galleryTemplateString);
            this.init();

        };

       GalleryView.prototype = {

            init: function () {
                
                this.enable();
            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));

                return this
            },
            render: function (dogsInfo) {
                
                this.$el.html(this.template({
                      dogsInfo : dogsInfo,
                      dogId: this.model.dog.id,
                      user: fb.user
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.popup') || $(ev.target).is('.current-photo') || $(ev.target).is('.close-popup')){
                    this.popupClose();
                }
                if($(ev.target).is('.gallery-img')){
                    this.popupShow(ev);
                }
                if($(ev.target).is('.delete-photo')){
                    this.deletePhoto();
                }
                if($(ev.target).is('.dog-photo-img') || $(ev.target).is('.dog-name')){
                    var id = $('.dog-photo-img').attr('data-id');
                    radio.trigger('goToUserProfile', id)
                }
            },
            popupClose: function () {
                $('.popup').addClass('display-none');
            },
            popupShow: function (ev) {
                $('.popup').removeClass('display-none');
                this.model.file.src = $(ev.target).attr('src');
                this.model.file.puth = $(ev.target).attr('data-puth');
                this.model.file.id = $(ev.target).attr('data-id');
                this.model.file.description = $(ev.target).attr('data-description');
                $('.gallery-popup-photo').attr('src', this.model.file.src);
                if(this.model.file.description){
                    $('.gallery-popup-photo-description').text(this.model.file.description);
                } else {
                    $('.gallery-popup-photo-description').text(' ');
                }
            },
            deletePhoto: function (ev) {
               var id = $('.dog-photo-img').attr('data-id');
               var puths = {
                storage: this.model.file.puth,
                database: 'dogs/'+ id + '/photos/'
               };
               Promise.resolve()
                .then(function () {
                     fb.deleteInfoFullPuth(puths);
                }.bind(this))
                .then(function () {
                      radio.trigger('showGallery', id);
                }.bind(this))
            },
        };
        return GalleryView;
    });