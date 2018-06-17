define(['models/newsFeedModel', 'views/newsFeedView', 'radio', 'fb'],
    function (NewsFeedModel,NewsFeedView, radio, fb) {
        var NewsFeedController = function () {

            this.model = new NewsFeedModel();
            this.view = new NewsFeedView(this.model);

            this.init();
        };

       NewsFeedController.prototype = {

            init: function () {

                this.handlers().enable();

            },
            handlers: function () {
                
                this.newsFeedRenderHandler = this.newsFeedRender.bind(this);
                this.getNewsHandler = this.getNews.bind(this);
                this.newsReceivedHandler = this.newsReceived.bind(this);
                this.clearNewsHandler = this.clearNews.bind(this);
                this.signInOrOutHandler = this.signInOrOut.bind(this);
              
                return this
            },
            enable: function () {

                radio.on('newsFeedRender', this.newsFeedRenderHandler);
                radio.on('getNews', this.getNewsHandler);
                radio.on('newsReceived', this.newsReceivedHandler);
                radio.on('clearNews', this.clearNewsHandler);
                radio.on('signInOrOut', this.signInOrOutHandler);
                
                return this;
            },
            newsFeedRender: function (info) {

                this.view.render(info);
            },
            getNews: function (info) {
            
                this.model.getNews();
            },
            newsReceived: function (snapshot) {
            
                this.model.addDogInfoToNews(snapshot);
            },
            clearNews: function () {
            
                this.model.news = [];
                this.model.followingNews = [];
            },
            signInOrOut: function (info) {

                this.model.getNews();
            },
        };

        return NewsFeedController;
    });