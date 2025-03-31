import { IProduct, IOrder, FormErrors } from "../types";
import { Model } from "./base/Model";


export interface CatalogChangeEvent {
    catalog: ProductItem[];
}

export type IProductItem = IProduct & { selected: boolean };

export class ProductItem extends Model<IProductItem> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    _selected: boolean;


    set selected(value: boolean) {
        this._selected = value;
    }

    get selected() {
        return this._selected;
    }
}

export interface IBasketItem {
    id: string
    title: string
    price: number
}


export interface IAppState {
    catalog: ProductItem[],
    basket: IBasketItem[],
    preview: string | null,
    order: IOrder | null,
}

export class AppState extends Model<IAppState> {
    protected _basket: IBasketItem[] = [];
    protected _catalog: ProductItem[];;
    protected _preview: string | null;
    protected _order: IOrder = {
        email: '',
        phone: '',
        address: '',
        payment: '',
        total: 0,
        items: []
    }
    protected _formErrors: FormErrors = {};


    get catalog() {
        return this._catalog;
    }

    get order() {
        return this._order;
    }


    setOrderItems() {
        this._order.items = this._basket.map(item => item.id);
    }


    setCatalog(items: IProduct[]) {
        this._catalog = items.map(item => new ProductItem({ ...item, selected: false }, this.events))
        this.emitChanges('card:render', { catalog: this._catalog });
    }

    setBasket(data: IBasketItem | []) {
        if ("id" in data && "title" in data && "price" in data) {
            const itemIndex = this._basket.findIndex(basketItem => basketItem.id === data.id);
            if (itemIndex >= 0) {
                this._basket.splice(itemIndex, 1);
            } else {
                this._basket.push(data);

            }
        } else {
            this._basket = data;

        }

        this.setOrderField('total', this._basket.reduce((acc, basketItem) => acc + basketItem.price, 0))

    }

    setPreview(item: IProduct) {
        this.emitChanges('preview:render', item);
    }

    isSelected(data: { id: string, value: boolean }) {
        const catalogItem = this.catalog.find(item => item.id === data.id);
        catalogItem.selected = data.value;
    }

    getBasketItems() {
        return this._basket;
    }

    clearOrder(keys: (keyof IOrder)[] = ["items", 'address', 'email', 'payment', 'phone', 'total']) {
        keys.forEach(key => {
            if (key === "items") {
                this._order[key] = [];
            } else if (key === "total") {
                this._order[key] == 0
            } else {
                this._order[key] = '';
            }
        })
    }

    setOrderField<T extends keyof IOrder>(field: T, value: IOrder[T]) {
        if (field === "items" && Array.isArray(this._order[field])) {
            (this._order[field] as string[]).push(...value as string[]);
        } else if (typeof value === "number") {
            this._order[field] = value;
        } else {
            this._order[field] = value;


            if (this.validateOrder()) {
                this.emitChanges('order:ready', this._order);

            }

            if (this.validateContacts()) {
                this.emitChanges('contacts:ready', this._order);
            }

        }


    }


    validateOrder() {
        const errors: typeof this._formErrors = {};
        if (!this._order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }

        if (!this._order.address) {
            errors.address = 'Необходимо указать адрес доставки';
        }

        this._formErrors = errors;
        this.emitChanges('orderFormErrors:change', this._formErrors);
        return Object.keys(errors).length === 0;
    }


    validateContacts() {
        const errors: typeof this._formErrors = {};
        if (!this._order.email) {
            errors.email = 'Необходимо указать email';
        }

        if (!this._order.phone) {
            errors.phone = 'Необходимо указать номер телефона';
        }

        this._formErrors = errors;
        this.emitChanges('contactsFormErrors:change', this._formErrors);
        return Object.keys(errors).length === 0;
    }


}