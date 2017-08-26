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


class TableMockService implements TableService {
    public NOTES = '/note';

    public getNotes() {
        fetch(this.NOTES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return Promise.resolve({ok: true});
    }

    public saveNote(data: string, id: string) {
        fetch(`${this.NOTES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
        return Promise.resolve({ok: true});
    }

    public addNote(data: string) {
        fetch(this.NOTES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
        return Promise.resolve({ok: true});
    }

    public deleteNote(id: string) {
        fetch(`${this.NOTES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        return new Promise((resolve) => {
           resolve({ok: true});
        });
    }
}


describe("ModalModule", () => {
    let AppTest: App;
    let ModalTable: ModalModule;


    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = tableTemplate;
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableMockService(), new HistoryModule(history));
        AppTest.tableComponent = new TableComponent(AppTest.tableContainer, AppTest.tableService, AppTest.history, filterContainer);
        AppTest.modalModule = new ModalModule(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer);
        AppTest.modal = new ModalComponent(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer, true, 'new');

        let modalView = document.createElement('div');
        modalView.innerHTML = modalTemplate;
        AppTest.modal.modalContainer.appendChild(modalView);

        AppTest.modal.form = <HTMLFormElement>AppTest.modal.modalContainer.querySelector('[data-form]');
        AppTest.modal.closeModal = Array.prototype.slice.call(AppTest.modal.modalContainer.querySelectorAll('[data-modal-close]'));
        AppTest.modal.deleteNoteButton = <HTMLElement>AppTest.modal.modalContainer.querySelector('[data-note-delete]');

        ModalTable = AppTest.modalModule;
        AppTest.initialize();
    });

    it('animate function open', () => {
        ModalTable.animate('open');
        expect(ModalTable.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('animate function close', () => {
        ModalTable.animate('close');
        expect(ModalTable.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('animate function default', () => {
        ModalTable.animate('test');
        expect(ModalTable.appContainer.classList.contains('close-content')).toBeFalsy();
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

        expect(ModalTable.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('form submit', () => {
        let mySpy = spyOn(AppTest.modalModule.tableComponent, 'getAllNotes');
        let data = {
            "_id": "59a0016dcb4a4c13eabbb0f0",
            "name": "qwewq",
            "email": "qweqwe@mail.ru",
            "phone": "1232131",
            "surname": "qweqwe",
            "status": "potato"
        };
        AppTest.modalModule.submit(JSON.stringify(data), 'edit');
        AppTest.modalModule.submit(JSON.stringify(data), 'new');

        AppTest.modalModule.tableService.saveNote(JSON.stringify(data), data._id).then(res => {
            if (res.ok) {
                expect(mySpy).toHaveBeenCalled();
            }
        });
    });

    it('close modal', () => {
        let clickElement = AppTest.modal.closeModal[0];
        clickElement.setAttribute('href', '#');
        let customSpy = spyOn(AppTest.modalModule, 'animate');
        clickElement.click();

        expect(customSpy).toHaveBeenCalled();
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });


    it('delete note', () => {
        let mySpy = spyOn(AppTest.modalModule.tableComponent, 'getAllNotes');
        let animateSpy = spyOn(AppTest.modalModule, 'animate');
        let clickElement = AppTest.modal.deleteNoteButton;

        AppTest.modalModule.formData = {
            "_id": "59a0016dcb4a4c13eabbb0f0",
            "name": "qwewq",
            "email": "qweqwe@mail.ru",
            "phone": "1232131",
            "surname": "qweqwe",
            "status": "potato"
        };
        clickElement.setAttribute('href', '#');
        let ev = document.createEvent('MouseEvent');
        AppTest.modalModule.deleteNote(ev);

        AppTest.modalModule.tableService.deleteNote(AppTest.modalModule.formData._id).then(res => {
            if (res.ok) {
                expect(animateSpy).toHaveBeenCalled();
                expect(mySpy).toHaveBeenCalled();
            }
        });

    });

    it('close method call', () => {
        let clickElement = AppTest.modal.closeModal[0];
        clickElement.setAttribute('href', '#');
        let ev = document.createEvent('MouseEvent');
        let mySpy = spyOn(AppTest.modalModule, 'animate');
        AppTest.modalModule.close(ev);
        expect(mySpy).toHaveBeenCalled();
    });



    it('modal close call', () => {
        let clickElement = AppTest.modalModule.modal;
        clickElement.click();
    });
});

