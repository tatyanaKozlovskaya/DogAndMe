define(['models/addPhotoModel', 'views/addPhotoView', 'radio', 'fb'],
    function (AddPhotoModel, AddPhotoView, radio, fb) {
        var AddPhotoController = function () {

            this.model = new AddPhotoModel();
            this.view = new AddPhotoView(this.model);

            this.init();
        };

        AddPhotoController.prototype = {

            init: function () {

                this.handlers().enable();

            },
            handlers: function () {

                this.addPhotoRenderHandler = this.addPhotoRender.bind(this);
                this.uploadPhotoHandler = this.uploadPhoto.bind(this);
                this.userAddNewPhotoHandler = this.userAddNewPhoto.bind(this);
                this.setupRefNewPhotoHandler = this.setupRefNewPhoto.bind(this);
                this.renderAddPhotoHandler = this.renderAddPhoto.bind(this);

                return this
            },
            enable: function () {

                radio.on('addPhotoRender', this.addPhotoRenderHandler);
                radio.on('uploadPhoto', this.uploadPhotoHandler);
                radio.on('userAddNewPhoto', this.userAddNewPhotoHandler);
                radio.once('setupRefNewPhoto', this.setupRefNewPhotoHandler);
                radio.on('renderAddPhoto', this.renderAddPhotoHandler);

                return this;
            },
            addPhotoRender: function (snapshot) {

                this.view.render(snapshot);
            },
            uploadPhoto: function (photoList) {

                fb.registerNewUser(photoList);
            },
            userAddNewPhoto: function (ev) {

                this.model.imgDownload(ev);
            },
            setupRefNewPhoto: function () {

                fb.setupReferensNewPhoto();
            },
            renderAddPhoto: function () {

                this.view.render();
            },
        };

        return AddPhotoController;
    });