import axios from "axios";
import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_PACKAGES_REQUEST, FETCH_PACKAGES_SUCCESS, FETCH_PACKAGES_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL, UPDATE_CLIENT_STATUS_REQUEST, UPDATE_CLIENT_STATUS_SUCCESS, UPDATE_CLIENT_STATUS_FAIL, FETCH_ORDERS_BY_ID_REQUEST, FETCH_ORDERS_BY_ID_SUCCESS, FETCH_ORDERS_BY_ID_FAIL, ADD_PACKAGE_REQUEST, ADD_PACKAGE_SUCCESS, ADD_PACKAGE_FAIL } from './ActionTypes';

//Fetching Orders
export const fetchOrders = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_ORDERS_REQUEST });
        // axios.get('http://localhost:5001/Orders')
        axios.get('http://localhost:5500/clients')
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
        // axios.get(`http://localhost:5001/Orders/${id}`)
        axios.get(`http://localhost:5500/clients/${id}`)
            .then((response) => {
                dispatch({
                    type: FETCH_ORDERS_BY_ID_SUCCESS,
                    payload: response.data // Single order object
                });
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_ORDERS_BY_ID_FAIL,
                    payload: error.message
                });
            });
    };
};

//Fetching Packages
export const fetchPackages = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_PACKAGES_REQUEST });
        // axios.get('http://localhost:5001/Packages')
        axios.get('http://localhost:5500/packages')
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
    return (dispatch) => {
        dispatch({ type: ADD_CLIENT_REQUEST });
        // axios.post('http://localhost:5001/Orders', clientData)
        axios.post('http://localhost:5500/addClient', clientData)
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
export const updateOrderStatus = (id, updatedOrderData) => {
    return (dispatch) => {
        // Check for invalid id or status
        if (!id || !updatedOrderData.status) {
            console.error('Missing ID or status for updating order');
            return;
        }
        dispatch({ type: UPDATE_CLIENT_STATUS_REQUEST });

        // Send the full updated order data to the backend
        // axios.put(`http://localhost:5001/Orders/${id}`, updatedOrderData)
        axios.put(`http://localhost:5500/clients/${id}`, updatedOrderData)
            .then((response) => {
                dispatch({
                    type: UPDATE_CLIENT_STATUS_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.error('Error updating order status:', error);
                dispatch({
                    type: UPDATE_CLIENT_STATUS_FAIL,
                    payload: error.message
                });
            });
    };
};

//Adding Packages
export const addPackages = (packagesData) => {
    return (dispatch) => {
        dispatch({ type: ADD_PACKAGE_REQUEST });
        // axios.post('http://localhost:5001/Packages', packagesData)
        axios.post('http://localhost:5500/addPackages', packagesData)
            .then((response) => {
                dispatch({
                    type: ADD_PACKAGE_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: ADD_PACKAGE_FAIL,
                    payload: error.message
                });
            })
    }
}