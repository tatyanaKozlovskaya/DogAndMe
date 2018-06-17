define(['underscore', 'text!templates/registrationDogFormTemplate.html', 'radio','jquery','jqueryui','fb', 'ym'],
    function (_, registrationDogFormTemplateString, radio, jquery, jqueryui, fb, ym) {

        var RegistrationDogView = function (model) {
            this.model = model;
            this.$el = $('.step-2');
            this.template = _.template(registrationDogFormTemplateString);

        };

        RegistrationDogView.prototype = {

            init: function () {
                
                this.enable();
                this.render();
                this.datePicker();
                
            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                this.$el.on('change', this.changeHandler.bind(this));
                this.insertMap();

                return this
            },
            render: function () {
                this.$el.html(this.template({
                     breedsOfDogs: fb.breedsOfDogs
                    
                    })
                );
            },
            insertMap: function(){
                 var selector = 'mapRegistration'
                 ym.createRegistrationMap(selector);
            },
            setFocusOutEvent: function(){

                 this.$el.find('.dog-address').on('focusout', this.focusoutHandler.bind(this));
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.sign-up-dog')){
                    this.signUpNewDog();
                }
            },
            changeHandler: function (ev) {

              if ($(ev.target).is('.photos-download')) {
                            var folder = 'photos/';
                            this.imgDownload(ev,folder);
                    }
            },
            focusoutHandler: function (ev) {

              if ($(ev.target).is('.dog-address')) {
                            var address = $(ev.target).val();
                            console.log(address)
                            ym.geocode(address)
                    }
            },
            imgDownload: function (ev,folder) {

                    var fileList = ev.target.files;
                    var file = fileList[0];
                    this.userAvatar = file;
                    var id = fb.generateId();
                    var puths = {
                        storage: 'images/' + fb.user.uid + '/temporal/avatar/',
                        database:'users/' + fb.user.uid + '/temporal/avatar/'
                    }
                    fb.saveInStorage(id,file,puths);
            },
            datePicker: function() {
                $( "#datepicker" ).datepicker({
                  changeMonth: true,
                  changeYear: true
                });
            },
            signUpNewDog: function(){
                
                var $name = this.$el.find($('.dog-name'));
                var $gender = this.$el.find($('.gender-dog'));
                var $breed = this.$el.find($('.breed-of-dog'));
                var $birthday = this.$el.find($('.birthday-dog'));
                var dogId = fb.generateId();
                var puthForUser = 'users/' + fb.user.uid +'/data/dogs/' + dogId;
                var dataForUser =  dogId;
                var ImgId = dogId + 1;
                var puths = {
                        storage: 'images/'+ ImgId,
                        database:'dogs/'+ dogId + /avatar/
                    } 
                var callbackFunction = function(){
                    
                     radio.trigger('goToUserProfile',dogId);

                }
                var data={
                    'id':dogId
                };
                var puth = 'dogs/'+ dogId +'/';
                if ($name.val()) {
                    data['name'] = $name.val();
                } else {
                    alert('Введите имя!');
                    return
                }
                if ($gender.val()) {
                    data['gender'] = $gender.val();
                } else {
                    alert('Выберите пол!')
                }
                if ($breed.val()) {
                    data['breed'] = $breed.val();
                } 
                if ($birthday.val()) {
                    var birthday = $birthday.val()+'';
                    birthday = birthday.split('/');
                    var month = birthday[0];
                    month = parseInt(month);
                    birthday= birthday[1] + ' ' + fb.monthNames[month] + ' ' + birthday[2]+'г'
                    data['birthday'] = birthday;
                } else {
                    alert('Выберите дату рождения!')
                }
                if(this.$dogsPhoto && this.$dogsPhoto.attr( "src")){
                    data['avatar']={
                        downloadURL: this.$dogsPhoto.attr( "src"),
                        puth: 'dogs/'+ dogId + /avatar/
                    }
                }
                if(fb.user && fb.user.uid){
                    data['ownerUid'] = fb.user.uid;
                }
                if(fb.user && fb.userData.name || fb.data.name){
                    data['ownerName'] = fb.userData.name || fb.data.name;
                }
                if(this.model.coords){
                    data['coords'] = this.model.coords;
                }


                Promise.resolve()
                .then(function () {
                    fb.saveInStorage(ImgId,this.userAvatar,puths);
                }.bind(this))
                .then(function () {
                    radio.trigger('registerNewDog', puth, data);
                }.bind(this))
                .then(function () {
                      radio.trigger('registerNewDogInUserBase', puthForUser, dataForUser, callbackFunction);
                }.bind(this))
                .then(function () {
                      fb.getInfo();
                }.bind(this))
                 .then(function () {
                      radio.trigger('getToProfile');
                      fb.cleanTemporal(); 
                }.bind(this))
            },
            newDogAvatarRegistration: function (snapshot) {
              
              this.$dogsPhoto = this.$el.find($('.user-registration-img'))
              this.$dogsPhoto.attr( "src", snapshot.downloadURL);
            
            },
            insertAddress: function (address) {
              
              this.$dogsAddress = this.$el.find($('.dog-address'))
              this.$dogsAddress.val(address);
            
            },

        };
        return RegistrationDogView;
    });