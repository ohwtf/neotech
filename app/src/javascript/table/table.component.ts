/* tslint:disable */
import tableTemplate from './table.layout.ejs';
/* tslint:enable */

import {ModalComponent} from '../modal/modal.component';
import {HistoryData} from '../history/history.data';
import {HistoryModule} from '../history/history.module';
import {TableNote} from "./table.notes";
import {NoteService} from '../note/note.service';

export class TableComponent {
    public activeItem: HTMLElement;
    public actionElements: HTMLElement[];
    public notes: TableNote[];
    public modal: ModalComponent;
    public scrollFlag: true;
    public tableTemplate: tableTemplate = tableTemplate;
    public scrollTimer: NodeJS.Timer;

    constructor(
        public tableContainer: Element,
        public tableService: NoteService,
        public history: HistoryModule,
        public appContainer: Element,
    ) {}

    public initialize() {
        this.getAllNotes();
        this.events();
        this.windowScrollEvent();
    }

    public events() {
        window.addEventListener('scroll', () => {
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                this.windowScrollEvent();
            }, 100);
        });
    }

    public getAllNotes() {
        this.appContainer.classList.add('loaded');

        this.tableService.getNotes().then(result => {
            this.appContainer.classList.remove('loaded');
            this.notes = result;
            this.tableContainer.innerHTML = this.tableTemplate({notes: this.notes});
            this.assignEvents();
            this.windowScrollEvent();
        });
    }


    public getNote(id: string, historyPush = true) {
        this.modal = new ModalComponent(this.tableService, this, this.history, this.appContainer, historyPush, 'edit');
        return this.tableService.showNote(id).then(result => {
            this.modal.show(result);
        });
    }

    public windowScrollEvent() {
        if (!this.scrollFlag) {
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
        this.tableService.deleteNote(id).then(() => {
            this.getAllNotes();
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
        this.getNote(id, true);
        this.history.navigate(historyData);
    }
}
