import React from 'react';
import classes from './MainPresentation.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarouselTranslate from "../Carousel/CarouselTranslate/CarouselTranslate";
import ControlsFeature, {formType, type} from "../ControlsFeature/ControlsFeature";
import ArrowCarouselControls from "../../component/ArrowCarouselControls/ArrowCarouselControls";

import {SET_MAIN_PRESENTATION_ACTIVE_INDEX} from "../../store/actions/homepage";


class MainPresentation extends React.PureComponent
{
    /*constructor(props){
        super(props);
    }*/

    contolsFeatureConfig = {
        mainDivStyle: { top: '-30px' },
        mainItemStyle: { backgroundColor: "#fafafa" }
    };

    /*state = {

        activeIndex: 0

    };*/

    increaseActiveIndex = () => {

        /*this.setState((prevState) => {

            if(prevState.activeIndex === this.props.carouselItems.length - 1)
                return null;

            return { activeIndex: prevState.activeIndex + 1 };

        })*/

        if(this.props.activeIndex < this.props.carouselItems.length - 1){

            this.props.setActiveIndex(this.props.activeIndex + 1);

        }

    };

    decreaseActiveIndex = () => {

        /*this.setState((prevState) => {

            if(prevState.activeIndex === 0)
                return null;

            return { activeIndex: prevState.activeIndex - 1 };

        })*/

        if(this.props.activeIndex > 0){

            this.props.setActiveIndex(this.props.activeIndex - 1);

        }


    };

    setActiveIndex = (index) => {

        //this.setState({ activeIndex: index });
       /* this.setState((prevState) => {

            if(prevState.activeIndex === index)
                return null;

            return { activeIndex: index };

        })*/


        if(this.props.activeIndex !== index){

            if(index >= 0 && this.props.activeIndex <= this.props.carouselItems.length - 1){

                this.props.setActiveIndex(index);

            }

        }

    };
    
    render(){

        const items = this.getCarouselItems();

        return (
        
            <div className={classes.MainPresentation}>

                <CarouselTranslate
                    itemsLength={this.props.carouselItems.length}
                    activeIndex={this.props.activeIndex}
                    decreaseActiveIndex={this.decreaseActiveIndex}
                    increaseActiveIndex={this.increaseActiveIndex}
                >

                    { items }

                </CarouselTranslate>

                <div className={classes.Arrows}>
                    <ArrowCarouselControls
                        increaseActiveIndex={this.increaseActiveIndex}
                        decreaseActiveIndex={this.decreaseActiveIndex}
                        activeIndex={this.props.activeIndex}
                        length={this.props.carouselItems.length}
                        arrowSizeClass={classes.ArrowsSize}
                    />
                </div>

                <div className={classes.MobileControls}>
                    <ControlsFeature
                        itemClickHandler={this.setActiveIndex}
                        formType={formType.CIRCLE}
                        type={type.SVG}
                        itemsLength={this.props.carouselControlsItems.length}
                        items={this.props.carouselControlsItems}
                        isShowTitle={true}
                        isMainItemText={false}
                        config={this.contolsFeatureConfig}
                    />
                </div>

            </div>
            
        );
    }

    getCarouselItems = () => {

        return this.props.carouselItems.map((value, index) => {

            return (

                <li
                    key={classes.MainPresentation + index}
                    className={classes.Item}
                >

                    <div className={classes.Content}>

                        <h3>{ value.title }</h3>
                        <p className={classes.Paragraph}>{ value.text }</p>
                        <a className={classes.Link} href={value.href}>Подробнее</a>

                    </div>

                </li>

            );

        });

    };

}

const mapStateToProps = state => {
    return {
        //state[this.props.stateName].activeMainPresentationIndex
        activeIndex: state.homepage.activeMainPresentationIndex
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveIndex: (activeIndex) => dispatch({
            type: SET_MAIN_PRESENTATION_ACTIVE_INDEX,
            activeIndex: activeIndex
        }),
    }
};

MainPresentation.propTypes = {

    //'homepage'
    //stateName: PropTypes.string.isRequired,
    carouselItems: PropTypes.array.isRequired,
    carouselControlsItems: PropTypes.array.isRequired
 
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPresentation);
        