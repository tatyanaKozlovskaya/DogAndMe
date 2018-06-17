define(['underscore','text!templates/headerTemplate.html','radio','fb'],
    function(_, HeaderTemplateString, radio, fb){

        var HeaderView = function (model) {
            this.model = model;
            this.$el = $('.header');
            this.$settings = $('.user-settings');
            this.template =  _.template(HeaderTemplateString);
            this.init();

        };

        HeaderView.prototype = {
            
            init: function(){
                
              this.setupEvents();
              this.render();
            },
             setupEvents: function () {

                this.$el.on( 'click', this.clickHandler.bind(this)); 
            },
            render: function(){

                this.$el.html(this.template({
                    user: fb.userData,
                    dogs: fb.userDogs,
                    currentUserDog:  fb.currentUserDog,
                    
                    })
                );
                var array = $('.user-img').attr('data-id');
                return this
            },
            clickHandler: function(ev){

               if($(ev.target).is('.dog-and-user-name')){
                    this.showOrCloseUserSettings();
                }
                if($(ev.target).is('.close-user-profile')){
                    this.showOrCloseUserSettings();
                }
                if($(ev.target).is('.sign-out')){
                    radio.trigger('sign-out');
                }
                if($(ev.target).is('.user-img')){
                  fb.dogId = $(ev.target).attr('data-id');
                  if(fb.userDogs.length > 1){
                    for(var prop in fb.userDogs){
                        if(fb.userDogs[prop].id === fb.dogId){
                            fb.currentDogInfo = fb.userDogs[prop];
                            fb.currentUserDog = fb.userDogs[prop];
                        }
                    }
                    $('.user-header-img').removeClass('current-dog');
                    $(ev.target.parentElement).addClass('current-dog');

                  }
                  radio.trigger('goToUserProfile', fb.dogId);
                }
            },
            showOrCloseUserSettings: function () {

            $('.user-settings').toggleClass('display-none'); 
            }
            
          };
        return HeaderView;
});