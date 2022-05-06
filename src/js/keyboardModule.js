import { ru_Keys, en_Keys } from './keys.js';

export let keys = {
  'current': 'ru',
  'en': en_Keys,
  'ru': ru_Keys,
}

export function createKeyboard(keys, lang) {
  if (!keys) console.log('keys are not given');

  const keyboard = document.createElement('div');
  keyboard.className = 'v-keyboard';

  for (let key of keys[lang]) {
    const keyElem = document.createElement('div');

    keyElem.className = 'v-keyboard__key';
    keyElem.dataset.baseKey = key.baseKey ? key.baseKey : null;
    keyElem.dataset.upperKey = key.upperKey ? key.upperKey : null;
    keyElem.dataset.code = key.code ? key.code : null;

    if (key.upperKey === undefined) {
      console.log('is undefined -->>');
      console.log(typeof key.upperKey === 'string' && key.upperKey !== 'auto');
    }

    keyElem.innerHTML = `
      <span class="v-keyboard__key-upper">${(typeof key.upperKey === 'string' && key.upperKey !== 'auto') ? key.upperKey : ''}</span>
      ${key.baseKey ? key.baseKey : ''}
    `;
    // 
    keyboard.append(keyElem);
  }
  console.log(keyboard);
  return keyboard;
}

export function renderKeyboard(wrapper, keyboard) {
  wrapper.append(keyboard);
}