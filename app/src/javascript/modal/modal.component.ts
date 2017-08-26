/* tslint:disable */
import modalTemplate from './modal.layout.ejs';
import errorTemplate from './modal.error.layout.ejs';
/* tslint:enable */

import {ModalModule} from './modal.module';
import {TableService} from '../table/table.service';
import {TableComponent} from '../table/table.component';
import {FormElements} from '../form/FormElements';
import {FormComponent} from '../form/form.component';
import {HistoryModule} from '../history/history.module';


export class ModalComponent extends ModalModule {
    public form: HTMLFormElement;
    public deleteNoteButton: HTMLElement = null;
    public closeModal: HTMLElement[] = [];

    constructor(
        public tableService: TableService,
        public tableComponent: TableComponent,
        public history: HistoryModule,
        public appContainer: Element,
        public historyPush: boolean,
        public state?: string,
    ) {
        super(tableService, tableComponent, history, appContainer);
    }

    public show(data?: FormElements) {
        if (data) {
            this.formData = data;
        }

        this.render();
        this.assignEvents();
        this.animate('open', this.historyPush);
    }

    public showError(message: string) {
        this.renderError(message);
        this.assignEvents();
        this.animate('open', this.historyPush);
    }


    public assignEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                let form = new FormComponent(this.form);
                let data: string = JSON.stringify(form.getData());

                if (form.validate()) {
                    this.submit(data, this.state);
                }
            });
        }

        for (let item of this.closeModal) {
            item.addEventListener('click', this.close.bind(this));
        }

        if (this.deleteNoteButton) {
            this.deleteNoteButton.addEventListener('click', this.deleteNote.bind(this));
        }
    }

    private render() {
        if (modalTemplate) {
            this.modalContainer.innerHTML = modalTemplate({
                state: this.state,
                selectList: this.selectOptions,
                data: this.formData
            });

            this.form = <HTMLFormElement>this.modalContainer.querySelector('[data-form]');
            this.deleteNoteButton = <HTMLElement>this.modalContainer.querySelector('[data-note-delete]');
            this.closeModal = Array.prototype.slice.call(this.modalContainer.querySelectorAll('[data-modal-close]'));
        }
    }


    private renderError(message: string) {
        if (errorTemplate) {
            this.modalContainer.innerHTML = errorTemplate({
                message: message
            });
            this.closeModal = Array.prototype.slice.call(this.modalContainer.querySelectorAll('[data-modal-close]'));
        }
    }

}
