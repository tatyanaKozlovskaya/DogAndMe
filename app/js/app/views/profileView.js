define(['underscore', 'text!templates/profileTemplate.html', 'radio','jquery','jqueryui','fb','ym'],
    function (_, profileTemplateString, radio, jquery, jqueryui, fb, ym) {

        var ProfileView = function (model) {
            this.model = model;
            this.$el = $('.profile-page');
            this.template = _.template(profileTemplateString);
            this.init();

        };

       ProfileView.prototype = {

            init: function () {
                
                this.enable();
            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                return this
            },
            render: function () {
                
                var dogNews = [];
                for (var prop in fb.dogNews){
                    var news = fb.dogNews[prop];
                    dogNews.push(news);
                }
                dogNews = dogNews.reverse();
                this.$el.html(this.template({
                      dogsInfo : this.model.dogsInfo,
                      user: fb.user,
                      userDog:fb.currentUserDog,
                      userData: fb.userData,
                      dogOwner: fb.currentDogOwnerInfo,
                      dogNews:dogNews,
                      allDogs: fb.allDogsInfo
                    
                    })
                );
                    this.insertMap();
            },
            insertMap: function(){
                 var selector = 'profile-map'
                 ym.createProfileMap(selector, this.model.dogsInfo.coords);
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.view-all-photos')){

                    radio.trigger('showGallery', this.model.dogsInfo.id);
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
                if($(ev.target).is('.delete-news')){

                    this.deleteNews(ev);
                }
                if($(ev.target).is('.follow')){

                    if(fb.user){
                        radio.trigger('followDog', $(ev.target).attr('data-id'));
                    } else {
                        this.$el.find('.need-autorisation').removeClass('display-none');
                        setTimeout(function() {
                        this.$el.find('.need-autorisation').addClass('display-none')
                     }.bind(this), 2000);
                    }
                }
                if($(ev.target).is('.is-follower')){

                    this.$el.find('.unFollowDog').removeClass('display-none');
                }
                if($(ev.target).is('.unFollow')){

                    radio.trigger('unFollowDog', $(ev.target).attr('data-id'));
                    this.$el.find('.unFollowDog').addClass('display-none');

                }
                if($(ev.target).is('.cancel-unFollow')){

                    this.$el.find('.unFollowDog').addClass('display-none');
                }
                if($(ev.target).is('.following-p') || $(ev.target).is('.following-count')){

                    this.$el.find('.following-dogs').removeClass('display-none');
                }
                if($(ev.target).is('.followers-p') || $(ev.target).is('.followers-count')){

                    this.$el.find('.followers-dogs').removeClass('display-none');
                }
                if($(ev.target).is('.close-following-dogs')){

                    this.$el.find('.following-dogs').addClass('display-none');
                }
                if($(ev.target).is('.close-followers-dogs')){

                    this.$el.find('.followers-dogs').addClass('display-none');
                }
                if($(ev.target).is('.dog-follower-photo-img') || $(ev.target).is('.dog-following-photo-img')){

                    radio.trigger('goToUserProfile', $(ev.target).attr('data-id'));
                }
                if($(ev.target).is('.send-message')){

                    radio.trigger('openChatRoom', $(ev.target).attr('data-id'));
                    document.location.href = "#chat";
                }
                
               
            },
            signInwithEmail: function(){
                
               this.$email = $('.email-input');
               this.$password = $('.password-input');
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
                $('.gallery-popup-photo').attr('src', this.model.file.src);
                if(this.model.file.description){
                    $('.gallery-popup-photo-description').text(this.model.file.description);
                } else {
                    $('.gallery-popup-photo-description').text(' ');
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
                      radio.trigger('goToUserProfile', id)
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
                    radio.trigger('goToUserProfile', fb.currentDogInfo.id);
                })
              
            },
            clearMap: function () {
             this.$el.find('#profile-map').html('');
              
            },

        };
        return ProfileView;
    });