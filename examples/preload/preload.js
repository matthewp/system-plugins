
exports.fetch = function(load) {
  var address = load.address;
  var img = load.metadata.img = new Image();
  
  return new Promise(function(resolve, reject) {
    img.onload = function() {
      resolve('');
    };
    img.onerror = reject;
    img.src = address;
  });
};
