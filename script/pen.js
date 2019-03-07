/* jshint browser: true, jquery: true */
/* global ClipboardJS */
'use strict';
var yearmod = 288;

$(document).ready(function () {
    $('#year').html(getYear());

    $('#input').bind('input change', run);
    $('#save').click(function () { download('pencode.txt', $('#input').val()); });
    $('#load').click(function () { loadFile($('#template').val()); });

    $('.controlgroup').controlgroup();

    // get clipboard.js set up
    var clip = new ClipboardJS('#copy');
    clip.on('success', function () {
        alert('Copied to clipboard.');
    });
    clip.on('failure', function () {
        alert('Failed to copy.');
    });

    // keep #copy loaded with the path currently on #template
    $('#template').on('selectmenuchange', function () {
        var temp = $('#template').val();
        $('#copy').attr('data-clipboard-text','http://ps.ss13.net#' + temp.substring(0, temp.indexOf('.txt')));
    });

    setTimeout(function () {
        var hash = $(location).attr('hash');
        loadFile(hash ? hash.substring(1) + '.txt' : 'instructions.txt');
    }, 100);

});

function run() {
    $('#output').html(processText($('#input').val() + '[field]'));
    $('#output span.sig').css('font-style', 'italic');
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

        .replaceAll('[large]', '<big>')
        .replaceAll('[/large]', '</big>')
        .replaceAll('[small]', '<small>')
        .replaceAll('[/small]', '</small>')

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
        .replaceAll('[daislogo]', '<img src = ./img/daislogo.png>')
        .replaceAll('[xynlogo]', '<img src = ./img/xynlogo.png>')

        .replaceAll('[editorbr]', '')
    );

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

function loadFile(filename) {
    $.get('./templates/' + filename, function(data) {
        $('#input').val(data);
    });

    setTimeout(run, 100);
}