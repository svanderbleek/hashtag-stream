var Twitter = require('twitter'),
  config = require('nconf');

config.env();

var twitter = new Twitter({
  consumer_key: config.get('TWITTER_KEY'),
  consumer_secret: config.get('TWITTER_SECRET')
});

MILLISECONDS_IN_SECOND = 1000;
var timestamp = function(timeString) {
  var date = new Date(timeString);
  return date.getTime() / MILLISECONDS_IN_SECOND;
}

var extractStatus = function(status) {
  return {
    text: status['text'],
    time: timestamp(status['created_at'])
  }
}

var extractStatuses = function(response) {
  return response['statuses'].map(extractStatus);
}

exports.fetchStatuses = function(tag, complete) {
  console.log('--FETCH--');
  console.log(tag);
  twitter.search('#' + tag, function(response) {
    console.log('--TWITTER--');
    var statuses = extractStatuses(response);
    complete(statuses);
  });
}
