define(['models/settingsModel', 'views/settingsView', 'radio', 'fb'],
    function (SettingsModel, SettingsView, radio, fb) {
        var SettingsController = function () {

            this.model = new SettingsModel();
            this.view = new SettingsView(this.model);

            this.init();
        };

        SettingsController.prototype = {

            init: function () {

                this.handlers().enable();

            },
            handlers: function () {

                this.addPhotoRenderHandler = this.addPhotoRender.bind(this);

                return this
            },
            enable: function () {

                radio.on('addPhotoRender', this.addPhotoRenderHandler);

                return this;
            },
            addPhotoRender: function (snapshot) {

                this.view.render(snapshot);
            },
        };

        return SettingsController;
    });