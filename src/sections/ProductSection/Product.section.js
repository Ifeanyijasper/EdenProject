import React, { useState } from 'react';

import styles from './Product.module.css';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductList from './ProductList/ProductList';

const Product = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});

    return (
        <section className={styles.productSection}>
            <ProductList isDetail={isDetail} setIsDetail={setIsDetail} setDetail={setDetail} />
            <ProductDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} />
        </section>
    )
}

export default Product;
