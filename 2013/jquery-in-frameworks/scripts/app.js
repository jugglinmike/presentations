(function(window, undefined) {

  "use strict";

  // Remove leading and trailing white space from code blocks. This allows the
  // markup to be slightly more readable without introducing empty lines in the
  // code blocks themselves.
  $("code").html(function(idx, html) {
    return $.trim(html);
  });

  $.deck(".slide");

}(this));
