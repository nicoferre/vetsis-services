var moment = require('moment');
var console = require('./logger');

function Utils() {

	console.info("New utils object");

	this.actualTime = function() {
		var time = moment().utc().valueOf();
	    return time;
	};
};

utils = new Utils();

module.exports = utils;
