define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var UIElement           = require('core/UIElement');

    function SelectionScreen() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    SelectionScreen.prototype = Object.create(View.prototype);
    SelectionScreen.prototype.constructor = SelectionScreen;

    SelectionScreen.DEFAULT_OPTIONS = {};

    function _createViews() {
        var SelectionScreen = new Surface({
            size: [undefined, undefined],
            content: 'Her',
            properties: {
                color: '#fff',
                fontSize: '40px',
                textAlign: 'center',
                background: '#fa5c4f'
            }
        });
        this.add(SelectionScreen);

        var her1 = new UIElement({
            position: [0,0,0],
            size: [200, 200],
            align: [0,0],
            origin: [.5,.5],
            style: {
                fontSize: '30px',
                textAlign: 'center',
                background: 'blue'
            }
        });
        this.add(her1);

    }

    function _setListeners() {

    }

    module.exports = SelectionScreen;
});