/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../node_modules/@types/jasmine-expect/index.d.ts' />

import {JST} from '../helpers/jst';

declare let JST: JST;
const modalTemplate = JST['modal/layout'];
import {FormComponent} from './form.component';


describe("Form", () => {
    let FormTest: FormComponent;
    let selecteOptions = [ 'old', 'new', 'tomato', 'potato', 'not new', 'not old' ];

    beforeEach(() => {
        let customElement = document.createElement('div');

        customElement.innerHTML = modalTemplate({
            state: 'new',
            selectList: selecteOptions,
            data: []
        });

        let form: HTMLFormElement = <HTMLFormElement>customElement.querySelector('[data-form]');

        FormTest = new FormComponent(form);
    });

    it('validate', () => {
        expect(FormTest.validate).toBeFunction();
    });

    it('validate valid', () => {
        for (let item of FormTest.validateElements) {
            switch (item.getAttribute('data-validate')) {
                case 'email':
                    item.value = 'test@testoff.com';
                    break;
                case 'phone':
                    item.value = '+371 292929';
                    break;
                default:
                    item.value = 'testvalue';
                    break;
            }
        }
        expect(FormTest.validate()).toBeTruthy();
    });


    it('validate invalid email', () => {
        for (let item of FormTest.validateElements) {
            switch (item.getAttribute('data-validate')) {
                case 'email':
                    item.value = 'test123';
                    break;
                case 'phone':
                    item.value = '+371 292929';
                    break;
                default:
                    item.value = 'testvalue';
                    break;
            }
        }
        expect(FormTest.validate()).toBeFalsy();
    });


    it('validate invalid phone', () => {
        for (let item of FormTest.validateElements) {
            switch (item.getAttribute('data-validate')) {
                case 'email':
                    item.value = 'test123@wqe.com';
                    break;
                case 'phone':
                    item.value = 'a123';
                    break;
                default:
                    item.value = 'testvalue';
                    break;
            }
        }
        expect(FormTest.validate()).toBeFalsy();
    });

    it('form data', () => {
        for (let item of FormTest.elements) {
            switch (item.getAttribute('data-validate')) {
                case 'email':
                    item.value = 'test@testoff.com';
                    break;
                case 'phone':
                    item.value = '+371 292929';
                    break;
                default:
                    item.value = 'testvalue';
                    break;
            }

            if (item.name === 'status') {
                item.value = 'new';
            }
        }
        expect(FormTest.getData()).toEqual({
            'name': 'testvalue',
            'surname': 'testvalue',
            'phone': '+371 292929',
            'status': 'new',
            'email': 'test@testoff.com'
        });
    });
});
