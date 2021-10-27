import { 
    SET_ADDPRODUCT, 
    SET_CLEARPURCHASE, 
    SET_SUBPRODUCT  
} from "../types";


const INITIAL_STATE = {
    total: 0,
    product: [],
}

const PurchaseReducer = (state = INITIAL_STATE, action) => {
    let product, _product, _index, total;
    switch (action.type) {
        case SET_ADDPRODUCT:
            product = action.payload;
            _product = [...state.product];
            total = state.total;
            _index = _product.findIndex((p) => p.name === product.name);
             if (_index >= 0) {
                _product[_index].count += 1;
                total += _product[_index].price;
            } else if (_index < 0) {
                product.count = 1;
                total += product.price;
                _product.push(product);
            }
            return {...state, product: _product, total: total};
        case SET_SUBPRODUCT:
            product = action.payload;
            _product = [...state.product];
            total = state.total;
            _index = _product.findIndex((p) => p.name === product.name);
             if (_index >= 0) {
                 if (_product[_index].count === 0) {
                     _product.splice(_index, 1);
                    }
                    _product[_index].count -= 1;
                    total -= _product[_index].price;
            }
            return {...state, product: _product, total: total};
        case SET_CLEARPURCHASE:
            return {...state, product: [], total: 0, service: []}
        default:
            return state;
    }
}

export default PurchaseReducer;
