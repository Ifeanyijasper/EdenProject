import { ADD_CHECKOUT, ADD_CLIENT, ADD_GALLERY, ADD_PRODUCT, ADD_SERVICE, ADD_TEST, ADD_WORKER, DELETE_CHECKOUT, DELETE_CLIENT, DELETE_GALLERY, DELETE_PRODUCT, DELETE_SERVICE, DELETE_TEST, DELETE_WORKER, EDIT_CHECKOUT, EDIT_CLIENT, EDIT_GALLERY, EDIT_PRODUCT, EDIT_SERVICE, EDIT_TEST, EDIT_WORKER, SET_CHECKOUTS, SET_CLIENTS, SET_DATA, SET_FINANCES, SET_GALLERY, SET_OBJDATA, SET_PRODUCTS, SET_SERVICES, SET_TEST, SET_WORKERS } from '../types';

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
    let
        products,
        services,
        gallery,
        testimonials,
        clients,
        workers,
        finances,
        checkouts,
        data,
        id,
        index;
    
    switch (action.type) {
        case SET_DATA:
            data = action.payload;
            return { ...state, data };
        case SET_PRODUCTS:
            products = action.payload;
            return { ...state, products };
        case ADD_PRODUCT:
            data = action.payload;
            products = [...state.products];
            products.push(data);
            return { ...state, products: [...products] };
        case EDIT_PRODUCT:
            data = action.payload;
            console.log(data)
            index = state.products.findIndex(productIndex => {
                return productIndex?.id.toString() === data?.id.toString();
            });
            products = [...state.products];
            if (index >= 0) {
                products.splice(index, 1, data);
            }
            return { ...state, products: [...products] };
        case DELETE_PRODUCT:
            id = action.payload;
            console.log(id)
            index = state.products.findIndex(productIndex => {
                return productIndex?.id.toString() === id.toString();
            });
            products = [...state.products];
            if (index >= 0) {
                products.splice(index, 1);
            }
            return { ...state, products: [...products] };
        case SET_SERVICES:
            services = action.payload;
            return { ...state, services };
        case ADD_SERVICE:
            data = action.payload;
            services = [...state.services];
            services.push(data);
            return { ...state, services: [...services] };
        case EDIT_SERVICE:
            data = action.payload;
            index = state.services.findIndex(serviceIndex => {
                return serviceIndex?.id.toString() === data?.id.toString();
            });
            services = [...state.services];
            if (index >= 0) {
                services.splice(index, 1, data);
            }
            return { ...state, services: [...services] };
        case DELETE_SERVICE:
            id = action.payload;
            index = state.services.findIndex(serviceIndex => {
                return serviceIndex?.id.toString() === id.toString();
            });
            services = [...state.services];
            if (index >= 0) {
                services.splice(index, 1);
            }
            return { ...state, services: [...services] };
        case SET_GALLERY:
            gallery = action.payload;
            return { ...state, gallery };
        case ADD_GALLERY:
            data = action.payload;
            gallery = [...state.gallery];
            gallery.push(data);
            return { ...state, gallery: [...gallery] };
        case EDIT_GALLERY:
            data = action.payload;
            index = state.gallery.findIndex(galleryIndex => {
                return galleryIndex?.id.toString() === data?.id.toString();
            });
            gallery = [...state.gallery];
            if (index >= 0) {
                gallery.splice(index, 1, data);
            }
            return { ...state, gallery: [...gallery] };
        case DELETE_GALLERY:
            id = action.payload;
            index = state.gallery.findIndex(galleryIndex => {
                return galleryIndex.id.toString() === id.toString();
            });
            gallery = [...state.gallery];
            if (index >= 0) {
                gallery.splice(index, 1);
            }
            return { ...state, gallery: [...gallery] };
        case SET_TEST:
            testimonials = action.payload;
            return { ...state, testimonials };
        case ADD_TEST:
            data = action.payload;
            testimonials = [...state.testimonials];
            testimonials.push(data);
            return { ...state, testimonials: [...testimonials] };
        case EDIT_TEST:
            data = action.payload;
            index = state.testimonials.findIndex(testIndex => {
                return testIndex.id.toString() === data?.id.toString();
            });
            testimonials = [...state.testimonials];
            if (index >= 0) {
                testimonials.splice(index, 1, data);
            }
            return { ...state, testimonials: [...testimonials] };
        case DELETE_TEST:
            id = action.payload;
            index = state.testimonials.findIndex(testIndex => {
                return testIndex.id.toString() === id.toString();
            });
            testimonials = [...state.testimonials];
            if (index >= 0) {
                testimonials.splice(index, 1);
            }
            return { ...state, testimonials: [...testimonials] };
        case SET_CLIENTS:
            clients = action.payload;
            return { ...state, clients };
        case ADD_CLIENT:
            data = action.payload;
            clients = [...state.clients];
            clients.push(data);
            return { ...state, clients: [...clients] };
        case EDIT_CLIENT:
            data = action.payload;
            index = state.clients.findIndex(clientIndex => {
                return clientIndex?.id.toString() === data?.id.toString();
            });
            clients = [...state.clients];
            if (index >= 0) {
                clients.splice(index, 1, data);
            }
            return { ...state, clients: [...clients] };
        case DELETE_CLIENT:
            id = action.payload;
            index = state.clients.findIndex(clientIndex => {
                return clientIndex?.id.toString() === id.toString();
            });
            clients = [...state.clients];
            if (index >= 0) {
                clients.splice(index, 1);
            }
            return { ...state, clients: [...clients] };
        case SET_WORKERS:
            workers = action.payload;
            return { ...state, workers };
        case ADD_WORKER:
            data = action.payload;
            workers = [...state.workers];
            workers.push(data);
            return { ...state, workers: [...workers] };
        case EDIT_WORKER:
            data = action.payload;
            console.log(data);
            index = state.workers.findIndex(workerIndex => {
                return workerIndex?.id.toString() === data?.id.toString();
            });
            workers = [...state.workers];
            if (index >= 0) {
                workers.splice(index, 1, data);
            }
            return { ...state, workers: [...workers] };
        case DELETE_WORKER:
            id = action.payload;
            index = state.workers.findIndex(workerIndex => {
                return workerIndex.id.toString() === id.toString();
            });
            workers = [...state.workers];
            if (index >= 0) {
                workers.splice(index, 1);
            }
            return { ...state, workers: [...workers] };
        case SET_FINANCES:
            finances = action.payload;
            return { ...state, finances };
        case SET_CHECKOUTS:
            checkouts = action.payload;
            return { ...state, checkouts };
        case ADD_CHECKOUT:
            data = action.payload;
            checkouts = [...state.checkouts];
            checkouts.push(data);
            return { ...state, checkouts: [...checkouts] };
        case EDIT_CHECKOUT:
            data = action.payload;
            index = state.checkouts.findIndex(checkoutIndex => {
                return checkoutIndex.id.toString() === data?.id.toString();
            });
            checkouts = [...state.checkouts];
            if (index >= 0) {
                checkouts.splice(index, 1, data);
            }
            return { ...state, checkouts: [...checkouts] };
        case DELETE_CHECKOUT:
            id = action.payload;
            index = state.checkouts.findIndex(checkoutIndex => {
                return checkoutIndex.id.toString() === id.toString();
            });
            checkouts = [...state.checkouts];
            if (index >= 0) {
                checkouts.splice(index, 1);
            }
            return { ...state, checkouts: [...checkouts] };
        case SET_OBJDATA:
            const objdata = action.payload;
            return {...state, objdata};  
        default:
            return state;
    }
}

export default DataReducer;