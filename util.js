/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var util = {
	cryp: {
		/**
		 * 64位编码程序
		 */
		enBase64: function(a) {
			for (var e, f, g, b = "", c = 0, d = a.length, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; d > c;) {
				if (e = 255 & a.charCodeAt(c++), c == d) {
					b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4), b += "==";
					break;
				}
				if (f = a.charCodeAt(c++), c == d) {
					b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4), b += h.charAt((15 & f) << 2),
						b += "=";
					break;
				}
				g = a.charCodeAt(c++), b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
					b += h.charAt((15 & f) << 2 | (192 & g) >> 6), b += h.charAt(63 & g);
			}
			return b;
		},
		/**
		 * 64位解码程序
		 */
		deBase64: function(a) {
			for (var b, c, d, e, f = 0, g = a.length, h = "", i = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]; g > f;) {
				do b = i[255 & a.charCodeAt(f++)]; while (g > f && -1 == b);
				if (-1 == b) break;
				do c = i[255 & a.charCodeAt(f++)]; while (g > f && -1 == c);
				if (-1 == c) break;
				h += String.fromCharCode(b << 2 | (48 & c) >> 4);
				do {
					if (d = 255 & a.charCodeAt(f++), 61 == d) return h;
					d = i[d];
				} while (g > f && -1 == d);
				if (-1 == d) break;
				h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
				do {
					if (e = 255 & a.charCodeAt(f++), 61 == e) return h;
					e = i[e];
				} while (g > f && -1 == e);
				if (-1 == e) break;
				h += String.fromCharCode((3 & d) << 6 | e);
			}
			return h;
		}
	}
}
module.exports = util