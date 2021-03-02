import {CLEAR_POINTS, SET_POINTS} from '../types';

const INI_STATE = {
    table: [],
}

const PointsReducer = (state = INI_STATE, action) => {
    switch (action.type) {
        case SET_POINTS:
            const points = action.payload;
            const table = [...state.table];
            table.push(points);
            return {...state, table}
        case CLEAR_POINTS:
            return {...state, table: []};
        default:
            return state;
    }
}

export default PointsReducer;