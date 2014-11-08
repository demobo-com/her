define(function(require, exports, module) {
    var UIElement           = require('core/UIElement');
    var UIComponent         = require('core/UIComponent');
    var AlertView           = require('views/ui/AlertView');

    var AvatarView = UIComponent.extend({
        constructor:function(options) {
            this._callSuper(UIComponent, 'constructor', options);

            options = options || {};
            this.size       =   options.size            || [window.innerWidth, window.innerHeight];

            _createAvatar.call(this);
            _createAlert.call(this);
            _setListeners.call(this);
        },

        changeHappy: function() {
            this.avatar.setContent('<img src="assets/imgs/herHappy.png">' + '<div>Charlene</div>');
        },

        changeSad: function() {
            this.avatar.setContent('<img src="assets/imgs/herSad.png">' + '<div>Charlene</div>');
        },

        changeAngry: function() {
            this.avatar.setContent('<img src="assets/imgs/herAngry.png">' + '<div>Charlene</div>');
        },

        changeConfused: function() {
            this.avatar.setContent('<img src="assets/imgs/herConfused.png">' + '<div>Charlene</div>');
        },

        changeNeutral: function() {
            this.avatar.setContent('<img src="assets/imgs/her.png">' + '<div>Charlene</div>');
        }



    });

    function _createAvatar() {
        this.avatar = new UIElement({
            classes: ['avatar'],
            content: '<img src="assets/imgs/her.png">' + '<div>Charlene</div>',
            style: {
                backgroundColor: '#fa5c4f',
                textAlign: 'center'
            }
        });
        this._addChild(this.avatar);
    }

    function _createAlert() {
        this.alert = new AlertView({
            size: [window.innerWidth/4*3, window.innerHeight/4],
            xPos: window.innerWidth/20,
            yPos: window.innerWidth*0.12,
            xHide: -window.innerWidth,
            yHide: window.innerWidth*0.12
        });
        this.alert.init();
        this.alert.hide();
        this._addChild(this.alert);
    }

    function _setListeners() {
//        this.avatar.on('click', function(){
//            this.changeHappy();
//            this.alert.update("message");
//        }.bind(this));
    }

    module.exports = AvatarView;
});