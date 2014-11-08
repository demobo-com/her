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
        window.voice = this;
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
//        window.v = this.voiceSurface

        this.scrollview = new Scrollview({
            direction: Utility.Direction.Y
        });
        this.scrollview.sequenceFrom([this.voiceSurface]);
        this.add(this.scrollview);
        Engine.pipe(this.scrollview);
    }

    function _setListeners() {

    }


    function _setEvents(){
        this.scrollview.on('pullToRefresh', function() {
            Helper.recognizeSpeech.call(Helper, function(json){
                var action = json.result.action;
                var value = _.values(json.result.parameters).join('');
                console.warn(json);
                voiceResponse.call(this, action, value);

//                Helper.processToyota("", function(json){
//                    console.log(json)
//                }, function() {
//
//                });
            }, function(errorMessage) {
                console.warn(errorMessage);
                voiceResponse('error', value);
            });
        }.bind(this));
    }

    window.voiceResponse = voiceResponse;

    function voiceResponse(action, value) {
        // action:
        // get.status, get.fuel, get.gps, get.stat
        if (action == 'get.status'){
            if (value == 'normal'){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("");
            } else if (value == 'bad'){
                this.voiceSurface.changeAngry();
                this.voiceSurface.alert.update("");
            } else if (value == 'good'){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("");
            }
        } else if (action == 'get.fuel'){
            if (value == 'low'){
                this.voiceSurface.changeAngry();
                this.voiceSurface.alert.update("I'm starving! I need food. NOW!");
            } else if (value == 'medium'){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("I'm ok for now. You're so sweet for asking.");
            } else if (value == "full"){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("I couldn't eat another bite! Thanks for feeding me.");
            }
        } else if (action == 'get.gps'){
            if (value == 'safe'){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("I like the view here. Let's stay for a while.");
            } else if (value == 'unsafe'){
                this.voiceSurface.changeSad();
                this.voiceSurface.alert.update("I'm scared, can we go somewhere else?");
            } else if (value = 'nothing special'){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("I'm bored. There's not much to do around here.");
            }
        } else if (action == 'error'){
            this.voiceSurface.changeConfused();
            this.voiceSurface.alert.update("What are you talking about?");
        } else if (action == 'get.stat'){
            //give values, flip
        }
    }

    window.help = Helper;
    module.exports = VoiceView;
});


