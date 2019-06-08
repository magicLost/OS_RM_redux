import * as actionTypes from '../actions/feedBackForm';

const initialState = {

    formData: null,
    formError: '',
    hiddenFields: [],

    //formElements :
    //elem1: { name, value, fileList?}

    isRequestSuccess: false,
    isRequestError: false,
    isRequestLoading: false

};

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.CLEAR_STATE:
            return {
                ...initialState
            };

        case actionTypes.SET_ELEMENTS:
            return {
                ...state,
                formError: '',
                formElements: {
                    ...action.formElements
                }
            };

        case actionTypes.SET_HIDDEN_FIELDS:
            return {
                ...state,
                hiddenFields: action.hiddenFields
            };

        case actionTypes.INPUT_CHANGE:
            return {
                ...state,
                formError: '',
                formElements: {
                    ...state.formElements,
                    [action.element.name]: action.element.state
                }
            };

        case actionTypes.SET_FORM_ERROR:
            return {
                ...state,
                formError: action.formError
            };

        case actionTypes.SET_FORM_DATA:
            return {
                ...state,
                formData: action.formData
            };

        case actionTypes.REQUEST_START:
            return {
                ...state,
                isRequestLoading: true,
                isRequestError: false,
                isRequestSuccess: false,
                formError: ''
            };

        case actionTypes.REQUEST_FORM_ERROR:
            return {
                ...state,
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: false,
                formError: action.data.formError
            };

        case actionTypes.REQUEST_SERVER_ERROR:
            return {
                ...state,
                isRequestLoading: false,
                isRequestError: true,
                isRequestSuccess: false
            };

        case actionTypes.REQUEST_SUCCESS:
            return {
                ...state,
                isRequestLoading: false,
                isRequestError: false,
                isRequestSuccess: true
            };

        default: return state;

    }

};

export default  reducer;