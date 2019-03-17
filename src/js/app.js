// tracer.io
// by j1md3rond3

// ===
// functions
// ===

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
function followTrace(traces, element, panel) {
  if (traces !== undefined && element != undefined && panel.classList.contains("panel--open") === false) {

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
    window.requestAnimationFrame(function(){
      TweenLite.to(element, .15, {left: pos.x}, Power3);
      TweenLite.to(element, .15, {top: pos.y}, Power3);
    });
  }
}

// random spawn
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
    console.log("-- left: " + r);

    // set top
    r = Math.floor(Math.random() * Math.floor(h));
    element.style.top = r + "px";
    console.log("-- top: " + r);
  }
}

// when document is ready
document.addEventListener("DOMContentLoaded", function(event) {

  // declare variables
  let follow   = document.querySelector(".js-circle");
  let canvas   = document.querySelector(".js-canvas");
  let gradient = document.querySelector(".js-gradient");
  let heading  = document.querySelector(".js-heading");
  let buttons  = document.querySelectorAll(".js-button");
  let toggle   = document.querySelectorAll(".js-toggle");
  let panel    = document.querySelector(".js-panel");

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
    followTrace(traces, follow, panel);
  });

  // on mouseover
  heading.addEventListener("mouseover", function() {

    // add class
    canvas.classList.add("canvas--animated");

    // animate
    window.requestAnimationFrame(function() {
      TweenLite.to(gradient, 1, {top: 0, ease: Expo.easeInOut});
      TweenLite.to(follow, .25, {scale: 2, ease: Power3.easeInOut});
      TweenLite.to(follow, .25, {backgroundColor: "#e6e5e5", ease: Power3.easeInOut});
    });

    // check if available
    if (canvas.classList.contains("canvas--hidden-buttons")) {
      // remove to start animation
      canvas.classList.remove("canvas--hidden-buttons");

      console.log("----------");
      console.log("Displaying buttons");
      console.log("----------");

      // loop and show
      for (let i = 0; buttons.length > i; i++) {
        let button = buttons[i];

        setTimeout(function () {
          (function(button) {
            // remove class
            let reset = button.getAttribute("data-reset");
            console.log("-- Resetting: " + reset);
            button.classList.remove("button--hidden");
            console.log("-- Displaying: " + button.title);

            // check and animate
            if (reset == "left") {
              window.requestAnimationFrame(function() {
                TweenLite.to(button, .5, {left: 0, ease: Power3.easeInOut});
              })
            } else if (reset == "right") {
              window.requestAnimationFrame(function() {
                TweenLite.to(button, .5, {right: 0, ease: Power3.easeInOut});
              });
            }

          })(button);
        }, i * 250);
      }
    }
  });

  // on every button
  for (let i = 0; buttons.length > i; i++) {
    let button = buttons[i];

    // on mouse in
    button.addEventListener("mouseover", function() {
      window.requestAnimationFrame(function() {
        TweenLite.to(follow, .5, {scale: 1.5, ease: Power3.easeInOut});
      });
    });

    // on mouse out
    button.addEventListener("mouseout", function() {
      window.requestAnimationFrame(function() {
        TweenLite.to(follow, .5, {scale: 1, ease: Power3.easeInOut});
      });
    });
  }

  // for each toggle button
  for (let i = 0; i < toggle.length; i++) {
    let btn = toggle[i];

    // click event
    btn.addEventListener("click", function() {
      console.log("----------");
      if (panel.classList.contains("panel--open") === true) {
        // close
        console.log("Closed panel");
        // remove js class
        panel.classList.remove("panel--open");
        // close
        window.requestAnimationFrame(function() {
          TweenLite.to(panel, 1, {left: "100%", ease: Expo.easeInOut});
        });
      } else {
        // open
        console.log("Opened panel");
        // set js class
        panel.classList.add("panel--open");
        // close
        window.requestAnimationFrame(function() {
          TweenLite.to(panel, 1, {left: "0%", ease: Expo.easeInOut});
        });
      }
    });
  }

  // on mouseout
  heading.addEventListener("mouseout", function() {
    // remove class
    canvas.classList.remove("canvas--animated");

    // animate
    window.requestAnimationFrame(function() {
      TweenLite.to(gradient, 1, {top: '100%', ease: Expo.easeInOut});
      TweenLite.to(follow, .25, {scale: 1, ease: Power3.easeInOut});
      TweenLite.to(follow, .15, {backgroundColor: "#000000", ease: Power3.easeInOut}); // #000 - #e6e5e5
    });
  });
});
