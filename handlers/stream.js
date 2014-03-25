var config = require('nconf'),
  instagram = require('instagram-node-lib');

config.env();

instagram.set('client_id', config.get('INSTAGRAM_ID'));
instagram.set('client_secret', config.get('INSTAGRAM_SECRET'));

var extractImage = function(media) {
  return media.images.low_resolution.url;
}

var extractImages = function(data) {
  return data.map(extractImage);
}

var imageRenderer = function(response, context) {
  return function(data) {
    var images = extractImages(data);
    context.images = images;
    console.log(context);
    response.view('stream', context);
  }
}

var pullImages = function(tag, complete) {
  instagram.tags.recent({
    name: tag,
    complete: complete
  })
}

var buildResponse = function(tag, response) {
  var context = {tag: tag};
  renderImages = imageRenderer(response, context);
  pullImages(tag, renderImages);
}

exports.media = function(request, response) {
  var tag = request.query.tag;
  buildResponse(tag, response);
  return false;
}
