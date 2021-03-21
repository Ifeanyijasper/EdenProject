import { SET_DATA, SET_OBJDATA } from '../types';

const INITIAL_STATE = {
    data: [],
    objdata: {},
};

const DataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DATA:
            const data = action.payload;
            return {...state, data};   
        case SET_OBJDATA:
            const objdata = action.payload;
            return {...state, objdata};  
        default:
            return state;
    }
}

export default DataReducer;