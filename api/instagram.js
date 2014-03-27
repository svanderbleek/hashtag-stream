var instagram = require('instagram-node-lib'),
  config = require('nconf');

config.env();

instagram.set('client_id', config.get('INSTAGRAM_ID'));
instagram.set('client_secret', config.get('INSTAGRAM_SECRET'));

var extractImage = function(instagram) {
  return {
    image: instagram.images.standard_resolution.url,
    time: instagram.created_time
  }
}

var extractImages = function(data) {
  return data.map(extractImage);
}

exports.fetchImages = function(tag, complete) {
  instagram.tags.recent({
    name: tag,
    complete: function(data) {
      var images = extractImages(data);
      complete(images);
    }
  });
}
