import { ru_Keys, en_Keys } from './keys.js';

export let keyboard = {
  el: document.querySelector('.v-keyboard') ? document.querySelector('.v-keyboard') : null, // при инициализации обновляем элемент
  state: {
    CapsLock: false,
    ControlLeft: false,
    ControlRight: false,
    ShiftLeft: false,
    ShiftRight: false,
    AltLeft: false,
    AltRight: false,
    lang: 'en',
  }
}

export let keys = {
  // 'current': 'ru',
  'en': en_Keys,
  'ru': ru_Keys,
}

export function generateKeyboard(keys, lang, result = 'node') {
  if (!keys) console.log('keys are not given');

  const keyboard = document.createElement('div');
  keyboard.className = 'v-keyboard';

  for (let key of keys[lang]) {
    const keyElem = document.createElement('div');

    keyElem.className = 'v-keyboard__key';
    if (key.baseKey) keyElem.dataset.baseKey = key.baseKey;
    if (key.upperKey) keyElem.dataset.upperKey = key.upperKey;
    if (key.code) keyElem.dataset.code = key.code;

    keyElem.innerHTML = `
      <span class="v-keyboard__key-upper">${(typeof key.upperKey === 'string' && key.upperKey !== 'auto') ? key.upperKey : ''}</span>
      <span class="v-keyboard__key-base">${key.baseKey ? key.baseKey : ''}</span>
    `;
    // 
    keyboard.append(keyElem);
  }

  if (result === 'node') {
    return keyboard;
  } else if (result === 'html') {
    return keyboard.innerHTML;
  }
}

export function renderKeyboard(wrapper, keyboard) {
  wrapper.append(keyboard);
}

// Work Tasks

// 1. read =========================

document.addEventListener('keyClick', (event) => {
  if (!event.target.closest('.v-keyboard')) return;
  clickButtonHandler(event);
});

function getButtonData({ target }) {
  const button = target.closest('[data-code]') ? target.closest('[data-code]') : null;
  const buttonData = {
    el: button ? button : null,
    key: button.dataset.baseKey ? button.dataset.baseKey : null,
    upperKey: button.dataset.upperKey ? button.dataset.upperKey : null,
    code: button.dataset.code ? button.dataset.code : null
  };
  return buttonData;
}

export function isSpetialKey(button) {
  if (!button.dataset.upperKey) {
    return true;
  }
  return false;
}

function clickButtonHandler(event) {
  const buttonData = getButtonData(event);

  // press not-symbol keys
  if (isSpetialKey(buttonData.el)) {
    keyboardStateHandler(buttonData);
  }
  // press symbol-key
  if (!isSpetialKey(buttonData.el)) {
    // request Event
    event.target.dispatchEvent(new CustomEvent(
      'typeRequest', {
      bubbles: true, detail: {
        symbol: getButtonSymbol(buttonData.el),
      }
    }));
    resetModificatorsMemory(buttonData.el);
    buttonData.el.dispatchEvent(new CustomEvent('resetModificatorRequest', { bubbles: true }));
  }
}

function resetModificatorsMemory(el, mode = 'typing') {
  const states = ["ControlLeft", "ControlRight", "ShiftLeft", "ShiftRight", "AltLeft", "AltRight"];

  if (mode === 'typing') {
    if (keyboard.state.ShiftLeft || keyboard.state.ShiftRight) {
      el.dispatchEvent(new CustomEvent('upperCaseRequest', { bubbles: true }));
    }
  }

  if (mode === 'force') {
    keyboard.state.CapsLock = false;
  }

  states.forEach(prop => {
    keyboard.state[prop] = false;
  });
};

function isChangeLanguageCombination(buttonData) {
  const codeAlt = buttonData.code === 'AltLeft' || buttonData.code === 'AltRight';
  const codeShift = buttonData.code === 'ShiftLeft' || buttonData.code === 'ShiftRight';

  const stateAlt = keyboard.state.AltLeft || keyboard.state.AltRight;
  const stateShift = keyboard.state.ShiftLeft || keyboard.state.ShiftRight;

  return ((codeAlt && stateShift) || (stateAlt && codeShift));
}

