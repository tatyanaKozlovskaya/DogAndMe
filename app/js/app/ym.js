define(['radio', 'Error', 'ymap', 'fb', 'jqueryjson'],
    function (radio, myError, ymap, fb, jqueryjson) {
        var ym = {
            features: [],
            featureCollection: {
                type: "FeatureCollection"
            },
            
            createRegistrationMap: function (selector) {
                ymaps.ready(function () {
                    ymaps.geolocation.get().then(function (res) {
                        var mapContainer = $('#' + selector),
                            bounds = res.geoObjects.get(0).properties.get('boundedBy'),
                            mapState = ymaps.util.bounds.getCenterAndZoom(
                                bounds,
                                [mapContainer.width(), mapContainer.height()]
                            );
                        var address = res.geoObjects.get(0).properties._data.text;
                        radio.trigger('registrationDogAdress', address);
                        this.createMap.bind(this)(mapState, address, selector);
                    }.bind(this), function (e) {
                        this.createMap({
                            center: [55.751574, 37.573856],
                            zoom: 2
                        });
                    });

                }.bind(this));
            },
            createMap: function (state, address, selector) {
                this.registrationMap = new ymaps.Map(selector, state);
                console.log(this.registrationMap);
                if (address) {
                    this.geocode(address)
                }
                radio.trigger('setFocusOutEvent');
            },
            geocode: function (address) {

                ymaps.geocode(address, {
                    results: 1
                }).then(function (res) {
                    var firstGeoObject = res.geoObjects.get(0),
                        coords = firstGeoObject.geometry.getCoordinates(),
                        bounds = firstGeoObject.properties.get('boundedBy');
                    radio.trigger('registrationCoords', coords);
                    firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                    firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
                    this.registrationMap.geoObjects.removeAll();
                    this.registrationMap.geoObjects.add(firstGeoObject);
                    // Масштабируем карту на область видимости геообъекта.
                    this.registrationMap.setBounds(bounds, {
                        // Проверяем наличие тайлов на данном масштабе.
                        checkZoomRange: true
                    });
                }.bind(this));
            },
            createProfileMap: function (selector, coords) {
                ymaps.ready(function () {
                    if (this.profileMap) {
                        this.profileMap.destroy();
                    }
                    this.profileMap = new ymaps.Map(selector, {
                        center: coords,
                        zoom: 11,
                        controls: ['zoomControl']
                    });
                }.bind(this))
                this.createProfilePlacemark(coords);
            },
            deleteProfileMap: function (){
                if (this.profileMap) {
                    this.profileMap.destroy();
                }
            },
            createProfilePlacemark: function (coords) {
                ymaps.ready(function () {
                    var myPlacemark = new ymaps.Placemark(coords, {

                    });
                    this.profileMap.geoObjects.add(myPlacemark);
                }.bind(this))
            },
            objectDogsToJson: function () {

                ymaps.ready(function () {

                var allDogs = fb.allDogsInfo;
                var count = 0;
                var allDogsInfoCount = 0
                for(var prop in fb.allDogsInfo){
                 allDogsInfoCount++
                }
                for (var prop in fb.allDogsInfo) {
                    
                    if (fb.allDogsInfo[prop].coords && fb.allDogsInfo[prop].name && fb.allDogsInfo[prop].id && fb.allDogsInfo[prop].breed && fb.allDogsInfo[prop].avatar && fb.allDogsInfo[prop].avatar.downloadURL) {
                        var src= fb.allDogsInfo[prop].avatar.downloadURL;
                        var polygonLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container "><div class="polygon_layout"><img class="dog-img" src="{{ properties.url }}"></div></div>');
                        var obj = {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: fb.allDogsInfo[prop].coords
                            },
                            properties: {
                                hintContent: fb.allDogsInfo[prop].name,
                                id: fb.allDogsInfo[prop].id,
                                breed: fb.allDogsInfo[prop].breed,
                                url: fb.allDogsInfo[prop].avatar.downloadURL
                            },
                            options: {
                                iconLayout: polygonLayout,
                                iconShape: {
                                    type: 'Polygon',
                                    coordinates: [
                                        [[-28, -76], [28, -76], [28, -20], [12, -20], [0, -4], [-12, -20], [-28, -20]]
                                    ]
                                }
                            }
                        }
                        this.features.push(obj);
                    }
                    count++;
                    if(count === allDogsInfoCount){
                        this.featureCollection.features = this.features;
                        this.getGeolocation();
                    }
                }
                    
                }.bind(this))
            },
            createMainMap: function (coords) {
                ymaps.ready()
                    .done(function (ymap) {
                        if (this.mainMap) {
                        this.mainMap.destroy();
                        }   
                        this.mainMap = new ymap.Map('map-map', {
                            center: coords,
                            zoom: 12
                        }, {
                            searchControlProvider: 'yandex#search'
                        });
                        
                        this.addPlaceMarks();
                        this.setupEvents();    
                    }.bind(this))
            },
            getGeolocation: function(){

                var geolocation = ymaps.geolocation;
                geolocation.get({
                    provider: 'yandex',
                    mapStateAutoApply: true
                }).then(function (res) {
                    res.geoObjects.options.set('preset', 'islands#orangeCircleIcon');
                    res.geoObjects.get(0).properties.set({
                        balloonContentBody: 'Мое местоположение'
                    });
                    var coords = res.geoObjects.position
                    console.log(coords);
                    this.createMainMap(coords)
                }.bind(this)).then(function (res) {
                    
                    this.mainMap.geoObjects.add(res.geoObjects);

                }.bind(this)); 
            },
            addPlaceMarks: function(){

                var result = ymaps.geoQuery(this.featureCollection);
                result.search('geometry.type != "Point"').addToMap(this.mainMap);
                this.mainMap.geoObjects.add(result.search('geometry.type == "Point"').clusterize());

            },
            setupEvents: function (){

                this.mainMap.geoObjects.events.add('click', this.clickHandler.bind(this));
            },
            deleteMap: function (){
                if(this.mainMap){
                   this.mainMap.destroy();
                }
                 this.features=[];
            },
            clickHandler: function (ev) {  

               var id = ev.get('target').properties.get('id'); 
               console.log(ev)
               radio.trigger('goToUserProfile', id);
            }
        };
        return ym
    });