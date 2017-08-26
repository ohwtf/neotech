import {HistoryData} from './history.data';
import {App} from '../app';
import {ModalComponent} from '../modal/modal.component';

export class HistoryModule {
    public modal: ModalComponent;
    public app: App;

    constructor(
        public history: History
    ) {}

    public buildState(url: string) {
        let action = url.toString().split("/")[2];

        if (action) {
            if ('new' === action) {
                return { event: 'new-note', title: 'Add new note', link: url, };
            }  else {
                return { event: 'edit-note', title: 'Edit note', link: url, id: action };
            }
        }
    }

    public navigate(data: HistoryData) {
        return this.history.pushState(data, data.title, data.link);
    }

    public initialize(app: App) {
        this.app = app;
        let data: HistoryData = this.buildState(window.location.pathname);

        if (data) {
            this.history.replaceState(data, data.title, data.link);
            this.showPage(this.history.state);
        }

        this.windowEvents();
    }

    public windowEvents() {
        window.addEventListener('popstate', (e: PopStateEvent) => {
            this.showPage(e.state);
        });
    }

    public showPage(data: HistoryData) {
        if (null === data) {
            this.app.closeModal();
            return;
        }

        switch (data.event) {
            case 'new-note':
                this.app.addNote(false);
                break;
            case 'edit-note':
                this.app.tableComponent.getNote(data.id, false);
                break;
            case 'table-view':
                this.app.closeModal();
                break;
            default:
                this.app.closeModal();
                break;
        }
    }
}
