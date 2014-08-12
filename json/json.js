
exports.translate = function(load) {
  load.source = 'module.exports = ' + load.source + ';';
};
