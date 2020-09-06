
export class Section {
    constructor( { initialCards, renderer }, containerSelector ) {
        this._items = initialCards;
        this._renderer = renderer;
        this._container = containerSelector
    }

    renderItems() {
        this._items.forEach( (item) => {
            this._renderer(item);
        });
    }
    
    addItem(element) {
        this._container.append(element);
    }
}