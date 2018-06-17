define(['underscore', 'text!templates/chatRoomTemplate.html', 'radio', 'jquery', 'fb'],
    function (_, chatRoomTemplateString, radio, jquery, fb, ym) {

        var ChatRoomView = function (model) {
            this.model = model;
            this.$el = $('.chat-room');
            this.template = _.template(chatRoomTemplateString);
            this.init();

        };

        ChatRoomView.prototype = {

            init: function () {

                this.enable();

            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                return this
            },
            render: function () {

                this.$el.html(this.template({
                    chat: this.model.chat,
                    currentUserDog: fb.currentUserDog,
                    user: fb.user
                })
                );
                this.checkStatus();
            },
            checkStatus: function () {
                if (this.model.chat.messages) {
                    for (var days in this.model.chat.messages) {
                        for (var message in this.model.chat.messages[days]) {
                            if (this.model.chat.messages[days][message] && this.model.chat.messages[days][message].status && this.model.chat.messages[days][message].status === 'unread-' + fb.currentUserDog.id) {
                                this.model.chat.messages[days][message].status = 'read-' + fb.currentUserDog.id;
                            }
                        }
                    }
                    this.model.changeChat();
                }
            },
            clickHandler: function (ev) {
                if ($(ev.target).is('.user-img')) {
                    fb.dogId = $(ev.target).attr('data-id');
                    radio.trigger('goToUserProfile', fb.dogId)
                }
                if ($(ev.target).is('.send-message')) {
                    this.sendMessage();
                }
            },
            sendMessage: function () {
                var messageText = this.$el.find($('.message-input')).val();
                if (messageText && (messageText.indexOf('>') === -1) && (messageText.indexOf('<') === -1)) {
                    var id = fb.generateId();
                    var time = fb.generateTime();
                    var date = fb.generateDate();
                    for (var prop in this.model.chat.members) {
                        if (this.model.chat.members[prop] !== fb.currentUserDog.id) {
                            var dogPartner = this.model.chat.members[prop];
                        }
                    }
                    date = date.split(' ').splice(0, 3);
                    finalDate = date[0] + '-' + date[1] + '-' + date[2];
                    var puth = 'chats/' + this.model.chat.id + '/messages/' + finalDate + '/' + id;
                    var message = {
                        id: id,
                        text: messageText,
                        idDog: fb.currentUserDog.id,
                        time: time,
                        status: 'unread-' + dogPartner

                    }
                    fb.saveInfoFullPuth(puth, message);
                    var datePuth = 'chats/' + this.model.chat.id + '/messages/' + finalDate + '/date';
                    fb.saveInfoFullPuth(datePuth, finalDate);
                    this.$el.find($('.message-input')).val('');
                } else {
                    alert('Вы ввели недопустимые символы!')
                }



            },

        };
        return ChatRoomView;
    });