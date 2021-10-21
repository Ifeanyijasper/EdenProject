import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import search from '../../utils/search';
import {setProducts} from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Product = (props) => {

    const { _products, onClick, loading } = props;

    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [text, setText] = useState('');
    const [filters] = useState([
        'Name',
        'Price',
        'Discount',
        'Likes',
    ])

    const active = () => {
        return 1;
    }

    useEffect(() => {
        if (_products?.length === 0) {
            setIsLoading(true);
            fetchProducts()
        }
        setProducts(_products);
        return () => {
            fetchProducts()
        }
    }, [_products]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/product/`);
            const products = await response.json();
            props.setProducts(products);
            setIsLoading(false)
            return products;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false)
        }
    };


    useEffect(() => {
        search(text, _products, setProducts, filter.toLocaleLowerCase());
    }, [text, filter, _products]);

    return (
        <div className={'w-full'}>
            <div className="flex justify-between items-center bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky top-10 md:top-14 z-30">
                <h2 className={'text-gray-800 text-left text-lg md:text-xl lg:text-xl'}>{products.length || 0} Product{products.length !== 1 && 's'}</h2>
                {loading && <i className="text-base px-2 py-0.5 rounded animate-pulse bg-green-200 text-green-700">Purchasing ...</i>}
                <div className="mt-2">
                    <Search
                        placeholder="Search"
                        newButton={false}
                        title={'Purchase'}
                        filters={filters}
                        filter={filter}
                        setFilter={setFilter}
                        text={text}
                        purchase={true}
                        setText={setText}
                        onClick={() => onClick()}
                    />
                </div>
            </div>
            <hr className={'my-4 mx-2'} />
            <div className={'py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'}>
                {products.map((product, index) => <ItemCard item={product} add={true} key={index} onClick={() => active()} />)}
            </div>
        </div>
    )
};

const mapStateToProps = ({data}) => {
    return {
        _products: data.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);