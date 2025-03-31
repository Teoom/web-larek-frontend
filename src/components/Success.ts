import { bem, ensureElement } from "../utils/utils";
import { Component } from "./base/Component"

import { IActions } from "./Card";

interface ISuccess {
    price: string;
}

export class Success extends Component<ISuccess> {
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, blockName: string, actions: IActions) {
        super(container);

        this._price = ensureElement<HTMLElement>(bem(blockName, 'description').class, this.container);
        this._button = ensureElement<HTMLButtonElement>(bem(blockName, 'close').class, this.container);

        if(actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set price(value: string) {
        this.setText(this._price, `Списано ${value} синапсов`);
    }
}