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
