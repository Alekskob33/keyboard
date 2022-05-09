/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
import '../style/style.sass';

import { renderTextarea } from './textareaModule';
import {
  KeyboardElem, keys, generateKeyboard, renderKeyboard,
} from './keyboardModule';

import Content from './contentModule';

import './keyboardController';
import './keyboardView';

import './textareaController';
import './textareaView';

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
  } else {
    // default lang
    const el = generateKeyboard(keys, 'en');
    keyboard = new KeyboardElem(el, 'en');
  }
  renderKeyboard(document.body, keyboard.el);

  // Content
  const text = {
    textTitle: 'RSS Virtual Keyboard',
    textDescription: 'This keyboard was involved for OS Windows. <br>Use "Shift" + "Alt" to change language.',
  };
  const content = new Content(text);
  content.renderContent();
};
