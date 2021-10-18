import {
    ADD_CHECKOUT,
    ADD_CLIENT,
    ADD_FINANCE,
    ADD_GALLERY,
    ADD_PRODUCT,
    ADD_SERVICE,
    ADD_TEST,
    ADD_WORKER,
    DELETE_CHECKOUT,
    DELETE_CLIENT,
    DELETE_FINANCE,
    DELETE_GALLERY,
    DELETE_PRODUCT,
    DELETE_SERVICE,
    DELETE_TEST,
    DELETE_WORKER,
    EDIT_CHECKOUT,
    EDIT_CLIENT,
    EDIT_FINANCE,
    EDIT_GALLERY,
    EDIT_PRODUCT,
    EDIT_SERVICE,
    EDIT_TEST,
    EDIT_WORKER,
    SET_CHECKOUTS,
    SET_CLIENTS,
    SET_DATA,
    SET_FINANCES,
    SET_GALLERY,
    SET_OBJDATA,
    SET_PRODUCTS,
    SET_SERVICES,
    SET_TEST,
    SET_WORKERS
} from '../types';

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

export const editProduct = (data) => {
    return {
        type: EDIT_PRODUCT,
        payload: data,
    }
};

export const addProduct = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data,
    }
};

export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        payload: id,
    }
};

export const setServices = (data) => {
    return {
        type: SET_SERVICES,
        payload: data,
    }
};

export const addService = (data) => {
    return {
        type: ADD_SERVICE,
        payload: data,
    }
};

export const editService = (data) => {
    return {
        type: EDIT_SERVICE,
        payload: data,
    }
};

export const deleteService = (id) => {
    return {
        type: DELETE_SERVICE,
        payload: id,
    }
};

export const setGallery = (data) => {
    return {
        type: SET_GALLERY,
        payload: data,
    }
};

export const addGallery = (data) => {
    return {
        type: ADD_GALLERY,
        payload: data,
    }
};

export const editGallery = (data) => {
    return {
        type: EDIT_GALLERY,
        payload: data,
    }
};

export const deleteGallery = (id) => {
    return {
        type: DELETE_GALLERY,
        payload: id,
    }
};

export const setTestimonials = (data) => {
    return {
        type: SET_TEST,
        payload: data,
    }
};

export const addTestimonial = (data) => {
    return {
        type: ADD_TEST,
        payload: data,
    }
};

export const editTestimonial = (data) => {
    return {
        type: EDIT_TEST,
        payload: data,
    }
};

export const deleteTestimonial = (id) => {
    return {
        type: DELETE_TEST,
        payload: id,
    }
};

export const setClients = (data) => {
    return {
        type: SET_CLIENTS,
        payload: data,
    }
};

export const addClient = (data) => {
    return {
        type: ADD_CLIENT,
        payload: data,
    }
};

export const editClient = (data) => {
    return {
        type: EDIT_CLIENT,
        payload: data,
    }
};

export const deleteClient = (id) => {
    return {
        type: DELETE_CLIENT,
        payload: id,
    }
};

export const setWorkers = (data) => {
    return {
        type: SET_WORKERS,
        payload: data,
    }
};

export const addWorker = (data) => {
    return {
        type: ADD_WORKER,
        payload: data,
    }
};

export const editWorker = (data) => {
    return {
        type: EDIT_WORKER,
        payload: data,
    }
};

export const deleteWorker = (id) => {
    return {
        type: DELETE_WORKER,
        payload: id,
    }
};

export const setFinances = (data) => {
    return {
        type: SET_FINANCES,
        payload: data,
    }
};

export const addFinance = (data) => {
    return {
        type: ADD_FINANCE,
        payload: data,
    }
};

export const editFinance = (data) => {
    return {
        type: EDIT_FINANCE,
        payload: data,
    }
};

export const deleteFinance = (id) => {
    return {
        type: DELETE_FINANCE,
        payload: id,
    }
};

export const setCheckouts = (data) => {
    return {
        type: SET_CHECKOUTS,
        payload: data,
    }
};

export const addCheckout = (data) => {
    return {
        type: ADD_CHECKOUT,
        payload: data,
    }
};

export const editCheckout = (data) => {
    return {
        type: EDIT_CHECKOUT,
        payload: data,
    }
};

export const deleteCheckout = (id) => {
    return {
        type: DELETE_CHECKOUT,
        payload: id,
    }
};