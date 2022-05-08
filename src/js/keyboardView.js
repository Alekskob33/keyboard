import { keyboard, keys, generateKeyboard, renderKeyboard, highlightButton, isSpetialKey } from './keyboardModule';

function toggleUpperCaseSymbols() {
  for (let button of keyboard.el.children) {
    if (!isSpetialKey(button)) {
      button.classList.toggle('is-upperCase');
    }
  }
}

function togglePressed(el) {
  el.classList.toggle('is-pressed');
}

function resetKeyModificators() {
  const pressedModificators = keyboard.el.querySelectorAll('.is-pressed');

  for (let button of pressedModificators) {
    if (button.dataset.code === 'CapsLock') continue;
    button.classList.remove('is-pressed');
  }
};

function toggleKeyboardLanguage(event) {
  const el = event.target;
  const lg = event.detail.lang;

  keyboard.state.lang = lg;
  localStorage.setItem('keyboardLang', lg);

  const html = generateKeyboard(keys, lg, 'html');
  el.innerHTML = html;
}

document.addEventListener('upperCaseRequest', (event) => {
  toggleUpperCaseSymbols();
});

document.addEventListener('togglePressedRequest', (event) => {
  const button = event.detail.button;
  togglePressed(button);
});

document.addEventListener('resetModificatorRequest', (event) => {
  resetKeyModificators();
});

document.addEventListener('changeLanguageRequest', (event) => {
  toggleKeyboardLanguage(event);
});

document.addEventListener('highlightRequest', (event) => {
  highlightButton(event);
});
