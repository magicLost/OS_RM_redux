import React from 'react';
import classes from './Button.module.scss';
        
const button = ({ title, onClick, style = null }) => {

    return (
        
        <button
            className={classes.Button}
            onClick={onClick}
            style={style}
        >
            { title }
        </button>
            
    );

};

export default button;
        