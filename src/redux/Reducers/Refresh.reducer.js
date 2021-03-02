import { SET_REFRESH } from '../types';

const INITIAL_STATE = {
    refresh: false,
}

const RefreshReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_REFRESH:
            const refresh = action.payload;
            return {...state, refresh};
        default:
            return state;
    }
}

export default RefreshReducer;