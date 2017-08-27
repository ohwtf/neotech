/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />


import {JST} from '../helpers/jst';


declare let JST: JST;
const indexPage = JST['index'];
const modalPage = JST['modal/layout'];
const modalError = JST['modal/error'];



import {App} from '../app';
import {HistoryModule} from '../history/history.module';
import {ModalModule} from './modal.module';
import {TableComponent} from '../table/table.component';
import {ModalComponent} from './modal.component';
import {TableMockService} from '../table/table.service.mock';

describe("ModalComponent", () => {
    let AppTest: App;
    let selecteOptions = [ 'old', 'new', 'tomato', 'potato', 'not new', 'not old' ];

    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = indexPage({mode: 'production'});
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableMockService(), new HistoryModule(history));
        AppTest.tableComponent = new TableComponent(AppTest.tableContainer, AppTest.tableService, AppTest.history, filterContainer);
        AppTest.modalModule = new ModalModule(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer);
        AppTest.modal = new ModalComponent(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer, true, 'new');

        AppTest.initialize();
    });

    it('modal show', () => {
        let renderSpy = spyOn(AppTest.modal, 'render');
        let animate = spyOn(AppTest.modalModule, 'animate');
        AppTest.modal.modalTemplate = modalPage;
        AppTest.modal.show();

        expect(AppTest.modal.modalTemplate).toBeDefined();
        expect(renderSpy).toHaveBeenCalled();
    });

    it('submit form', () => {
        let submitSpy = spyOn(AppTest.modal, 'submit');
        AppTest.modal.modalTemplate = modalPage;
        AppTest.modal.show();

        let fillItems = Array.prototype.slice.call(AppTest.modal.appContainer.querySelectorAll('input, select'));

        for (let item of fillItems) {
            switch (item.getAttribute('data-validate')) {
                case 'email':
                    item.value = 'test@testoff.com';
                    break;
                case 'phone':
                    item.value = '+371 292929';
                    break;
                default:
                    item.value = 'testvalue';
                    break;
            }

            if (item.name === 'status') {
                item.value = 'new';
            }
        }

        let formButton = <HTMLElement>AppTest.modal.form.querySelector('button[type="submit"]');

        formButton.click();
        expect(submitSpy).toHaveBeenCalledTimes(1);
    });


    it('delete modal', () => {
        let deleteSpy = spyOn(AppTest.modal, 'deleteNote');
        AppTest.modal.modalTemplate = modalPage;

        AppTest.modal.tableService.showNote('123').then((res) => {
            AppTest.modal.formData = res.json();
            AppTest.modal.modalContainer.innerHTML = AppTest.modal.modalTemplate({
                state: 'edit',
                selectList: selecteOptions,
                data: AppTest.modal.formData
            });

        }).then(() => {
            AppTest.modal.deleteNoteButton = <HTMLElement>AppTest.modal.modalContainer.querySelector('[data-note-delete]');
            AppTest.modal.deleteNoteButton.setAttribute('href', '#');
            AppTest.modal.assignEvents();
            AppTest.modal.deleteNoteButton.click();
            expect(deleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('show error', () => {
        AppTest.modal.errorTemplate = modalError;
        AppTest.modal.renderError('test');
        expect(AppTest.modal.closeModal).toBeDefined();
    });
});
