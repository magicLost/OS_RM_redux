import * as actionTypes from './../actions/homepage';

const initialState = {

    //SECTIONS
    activeSectionIndex: 1,

    //FORMS
    isShowFeedBackForm: false,
    feedBackFormType: '',

    isShowMainMenu: false,

    //MAIN PRESENTATION
    activeMainPresentationIndex: 0

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

        case actionTypes.SHOW_MAIN_MENU:
            return {
                ...state,
                isShowMainMenu: true
            };

        case actionTypes.HIDE_MAIN_MENU:
            return {
                ...state,
                isShowMainMenu: false
            };

        case actionTypes.SET_MAIN_PRESENTATION_ACTIVE_INDEX:
            return {
                ...state,
                activeMainPresentationIndex: action.activeIndex
            };

        default: return state;
    }

};

export default reducer;