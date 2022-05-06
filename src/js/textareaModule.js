export function renderTextarea(wrapper) {
  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';

  wrapper.append(textarea);
}