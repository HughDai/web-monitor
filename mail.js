var util = require('./util'),
	nodemailer = require('nodemailer');

exports.sendMail = function (imgPath) {
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'youremail',
			pass: 'yourpassword'
		}
	});

// setup email data with unicode symbols
	var mailOptions = {
		from: '"hughdai"<cynicism2011@gmail.com>',// sender address
		to: 'xu.dai@ucarinc.com,daixu@zuche.com',// list of receivers
		subject: 'Phantomjs monitor', // Subject line
		html: 'Embedded image: <img src="cid:unique@nodemailer.com"/>', // html body
		attachments: {
			filename: 'screenshot.jpeg',
			path: imgPath,
			cid: 'unique@nodemailer.com'
		}
	};
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
}

