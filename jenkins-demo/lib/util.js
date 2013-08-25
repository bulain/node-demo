/**
 * Get upstream causes from json.
 * @param {Object} json The json content.
 * @return {Array} The upstream causes.
 */
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

/**
 * Merge cause into option.
 * @param {Object} option The option content.
 * @param {String} option.prefix The prefix string.
 * @param {Object} cause The cause content.
 * @param {String} cause.upstreamProject The upstream project name.
 * @param {String} cause.upstreamBuild The upstream build number.
 * @return {Object} The merged option.
 */
var getOption = function(option, cause) {
  return cause ? {
    prefix : option.prefix,
    project : cause.upstreamProject,
    build : cause.upstreamBuild
  } : null;
};

exports.getUpstreams = getUpstreams;
exports.getOption = getOption;
