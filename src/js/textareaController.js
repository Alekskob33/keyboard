/* eslint-disable import/no-cycle */
import { keyboard, keys } from './keyboardModule';
import { isEqualLanguage } from './textareaModule';

document.addEventListener('keydown', (ev) => {
  if (ev.target.closest('.textarea')) {
    if (!isEqualLanguage(ev, keys)) {
      const lang = keyboard.state.lang === 'ru' ? 'en' : 'ru';
      keyboard.el.dispatchEvent(new CustomEvent('changeLanguageRequest', { bubbles: true, detail: { lang } }));
    }
  }
  ev.preventDefault();
  keyboard.el.dispatchEvent(new CustomEvent('highlightRequest', { bubbles: true, detail: { keyCode: ev.code } }));
});
