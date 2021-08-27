import React, { useState } from 'react';

import ProductDetail from './ProductDetail/ProductDetail';
import ProductList from './ProductList/ProductList';

const Product = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});

    return (
        <section className={`w-full min-h-full bg-white p-4 lg:p-6`}>
            <ProductList isDetail={isDetail} setIsDetail={setIsDetail} setDetail={setDetail} />
            <ProductDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} />
        </section>
    )
}

export default Product;
