var async = require('../util/async'),
  instagram = require('../api/instagram'),
  twitter = require('../api/twitter');

var timeSort = function(media1, media2) {
  return media1.time - media2.time;
}

var mergeByTime = function(images, statuses) {
  return images.concat(statuses).sort(timeSort);
}

var responseRenderer = function(response) {
  return function(context) {
    context.media = mergeByTime(context.images, context.statuses);
    console.log(context);
    response.view('stream', context);
  }
}

var buildResponse = function(tag, complete) {
  var statusesComplete = async.assignAndComplete('statuses', complete)
  var imagesComplete = async.assignAndComplete('images', complete)
  twitter.fetchStatuses(tag, statusesComplete);
  instagram.fetchImages(tag, imagesComplete);
}

exports.media = function(request, response) {
  var tag = request.query.tag;
  var context = {tag: tag};
  var contextProperties = ['images', 'statuses'];
  var renderer = responseRenderer(response);
  var complete = async.contextPropertyRequirer(context, contextProperties, renderer);
  buildResponse(tag, complete);
}
