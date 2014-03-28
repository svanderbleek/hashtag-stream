exports.contextPropertyRequirer = function(context, contextProperties, complete) {
  return function(property, value) {
    console.log('--REQUIRE--');
    context[property] = value;
    if(contextProperties.every(context.hasOwnProperty, context)) {
      complete(context);
    }
  }
}

exports.assignAndComplete = function(property, complete) {
  return function(value) {
    complete(property, value);
  }
}
