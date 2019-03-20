/* jshint jquery: true */
'use strict';

$(function() {
    $("#settings-dialog").dialog({
        autoOpen: false
    });

    $('#settings-btn').click(function() {
        $("#settings-dialog").dialog('open');
    });

    $('#pen-checkbox').click(updateFields);
    $('#filled-checkbox').click(updateFields);

    $('#theme-select option').click(function(e) {
        var target = $(e.target);
        var targetSelect = target.parent();

        $('*').css('-webkit-transition', 'background-color 0.5s, color 0.5s');
        $('*').css('-moz-transition', 'background-color 0.5s, color 0.5s');
        $('*').css('-ms-transition', 'background-color 0.5s, color 0.5s');
        $('*').css('-o-transition', 'background-color 0.5s, color 0.5s');
        $('*').css('transition', 'background-color 0.5s, color 0.5s');

        for (var i = 0; i < $('#theme-select option').length; ++i) {
            var option = $('#theme-select option')[i];
            $('body').removeClass($(option).val());
        }
        $('body').addClass(targetSelect.val());

        setTimeout(function() {
            $('*').css('-webkit-transition', '');
            $('*').css('-moz-transition', '');
            $('*').css('-ms-transition', '');
            $('*').css('-o-transition', '');
            $('*').css('transition', '');
        }, 300);
    });
});

function updateFields() {
    var innerHtml = '';
    if ($('#filled-checkbox').is(':checked')) {
        innerHtml += '<span class="sample-text">Lorem ipsum dolor sit amet</span>';
    }
    if ($('#pen-checkbox').is(':checked')) {
        var html = '<span class="write-prompt" title="Players in-game will click this to write on the paper">write</span>';
        innerHtml += html;
        $('.output-end').html(html);
        $('.write-prompt').tooltip();
    } else {
        $('.output-end').html('');
    }
    $('.paper_field').html(innerHtml);
}
