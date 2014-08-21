var stealRegEx = /(?:^\s*|[}{\(\);,\n\?\&]\s*)steal\s*\(\s*((?:"[^"]+"\s*,|'[^']+'\s*,\s*)*)/;
function addSteal(loader) {

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    return loaderTranslate.call(this, load).then(function() {
      var source = load.source;

      if(stealRegEx.test(source)) {
        var format = load.metadata.format;
        load.metadata.format = 'steal';
      }

      return source;
    });
  };


var instantiateResult;

function createSteal(loader) {
  loader.global.module = undefined;
  loader.global.exports = undefined;

  function steal() {
    var deps = [];
    var factory;

    for(var i = 0; i < arguments.length; i++) {
      if(typeof arguments[i] === 'string') {
        deps.push(arguments[i]);
      } else {
        factory = arguments[i];
      }
    }

    instantiateResult = {
      deps: deps,
      execute: function(require, exports, moduleName) {
        var values = [];
        for(var i = 0; i < deps.length; i++) {
          values.push(require(deps[i]));
        }

        var result = factory.apply(loader.global, values);
        return result;
      }
    };

  }

  loader.global.steal = steal;
}


  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {

    if(load.metadata.format === 'steal') {

      createSteal(loader);

      loader.__exec(load);

      load.metadata.deps = instantiateResult.deps;
      load.metadata.execute = instantiateResult.execute;
    }

    return loaderInstantiate.call(this, load);
  };

}

addSteal(System);
