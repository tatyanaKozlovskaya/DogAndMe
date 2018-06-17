define(['models/chatModel','views/chatView','controllers/chatRoomController','radio','fb','ym'],
  function(ChatModel, ChatView, ChatRoomController, radio, fb, ym){
    var ChatController = function () {
        
        this.model = new ChatModel();
        this.view = new ChatView(this.model);
        this.chatRoom = new ChatRoomController();
        
        this.init();
    };

  ChatController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers: function () {

          this.getChatsInfoHandler = this.getChatsInfo.bind(this);
          this.chatsInfoReceivedHandler = this.chatsInfoReceived.bind(this);
          this.renderChatHandler = this.renderChat.bind(this);
          this.openChatRoomHandler = this.openChatRoom.bind(this);
          this.newChatHandler = this.newChat.bind(this);
          this.chatReceivedHandler = this.chatReceived.bind(this);
          this.memberInfoReceivedHandler = this.memberInfoReceived.bind(this);
          this.userSignOutHandler = this.userSignOut.bind(this);
          this.openNewChatHandler = this.openNewChat.bind(this);
          this.newMessagesHandler = this.newMessages.bind(this);

          return this
      },
      enable: function () {

          radio.on('getChatsInfo', this.getChatsInfoHandler);
          radio.on('chatsInfoReceived', this.chatsInfoReceivedHandler);
          radio.on('renderChat', this.renderChatHandler);
          radio.on('openChatRoom', this.openChatRoomHandler);
          radio.on('newChat', this.newChatHandler);
          radio.on('chatReceived', this.chatReceivedHandler);
          radio.on('memberInfoReceived', this.memberInfoReceivedHandler);
          radio.on('signInOrOut', this.userSignOutHandler);
          radio.on('openNewChat', this.openNewChatHandler);
          radio.on('newMessages', this.newMessagesHandler);

          return this;
      },
      getAllChats: function () {
          this.model.getAllChats();
      },
      getChatsInfo: function () {
          this.model.getChatsInfo();
      },
      setupChatRef:function(){
          this.model.setupChatsRef();
      },
      chatsInfoReceived: function () {
          this.model.sortChats();
      },
      renderChat: function () {
          this.view.render();
      },
      openChatRoom: function (dogId) {
          this.model.checkChat(dogId);
      },
      newChat: function (snapshot){
          this.model.getChats(snapshot);
          this.model.getAllChats();
      },
      openNewChat: function (chatId){
          this.model.openNewChat(chatId);
      },
      chatReceived: function (chat){
          this.model.getMembersInfo(chat);
      },
      memberInfoReceived: function (info){
          this.model.addMembersInfo(info);
      },
      userSignOut: function (){
          this.model.clearChats();
          this.view.render();
          if(fb.user){
             this.model.getChatsInfo();
             this.model.getAllChats();
             this.model.setupChatsRef();
          }
      },
      newMessages: function (snapshot){
          this.model.newMessages(snapshot);
      },

    };

    return ChatController;
});