/**
 * Created by hughdai on 17/5/11.
 */
var schedule = require('node-schedule'),
	spawn = require('child_process').spawn,
	sendMail = require('./mail').sendMail,
	url = process.argv[2],
	isMobile = false,
	imgPath = '';
console.log(process.argv)
function capture() {
	var process = spawn('phantomjs', ['capture.js', url]);
	process.stdout.setEncoding('utf8');
	process.stdout.on('data', function (data) {
		imgPath = data.replace('\n', '');
		console.log('spawnSTDOUT:' + JSON.stringify(data));
	});
	process.stderr.on('data', function (data) {
		console.log('stderr ' + data);
	});
	process.on('close', function (code) {
		if (code == 1) {
			console.log('child process异常');
		}
	});
	process.on('exit', function (code) {
		console.log('child process exited with code ' + code);
	});
}

var j = schedule.scheduleJob('*/1 * * * *', function () {
	capture();
	setTimeout(function () {
		sendMail(imgPath);
	}, 10000)
});