function changeLanguage() {
  keyboard.state.lang = keyboard.state.lang === 'ru' ? 'en' : 'ru'; // toggle
  const lang = keyboard.state.lang;

  resetModificatorsMemory(keyboard, 'force');
  keyboard.el.dispatchEvent(new CustomEvent('resetModificatorRequest', { bubbles: true }));

  keyboard.el.dispatchEvent(new CustomEvent('changeLanguageRequest', { bubbles: true, detail: { lang: lang } }));
  // console.log(keyboard.state);
}

// 2. reaction ====================

function keyboardStateHandler(buttonData) {
  const { el, code } = buttonData;

  if (isChangeLanguageCombination(buttonData)) {
    changeLanguage(buttonData);

    // resetModificatorsMemory(buttonData.el);
    // buttonData.el.dispatchEvent(new CustomEvent('resetModificatorRequest', { bubbles: true }));
    return;
  }

  // console.log(code);
  switch (code) {
    case 'ShiftLeft':
    case 'ShiftRight':
    case 'CapsLock':
      el.dispatchEvent(new CustomEvent('upperCaseRequest', { bubbles: true }));
    // no break (continue)
    case 'AltLeft':
    case 'AltRight':
    case 'ControlLeft':
    case 'ControlRight':
      toggleModificatorState(buttonData);
      // send Request
      buttonData.el.dispatchEvent(new CustomEvent(
        'togglePressedRequest', { bubbles: true, detail: { button: buttonData.el } })
      );
      break;
    case 'Tab':
      buttonData.el.dispatchEvent(new CustomEvent('typeRequest', { bubbles: true, detail: { symbol: '\t' } }));
      break;
    case 'Space':
      buttonData.el.dispatchEvent(new CustomEvent('typeRequest', { bubbles: true, detail: { symbol: ' ' } }));
      break;
    case 'Backspace':
      buttonData.el.dispatchEvent(new CustomEvent('deleteRequest', { bubbles: true, detail: { direction: 'prev' } }));
      break;
    case 'Delete':
      buttonData.el.dispatchEvent(new CustomEvent('deleteRequest', { bubbles: true, detail: { direction: 'next' } }));
      break;
    case 'ArrowLeft':
      buttonData.el.dispatchEvent(new CustomEvent('arrowRequest', { bubbles: true, detail: { direction: 'left' } }));
      break;
    case 'ArrowRight':
      buttonData.el.dispatchEvent(new CustomEvent('arrowRequest', { bubbles: true, detail: { direction: 'right' } }));
      break;
    // case 'ArrowDown':
    // case 'ArrowTop':
    case 'Enter':
      buttonData.el.dispatchEvent(new CustomEvent('typeRequest', { bubbles: true, detail: { symbol: '\n' } }));
      break;
  }
}

function getButtonSymbol(button) {
  if (keyboard.state.ShiftLeft || keyboard.state.ShiftRight) {
    if (!keyboard.state.CapsLock) {
      return button.dataset.upperKey;
    }
  } else if (keyboard.state.CapsLock) {
    return button.dataset.upperKey;
  }
  return button.dataset.baseKey;
}

// 3. рабочие операции
function toggleModificatorState(buttonData) {
  keyboard.state[buttonData.code] = keyboard.state[buttonData.code] ? false : true; // toggle State
}

function toggleLanguage() {
  const lang = keyboard.lang === 'ru' ? 'en' : 'ru';
  const html = generateKeyboard(keys, lang, 'html');

  keyboard.el.innerHTML = html;
}

export function highlightButton(ev) {
  try {
    const keyboardButton = document.querySelector(`[data-code=${ev.detail.keyCode}]`);
    if (!keyboardButton) throw Error('Attention! This button wasn\'t found in RSS Virtual-Keyboard');

    keyboardButton.dispatchEvent(new Event('click', { bubbles: true }));

    keyboardButton.classList.add('is-active');
    setTimeout(() => {
      keyboardButton.classList.remove('is-active');
    }, 100);
  }
  catch (err) {
    console.log(err.message);
  }
}