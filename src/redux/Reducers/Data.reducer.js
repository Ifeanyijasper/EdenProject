import { SET_DATA } from '../types';

const INITIAL_STATE = {
    data: [],
};

const DataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DATA:
            const data = action.payload;
            return {...state, data};    
        default:
            return state;
    }
}

export default DataReducer;