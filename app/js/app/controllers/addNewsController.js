define(['models/addNewsModel', 'views/addNewsView', 'radio', 'fb'],
    function (AddNewsModel, AddNewsView, radio, fb) {
        var AddNewsController = function () {

            this.model = new AddNewsModel();
            this.view = new AddNewsView(this.model);

            this.init();
        };

        AddNewsController.prototype = {

            init: function () {

                this.handlers().enable();

            },
            handlers: function () {
                this.setupReferensNewNewsHandler = this.setupReferensNewNews.bind(this);
                this.addNewsRenderHandler = this.addNewsRender.bind(this);
                this.uploadNewsHandler = this.uploadNews.bind(this);
                this.userAddNewNewsHandler = this.userAddNewNews.bind(this);
                this.removePhotoFromNewsHandler = this.removePhotoFromNews.bind(this);
                this.renderAddNewsHandler = this.renderAddNews.bind(this);

                return this
            },
            enable: function () {
                radio.once('setupRefNewNews', this.setupReferensNewNewsHandler);
                radio.on('addNewsRender', this.addNewsRenderHandler);
                radio.on('uploadNews', this.uploadNewsHandler);
                radio.on('userAddNewNews', this.userAddNewNewsHandler);
                radio.on('removePhotoFromNews', this.removePhotoFromNewsHandler);
                radio.on('renderAddNews', this.renderAddNewsHandler);

                return this;
            },
            addNewsRender: function (snapshot) {

                this.view.render(snapshot);
            },
            uploadNews: function (news) {

                fb.registerNewUser(news);
            },
            userAddNewNews: function (ev) {

                this.model.imgDownload(ev);
            },
            setupReferensNewNews: function () {

                fb.setupReferensNewNews();
            },
            removePhotoFromNews: function (target) {

                this.model.removePhoto(target);
            },
            renderAddNews: function () {

                this.view.render();
            },
        };

        return AddNewsController;
    });