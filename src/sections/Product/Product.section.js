import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import styles from './Product.module.css';
import search from '../../utils/search';
import {setData} from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Product = (props) => {

    const { _products } = props;

    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState([]);
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
        setProducts(_products)
    },[]);

    useEffect(() => {
        search(text, _products, setProducts, filter.toLocaleLowerCase());
    }, [text]);

    return (
        <div className={'w-full'}>
            <div className="flex justify-between items-center bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky -top-4 md:top-14 z-30">
                <h2 className={'text-gray-800 text-left text-xl lg:text-2xl'}>{products.length || 0} Prouct{products.length !== 1 && 's'}</h2>
                <Search
                    placeholder="Search"
                    newButton={false}
                    title={'Product'}
                    filters={filters}
                    filter={filter}
                    setFilter={setFilter}
                    text={text}
                    setText={setText} />
            </div>
            <hr className={'my-4 mx-2'} />
            <div className={'py-10 grid grid-cols-4 gap-7'}>
                {products.map((product, index) => <ItemCard item={product} add={true} onClick={() => active()} />)}
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
    return bindActionCreators({setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);