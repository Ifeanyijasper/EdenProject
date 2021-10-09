import { SET_CHECKOUTS, SET_CLIENTS, SET_DATA, SET_FINANCES, SET_GALLERY, SET_OBJDATA, SET_PRODUCTS, SET_SERVICES, SET_TEST, SET_WORKERS } from '../types';

const INITIAL_STATE = {
    data: [],
    products: [],
    services: [],
    gallery: [],
    testimonials: [],
    clients: [],
    workers: [],
    finances: {},
    checkouts: [],
    objdata: {},
};

const DataReducer = (state = INITIAL_STATE, action) => {
    let products, services, gallery, testimonials, clients, workers, finances, checkouts;
    switch (action.type) {
        case SET_DATA:
            const data = action.payload;
            return { ...state, data };
        case SET_PRODUCTS:
            products = action.payload;
            return { ...state, products };
        case SET_SERVICES:
            services = action.payload;
            return { ...state, services };
        case SET_GALLERY:
            gallery = action.payload;
            return { ...state, gallery };
        case SET_TEST:
            testimonials = action.payload;
            return { ...state, testimonials };
        case SET_CLIENTS:
            clients = action.payload;
            return { ...state, clients };
        case SET_WORKERS:
            workers = action.payload;
            return { ...state, workers };
        case SET_FINANCES:
            finances = action.payload;
            return { ...state, finances };
        case SET_CHECKOUTS:
            checkouts = action.payload;
            return {...state, checkouts}; 
        case SET_OBJDATA:
            const objdata = action.payload;
            return {...state, objdata};  
        default:
            return state;
    }
}

export default DataReducer;