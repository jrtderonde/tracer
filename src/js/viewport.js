class Viewport {

  constructor () {

    this.dom = {
      elements: document.querySelectorAll("[data-observe]"),
      container: document.querySelector(".js-panel")
    }
  }

  // if visible function
  ifVisible = () => {
    // inViewport(this.dom.elements, { container: this.dom.container } this.ifVisible(element);
  }

  // initialize
  initialize = () => {
  }
}

export default Viewport;
