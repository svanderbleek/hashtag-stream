var config = require('nconf'),
  instagram = require('instagram-node-lib'),
  Twitter = require('twitter');

config.env();

instagram.set('client_id', config.get('INSTAGRAM_ID'));
instagram.set('client_secret', config.get('INSTAGRAM_SECRET'));

twitter = new Twitter({
  consumer_key: config.get('TWITTER_KEY'),
  consumer_secret: config.get('TWITTER_SECRET')
});

var extractImage = function(media) {
  return media.images.low_resolution.url;
}

var extractImages = function(data) {
  return data.map(extractImage);
}

var pullImages = function(tag, complete) {
  instagram.tags.recent({
    name: tag,
    complete: addToContextAndComplete('images', extractImages, complete)
  })
}

var extractStatus = function(status) {
  return status['text'];
}

var extractStatuses = function(data) {
  return data['statuses'].map(extractStatus);
}

var pullStatuses = function(tag, complete) {
  twitter.search('#' + tag, addToContextAndComplete('statuses', extractStatuses, complete));
}

var addToContextAndComplete = function(property, valueFunction, complete) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var value = valueFunction.apply(this, args);
    complete(property, value);
  }
}

var responseRenderer = function(response, context) {
  return function(property, value) {
    context[property] = value;
    if(context.statuses && context.images) {
      response.view('stream', context);
    }
  }
}

var buildResponse = function(tag, response) {
  var context = {tag: tag};
  var renderer = responseRenderer(response, context);
  pullImages(tag, renderer);
  pullStatuses(tag, renderer);
}

exports.media = function(request, response) {
  var tag = request.query.tag;
  buildResponse(tag, response);
}
