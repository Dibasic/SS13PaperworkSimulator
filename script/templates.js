/* jshint browser: true, jquery: true, devel: true */
'use strict';

$(document).ready(function() {
    $.getJSON('./templates/index.json', null, function(data) {
        var html = constructHtml(data);
        $('#template').html(html);
        $('.controlgroup').controlgroup('refresh');
    
        function constructHtml(data) {
            var str = '';
            for (var i = 0; i < Object.keys(data).length; ++i) {
                var key = Object.keys(data)[i];
                var value = Object.values(data)[i];
                if (jQuery.type(value) === 'string') {
                    str += '<option value="' + value + '">' + key + '</option>';

                } else if (jQuery.type(value) === 'object') {
                    str += '<optgroup label="' + key + '">' + constructHtml(value) + '</optgroup>';

                } else {
                    console.warn('Unexpected value type in templates/index.json:', jQuery.type(value));
                }
            }
            return str;
        }
    });
});
