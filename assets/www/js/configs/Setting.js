define(function(require, exports, module) {
    var settingID = "herSetting";
    var Setting = Backbone.Model.extend({
        defaults: {
            version: "1.0.0"
        }
    });

    Setting.load = _.memoize(function() {
        this.appSetting = new Setting({
            id: settingID
        });
        return this.appSetting;
    });
    module.exports = Setting.load();
});