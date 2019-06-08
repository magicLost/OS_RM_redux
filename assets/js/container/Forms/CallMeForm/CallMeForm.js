import React from 'react';
import classes from './CallMeForm.module.scss';
import PropTypes from 'prop-types';
import FeedBackForm from "../../FeedBackForm/FeedBackForm";
        
class CallMeForm extends React.PureComponent
{
    /*constructor(props){
        super(props);
    }*/

    createToken = (formData) => {

        const name = formData.has('name') ? formData.get('name') : '';
        const email = formData.has('email') ? formData.get('email') : '';
        const phone = formData.has('phone') ? formData.get('phone') : '';

        let stringToHash = phone + "34dse8" + email + "A23dsf34fsd" + encodeURI(name);

        let token = btoa(stringToHash);

        if(token.length >  64){

            token = token.substr(0, 63);

        }

        return token;

    };

    validateOnSubmit = (formData) => {

        /*const name = this.props.formData.has('name') ? this.props.formData.get('name') : '';
        const email = this.props.formData.has('email') ? this.props.formData.get('email') : '';
        const phone = this.props.formData.has('phone') ? this.props.formData.get('phone') : '';*/

        const name = formData.has('name') ? formData.get('name') : '';
        const email = formData.has('email') ? formData.get('email') : '';
        const phone = formData.has('phone') ? formData.get('phone') : '';

        if(name === ''){
            return 'Представьтесь, пожалуйста.';
        }

        if(email === '' && phone === ''){
            return "Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.";
        }

        return '';

    };

    render(){
        return (
        
            <div className={classes.CallMeForm}>

                <FeedBackForm

                    url={this.props.url}
                    elements={this.props.elements}
                    submitButtonValue={this.props.submitButtonValue}

                    validateOnSubmit={this.validateOnSubmit}
                    createToken={this.createToken}

                    successOKButtonClickHandler={this.props.successOKButtonClickHandler}

                    //hiddenFields={this.props.hiddenFields}

                />

            </div>
            
        );
    }
}

CallMeForm.propTypes = {

    url: PropTypes.string.isRequired,
    elements: PropTypes.object.isRequired,
    submitButtonValue: PropTypes.string.isRequired,

    successOKButtonClickHandler: PropTypes.func.isRequired,

    //hiddenFields: PropTypes.array,
};

export default CallMeForm;
        