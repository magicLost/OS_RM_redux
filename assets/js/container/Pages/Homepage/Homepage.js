import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import commonClasses from '../../../../css/CommonClasses.module.scss';
import classes from './Homepage.module.scss';

import CloseButton from "../../../component/UI/CloseButton/CloseButton";
import Modal from "../../../component/UI/Modal/Modal";
import HomepageModalFormManager from "../../ModalFormManager/HomepageModalFormManager/HomepageModalFormManager";
import MainMenu from "../../MainMenu/MainMenu";
import Header from "../Partial/Header/Header";
import Contacts from "../Partial/Contacts/Contacts";
import MainContent from "./Content/MainContent/MainContent";
import PortfolioContent from "./Content/PortfolioContent/PortfolioContent";


import {
    HIDE_FEEDBACK_FORM, HIDE_MAIN_MENU,
    SET_ACTIVE_SECTION_INDEX,
    SHOW_FEEDBACK_FORM,
    SHOW_MAIN_MENU
} from "../../../store/actions/homepage";
import {CLEAR_STATE, SET_HIDDEN_FIELDS} from "../../../store/actions/feedBackForm";

import {formTypes} from "../../../data/form_types";
import {mainMenuItems} from "../../../data/mainMenu_data";
import {
    toolbarItemsArray,
    mainPresentationItems,
    mainPresentationItemsControls } from "../../../data/homepage_data";
import { categories, icons, photos } from "../../../data/portfolio_data";


class Homepage extends React.PureComponent
{

    html = null;
    body = null;

    isPortfolioSectionCreated = false;
    isContactsSectionCreated = false;

    mainSectionClasses = classes.Section;
    portfolioSectionClasses = classes.Section;
    contactsSectionClasses = classes.Section;

    constructor(props){
        super(props);

        this.html = document.querySelector("html");
        this.body = document.body;
    }

    //SECTIONS
    toolBarButtonClick = (index) => {

        if(this.props.activeSectionIndex !== index){

            if(index >= 0 && index <= 2){

                if(index === 0 && !this.isPortfolioSectionCreated){

                    this.isPortfolioSectionCreated = true;

                }

                if(index === 2 && !this.isContactsSectionCreated){

                    this.isContactsSectionCreated = true;

                }

                this.setClassesByActiveIndex(index, this.props.activeSectionIndex);

                this.html.scrollTop = 0;

                this.props.setActiveSectionIndex(index);

            }

        }

    };

    decreaseSectionIndex = (event) => {

        if(this.props.activeSectionIndex > 0){

            const newIndex = this.props.activeSectionIndex - 1;

            if(newIndex === 0 && !this.isPortfolioSectionCreated){

                this.isPortfolioSectionCreated = true;

            }

            this.setClassesByActiveIndex(newIndex, this.props.activeSectionIndex);

            this.html.scrollTop = 0;

            this.props.setActiveSectionIndex(newIndex);

        }

    };

    increaseSectionIndex = (event) => {

        if(this.props.activeSectionIndex < 2){

            const newIndex = this.props.activeSectionIndex + 1;

            if(newIndex === 2 && !this.isContactsSectionCreated){

                this.isContactsSectionCreated = true;

            }

            this.setClassesByActiveIndex(newIndex, this.props.activeSectionIndex);

            this.html.scrollTop = 0;

            this.props.setActiveSectionIndex(newIndex);

        }

    };

    //FORMS
    onShowCallMeForm = () => {
        this.props.setFeedBackFormHiddenFields([]);
        this.props.onShowFeedBackForm(formTypes.CALL_ME);
    };

    onShowCallMeFormWithSample = (arrayWithHiddenField) => {
        this.props.setFeedBackFormHiddenFields(arrayWithHiddenField);
        this.props.onShowFeedBackForm(formTypes.CALL_ME_WITH_SAMPLE);
    };

    closeModalFormButtonClickHandler = (event) => {

        event.stopPropagation();
        event.preventDefault();

        this.props.clearFeedBackFormState();
        this.props.closeFeedBackForm();

    };

    //MAIN MENU
    onShowMainMenu = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //console.log("mainMenuButtonClickHandler");

        this.body.classList.add(commonClasses.StopScrolling);

