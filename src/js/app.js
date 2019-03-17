// tracer.io
// by j1md3rond3

document.addEventListener("DOMContentLoaded", function(event) {

  // ===
  // functions
  // ===

  // declare follower
  let follow = document.querySelector(".js-circle");
  let canvas = document.querySelector(".js-canvas");
  let heading = document.querySelector(".js-heading");
  let buttons = document.querySelectorAll(".js-button");

  // trace mouse
  function traceUser(event) {
    if (event !== null || traces !== underfined) {
      "use strict";
      // get mouse position
      let p = {x: event.clientX, y: event.clientY}
      // return values
      return p;
    }
  }

  // follow trace
  function followTrace(traces, element) {
    if (traces !== undefined && element != undefined) {

      // check if added
      if (element.style.opacity !== 1) {
        // set opacity to 1
        element.style.opacity = 1;
      }

      // set width and height
      let w = element.offsetWidth;
      let h = element.offsetHeight;

      // calculate position
      let pos = {
        x: (traces.x - (w/2)) + "px",
        y: (traces.y - (h/2)) + "px"
      };

      // place
      requestAnimationFrame(function(){
        element.style.top = pos.y;
        element.style.left = pos.x;
      });
    }
  }

  function randomSpawn (element) {
    let w;
    let h;
    let r;

    // check if given
    if (element !== undefined) {
      w = window.innerWidth;
      h = window.innerHeight;

      console.log("----------");
      console.log("Random spawn");
      console.log("-----")

      // set left
      r = Math.floor(Math.random() * Math.floor(w));
      element.style.left = r + "px";
      console.log("left: " + r);

      // set top
      r = Math.floor(Math.random() * Math.floor(h));
      element.style.top = r + "px";
      console.log("top: " + r);

      console.log("----------");
    }
  }

  // ===
  // init
  // ===

  // spawn follower on random point
  randomSpawn(follow);

  // on mouse move
  window.addEventListener("mousemove", function(event) {
    // set object
    let traces = traceUser(event);
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
      for (let i = 0; buttons.length > i; i++) {
        let button = buttons[i];

        setTimeout(function () {
            (function(button) {
              // remove class
              button.classList.remove("button--hidden");
            })(button);
        }, i * 250);
      }
    }
  });

  // on mouseout
  heading.addEventListener("mouseout", function() {
    // remove class
    canvas.classList.remove("canvas--animated");
  });
});
