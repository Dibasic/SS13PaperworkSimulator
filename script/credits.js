'use strict';

var CREDITS_TAGS;

$(document).ready(function() {
    setCreditsTags();
    loadCredits();
    setupCreditsDialog();
});

// set up all of our HTML building blocks
function setCreditsTags() {
    CREDITS_TAGS = {
        KEY_NAME: '_name',
        START_SECT: '<div class="credits-section">',
        START_HEAD: '<div class="credits-header">',
        START_ROW: '<div class="credits-row">',
        START_CELL: '<div class="credits-cell">',
        END_DIV: '</div>',
        START_LINK: '<a href="',
        MID_LINK: '" target="_blank">',
        END_LINK: '</a>',
        START_FA: '<i class="fa-lg ',
        END_FA: '"></i>'
    };
}

// constructs and inserts credits HTML
function loadCredits() {
    $.getJSON('./credits.json', null, function(data) {
        var html = constructCreditsHtml(data);
        $('#credits').html(html);
    });
}

// constructs valid HTML for credits
function constructCreditsHtml(data) {
    var str = '';

    for (var i = 0; i < data.length; ++i) {
        var obj = data[i];

        // open our credits section
        str += CREDITS_TAGS.START_SECT;
        // set our header
        str += CREDITS_TAGS.START_HEAD + obj.title + CREDITS_TAGS.END_DIV;

        // figure out how many rows and columns we need
        var cols = obj.columns;
        var rows = obj.credits.length / cols;
        if (obj.credits.length % cols > 0) {
            rows += 1;
        }

        for (var r = 0; r < rows; ++r) {
            // open our credits row
            str += CREDITS_TAGS.START_ROW;

            for (var c = 0; c < cols; ++c) {
                // pick our next credit
                var credit = obj.credits[r * cols + c];

                // set the text for our credit
                str += handleCreditsCell(credit);
            }

            // close our credits row
            str += CREDITS_TAGS.END_DIV;
        }

        // close our credits section
        str += CREDITS_TAGS.END_DIV;
    }
    return str;
}

// returns what a cell's text should be based on its contents and data type
function handleCreditsCell(cell) {
    var result = '';
    switch(typeof cell) {
        case 'string':
            // normal credit with a name or blurb
            result = CREDITS_TAGS.START_CELL + cell + CREDITS_TAGS.END_DIV;
            break;
        case 'object':
            // development credit with links
            for (var i = 0; i < Object.keys(cell).length; ++i) {
                // find the key and value of our next credit
                var key = Object.keys(cell)[i];
                var value = Object.values(cell)[i];

                // construct our cell
                result += CREDITS_TAGS.START_CELL;
                if (key === CREDITS_TAGS.KEY_NAME) {
                    // developer's name
                    result += value;
                }
                else {
                    // developer's icon and link
                    result += CREDITS_TAGS.START_LINK + value + CREDITS_TAGS.MID_LINK;
                    result += CREDITS_TAGS.START_FA + key + CREDITS_TAGS.END_FA;
                    result += CREDITS_TAGS.END_LINK;
                }
                result += CREDITS_TAGS.END_DIV;
            }
            break;
        default:
            // empty cell at the end of credits, or an error
            result = CREDITS_TAGS.START_CELL + CREDITS_TAGS.END_DIV;
    }
    return result;
}

// sets up jQuery UI dialog for credits
function setupCreditsDialog() {
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