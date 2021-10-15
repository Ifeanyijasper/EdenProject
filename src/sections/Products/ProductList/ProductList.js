import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

import { 
    RouteIndicator, 
    Search, 
    ItemCard, 
    Activity2 
} from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import styles from './ProductList.module.css';
import search from '../../../utils/search';
import {setData, setProducts} from '../../../redux/Actions/Data.actions';
import { connect } from 'react-redux';
import AddProduct from './AddProduct.section';
import ProductDetail from './ProductDetail.section';
import EditProduct from './EditProduct.section';

const ProductList = (props) => {
    const {
        _products,
    } = props;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [filter, setFilter] = useState('');
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [detail, setDetail] = useState({})
    const [products, setProducts] = useState([]);
    const [filters] = useState([
        'Name',
        'Price',
        'Discount',
    ])

    const showDetails = (item) => {
        setShow(true);
        setDetail(item)
    }

    useEffect(() => {
        search(text, _products, setProducts, filter.toLowerCase());
    }, [text]);

    useEffect(() => {
        setProducts(_products)
        if (_products?.length === 0) {
            setIsLoading(true);
            fetchProducts()
        }
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

    return (
        <div className={'w-full'}>
            <RouteIndicator route="Dashboard" current="Products" />
            <div className="sticky -top-4 md:top-3 z-40 pt-1">
                <Search placeholder="Search" isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} newButton={true} title={'Product'} filters={filters} filter={filter} setFilter={setFilter} text={text} setText={setText} />
            </div>
            {text.length <= 0 && <>
                <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>Top 6 Products</h2>
                <hr className={'my-4 mx-2'} />
                <div className={`py-6 mb-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center`}>
                    {isLoading ? (<Activity2 />) : products.map((product, index) => ((Math.floor(Number(product.discount)) < 10 && index < 6) &&
                        <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />))}
                </div>
            </>
            }
            <hr className={'my-4 mx-2'} />
            <h2 className={'text-gray-500 text-2xl mt-3 mx-2'}>{products.length || 0} Product{products.length !== 1 && 's'}</h2>
            <hr className={'my-4 mx-2'} />
            <div className={`py-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 flex justify-center`}>
                {isLoading ? (<Activity2 />) : products.map((product, index) => <ItemCard item={product} onClick={() => showDetails(product)} key={product.id} />)}
            </div>
            <AddProduct add={isOpenAdd} setAdd={setIsOpenAdd} />
            <EditProduct edit={edit} setEdit={setEdit} detail={detail} />
            <ProductDetail setShow={setShow} show={show} setEdit={setEdit} detail={detail}  />
        </div>
    )
};


const mapStateToProps = ({data, refresh}) => {
    return {
        _products: data.products,
        refresh: refresh.refresh,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);