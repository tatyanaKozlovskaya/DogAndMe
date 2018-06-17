define(['underscore', 'text!templates/chatTemplate.html', 'radio','jquery','fb','ym'],
    function (_, chatTemplateString, radio, jquery, fb, ym) {

        var ChatView = function (model) {
            this.model = model;
            this.$el = $('.all-chats');
            this.$parentEl = $('.chat-page');
            this.template = _.template(chatTemplateString);
            this.init();

        };

        ChatView.prototype = {

            init: function () {
                
                this.enable();
                this.render();
            },
            enable: function () {

                this.$parentEl.on('click', this.clickHandler.bind(this));

                return this
            },
            render: function () {
                
                this.$el.html(this.template({
                    chatsInfo: this.model.userChats,
                    currentUserDog: fb.currentUserDog,
                    user: fb.user,
                    radio:radio
                    })
                );
            },
            clickHandler: function (ev) {
                if($(ev.target).is('.user-img')){
                  fb.dogId = $(ev.target).attr('data-id');
                  radio.trigger('goToUserProfile', fb.dogId)
                }
                if($(ev.target).is('.last-message')||$(ev.target).is('.chat-name')){
                  var chatId = $(ev.target).attr('data-id');
                  radio.trigger('openNewChat', chatId)
                  if(this.$parentEl.find('.menu-sandvich').css('display') === 'none'){
                    this.$parentEl.find('.chat-room').show();
                    this.$parentEl.find('.all-chats').show();
                  } else {
                    this.$parentEl.find('.chat-room').toggle();
                    this.$parentEl.find('.all-chats').toggle();
                  }
                }
                if($(ev.target).is('.menu-sandvich')){
                  this.$parentEl.find('.chat-room').toggle();
                  this.$parentEl.find('.all-chats').toggle();
                }
            },

        };
        return ChatView;
    });