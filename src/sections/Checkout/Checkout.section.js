import React, {useState} from "react";

import styles from './Checkout.module.css';
import CheckoutList from './CheckoutList/Checkout.list';
import CheckoutDetail from './CheckoutDetail/Checkout.detail';

const Checkout = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});
    return (
        <section className={styles.checkoutSection}>
            <CheckoutList isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail}/>
            <CheckoutDetail isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail}/>
        </section>
    )
}

export default Checkout;
