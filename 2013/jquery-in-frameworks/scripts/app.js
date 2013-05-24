(function(window, undefined) {

  "use strict";

  var $slides, $lastTopLevel;

  // Duplicate the first slide and place the copy at the end of the show
  $slides = $(".slide");
  $lastTopLevel = $slides.last().parents().andSelf().filter(".slide").first();
  $lastTopLevel.after($slides.eq(0).clone());

  $.deck(".slide");

}(this));
