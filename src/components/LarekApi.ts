import { IProduct, IOrder, IOrderResult } from "../types";
import { Api, ApiListResponse } from "./base/api"

export interface ILakerApi {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderProdutcs: (order: IOrder) => Promise<IOrderResult>
}


export class LarekApi extends Api implements ILakerApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({ ...item, image: this.cdn + item.image }))
        );

    }

    getProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((item: IProduct) => ({ ...item, image: this.cdn + item.image }))
    }

    orderProdutcs(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        )
    }
}
