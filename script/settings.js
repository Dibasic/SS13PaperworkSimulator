/* jshint jquery: true */
/* global checkFieldCount */
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

    $('#pen-style-select option').click(updateFonts);
    $('#pen-color-select option').click(updateFonts);
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

    checkFieldCount();
}

function updateFonts(e) {
    var target = $(e.target); // The clicked <option>
    var targetSelect = target.parent(); // The <select> of the target
    var otherSelect = findOther(); // The other <select>

    if (target.text() === 'Fancy') { // We're switching to a Fancy pen or color
        // Switch both to Fancy
        $('#pen-style-select').val('Segoe Script, sans-serif');
        $('#pen-color-select').val('#1c1713');

    } else if(otherSelect.find('option:selected').text() === 'Fancy') { // Switching away from Fancy
        // Make the other not Fancy
        otherSelect[0].selectedIndex = 0;
    }

    // Apply the new styling to the output
    $('#output').css('font-family', $('#pen-style-select').val());
    $('#output').css('color', $('#pen-color-select').val());

    function findOther() {
        if ($('#pen-style-select')[0] === targetSelect[0]) {
            return $('#pen-color-select');
        }
        if ($('#pen-color-select')[0] === targetSelect[0]) {
            return $('#pen-style-select');
        }
        console.error('Could not deduce `other` in updateFonts');
    }
}
