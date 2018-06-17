define(['underscore', 'text!templates/mapTemplate.html', 'radio','jquery','fb','ym'],
    function (_, mapTemplateString, radio, jquery, fb, ym) {

        var MapView = function (model) {
            this.model = model;
            this.$el = $('.map-page');
            this.template = _.template(mapTemplateString);
            this.init();

        };

        MapView.prototype = {

            init: function () {
                
                this.enable();
                this.render();
            },
            enable: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                return this
            },
            render: function () {
                
                this.$el.html(this.template({
                    
                    })
                );
            },
            clickHandler: function (ev) {
                
            },

        };
        return MapView;
    });