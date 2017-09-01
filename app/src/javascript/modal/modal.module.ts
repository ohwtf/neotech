import {TableComponent} from '../table/table.component';
import {HistoryModule} from '../history/history.module';
import {HistoryData} from '../history/history.data';
import {NoteService} from "../note/note.service";
import {TableNote} from '../table/table.notes';

export class ModalModule {
    public modal: HTMLElement;
    public modalContainer: Element;
    public formData: TableNote;
    public selectOptions = [ 'old', 'new', 'tomato', 'potato', 'not new', 'not old' ];

    constructor(
        public tableService: NoteService,
        public tableComponent: TableComponent,
        public history: HistoryModule,
        public appContainer: Element
    ) {
        this.modalContainer = this.appContainer.querySelector('[data-insert="modal"]');
        this.modal = <HTMLElement>this.appContainer.querySelector('[data-modal]');
    }

    public animate(state: string, mode = true) {

        switch (state) {
            case 'open':
                this.appContainer.classList.add('close-content');
                break;
            case 'close':
                this.appContainer.classList.remove('close-content');
                if (mode) {
                    this.pushHistory();
                }
                break;
            default:
                this.appContainer.classList.remove('close-content');
        }
    }

    public submit(data: string, state?: string) {
        switch (state) {
            case 'edit':
                this.tableService.saveNote(data, this.formData._id).then(() => {
                    this.tableComponent.getAllNotes();
                    this.animate('close');
                });
                break;
            default:
                this.tableService.addNote(data).then(() => {
                    this.tableComponent.getAllNotes();
                    this.animate('close');
                });
                break;
        }
    }

    public close(e: MouseEvent) {
        e.preventDefault();
        this.animate('close');
    }

    public deleteNote(e: MouseEvent) {
        e.preventDefault();
        if (this.formData._id) {
            this.tableService.deleteNote(this.formData._id).then(() => {
                this.tableComponent.getAllNotes();
                this.animate('close');
            });
        }
    }

    public events() {
        if (this.modal) {
            this.modal.addEventListener('click', (e: MouseEvent) => {
                if (e.target === this.modal) {
                    this.animate('close');
                }
            });
        }
        window.addEventListener('keydown', this.windowEvents.bind(this));
    }

    private pushHistory() {
        let data: HistoryData = {
            event: 'table-view',
            title: 'Batman table',
            link: '/'
        };
        return this.history.navigate(data);
    }

    private windowEvents(e: KeyboardEvent) {
        if (27 === e.keyCode && this.appContainer.classList.contains('close-content')) {
            this.animate('close');
        }
    }
}


