define(['underscore', 'text!templates/asideTemplate.html', 'radio','jquery','jqueryui','hammer'],
    function (_, asideTemplateString, radio, jquery, jqueryui, Hammer) {

        var AsideView = function (model) {
            this.model = model;
            this.$el = $('.aside');
            this.el = document.querySelector('.aside');
            this.template = _.template(asideTemplateString);
            this.dragEl = new Hammer(this.el);
            this.init();

        };

        AsideView.prototype = {

            init: function () {
                
                this.enable();
                this.render();
            },
            enable: function () {
                this.dragEl.get('pan').set({direction: Hammer.DIRECTION_HORIZONTAL});
                this.dragEl.on('panleft panright', this.dragHandler.bind(this));
                this.$el.on('click', this.clickHandler.bind(this));
               

                return this
            },
            
            render: function () {
                this.$el.html(this.template({
                      count: this.model.count
                    
                    })
                );
            },
            clickHandler: function (ev) {

            },
            dragHandler:function (ev) {
                if(ev.type === 'panleft'){
                    if(parseInt(this.$el.css( 'right')) < -10){
                      this.$el.offset(function(i,val){
                      return {top:val.top, left:val.left - 10};
                      });
                    } 
                }
                else if(ev.type === 'panright'){
                     if(parseInt(this.$el.css( 'left')) < 0 ){
                        this.$el.offset(function(i,val){
                        return {top:val.top, left:val.left + 10};
                        });
                    }
                }
            }
        };
        return AsideView;
    });