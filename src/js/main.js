import '../style/style.sass';

import { textarea, renderTextarea } from './textareaModule.js';
import { keyboard, keys, generateKeyboard, renderKeyboard } from './keyboardModule';


window.onload = () => {
  // RENDER

  // textarea
  renderTextarea(document.body);

  // keyboard
  if (localStorage.getItem('keyboardLang')) {
    // read memory
    const lang = localStorage.getItem('keyboardLang');
    keyboard.state.lang = lang;
    keyboard.el = generateKeyboard(keys, lang);
  } else {
    // default lang
    keyboard.el = generateKeyboard(keys, 'en');
  }
  renderKeyboard(document.body, keyboard.el);
}


import './keyboardController';
import './keyboardView';

import './textareaController';
import './textareaView';