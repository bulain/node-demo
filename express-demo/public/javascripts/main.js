require.config({
  paths: {
    jquery: 'jquery.min',
    bootstrap: 'bootstrap.min'
  }
});
require(["jquery", "bootstrap", "public"], function() {});