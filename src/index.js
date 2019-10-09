// styles
import './index.scss';
import TweenMax from 'gsap';

// autograph
window.console.log(
  "%cjimderonde",
  "color: #f3f3f4; font-size: 14px; margin: 15px 0; padding: 30px 60px; background-color: #111112; font-family: 'Nitti Eindhoven'; text-transform: uppercase"
)

// import classes
import App from './js/app';
const app = new App();
import Viewport from './js/viewport';
const viewport = new Viewport();

// initialize
app.initialize();
viewport.initialize();
