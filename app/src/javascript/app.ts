import {TableService} from './table/table.service';
import {ModalComponent} from './modal/modal.component';
import {TableComponent} from './table/table.component';
import {ModalModule} from './modal/modal.module';
import {HistoryModule} from './history/history.module';
import {HistoryData} from './history/history.data';

export class App {
    public modalModule: ModalModule;
    public modal: ModalComponent;
    public tableComponent: TableComponent;
    public addNewNote: HTMLLinkElement;
    public tableContainer: Element;

    constructor(
        public filterContainer: Element,
        public tableService: TableService,
        public history: HistoryModule
    ) {
        this.addNewNote = <HTMLLinkElement>this.filterContainer.querySelector('[data-note-new]');
        this.tableContainer = this.filterContainer.querySelector('[data-insert="table"]');
    }

    public initialize() {
        this.tableComponent = new TableComponent(this.tableContainer, this.tableService, this.history, this.filterContainer);
        this.modalModule = new ModalModule(this.tableService, this.tableComponent, this.history, this.filterContainer);

        this.tableComponent.initialize();
        this.modalModule.events();
        this.history.initialize(this);
        this.events();
    }

    public events() {
        this.addNewNote.addEventListener('click', (e) => {
            e.preventDefault();
            this.addNote(true);
            this.historyStep();
        });
    }

    public addNote(history?: boolean) {
        this.modal = new ModalComponent(this.tableService, this.tableComponent, this.history, this.filterContainer, history, 'new');
        this.modal.show();
    }

    public closeModal() {
        this.modalModule.animate('close', false);
    }

    private historyStep() {
        let url = this.addNewNote.getAttribute('href');
        let data: HistoryData = {
            event: 'new-note',
            title: 'Add new note',
            link: url
        };
        this.history.navigate(data);
    }
}
