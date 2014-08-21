
var buildNumber = steal.config('buildNumber');

function bustCache(loader) {
  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    var promise = Promise.resolve(loaderLocate.call(this, load));
    return promise.then(function(address) {
      return address + '?buildNumber=' + buildNumber;
    });
  };
}

bustCache(System);
