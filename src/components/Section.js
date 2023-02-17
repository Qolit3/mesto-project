export default class Section {
  constructor(data, selector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._container = selector;
  }

  renderAll() {
    
    this._items.forEach((item) => {
      this._element = this._renderer(item);
      this.addItem(this._element)
    });
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}