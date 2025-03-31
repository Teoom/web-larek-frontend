import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IActions } from "../Card";

interface IBasketView {
    list: HTMLElement[] | null;
    total: number;
    selected: string[];
    isActive: boolean
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement = null;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IActions) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', container);
        this._total = ensureElement<HTMLElement>('.basket__price', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', container);

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }


    }

    set total(value: number) {
        this.setText(this._total, `${value} синапсов`);
    }

    set list(items: HTMLElement[] | null) {
        if (Array.isArray(items)) {

            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren();
        }


    }

    set isActive(value: boolean) {
        this.setDisabled(this._button, value);
    }
}