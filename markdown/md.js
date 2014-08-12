var marked = require('marked');

var escMap = {
  '\n': "\\n",
  '\r': "\\r",
  '\u2028': "\\u2028",
  '\u2029': "\\u2029"
};

var esc = function (string) {
  return ('' + string)
    .replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
      if ("'\"\\".indexOf(character) >= 0) {
        return "\\" + character;
      } else {
        return escMap[character];
      }
    });
};

exports.translate = function(load) {
  var html = esc(marked(load.source));
  var js = 'var stache = require("can/view/stache/stache");\n' +
    'module.exports = stache("' + html + '");';
  load.source = js;
};
