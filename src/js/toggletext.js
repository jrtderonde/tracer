class ToggleText {

  constructor () {
    this.dom = {
      elements: document.querySelectorAll("[data-toggle-text]")
    }
  }

  swapText = (e) => {

    // set element
    const element = e.target;

    // fade away
    element.classList.add('toggletext--faded');

    // Wait untill animated
    setTimeout(() => {
      // Check if swapped class
      if (element.classList.contains('toggletext--swapped') === true) {
        // return button state
        element.innerHTML = element.dataset.toggleStart;
        // add class
        element.classList.remove('toggletext--swapped');
      } else {
        // add class
        element.classList.add('toggletext--swapped');
        // change button state
        element.innerHTML = element.dataset.toggleEnd;
      }

      // fade away
      element.classList.remove('toggletext--faded');
      
    }, 1000);
  }

  initialize = () => {

    // Initialize
    this.dom.elements.forEach((element) => {
      element.addEventListener("click", this.swapText);
    })

  }
}

export default ToggleText;
