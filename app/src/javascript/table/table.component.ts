/* tslint:disable */
import tableTemplate from './table.layout.ejs';
/* tslint:enable */

import {TableService} from './table.service';
import {TableNotes} from './table.notes';
import {ModalComponent} from '../modal/modal.component';
import {HistoryData} from '../history/history.data';
import {HistoryModule} from '../history/history.module';

export class TableComponent {
    public activeItem: HTMLElement;
    public actionElements: HTMLElement[];
    public notes: TableNotes[];
    public modal: ModalComponent;
    public tableTemplate: tableTemplate = tableTemplate;

    constructor(
        public tableContainer: Element,
        public tableService: TableService,
        public history: HistoryModule,
        public appContainer: Element,
    ) {}

    public initialize() {
        this.getAllNotes();
        window.addEventListener('scroll', this.windowScrollEvent.bind(this));
    }

    public getAllNotes() {
        this.appContainer.classList.add('loaded');
        this.tableService.getNotes().then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            this.appContainer.classList.remove('loaded');
            this.notes = data;
            this.tableContainer.innerHTML = this.tableTemplate({notes: this.notes});
            this.assignEvents();
            this.windowScrollEvent();
        });
    }


    public getNote(id: string, historyPush = true) {
        this.modal = new ModalComponent(this.tableService, this, this.history, this.appContainer, historyPush, 'edit');

        return this.tableService.showNote(id).then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                this.modal.showError(data.error);
            } else {
                this.modal.show(data);
            }
            return data;
        });
    }

    public windowScrollEvent() {
        let tableElements: HTMLElement[] = Array.prototype.slice.call(this.appContainer.querySelectorAll('[data-note]'));

        if (this.appContainer.querySelectorAll('[data-note]:not(.visible)').length === 0) {
            return;
        }

        for (let item of tableElements) {
            if (item.getBoundingClientRect().top <= window.innerHeight * 1.25 && item.getBoundingClientRect().top + item.clientHeight > 0) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        }
    }

    public assignEvents() {
        this.actionElements = Array.prototype.slice.call(this.tableContainer.querySelectorAll('[data-note]'));
        for (let item of this.actionElements) {
            let editNoteButton = item.querySelector('[data-note-edit]');
            let deleteNoteButton = item.querySelector('[data-note-delete]');

            deleteNoteButton.addEventListener('click', this.deleteNote.bind(this, item));
            editNoteButton.addEventListener('click', this.editNote.bind(this, item));
        }
    }

    private deleteNote(item: HTMLElement) {
        let id = item.dataset.note;
        this.tableService.deleteNote(id).then(res => {
            if (res.ok) {
                this.getAllNotes();
            } else {
                let data = res.json();
                this.modal.showError(data.error);
            }
        });
    }

    private editNote(item: HTMLElement, e: MouseEvent) {
        e.preventDefault();

        let linkItem: HTMLLinkElement = <HTMLLinkElement>e.target;
        let url = linkItem.href;
        let id = item.dataset.note;

        let historyData: HistoryData = {
            title: 'Edit note',
            id: id,
            event: 'edit-note',
            link: url
        };

        this.activeItem = item;
        this.getNote(id, true).then(data => {
            if (data.error) {
                this.getAllNotes();
            }
        });
        this.history.navigate(historyData);
    }
}
