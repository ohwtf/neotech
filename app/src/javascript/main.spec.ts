/// <reference path='../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../node_modules/@types/jasmine-expect/index.d.ts' />


import {JST} from './helpers/jst';

declare let JST: JST;
const indexPage = JST['index'];

import {BatTable} from './main';
import {HistoryModule} from './history/history.module';

describe("MAIN", () => {
    let AppTest: BatTable;

    beforeEach(() => {
        let template = document.createElement('div');
        template.innerHTML = indexPage({mode: 'production'});
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new BatTable(filterContainer, new HistoryModule(window.history));
    });

    it('app initialize', () => {
        AppTest.initialize();
        expect(AppTest.filterSection).toBeDefined();
        expect(window.history).toBeDefined();
        expect(AppTest.filterSection.classList.contains('touch')).toBeFalsy();
    });

    it('touch', () => {
        let customElement = document.createElement('div');
        document.body.appendChild(customElement);

        let touchData: Touch = {
            target: customElement,
            clientX: 20,
            clientY: 20,
            screenX: 30,
            screenY: 30,
            pageX: 20,
            identifier: 42,
            pageY: 20
        };

        document.ontouchstart = new Touch(touchData);
        AppTest.initialize();
        expect(AppTest.filterSection.classList.contains('touch')).toBeTruthy();
    });
});

