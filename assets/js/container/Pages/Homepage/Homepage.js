import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import classes from './Homepage.module.scss';
import {HIDE_FEEDBACK_FORM, SET_ACTIVE_SECTION_INDEX, SHOW_FEEDBACK_FORM} from "../../../store/actions/homepage";

        
class Homepage extends React.PureComponent
{

    html = null;
    body = null;

    isTantamareskiSectionCreated = false;
    isContactsSectionCreated = false;

    mainSectionClasses = classes.Section;
    portfolioSectionClasses = classes.Section;
    contactsSectionClasses = classes.Section;

    constructor(props){
        super(props);

        this.html = document.querySelector("html");
        this.body = document.body;
    }
    
    render(){
        return (
        
            <div className={classes.Homepage}>
                <h1>Homepage</h1>
                <h5>Section index: {this.props.activeSectionIndex}</h5>
            </div>
            
        );
    }
}

const mapStateToProps = state => {

    return {

        activeSectionIndex: state.homepage.activeSectionIndex,

        isShowFeedBackForm: state.homepage.isShowFeedBackForm

    }
};

const mapDispatchToProps = dispatch => {

    return {

        /*setFeedBackFormHiddenFields: (hiddenFields) => dispatch({
            type: SET_HIDDEN_FIELDS,
            hiddenFields: hiddenFields
        }),*/
        onShowFeedBackForm: (formType) => dispatch({
            type: SHOW_FEEDBACK_FORM,
            feedBackFormType: formType
        }),
        closeFeedBackForm: () => dispatch({
            type: HIDE_FEEDBACK_FORM
        }),
        setActiveSectionIndex: (activeSectionIndex) => dispatch({
            type: SET_ACTIVE_SECTION_INDEX,
            activeSectionIndex: activeSectionIndex
        })

    }

};


Homepage.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
        