import * as actionTypes from './../actions/homepage';

const initialState = {

    //SECTIONS
    activeSectionIndex: 1,

    //FORMS
    isShowFeedBackForm: false,
    feedBackFormType: '',

};

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.SET_ACTIVE_SECTION_INDEX:
            return {
                ...state,
                activeSectionIndex: action.activeSectionIndex
            };

        case actionTypes.SHOW_FEEDBACK_FORM:
            return {
                ...state,
                isShowFeedBackForm: true,
                feedBackFormType: action.feedBackFormType
            };

        case actionTypes.HIDE_FEEDBACK_FORM:
            return {
                ...state,
                isShowFeedBackForm: false
            };

        default: return state;
    }

};

export default reducer;