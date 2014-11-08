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

                var items = [1,2,3];
                voiceResponse.call(this, action, items[Math.floor(Math.random()*items.length)]);

                Helper.processToyota("", function(json){
                    this.voiceSurface.load(JSON.stringify(json));
                }, function() {

                });
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
            if (value == 1){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("Same old, same old. Just glad you're here.");
            } else if (value == 2){
                this.voiceSurface.changeSad();
                this.voiceSurface.alert.update("It's been a rough day. You're braking way too much!");
            } else if (value == 3){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("It's great! I'm so glad to spend time with you today!");
            }
        } else if (action == 'get.fuel'){
            if (value == 1){
                this.voiceSurface.changeAngry();
                this.voiceSurface.alert.update("I'm starving! I need food. NOW!");
            } else if (value == 2){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("I'm ok for now. You're so sweet for asking.");
            } else if (value == 3){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("I couldn't eat another bite! Thanks for feeding me.");
            }
        } else if (action == 'get.gps'){
            if (value == 1){
                this.voiceSurface.changeHappy();
                this.voiceSurface.alert.update("335 S Sunnyvale Ave. I like the view here. Let's stay for a while.");
            } else if (value = 2){
                this.voiceSurface.changeAngry();
                this.voiceSurface.alert.update("Sunnyvale. I don't feel safe here, can we go somewhere else?");
            } else if (value = 3){
                this.voiceSurface.changeNeutral();
                this.voiceSurface.alert.update("Sunnyvale. I'm bored. There's not much to do around here.");
            }
        } else if (action == 'error'){
            this.voiceSurface.changeConfused();
            if (value == 1){
                this.voiceSurface.alert.update("What are you talking about?");
            } else if (value = 2){
                this.voiceSurface.alert.update("Huh?");
            }else if (value = 2){
                this.voiceSurface.alert.update("No clue?");
            }
        } else if (action == 'get.stat'){
            this.voiceSurface.showStats();
            //give values, flip
        }
    }

    window.help = Helper;
    module.exports = VoiceView;
});


