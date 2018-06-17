define(['models/headerModel', 'views/headerView', 'radio','fb'],
    function (HeaderModel, HeaderView, radio, fb) {

        var HeaderController = function () {

            this.model = new HeaderModel();
            this.view = new HeaderView(this.model);
          
            this.init();
        };

        HeaderController.prototype = {

            init: function () {

                this.handlers().enable();

            },
            handlers: function () {

            this.signInOrOutHandler = this.signInOrOut.bind(this); 
            this.signOutHandler = this.signOut.bind(this);
            this.goToUserProfileHandler = this.goToUserProfile.bind(this);

                return this
            },
            enable: function () {
            
            radio.on('signInOrOut', this.signInOrOutHandler);
            radio.on('sign-out', this.signOutHandler);
            radio.on('goToUserProfile', this.goToUserProfileHandler);

                return this;
            },
            signInOrOut: function () {

                this.view.render();
            },
            signOut: function () {
                fb.signOut();
            },
            goToUserProfile: function (dogId) {

               fb.getProfileInfo(dogId);
            },

        };

        return HeaderController;
    });