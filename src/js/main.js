import '../style/style.sass';

import { textarea, renderTextarea } from './textareaModule.js';
import { keyboard, keys, generateKeyboard, renderKeyboard } from './keyboardModule';


window.onload = () => {
  // RENDER

  // textarea
  renderTextarea(document.body);
  // keyboard
  keyboard.el = generateKeyboard(keys, 'en');
  renderKeyboard(document.body, keyboard.el);
}


import './keyboardController';
import './keyboardView';

import './textareaView';