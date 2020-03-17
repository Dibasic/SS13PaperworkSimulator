/* exported checkFieldCount */
/* global loadFile, updateFields */
'use strict';

var yearmod = 288;

$(document).ready(function () {
    hideWarning();
    $('#year').html(getYear());

    $('#input').bind('input change', run);
    $('#save').click(function () { download('pencode.txt', $('#input').val()); });

    $('.controlgroup').controlgroup();

    setTimeout(function () {
        var hash = $(location).attr('hash');
        loadFile((hash && hash.substring(1) + '.txt') || 'instructions.txt');
    }, 100);

    $('.has-tooltip').tooltip();

    setKeyBindings();
});

function setKeyBindings() {
    var justAdded = false;
    $(document).keyup(function(e) {
        if (e.ctrlKey) {
            switch (e.key) {
                case('b'):
                case('i'):
                case('u'):
                case('e'):
                    justAdded = false;
                    break;
                case('>'):
                case('<'):
                    if (e.shiftKey) {
                        justAdded = false;
                    }
                    break;
            }
        }
    });
    $(document).keydown(function(e) {
        if (e.ctrlKey) {
            switch (e.key) {
                case('b'):
                case('i'):
                case('u'):
                    handleAddition(e.key);
                    break;
                case('e'):
                    handleAddition('center');
                    break;
            }
            if (e.shiftKey) {
                switch (e.key) {
                    case('>'):
                        handleAddition('large');
                        break;
                    case('<'):
                        handleAddition('small');
                        break;
                }
            }
        }

        function handleAddition(type) {
            e.preventDefault();
            if(!justAdded) {
                addBlock(type);
                justAdded = true;
            }
        }
    });
}

function run() {
    $('#output').html(processText($('#input').val()));
    $('#output span.sig').css('font-style', 'italic');
    updateFields();
}

String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

function processText(str) {

    str = (
        str
        .replaceAll('&', '&amp;') // Has to happen before other escaping, else it messes them up
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('\n', '<BR>')

        // Digital tags
        .replaceAll('[pre]', '<pre>')
        .replaceAll('[/pre]', '</pre>')
        .replaceAll('[fontred]', '<mark class="fontred">')
        .replaceAll('[fontgreen]', '<mark class="fontgreen">')
        .replaceAll('[fontblue]', '<mark class="fontblue">')
        .replaceAll('[/font]', '</mark>')

        .replaceAll('[center]', '<center>')
        .replaceAll('[/center]', '</center>')

        .replaceAll('[br]', '<BR>')
        .replaceAll('[hr]', '<HR>')

        .replaceAll('[b]', '<B>')
        .replaceAll('[/b]', '</B>')
        .replaceAll('[i]', '<I>')
        .replaceAll('[/i]', '</I>')
        .replaceAll('[u]', '<U>')
        .replaceAll('[/u]', '</U>')

        .replaceAll('[time]', getTimeString())
        .replaceAll('[date]', getDateString())
        .replaceAll('[sign]', '<span class="sig">John Doe</span>')

        .replaceAll('[large]', '<span class="large-text">')
        .replaceAll('[/large]', '</span>')
        .replaceAll('[small]', '<span class="small-text">')
        .replaceAll('[/small]', '</span>')

        .replaceAll('[field]', '<span class="paper_field"></span>')
        .replaceAll('[h1]', '<H1>')
        .replaceAll('[/h1]', '</H1>')
        .replaceAll('[h2]', '<H2>')
        .replaceAll('[/h2]', '</H2>')
        .replaceAll('[h3]', '<H3>')
        .replaceAll('[/h3]', '</H3>')

        .replaceAll('[list]', '<ul>')
        .replaceAll('[/list]', '</ul>')
        .replaceAll('[*]', '<li>')

        .replaceAll('[table]', '<table border=1 cellspacing=0 cellpadding=3 style="border: 1px solid black;">')
        .replaceAll('[/table]', '</td></tr></table>')
        .replaceAll('[grid]', '<table>')
        .replaceAll('[/grid]', '</td></tr></table>')
        .replaceAll('[row]', '</td><tr>')
        .replaceAll('[cell]', '<td>')

        .replaceAll('[ntlogo]', '<img src = ./img/ntlogo.png>')
        .replaceAll('[bluelogo]', '<img src = ./img/bluentlogo.png>')
        .replaceAll('[solcrest]', '<img src = ./img/sollogo.png>')
        .replaceAll('[iccgseal]', '<img src = ./img/terralogo.png>')
        .replaceAll('[logo]', '<img src = ./img/torchltd.png>')
        .replaceAll('[eclogo]', '<img src = ./img/eclogo.png>')
        .replaceAll('[fleetlogo]', '<img src = ./img/fleetlogo.png>')
        .replaceAll('[daislogo]', '<img src = ./img/daislogo.png>')
        .replaceAll('[xynlogo]', '<img src = ./img/xynlogo.png>')
        .replaceAll('[sfplogo]', '<img src = ./img/sfplogo.png>')
        .replaceAll('[uscm]', '<img src = ./img/uscmlogo.png>')
        .replaceAll('[wy]', '<img src = ./img/wylogo.png>')

        .replaceAll('[editorbr]', '')
    );

    str += '<span class="output-end"></span>';

    return str;
}

