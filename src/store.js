import reducer from './Reducers/Reducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        reducer: reducer,
    },
});

export default store;