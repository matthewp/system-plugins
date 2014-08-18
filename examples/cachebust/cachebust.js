var buildNumber = window.BUILDNUMBER;

function cacheBust(loader) {
  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    return loaderLocate.call(this, load).then(function(address) {
      return address + '?buildNumber=' + buildNumber;
    });
  };
}

cacheBust(System);
