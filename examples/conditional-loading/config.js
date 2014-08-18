System.trace = true;

System.paths['raf'] = 'bower_components/requestAnimationFrame/app/requestAnimationFrame.js';

System.meta['raf'] = {
  format: 'global'
};

function conditionallyLoad(loader) {
  var loaderNormalize = loader.normalize;
  loader.normalize = function(name, parentName, parentAddress) {
    var index = name.indexOf('?');
    if(index >= 0) {
      var feature = name.substr(index + 1);
      name = name.substr(0, name.length - feature.length - 1);

      if(!window[feature]) {
        return loaderNormalize.call(this, name, parentName, parentAddress);
      }
      return '@empty';
    }

    return loaderNormalize.apply(this, arguments);
  };
}

conditionallyLoad(System);
