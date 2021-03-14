import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '../../../components';
import extractInitials from '../../../utils/extractIni';
import { IMG_URL } from '../../../utils/imageVariable';

import styles from './ProductDetail.module.css';

const ProductDetail = (props) => {
    const {isDetail, setIsDetail, detail} = props;

    return (
         <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <div className={styles.imgsContainer}>
               {
                    detail.img ?
                    <img src={`${IMG_URL}${detail.img}`} alt="Name" className={styles.clientImage} /> :
                    <h3 className={styles.productIni}>{extractInitials(detail.name)}</h3>
                }
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.clientName}>Service Name: {detail.name} </h3>
                <h2 className={styles.subTitle}>Details</h2>
                <ol className={styles.list}>
                    <li>Likes: 34</li>
                    <li>Discount: {Math.floor(Number(detail.discount))}%</li>
                    <li>Original Price: {Math.floor(Number(detail.price))} XAF</li>
                    {Number(detail.discount) !== 0 && <li>Discount Price: {((100 - Number(detail.discount))/100) * Number(detail.price)} XAF</li>}
                </ol>
                <h2 className={styles.subTitle}>About</h2>
                <p className={styles.list}>{detail.description}</p>
                <h2 className={styles.price}>Price = {Number(detail.discount) ? ((100 - Number(detail.discount))/100) * Number(detail.price) :  Number(detail.price) } XAF</h2>
            </div>
            <Button title={"Close"} onClick={() => setIsDetail(false)} />
        </div>
    )
}

export default ProductDetail;
