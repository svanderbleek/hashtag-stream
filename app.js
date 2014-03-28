var Hapi = require('hapi'),
  tag = require('./handlers/tag'),
  media = require('./handlers/media');

server = new Hapi.Server('localhost', 8080, {
  views: {
    path: __dirname + '/views',
    engines: {
      html: 'swig'
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: tag.form
});

server.route({
  method: 'GET',
  path: '/stream',
  config: {
    handler: media.stream,
    validate: tag.validate
  }
});

server.route({
  method: 'GET',
  path: '/slideshow',
  config: {
    handler: media.slideshow,
    validate: tag.validate
  }
});

server.route({
  method: 'GET',
  path: '/style.css',
  handler: {
    file: './css/style.css'
  }
});

server.route({
  method: 'GET',
  path: '/slideshow.js',
  handler: {
    file: './ui/slideshow.js'
  }
});

server.start();
