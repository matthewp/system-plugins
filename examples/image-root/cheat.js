steal('can/view/stache/system.js', function(stacheSystem) {
  var tripleSlashExp = /img src="\/\/\/(.+)"/;

  var isBuilding = typeof window === 'undefined';

  function removeDotSegments(input) {
    var output = [];
    input.replace(/^(\.\.?(\/|$))+/, '')
      .replace(/\/(\.(\/|$))+/g, '/')
      .replace(/\/\.\.$/, '/../')
      .replace(/\/?[^\/]*/g, function (p) {
        if (p === '/..') {
          output.pop();
        } else {
          output.push(p);
        }
      });
    return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
  }

  var joinRoot = function(address, url) {
    if(isBuilding) {
      return '/' + removeDotSegments(url);
    }

    return steal.joinURIs(address, url);
  };

  var stacheTranslate = stacheSystem.translate;
  return {
    translate: function(load) {
      var address = load.address;
      var source = load.source;
      load.source = source.replace(tripleSlashExp, function(whole, part) {
        return 'img src="' + joinRoot(address, part) + '"';
      });
      return stacheTranslate.call(this, load)
      ;
    }
  };
});
