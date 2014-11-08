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

    SelectionScreen.DEFAULT_OPTIONS = {
        itemSize: [150, 150]
    };

    function _createViews() {
        var SelectionScreen = new Surface({
            size: [undefined, undefined],
            content: 'Select a personality:',
            properties: {
                color: '#fff',
                fontSize: '20px',
                textAlign: 'center',
                background: '#fa5c4f',
                lineHeight: '50px'
            }
        });
        this.add(SelectionScreen);

        this.her1 = new UIElement({
            position: [0,0,0],
            size: this.options.itemSize,
            align: [0.25,0.4],
            origin: [.5,.5],
            style: {
                fontSize: '30px',
                textAlign: 'center',
                background: 'blue'
            }
        });
        this.add(this.her1);

        this.her2 = new UIElement({
            position: [0,0,0],
            size: this.options.itemSize,
            align: [0.25,.7],
            origin: [.5,.5],
            style: {
                fontSize: '30px',
                textAlign: 'center',
                background: 'blue'
            }
        });
        this.add(this.her2);

        this.her3 = new UIElement({
            position: [0,0,0],
            size: this.options.itemSize,
            align: [.75,0.4],
            origin: [.5,.5],
            style: {
                fontSize: '30px',
                textAlign: 'center',
                background: 'blue'
            }
        });
        this.add(this.her3);

        this.her4 = new UIElement({
            position: [0,0,0],
            size: this.options.itemSize,
            align: [.75,.7],
            origin: [.5,.5],
            style: {
                fontSize: '30px',
                textAlign: 'center',
                background: 'blue'
            }
        });
        this.add(this.her4);

    }

    function _setListeners() {
        this.her1.on('click', function(){
            this._eventOutput.emit('personClick', 1);
        }.bind(this));
        this.her2.on('click', function(){
            this._eventOutput.emit('personClick', 2);
        }.bind(this));
        this.her3.on('click', function(){
            this._eventOutput.emit('personClick', 3);
        }.bind(this));
        this.her4.on('click', function(){
            this._eventOutput.emit('personClick', 4);
        }.bind(this));
    }

    module.exports = SelectionScreen;
});