var Hapi = require('hapi');
var Swig = require('swig');

server = new Hapi.Server('localhost', 8080, {
  views: {
    path: __dirname + '/views',
    engines: {
      html: 'swig'
    }
  }
});

var enterHashtag = function(request, response) {
  response.view('hashtag');
}

server.route({
  method: 'GET',
  path: '/',
  handler: enterHashtag
});

var streamHashtag = function(request, response) {
  response.view('stream', request.query);
}

var hashtagValidate = {
  query: {
    hashtag: Hapi.types.string().required()
  }
}

server.route({
  method: 'GET',
  path: '/stream',
  config: {
    handler: streamHashtag,
    validate: hashtagValidate
  }
});

server.start();