function getDateString() {
    var date = new Date();
    var yyyy = date.getFullYear() + yearmod;
    var mm = date.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    var dd = date.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    return yyyy + '-' + mm + '-' + dd;
}

function getYear() {
    return new Date().getFullYear() + yearmod;
}

function getTimeString() {
    var date = new Date();
    var hh = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var mm = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hh + ":" + mm;
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  alert('Document saved as ' + filename);
}

function addBlock(type) {
    if (type === 'list') {
        addAtSelectionStart('[list][*]');
        addAtSelectionEnd('[/list]');

    } else if (type === 'table') {
        addAtSelectionStart('[table][row][cell]');
        addAtSelectionEnd('[/table]');

    } else {
        addAtSelectionStart('[' + type + ']');
        if (!isSelfClosingBlock(type)) {
            addAtSelectionEnd('[/' + type + ']');
        }
    }

    run();

    function isSelfClosingBlock(type) {
        return type === 'time' || type === 'date';
    }

    function addAtSelectionStart(txtToAdd) {
        var txt = $('#input');
        var selectionStart = txt.prop('selectionStart');
        var selectionEnd = txt.prop('selectionEnd');
        var textAreaTxt = txt.val();
        txt.val(textAreaTxt.substring(0, selectionStart) + txtToAdd + textAreaTxt.substring(selectionStart));
        setSelectionRange(selectionStart + txtToAdd.length, selectionEnd + txtToAdd.length);
    }

    function addAtSelectionEnd(txtToAdd) {
        var txt = $('#input');
        var selectionStart = txt.prop('selectionStart');
        var selectionEnd = txt.prop('selectionEnd');
        var textAreaTxt = txt.val();
        txt.val(textAreaTxt.substring(0, selectionEnd) + txtToAdd + textAreaTxt.substring(selectionEnd));
        setSelectionRange(selectionStart, selectionEnd);
    }

    function setSelectionRange(selectionStart, selectionEnd) {
        var input = $('#input')[0];
        input.focus();
        if (input.setSelectionRange) {
            input.setSelectionRange(selectionStart, selectionEnd);

        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();

        } else {
            console.warn('Could not setCaretToPos, unsupported browser!');
        }
    }
}

function checkFieldCount() {
    var fieldCount = $('span.paper_field').length;
    var fieldWarningShown = $('#warning').is(':visible');

    var showFieldWarning = (fieldCount > 50);

    if (showFieldWarning) {
        showWarning('Your document has <b>' + fieldCount + '</b> fields. Only <b>50</b> fields are allowed. You may need to remove fields or format for multiple pages.');
    }
    else if (fieldWarningShown) {
        hideWarning();
    }
}

function showWarning(html) {
    $('#warningText').html(html);
    $('#wrapper').css('height', 'calc(100vh - 9em)');
    $('#warning').show();
}

function hideWarning() {
    $('#warningText').html('');
    $('#wrapper').css('height', 'calc(100vh - 7em)');
    $('#warning').hide();
}
