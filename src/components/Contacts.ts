import { Form } from "./common/Form";
import { IContactsForm } from "../types"
import { IEvents } from "./base/events";


export class Contacts extends Form<IContactsForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)
    }
}