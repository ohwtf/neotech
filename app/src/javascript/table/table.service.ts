import {PromiseNote} from '../helpers/promise';
export class TableService {
    public NOTES = '/note';

    public getNotes(): Promise<PromiseNote> {
        return fetch(this.NOTES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    public showNote(id: string): Promise<PromiseNote> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    public saveNote(data: string, id: string): Promise<PromiseNote> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
    }

    public addNote(data: string): Promise<PromiseNote> {
        return fetch(this.NOTES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
    }

    public deleteNote(id: string): Promise<PromiseNote> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }
}
