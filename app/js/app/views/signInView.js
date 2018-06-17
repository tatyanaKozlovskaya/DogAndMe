define(['underscore', 'text!templates/signInFormTemplate.html', 'radio','jquery','jqueryui'],
    function (_, signInFormTemplateString, radio, jquery, jqueryui) {

        var SignInView = function (model) {
            this.model = model;
            this.$el = $('.sign-in-form');
            this.template = _.template(signInFormTemplateString);
            this.init();

        };

        SignInView.prototype = {

            init: function () {
                
                this.enable();
                this.render();
            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));

                return this
            },
            render: function () {
                this.$el.html(this.template({
            
                    
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.sign-in-button')){
                    this.signInwithEmail();
                }
                if($(ev.target).is('.sign-in-with-google-button')){
                    radio.trigger('signInWithGoogle');
                }
            },
            signInwithEmail: function(){
                
               this.$email = $('.email-input');
               this.$password = $('.password-input');

                 if(this.$email.val()){
                     var email = this.$email.val();
                 } else {
                    alert('Введите email!')
                 }
                 if(this.$password.val()){
                     var password = this.$password.val();
                 } else {
                    alert('Введите пароль!')
                 }
                     radio.trigger('signInWithEmail',email,password);
                this.$email.val('');
                this.$password.val('');
            },

        };
        return SignInView;
    });