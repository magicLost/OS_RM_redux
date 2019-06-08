import React from 'react';
import classes from './MainMenu.module.scss';
import PropTypes from 'prop-types';

import MenuTab from "./MenuTab/MenuTab";
import CloseButton from "../../component/UI/CloseButton/CloseButton";

        
class MainMenu extends React.PureComponent
{
    backDropClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();


        if(event.target.className !== classes.MainMenu) return;

        this.props.closeButtonClickHandler();

    };
    
    render(){
        return (


            <div
                className={classes.MainMenu}
                onClick={this.backDropClickHandler}
            >

                <div className={classes.Wrapper}>

                    <div className={classes.Menu}>

                        <CloseButton
                            color={"black"}
                            clickHandler={this.props.closeButtonClickHandler}
                        />

                        <MenuTab items={this.props.items} layer={1}/>

                    </div>

                </div>

            </div>
            
        );
    }
}

MainMenu.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    closeButtonClickHandler: PropTypes.func.isRequired

};

export default MainMenu;
        