import React from 'react';
import classes from './HomepageModalFormManager.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { callMe } from "../../../data/forms";
import { formTypes } from "../../../data/form_types";
import CallMeForm from "../../Forms/CallMeForm/CallMeForm";

class HomepageModalFormManager extends React.PureComponent
{
    constructor(props){
        super(props);
    }
    
    render(){

        const form = this.renderForm();

        return (
        
            <div className={classes.HomepageModalFormManager}>

                { form }

            </div>
            
        );
    }

    renderForm = () => {

        if(this.props.isShowFeedBackForm !== true){
            return null;
        }

        switch(this.props.feedBackFormType){
            case formTypes.CALL_ME:
                return (
                    <CallMeForm
                        url={this.props.urlCallMeForm}
                        elements={callMe}
                        submitButtonValue={"Отправить"}
                        successOKButtonClickHandler={this.props.successOKButtonClickHandler}
                    />
                );
            case formTypes.CALL_ME_WITH_SAMPLE:
                return (
                    <CallMeForm
                        url={this.props.urlCallMeFormWithSample}
                        elements={callMe}
                        submitButtonValue={"Отправить"}
                        successOKButtonClickHandler={this.props.successOKButtonClickHandler}
                    />
                );

            default: console.error("Wrong form type = ", this.props.feedBackFormType); return null;
        }

    };

}

const mapStateToProps = state => {

    return {
        isShowFeedBackForm: state.homepage.isShowFeedBackForm,
        feedBackFormType: state.homepage.feedBackFormType,
        //hiddenFields: state.tantamareski.hiddenFields
    };

};

HomepageModalFormManager.propTypes = {

    urlCallMeForm: PropTypes.string.isRequired,
    urlCallMeFormWithSample: PropTypes.string.isRequired,
    successOKButtonClickHandler: PropTypes.func.isRequired

};

export default connect(mapStateToProps)(HomepageModalFormManager);
        