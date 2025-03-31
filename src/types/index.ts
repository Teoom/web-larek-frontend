
export enum ICategory {
    "софт-скил" = "soft",
    "другое" = "other",
    "дополнительное" = "additional",
    "кнопка" = "button",
    "хард-скилл" = "hard"
}

export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: keyof typeof ICategory,
    price: number | null
}


export interface IContactsForm {
    email: string,
    phone: string
}

export interface IOrderForm {
    payment: string,
    address: string
}

export interface IOrder extends IOrderForm, IContactsForm{
    items: string[],
    total: number
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;



