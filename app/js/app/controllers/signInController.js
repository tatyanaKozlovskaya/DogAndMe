define(['models/signInModel','views/signInView','radio','fb'],
  function(SignInModel, SignInView, radio, fb){
    var SignInController = function () {
        
        this.model = new SignInModel();
        this.view = new SignInView(this.model);
        
        this.init();
    };

   SignInController.prototype = {

    	init: function () {

          this.handlers().enable();

    	},
    	handlers:function () {  

          this.signInWithEmailHandler = this.signInWithEmail.bind(this);
          this.signInWithGoogleHandler = this.signInWithGoogle.bind(this);
          return this
    	},
    	enable: function () {

          radio.on('signInWithEmail', this.signInWithEmailHandler);
          radio.on('signInWithGoogle', this.signInWithGoogleHandler);
          return this;
      },
      signInWithEmail: function (email, password) {
          fb.signInWithEmail(email, password);
      },
      signInWithGoogle: function () {

          fb.signInWithGoogle();
      },
        
    };

    return SignInController;
});