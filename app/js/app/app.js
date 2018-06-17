define(['radio',
        'router',
        'controllers/asideController',
        'controllers/headerController',
        'controllers/signInController',
        'controllers/registrationController',
        'controllers/registrationDogController',
        'controllers/profileController',
        'controllers/addPhotoController',
        'controllers/galleryController',
        'controllers/addNewsController',
        'controllers/newsFeedController',
        'controllers/mapController',
        'controllers/chatController',
        'controllers/settingsController',
        'fb'],
    function (radio,
             Router,
             AsideController,
             HeaderController,
             SignInController, 
             RegistrationController, 
             RegistrationDogController, 
             ProfileController, 
             AddPhotoController, 
             GalleryController, 
             AddNewsController, 
             NewsFeedController,
             MapController, 
             ChatController, 
             SettingsController,
             fb) {

        'use strict';

        return {
            handlers: function () {

                this.initOtherHandler = this.initOther.bind(this);
            },
            enable: function () {

                radio.once('signInOrOut', this.initOtherHandler);
            },
            init: function () {

                this.handlers();
                this.enable();
                fb.init();
            },
            offPreloader: function () {

                var off = function(){
                  $('.preloader').addClass('display-none'); 
                };
                setTimeout(off, 2000);   
            },
            initOther: function () {
                
                this.aside = new AsideController();
                this.header = new HeaderController();
                this.map = new MapController();
                this.signIn = new SignInController();
                this.registration = new RegistrationController();
                this.registrationDog = new RegistrationDogController();
                this.dogsProfile = new ProfileController();
                this.addPhoto = new AddPhotoController();
                this.gallery = new GalleryController();
                this.addNews = new AddNewsController();
                this.newsFeed = new NewsFeedController();
                this.chat = new ChatController();
                this.settings = new SettingsController();
                Router.loadHandler();
                this.offPreloader();
                radio.trigger('preloaderOff');

            }
            
        }
    }
);