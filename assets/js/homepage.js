import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './../css/style.scss';
import Homepage from "./container/Pages/Homepage/Homepage";
/*
import {
    toolbarItemsArray,
    mainPresentationItems,
    mainPresentationItemsControls } from "./data/homepage_data";
import { mainMenuItems } from "./data/header_data";
import { categories, icons, photos } from "./data/portfolio_data";
*/

import homepageReducer from './store/reducer/homepage';

const reducer = combineReducers({
    homepage: homepageReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

const mountNode =  document.getElementById('homepage_mount_node');

ReactDOM.render(
    <Provider store={store}>
        <Homepage/>,
    </Provider>,
    mountNode
);