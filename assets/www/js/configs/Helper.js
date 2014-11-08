define(function (require, exports, module) {
    var Helper = {
        // voice
        recognizeSpeech: function(successCallback, failCallback) {
            if (!window.plugins || !window.plugins.speechrecognizer) {
                console.log('Voice Search');
                return;
            }
            var maxMatches = 5;
            var promptString = "Speak now"; // optional
            var language = "en-US"; // optional
            window.plugins.speechrecognizer.startRecognize(function(data) {
                this.processApiAi(data[0], successCallback, failCallback);
            }.bind(this), failCallback, maxMatches, promptString, language);
        },

        processApiAi: function(text, successCallback, failCallback) {
            var accessToken = "e18d92c0af64436990f7ec387a200e85";
            var subscriptionKey = "c0b63dd4-bc77-448d-95ad-d9ed87729ad4";
            var baseUrl = "https://api.api.ai/v1/";
            $.ajax({
                type: "POST",
                url: baseUrl + "query/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "ocp-apim-subscription-key": subscriptionKey
                },
                data: JSON.stringify({ q: text, lang: "en" }),

                success: successCallback,
                error: failCallback
            });
        },

        processToyota: function(text, successCallback, failCallback) {
            var baseUrl = "https://api-jp-t-itc.com/GetVehicleInfo";
            $.ajax({
                type: "POST",
                url: baseUrl,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                jsonpCallback: 'jsonCallback',
                data: JSON.stringify({
                    callback: '?',
                    developerkey: 'bb156e0c6e51',
                    responseformat: "jsonp",
                    vid: 'ITCUS_VID_052',
                    infoids: '[Posn,VehBehvr,RestFu]'
                }),
                success: successCallback,
                error: failCallback
            });
        }

    };

    module.exports = Helper;
});
