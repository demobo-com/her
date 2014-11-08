define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SplashScreen() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    SplashScreen.prototype = Object.create(View.prototype);
    SplashScreen.prototype.constructor = SplashScreen;

    SplashScreen.DEFAULT_OPTIONS = {};

    function _createViews() {
        var splashScreen = new Surface({
            size: [undefined, undefined],
            content: 'HER',
            properties: {
                color: '#fff',
                fontSize: '100px',
                textAlign: 'center',
                background: '#fa5c4f',
                lineHeight: '400px'
            }
        });
        this.add(splashScreen);

        var logo = new ImageSurface({
            content: "assets/imgs/toyota.png",
            origin: [.5, .5],
            size: [150,130],
            properties:{
                zIndex: 1
            }
        });
        this.add(logo);

    }

    function _setListeners() {

    }

    module.exports = SplashScreen;
});