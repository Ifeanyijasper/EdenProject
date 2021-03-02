import { CLEAR_POINTS, SET_POINTS } from '../types';


export const setPoint = (id, points, friend) => {
    return {
        type: SET_POINTS,
        payload: {id, points,friend},
    }
}

export const clearPoint = () => {
    return {
        type: CLEAR_POINTS,
    }
}