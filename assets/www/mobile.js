define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Lightbox = require('famous/views/Lightbox');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var VoiceView = require('views/pages/VoiceView');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(600);

    this.voiceView = new VoiceView();

    this.appLightbox = new Lightbox({
        inTransform: Transform.translate(0, 0, 0),
        showTransform: Transform.translate(0, 0, 0),
        outTransform: Transform.translate(0, 0, 0),
        inOpacity: 0,
        showOpacity: 1,
        outOpacity: 0
    });
    mainContext.add(this.appLightbox);
    this.appLightbox.show(this.voiceView);

});