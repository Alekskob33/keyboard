export const textarea = {
  el: '',
};

export function renderTextarea(wrapper) {
  const elem = document.createElement('textarea');
  elem.className = 'textarea';
  textarea.el = elem;

  wrapper.append(elem);
}

export function writeSymbol(area, symbol) {
  area.setRangeText(symbol, area.selectionStart, area.selectionEnd, "end");
  area.focus();
}