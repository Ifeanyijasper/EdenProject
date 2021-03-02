import React from "react";
import { Button } from "../../../components";
import { img_1, img_3 } from "../../../res/images";

import styles from './FinanceDetail.module.css';

const FinanceDetail = (props) => {
    const {isDetail, setIsDetail, detail} = props;
    return (
        <div className={isDetail ? styles.detailContainer : styles.detailHide}>
            <div className={styles.imgsContainer}>
                <img src={img_1} alt={"Client Name"} className={styles.clientImage} />
                <img src={img_3} alt={"Woker Name"} className={styles.workerImage} />
            </div>
            <div className={styles.infoContainer}>
                <h3 className={styles.clientName}>Client's Name: James Brown</h3>
                <h3 className={styles.workerName}>Server's Name: Shalot Green</h3>
                <h3 className={styles.workerName}>Served: Sun, 29th Sept, 2020 at 12:00PM</h3>
                <h2 className={styles.subTitle}>Products</h2>
                <ol className={styles.list}>
                    <li>Mascara &times; 1 = 4,000 XAF</li>
                    <li>Mascara &times; 1 = 4,000 XAF</li>
                    <li>Mascara &times; 1 = 4.000 XAF</li>
                    <li>Mascara &times; 1 = 4,000 XAF</li>
                </ol>
                <h2 className={styles.subTitle}>Services</h2>
                <ol className={styles.list}>
                    <li>Massage &times; 1 = 1,000 XAF</li>
                    <li>Pedicure &times; 1 = 4,000 XAF</li>
                    <li>Mascara &times; 1 = 4,000 XAF</li>
                    <li>Mascara &times; 1 = 4,000 XAF</li>
                </ol>
                <h2 className={styles.subTitle}>Total = 29,000 XAF</h2>
            </div>
            <Button title={"Close"} onClick={() => setIsDetail(false)} />
        </div>
    )
}

export default FinanceDetail;
