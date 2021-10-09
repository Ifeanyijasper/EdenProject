import { SET_CHECKOUTS, SET_CLIENTS, SET_DATA, SET_FINANCES, SET_GALLERY, SET_OBJDATA, SET_PRODUCTS, SET_SERVICES, SET_TEST, SET_WORKERS } from '../types';

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

export const setClients = (data) => {
    return {
        type: SET_CLIENTS,
        payload: data,
    }
};

export const setWorkers = (data) => {
    return {
        type: SET_WORKERS,
        payload: data,
    }
};

export const setFinances = (data) => {
    return {
        type: SET_FINANCES,
        payload: data,
    }
};

export const setCheckouts = (data) => {
    return {
        type: SET_CHECKOUTS,
        payload: data,
    }
};