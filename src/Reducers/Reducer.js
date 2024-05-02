import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_PACKAGES_REQUEST, FETCH_PACKAGES_SUCCESS, FETCH_PACKAGES_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL } from '../Actions/ActionTypes';

const initialState = {
    Orders: [],
    Packages: [],
    loading: false,
    error: null,
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        //fetch orders
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                Orders: action.payload,
            };
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //fetch packages
        case FETCH_PACKAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PACKAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                Packages: action.payload,
            };
        case FETCH_PACKAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //Add Clients
        case ADD_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                Orders: action.payload,
            };
        case ADD_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state
    }
}

export default Reducer;