import '../style/style.sass';

import { renderTextarea } from './textareaModule.js';
import { keys, createKeyboard, renderKeyboard } from './keyboardModule';


window.onload = () => {
  renderTextarea(document.body);
  renderKeyboard(document.body, createKeyboard(keys, 'en'));
}
