import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

import { AddProduct } from '../..';
import { 
    RouteIndicator, 
    Search, 
    ItemCard, 
    Activity2 
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './ProductList.module.css';
import search from '../../../utils/search';
import {setData} from '../../../redux/Actions/Data.actions';
import { connect } from 'react-redux';

const ProductList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        setDetail, 
        data,
        refresh,
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [products, setProducts] = useState([]);
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
        search(text, data, setProducts, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/product/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setProducts(res);
                props.setData(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, [isOpenAdd, refresh])

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <RouteIndicator route="Dashboard" current="Products" />
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Product'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            <h2 className={styles.productTitle}>Top 6 Products</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.productContainer}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 7)&&
                <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />))}
            </div>
            <hr className={styles.horizontalLine} />
                <h2 className={styles.productTitle}>{products.length || 0} Product{products.length !== 1 && 's'}</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.productContainer}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />)}
            </div>
           <AddProduct isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
        </div>
    )
}


const mapStateToProps = ({data, refresh}) => {
    return {
        data: data.data,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);