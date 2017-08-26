/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />

/* tslint:disable */
import * as tableTemplate from '../../../views/index.ejs';
import * as modalTemplate from '../modal/modal.layout.ejs';
/* tslint:enable */


import {App} from '../app';
import {HistoryModule} from '../history/history.module';
import {ModalModule} from './modal.module';
import {TableService} from '../table/table.service';
import {TableComponent} from '../table/table.component';
import {ModalComponent} from './modal.component';

describe("ModalComponent", () => {
    let AppTest: App;
    let ModalTable: ModalModule;


    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = tableTemplate;
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableService(), new HistoryModule(history));
        AppTest.tableComponent = new TableComponent(AppTest.tableContainer, AppTest.tableService, AppTest.history, filterContainer);
        AppTest.modalModule = new ModalModule(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer);
        AppTest.modal = new ModalComponent(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer, true, 'new');

        ModalTable = AppTest.modalModule;
        AppTest.initialize();

        let modalView = document.createElement('div');
        modalView.innerHTML = modalTemplate;
        AppTest.modal.modalContainer.appendChild(modalView);

        AppTest.modal.form = <HTMLFormElement>AppTest.modal.modalContainer.querySelector('[data-form]');
        AppTest.modal.closeModal = Array.prototype.slice.call(AppTest.modal.modalContainer.querySelectorAll('[data-modal-close]'));
        AppTest.modal.deleteNoteButton = <HTMLElement>AppTest.modal.modalContainer.querySelector('[data-note-delete]');

        let data = {
            "_id": "59a0016dcb4a4c13eabbb0f0",
            "name": "qwewq",
            "email": "qweqwe@mail.ru",
            "phone": "1232131",
            "surname": "qweqwe",
            "status": "potato"
        };
        AppTest.modal.show(data);

    });

    it('show without data', () => {
        AppTest.modal.show();
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('show with data', () => {
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('form submit', () => {
        //TODO #submit
        for (let item of  Array.prototype.slice.call(AppTest.modal.form.querySelectorAll('[data-validate]'))) {
            item.remove();
        }

        AppTest.modal.assignEvents();
        let formButton = <HTMLElement>AppTest.modal.form.querySelector('button[type="submit"]');
        formButton.click();
    });

    it('close modal', () => {
        let clickElement = AppTest.modal.closeModal[0];
        clickElement.setAttribute('href', '#');
        clickElement.click();
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('delete modal', () => {
        let clickElement = AppTest.modal.deleteNoteButton;
        clickElement.setAttribute('href', '#');
        clickElement.click();
    });
});





