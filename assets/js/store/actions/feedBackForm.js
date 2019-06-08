import axios from "axios";

export const INPUT_CHANGE = "INPUT_CHANGE";
export const SET_ELEMENTS = "SET_ELEMENTS";
export const SET_HIDDEN_FIELDS = "SET_HIDDEN_FIELDS";
export const SET_FORM_ERROR = "SET_FORM_ERROR";
export const SET_FORM_DATA = "SET_FORM_DATA";

export const CLEAR_STATE = "CLEAR_STATE";

export const REQUEST_START = "REQUEST_START";
export const REQUEST_FORM_ERROR = "REQUEST_FORM_ERROR";
export const REQUEST_SERVER_ERROR = "REQUEST_SERVER_ERROR";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";


export const postRequest = (url, formData) => {

    return dispatch => {

        dispatch({type: REQUEST_START});

        axios({
            method: "post",
            url: url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},

        })
            .then( response => {

                if(response.data.result && response.data.result === 'success'){

                    dispatch({type: REQUEST_SUCCESS});

                }else{

                    dispatch({type: REQUEST_FORM_ERROR, formError: response.data.error});

                }

            })
            .catch( error => {
                dispatch({type: REQUEST_SERVER_ERROR});
            });

    }

};