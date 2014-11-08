define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var RenderNode = require('famous/core/RenderNode');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderController = require('famous/views/RenderController');
    var Utility = require('famous/utilities/Utility');
    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    var Transitionable  = require('famous/transitions/Transitionable');
    var Easing          = require('famous/transitions/Easing');
    var HeaderFooterLayout      = require('famous/views/HeaderFooterLayout');
    var Lightbox = require('famous/views/Lightbox');
    var SpringTransition    = require('famous/transitions/SpringTransition');
    var FastClick = require('famous/inputs/FastClick');
    GenericSync.register({'touch': TouchSync});
    Transitionable.registerMethod(SpringTransition);

    var Helper = require('configs/Helper');
    var soundEffect = require('configs/SoundEffect');
    var Scrollview = require('lib/demobo/Scrollview');
    var AvatarView = require('views/ui/AvatarView');

    function VoiceView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setEvents.call(this);
        _setListeners.call(this);
    }


    VoiceView.prototype = Object.create(View.prototype);
    VoiceView.prototype.constructor = VoiceView;

    VoiceView.DEFAULT_OPTIONS = {

    };

    VoiceView.prototype.load = function(data) {
        console.log(data);
    }

    function _createViews() {
        this.voiceSurface = new AvatarView({
            size: [undefined, undefined],
            content: 'VOICE',
            properties: {
                textAlign: 'center',
                background: 'red'
            }
        });

        this.scrollview = new Scrollview({
            direction: Utility.Direction.Y
        });
        this.scrollview.sequenceFrom([this.voiceSurface]);
        this.add(this.scrollview);
//        voiceSurface.pipe(this.scrollview);
    }

    function _setListeners() {

    }


    function _setEvents(){
        this.scrollview.on('pullToRefresh', function() {
            Helper.recognizeSpeech.call(Helper, function(json){
                var action = json.result.action;
                var value = _.values(json.result.parameters).join('');
                console.warn(json);
                alert(action + " " + value);
            }, function(errorMessage) {
                console.warn(errorMessage);
                alert('error');
            });
        }.bind(this));
    }

    module.exports = VoiceView;
});


