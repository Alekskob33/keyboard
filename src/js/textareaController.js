import { keyboard, keys } from './keyboardModule';
import { textarea, isEqualLanguage } from './textareaModule';

document.addEventListener('keydown', (ev) => {
  if (ev.target.closest('.textarea')) {

    if (!isEqualLanguage(ev, keys)) {
      // console.log('языки разные');
      const lang = keyboard.state.lang === 'ru' ? 'en' : 'ru';
      keyboard.el.dispatchEvent(new CustomEvent('changeLanguageRequest', { bubbles: true, detail: { lang: lang } }));
    }

    // ev.preventDefault();
  }
});