var Hapi = require('hapi');

exports.form = function(request, response) {
  response.view('tag');
}

exports.validate = {
  query: {
    tag: Hapi.types.string().required()
  }
}
