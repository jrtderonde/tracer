class Viewport {

  // Constructor of class
  constructor () {
    this.dom = {
      observed: document.querySelectorAll("[data-observe]"),
      container: document.querySelector(".js-panel"),
      body: document.querySelector("body"),
      arrow: document.querySelector(".js-arrow")
    }
  }

  // if visible function
  ifVisible = (elements) => {
    // Loop
    elements.forEach((element) => {
      this.triggerElement(element, this.inView(element, 150))
    });
  }

  // check if element is in view
  inView = (element, offset) => {

    // get window height
    let windowHeight    = window.innerHeight;
    let scrollY         = window.scrollY || window.pageYOffset;
    let scrollPosition  = scrollY + windowHeight;
    let elementPosition = element.getBoundingClientRect().top + scrollY + element.clientHeight;

    // In view
    if (scrollPosition > (elementPosition - offset)) {
      return true;
    } else {
      return false;
    }
  }

  // Log
  triggerElement = (element, view) => {

    // is element in view?
    if (view === false) {
      // element is in view, add class to element
      element.classList.remove('is--viewable');
    } else {
      // element is in view, add class to element
      element.classList.add('is--viewable');
    }

  }

  checkBottom = (element) => {

    // find parent
    let parent = element.dataset.parent;
    parent = document.querySelector(parent);

    // get window height
    let containerHeight = parent.clientHeight;
    let hasScrolled     = this.dom.body.scrollTop;
    let windowHeight    = window.innerHeight;

    // if bottom
    if (containerHeight === (hasScrolled + windowHeight)) {
      this.dom.arrow.classList.remove('is--visible');
    } else {
      this.dom.arrow.classList.add('is--visible');
    }

  }

  // initialize
  initialize = () => {

    // Check once
    const elements = document.querySelectorAll("[data-observe]");
    this.ifVisible(elements);

    // On scroll
    this.dom.body.addEventListener("scroll", () => {

      const elements = document.querySelectorAll("[data-observe]");
      this.ifVisible(elements);
      this.checkBottom(this.dom.arrow);

    }, false);

  }
}

export default Viewport;
