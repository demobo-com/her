define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
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
            content: 'Her',
            properties: {
                color: '#fff',
                fontSize: '40px',
                textAlign: 'center',
                background: '#fa5c4f'
            }
        });
        this.add(splashScreen);
    }

    function _setListeners() {

    }

    module.exports = SplashScreen;
});