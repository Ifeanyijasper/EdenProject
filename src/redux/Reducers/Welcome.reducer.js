import {SET_WELCOME} from '../types';

const INITIAL_STATE = {
    entered: false,
};

const WelcomeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_WELCOME:
            return {...state, entered: true}    
        default:
            return state;
    }
}

export default WelcomeReducer;
