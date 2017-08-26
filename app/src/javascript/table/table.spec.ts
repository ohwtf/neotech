/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />

/* tslint:disable */
import * as tableTemplate from '../../../views/index.ejs';
/* tslint:enable */


import {App} from '../app';
import {ModalModule} from '../modal/modal.module';
import {ModalComponent} from '../modal/modal.component';
import {TableService} from './table.service';
import {TableComponent} from './table.component';
import {HistoryModule} from '../history/history.module';


describe("TableModule", () => {
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

        let clickElement = document.createElement('div');
        let deleteElement = document.createElement('div');
        let noteElement = document.createElement('div');

        noteElement.setAttribute('data-note', '123');

        clickElement.setAttribute('href', '/note/123');
        clickElement.setAttribute('data-note-edit', '');
        deleteElement.setAttribute('data-note-delete', '');


        noteElement.appendChild(deleteElement);
        noteElement.appendChild(clickElement);

        AppTest.tableComponent.tableContainer.appendChild(noteElement);

        AppTest.tableComponent.windowScrollEvent();

    });


    it('get Notes false history', () => {
        AppTest.tableComponent.getNote('123');
        AppTest.tableComponent.modal.showError('test');
        expect(AppTest.tableComponent.modal).toBeDefined();
    });


    it('get error Note', () => {
        AppTest.tableComponent.assignEvents();
        let clickElement: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note-edit]');

        clickElement.click();

    });


    it('delete note', () => {
        AppTest.tableComponent.assignEvents();
        let clickElement: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note-delete]');
        clickElement.click();
    });

    it('edit note', () => {
        AppTest.tableComponent.assignEvents();
        let clickElement: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note-edit]');
        clickElement.click();
    });
});





