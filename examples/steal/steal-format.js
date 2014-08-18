var stealRegEx = /(?:^\s*|[}{\(\);,\n\?\&]\s*)steal\s*\(\s*((?:"[^"]+"\s*,|'[^']+'\s*,\s*)*)/;

function addSteal(loader) {

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    return Promise.resolve(loaderTranslate.call(this, load)).then(function(source) {
      if(stealRegEx.test(load.source)) {
        load.metadata.format = 'steal';
      }
      return source;
    });
  };

  var instantiateObject;
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

      instantiateObject = {
        deps: deps,
        execute: function(require, exports, module) {
          var values = [];
          for(var i = 0; i < deps.length; i++) {
            values.push(require(deps[i]));
          }

          return factory.apply(loader.global, values);
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
      
      load.metadata.deps = instantiateObject.deps;
      load.metadata.execute = instantiateObject.execute;
    }

    return loaderInstantiate.call(this, load);
  };

}

addSteal(System);
