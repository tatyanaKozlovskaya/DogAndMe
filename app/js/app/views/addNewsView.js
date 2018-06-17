define(['underscore', 'text!templates/addNewsTemplate.html', 'radio','jquery','jqueryui','fb','router'],
    function (_, addNewsTemplateString, radio, jquery, jqueryui, fb, router) {

        var AddNewsView = function (model) {
            this.model = model;
            this.$el = $('.add-news-page');
            this.template = _.template(addNewsTemplateString);
            this.init();

        };

       AddNewsView.prototype = {

            init: function () {
                
                this.enable();
                this.render();

            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                this.$el.on('change', this.changeHandler.bind(this));

                return this
            },
            render: function (snapshot) {
                this.$el.html(this.template({
                     snapshot :snapshot,
                     description:this.model.news.description,
                     user: fb.user
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.upload-news')){
                    if(this.model.news){
                        this.uploadNews();
                    }
                }
                if($(ev.target).is('.cancel-news')){
                    if(this.model.news){
                        this.cleanPhotoAndTextArea();
                    }
                }
                if($(ev.target).is('.delete-photo')){
                   
                    radio.trigger('removePhotoFromNews', ev.target)

                }
                if($(ev.target).is('.sos')){
                   if($(ev.target).is('.sos-true')){
                     this.removeSosMarker();
                   } else {
                     this.addSosMarker();
                   }
                   console.log(this.model.news)
                }

            },
            changeHandler: function (ev) {

              if ($(ev.target).is('.download-photos')) {
                            this.saveDescription();
                            radio.trigger('userAddNewNews',ev);
              }
            },
            uploadNews: function(){

                var $description = this.$el.find($('.news-description')).val();
                var time = fb.generateDate();
                this.model.news.time = time;
                this.model.news.description = $description;
                this.model.news.id = fb.generateId();
                this.model.news.dogId = fb.currentUserDog.id;
                this.model.news.uid = fb.user.uid;

                var infoPuth = '/news/'+ this.model.news.id + '/data/';
                fb.saveInfoFullPuth(infoPuth,this.model.news);
                var infoUserPuth = '/dogs/' + fb.currentUserDog.id + '/news/'+ this.model.news.id;
                fb.saveInfoFullPuth(infoUserPuth,this.model.news.id);

                for (var i = 0; i < this.model.images.length; i++){
                    var puths = {
                        storage: 'images/' + fb.currentUserDog.id + '/news/'+ this.model.news.id + '/images/'+ this.model.images[i].id,
                        database:'/news/'+ this.model.news.id + '/images/'+ this.model.images[i].id
                    };
                    fb.saveInStorage(this.model.images[i].id, this.model.images[i], puths);
                }   

                console.log(this.model.news);
                 this.model.news.description='';
                this.render(); 
                this.model.images=[];
               
                var temporalPuth = 'users/' + fb.user.uid + '/temporal/new-news/';

                fb.cleanTemporal(temporalPuth);
                   
            },
            cleanPhotoAndTextArea: function () {
              
              this.model.news = '';
              var temporelPuth = 'users/' + fb.user.uid + '/temporal/new-news/'
              fb.cleanTemporal(temporelPuth);
              this.model.images=[];
              this.render();

            },
            addSosMarker: function () {
              
              this.model.news.sos = true;
              this.$el.find($('.sos')).addClass('sos-true');

            },
            removeSosMarker: function () {
              
              this.model.news.sos = false;
              this.$el.find($('.sos')).removeClass('sos-true');

            },
            saveDescription: function () {
              
              this.model.news.description = this.$el.find($('.news-description')).val();

            },

        };
        return AddNewsView;
    });