class App {

  // Constructor
  constructor () {

    // DOM
    this.dom = {
      follow: document.querySelector(".js-circle"),
      circles: document.querySelectorAll(".js-circle circle"),
      canvas: document.querySelector(".js-canvas"),
      gradient: document.querySelector(".js-gradient"),
      heading: document.querySelector(".js-heading"),
      buttons: document.querySelectorAll(".js-button"),
      toggle: document.querySelectorAll(".js-toggle"),
      panel: document.querySelector(".js-panel"),
      init: document.querySelector(".js-init"),
      favicon: document.querySelector(".js-favicon")
    }

    // favicons
    this.favicons = {
      src: {
        default: "src/img/favicon.png",
        active: "src/img/favicon__active.png",
      }
    }

    // Static varibales
    this.static = {
      waitTime: .25,
      timing: 125
    }

    // timer
    this.timer = null;
  }

  /*
    ---
    Functions
    ---
  */

  // spawn random element
  randomSpawn = (element) => {

    let w;
    let h;
    let r;

    // check if given
    if (element !== undefined) {

      // set variables
      w = window.innerWidth;
      h = window.innerHeight;

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

  // trace mouse
  traceUser = (event) => {
    if (event !== null || traces !== underfined) {
      "use strict";
      // get mouse position
      let p = {x: event.clientX, y: event.clientY}
      // return values
      return p;
    }
  }

  // add buttons
  addButtons = (canvas, buttons, waitTime, timing) => {

    // remove to start animation
    canvas.classList.remove("canvas--hidden-buttons");

    // start counter
    let i = 0;

    // loop and show
    buttons.forEach((button) => {

      setTimeout(() => {

        ((button) => {

          // remove class
          button.classList.remove("button--hidden");

          // check and animate
          if (button.dataset.reset == "left") {
            window.requestAnimationFrame(() => {
              TweenLite.to(button, .5, {left: 0, ease: Power3.easeInOut});
            });
          } else if (button.dataset.reset == "right") {
            window.requestAnimationFrame(() => {
              TweenLite.to(button, .5, {right: 0, ease: Power3.easeInOut});
            });
          }

        }) (button);

      }, i * (timing));

      // increment i
      i++;

    });
  }

  // animate canvas
  animateCanvas = (direction, gradient, follow, heading, canvas) => {

    // declare
    let top;
    let bg;
    let color;
    let scale;

    // Set vars for sitiation
    if (direction === "up") {

      // add class
      canvas.classList.add("canvas--animated");

      // vars
      top = 0;
      bg = "#e6e5e5";
      color = "#cccccc";
      scale = 2;

    } else {

      // add class
      canvas.classList.remove("canvas--animated");

      // vars
      top = "100%";
      bg = "#000000";
      color = "#333";
      scale = 1;
    }

    // animate
    window.requestAnimationFrame(() => {
      TweenLite.to(gradient, 1, {top: top, ease: Expo.easeInOut});

      this.dom.circles.forEach((c) => {
        TweenLite.to(c, .25, {fill: bg, ease: Power3.easeInOut});
      })

      TweenLite.to(heading, .1, {color: color});
      TweenLite.to(follow, .5, {scale: scale, ease: Power3.easeInOut});
    });
  }

  // follow the mouse
  followTrace = (traces, element, panel) => {

    // if elements is available
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

  // toggle the favicon
  faviconToggle = (target, active, src) => {

    let source;

    if (active === true) {
      source = src.active;
    } else {
      source = src.default;
    }

    target.setAttribute("href", source);
  }

  // init
  initialize = () => {

    // spawn follower on random point
    this.randomSpawn(this.dom.follow);

    // Set favicon
    this.faviconToggle(this.dom.favicon, false, this.favicons.src);

    // init the body
    this.dom.init.classList.add("is-active");

    // on mouse move
    window.addEventListener("mousemove", (event) => {

      // set object
      let traces = this.traceUser(event);

      // move the follower
      this.followTrace(traces, this.dom.follow, this.dom.panel);

    });

    // second event listener
    this.dom.heading.addEventListener("mouseover", () => {

      // Animate
      this.faviconToggle(this.dom.favicon, true, this.favicons.src);
      this.animateCanvas("up", this.dom.gradient, this.dom.follow, this.dom.heading, this.dom.canvas);

      // set timer
      this.timer = setTimeout(() => {
        // check if available
        if (this.dom.canvas.classList.contains("canvas--hidden-buttons")) {
          this.addButtons(this.dom.canvas, this.dom.buttons, this.static.waitTime, this.static.timing);
        }
        // add trigger to canvas
        this.dom.init.classList.add("is--initialized");
      }, (12 * this.static.timing)); // Wait for a second

      if (this.dom.init.classList.contains("is--initialized") === false) {
        // Add class to animate follow
        this.dom.follow.classList.add("is--animating");
      }

    });

    // second event listener
    this.dom.heading.addEventListener("mouseleave", () => {

      // Animate
      this.faviconToggle(this.dom.favicon, false, this.favicons.src);
      this.animateCanvas("down", this.dom.gradient, this.dom.follow, this.dom.heading, this.dom.canvas);

      // clear timeout
      clearTimeout(this.timer);

      // Add class to animate follow
      this.dom.follow.classList.remove("is--animating");

    });

    // on every button
    this.dom.buttons.forEach((button) => {

      // on mouse in
      button.addEventListener("mouseover", () => {
        window.requestAnimationFrame(() => {
          TweenLite.to(this.dom.follow, .5, {scale: 1.5, ease: Power3.easeInOut});
        });
      });

      // on mouse out
      button.addEventListener("mouseout", () => {
        window.requestAnimationFrame(() => {
          TweenLite.to(this.dom.follow, .5, {scale: 1, ease: Power3.easeInOut});
        });
      });

    });

    // for each toggle button
    this.dom.toggle.forEach((btn) => {

      // click event
      btn.addEventListener("click", () => {

        if (this.dom.panel.classList.contains("panel--open") === true) {

          // remove js class
          this.dom.panel.classList.remove("panel--open");

          // close
          window.requestAnimationFrame(() => {
            TweenLite.to(this.dom.panel, 1.25, {left: "100%", ease: Expo.easeInOut});
          });

        } else {

          // set js class
          this.dom.panel.classList.add("panel--open");

          // close
          window.requestAnimationFrame(() => {
            TweenLite.to(this.dom.panel, 1.25, {left: "0%", ease: Expo.easeInOut});
          });

        }

      });
    });
  }
}

// export the class
export default App;
