import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IPage {
    counter: number,
    gallery: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _wrapper: HTMLElement;
    protected _basket: HTMLButtonElement;
    protected _counter: HTMLElement;
    protected _gallery: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLButtonElement>('.header__basket');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._gallery = ensureElement<HTMLElement>('.gallery');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }

    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
    }
}