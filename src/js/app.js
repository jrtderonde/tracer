// tracer.io
// by j1md3rond3

document.addEventListener("DOMContentLoaded", function(event) {

  // ===
  // functions
  // ===

  // declare follower
  var follow = document.querySelector(".js-circle");
  var canvas = document.querySelector(".js-canvas");
  var heading = document.querySelector(".js-heading");
  var buttons = document.querySelectorAll(".js-button");

  // trace mouse
  function traceUser(event) {
    if (event !== null || traces !== underfined) {
      "use strict";
      // get mouse position
      var p = {x: event.clientX, y: event.clientY}
      // return values
      return p;
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

  function randomSpawn (element) {
    var w;
    var h;
    var r;

    // check if given
    if (element !== undefined) {
      w = window.innerWidth;
      h = window.innerHeight;

      // set left
      r = Math.floor(Math.random() * Math.floor(w));
      element.style.left = r + "px";
      console.log("left: " + r);

      // set top
      r = Math.floor(Math.random() * Math.floor(h));
      element.style.top = r + "px";
      console.log("top: " + r);
    }
  }

  // ===
  // init
  // ===

  randomSpawn(follow);

  // on mouse move
  window.addEventListener("mousemove", function(event) {

    // set object
    var traces = traceUser(event);

    // move the follower
    followTrace(traces, follow);
  });

  // on mouseover
  heading.addEventListener("mouseover", function() {

    // add class
    canvas.classList.add("canvas--animated");

    // check if available
    if (canvas.classList.contains("canvas--hidden-buttons")) {
      // remove to start animation
      canvas.classList.remove("canvas--hidden-buttons");

      // loop and show
      for (var i = 0; buttons.length > i; i++) {
        // show buttons
        console.log(buttons[i].classList);
        buttons[i].classList.remove("button--hidden");
      }
    }

  });

  // on mouseout
  heading.addEventListener("mouseout", function() {

    // remove class
    canvas.classList.remove("canvas--animated");

  });
});
