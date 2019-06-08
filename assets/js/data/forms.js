export const callMe =  {

    'name': {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'name',
            id: 'name123',
            placeholder: 'Олимпиада'
        },
        labelValue: "Ваше имя",
        validators: {
            required: { errorMessage: "Как к вам обращаться?"},
            regex: {
                pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
                errorMessage: "Недопустимый символ."
            },
            length: {min: 2, max: 100, errorMessages: { min: "Минимум 2 символа.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    'email': {

        elementType: 'input',
        elementAttrs: {
            type: 'email',
            name: 'email',
            id: 'email123',
            placeholder: 'example@mail.ru'
        },
        labelValue: "Ваш электронный адрес",
        value: ''

    },

    'phone': {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '921-586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validators: {
            regex: {
                pattern: /[+0-9][0-9()-]*/,
                errorMessage: "Недопустимый символ."
            },
            length: {min: 7, max: 100, errorMessages: { min: "Минимум 7 символов.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    'comment': {
        elementType: 'textarea',
        resize: true,
        elementAttrs: {
            name: 'comment',
            id: 'comment123',
            placeholder: 'Я бы хотел(а)...',
            rows: 3
        },
        labelValue: "Ваш комментарий",
        value: ''
    }
};

export const calcTantamareskiPrice = {

    type: {
        elementType: 'select',
        elementAttrs: {
            name: 'type',
            id: 'type123'
        },
        labelValue: "Вид фигуры",
        options: [
                { value: "tantamareski", title: "Тантамарески", selected: false},
                { value: "figure", title: "Ростовая фигура", selected: true}
            ],
        value: 'figure'
    },

    material: {
        elementType: 'select',
        elementAttrs: {
            name: 'material',
            id: 'material123'
        },
        labelValue: "Материал",
        options: [
            { value: "cartoon", title: "Картон", selected: true},
            { value: "plastic", title: "Пластик", selected: false},
            { value: "gold", title: "Золото", selected: false}
        ],
        value: 'cartoon'
    },

    //depth - select

    height: {
        elementType: 'input',
        elementAttrs: {
            type: 'number',
            name: 'height',
            id: 'height123',
            placeholder: '1.25'
        },
        labelValue: "Высота, м:",
        validators: {
            required: { errorMessage: "Укажите высоту..."},
            regex: {
                pattern: /[0-9]*/,
                errorMessage: "Недопустимый символ."
            },
        },
        value: ''
    },

    width: {
        elementType: 'input',
        elementAttrs: {
            type: 'number',
            name: 'width',
            id: 'width123',
            placeholder: '0.5'
        },
        labelValue: "Ширина, м:",
        validators: {
            required: { errorMessage: "Укажите ширину..."},
            regex: {
                pattern: /[0-9]*/,
                errorMessage: "Недопустимый символ."
            },
        },
        value: ''
    },

};