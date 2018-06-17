define(['underscore', 'text!templates/newsFeedTemplate.html', 'radio','jquery','jqueryui','fb','router'],
    function (_, newsFeedTemplateString, radio, jquery, jqueryui, fb, router) {

        var NewsFeedView = function (model) {
            this.model = model;
            this.$el = $('.news-page');
            this.template = _.template(newsFeedTemplateString);
            this.init();

        };

       NewsFeedView.prototype = {

            init: function () {
                
                this.enable();
               

            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));

                return this
            },
            render: function (info) {
                this.$el.html(this.template({
                     dogNews: info,
                     user: fb.user
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.upload-news')){
                    if(this.model.news){
                        this.uploadNews();
                    }
                }
                if($(ev.target).is('.popup') || $(ev.target).is('.current-photo') || $(ev.target).is('.close-popup')){
                    this.popupClose();
                }
                if($(ev.target).is('.gallery-mini-photo-img')){
                    this.popupShow(ev);
                }
                if($(ev.target).is('.delete-photo')){
                    this.deletePhoto();
                }
                if($(ev.target).is('.user-img')){
                  fb.dogId = $(ev.target).attr('data-id');
                  radio.trigger('goToUserProfile', fb.dogId)
                }
                if($(ev.target).is('.followed')){
                 $(ev.target).addClass('filtered');
                 this.$el.find('.all').removeClass('filtered');
                 radio.trigger('newsFeedRender',  this.model.followingNews);
                }
                if($(ev.target).is('.all')){
                 $(ev.target).addClass('filtered');
                 this.$el.find('.followed').removeClass('filtered');
                 radio.trigger('newsFeedRender', this.model.allNews);
                }
                if($(ev.target).is('.delete-news')){
                    this.deleteNews(ev);
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
                this.model.file.folder = $(ev.target).attr('data-folder');
                this.model.file.uid = $(ev.target).attr('data-uid');
                $('.gallery-popup-photo').attr('src', this.model.file.src);
                if(this.model.file.description){
                    $('.gallery-popup-photo-description').text(this.model.file.description);
                } else {
                    $('.gallery-popup-photo-description').text(' ');
                }
                this.isItUserProfile();
            },
            isItUserProfile: function (){

                 if(fb.user && fb.user.uid){
                   if(this.model.file.uid === fb.user.uid) { 
                   this.$el.find('figcaption').append('<span class="delete-photo">удалить фото</span>');
                    }
                }
            },
            deletePhoto: function (ev) {
               
               var id = $('.dogs-img').attr('data-id');
               var puths = {
                storage: this.model.file.puth,
                database: 'dogs/'+ id + '/photos/'
               };
               if(this.model.file.folder === 'news'){
                var puths = {
                    storage: this.model.file.puth,
                    database: 'news/'+ this.model.file.id + '/images/'
                }
               }
               Promise.resolve()
                .then(function () {
                     fb.deleteInfoFullPuth(puths);
                }.bind(this))
                .then(function () {
                      radio.trigger('getNews')
                }.bind(this))

            },
            deleteNews: function (ev) {
               var newsId = $(ev.target).attr('data-id');
               var puth = 'news/' + newsId + '/images';
               var basePuth = 'news/' + newsId;
               Promise.resolve()
                .then(function () {
                    fb.cleanTemporal(puth);
                })
                .then(function () {
                    fb.deleteFromDataBase(basePuth);
                })
                .then(function () {
                    radio.trigger('getNews');
                })
              
            },
            
            
        };
        return NewsFeedView;
    });