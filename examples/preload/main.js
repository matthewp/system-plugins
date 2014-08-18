var can = require('can/can');
require('can/view/stache/stache');

var renderer = can.view('template');
var frag = renderer({
  showAnswer: function() {
    can.$('#best-framework').html(can.view('template2')());
  }
});
can.$('#main').html(frag);

System.import('images/canjs_logo_blue.png!preload');
