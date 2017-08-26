import {Validate} from './form.validate';
import {FormElements} from './form.elements';

export class FormComponent {
    public elements: HTMLFormElement[];
    public validateElements: HTMLFormElement[];
    public formData: FormElements = {};
    public state = true;
    private validation: Validate = {
        text: function (item: HTMLFormElement) {
            return /([^\s*$])/.test(item.value);
        },
        phone: function (item: HTMLFormElement) {
            return /\+?\d{5,}/.test(item.value);
        },
        email: function (item: HTMLFormElement) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(item.value);
        }
    };
    constructor(
        public form: HTMLFormElement
    ) {
        this.validateElements = Array.prototype.slice.call(this.form.querySelectorAll('[data-validate]'));
        this.elements = Array.prototype.slice.call(this.form.querySelectorAll('input, select'));
    }

    public getData() {
        for (let item of this.elements) {
            this.formData[`${item.getAttribute('name')}`] = item.value;
        }
        return this.formData;
    }

    public validate() {
        for (let item of this.validateElements) {
            let validateField = item.dataset.validate;
            let result = this.validation[validateField](item);
            if (!result) {
                item.classList.add('error');
                this.state = false;
            } else {
                item.classList.remove('error');
            }
        }
        return this.state;
    }
}
