/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />

import {JST} from '../helpers/jst';

declare let JST: JST;
const indexPage = JST['index'];

import {HistoryModule} from './history.module';
import {App} from '../app';
import {TableComponent} from '../table/table.component';
import {ModalModule} from '../modal/modal.module';
import {ModalComponent} from '../modal/modal.component';
import {HistoryData} from './history.data';
import {TableMockService} from '../table/table.service.mock';


describe("History", () => {
    let historyTest: HistoryModule;
    let AppTest: App;
    beforeEach(() => {
        historyTest = new HistoryModule(history);
        let template = document.createElement('div');
        template.innerHTML = indexPage({mode: 'production'});
        let filterContainer = template.querySelector('[data-app]');

        AppTest = new App(filterContainer, new TableMockService(), new HistoryModule(history));
        AppTest.tableComponent = new TableComponent(AppTest.tableContainer, AppTest.tableService, AppTest.history, filterContainer);
        AppTest.modalModule = new ModalModule(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer);
        AppTest.modal = new ModalComponent(AppTest.tableService, AppTest.tableComponent, AppTest.history, filterContainer, true, 'new');

        AppTest.initialize();
        historyTest.initialize(AppTest);
    });

    it('build state with link', () => {
        let link = '/note/213';
        let action = link.toString().split('/')[2];

        expect(historyTest.buildState(link)).toEqual({ event: 'edit-note', title: 'Edit note', link: link, id: action });
    });

    it('build state new', () => {
        let link = '/note/new';
        expect(historyTest.buildState(link)).toEqual({ event: 'new-note', title: 'Add new note', link: link });
    });


    it('window pushstate', () => {
        let data: HistoryData = { event: 'new-note', title: 'Add new note', link: '/note/new' };
        spyOn(window.history, 'pushState');

        window.history.pushState(data, data.title, data.link);
        window.history.back();

        expect(historyTest.history.pushState).toHaveBeenCalled();
    });


    it('build state check if', () => {
        let link = '/note/';
        expect(historyTest.buildState(link)).toBeFalsy();
    });


    it('initialize', () => {
        historyTest.initialize(AppTest);
        expect(historyTest.app).toBeDefined();
        expect(historyTest.app.tableComponent).toBeDefined();
    });

    it('navigate', () => {
        let link = '/note/new';
        let data = { event: 'new-note', title: 'Add new note', link: link };
        expect(historyTest.navigate(data)).toBeUndefined();
    });

    it('show page', () => {
        let data: HistoryData = { event: 'new-note', title: 'Add new note', link: 'note/new' };
        historyTest.showPage(data);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('not show page', () => {
        historyTest.showPage(null);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('show edit page', () => {
        let data: HistoryData = { event: 'edit-note', title: 'Edit note', link: 'note/123' };
        historyTest.showPage(data);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeTruthy();
    });

    it('show table page', () => {
        let data: HistoryData = { event: 'table-view', title: 'Batman table', link: '/' };
        historyTest.showPage(data);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });

    it('show table default', () => {
        let data: HistoryData = { event: 'qwe', title: 'Batman table', link: '/' };
        historyTest.showPage(data);
        expect(AppTest.modalModule.appContainer.classList.contains('close-content')).toBeFalsy();
    });
});



