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
            _createStats.call(this);
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
        },

        load: function(data) {
            this.stats.setContent(data);
        },

        showStats: function() {
            this.stats.setStyle({zIndex: 2}, {duration: 50});
            this.stats.setOpacity(1, {duration: 500, curve: "easeOut"});
            this.stats.setSize([window.innerWidth, window.innerHeight], {duration: 500, curve: "easeOut"});
            this.alert.hide();
            this.avatar.setOpacity(0, {duration: 500, curve: "easeOut"});

        },

        hideStats: function() {
            this.stats.setOpacity(0, {duration: 1000, curve: "easeOut"});
            this.stats.setSize([0,0], {duration: 1000, curve: "easeOut"}, function() {
                this.stats.setStyle({zIndex: -5});
            }.bind(this))

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

    function _createStats() {
        this.stats = new UIElement({
            origin: [0.5,0.5],
            align: [0.5,0.5],
            content: "Stats",
            opacity: 0,
            color: "#fff",
            style: {
                backgroundColor: 'coral',
                zIndex: -5,
                paddingTop: '20px',
                paddingLeft: '20px'
            }
        });
        this.hideStats();
        this._addChild(this.stats);
    }

    function _setListeners() {
        this.alert.on('click', function(){
            this.showStats();
        }.bind(this));
        this.stats.on('click', function(){
            this.hideStats();
        })
    }

    module.exports = AvatarView;
});