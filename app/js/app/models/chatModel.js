define(['fb', 'radio'],
	function (fb, radio) {


    var ChatModel = function () {
          this.chats = [];
          this.refs = [];
          this.currentChat = false;
          this.userChats = [];
          
    };

   ChatModel.prototype = {
	  getChatsInfo: function(){
	    if(fb.user){
      		var puth = 'users/'+ fb.user.uid + '/chats';
	      	var callbackFunction = function (snapshot){
	              this.chats = snapshot;
	        }.bind(this);
	        fb.returnInfo(puth, callbackFunction);
	    }
	  },
   	  getAllChats: function (){
   	  	if(fb.user){
   	  		this.userUid = fb.user.uid;
	   	  	var puth = '/chats';
	      	var callbackFunction = function (snapshot){
	              this.allChats = snapshot;
	              radio.trigger('chatsInfoReceived');
	        }.bind(this);
        fb.returnInfo(puth, callbackFunction);
   	  	}
   	  },
      setupChatsRef: function (){
      	if(fb.user){
      		var puth = 'users/'+ fb.user.uid + '/chats';
	      	var callbackFunction = function (snapshot){

	              radio.trigger('newChat',snapshot);
	        };
	        fb.setupRef(puth, callbackFunction);
      	}
      },
      sortChats: function(){
      	    this.userChatsArray = [];
      	    this.userChats = [];
      	    for(var prop in this.chats){
      	    	this.userChatsArray.push(this.chats[prop])
      	    }
      	    for (var i = 0; i < this.userChatsArray.length; i++) {
                    if (this.allChats[this.userChatsArray[i]]) {
                        chat = this.allChats[this.userChatsArray[i]];
                        this.userChats.push(chat);
                    }
                }
            this.userChats = this.userChats.reverse();
      		this.getMembersInfo();
      },
      getMembersInfo: function(){
            
            for(var i = 0; i < this.userChats.length;i++){
            	this.userChats[i].membersInfo = {};
            	for(var prop in this.userChats[i].members){
            		this.userChats[i].membersInfo[this.userChats[i].members[prop]] = fb.allDogsInfo[this.userChats[i].members[prop]]
            	}
               
            }
	      	radio.trigger('renderChat');
	      	if(this.currentChat === false && this.userChats && this.userChats[0]){
	      		this.currentChat = this.userChats[0];
	      		radio.trigger('renderChatRoom', this.currentChat);
	      	} 
	      	if(this.newChatId){
	      		this.openNewChat(this.newChatId);
	      		this.newChatId = false;
	      		
	      		
	      	}
	      	this.setRef();
      },
      openNewChat: function(newChatId){
        for(var i = 0;i< this.userChats.length;i++){
        	if(this.userChats[i].id === newChatId){
        		var newChat = this.userChats[i];
        	}
        }
        if(newChat){
        	radio.trigger('renderChatRoom', newChat)
        	this.currentChat = newChat;
        } 
        
      },
      setRef:function(){

      	for(var i = 0; i < this.userChats.length; i++){
      		if(this.refs.indexOf(this.userChats[i].id) === -1)
      		{
      		var puth = 'chats/' + this.userChats[i].id + '/';
      		var callbackFunction = function (snapshot){

              radio.trigger('newMessages',snapshot);
            };
      		fb.setupReferensDogsChats(puth, callbackFunction);
      		this.refs.push(this.userChats[i].id)
      		}
      	}
      },
      newMessages: function(snapshot){
      	for (var i = 0; i < this.userChats.length; i++){
      		if(this.userChats[i].id === snapshot.id){
      			this.userChats[i].messages = snapshot.messages
      			if(this.currentChat && this.currentChat.id && snapshot.id === this.currentChat.id){
      				this.openNewChat(snapshot.id);
      			} else {
      				    if(this.userChats[i].newMessages){
      				    	this.userChats[i].newMessages = this.userChats[i].newMessages + 1;
      				    } else {
      				    	this.userChats[i].newMessages = 1;
      				    }
      				 
      			}
      		}
      	}
        radio.trigger('renderChat');
      },
      checkChat: function(dogId){
  
        for(var i = 0;i< this.userChats.length;i++){
        	if(this.userChats[i].members[dogId]){
        		var dogChat = this.userChats[i];
        	}
        }
        if(dogChat){
        	radio.trigger('renderChatRoom', dogChat)
        	this.currentChat = dogChat;
        } else {
        	this.makeNewChat(dogId)
        }
        
      },
      makeNewChat: function(dogId){
      	var id = fb.generateId()
      	var puth = 'users/' + fb.user.uid + '/chats/' + id;
        fb.saveInfoFullPuth(puth, id);
        var puthPartner = 'users/' + fb.currentDogInfo.ownerUid + '/chats/' + id;
        fb.saveInfoFullPuth(puthPartner, id);
        var userDogId = fb.currentUserDog.id;
        var chat = {
        	id:id,
        	members:{}
        }
        chat.members[userDogId] = userDogId;
        chat.members[dogId] = dogId;
        var chatPuth = 'chats/' + id 
        fb.saveInfoFullPuth(chatPuth, chat);
        this.newChatId = id;
      },
      getChats: function(snapshot){
      	  this.chats = snapshot;
      },
      clearChats: function(){
          this.chats = [];
          this.offAllRefs();
          this.currentChat = false;
          this.userChats = [];

      },
      offAllRefs: function(){

      	for(var i = 0; i < this.userChats.length; i++){
      		if(this.refs.indexOf(this.userChats[i].id) !== -1)
      		{
      		var puth = 'chats/' + this.userChats[i].id + '/';
      		fb.offRefs(puth);
      		}
      	}
      	this.refs=[];
      	var userPuth = 'users/'+ this.userUid + '/chats';
      	fb.offRefs(puth);
      	this.userUid = false;
      },

    };
    return ChatModel;
});