steal.config({
  paths: {
    'can/*': 'bower_components/canjs/*.js',
    'jquery/jquery': 'bower_components/jquery/dist/jquery.js'
  },
  ext: {
    stache: 'stache-system'
  }
});

System.buildConfig = {
  map: {
    'can/util/util': 'can/util/domless/domless'
  }
};
