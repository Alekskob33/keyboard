/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import { textarea, writeSymbol, deleteSymbol } from './textareaModule';

document.addEventListener('typeRequest', (event) => {
  const { symbol } = event.detail;

  writeSymbol(
    textarea.el,
    symbol,
  );
});

document.addEventListener('deleteRequest', (event) => {
  const { direction } = event.detail;
  deleteSymbol(textarea.el, direction);
});

function moveCursor(direction = 'right') {
  const { el: { value: { length } } } = textarea;
  let start;
  let end;

  switch (direction) {
    case 'right':
      start = textarea.el.selectionStart < length ? textarea.el.selectionStart + 1 : textarea.el.selectionStart;
      end = textarea.el.selectionStart < length ? textarea.el.selectionStart + 1 : textarea.el.selectionStart;
      textarea.el.setSelectionRange(start, end);
      break;
    case 'left':
      start = textarea.el.selectionStart > 0 ? textarea.el.selectionStart - 1 : textarea.el.selectionStart;
      end = start;
      textarea.el.setSelectionRange(start, end, 'backward');
      break;
    default:
      break;
  }
  textarea.el.focus();
}

document.addEventListener('arrowRequest', (event) => {
  const { direction } = event.detail;
  moveCursor(direction);
});
