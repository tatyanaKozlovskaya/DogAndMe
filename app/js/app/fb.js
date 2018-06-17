define(['firebase', 'radio', 'Error', 'module'], function (firebase, radio, myError, module) {
    var fairBase = {


        init: function () {
            firebase.initializeApp(module.config());
            this.user = false || firebase.auth().currentUser;
            this.userData;
            this.userDogs = [];
            this.data = false;
            this.allDogsInfo = {};
            this.currentDogInfo = false;
            this.currentUserDog = false;
            this.dogNews = false;
            this.setupEvents();
            var breedsOfDogs = 'Не выбрано,Дворняжка,Австралийская борзая (кенгуровая собака),Австралийская овчарка (Аусси),Австралийская пастушья собака,Австралийская короткохвостая пастушья собака,Австралийский бандог,Австралийский бульдог,Австралийский динго,Австралийский келпи,Австралийский шелковистый терьер (силки терьер),Австрийская гончая (брандл бракк),Австрийский  пинчер (Австрийский короткошерстный пинчер),Азавак (Африканская борзая),Айну (хоккайдская собака),Акбаш,Акита-ину,Алано (Испанский алано),Алапахский бульдог,Алопекис,Альпийская овчарка,Альпийский таксообразный бракк,Аляскинский Кли Кэй,Аляскинский маламут,Американская акита,Американская белая овчарка,Американская тундровая овчарка (Американская тундровая собака),Американский бандог,Американский бульдог,Американский кокер-спаниель,Американский питбультерьер,Американский стаффордшир-терьер,Американский той-фокстерьер,Американская эскимосская собака,Английская овчарка,Английский бульдог,Английский кокер-спаниель,Английский мастиф,Английский сеттер,Английский той-терьер,Аппенцеллер Зенненхунд,Аргентинский дог,Арубская деревенская собака,Атласская овчарка (Аиди),Афганская борзая,Аффенпинчер,Басенджи,Бассет бретонский (рыжий бретонский бассет),Бассет-хаунд,Бедлингтон терьер,Белая швейцарская овчарка,Бельгийская овчарка,Бернский зенненхунд,Бигль,Бишон фризе,Бладхаунд,Бобтейл,Боксер,Болгарская овчарка,Болоньез,Большой швейцарский зенненхунд,Бордер колли,Бордоский дог (Французский мастиф),Бостон терьер,Бразильский терьер,Бриар,Бульмастиф,Бультерьер,Бультерьер миниатюрный,Бурбуль,Веймаранер,Вельш корги,Вельштерьер,Венгерская короткошерстная легавая,Вест терьер,Волкодав ирландский,Восточноевропейская овчарка,Гампр,Голая мексиканская собака,Голландская овчарка (Хердер),Гончая греческая (Греческая заячья гончая),Гончая малая (англо-французская),Гончая плотта,Гончая Стефена,Гончая тирольская,Гончая Шиллера,Грейхаунд,Греческая овчарка,Гренландская собака,Гриффон,Грюнендаль,Далматин,Датский дог,Денди динмонд,Джек Рассел терьер,Дизайнерские собаки,Доберман-пинчер,Дрентская куропаточная собака,Золотистый ретривер,Ирландский сеттер,Ирландский глен-оф-имаал-терьер,Йоркширский терьер,Ка-де-бо,Кавалер кинг чарльз спаниель,Кавказская овчарка,Канадская эскимосская собака,Канарский дог,Кане корсо,Карабаш анатолийский,Карабаш кангальский,Карельская медвежья собака,Карликовый пинчер (цвергпинчер),Карская собака,Кеесхонд,Керн терьер,Керри-блю-терьер,Китайская хохлатая собачка,Кламбер-спаниель,Колли,Крашская овчарка,Комондор,Кpапчато-голубой кунхаунд (енотовая гончая),Ксолоитцкуинтли (мексиканская голая собака),Кувас,Курцхаар,Курчавошерстный ретривер,Кыргызская борзая,Лабрадор-ретривер,Лайка западно-сибирская,Лайка камчатская ездовая,Лайка ненецкая оленегонная,Лайка самоедская,Лайка финская оленегонная,Лайка чукотская ездовая,Лайка эскимосская,Лайка якутская,Лакенуа,Ландсир,Лапландская пастушья собака,Левретка,Леонбергер,Литовская гончая (латвийская гончая),Лопарская оленегонная собака,Лукас терьер,Лхасский апсо,Люцернская гончая,Малая греческая домашняя собака,Малинуа,Мальтезе (Мальтийская болонка),Мареммано-абруццкая овчарка (мареммано абруццеле),Мастино наполетано (Неаполетанский мастиф),Миттельшнауцер,Монгольская овчарка (банхар),Мопс,Московская сторожевая,Московский дракон,Немецкий дог (Датский дог),Немецкая овчарка,Немецкий дратхаар (жесткошерстная легавая),Пинчер немецкий,Новогвинейская поющая собака,Норботтен-шпиц (Скандинавская лайка),Норвежский эльгхунд серый,Норвежский эльгхунд чёрный,Норвич терьер,Норфолк терьер,Ньюфаундленд,Орхидея петербургская,Папильон,Парсон рассел терьер,Пекинес,Перуанская голая собака,Пинчеры,Пиренейская горная собака,Пиренейский мастиф,Поденгу португезе,Подгалянская овчарка,Пойнтер английский,Пойнтер Герта,Пойнтер немецкий,Пойнтер пудель (Пудель-пойнтер),Пойнтер старо-датский (старо-датская легавая),Польская гончая,Польская низинная овчарка,Португальская водяная собака,Португальская овчарка,Португальский рафейру,Пражский крысарик,Пти-брабансон,Пудель,Пули,Перро де преса канарио (Канарская собака),Риджбек родезийский,Риджбек тайский,Ризеншнауцер,Ротвейлер,Русская гончая,Русская псовая борзая,Русская салонная собака,Русский спаниель,Русская цветная болонка,Русский длинношерстный той терьер,Русский той терьер,Русский черный терьер,Салюки,Сарлосская волчья собака,Сенбернар,Силихем-терьер,Сицилийская борзая (Чирнеко дель этна),Сиба Ину,Скай-терьер,Скотч-терьер,Словацкий чувач,Слюги,Среднеазиатская овчарка,Стаффордширский бультерьер,Суссекс-спаниель,Тазы (Среднеазиатская борзая),Тайский риджбек,Такса,Тамасканская собака,Тервюрен,Терьер пшеничный,Тибетский терьер,Тоса-ину,Уиппет,Утонаган,Фараонова собка,Фила бразилейро,Финская оленегонная лайка,Финско-шведская оленегонная собака,Фландрский бувье,Фокстерьер,Фоксхаунд английский,Французская овчарка,Французский бульдог,Ханаанская собака,Хаски аляскинский,Хаски лабрадорский,Хаски сахалинский,Хаски сибирский,Ховаварт,Хорватская овчарка,Хорватская планинская собака,Хортая борзая,Цвергшнауцер,Цвергпинчер,Чау-чау,Чесапик бей ретривер,Чехословацкая волчья собака,Чинук,Чихуахуа,Шар-пей,Шарпланинац,Шведский вальхунд,Шведский лапхунд,Шведский элькхунд,Швейцарская юрская гончая,Шелти,Ши-тцу,Шиба-Ину,Шилонская овчарка,Шипперке,Шотландский сеттер,Шпиц карликовый (померанский),Шпиц малый (немецкий),Шпиц шведский (лапхунд) – Лапдандские собаки,Шпиц японский,Энтлебухер зенненхунд,Эрдельтерьер,Эстонская гончая,Эштрельская гладкошерстная овчарка,Эштрельская длинношерстная овчарка,Югославская горная гончая (Планинская гончая),Югославская трехцветная гончая,Южнорусская овчарка,Южнорусская степная борзая,Ягдтерьер,Японский хин,Другая'
            this.monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', ' Октября', 'Ноября', 'Декабря']
            this.breedsOfDogs = breedsOfDogs.split(',');
            this.generateDate();
            this.getAllDogsInfo();
        },
        setupEvents: function () {
            
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    this.user = user;
                    console.log('onAuthStateChanged user' + this.user);
                    this.dataBase(this.data, user.uid);

                } else if (user !== null) {
                    this.user = false;
                    console.log('onAuthStateChanged user!==null');
                    radio.trigger('signInOrOut');
                } else {
                    console.log('onAuthStateChanged user===null');
                    radio.trigger('signInOrOut');
                }

            }.bind(this));

        },
        getAllDogsInfo: function () {

            firebase.database().ref('dogs/').once('value').then(function (snapshot) {
                var allDogs = snapshot.val();
                this.allDogsInfo = allDogs;
                radio.trigger('allDogsInfoReceived');
            }.bind(this))
        },
        cleanTemporal: function (puth) {

            var storage = firebase.storage();
            var storageRef = storage.ref();
            firebase.database().ref(puth).once('value').then(function (snapshot) {
                var snapshotVal = snapshot.val();
                console.log(snapshotVal);
                for (var prop in snapshotVal) {
                    var puth = snapshotVal[prop].puth;
                    var desertRef = storageRef.child(snapshotVal[prop].puth);
                    desertRef.delete().then(function () {
                        // File deleted successfully
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                    });
                }
            }.bind(this)).then(function () {

                firebase.database().ref(puth).remove();

            }.bind(this));

        },
        setupReferensUserPic: function () {

            var ref = firebase.database().ref('users/' + this.user.uid + '/temporal/avatar/');
            ref.on('value', function (snapshot) {
                if (snapshot.val()) {
                    radio.trigger('newDogAvatar', snapshot.val());
                }

            });
        },
        setupReferensNewPhoto: function () {

            var ref = firebase.database().ref('users/' + this.user.uid + '/temporal/new-photo/');
            ref.on('value', function (snapshot) {
                if (snapshot.val()) {
                    radio.trigger('addPhotoRender', snapshot.val());
                }

            });
        },
        setupReferensNewNews: function () {

            var ref = firebase.database().ref('users/' + this.user.uid + '/temporal/new-news/');
            ref.on('value', function (snapshot) {
                if (snapshot.val()) {
                    radio.trigger('addNewsRender', snapshot.val());
                }

            });
        },
        setupReferensDogsAvatar: function () {

            var ref = firebase.database().ref('dogs/' + this.dogId + '/avatar/');
            ref.on('value', function (snapshot) {
                if (snapshot.val()) {
                    radio.trigger('newDogMainAvatar', snapshot.val());
                }
            });

        },
        setupReferensDogsChats: function (puth, callbackFunction) {

            var ref = firebase.database().ref(puth);
            ref.on('value', function (snapshot) {
                if (snapshot.val() && callbackFunction) {
                    callbackFunction(snapshot.val());
                }
            });

        },
        setupRef: function (puth, callbackFunction) {

            var ref = firebase.database().ref(puth);
            ref.on('value', function (snapshot) {
                if (snapshot.val() && callbackFunction) {
                    callbackFunction(snapshot.val());
                }
            });
        },
        offRefs: function (puth) {

            var ref = firebase.database().ref(puth);
            ref.off();
        },
        signInWithGoogle: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                this.user = user;
                this.data = {
                    name: user.displayName,
                    email: user.email
                };
                document.location.href = "#map";
            }.bind(this)).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            })
        },
        signOut: function (user) {
            var func = function () {
                firebase.auth().signOut().then(function () {

                }).catch(function (error) {

                });
                this.user = false;
                this.userData = false;
                this.data = false;
                this.userDogs = [];
                this.currentDogInfo = false;
                this.currentUserDog = false;
                this.dogNews=false;
                console.log('user sign out');
                radio.trigger('userSignOut');
            }.bind(this);

            setTimeout(func, 1000);
        },
        registerNewUser: function (email, password, data) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {

                this.data = data;
                document.location.href = "#signUpStep2";

            }.bind(this)).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                return
            });
        },
        signInWithEmail: function (email, password) {

            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {

                document.location.href = "#map";

            }.bind(this)).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
        },
        dataBase: function (data, userId) {

            return firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
                if (snapshot.val()) {
                    console.log('user exist');
                } else {
                    console.log('new user');
                    firebase.database().ref('users/' + userId + '/data/').set(data);
                }

            }.bind(this)).then(function () {
                this.getInfo();
            }.bind(this));
        },
        returnName: function (userId) {

            return firebase.database().ref('users/' + userId).once('value').then(function (snapshot) {
                if (snapshot.val()) {
                    this.user.name = snapshot.val().name;
                }
            }.bind(this));
        },
        returnInfo: function (puth, callbackFunction) {

            return firebase.database().ref(puth).once('value').then(function (snapshot) {
                if (snapshot.val() && callbackFunction) {
                    callbackFunction(snapshot.val());
                } else {
                    return false
                }
            });
        },
        returnInfoValue: function (puth, callbackFunction) {


            return  firebase.database().ref(puth).once('value').then(function (snapshot) {
                    if (snapshot.val() && callbackFunction) {
                        callbackFunction(snapshot.val());
                    }
                });
        },
        saveInfo: function (info, puth) {

            firebase.database().ref('users/' + firebase.auth().currentUser.uid + puth).set(info);
        },
        saveInfoFullPuth: function (puth, info, callbackFunction) {

            firebase.database().ref(puth).set(info).then(function () {

                if (callbackFunction) {
                    callbackFunction();
                }
            });
        },
        getInfo: function () {

            firebase.database().ref('users/' + this.user.uid).once('value').then(function (snapshot) {

                if (snapshot.val()) {
                    this.userData = snapshot.val().data;
                    console.log('fb get info ' + snapshot.val().data);
                    if (this.userData && this.userData.dogs) {
                        this.userDogs = true;
                        this.getDogInfo(this.userData);
                    }
                } else {
                    return
                }
            }.bind(this)).then(function () {
                if (this.userDogs === true) {
                    return
                } else {
                    radio.trigger('signInOrOut');
                }
            }.bind(this))
        },
        getDogInfo: function (userData) {

            var userDogsArray = Object.keys(userData.dogs);
            var dog;
            var userDogs = [];
                for (var i = 0; i < userDogsArray.length; i++) {
                    if (this.allDogsInfo[userDogsArray[i]]) {
                        dog = this.allDogsInfo[userDogsArray[i]];
                        userDogs.push(dog);
                    }
                }
            this.userDogs = userDogs;
            this.currentDogInfo = this.userDogs[0];
            this.currentUserDog = this.userDogs[0];
            radio.trigger('signInOrOut');
        },
        getProfileInfo: function (dogId) {

            firebase.database().ref('dogs/' + dogId + '/').once('value').then(function (snapshot) {

                this.currentDogInfo = snapshot.val();
                if (snapshot.val().news && !($.isEmptyObject(snapshot.val().news))) {
                    this.getDogNewsInfo(this.currentDogInfo);
                } else {
                    this.dogNews = [];
                    Promise.resolve()
                        .then(function () {
                            firebase.database().ref('users/' + this.currentDogInfo.ownerUid + '/data/').once('value').then(function (snapshot) {
                                if (snapshot.val()) {
                                    this.currentDogOwnerInfo = snapshot.val();
                                }
                            }.bind(this))
                        }.bind(this))
                        .then(function () {
                            radio.trigger('makeNewProfile', this.currentDogInfo);
                        }.bind(this))
                }
            }.bind(this)).then(function () {
                document.location.href = "#profile";
            }.bind(this));

        },
        getDogNewsInfo: function (dogInfo) {

            var dogNewsArray = Object.keys(dogInfo.news);
            var news;
            var dogNews = [];
            firebase.database().ref('news/').once('value').then(function (snapshot) {
                var allNews = snapshot.val();
                for (var i = 0; i < dogNewsArray.length; i++) {
                    if (allNews[dogNewsArray[i]]) {
                        news = allNews[dogNewsArray[i]];
                        dogNews.push(news);
                    }
                }
                this.dogNews = dogNews;
            }.bind(this)).then(function () {
                firebase.database().ref('users/' + this.currentDogInfo.ownerUid + '/data/').once('value').then(function (snapshot) {
                    if (snapshot.val()) {
                        this.currentDogOwnerInfo = snapshot.val();
                    }
                    radio.trigger('makeNewProfile', this.currentDogInfo); 
                }.bind(this))   
            }.bind(this));
        },
        deleteInfo: function (puth, id) {

            var storage = firebase.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child(puth);
            // Delete the file
            desertRef.delete().then(function () {
                // File deleted successfully
            }).catch(function (error) {
                // Uh-oh, an error occurred!
            });
            var puthForBase = puth.split('.');
            puthForBase = puthForBase[0];
            var id = puthForBase[0].split('/');
            id = id[id.length];
            firebase.database().ref('users/' + this.user.uid + '/' + puthForBase).remove(id)
        },
        deleteInfoFullPuth: function (puths) {

            var storage = firebase.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child(puths.storage);
            // Delete the file
            desertRef.delete().then(function () {
                // File deleted successfully
            }).catch(function (error) {
                // Uh-oh, an error occurred!
            });
            var id = puths.storage.split('/');
            id = id[id.length - 1];
            firebase.database().ref(puths.database + id).remove()
        },
        deleteFromDataBase: function (puth, callbackFunction) {

            firebase.database().ref(puth).remove().then(function () {
                if(callbackFunction){
                    callbackFunction();
                }
            });

        },
        deleteInfoSettings: function (puth) {

            firebase.database().ref('users/' + this.user.uid + puth).remove();
        },
        generateId: function () {

            return 'id' + (new Date()).getTime();
        },
        generateDate: function () {

            var date = new Date() + '';
            date = date.split(' ').slice(1, 5);
            date = date[1] + ' ' + date[0] + ' ' + date[2] + ' ' + date[3];
            return date
        },
        generateTime: function () {

            var date = new Date() + '';
            date = date.split(' ').slice(1, 5);
            time = date[3];
            return time
        },
        saveInStorage: function (id, file, puths) {
            if (!file) {
                return
            }
            var fileType = file.name.split('.');
            fileType = fileType[1];
            if (fileType != 'jpg' && fileType != 'png' && fileType != 'jpeg') {
                myError.create('danger', 'Можно загружать только изображения в формате jpg, jpeg, png!');
                return
            }
            var puth = puths.storage;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var uploadTask = storageRef.child(puth).put(file);
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (er) {
                // Handle unsuccessful uploads
                error.create('danger', er);
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var downloadURL = uploadTask.snapshot.downloadURL;

                var dataUrl = {
                    puth: puth,
                    downloadURL: downloadURL,
                    id: id
                };
                if (puths.description) {
                    dataUrl.description = puths.description;
                }
                if (puths.time) {
                    dataUrl.time = puths.time;
                }
                firebase.database().ref(puths.database).set(dataUrl);
                if (!puths.temporal) {
                    myError.create('ok', 'Фотография загружена успешно!');
                }


            }.bind(this));

        }


    };

    return fairBase
})
;