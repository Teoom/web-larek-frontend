import { IEvents } from "./base/events";
import { Form } from "./common/Form";
import { IOrderForm } from "../types";
import { ensureElement } from "../utils/utils";


export class Order extends Form<IOrderForm> {
    protected _cash: HTMLButtonElement;
    protected _card: HTMLButtonElement;


    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._cash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this._card = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);


        this._cash.addEventListener('click', () => {
            this.toggleClass(this._cash, 'button_alt-active', true);
            this.toggleClass(this._card, 'button_alt-active', false);
            this.onInputChange('payment', 'cash');
        })

        this._card.addEventListener('click', () => {
            this.toggleClass(this._card, 'button_alt-active', true);
            this.toggleClass(this._cash, 'button_alt-active', false);
            this.onInputChange('payment', 'card');
        })
    }

    disabledButtons() {
        this.toggleClass(this._cash, 'button_alt-active', false);
        this.toggleClass(this._card, 'button_alt-active', false);
    }

}