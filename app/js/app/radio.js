define(function () {
   
    var Radio = function () {
        this.topics = {}
    };

    Radio.prototype = {
        on: function (topic, listener) {

            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            this.topics[topic].push(listener);
        },

        trigger: function (topic, data1, data2, data3) {

            if (!this.topics[topic] || this.topics[topic].length < 1) {
                return;
            }

            this.topics[topic].map(function (listener) {
                listener(data1, data2, data3);
            });
        },

        off: function (topic, listener) {

            var a = this.topics[topic].indexOf(listener);
            this.topics[topic].splice(a, 1);

            if (!this.topics[topic].length < 1) {
                delete this.topics.topic
            }
        },

        once: function (topic, listener) {

            var func = function () {

                listener();
                this.off(topic, func)

            }.bind(this);

            this.on(topic, func);


        }
    };

    var radio = new Radio();
    return radio

});