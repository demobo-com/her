define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Lightbox = require('famous/views/Lightbox');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    var SelectionScreen = require('views/pages/SelectionScreen');
    var VoiceView = require('views/pages/VoiceView');
    var SplashScreen = require('views/pages/splashscreen');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(600);

    this.voiceView = new VoiceView();
    this.splashScreen = new SplashScreen();
    this.selectionScreen = new SelectionScreen();

    this.appLightbox = new Lightbox({
        inTransform: Transform.translate(0, window.innerHeight, 0),
        showTransform: Transform.translate(0, 0, 0),
        outTransform: Transform.translate(0, -100, 0),
        inOpacity: 0,
        showOpacity: 1,
        outOpacity: 0
    });
    mainContext.add(this.appLightbox);
    this.appLightbox.show(this.splashScreen, { duration : 0, curve: Easing.outBack });

    setTimeout(function(){
        this.appLightbox.show(this.selectionScreen, { duration : 600, curve: Easing.outBack });
    }.bind(this),1000);

    var onPersonClick = _.debounce(function(data){
        this.appLightbox.show(this.voiceView, { duration : 600, curve: Easing.outBack });
        this.voiceView.load(data);
    },200);
    this.selectionScreen.on('personClick',onPersonClick.bind(this) );
});