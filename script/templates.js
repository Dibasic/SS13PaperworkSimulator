/* exported loadFile */
/* global run */
'use strict';

$(document).ready(function() {
    $('#template').css('display', 'none');
    $('#load').click(function() {
        if ($('#template').css('display') === 'none') {
            $('#template').css('display', '');
        } else {
            closeTemplateMenu();
        }
    });
    $(document).keydown(function(e) {
        if (e.key === 'Escape') {
            closeTemplateMenu();
        }
    });
    $('#input').click(closeTemplateMenu);

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
                    str += '<div onclick="loadFile(\'' + value + '\')">' + key + '</div>';

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
    var newHash = filename.substr(0, filename.indexOf('.txt'));
    $(location).attr('hash', newHash);
    
    $.get('./templates/' + filename, function(data) {
        $('#input').val(data);
        run();
    }, 'text');

    closeTemplateMenu();
}

function closeTemplateMenu() {
    $('#template').css('display', 'none');
    $('#template').menu('collapseAll');
}
