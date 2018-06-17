define(['jquery', 'jqueryui', 'fb', 'radio'],
    function (jquery, jqueryui, fb, radio) {
        var Router = function (config) {
            this.routs = config || [];
            this.$window = $(window);
            this.$pages = $('.page');
            this.init();

        };

        Router.prototype = {
            init: function () {

                this.$window.on('hashchange', this.hashHandler.bind(this));
                 
            },
            hashHandler: function (ev) {

                var nameOld = ev.originalEvent.oldURL.split('#');
                if (nameOld.length === 1) {
                    nameOld = "";
                } else {
                    nameOld = nameOld[nameOld.length - 1];
                }
                var nameNew = ev.originalEvent.newURL.split('#');
                nameNew = nameNew[nameNew.length - 1];
                var newRoute = this.routs.find(function (route) {
                    return (route.name === window.location.hash)

                });
                var oldRoute = this.routs.find(function (route) {
                    return (route.name === '#' + nameOld)

                });
                this.oldUrl = oldRoute;

                Promise.resolve()
                    .then(function () {
                        oldRoute && oldRoute.onLeave && oldRoute.onLeave();
                    })
                    .then(function () {
                        newRoute && newRoute.onEnter && newRoute.onEnter();
                    })
            },
            loadHandler: function () {
                if(document.location.hash){
                    if( document.location.hash === "#profile" && fb.currentDogInfo && fb.currentDogInfo.id){
                             radio.trigger('goToUserProfile', fb.currentDogInfo.id)
                             console.log(fb.currentDogInfo.id);
                        } else if (document.location.hash === "#gallery" && fb.currentDogInfo && fb.currentDogInfo.id){
                              radio.trigger('showGallery', fb.currentDogInfo.id);
                        } else if(document.location.hash === "#profile"){
                             document.location.href = "#map";
                        }
                    var newRoute = this.routs.find(function (route) {
                    return (route.name === document.location.hash)
                    });
                Promise.resolve()
                    .then(function () {
                        newRoute && newRoute.onEnter && newRoute.onEnter();
                    })
                } else {
                    radio.trigger('makeMap');
                    $('.map-page').removeClass('display-none');
                    document.location.href = "#map";
                } 
            },
            closePages: function () {
                this.$pages.addClass('display-none');
            }

        };

        var router = new Router(
            [
                {
                    name: '#',
                    $el: $('.map-page'),
                    onEnter: function () {

                        radio.trigger('makeMap');
                        this.$el.removeClass('display-none');
                        
                    },
                    onLeave: function () {
                        router.closePages();
                        radio.trigger('deleteMap')
                    }
                },
                {
                    name: '#map',
                    $el: $('.map-page'),
                    onEnter: function () {
                        radio.trigger('makeMap');
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                        radio.trigger('deleteMap')
                    }
                },
                {
                    name: '#profile',
                    $el: $('.profile-page'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                        $(document).scrollTop(0);

                    },
                    onLeave: function () {
                        router.closePages();
                        radio.trigger('deleteProfileMap');
                    }
                },
                {
                    name: '#gallery',
                    $el: $('.gallery-page'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#news',
                    $el: $('.news-page'),
                    onEnter: function () {
                         radio.trigger('getNews');
                         this.$el.removeClass('display-none');

                    },
                    onLeave: function () {
                        router.closePages();
                        radio.trigger('clearNews');
                    }
                },
                {
                    name: '#notifications',
                    $el: $('.notifications-page'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#chat',
                    $el: $('.chat-page'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#addPhoto',
                    $el: $('.add-photo-page'),
                    onEnter: function () {
                        radio.trigger('renderAddPhoto');
                        this.$el.removeClass('display-none');
                        
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#addNews',
                    $el: $('.add-news-page'),
                    onEnter: function () {
                        radio.trigger('renderAddNews');
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#settings',
                    $el: $('.settings-page'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#signIn',
                    $el: $('.sign-in-form'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#signUpStep1',
                    $el: $('.step-1'),
                    onEnter: function () {
                        this.$el.removeClass('display-none');
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                },
                {
                    name: '#signUpStep2',
                    $el: $('.step-2'),
                    onEnter: function () {
                        radio.trigger('registrationDogInit')
                        this.$el.removeClass('display-none');
                        fb.setupReferensUserPic();
                    },
                    onLeave: function () {
                        router.closePages();
                    }
                }
            ]
        );
        return router

    });

