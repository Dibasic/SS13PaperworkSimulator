$(document).ready(function() {
	$('#run').click(function() {
		//$('#output').text(processText($('#input').val()));
		$('#output').html(processText($('#input').val()));
	});
});

String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

function processText(str) {
	str = (str.replaceAll('\n', '<BR>')
	.replaceAll('[center]', '<center>')
	.replaceAll('[/center]', '</center>')
	.replaceAll('[br]', '<BR>')
	.replaceAll('[b]', '<B>')
	.replaceAll('[/b]', '</B>')
	.replaceAll('[i]', '<I>')
	.replaceAll('[/i]', '</I>')
	.replaceAll('[u]', '<U>')
	.replaceAll('[/u]', '</U>')
	.replaceAll('[time]', '[stationtime2text()]')
	.replaceAll('[date]', '[stationdate2text()]')
	.replaceAll('[large]', '<font size="4">')
	.replaceAll('[/large]', '</font>')
	.replaceAll('[field]', '<span class="paper_field"></span>')
	.replaceAll('[h1]', '<H1>')
	.replaceAll('[/h1]', '</H1>')
	.replaceAll('[h2]', '<H2>')
	.replaceAll('[/h2]', '</H2>')
	.replaceAll('[h3]', '<H3>')
	.replaceAll('[/h3]', '</H3>')
	.replaceAll('[*]', '<li>')
	.replaceAll('[hr]', '<HR>')
	.replaceAll('[small]', '<font size = "1">')
	.replaceAll('[/small]', '</font>')
	.replaceAll('[list]', '<ul>')
	.replaceAll('[/list]', '</ul>')
	.replaceAll('[table]', '<table border=1 cellspacing=0 cellpadding=3 style="border: 1px solid black;">')
	.replaceAll('[/table]', '</td></tr></table>')
	.replaceAll('[grid]', '<table>')
	.replaceAll('[/grid]', '</td></tr></table>')
	.replaceAll('[row]', '</td><tr>')
	.replaceAll('[cell]', '<td>')
	.replaceAll('[logo]', '<img src = ntlogo.png>')
	.replaceAll('[bluelogo]', '<img src = bluentlogo.png>')
	.replaceAll('[solcrest]', '<img src = sollogo.png>')
	.replaceAll('[terraseal]', '<img src = terralogo.png>')
	.replaceAll('[editorbr]', ''))
	return str;
}