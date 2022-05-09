/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
import { keyboard, isSpetialKey } from './keyboardModule';

export class TextareaElem {
  constructor(className) {
    this.el = document.createElement('textarea');

    this.el.autofocus = true;
    this.el.className = className;
  }
}

export let textarea;

export function renderTextarea(wrapper) {
  textarea = new TextareaElem('textarea');

  wrapper.append(textarea.el);
}

export function writeSymbol(area, symbol) {
  area.setRangeText(symbol, area.selectionStart, area.selectionEnd, 'end');
  area.focus();
}

export function deleteSymbol(area, direction = 'prev') {
  const start = area.selectionStart;
  const end = area.selectionEnd;

  // Backspace case
  if (direction === 'prev') {
    if (start === end) {
      // no selectioned Text
      if (start < 1) return;
      area.setRangeText('', start - 1, end, 'end');
    } else {
      // if selectioned Text
      area.setRangeText('', start, end, 'end');
    }
  }

  if (direction === 'next') {
    if (start === end) {
      // no selectioned Text
      if (end >= area.value.length) return;
      area.setRangeText('', start, end + 1, 'end');
    } else {
      // if selectioned Text
      area.setRangeText('', start, end, 'end');
    }
  }

  area.focus();
}

export function isEqualLanguage(keyDownEvent, keys) {
  const { code } = keyDownEvent;
  const { key } = keyDownEvent;
  let isEqual = true;

  const keyboardButton = document.querySelector(`[data-code=${code}]`);

  if (keyboardButton && !isSpetialKey(keyboardButton)) {
    const vLang = keyboard.state.lang;
    isEqual = keys[vLang].find((item) => (item.baseKey === key || item.upperKey === key));
  }

  return isEqual;
}
