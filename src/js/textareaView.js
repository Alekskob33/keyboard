import { textarea, writeSymbol } from './textareaModule';

document.addEventListener('typeRequest', (event) => {
  // console.log(event);
  const symbol = event.detail.symbol;

  writeSymbol(
    textarea.el,
    symbol
  );
});

function moveCursor(direction = 'right') {
  let length = textarea.el.value.length;
  let start, end;

  switch (direction) {
    case 'right':
      start = textarea.el.selectionStart < length ? textarea.el.selectionStart + 1 : textarea.el.selectionStart;
      end = textarea.el.selectionStart < length ? textarea.el.selectionStart + 1 : textarea.el.selectionStart;
      textarea.el.setSelectionRange(start, end);
      break;
    case 'left':
      start = textarea.el.selectionStart > 0 ? textarea.el.selectionStart - 1 : textarea.el.selectionStart;
      end = start;
      // end = textarea.el.selectionStart > length ? textarea.el.selectionStart - 1 : textarea.el.selectionStart;
      textarea.el.setSelectionRange(start, end, 'backward');
      break;
  }
  textarea.el.focus();
}

document.addEventListener('arrowRequest', (event) => {
  const direction = event.detail.direction;
  moveCursor(direction);
});