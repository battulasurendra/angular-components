export class ElementBase {
    value: string;
    label: string;
    placeholder: string;
    type: string;
    fieldname: string;
    prefix: string;
    required: boolean;
    readOnly: boolean;
    multiple: boolean;
    errormessages: ErrorMessage[];
    getApi: string;
    visibility: string;
    repeatField: boolean;
    options!: [{
        label: string;
        value: string;
    }];
    condition!: {
        fieldname: string;
        value: any;
    };

    constructor(defaultSet: {
        value?: string,
        label?: string,
        placeholder?: string,
        type?: string
        fieldname?: string,
        prefix?: string,
        required?: boolean,
        readOnly?: boolean,
        multiple?: boolean,
        visibility?: string,
        getApi?: string,
        repeatField?: boolean,
        options?: [{
            label: string;
            value: string;
        }],
        condition?: {
            fieldname: string;
            value: any;
        },
        errormessages?: ErrorMessage[]
    } = {}) {
        this.value = defaultSet.value || '';
        this.label = defaultSet.label || '';
        this.placeholder = defaultSet.placeholder || '';
        this.type = defaultSet.type || 'text';
        this.fieldname = defaultSet.fieldname || '';
        this.prefix = defaultSet.prefix || '';
        this.required = !!defaultSet.required;
        this.readOnly = !!defaultSet.readOnly;
        this.multiple = !!defaultSet.multiple;
        this.visibility = defaultSet.visibility || '';
        this.repeatField = !!defaultSet.repeatField;
        this.getApi = defaultSet.getApi || '';
        this.errormessages = defaultSet.errormessages || [];
    }
}

export interface ErrorMessage {
    message: string;
    pattern: string;
    type: string;
    min?: string;
    max?: string;
}

export interface DynamicFormData {
    formName: string;
    formTitle: string;
    formDescription: string;
    disclaimer: string;
    submitApi?: string;
    action?: string;
    repeatFields?: boolean;
    repeatBtnText?: string;
    elements: ElementBase[];
}

export interface SearchItem {
    _id: string;
    emailID: string;
}

