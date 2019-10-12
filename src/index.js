// styles
import './index.scss';
import TweenMax from 'gsap';
import TweenLite from 'gsap';

// autograph
window.console.log(
  "%cjimderonde",
  "color: #f3f3f4; font-size: 14px; margin: 15px 0; padding: 30px 60px; background-color: #111112; font-family: 'Nitti Eindhoven'; text-transform: uppercase"
)

// import classes
import App from './js/app';
import Viewport from './js/viewport';
import ToggleText from './js/toggletext';
const toggletext = new ToggleText();
const viewport = new Viewport();
const app = new App();

// initialize
app.initialize();
viewport.initialize();
toggletext.initialize();
