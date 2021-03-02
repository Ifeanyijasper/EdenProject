import { SET_REFRESH } from '../types';

export const setRefresh = (value) => {
    return {
        type: SET_REFRESH,
        payload: value,
    }
}