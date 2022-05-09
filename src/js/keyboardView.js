/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */

import {
  keys, generateKeyboard, highlightButton, isSpetialKey,
} from './keyboardModule';
import { keyboard } from './main';

function toggleUpperCaseSymbols() {
  [...keyboard.el.children].forEach((button) => {
    if (!isSpetialKey(button)) {
      button.classList.toggle('is-upperCase');
    }
  });
}

function togglePressed(el) {
  el.classList.toggle('is-pressed');
}

function resetKeyModificators() {
  const pressedModificators = keyboard.el.querySelectorAll('.is-pressed');

  [...pressedModificators].forEach((button) => {
    if (button.dataset.code !== 'CapsLock') {
      button.classList.remove('is-pressed');
    }
  });
}

function toggleKeyboardLanguage(event) {
  const el = event.target;
  const lg = event.detail.lang;

  keyboard.state.lang = lg;
  localStorage.setItem('keyboardLang', lg);

  const html = generateKeyboard(keys, lg, 'html');
  el.innerHTML = html;
}

document.addEventListener('upperCaseRequest', () => {
  toggleUpperCaseSymbols();
});

document.addEventListener('togglePressedRequest', (event) => {
  const { detail: { button } } = event;
  togglePressed(button);
});

document.addEventListener('resetModificatorRequest', () => {
  resetKeyModificators();
});

document.addEventListener('changeLanguageRequest', (event) => {
  toggleKeyboardLanguage(event);
});

document.addEventListener('highlightRequest', (event) => {
  highlightButton(event);
});
