import { ICategory, IProduct } from "../types";
import { bem, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";


export interface IActions {
    onClick: (event: MouseEvent) => void;
}

export type ICard = {
    title: string,
    image: string,
    price: number | null,
    category: string,
    description: string
}


export class CardItem<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;


    constructor(container: HTMLElement, blockName: string, actions?: IActions) {
        super(container);
        this._category = ensureElement<HTMLElement>(bem(blockName, 'category').class, container);
        this._title = ensureElement<HTMLElement>(bem(blockName, 'title').class, container);
        this._image = ensureElement<HTMLImageElement>(bem(blockName, 'image').class, container);
        this._price = ensureElement<HTMLElement>(bem(blockName, 'price').class, container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }

    }

    set category(value: keyof typeof ICategory,) {
        this.setText(this._category, value);
        this.toggleClass(this._category, `card__category_${ICategory[value]}`, true);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title || 'image');
    }

    set price(value: number | null) {
        if (value) {
            this.setText(this._price, `${value} синапсов`);
        } else {
            this.setText(this._price, 'Бесценно');
        }
    }


}

interface IPreviewCard extends IProduct {
    isSelected: { value: boolean, price: number | null };
}

export class PreviewCard extends CardItem<IPreviewCard> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, blockName: string, actions: IActions) {
        super(container, blockName);

        this._description = ensureElement<HTMLElement>(bem(blockName, 'text').class, container);
        this._button = ensureElement<HTMLButtonElement>(bem(blockName, 'button').class, container);

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set description(value: string) {
        this.setText(this._description, value);
    }


    set isSelected(data: { value: boolean, price: number | null }) {

        if (!data.value && data.price) {
            this.setText(this._button, "Купить");
        } else if (data.value && data.price) {
            this.setText(this._button, "Убрать")
        } else {
            this.setText(this._button, "Данный товар недоступен");
            this.setDisabled(this._button, true);
        }

    }

}


interface IBasketItemView {
    index: string,
    title: string,
    price: string,
}

export class BasketItemView extends Component<IBasketItemView> {
    protected _index: HTMLElement
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement

    constructor(container: HTMLElement, blockName: string, actions: IActions) {
        super(container);

        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._title = ensureElement<HTMLElement>(bem(blockName, 'title').class, container);
        this._price = ensureElement<HTMLElement>(bem(blockName, 'price').class, container);
        this._button = ensureElement<HTMLButtonElement>(bem(blockName, 'button').class, container);

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }

    }

    set index(value: string) {
        this.setText(this._index, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: string) {
        this.setText(this._price, `${value} синапсов`);
    }

}

