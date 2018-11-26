$(document).ready(function() {
    run();
    $('#input').bind('input change', run);

    $('#save').click(function() { download('pencode.txt', $('#input').val()) });
});

function run() {
    $('#output').html(processText($('#input').val() + '[field]'));
    $('#output span.startLarge').nextUntil('#output span.endLarge').addBack().css('font-size', '21');
    $('#output span.startSmall').nextUntil('#output span.endSmall').addBack().css('font-size', '11');
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
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('&', '&amp;')
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

        .replaceAll('[large]', '<span class="startLarge"></span><span>')
        .replaceAll('[/large]', '</span><span class="endLarge"></span>')
        .replaceAll('[small]', '<span class="startSmall"></span><span>')
        .replaceAll('[/small]', '</span><span class="endSmall"></span>')

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

        .replaceAll('[logo]', '<img src = ./img/ntlogo.png>')
        .replaceAll('[bluelogo]', '<img src = ./img/bluentlogo.png>')
        .replaceAll('[solcrest]', '<img src = ./img/sollogo.png>')
        .replaceAll('[terraseal]', '<img src = ./img/terralogo.png>')

        .replaceAll('[editorbr]', '')
    )

    return str;
}

function getDateString() {
    var date = new Date();
    var yyyy = date.getFullYear() + 544;
    var mm = date.getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    var dd = date.getDate();
    return yyyy + "-" + mm + "-" + dd;
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
}

function loadFile(filename) {
    $.get('./templates/' + filename, function(data) {
        $('#input').html(data);
    });
}