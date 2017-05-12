/**
 * Created by hughdai on 17/5/11.
 */
var util = require('./util'),
	page = require('webpage').create(),
	system = require('system'),
	t, address;
if (system.args.length === 1) {
	console.log('Usage: phantom.js');
	phantom.exit(1);
}
address = system.args[1];
// 模拟mobile UA

page.settings.userAgent = 'Phantomjs iPhone Phantomjs';
page.viewportSize = {width: 414, height: 1600};

page.onError = function (msg, trace) {
	var msgStack = ['ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function (t) {
			msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
		});
	}
	console.error(msgStack.join('\n'));
	console.error('#JavaScriptExecution:True');
};

page.open(address, function (status) {
	if (status !== 'success') {
		console.log('FAIL to load the address');
	} else {
		t = new Date().format('yyyyMMddhhmmssS');
		var imgPath = './captures/' + t + '.jpeg';
		page.render(imgPath, {type: 'jpeg', quality: '100'});
		console.log(imgPath)
		phantom.exit();
	}
});