steal('can', './views/view.stache!',
      'can/view/stache', function(can, renderer) {
  can.$('#main').html(renderer());
});
