import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';

import { Search, ItemCard, Activity2 } from '../../../components';
import styles from './ProductList.module.css';
import search from '../../../utils/search';
import {setData} from '../../../redux/Actions/Data.actions';
import { BASE_URL } from '../../../utils/globalVariable';
import { connect } from 'react-redux';

const ProductList = (props) => {
    const {
        isDetail, 
        setIsDetail, 
        setDetail,
        data,
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
    }, [isOpenAdd])

    return (
        <div className={isDetail ? styles.listContainerDetail : styles.listContainer}>
            <h1 className={styles.Title}>Products</h1>
            <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={false} title={'Product'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            { text.length <= 0 &&   <>
                    <h2 className={styles.productTitle}>Top 6 Products</h2>
                    <hr className={styles.horizontalLine} />
                    <div className={styles.productContainer}>
                        {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6)&&
                        <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />))}
                    </div>
                </>
            }
            <hr className={styles.horizontalLine} />
                <h2 className={styles.productTitle}>{products.length} Product{products.length !== 1 && 's'}</h2>
            <hr className={styles.horizontalLine} />
            <div className={styles.productContainer}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({data}) => {
    return {
        data: data.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
