/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../node_modules/@types/jasmine-expect/index.d.ts' />
/// <reference path='../../../../node_modules/@types/jasmine-ajax/index.d.ts' />

import {JST} from '../helpers/jst';


declare let JST: JST;
const indexPage = JST['index'];
const tableLayout = JST['table/table'];

import {App} from '../app';
import {ModalModule} from '../modal/modal.module';
import {ModalComponent} from '../modal/modal.component';
import {TableComponent} from './table.component';
import {HistoryModule} from '../history/history.module';
import {TableMockService} from './table.service.mock';
import {TableNote} from './table.notes';



describe("TableModule", () => {
    let AppTest: App;
    let tableNote: TableNote[] = [
        {
            _id: '123',
            email: 'test@test.com',
            name: 'vasja',
            phone: '2828282',
            status: 'new',
            surname: 'test'
        }
    ];

    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = indexPage({mode: 'production'});
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableMockService(), new HistoryModule(history));
        AppTest.tableComponent = new TableComponent(AppTest.tableContainer, AppTest.tableService, AppTest.history, filterContainer);
        AppTest.modalModule = new ModalModule(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer);
        AppTest.modal = new ModalComponent(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer, true, 'new');

        AppTest.tableComponent.tableTemplate = tableLayout;
        AppTest.tableComponent.initialize();
        AppTest.tableComponent.windowScrollEvent();

    });

    it('get all notes', () => {
       AppTest.tableComponent.tableService.getNotes().then((res) => {
            return res.json();
       }).then(() => {
            expect(AppTest.tableComponent.assignEvents).toHaveBeenCalled();
            expect(AppTest.tableComponent.windowScrollEvent).toHaveBeenCalled();
            expect(AppTest.tableComponent.notes).toEqual(tableNote);
            expect(AppTest.tableComponent.appContainer.classList.contains('loaded')).toBeFalsy();
       });
    });

    it('get note', () => {
        AppTest.tableComponent.getNote('123');
        AppTest.tableComponent.tableService.showNote('123').then((res) => {
           return res.json();
        }).then(() => {
            expect(AppTest.tableComponent.modal.show).toHaveBeenCalled();
        });
    });

    it('get note with error', () => {
        AppTest.tableComponent.getNote('111');
        AppTest.tableComponent.tableService.showNote('1234').then((res) => {
           return res.json();
        }).then(() => {
            expect(AppTest.tableComponent.modal.showError).toHaveBeenCalled();
        });
    });

    it('delete note scroll', () => {
        AppTest.tableComponent.tableContainer.innerHTML = tableLayout({
           notes: tableNote
        });
        AppTest.tableComponent.assignEvents();
        let clickElement: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note-delete]');
        clickElement.click();

        AppTest.tableComponent.tableService.deleteNote('123').then(() => {
            expect(AppTest.tableComponent.getAllNotes).toHaveBeenCalled();
        });
    });


    it('delete note scroll with ERROR', () => {
        AppTest.tableComponent.tableContainer.innerHTML = tableLayout({
            notes: tableNote
        });
        AppTest.tableComponent.assignEvents();
        let clickParent: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note]');
        clickParent.setAttribute('data-note', '11');

        let clickElement: HTMLElement  = <HTMLElement>clickParent.querySelector('[data-note-delete]');
        clickElement.click();

        AppTest.tableComponent.tableService.deleteNote('11').then(() => {
            expect(AppTest.tableComponent.modal.showError).toHaveBeenCalled();
        });
    });

    it('edit note', () => {
        AppTest.tableComponent.tableContainer.innerHTML = tableLayout({
            notes: tableNote
        });
        AppTest.tableComponent.assignEvents();

        let clickParent: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note]');
        let clickElement: HTMLElement  = <HTMLElement>clickParent.querySelector('[data-note-edit]');
        clickElement.click();

    });

    it('edit note ERROR', () => {
        AppTest.tableComponent.tableContainer.innerHTML = tableLayout({
            notes: tableNote
        });
        AppTest.tableComponent.assignEvents();

        let clickParent: HTMLElement = <HTMLElement>AppTest.tableComponent.tableContainer.querySelector('[data-note]');
        clickParent.setAttribute('data-note', '11');

        let clickElement: HTMLElement  = <HTMLElement>clickParent.querySelector('[data-note-edit]');
        clickElement.click();

        AppTest.tableComponent.tableService.showNote('11').then((res) => {
            return res.json();
        }).then(() => {
            expect(AppTest.tableComponent.getAllNotes).toHaveBeenCalled();
            expect(AppTest.tableComponent.history.navigate).toHaveBeenCalled();
        });
    });
});






