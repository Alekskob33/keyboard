import '../style/style.sass';

import { textarea, renderTextarea } from './textareaModule.js';
import { KeyboardElem, keys, generateKeyboard, renderKeyboard } from './keyboardModule';

export let keyboard;

// RENDER
window.onload = () => {
  // textarea
  renderTextarea(document.body);

  // keyboard
  if (localStorage.getItem('keyboardLang')) {
    // read memory
    const lang = localStorage.getItem('keyboardLang');
    const el = generateKeyboard(keys, lang);
    keyboard = new KeyboardElem(el, lang);
    // console.log(keyboard);
  } else {
    // default lang
    const el = generateKeyboard(keys, 'en');
    keyboard = new KeyboardElem(el, 'en');
  }
  renderKeyboard(document.body, keyboard.el);
}


import './keyboardController';
import './keyboardView';

import './textareaController';
import './textareaView';