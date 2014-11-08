define(function(require, exports, module) {
    var UIElement           = require('core/UIElement');

    var Setting = require('configs/Setting');

    var AlertView = UIElement.extend({
        constructor:function(options) {
            options = options || {};
            this.size       =   options.size            || [window.innerWidth/2, window.innerHeight/10];
            this.xPos       =   options.xPos            ||  window.innerWidth/4
            this.yPos       =   options.yPos            ||  window.innerHeight/2;
            this.zPos       =   options.zPos            ||  5;
            this.xHide      =   options.xHide           ||  0;
            this.yHide      =   options.yHide           ||  window.innerHeight/2;
            this.exist      =   options.exist           ||  true;

            this._callSuper(UIElement, 'constructor', {
                classes: ["alert"],
                position: [0, 0, 1],
                size: this.size,
                style: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
//                    fontFamily: 'avenir next',
                    fontWeight: 200,
                    fontSize: window.innerHeight/24 + 'px',
                    borderRadius: window.innerHeight/108 + 'px',
                    textAlign: "center",
//                    margin: this.xPos,
                    color: "white"
                }
            });


        },

        init: function() {
            this.setOpacity(0);
            this.setPosition(0,0,0);
        },

        hide: function() {
            this.halt();
            this.setOpacity(0, {duration: 200, curve: "easeOut"});
            this.setPosition(this.xHide, this.yHide,-this.zPos, {duration : 500, curve : 'easeOut'});
            this.setContent('');
        },

        show: function() {
            if (this.exist) {
                this.halt();
                this.setOpacity(1, {duration: 300, curve: "easeOut"});
                this.setPosition(this.xPos,this.yPos,this.zPos, {duration : 500, curve : 'easeOut'});
                if (this.showTimeout) clearTimeout(this.showTimeout);
                this.showTimeout = setTimeout(function(){this.hide()}.bind(this),1500);
            }
        },

        update: function(logo, value) {
            if (this.exist) {
                var html = logo + '<div>' + value + '</div>'
                html = Mustache.render(html, {color: 'lightgrey'});
                this.setContent(html);
                this.show();
            }
        }
    });


    module.exports = AlertView;
});
