var getUpstreams = function(json) {
  
  var causes = json.actions.filter(function(action){
    return action.hasOwnProperty('causes');
  }).map(function(action){
    return action.causes.filter(function(cause){
      return cause.hasOwnProperty('upstreamProject');
    });
  }).reduce(function(curr, prev){
    return curr.concat(prev);
  }, []);

  return causes;
};
var getOption = function(option, cause) {
  return cause ? {
    prefix : option.prefix,
    project : cause.upstreamProject,
    build : cause.upstreamBuild
  } : null;
};

exports.getUpstreams = getUpstreams;
exports.getOption = getOption;
