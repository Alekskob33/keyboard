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
  area.value += symbol;
}