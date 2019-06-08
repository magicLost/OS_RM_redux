import React from 'react';
import classes from './Header.module.scss';
import PropTypes from 'prop-types';

import {formType, type} from "../../../ControlsFeature/ControlsFeature";
import ControlsFeature from "../../../ControlsFeature/ControlsFeature";
import ToolButtons from "../../../../component/ToolButtons/ToolButtons";
import Logo from "../../../../component/Logo/Logo";
import MainMenuButton from "../../../../component/UI/MainMenuButton/MainMenuButton";


class Header extends React.PureComponent
{

    previousY = 0;
    body = null;

    controlsFeatureConfig = {
        mainItemStyle: { backgroundColor: "#fff" }
    };

    state = {

        isShow: true

    };

    constructor(props){

        super(props);

    }

    componentDidMount = () => {

        this.body = document.body;
        window.addEventListener('scroll', this.windowScrollHandler, false);

    };

    windowScrollHandler = (event) => {

        const y = this.body.getBoundingClientRect().y;

        if(this.previousY > y){

            console.log("Hide");
            this.setState((prevState) => {

                if(prevState.isShow === true){
                    return { isShow: false };
                }

                return null;

            });

        }else{

            console.log("Show");
            this.setState((prevState) => {

                if(prevState.isShow === false){
                    return { isShow: true };
                }

                return null;

            });

        }

        this.previousY = y;

        //console.log(document.body.getBoundingClientRect());

    };


    render(){

        //const style = (!this.state.isShow) ? { display: "none"} : null;
        const wrapperClasses = this.state.isShow ?
            [classes.Wrapper, classes.ShowHeader].join(' ') : [classes.Wrapper, classes.HideHeader].join(' ');

        const toolButtonsClass = this.state.isShow ?
            [ classes.ToolButtons, classes.ShowToolButtons].join(' ') : [ classes.ToolButtons, classes.HideToolButtons ].join(' ');

        //console.log(headerClasses);

        return (

            <div
                className={classes.Header}
            >

                <div className={wrapperClasses}>

                    <div className={classes.Logo}>

                        <Logo
                            isHomepage={true}
                            homePagePath={''}
                        />

                    </div>

                    <div className={classes.Toolbar}>

                        <ControlsFeature
                            itemClickHandler={this.props.toolBarItemClick}
                            formType={formType.BOTTOM_HALF_CIRCLE}
                            type={type.TEXT}
                            itemsLength={this.props.toolbarItems.length}
                            items={this.props.toolbarItems}
                            isShowTitle={false}
                            isMainItemText={false}
                            config={this.controlsFeatureConfig}
                        />

                    </div>

                    <div className={classes.MainMenuButton}>

                        <MainMenuButton
                            title={"Меню"}
                            clickHandler={this.props.onShowMainMenu}
                        />

                    </div>


                </div>

                <div className={toolButtonsClass}>
                    <ToolButtons
                        callMeButtonClickHandler={this.props.showFeedBackFormButtonClickHandler}
                        activeSectionIndex={this.props.activeSectionIndex}
                        increaseSectionIndex={this.props.increaseSectionIndex}
                        decreaseSectionIndex={this.props.decreaseSectionIndex}
                        sectionsLength={this.props.toolbarItems.length}
                    />
                </div>

            </div>
            
        );
    }
}

Header.propTypes = {

    //["Главное", "Портфолио", "Контакты"]
    toolbarItems: PropTypes.array.isRequired,
    toolBarItemClick: PropTypes.func.isRequired,

    onShowMainMenu: PropTypes.func.isRequired,

    // activeSectionIndex, increaseSectionIndex, decreaseSectionIndex
    activeSectionIndex: PropTypes.number.isRequired,
    increaseSectionIndex: PropTypes.func.isRequired,
    decreaseSectionIndex: PropTypes.func.isRequired,

    showFeedBackFormButtonClickHandler: PropTypes.func.isRequired,

};

export default Header;
        