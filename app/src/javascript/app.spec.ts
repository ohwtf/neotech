/// <reference path='../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../node_modules/@types/jasmine-expect/index.d.ts' />

/* tslint:disable */
import * as tableTemplate from '../../views/index.ejs';
/* tslint:enable */


import { App } from './app';
import {TableService} from './table/table.service';
import {HistoryModule} from './history/history.module';
import {ModalComponent} from './modal/modal.component';
import {TableComponent} from './table/table.component';
import {ModalModule} from './modal/modal.module';


describe("App", () => {
    let AppTest: App;

    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = tableTemplate;
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableService(), new HistoryModule(history));
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
