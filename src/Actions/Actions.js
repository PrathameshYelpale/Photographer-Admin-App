import axios from "axios";
import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_PACKAGES_REQUEST, FETCH_PACKAGES_SUCCESS, FETCH_PACKAGES_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL, UPDATE_CLIENT_STATUS_REQUEST, UPDATE_CLIENT_STATUS_SUCCESS, UPDATE_CLIENT_STATUS_FAIL, FETCH_ORDERS_BY_ID_REQUEST, FETCH_ORDERS_BY_ID_SUCCESS, FETCH_ORDERS_BY_ID_FAIL } from './ActionTypes';

//Fetching Orders
export const fetchOrders = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_ORDERS_REQUEST });
        axios.get('http://localhost:5001/Orders')
        .then((response) => {
            dispatch({
                type: FETCH_ORDERS_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ORDERS_FAIL,
                payload: error.message
            });
        })
    }
}

//Fetching particular Orders by id
export const fetchOrdersById = (id) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ORDERS_BY_ID_REQUEST });
        axios.get(`http://localhost:5001/Orders/${id}`)
        .then((response) => {
            dispatch({
                type: FETCH_ORDERS_BY_ID_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ORDERS_BY_ID_FAIL,
                payload: error.message
            });
        })
    }
}

//Fetching Packages
export const fetchPackages = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_PACKAGES_REQUEST });
        axios.get('http://localhost:5001/Packages')
        .then((response) => {
            dispatch({
                type: FETCH_PACKAGES_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_PACKAGES_FAIL,
                payload: error.message
            });
        })
    }
}

//Adding Client
export const addClient = (clientData) => {
    return(dispatch) => {
        dispatch({ type: ADD_CLIENT_REQUEST });
        axios.post('http://localhost:5001/Orders', clientData)
        .then((response) => {
            dispatch({
                type: ADD_CLIENT_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: ADD_CLIENT_FAIL,
                payload: error.message
            });
        })
    }
}

//Updating Client Status
export const updateOrderStatus = (data) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_CLIENT_STATUS_REQUEST });
        axios.put(`http://localhost:5001/Orders/${data.id}`, data)
            .then((response) => {
                dispatch({
                    type: UPDATE_CLIENT_STATUS_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_CLIENT_STATUS_FAIL,
                    payload: error.message
                });
            })
    };
};