/* tslint:disable */
import modalTemplate from './layout.ejs';
import errorTemplate from './error.ejs';
/* tslint:enable */

import {ModalModule} from './modal.module';
import {TableService} from '../table/table.service';
import {TableComponent} from '../table/table.component';
import {FormElements} from '../form/form.elements';
import {FormComponent} from '../form/form.component';
import {HistoryModule} from '../history/history.module';


export class ModalComponent extends ModalModule {
    public form: HTMLFormElement;
    public deleteNoteButton: HTMLElement = null;
    public closeModal: HTMLElement[] = [];
    public modalTemplate: modalTemplate = modalTemplate;
    public errorTemplate: errorTemplate = errorTemplate;

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

    public render() {
        if (this.modalTemplate) {
            this.modalContainer.innerHTML = this.modalTemplate({
                state: this.state,
                selectList: this.selectOptions,
                data: this.formData
            });

            this.form = <HTMLFormElement>this.modalContainer.querySelector('[data-form]');
            this.deleteNoteButton = <HTMLElement>this.modalContainer.querySelector('[data-note-delete]');
            this.closeModal = Array.prototype.slice.call(this.modalContainer.querySelectorAll('[data-modal-close]'));
        }
    }


    public renderError(message: string) {
        if (this.errorTemplate) {
            this.modalContainer.innerHTML = this.errorTemplate({
                message: message
            });
            this.closeModal = Array.prototype.slice.call(this.modalContainer.querySelectorAll('[data-modal-close]'));
        }
    }

}
