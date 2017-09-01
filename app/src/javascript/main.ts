import {App} from './app';
import {HistoryModule} from './history/history.module';
import {NoteService} from './note/note.service';

let appElement = document.querySelector('[data-app]');

export class BatTable {
    constructor(
        public filterSection: Element,
        public appHistory: HistoryModule
    ) {}
    public initialize() {
        if (this.filterSection) {
            let newApp = new App(this.filterSection, new NoteService(), this.appHistory);
            let touch;

            if ('ontouchstart' in document) {
                this.filterSection.classList.add('touch');
            }

            newApp.initialize();
        }
    }
}

let table = new BatTable(appElement, new HistoryModule(window.history));
table.initialize();
