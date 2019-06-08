import React from 'react';
import classes from './Form.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/feedBackForm';

import SubmitButton from "../../component/UI/Form/SubmitButton/SubmitButton";
import ValidatorChain from "../../helper/Validation/ValidatorChain";
import FormElements from "./FormElements/FormElements";


        
export class Form extends React.PureComponent
{

    constructor(props){

        super(props);

        this.validatorChain = new ValidatorChain();

        this.props.setFormElements(this.getFormElements());

    }

    submitFormHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //const values = this.getValues();

        const errors = this.validateAll();

        //console.log(errors);

        const hasErrors = this.hasErrors(errors);

        if(!hasErrors){

            const formData = this.getFormData();

            this.props.submitButtonClickHandler(formData);

            //console.log(data);

            /*       const formError = this.props.validateOnSubmit(formData);

                   //console.log("formError " + formError);

                   if(!formError){

                       formData.append('token', this.props.createToken(formData));

                       //console.log(data);

                       //this.postRequestData = data;
                       //TODO
                       this.props.setFormData(formData);

                       //TODO init request
                       this.props.submitButtonClickHandler(formData);

                       /!*this.setState({
                           isRequestSend: true,
                           createdSendPost: true
                       });*!/

                   }else{

                       this.props.setFormError(formError);

                   }*/

            //this.props.submitButtonClickHandler(data);

        }else{

            this.setErrorsToState(errors);

        }

    };

    onInputChange = (event) => {

        const target = event.target;

        const name = target.name;
        const value = target.value;
        const fileList = target.type === 'file' ? target.files : null;

        let error = '';

        let resultElement = {};

        if(this.props.elements[name].validators !== undefined){

            if(fileList){
                error = this.validatorChain.validate(fileList, this.props.elements[name].validators);
                resultElement = {
                    name: name,
                    state: {
                        value: value,
                        error: error,
                        fileList: fileList
                    }
                };
            }else{
                error = this.validatorChain.validate(value, this.props.elements[name].validators);
                resultElement = {
                    name: name,
                    state: {
                        value: value,
                        error: error
                    }
                };
            }

        }else{
            if(fileList){
                resultElement = {
                    name: name,
                    state: {
                        value: value,
                        error: '',
                        fileList: fileList
                    }
                };
            }else{
                resultElement = {
                    name: name,
                    state: {
                        value: value,
                        error: ''
                    }
                };
            }
        }

        this.props.onInputChange(resultElement);

        if(this.props.onInputChangeOutside) this.props.onInputChangeOutside();

    };

    clearButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.props.setFormElements(this.getFormElements());

        if(this.props.onClearData) this.props.onClearData();

    };

    render(){

        const submitButton = <SubmitButton title={this.props.submitButtonValue} color={"#d4ffcf"} />;
        const clearButton = <SubmitButton title={"Очистить"} color={"#ccc8c8"} onClick={this.clearButtonClickHandler} />;


        return (

            <div className={classes.Wrapper}>

                <div className={classes.Form} >

                    <form action={"#"} className={classes.FormElements} onSubmit={this.submitFormHandler}>

                        <FormElements
                            formElements={this.props.elements}
                            inputChangeHandler={this.onInputChange}
                            formElementsState={this.props.formElements}
                        />

                        { this.props.formError && <div className={classes.FormError}>
                            <p>{ this.props.formError }</p>
                        </div> }

                        { clearButton }

                        { submitButton }

                    </form>

                </div>


            </div>
            
        );
    }

    getFormElements = () => {

        const formElements = {};

        for(let element in this.props.elements){

            if(this.props.elements[element].elementType === 'file'){

                formElements[element] = { value: '', fileList: null, error: ''};

            }

            formElements[element] = { value: this.props.elements[element].value, error: ''};

        }

        return formElements;

    };

    //return { elem1: 'error message', elem2: 'error message' }
    validateAll = () => {

        let elementsErrors = {};

        for(let elementName in this.props.elements){

            let error = '';

            //console.log(elementName);
            //console.log(this.props.elements[elementName]);

            if(this.props.elements[elementName].validators !== undefined){

                let valueToValidate =
                    this.props.elements[elementName].elementType === 'file' ?
                        this.props.formElements[elementName].fileList : this.props.formElements[elementName].value;

                error = this.validatorChain.validate(valueToValidate, this.props.elements[elementName].validators);

            }

            if(error){

                elementsErrors[elementName] = error;

            }

        }

        return elementsErrors;

    };

    getFormData = () => {

        const formData = new FormData();

        for(let elementName in this.props.elements){

            if(this.props.formElements.hasOwnProperty(elementName)){

                let value = this.props.formElements[elementName].fileList !== undefined ?
                    this.props.formElements[elementName].fileList[0] : this.props.formElements[elementName].value;

                formData.append(elementName, value);

            }else{

                console.error('Bad element name == ' + elementName);

            }

        }

        if(this.props.hiddenFields.length !== 0){

            for(let field of this.props.hiddenFields){

                formData.append(field.name, field.value);

            }

        }

        return formData;

    };

    hasErrors = (errors) => {

        if(typeof errors !== 'object' || Array.isArray(errors)){
            console.error("We need object");
            return false;
        }

        return Object.getOwnPropertyNames(errors).length > 0;

    };

    setErrorsToState = (errors) => {

        const formElements = {};

        for(let elementName in this.props.formElements){

            if(errors[elementName] !== undefined){
                formElements[elementName] = {
                    ...this.props.formElements[elementName],
                    error: errors[elementName]
                }
            }else{

                formElements[elementName] = {
                    ...this.props.formElements[elementName]
                }

            }

        }

        this.props.setFormElements(formElements);

    };

}

const mapStateToProps = state => {
    return {
        formError: state.feedBackForm.formError,
        formElements: state.feedBackForm.formElements,
        hiddenFields: state.feedBackForm.hiddenFields
    };
};

const mapDispatchToProps = dispatch => {
    return {
        /*setFormError: (formError) => dispatch({
            type: actionTypes.SET_FORM_ERROR,
            formError: formError
        }),*/
        setFormElements: (formElements) => dispatch({
            type: actionTypes.SET_ELEMENTS,
            formElements: formElements
        }),
        onInputChange: (element) => dispatch({
            type: actionTypes.INPUT_CHANGE,
            element: element
        })
    }
};


Form.propTypes = {

    elements: PropTypes.object.isRequired,
    submitButtonValue: PropTypes.string.isRequired,
    submitButtonClickHandler: PropTypes.func.isRequired,
    hiddenFields: PropTypes.array,

    //REDUX
    formError: PropTypes.string,
    formElements: PropTypes.object,

    setFormElements: PropTypes.func.isRequired,
    //setFormError: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,

    onInputChangeOutside: PropTypes.func,
    onClearData: PropTypes.func
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
        