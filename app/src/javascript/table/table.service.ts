export class TableService {
    public NOTES = '/note';

    public getNotes() {
        return fetch(this.NOTES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    public showNote(id: string) {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    public saveNote(data: string, id: string) {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
    }

    public addNote(data: string) {
        return fetch(this.NOTES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        });
    }

    public deleteNote(id: string) {
        return fetch(`${this.NOTES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }
}
