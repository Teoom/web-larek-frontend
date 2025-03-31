import './scss/styles.scss';
import { LarekApi } from './components/LarekApi';
import { CDN_URL, API_URL } from './utils/constants';
import { ICategory, IProduct, IOrderForm, IContactsForm, IOrderResult } from './types';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppState, CatalogChangeEvent, IProductItem } from './components/AppData';
import { CardItem, PreviewCard, BasketItemView } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';


const cardProductTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTempalte = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), { onClick: () => { events.emit('formContacts:open') } });
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTempalte), events);


events.on<CatalogChangeEvent>('card:render', ({ catalog }) => {
    page.gallery = catalog.map(item => {
        const card = new CardItem<IProduct>(cloneTemplate(cardProductTemplate), 'card', {
            onClick: () => {
                events.emit('card:select', item)
            }
        });

        return card.render({
            category: item.category as keyof typeof ICategory,
            title: item.title,
            image: item.image,
            price: item.price,
        })
    })
})


events.on<IProduct>('preview:render', (item) => {
    const showCard = (item: IProduct) => {
        const card = new PreviewCard(cloneTemplate(cardPreviewTemplate), 'card', {
            onClick: () => {
                events.emit("product:select", { item, card });
            }
        });

        modal.render({
            content: card.render({
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
                isSelected: { value: appData.catalog.find(catalogItem => catalogItem.id === item.id).selected ?? false, price: item.price }
            })
        });
    }

    if (item) {
        api.getProductItem(item.id)
            .then(data => {
                showCard(data);
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        modal.close();
    }


})


events.on<IProductItem>('card:select', (item) => {
    appData.setPreview(item);
})


events.on('product:select', (data: { item: IProduct, card: PreviewCard }) => {
    const catalogCard = appData.catalog.find(card => card.id === data.item.id);

    if (catalogCard) {
        appData.setBasket({ id: catalogCard.id, title: catalogCard.title, price: catalogCard.price });
        data.card.render({ isSelected: { value: !catalogCard.selected, price: catalogCard.price } });
        appData.isSelected({ id: catalogCard.id, value: !catalogCard.selected });
        page.counter = appData.getBasketItems().length;
    }
})


events.on('basket:open', () => {
    openBasket();

})

function openBasket() {
    const basketItems = appData.getBasketItems();

    if (basketItems.length) {
        basket.list = basketItems.map((item, index) => {
            const card = new BasketItemView(cloneTemplate(cardBasketTemplate), 'card', {
                onClick: () => {
                    events.emit('basket:card-delete', { id: item.id });
                }
            });
            return card.render({ index: String(index + 1), title: item.title, price: String(item.price) })
        })
        modal.render({ content: basket.render({ total: appData.order.total, isActive: false }) });
    } else {
        modal.render({ content: basket.render({ total: appData.order.total, isActive: true, list: null }) })
    }
}

events.on<{ id: string }>('basket:card-delete', ({ id }) => {
    appData.isSelected({ id, value: false });
    appData.setBasket(appData.catalog.find(catalogItem => catalogItem.id === id));
    page.counter = appData.getBasketItems().length;
    openBasket();
})


events.on('formContacts:open', () => {
    order.reset()
    appData.clearOrder();
    order.disabledButtons();
    modal.render({ content: order.render({ valid: false, errors: ["Выберите способ оплаты и укажите адрес"] }) })
})


events.on('modal:open', () => {
    page.locked = true;
});


events.on('modal:close', () => {
    page.locked = false;
});


events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {

    const { payment, address } = errors;
    order.valid = !payment && !address;
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});


events.on('contactsFormErrors:change', (errors: Partial<IContactsForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({ email, phone }).filter(i => !!i).join('; ');
});


events.on('form:change', ({ field, value }: { field: keyof IOrderForm | keyof IContactsForm, value: string }) => {
    appData.setOrderField(field, value);
})


events.on('order:submit', () => {
    contacts.reset();
    modal.render({ content: contacts.render({ valid: false, errors: ["Укажите email и номер телефона"] }) });
})


events.on('contacts:submit', () => {
    const showSuccess = (data: IOrderResult) => {
        const succes = new Success(cloneTemplate(successTemplate), 'order-success', {
            onClick: () => {
                modal.close();
            }
        })

        modal.render({ content: succes.render({ price: String(data.total) }) });
    }

    const order = appData.createOrderToPost();

    api.orderProdutcs(order)
        .then(data => {
            showSuccess(data);
            appData.getBasketItems().forEach(basketItem => {
                appData.isSelected({ id: basketItem.id, value: false });
            })
            appData.setBasket([]);
            page.counter = 0;
        })
        .catch(err => {
            console.log(err);
        })
})



api.getProductList()
    .then(data => {
        appData.setCatalog(data);
    })
    .catch(err => {
        console.log(err);
    })

