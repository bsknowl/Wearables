var moment = require('moment');
//20140110T000000Z
//var curTimeMinusFive = moment.utc().format('YYYYMMDDThhmmssZ');
var curTimeMinusFive = moment.utc().format('YYYYMMDDThhmmss');
//var curTimeMinusFive = moment.utc().format('%Y%m%d%H%M%SZ');

console.info('Current Time:\t' + curTimeMinusFive) ;
