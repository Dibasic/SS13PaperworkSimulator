/* jshint jquery: true */
'use strict';

$(function() {
    $("#credits-dialog").dialog({
        autoOpen: false
    });

    $('#credits-btn').click(function() {
        $("#credits-dialog").dialog({
        	minWidth: 465,
        	minHeight: 660
        });
        $("#credits-dialog").dialog('open');
    });
});
