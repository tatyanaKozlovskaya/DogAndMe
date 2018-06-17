requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../lib/jquery',
        jqueryui: '../lib/jquery-ui',
        jqueryjson: '../lib/jquery-json',
        underscore: '../lib/underscore',
        app: 'app',
        text: '../lib/text',
        hammer: '../lib/hammer.min',
        firebase: 'https://www.gstatic.com/firebasejs/4.1.2/firebase',
        ymap: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'

    },
    config: {
        'fb': {
            apiKey: "AIzaSyAqfMvWINs7lr_kaFMmb-QXjlq6W-Nxc20",
            authDomain: "dog-and-me.firebaseapp.com",
            databaseURL: "https://dog-and-me.firebaseio.com",
            projectId: "dog-and-me",
            storageBucket: "dog-and-me.appspot.com",
            messagingSenderId: "841881771649"
        }
    },
    shim: {
        firebase: {
            exports: 'firebase'
        }
    }
});
requirejs(['app'], function (app) {
    app.init();
});