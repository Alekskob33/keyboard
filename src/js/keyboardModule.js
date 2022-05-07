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
  'current': 'ru',
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

function isSpetialKey(button) {
  if (!button.dataset.upperKey) {
    return true;
  }
  return false;
}

function clickButtonHandler(event) {
  const buttonData = getButtonData(event);

  // press not-symbol keys
  if (isSpetialKey(buttonData.el)) {
    changeKeyboardState(buttonData);
  }
  // press symbol-key
  if (!isSpetialKey(buttonData.el)) {
    writeSymbol(
      document.querySelector('.textarea'),
      getButtonSymbol(buttonData.el)
    );

    resetKeyModificators();
  }
}

function writeSymbol(area, symbol) {
  area.value += symbol;
}

function resetKeyModificators() {
  const pressedModeButtons = keyboard.el.querySelectorAll('.is-pressed');
  for (let button of pressedModeButtons) {
    if (button.dataset.code === 'CapsLock') continue;

    if (button.dataset.code === 'ShiftLeft' || button.dataset.code === 'ShiftRight') {
      toggleUpperCaseSymbols();
    }

    keyboard.state[button.dataset.code] = false;
    button.classList.remove('is-pressed');
  }
};

// 2. reaction ====================

function changeKeyboardState(buttonData) {
  const { el, code } = buttonData;
  // console.log(code);
  switch (code) {
    case 'ShiftLeft':
    case 'ShiftRight':
    case 'CapsLock':
      toggleUpperCaseSymbols();
      toggleModificatorState(buttonData);
      break;
    case 'AltLeft':
    case 'AltRight':
    case 'ControlLeft':
    case 'ControlRight':
      // обновить состояние кнопки и клавиатуры (нажато - не нажато)
      toggleModificatorState(buttonData);
      break;
    case 'Tab':
      // insertTab();
      break;
    case 'Space':
      // insertSpace();
      break;
    case 'Backspace':
      deleteSymbol('prev');
      break;
    case 'Delete':
      deleteSymbol('next');
      break;
    case 'Enter':
      // addNewLine();
      break;
  }
}

function getButtonSymbol(button) {
  if (keyboard.state.CapsLock || keyboard.state.ShiftLeft || keyboard.state.ShiftRight) {
    return button.dataset.upperKey;
  }
  return button.dataset.baseKey;
}

// 3. рабочие операции
function toggleUpperCaseSymbols() {
  // change DOM-nodes State: [upper/lower]-case for symbols
  for (let button of keyboard.el.children) {
    if (!isSpetialKey(button)) {
      button.classList.toggle('is-upperCase');
    }
  }
}

function toggleModificatorState(buttonData) {
  keyboard.state[buttonData.code] = keyboard.state[buttonData.code] ? false : true; // toggle State
  buttonData.el.classList.toggle('is-pressed');

  // for (let pressedKey of keyboard.querySelectorAll('is-pressed')) {
  //   if (pressedKey.dataset)
  // }
}

function toggleLanguage() {
  const lang = keyboard.lang === 'ru' ? 'en' : 'ru';
  const html = generateKeyboard(keys, lang, 'html');

  keyboard.el.innerHTML = html;
}

function deleteSymbol(witch) {
  // const textContent = textarea.textContent;
  // if (witch === 'prev') {
  //   textarea.textContent = textContent.slice(0, textContent.length - 1)
  // }
}

function addNewLine() {
  textarea.textContent += '\n';
}