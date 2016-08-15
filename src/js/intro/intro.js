/**
 * @requires ../vendors/jquery.js
 * @requires ../vendors/moment.js
 */

var update = $('.update');
var date = update.text();
var replace = moment(date).fromNow();
$('.days').text(replace);
