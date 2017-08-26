/// <reference path='../../../../node_modules/@types/jasmine/index.d.ts' />

/* tslint:disable */
import * as modalTemplate from '../modal/modal.layout.ejs';
/* tslint:enable */


import {FormComponent} from './form.component';


describe("Form", () => {
    let FormTest: FormComponent;

    beforeEach(() => {
        let customElement = document.createElement('div');
        customElement.innerHTML = modalTemplate;
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
                let customOption = document.createElement('option');
                customOption.text = 'New';
                customOption.value = 'new';
                item.add(customOption);
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
