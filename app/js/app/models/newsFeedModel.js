define(['fb','radio'],
	function (fb, radio) {


    var NewsFeedModel = function () {
      
       this.allNews = [];
       this.followingNews = [];
       this.file = {};
    };

    NewsFeedModel.prototype = {

        getNews: function () {
            var puth = '/news/';
            var callbackFunction = function (snapshotInfo){
                radio.trigger('newsReceived', snapshotInfo)
            };
            fb.returnInfo(puth, callbackFunction);     
        },
        addDogInfoToNews: function (snapshot) {
          this.allNews = [];
          this.followingNews = [];
          var allNews = snapshot;
           for(var prop in allNews ){
            var dogId = allNews[prop].data.dogId;
              if(fb.allDogsInfo[dogId] && fb.allDogsInfo[dogId].name && fb.allDogsInfo[dogId].avatar){
                allNews[prop].data.name = fb.allDogsInfo[dogId].name;
                allNews[prop].data.avatar = fb.allDogsInfo[dogId].avatar;
                this.allNews.push(allNews[prop]);
            }
            
           }
           this.allNews = this.allNews.reverse();
           if(fb.currentUserDog && fb.currentUserDog.following){
            for(var i = 0;i < this.allNews.length;i++){
            var dogId = this.allNews[i].data.dogId;
            if(fb.currentUserDog.following[dogId]){
              this.followingNews.push(this.allNews[i]);
            }
           }
           }
           if(!fb.user){
             radio.trigger('newsFeedRender', this.allNews); 
           } else {
             radio.trigger('newsFeedRender', this.followingNews);   
           }
                  
        },
        
    };
    return   NewsFeedModel;
});