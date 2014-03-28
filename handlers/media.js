var async = require('../util/async'),
  instagram = require('../api/instagram'),
  twitter = require('../api/twitter');

var timeSort = function(media1, media2) {
  return media1.time - media2.time;
}

var mergeByTime = function(images, statuses) {
  return images.concat(statuses).sort(timeSort);
}

var fetchMedia = function(tag, complete) {
  var statusesComplete = async.assignAndComplete('statuses', complete)
  var imagesComplete = async.assignAndComplete('images', complete)
  twitter.fetchStatuses(tag, statusesComplete);
  instagram.fetchImages(tag, imagesComplete);
}

var buildResponse = function(tag, renderer) {
  console.log('--BUILD--');
  var context = {tag: tag};
  var contextProperties = ['images', 'statuses'];
  var complete = async.contextPropertyRequirer(context, contextProperties, renderer);
  fetchMedia(tag, complete);
}

var responseRenderer = function(view, response) {
  return function(context) {
    console.log('--RENDER--');
    context.media = mergeByTime(context.images, context.statuses);
    response.view(view, context);
  }
}

exports.stream = function(request, response) {
  console.log('--STREAM--');
  var tag = request.query.tag;
  var renderer = responseRenderer('stream', response);
  buildResponse(tag, renderer);
}

exports.slideshow = function(request, response) {
  console.log('--SLIDESHOW--');
  var tag = request.query.tag;
  var renderer = responseRenderer('slideshow', response);
  buildResponse(tag, renderer);
}