        this.props.showMainMenu();

    };

    onHideMainMenu = (event) => {

        if(event){
            event.preventDefault();
            event.stopPropagation();
        }

        document.body.classList.remove(commonClasses.StopScrolling);

        this.props.hideMainMenu();

    };

    
    render(){
        return (
        
            <div className={classes.Homepage}>

                <header>

                    <Header
                        toolbarItems={toolbarItemsArray}
                        toolBarItemClick={this.toolBarButtonClick}
                        onShowMainMenu={this.onShowMainMenu}
                        activeSectionIndex={this.props.activeSectionIndex}
                        increaseSectionIndex={this.increaseSectionIndex}
                        decreaseSectionIndex={this.decreaseSectionIndex}
                        showFeedBackFormButtonClickHandler={this.onShowCallMeForm}
                    />

                    { this.props.isShowMainMenu &&
                        <nav className={classes.Navigation}>
                            <MainMenu
                                items={mainMenuItems}
                                closeButtonClickHandler={this.onHideMainMenu}
                            />
                        </nav>
                    }

                </header>

                <main>

                    <section
                        className={this.mainSectionClasses}
                        style={(this.props.activeSectionIndex !== 1) ? { display: 'none'} : null}
                    >
                        <MainContent
                            mainPresentationItems={mainPresentationItems}
                            mainPresentationItemsControls={mainPresentationItemsControls}
                        />
                    </section>

                    { this.isPortfolioSectionCreated &&
                        <section
                            className={this.portfolioSectionClasses}
                            style={(this.props.activeSectionIndex !== 0) ? { display: 'none'} : null}
                        >
                            <PortfolioContent
                                categories={categories}
                                icons={icons}
                                photos={photos}
                                showFeedBackFormHandler={this.onShowCallMeFormWithSample}
                            />
                        </section>
                    }

                </main>

                <footer>

                    { this.isContactsSectionCreated &&
                        <div
                            className={this.contactsSectionClasses}
                            style={(this.props.activeSectionIndex !== 2) ? { display: 'none'} : null}
                        >

                            <Contacts/>

                        </div>
                    }

                </footer>

                <Modal show={this.props.isShowFeedBackForm} backdropClickHandler={this.closeModalFormButtonClickHandler}>

                    <CloseButton clickHandler={this.closeModalFormButtonClickHandler}/>

                    <HomepageModalFormManager
                        urlCallMeForm={'http://public.local/call_me'}
                        urlCallMeFormWithSample={'http://public.local/call_me_sample'}
                        successOKButtonClickHandler={this.props.closeFeedBackForm}
                    />

                </Modal>


            </div>
            
        );
    }

    setClassesByActiveIndex = (activeIndex, prevIndex) => {

        switch(activeIndex){

            case 1:

                if(prevIndex === 0){

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromRightToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }else{

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromLeftToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }

                break;

            case 0:

                this.mainSectionClasses = classes.Section;
                this.portfolioSectionClasses = [ classes.Section, classes.AnimationMoveFromLeftToCenter ].join(' ');
                this.contactsSectionClasses = classes.Section;
                break;

            case 2:
                this.mainSectionClasses = classes.Section;
                this.portfolioSectionClasses = classes.Section;
                this.contactsSectionClasses = [ classes.Section, classes.AnimationMoveFromRightToCenter ].join(' ');
                break;

            default: console.error("no implementation for index == " + activeIndex);

        }

    };

}

const mapStateToProps = state => {

    return {

        activeSectionIndex: state.homepage.activeSectionIndex,

        isShowFeedBackForm: state.homepage.isShowFeedBackForm,

        isShowMainMenu: state.homepage.isShowMainMenu

    }
};

const mapDispatchToProps = dispatch => {

    return {

        setFeedBackFormHiddenFields: (hiddenFields) => dispatch({
            type: SET_HIDDEN_FIELDS,
            hiddenFields: hiddenFields
        }),
        onShowFeedBackForm: (formType) => dispatch({
            type: SHOW_FEEDBACK_FORM,
            feedBackFormType: formType
        }),
        closeFeedBackForm: () => dispatch({
            type: HIDE_FEEDBACK_FORM
        }),
        clearFeedBackFormState: () => dispatch({
            type: CLEAR_STATE
        }),
        setActiveSectionIndex: (activeSectionIndex) => dispatch({
            type: SET_ACTIVE_SECTION_INDEX,
            activeSectionIndex: activeSectionIndex
        }),
        showMainMenu: () => dispatch({
            type: SHOW_MAIN_MENU
        }),
        hideMainMenu: () => dispatch({
            type: HIDE_MAIN_MENU
        }),
    }

};


Homepage.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
        