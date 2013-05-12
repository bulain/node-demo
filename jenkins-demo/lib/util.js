var getUpstream = function(json) {
  var causes = [];
  for ( var i in json.actions) {
    var action = json.actions[i];

    if (!action.hasOwnProperty('causes')) {
      break;
    }

    for ( var j in action.causes) {
      var cause = action.causes[j];
      if (cause.hasOwnProperty('upstreamProject')) {
        causes.push(cause);
      }
    }
  }

  return causes.length ? causes[0] : null;
};
var getOption = function(option, cause) {
  return cause ? {
    prefix : option.prefix,
    project : cause.upstreamProject,
    build : cause.upstreamBuild
  } : null;
};

exports.getUpstream = getUpstream;
exports.getOption = getOption;
