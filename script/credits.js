/* jshint browser: true, jquery: true */
'use strict';

$(document).ready(function() {
    populateCredits();
    setCreditsDialog();
});

function populateCredits() {
    $.getJSON('./credits.json', null, function(data) {
        // set up all of our HTML building blocks
        var KEY_NAME = '_name';

        var START_LINK = '<a href="';
        var MID_LINK = '" target="_blank">';
        var END_LINK = '</a>';
        var START_FA = '<i class="fa-lg ';
        var END_FA = '"></i>';

        var START_SECT = '<div class="credits-section">';
        var START_HEAD = '<div class="credits-header">';
        var START_ROW = '<div class="credits-row">';
        var START_CELL = '<div class="credits-cell">';
        var END_DIV = '</div>';

        var html = constructHtml(data);
        $('#credits').html(html);

        function constructHtml(data) {
            var str = '';

            // returns what a cell's text should be based on its contents and data type
            function handleCell(cell) {
                var result = '';
                switch(typeof cell) {
                    case 'string':
                        // normal credit with a name or blurb
                        result = START_CELL + cell + END_DIV;
                        break;
                    case 'object':
                        // development credit with links
                        for (var i = 0; i < Object.keys(cell).length; ++i) {
                            // find the key and value of our next credit
                            var key = Object.keys(cell)[i];
                            var value = Object.values(cell)[i];

                            // construct our cell
                            result += START_CELL;
                            if (key === KEY_NAME) {
                                // developer's name
                                result += value;
                            }
                            else {
                                // developer's link
                                result += START_LINK + value + MID_LINK + START_FA + key + END_FA + END_LINK;
                            }
                            result += END_DIV;
                        }
                        break;
                    default:
                        // empty cell at the end of credits, or an error
                        result = START_CELL + END_DIV;
                }
                return result;
            }

            for (var i = 0; i < data.length; ++i) {
                var obj = data[i];

                // open our credits section
                str += START_SECT;
                // set our header
                str += START_HEAD + obj.title + END_DIV;

                // figure out how many rows and columns we need
                var cols = obj.columns;
                var rows = obj.credits.length / cols;
                if (obj.credits.length % cols > 0) {
                    rows += 1;
                }

                var creditIndex = 0;

                for (var r = 0; r < rows; ++r) {
                    // open our credits row
                    str += START_ROW;

                    for (var c = 0; c < cols; ++c) {
                        // pick our next credit
                        var credit = obj.credits[creditIndex];

                        // set the text for our credit
                        str += handleCell(credit);

                        creditIndex += 1;
                    }

                    // close our credits row
                    str += END_DIV;
                }

                // close our credits section
                str += END_DIV;
            }
            return str;
        }
    });
}

function setCreditsDialog() {
    $("#credits-dialog").dialog({
        autoOpen: false
    });

    $('#credits-btn').click(function() {
        $("#credits-dialog").dialog({
            minWidth: 500,
            minHeight: 700
        });
        $("#credits-dialog").dialog('open');
    });
}