var Hapi = require('hapi'),
  tag = require('./handlers/tag'),
  stream = require('./handlers/stream');

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
    handler: stream.media,
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

server.start();
