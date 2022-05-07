import { textarea, writeSymbol } from './textareaModule';

document.addEventListener('typeRequest', (event) => {
  // console.log(event);
  const symbol = event.detail.symbol;

  writeSymbol(
    textarea.el,
    symbol
  );
});