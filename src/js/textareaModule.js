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

export function deleteSymbol(area, direction = 'prev') {
  let start = area.selectionStart;
  let end = area.selectionEnd;

  // Backspace case
  if (direction === 'prev') {
    if (start === end) {
      // no selectioned Text
      if (start < 1) return;
      area.setRangeText('', start - 1, end, "end");
    } else {
      // if selectioned Text
      area.setRangeText('', start, end, "end");
    }
  }

  if (direction === 'next') {
    if (start === end) {
      // no selectioned Text
      if (end >= area.value.length) return;
      area.setRangeText('', start, end + 1, "end");
    } else {
      // if selectioned Text
      area.setRangeText('', start, end, "end");
    }
  }

  area.focus();
}