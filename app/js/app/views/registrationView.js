define(['underscore', 'text!templates/registrationFormTemplate.html', 'radio','jquery','jqueryui','fb'],
    function (_, registrationFormTemplateString, radio, jquery, jqueryui, fb) {

        var RegistrationView = function (model) {
            this.model = model;
            this.$el = $('.step-1');
            this.template = _.template(registrationFormTemplateString);
            this.init();

        };

        RegistrationView.prototype = {

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
                if($(ev.target).is('.sign-up-step-2')){
                    this.signUpNewUser();
                }
                
            },
            signUpNewUser: function(){
                
                this.$name = this.$el.find($('.registration-name'));
                this.$email = this.$el.find($('.registration-email'));
                this.$password = this.$el.find($('.registration-password'));
                var data = {};
                if (this.$name.val()) {
                    data['name'] = this.$name.val();
                } else {
                    alert('Введите имя!')
                }
                if (this.$email.val()) {
                    data['email'] = this.$email.val();
                } else {
                    alert('Введите email!')
                }
                if (this.$password.val()) {
                    data['password'] = this.$password.val();
                } else {
                    alert('Введите пароль!')
                }
                radio.trigger('registerNewUser', data.email, data.password, data);

            }

        };
        return RegistrationView;
    });