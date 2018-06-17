define(['models/chatRoomModel','views/chatRoomView','radio','fb','ym'],
  function(ChatRoomModel, ChatRoomView, radio, fb, ym){
    var ChatRoomController = function () {
        
        this.model = new ChatRoomModel();
        this.view = new ChatRoomView(this.model);
        
        this.init();
    };

  ChatRoomController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers: function () {

           this.renderChatRoomHandler = this.renderChatRoom.bind(this);
           this.signInOrOutHandler = this.signInOrOut.bind(this);

          return this
      },
      enable: function () {

          radio.on('renderChatRoom', this.renderChatRoomHandler);
          radio.on('signInOrOut', this.signInOrOutHandler);
          
          return this;
      },
      renderChatRoom: function (chat) {
          this.model.setInfo(chat);
          this.view.render();
      },
      signInOrOut: function () {
          this.model.setInfo();
          this.view.render();
      },

    };

    return ChatRoomController;
});