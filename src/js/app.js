 /*jslint devel: true */
/*global alert, confirm, console, prompt */

// tracer.io
// by j1md3rond3
// ---
// ---

// declare follower
var follow = document.querySelector(".js-circle");

// trace mouse
function traceUser(event) {
  if (event !== null || traces !== underfined) {
    "use strict";
    // get mouse position
    var p = {x: event.clientX, y: event.clientY}
    // return values
    return p;
  } else {
    console.log("event returned null...");
  }
}

// follow trace
function followTrace(traces, element) {
  if (traces !== undefined && element != undefined) {

    if (element.style.opacity !== 1) {
      // set opacity to 1
      element.style.opacity = 1;
    }

    // set width and height
    var w = element.offsetWidth;
    var h = element.offsetHeight;

    // calculate position
    var pos = {
      x: (traces.x - (w/2)) + "px",
      y: (traces.y - (h/2)) + "px"
    };

    // place
    element.style.top = pos.y;
    element.style.left = pos.x;
  }
}

// on mouse move
window.addEventListener("mousemove", function(event) {

  // set object
  var traces = traceUser(event);

  // move the follower
  followTrace(traces, follow);
});
