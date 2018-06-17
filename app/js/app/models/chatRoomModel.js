define(['fb'],
	function (fb) {


    var ChatRoomModel = function () {
          this.chat = {};
    };

   ChatRoomModel.prototype = {
     setInfo: function(chat){
      if(chat){
        this.chat = chat;
      } else {
        this.chat = false
      }
      },
      changeChat: function(){
        var puth = 'chats/' + this.chat.id
        var chat = {
          id:this.chat.id,
          members:this.chat.members,
          messages: this.chat.messages
        }
        fb.saveInfoFullPuth(puth, chat);
      }
    };
    return ChatRoomModel;
});