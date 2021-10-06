import { SET_DATA, SET_GALLERY, SET_OBJDATA, SET_PRODUCTS, SET_SERVICES, SET_TEST } from '../types';

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

export const setProducts = (data) => {
    return {
        type: SET_PRODUCTS,
        payload: data,
    }
};

export const setServices = (data) => {
    return {
        type: SET_SERVICES,
        payload: data,
    }
};

export const setGallery = (data) => {
    return {
        type: SET_GALLERY,
        payload: data,
    }
};

export const setTestimonials = (data) => {
    return {
        type: SET_TEST,
        payload: data,
    }
};