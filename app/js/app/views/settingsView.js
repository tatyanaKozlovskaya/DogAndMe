define(['underscore', 'text!templates/settingsTemplate.html', 'radio','jquery','fb'],
    function (_, settingsTemplateString, radio, jquery, fb) {

        var SettingsView = function (model) {
            this.model = model;
            this.$el = $('.settings-page');
            this.template = _.template(settingsTemplateString);
            this.init();

        };

        SettingsView.prototype = {

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
                    
                    user: fb.user,

                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.add-dog')){
                  document.location.href = '#signUpStep2'
                }
            },

        };
        return SettingsView;
    });