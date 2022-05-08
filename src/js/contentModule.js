export class Content {
  constructor(content = { textTitle: 'Title', textDescription: 'Text' }) {
    const { textTitle, textDescription } = content;

    this.title = document.createElement('h1');
    this.title.className = 'content-title';
    this.title.innerHTML = textTitle;

    this.text = document.createElement('p');
    this.text.className = 'content-desc';
    this.text.innerHTML = textDescription;
  }

  renderContent() {
    document.body.prepend(this.title);
    document.body.append(this.text);
  }
}
