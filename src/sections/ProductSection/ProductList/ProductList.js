import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';

import { Search, ItemCard, Activity2 } from '../../../components';
import styles from './ProductList.module.css';
import search from '../../../utils/search';
import { setData } from '../../../redux/Actions/Data.actions';
import { setProducts } from '../../../redux/Actions/Data.actions';
import { BASE_URL } from '../../../utils/globalVariable';
import { connect } from 'react-redux';

const ProductList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        setDetail,
        _products
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [filters] = useState([
        'Name',
        'Price',
        'Discount',
    ])

    const showDetails = (item) => {
        setIsDetail(true);
        setDetail(item)
    }

    useEffect(() => {
        search(text, _products, setProducts, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setProducts(_products)
        return () => {
            fetchProducts()
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/`);
            const products = await response.json();
            props.setProducts(products);
            return products;
        }
        catch (err) {
            console.log(err, 'Received error');
        }
    };

    return (
        <div className={`w-full min-h-full relative`}>
            <h1 className={`text-gray-800 text-left text-xl lg:text-2xl pb-1 sticky top-3 z-40`}>Products</h1>
            <div className="sticky top-3 z-40">
                <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={false} title={'Product'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            { text.length <= 0 &&   <>
                    <h2 className={`text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl pb-1 font-semibold`}>Top 6 Products</h2>
                    <hr className={`w-4/5 mx-auto`} />
                    <div className={`py-10 px-12 grid grid-cols-3 gap-7 flex justify-center`}>
                        {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6)&&
                        <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />))}
                    </div>
                </>
            }
            <hr className={`w-4/5 mx-auto mt-2`} />
                <h2 className={`py-4 text-gray-600 text-left md:text-center text-lg md:text-xl lg:text-xl font-semibold`}>{products.length} Product{products.length !== 1 && 's'}</h2>
            <hr className={`w-4/5 mx-auto mb-2`} />
            <div className={`py-10 px-12 grid grid-cols-3 gap-7 flex justify-center`}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({data}) => {
    return {
        _products: data.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);