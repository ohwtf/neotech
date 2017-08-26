/// <reference path='../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../node_modules/@types/jasmine-expect/index.d.ts' />

/* tslint:disable */
import * as tableTemplate from '../../views/index.ejs';
/* tslint:enable */


import {BatTable} from './main';
import {App} from './app';
import {HistoryModule} from './history/history.module';

describe("MAIN", () => {
    let AppTest: BatTable;
    let AppModule: App;

    it('app initialize', () => {
        let template = document.createElement('div');
        template.innerHTML = tableTemplate;
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new BatTable(filterContainer, new HistoryModule(window.history));
        AppTest.initialize();

        expect(filterContainer).toBeDefined();
        expect(window.history).toBeDefined();
    });
});
