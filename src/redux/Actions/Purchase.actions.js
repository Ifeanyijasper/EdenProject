import { 
    SET_ADDPRODUCT,
    SET_CLEARPURCHASE,
    SET_SUBPRODUCT,
} from "../types"


export const setAddToCart = (id, name, price, count) => {
    return {
        type: SET_ADDPRODUCT,
        payload: {id, name, price, count}
    }
}

export const setSubFromCart = (id, name, price, count) => {
    return {
        type: SET_SUBPRODUCT,
        payload: {id, name, price, count},
    }
}

export const setClearPurchase = () => {
    return {
        type: SET_CLEARPURCHASE,
    }
}
