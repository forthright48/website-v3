const $ = require('jquery');
const moment = require('moment');

const update = $('.update');
const date = update.text();
const replace = moment(date).fromNow();
$('.days').text(replace);
