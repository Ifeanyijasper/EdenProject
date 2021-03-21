import { SET_DATA, SET_OBJDATA } from '../types';

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data,
    }
};

export const setObjData = (data) => {
    return {
        type: SET_OBJDATA,
        payload: data,
    }
}
