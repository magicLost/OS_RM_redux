import React from 'react';
import classes from './Select.module.scss';


/*elementAttrs: PropTypes.object,
    value: PropTypes.string,
    labelValue: PropTypes.string,
    changeHandler: PropTypes.func,
    error: PropTypes.string*/

//options = [ { value: "tantamareski", title: "Тантамарески", selected: true} ]
const getOptions = (options) => {

    return options.map((option, index) => {
        //let selected = (value !== '') ? option.value === value : option.selected;

        return (
            <option
                value={option.value}
                key={option.value + index}
            >
                { option.title }
            </option>
        );

    })

};

const select = ({ value, elementAttrs, labelValue, changeHandler, options, error}) => {

    const optionsElements = getOptions(options, value);

    return (
        
        <div className={classes.SelectWrapper}>

            <label htmlFor={elementAttrs.id} className={classes.Label}>{labelValue}</label>

            <select
                className={classes.Select}
                onChange={changeHandler}
                {...elementAttrs}
                value={value}
            >

                { optionsElements }

            </select>

        </div>
            
    );

};

export default select;
        