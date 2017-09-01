import {PromiseNote} from '../helpers/promise';
import {TableNote} from '../table/table.notes';

export class NoteService {
    public NOTES = '/note';

    public getNotes(): Promise<TableNote[]> {
        return fetch(this.NOTES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => response.json())
          .catch(this.handleError);
    }

    public showNote(id: string): Promise<TableNote> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => response.json())
          .catch(this.handleError);
    }

    public saveNote(data: string, id: string): Promise<string> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        }).then(response => response.json())
          .catch(this.handleError);
    }

    public addNote(data: string): Promise<PromiseNote> {
        return fetch(this.NOTES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        }).then(response => response.json())
          .catch(this.handleError);
    }

    public deleteNote(id: string): Promise<PromiseNote> {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => response.json())
          .catch(this.handleError);
    }

    private handleError(error: string) {
        // TODO create modal window with error message
        console.log(error);
        return Promise.reject(error);
    }
}
