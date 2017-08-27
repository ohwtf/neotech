/// <reference path='../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../node_modules/@types/jasmine-expect/index.d.ts' />

import {JST} from './helpers/jst';

declare let JST: JST;
const indexPage = JST['index'];

import { App } from './app';
import {HistoryModule} from './history/history.module';
import {ModalComponent} from './modal/modal.component';
import {TableComponent} from './table/table.component';
import {ModalModule} from './modal/modal.module';
import {TableMockService} from './table/table.service.mock';


describe("App", () => {
    let AppTest: App;

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


    it('add note', () => {
        AppTest.addNewNote.click();
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });


    it('close modal', () => {
        AppTest.closeModal();
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
        expect(AppTest.modalModule).toBeDefined();
    });

    it('history step', () => {
        expect(AppTest.history).toBeDefined();
        expect(AppTest.history.navigate).toBeFunction();
    });
});
