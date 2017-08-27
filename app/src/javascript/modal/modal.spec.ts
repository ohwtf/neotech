/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />


import {JST} from '../helpers/jst';
declare let JST: JST;
const indexPage = JST['index'];
const modalPage = JST['modal/layout'];


import {App} from '../app';
import {TableMockService} from '../table/table.service.mock';
import {HistoryModule} from '../history/history.module';
import {ModalModule} from './modal.module';
import {TableComponent} from '../table/table.component';
import {ModalComponent} from './modal.component';

describe("ModalModule", () => {
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

    it('animate be open', () => {
        AppTest.modalModule.animate('open');
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('animate default state with history = false', () => {
        AppTest.modalModule.animate('def');
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('animate with history = false', () => {
        AppTest.modalModule.animate('close', true);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });


    it('window click', () => {
        let e = new window.KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            shiftKey: true
        });

        delete e.keyCode;
        Object.defineProperty(e, 'keyCode', {'value': 27});
        document.dispatchEvent(e);

        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });


    it('submit', () => {
        let spyAllNotes = spyOn(AppTest.modalModule.tableComponent, 'getAllNotes');
        let spyAnimate = spyOn(AppTest.modalModule, 'animate');

        let data = {
            'name': 'testvalue',
            'surname': 'testvalue',
            'phone': '+371 292929',
            'status': 'new',
            'email': 'test@testoff.com',
            '_id': '123'
        };

        AppTest.modalModule.submit(JSON.stringify(data), 'edit');
        AppTest.modalModule.tableService.saveNote(JSON.stringify(data), data._id).then( () => {
            expect(spyAllNotes).toHaveBeenCalled();
            expect(spyAnimate).toHaveBeenCalled();
        });

    });

    it('submit', () => {
        let spyAllNotes = spyOn(AppTest.modalModule.tableComponent, 'getAllNotes');
        let spyAnimate = spyOn(AppTest.modalModule, 'animate');

        let data = {
            'name': 'testvalue',
            'surname': 'testvalue',
            'phone': '+371 292929',
            'status': 'new',
            'email': 'test@testoff.com'
        };

        AppTest.modalModule.submit(JSON.stringify(data), 'default');

        AppTest.modalModule.tableService.addNote(JSON.stringify(data)).then(() => {
            expect(spyAllNotes).toHaveBeenCalled();
            expect(spyAnimate).toHaveBeenCalled();
        });
    });

    it('delete button', () => {
        let spyAllNotes = spyOn(AppTest.modalModule.tableComponent, 'getAllNotes');
        let spyAnimate = spyOn(AppTest.modalModule, 'animate');

        AppTest.modalModule.formData = {
            'name': 'testvalue',
            'surname': 'testvalue',
            'phone': '+371 292929',
            '_id': '123',
            'status': 'new',
            'email': 'test@testoff.com'
        };

        AppTest.modalModule.modalContainer.innerHTML = modalPage({
            state: 'edit',
            selectList: selecteOptions,
            data: AppTest.modalModule.formData
        });


        let element = <HTMLElement>AppTest.modalModule.modalContainer.querySelector('[data-note-delete]');
        element.addEventListener('click', AppTest.modalModule.deleteNote.bind(AppTest.modalModule));
        element.click();

        AppTest.modalModule.tableService.deleteNote('123').then(() => {
            expect(spyAllNotes).toHaveBeenCalled();
            expect(spyAnimate).toHaveBeenCalled();
        });
    });

    it('close button', () => {
        let spyAnimate = spyOn(AppTest.modalModule, 'animate');

        AppTest.modalModule.formData = {
            'name': 'testvalue',
            'surname': 'testvalue',
            'phone': '+371 292929',
            '_id': '123',
            'status': 'new',
            'email': 'test@testoff.com'
        };

        AppTest.modalModule.modalContainer.innerHTML = modalPage({
            state: 'edit',
            selectList: selecteOptions,
            data: AppTest.modalModule.formData
        });

        let element = <HTMLElement>AppTest.modalModule.modalContainer.querySelectorAll('[data-modal-close]')[0];
        element.setAttribute('href', '#');
        let ev = document.createEvent('MouseEvent');
        AppTest.modalModule.close(ev);
        AppTest.modalModule.modal.click();
        element.click();

        expect(spyAnimate).toHaveBeenCalledTimes(3);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });
});


