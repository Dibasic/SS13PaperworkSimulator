$(function() {
    $("#settings-dialog").dialog({
        autoOpen: false
    });

    $('#settings-btn').click(function() {
        $("#settings-dialog").dialog('open');
    });

    $('#pen-checkbox').click(updateFields);
    $('#filled-checkbox').click(updateFields);
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