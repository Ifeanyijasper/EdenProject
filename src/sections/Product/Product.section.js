import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, ItemCard } from '../../components';
import styles from './Product.module.css';
import search from '../../utils/search';
import {setData} from '../../redux/Actions/Data.actions';
import { BASE_URL } from '../../utils/globalVariable';

const Product = (props) => {

    const {data} = props;

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
        fetch(`${BASE_URL}/product/`)
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setProducts(res);
                props.setData(res);
            })
            .catch(err => {
                // setIsLoading()
                console.log(true);
            })
    }, []);

    useEffect(() => {
        search(text, data, setProducts, filter.toLocaleLowerCase());
    }, [text]);

    return (
        <div className={styles.listContainer}>
            <Search 
                placeholder="Search" 
                newButton={false} 
                title={'Product'} 
                filters={filters} 
                filter={filter} 
                setFilter={setFilter} 
                text={text} 
                setText={setText} />
            <hr className={styles.horizontalLine} />
                <h2 className={styles.productTitle}>{products.length || 0} Prouct{products.length !== 1 && 's'}</h2>
            <hr className={styles.horizontalLine} />
            <div className={'py-10 px-12 grid grid-cols-3 gap-7'}>
                {products.map((product, index) => <ItemCard item={product} add={true} onClick={() => active()} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({data}) => {
    return {
        data: data.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);