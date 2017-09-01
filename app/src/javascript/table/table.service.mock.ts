import {TableNote} from './table.notes';
import {PromiseNote} from '../helpers/promise';
import {NoteService} from "../note/note.service";

export class TableMockService implements NoteService {
    public NOTES = '/note';
    protected tableData: TableNote[] = [
        {
            _id: '123',
            email: 'test@test.com',
            name: 'vasja',
            phone: '2828282',
            status: 'new',
            surname: 'test'
        }
    ];

    protected error = { error: "This note doesn't exist or has been deleted" };

    public getData() {
        return this.tableData;
    }

    public getErrorData() {
        return this.error;
    }

    public getNotes() {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: this.getData.bind(this)
        });
    }

    public showNote(id: string): Promise<PromiseNote> {
        if ('123' !== id) {
            return Promise.resolve({
                ok: false,
                status: 404,
                json: this.getErrorData.bind(this)
            });
        } else {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: this.getData.bind(this)
            });
        }
    }

    public saveNote(data: string, id: string): Promise<PromiseNote> {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: this.getData.bind(this)
        });
    }

    public addNote(data: string): Promise<PromiseNote> {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: this.getData.bind(this)
        });
    }

    public deleteNote(id: string): Promise<PromiseNote> {
        if ('123' !== id) {
            return Promise.resolve({
                ok: false,
                status: 404,
                json: this.getErrorData.bind(this)
            });
        } else {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: this.getData.bind(this)
            });
        }
    }
}
