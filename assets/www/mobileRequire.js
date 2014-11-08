$(document).ready(function() {
    require(['js/lib/famous.min'], function(){
        if (!window.configs) window.configs = {dev: false};
        require.config({baseUrl: 'js'});
        require(['../mobile']);
    });
});
