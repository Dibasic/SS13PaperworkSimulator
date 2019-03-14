/* jshint browser: true, jquery: true, devel: true */
'use strict';

$(document).ready(function() {
    $('#template').css('display', 'none');
    $('#load').click(function() {
        if ($('#template').css('display') === 'none') {
            $('#template').css('display', '');
        } else {
            $('#template').css('display', 'none');
        }
    });

    $.getJSON('./templates/index.json', null, function(data) {
        var html = constructHtml(data);
        $('#template').html(html);
        $('#template').menu({ autoOpen: false }); // should not be changed after initialization.
        $('.controlgroup').controlgroup('refresh');
    
        function constructHtml(data) {
            var str = '';
            for (var i = 0; i < Object.keys(data).length; ++i) {
                var key = Object.keys(data)[i];
                var value = Object.values(data)[i];
                str += '<li>';
                if (jQuery.type(value) === 'string') {
                    str += '<div onclick="loadFile(\'' + encodeURIComponent(value) + '\')">' + key + '</div>';

                } else if (jQuery.type(value) === 'object') {
                    str += '<div>' + key + '</div><ul>' + constructHtml(value) + '</ul>';

                } else {
                    console.warn('Unexpected value type in templates/index.json:', jQuery.type(value));
                }
                str += '</li>';
            }
            return str;
        }
    });
});

function loadFile(filename) {
    $('#copy').attr('data-clipboard-text', window.location.protocol + '//' + window.location.pathname + '#' + filename);
    
    $.get('./templates/' + decodeURIComponent(filename), function(data) {
        $('#input').val(data);
        run();
    }, 'text');

    $('#template').css('display', 'none');
}
