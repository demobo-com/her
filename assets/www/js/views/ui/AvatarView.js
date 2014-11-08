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
        }





    });

    function _createAvatar() {
        this.avatar = new UIElement({
            content: "hi!",
            style: {
                backgroundColor: 'red',
                textAlign: 'center'
            }
        });
        this._addChild(this.avatar);
    }

    function _createAlert() {
        this.alert = new AlertView({
            size: [window.innerWidth/4*3, window.innerHeight/4]
        });
        this.alert.update('hi','there');
        this._addChild(this.alert);
    }

    module.exports = AvatarView;
});