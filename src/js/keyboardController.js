const keyClick = new CustomEvent('keyClick', { bubbles: true });

document.addEventListener('click', ({ target }) => {
  const button = target.closest('.v-keyboard div[data-code]');
  if (!button) return;

  button.dispatchEvent(keyClick);
});
